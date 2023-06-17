import * as t from "@babel/types"
import { handleBody } from "./bodyHandler"
import { resolveState, resolveProp } from "./decoratorResolver"
import { pushDep, pushDerived, shouldBeListened, valueWithArrowFunc } from "./nodeHelper"

export default function() {
  let classDeclarationNode: t.ClassDeclaration | null = null
  let classBodyNode: t.ClassBody | null = null
  // ---- 在这里新建node很省时间
  let depsNode: t.ClassProperty | null = null
  let derivedPairNode: t.ClassProperty | null = null
  let properties: string[] = []
  let propertiesContainer: Record<string, {
    node: t.ClassProperty
    derivedFrom: string[]
    isStatic: boolean
    propOrEnv: "Prop" | "Env" | undefined
  }> = {}
  let staticProperties: string[] = []
  let rootPath: any

  function willHandleBodyAtLast(node: any) {
    return classBodyNode!.body.indexOf(node) === classBodyNode!.body.length - 1
  }
  function handleBodyAtLast() {
    const usedProperties = handleBody(classBodyNode!, properties.filter(p => !staticProperties.includes(p)), rootPath)
    for (let [key, { node, derivedFrom, isStatic, propOrEnv }] of Object.entries(propertiesContainer).reverse()) {
      if (!node.value) node.value = t.identifier("undefined")
      if (derivedFrom.length !== 0) {
        derivedFrom = derivedFrom.filter(k => !staticProperties.includes(k))
        usedProperties.push(...derivedFrom)
        pushDerived(key, derivedFrom, derivedPairNode!, classBodyNode!)
        valueWithArrowFunc(node)
      }
      if (propOrEnv) resolveProp(node as any, classBodyNode!, propOrEnv, key)
      if (isStatic) continue
      if (usedProperties.includes(key)) {
        pushDep(key, depsNode!, classBodyNode!)
        resolveState(node as any, classBodyNode!)
      }
    }
    clearNode()
  }
  function initNode(path: any) {
    const node: t.ClassDeclaration | t.ClassDeclaration = path.node
    if (!t.isIdentifier(node.superClass, { name: "View" })) return
    classDeclarationNode = node
    classBodyNode = node.body
    derivedPairNode = t.classProperty(
      t.identifier("_$derivedPairs"),
      t.objectExpression([])
    )
    depsNode = t.classProperty(
      t.identifier("_$deps"),
      t.objectExpression([])
    )
    properties = classBodyNode.body
      .filter(n => t.isClassProperty(n))
      .map(n => (n as any).key.name)
    staticProperties = classBodyNode.body
      .filter(
        n => t.isClassProperty(n) &&
          n.decorators?.map(d => (d.expression as any).name).includes("Static")
      )
      .map(n => (n as any).key.name)
    propertiesContainer = {}
    rootPath = path
  }
  function clearNode() {
    classDeclarationNode = null
    classBodyNode = null
    derivedPairNode = null
    depsNode = null
    properties = []
    staticProperties = []
    propertiesContainer = {}
  }

  return {
    visitor: {
      ClassDeclaration(path: any) {
        initNode(path)
      },
      ClassExpression(path: any) {
        initNode(path)
      },
      ClassMethod(path: any) {
        if (!classDeclarationNode) return
        if (willHandleBodyAtLast(path.node)) {
          handleBodyAtLast()
        }
      },
      ClassProperty(path: any) {
        if (!classDeclarationNode) return
        const node = path.node as t.ClassProperty
        const key = (node.key as any).name
        // ---- 要提前判断是不是最后一个，因为后面会赠加
        const willHandleBody = willHandleBodyAtLast(node)

        const decoNames = node.decorators?.filter(deco => (
          t.isIdentifier(deco.expression) && ["Static", "Prop", "Env"].includes(deco.expression.name)
        )).map(deco => (deco.expression as any).name) ?? []
        // ---- 看是不是有属性是 prop derived，有就加一个()=>
        //      同时在propDerived中记录，这会在constructor的调用一遍
        //      不管@prop和@env
        const deps: string[] = []
        if (!(decoNames.includes("Prop") || decoNames.includes("Env"))) {
          path.scope.traverse(node, {
            MemberExpression(innerPath: any) {
              if (properties.includes(innerPath.node.property.name)) {
                if (shouldBeListened(innerPath, classDeclarationNode!)) {
                  deps.push(innerPath.node.property.name)
                }
              }
            }
          })
        }

        propertiesContainer[key] = {
          node,
          isStatic: decoNames.includes("Static"),
          propOrEnv: decoNames.filter(name => name !== "Static")[0],
          derivedFrom: [...new Set(deps)]
        }
        node.decorators = node.decorators?.filter(deco => !(
          t.isIdentifier(deco.expression) && ["Static", "Prop", "Env"].includes(deco.expression.name)
        ))
        // ---- 最后处理body
        if (willHandleBody) handleBodyAtLast()
      }
    }
  }
}