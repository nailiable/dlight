import type babel from "@babel/core"
import { type types as t, type NodePath } from "@babel/core"
import { type PropertyContainer, type HTMLTags, type SubViewPropSubDepMap } from "./types"
import { minimatch } from "minimatch"
import { parseView } from "@dlightjs/view-parser"
import { isAssignmentExpressionLeft, isAssignmentExpressionRight, isMemberInEscapeFunction, isMemberInManualFunction } from "./utils/depChecker"
import { uid } from "./utils/utils"
import { parseReactivity } from "@dlightjs/reactivity-parser"
import { generateSubView, generateView } from "@dlightjs/view-generator"

const devMode = process.env.NODE_ENV === "development"

export class PluginProvider {
  // ---- Const Level
  static defaultHTMLTags = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "acronym", "applet", "basefont", "bgsound", "big", "blink", "center", "dir", "font", "frame", "frameset", "isindex", "keygen", "listing", "marquee", "menuitem", "multicol", "nextid", "nobr", "noembed", "noframes", "param", "plaintext", "rb", "rtc", "spacer", "strike", "tt", "xmp", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use", "view"]
  static availableDecoNames = ["Static", "Prop", "Env", "Content", "Children"]
  static dlightDefaultPackageName = "@dlightjs/dlight"
  static importMap = Object.fromEntries(([
    "createTemplate",
    "setStyle",
    "setDataset",
    "setMemorizedEvent",
    "setHTMLProp",
    "setHTMLAttr",
    "setHTMLProps",
    "setHTMLAttrs",
    "insertNode",
    "createElement",
    "ForNode",
    "IfNode",
    "EnvNode",
    "createTextNode",
    "updateText",
    "ExpNode",
    "PropView"
  ]).map((funcName, idx) => (
    devMode ? [funcName, funcName] : [funcName, `$${idx}$`]
  )))

  private readonly dlightPackageName = PluginProvider.dlightDefaultPackageName

  // ---- Plugin Level
  private readonly babelApi: typeof babel
  private readonly t: typeof t
  private readonly traverse: typeof babel.traverse
  private readonly enableDevTools: boolean
  private readonly includes: string[]
  private readonly excludes: string[]
  private readonly htmlTags: string[]

  constructor(
    babelApi: typeof babel,
    types: typeof t,
    includes: string[],
    excludes: string[],
    enableDevTools: boolean,
    htmlTags: HTMLTags
  ) {
    this.babelApi = babelApi
    this.t = types
    this.traverse = babelApi.traverse
    this.includes = includes
    this.excludes = excludes
    this.enableDevTools = devMode && enableDevTools
    this.htmlTags = typeof htmlTags === "function"
      ? htmlTags(PluginProvider.defaultHTMLTags)
      : htmlTags.includes("*")
        ? [...new Set([...PluginProvider.defaultHTMLTags, ...htmlTags])].filter(tag => tag !== "*")
        : htmlTags
  }

  // ---- DLight class Level
  private classRootPath?: NodePath<t.ClassDeclaration | t.ClassExpression>
  private classDeclarationNode?: t.ClassDeclaration | t.ClassExpression
  private classBodyNode?: t.ClassBody
  private constructorNode?: t.ClassMethod
  private propertiesContainer: PropertyContainer = {}
  private dependencyMap: Record<string, string[]> = {}
  private enter = true
  private enterClassNode = false
  private className?: string

  // ---- File Level
  private programNode?: t.Program
  private allImports: t.ImportDeclaration[] = []
  private didAlterImports = false

  /* ---- DLight Class Level Hooks ---- */
  /**
   * @brief Clear all DLight Node Level variables after a class is transformed
   */
  clearNode() {
    this.classRootPath = undefined
    this.classDeclarationNode = undefined
    this.classBodyNode = undefined
    this.constructorNode = undefined
    this.propertiesContainer = {}
    this.dependencyMap = {}
    this.enter = true
    this.enterClassNode = false
    this.allImports = []
    this.didAlterImports = false
    this.className = undefined
  }

  private get availableProperties(): string[] {
    return Object.entries(this.propertiesContainer)
      .filter(([key, { isWatcher, isStatic, isChildren }]) => (
        key !== "_$compName" &&
        !isWatcher &&
        !isStatic &&
        !isChildren
      ))
      .map(([key]) => key)
  }

  /**
   * @brief Initialize DLight Node Level variables when entering a class
   * @param path
   */
  initNode(path: NodePath<t.ClassDeclaration | t.ClassExpression>): void {
    this.classRootPath = path
    const node: t.ClassDeclaration | t.ClassExpression = path.node
    this.classDeclarationNode = node
    this.classBodyNode = node.body
    this.propertiesContainer = {}

    if (!node.id?.name) {
      node.id = this.t.identifier(`Anonymous_${uid()}`)
    }
    this.className = node.id?.name

    // ---- Custom decorators
    this.handleClassCustomDecorators()

    // ---- If devtools is enabled, add _$compName property to the class
    if (this.enableDevTools) {
      this.classBodyNode.body.unshift(
        this.t.classProperty(
          this.t.identifier("_$compName"),
          this.t.stringLiteral(this.className)
        )
      )
    }

    this.addConstructor()

    // ---- Add dlight import and alter import name,
    //      Only do this when enter the first dlight class
    if (!this.didAlterImports) {
      // ---- Get DLight imports
      const dlightImports = this.allImports.filter(n => n.source.value === PluginProvider.dlightDefaultPackageName)
      // ---- Alter import name, e.g. "@dlight/dlight-client"
      if (this.dlightPackageName !== PluginProvider.dlightDefaultPackageName) {
        dlightImports.forEach(i => {
          i.source.value = this.dlightPackageName
        })
      }

      // ---- Add nodes import to the head of file
      this.programNode!.body.unshift(
        this.t.importDeclaration(
          Object.entries(PluginProvider.importMap).map(([key, value]) => (
            this.t.importSpecifier(
              this.t.identifier(value),
              this.t.identifier(key)
            )
          ))
          , this.t.stringLiteral(this.dlightPackageName)
        )
      )
      this.didAlterImports = true
    }
  }

  handleClassCustomDecorators() {
    if (!this.classBodyNode) return
    const decorators = this.classDeclarationNode?.decorators
    if (!decorators) return
    // ---- Forward Prop
    const forwardPropDeco = this.findDecoratorByName(decorators, "ForwardProps")
    /**
     * _$forwardProp
     * _$forwardPropMap = new Set()
     * _$forwardPropsId = []
     */
    if (forwardPropDeco) {
      this.classBodyNode.body.unshift(
        this.t.classProperty(
          this.t.identifier("_$forwardProps")
        ),
        this.t.classProperty(
          this.t.identifier("_$forwardPropsMap"),
          this.t.newExpression(
            this.t.identifier("Set"),
            []
          )
        ),
        this.t.classProperty(
          this.t.identifier("_$forwardPropsId"),
          this.t.arrayExpression([])
        )
      )
      this.classDeclarationNode!.decorators = this.removeDecorators(decorators, ["ForwardProps"])
    }
  }

  /**
   * @brief Transform the whole DLight class when exiting the class
   *  1. Alter all the state properties
   *  2. Transform MainView and SubViews with DLight syntax
   */
  transformDLightClass(): void {
    const usedProperties = this.handleView()
    const propertyArr = Object.entries(this.propertiesContainer).reverse()
    const depReversedMap = this.dependencyMapReversed()

    for (const [key, { node, deps, isStatic, isChildren, isPropOrEnv, isWatcher, isContent }] of propertyArr) {
      if (isChildren) {
        this.resolveChildrenDecorator(node as t.ClassProperty)
        continue
      }
      if (deps.length > 0) {
        usedProperties.push(...deps)
        if (isWatcher) this.resolveWatcherDecorator(node as t.ClassMethod)
        else this.handleDerivedProperty(node as t.ClassProperty)
      }
      if (isPropOrEnv) {
        this.resolvePropDecorator(node as t.ClassProperty, isPropOrEnv)
      }
      if (isContent) {
        this.resolvePropDecorator(node as t.ClassProperty, "Prop")
        this.resolveContentDecorator(node as t.ClassProperty)
      }
      if (isStatic) continue
      if (usedProperties.includes(key)) {
        this.resolveStateDecorator(node as t.ClassProperty, this.availableProperties.indexOf(key), depReversedMap[key])
      }
    }
  }

  /* ---- DLight Class View Handlers ---- */
  /**
   * @brief Transform Body and SubViews with DLight syntax
   * @returns used properties
   */
  handleView(): string[] {
    if (!this.classBodyNode) return []
    const usedPropertySet = new Set<string>()
    let mainView: undefined | t.ClassMethod
    const subViewNodes: t.ClassMethod[] = []
    for (let viewNode of this.classBodyNode.body) {
      if (!this.t.isClassProperty(viewNode) && !this.t.isClassMethod(viewNode)) continue
      if (!this.t.isIdentifier(viewNode.key)) continue
      const isSubView = this.findDecoratorByName(viewNode.decorators, "View")
      const isMainView = viewNode.key.name === "View"
      if (!isSubView && !isMainView) continue

      if (this.t.isClassProperty(viewNode)) {
        // ---- Handle TSAsExpression, e.g. MyView = (() => {}) as Type1 as Type2
        let exp = viewNode.value
        while (this.t.isTSAsExpression(exp)) exp = exp.expression
        if (!this.t.isArrowFunctionExpression(viewNode.value)) continue
        viewNode.value = exp
        // ---- Transform arrow function property into method
        const newViewNode = this.arrowFunctionPropertyToMethod(viewNode)
        if (!newViewNode) continue
        viewNode = newViewNode
      }

      if (isSubView) {
        viewNode.decorators = null
        subViewNodes.push(viewNode)
      } else {
        mainView = viewNode
      }
    }

    const subViewNames = subViewNodes.map(v => (v.key as t.Identifier).name)
    const subViewPropSubDepMap: SubViewPropSubDepMap = Object.fromEntries(
      subViewNodes.map(v => {
        const prop = v.params[0]
        if (!prop || !this.t.isObjectPattern(prop)) return ["-", null as any]
        const props = Object.fromEntries(prop.properties.map((p) => {
          if (!this.t.isObjectProperty(p)) return ["-", null]
          const key = (p.key as t.Identifier).name
          // ---- Get identifiers that depend on this prop
          const subDeps = this.getIdentifiers(
            this.t.assignmentExpression(
              "=",
              this.t.objectPattern([this.t.objectProperty(this.t.numericLiteral(0), p.value)]),
              this.t.numericLiteral(0)
            )
          ).filter(v => v !== key)
          return [key, subDeps]
        }).filter(([_, props]) => props))
        return [(v.key as t.Identifier).name, props]
      }).filter(([_, props]) => props)
    )
    let templateIdx = -1
    if (mainView) {
      let usedProperties;
      [usedProperties, templateIdx] = this.alterMainView(mainView, subViewNames, subViewPropSubDepMap)
      usedProperties.forEach(usedPropertySet.add.bind(usedPropertySet))
    }

    subViewNodes.forEach(viewNode => {
      let usedProperties;
      [usedProperties, templateIdx] = this.alterSubView(viewNode, subViewNames, subViewPropSubDepMap, templateIdx)
      usedProperties.forEach(usedPropertySet.add.bind(usedPropertySet))
    })

    const usedProperties: string[] = []
    this.availableProperties.forEach(p => {
      if (usedPropertySet.has(p)) usedProperties.push(p)
    })
    // const usedProperties = usedPropertyDeps.map(dep => dep.slice(1, -4))
    return usedProperties
  }

  /**
   * @brief Transform Views with DLight syntax
   * @param viewNode
   * @param subViewNames
   * @param isSubView
   * @returns Used properties
   */
  alterMainView(viewNode: t.ClassMethod, subViewNames: string[], subViewPropSubDepMap: SubViewPropSubDepMap): [Set<string>, number] {
    const viewUnits = parseView(viewNode.body, {
      babelApi: this.babelApi,
      subviewNames: subViewNames,
      htmlTags: this.htmlTags
    })

    const [viewParticles, usedPropertySet] = parseReactivity(viewUnits, {
      babelApi: this.babelApi,
      availableProperties: this.availableProperties,
      dependencyMap: this.dependencyMap
    })

    const [body, classProperties, templateIdx] = generateView(
      viewParticles,
      {
        babelApi: this.babelApi,
        className: this.className!,
        importMap: PluginProvider.importMap,
        subViewPropMap: Object.fromEntries(
          Object.entries(subViewPropSubDepMap)
            .map(([key, props]) => [key, Object.keys(props)])
        ),
        templateIdx: -1
      }
    )
    viewNode.body = body
    this.classBodyNode?.body.push(...classProperties)

    return [usedPropertySet, templateIdx]
  }

  alterSubView(viewNode: t.ClassMethod, subViewNames: string[], subViewPropSubDepMap: SubViewPropSubDepMap, templateIdx: number): [Set<string>, number] {
    const viewUnits = parseView(viewNode.body, {
      babelApi: this.babelApi,
      subviewNames: subViewNames,
      htmlTags: this.htmlTags
    })
    const [viewParticlesProperty, usedPropertySet] = parseReactivity(viewUnits, {
      babelApi: this.babelApi,
      availableProperties: this.availableProperties,
      dependencyMap: this.dependencyMap
    })

    const subViewProp = subViewPropSubDepMap[(viewNode.key as t.Identifier).name] ?? []
    const identifierDepMap: Record<string, string[]> = {}
    Object.entries(subViewProp).forEach(([key, subDeps]) => {
      subDeps.forEach(dep => {
        identifierDepMap[dep] = [key]
      })
    })

    const [viewParticlesIdentifier] = parseReactivity(viewUnits, {
      babelApi: this.babelApi,
      availableProperties: Object.keys(subViewProp),
      dependencyMap: this.dependencyMap,
      dependencyParseType: "identifier",
      identifierDepMap
    })

    const subViewPropMap = Object.fromEntries(
      Object.entries(subViewPropSubDepMap)
        .map(([key, props]) => [key, Object.keys(props)])
    )
    const [body, classProperties, newTemplateIdx] = generateSubView(
      viewParticlesProperty,
      viewParticlesIdentifier,
      viewNode.params[0] as t.ObjectPattern,
      {
        babelApi: this.babelApi,
        className: this.className!,
        importMap: PluginProvider.importMap,
        subViewPropMap,
        templateIdx
      }
    )
    viewNode.body = body
    this.classBodyNode?.body.push(...classProperties)

    return [usedPropertySet, newTemplateIdx]
  }

  /* ---- Babel Visitors ---- */
  private visitProgram(_path: NodePath<t.Program>): void {}
  programVisitor(path: NodePath<t.Program>, filename: string | undefined): void {
    this.enter = this.fileAllowed(filename)
    if (!this.enter) return
    this.allImports = path.node.body.filter(n => this.t.isImportDeclaration(n)) as t.ImportDeclaration[]
    const dlightImports = this.allImports.filter(n => n.source.value === PluginProvider.dlightDefaultPackageName)
    if (dlightImports.length === 0) {
      this.enter = false
      return
    }
    this.programNode = path.node
    this.visitProgram(path)
  }

  private enterClass(_path: NodePath<t.ClassDeclaration | t.ClassExpression>): void {}
  classEnter(path: NodePath<t.ClassDeclaration | t.ClassExpression>): void {
    if (!this.enter) return
    this.enterClassNode = this.isDLightView(path)
    if (!this.enterClass) return
    this.initNode(path)
    this.enterClass(path)
  }

  private exitClass(_path: NodePath<t.ClassDeclaration | t.ClassExpression>): void {}
  classExit(path: NodePath<t.ClassDeclaration | t.ClassExpression>): void {
    if (!this.enter) return
    if (!this.enterClassNode) return
    this.transformDLightClass()
    this.addInit()
    this.exitClass(path)
    this.clearNode()
    this.enterClassNode = false
  }

  private visitClassMethod(_path: NodePath<t.ClassMethod>): void {}
  classMethodVisitor(path: NodePath<t.ClassMethod>): void {
    if (!this.enterClassNode) return
    if (!this.t.isIdentifier(path.node.key)) return
    const key = path.node.key.name
    if (key === "View") return

    const isSubView = this.findDecoratorByName(path.node.decorators, "View")
    if (isSubView) return
    const node = path.node

    // ---- Handle watcher
    // ---- Get watcher decorator or watcher function decorator
    // ---- Watcher auto collect deps:
    //       @Watch
    //       watcher() { myFunc() }
    // ---- Watcher function manual set deps:
    //       @Watch(["count", "flag"])
    //       watcherFunc() { myFunc() }
    const watchDeco = this.findDecoratorByName(node.decorators, "Watch")
    if (!watchDeco) {
      if (this.t.isIdentifier(node.key, { name: "constructor" })) return
      this.autoBindMethods(node)
      return
    }
    // ---- Get dependencies from watcher decorator or watcher function decorator
    let deps: string[] = []
    if (this.t.isIdentifier(watchDeco)) {
      deps = this.getDependencies(path)
    } else {
      const listenDeps = watchDeco.arguments[0]
      if (this.t.isArrayExpression(listenDeps)) {
        deps = listenDeps.elements
          .filter(arg => this.t.isStringLiteral(arg))
          .map(arg => (arg as t.StringLiteral).value)
        deps = [...new Set(deps)]
      }
    }
    // ---- Register watcher to propertiesContainer
    this.propertiesContainer[key] = {
      node,
      deps,
      isWatcher: true
    }
    node.decorators = this.removeDecorators(node.decorators, ["Watch"])

    this.visitClassMethod(path)
  }

  private visitClassProperty(_path: NodePath<t.ClassProperty>): void {}
  classPropertyVisitor(path: NodePath<t.ClassProperty>): void {
    if (!this.enterClassNode) return
    const node = path.node
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    if (key === "View") return
    const decorators = node.decorators
    const isSubView = this.findDecoratorByName(decorators, "View")
    if (isSubView) return
    const isProp = !!this.findDecoratorByName(decorators, "Prop")
    const isEnv = !!this.findDecoratorByName(decorators, "Env")

    const isChildren = !!this.findDecoratorByName(node.decorators, "Children")

    const deps = !isChildren
      ? this.getDependencies(path)
      : []

    this.propertiesContainer[key] = {
      node,
      deps,
      isStatic: !!this.findDecoratorByName(decorators, "Static"),
      isContent: !!this.findDecoratorByName(decorators, "Content"),
      isChildren,
      isPropOrEnv: isProp ? "Prop" : (isEnv ? "Env" : undefined)
    }

    node.decorators = this.removeDecorators(decorators, PluginProvider.availableDecoNames)
    this.visitClassProperty(path)
  }

  /* ---- Decorator Resolvers ---- */
  /**
   * @brief Decorator resolver: Watcher
   * Add:
   * $wW${key}
   * @param node
   */
  resolveWatcherDecorator(node: t.ClassMethod): void {
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode!.body.indexOf(node)
    const watcherNode = this.t.classProperty(
      this.t.identifier(`$w$${key}`)
    )
    this.classBodyNode!.body.splice(propertyIdx, 0, watcherNode)
  }

  /**
   * @brief Decorator resolver: Children
   * Add:
   * get ${key}() {
   *  return this._$children
   * }
   * @param node
   */
  resolveChildrenDecorator(node: t.ClassProperty) {
    if (!this.classBodyNode) return
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const childrenFuncCallNode = (
      this.t.memberExpression(
        this.t.thisExpression(),
        this.t.identifier("_$children")
      )
    )

    const getterNode = this.t.classMethod("get", this.t.identifier(key), [],
      this.t.blockStatement([
        this.t.returnStatement(childrenFuncCallNode)
      ])
    )
    this.classBodyNode.body.splice(propertyIdx, 1, getterNode)
  }

  /**
   * @brief Decorator resolver: Content
   * Add:
   * _$contentKey = "key"
   * @param node
   */
  resolveContentDecorator(node: t.ClassProperty) {
    if (!this.classBodyNode) return
    if (!this.t.isIdentifier(node.key)) return

    // ---- Already has _$contentKey
    if (this.classBodyNode.body.some(n => (
      this.t.isClassProperty(n) &&
      (n.key as t.Identifier).name === "_$contentKey")
    )) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const derivedStatusKey = this.t.classProperty(
      this.t.identifier("_$contentKey"),
      this.t.stringLiteral(key)
    )
    this.classBodyNode.body.splice(propertyIdx, 0, derivedStatusKey)
  }

  /**
   * @brief Decorator resolver: Prop/Env
   * Add:
   * $p/e$${key}
   * @param node
   */
  resolvePropDecorator(node: t.ClassProperty, decoratorName: "Prop" | "Env") {
    if (!this.classBodyNode) return
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const propertyIdx = this.classBodyNode.body.indexOf(node)
    const tag = decoratorName.toLowerCase() === "prop" ? "p" : "e"
    const derivedStatusKey = this.t.classProperty(
      this.t.identifier(`$${tag}$${key}`)
    )
    this.classBodyNode.body.splice(propertyIdx, 0, derivedStatusKey)
  }

  /**
   * @brief Decorator resolver: State
   * Add:
   *  $${key} = ${value}
   *  $$${key} = ${depIdx}
   *  $sub$${key} = [${reversedDeps}]
   *  get ${key}() {
   *    return this.$${key}
   *  }
   *  set ${key}(value) {
   *    this._$updateProp("${key}", value)
   *  }
   * @param node
   */
  resolveStateDecorator(node: t.ClassProperty, idx: number, reverseDeps: Set<string> | undefined) {
    if (!this.classBodyNode) return
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    node.key.name = `$${key}`
    const propertyIdx = this.classBodyNode.body.indexOf(node)

    const idxNode = this.t.classProperty(
      this.t.identifier(`$$${key}`),
      this.t.numericLiteral(1 << idx)
    )

    const depsNode = reverseDeps
      ? [this.t.classProperty(
          this.t.identifier(`$s$${key}`),
          this.t.arrayExpression([...reverseDeps].map(d => this.t.stringLiteral(d)))
        )]
      : []

    const getterNode = this.t.classMethod("get", this.t.identifier(key), [],
      this.t.blockStatement([
        this.t.returnStatement(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier(`$${key}`)
          )
        )
      ])
    )

    const setterNode = this.t.classMethod("set", this.t.identifier(key), [
      this.t.identifier("value")
    ],
    this.t.blockStatement([
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$updateProp")
          ), [
            this.t.stringLiteral(key),
            this.t.identifier("value")
          ]
        )
      )
    ])
    )

    this.classBodyNode.body.splice(propertyIdx + 1, 0, idxNode, ...depsNode, getterNode, setterNode)
  }

  /* ---- Helper Functions ---- */
  /**
   * @brief Test if the file is allowed to be transformed
   * @param fileName
   * @returns is file allowed
   */
  private fileAllowed(fileName: string | undefined): boolean {
    if (this.includes.includes("*")) return true
    if (!fileName) return false
    if (this.excludes.some(pattern => minimatch(fileName, pattern))) return false
    if (!this.includes.some(pattern => minimatch(fileName, pattern))) return false
    return true
  }

  /**
   * @brief Test if the class is a dlight view
   * @param path
   * @returns
   */
  private isDLightView(path: NodePath<t.ClassDeclaration | t.ClassExpression>): boolean {
    const node = path.node
    const decorators = node.decorators ?? []
    const isDecorator = decorators.find((deco: t.Decorator) => this.t.isIdentifier(deco.expression, { name: "View" }))
    if (isDecorator) {
      node.superClass = this.t.identifier("View")
      node.decorators = node.decorators?.filter((deco: t.Decorator) => (
        !this.t.isIdentifier(deco.expression, { name: "View" })
      ))
    }
    return this.t.isIdentifier(node.superClass, { name: "View" })
  }

  /**
   * @brief Remove decorators by name
   *  Only search for Identifier and CallExpression, e.g, @Ok, @Ok()
   * @param decorators
   * @param names
   * @returns new decorators
   */
  private removeDecorators(decorators: t.Decorator[] | undefined | null, names: string[]): t.Decorator[] {
    if (!decorators) return []
    return decorators.filter(d => !(
      (this.t.isIdentifier(d.expression) &&
      names.includes(d.expression.name)) ||
      (this.t.isCallExpression(d.expression) &&
      this.t.isIdentifier(d.expression.callee) &&
      names.includes(d.expression.callee.name))
    ))
  }

  /**
   * @brief Find decorator by name,
   *  Only search for Identifier and CallExpression, e.g, @Ok, @Ok()
   * @param decorators
   * @param name
   * @returns Identifier or CallExpression or nothing
   */
  private findDecoratorByName(decorators: t.Decorator[] | undefined | null, name: string): t.Identifier | t.CallExpression | undefined {
    if (!decorators) return
    return decorators.find(deco => (
      this.t.isIdentifier(deco.expression, { name }) ||
      (this.t.isCallExpression(deco.expression) && this.t.isIdentifier(deco.expression.callee, { name }))
    ))?.expression as t.Identifier | t.CallExpression | undefined
  }

  /**
   * constructor(props, content, children, forwardPropsScope) {
   *  super()
   * }
   */
  addConstructor() {
    if (!this.classBodyNode) return
    let constructor = this.classBodyNode.body.find(n => this.t.isClassMethod(n, { kind: "constructor" })) as t.ClassMethod
    if (constructor) throw new Error("DLight class should not have constructor")

    constructor = (
      this.t.classMethod("constructor", this.t.identifier("constructor"), [
        this.t.identifier("props"),
        this.t.identifier("content"),
        this.t.identifier("children"),
        this.t.identifier("forwardPropsScope")
      ], this.t.blockStatement([
        this.t.expressionStatement(
          this.t.callExpression(
            this.t.super(),
            []
          )
        )
      ]))
    )
    this.constructorNode = constructor
    this.classBodyNode.body.unshift(constructor)
  }

  addInit() {
    this.constructorNode!.body.body.push(
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$init")
          ),
          [this.t.identifier("props"), this.t.identifier("content"), this.t.identifier("children"), this.t.identifier("forwardPropsScope")]
        )
      )
    )
  }

  autoBindMethods(node: t.ClassMethod) {
    this.constructorNode!.body.body.push(
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.thisExpression(),
            node.key
          ),
          this.t.callExpression(
            this.t.memberExpression(
              this.t.memberExpression(
                this.t.thisExpression(),
                node.key
              ),
              this.t.identifier("bind")
            ), [
              this.t.thisExpression()
            ]
          )
        )
      )
    )
  }

  /**
   * ${key} = ${value}
   * get $f$${key}() {
   *  return ${value}
   * }
   */
  handleDerivedProperty(node: t.ClassProperty) {
    if (!this.t.isIdentifier(node.key)) return
    const key = node.key.name
    const value = node.value
    const propertyIdx = this.classBodyNode!.body.indexOf(node)
    const getterNode = this.t.classMethod(
      "get",
      this.t.identifier(`$f$${key}`), [],
      this.t.blockStatement([
        this.t.returnStatement(value)
      ])
    )
    this.classBodyNode!.body.splice(propertyIdx + 1, 0, getterNode)
  }

  /**
   * @brief Get all valid dependencies of a babel path
   * @param path
   * @returns dependencies
   */
  getDependencies(path: NodePath<t.ClassMethod | t.ClassProperty>): string[] {
    const node = path.node
    if (!this.t.isIdentifier(node.key)) return []

    // ---- Deps: console.log(this.count)
    const deps = new Set<string>()
    // ---- Assign deps: this.count = 1 / this.count++
    const assignDeps = new Set<string>()
    path.scope.traverse(node, {
      MemberExpression: innerPath => {
        if (!this.t.isIdentifier(innerPath.node.property)) return
        const propertyKey = innerPath.node.property.name
        if (isAssignmentExpressionLeft(innerPath, this.t)) {
          assignDeps.add(propertyKey)
        } else if (
          this.availableProperties.includes(propertyKey) &&
          this.t.isThisExpression(innerPath.node.object) &&
          !isMemberInEscapeFunction(innerPath, this.classDeclarationNode!, this.t) &&
          !isMemberInManualFunction(innerPath, this.classDeclarationNode!, this.t) &&
          !isAssignmentExpressionRight(innerPath, this.classDeclarationNode!, this.t)
        ) {
          deps.add(propertyKey)
          this.dependencyMap[propertyKey]?.forEach(deps.add.bind(deps))
        }
      }
    })

    // ---- Eliminate deps that are assigned in the same method
    //      e.g. { console.log(this.count); this.count = 1 }
    //      this will cause infinite loop
    //      so we eliminate "count" from deps
    assignDeps.forEach(deps.delete.bind(deps))

    // ---- Add deps to dependencyMap
    const propertyKey = node.key.name
    const depArr = [...deps]
    if (deps.size > 0) {
      this.dependencyMap[propertyKey] = depArr
    }

    return depArr
  }

  private dependencyMapReversed() {
    const reversedMap: Record<string, Set<string>> = {}
    Object.entries(this.dependencyMap).forEach(([key, deps]) => {
      deps.forEach(dep => {
        if (!reversedMap[dep]) reversedMap[dep] = new Set()
        reversedMap[dep].add(key)
      })
    })

    return reversedMap
  }

  /**
   * @brief Transform arrow function property to method
   * @param propertyNode
   * @returns new method node
   */
  arrowFunctionPropertyToMethod(propertyNode: t.ClassProperty): t.ClassMethod | undefined {
    if (this.t.isArrowFunctionExpression(propertyNode.value)) return
    let newNode: t.ClassMethod | undefined
    this.classRootPath!.scope.traverse(this.classBodyNode!, {
      ClassProperty: innerPath => {
        if (innerPath.node !== propertyNode) return
        const propertyBody = (propertyNode.value as t.ArrowFunctionExpression).body
        const body = this.t.isExpression(propertyBody) ? this.t.blockStatement([this.t.returnStatement(propertyBody)]) : propertyBody
        const methodNode = this.t.classMethod(
          "method",
          propertyNode.key,
          (propertyNode.value as t.ArrowFunctionExpression).params,
          body
        )
        newNode = methodNode
        innerPath.replaceWith(methodNode)
      }
    })
    return newNode
  }

  /**
   * @brief Check if a member expression is a property of a member expression
   * @param parentNode
   * @param currentNode
   * @returns is a property of a member expression
   */
  isMemberExpressionProperty(parentNode: t.Node, currentNode: t.Node): boolean {
    return this.t.isMemberExpression(parentNode) && !parentNode.computed && parentNode.property === currentNode
  }

  /**
   * @brief Check if a member expression is a key of an object
   * @param parentNode
   * @param currentNode
   * @returns is a key of an object
   */
  isObjectKey(parentNode: t.Node, currentNode: t.Node): boolean {
    return this.t.isObjectProperty(parentNode) && parentNode.key === currentNode
  }

  /**
   * @brief Add arrow function to property value
   * @param node
   */
  valueWithArrowFunc(node: t.ClassProperty): void {
    if (!node.value) {
      node.value = this.t.identifier("undefined")
    }
    node.value = this.t.arrowFunctionExpression([], node.value)
  }

  /**
   * @brief Wrap the value in a file
   * @param node
   * @returns wrapped value
   */
  private valueWrapper(node: t.Expression | t.Statement): t.File {
    return this.t.file(this.t.program([
      this.t.isStatement(node)
        ? node
        : this.t.expressionStatement(node)
    ]))
  }

  /**
   * @brief check if the identifier is from a function param till the stopNode
   *  e.g:
   *  function myFunc1(ok) { // stopNode = functionBody
   *     const myFunc2 = ok => ok // from function param
   *     console.log(ok) // not from function param
   *  }
   */
  private isAttrFromFunction(path: NodePath, idName: string) {
    let reversePath = path.parentPath

    const checkParam: (param: t.Node) => boolean = (param: t.Node) => {
    // ---- 3 general types:
    //      * represent allow nesting
    // ---0 Identifier: (a)
    // ---1 RestElement: (...a)   *
    // ---1 Pattern: 3 sub Pattern
    // -----0   AssignmentPattern: (a=1)   *
    // -----1   ArrayPattern: ([a, b])   *
    // -----2   ObjectPattern: ({a, b})
      if (this.t.isIdentifier(param)) return param.name === idName
      if (this.t.isAssignmentPattern(param)) return checkParam(param.left)
      if (this.t.isArrayPattern(param)) {
        return param.elements.filter(Boolean).map((el) => checkParam(el!)).includes(true)
      }
      if (this.t.isObjectPattern(param)) {
        return (param.properties
          .filter(prop => this.t.isObjectProperty(prop) && this.t.isIdentifier(prop.key)) as t.ObjectProperty[])
          .map(prop => (prop.key as t.Identifier).name)
          .includes(idName)
      }
      if (this.t.isRestElement(param)) return checkParam(param.argument)

      return false
    }

    while (reversePath) {
      const node = reversePath.node
      if (this.t.isArrowFunctionExpression(node) || this.t.isFunctionDeclaration(node)) {
        for (const param of node.params) {
          if (checkParam(param)) return true
        }
      }
      reversePath = reversePath.parentPath
    }

    return false
  }

  /**
   * @brief Check if an identifier is a simple identifier, i.e., not a member expression, or a function param
   * @param path
   *  1. not a member expression
   *  2. not a function param
   *  3. not in a declaration
   *  4. not as object property's not computed key
   */
  private isStandAloneIdentifier(path: NodePath<t.Identifier>) {
    const node = path.node
    const parentNode = path.parentPath?.node
    const isMemberExpression = this.t.isMemberExpression(parentNode) && parentNode.property === node
    if (isMemberExpression) return false
    const isFunctionParam = this.isAttrFromFunction(path, node.name)
    if (isFunctionParam) return false
    while (path.parentPath) {
      if (this.t.isVariableDeclarator(path.parentPath.node)) return false
      if (
        this.t.isObjectProperty(path.parentPath.node) &&
        path.parentPath.node.key === path.node &&
        !path.parentPath.node.computed
      ) return false
      path = path.parentPath as any
    }
    return true
  }

  /**
   * @brief Get all identifiers as strings in a node
   * @param node
   * @returns identifiers
   */
  private getIdentifiers(node: t.Node): string[] {
    if (this.t.isIdentifier(node)) return [node.name]
    const identifierKeys = new Set<string>()
    this.traverse(this.valueWrapper(node as any), {
      Identifier: innerPath => {
        if (!this.isStandAloneIdentifier(innerPath)) return
        identifierKeys.add(innerPath.node.name)
      }
    })
    return [...identifierKeys]
  }
}

/**
 * @brief Change the PluginProvider class for class inheritance
 */
export let PluginProviderClass = PluginProvider
export function changePluginProviderClass(cls: typeof PluginProvider) {
  PluginProviderClass = cls
}
