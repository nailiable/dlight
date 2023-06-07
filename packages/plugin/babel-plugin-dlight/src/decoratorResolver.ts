import * as t from "@babel/types"

export function resolveState(node: t.ClassProperty, classBodyNode: t.ClassBody) {
  const propertyName = (node.key as t.Identifier).name;
  (node.key as t.Identifier).name = `_$$${propertyName}`
  const propertyIdx = classBodyNode.body.indexOf(node)

  /**
   * function ${propertyName}() {
   *    return this._$$${propertyName}
   * }
   */
  const getterNode = t.classMethod("get", t.identifier(propertyName), [],
    t.blockStatement([
      t.returnStatement(
        t.memberExpression(
          t.thisExpression(),
          t.identifier(`_$$${propertyName}`)
        )
      )
    ])
  )
  /**
   * function ${propertyName}(value) {
   *   this._$updateProperty("${propertyName}", value)
   * }
   */
  const setterNode = t.classMethod("set", t.identifier(propertyName), [
    t.identifier("value")
  ],
  t.blockStatement([
    t.expressionStatement(
      t.callExpression(
        t.memberExpression(
          t.thisExpression(),
          t.identifier("_$updateProperty")
        ), [
          t.stringLiteral(propertyName),
          t.identifier("value")
        ]
      )
    )
  ])
  )

  const nodesToPush: any = [getterNode, setterNode]
  classBodyNode.body.splice(propertyIdx + 1, 0, ...nodesToPush)
}

export function resolveProp(node: t.ClassProperty, classBodyNode: t.ClassBody, decoratorName: "Prop" | "Env", propertyName: string) {
  const propertyIdx = classBodyNode.body.indexOf(node)
  const tag: string = decoratorName.toLowerCase()
  /**
   * _$$$${propertyName} = "prop"
   */
  const derivedStatusKey = t.classProperty(
    t.identifier(`_$$$${propertyName}`),
    t.stringLiteral(tag)
  )
  classBodyNode.body.splice(propertyIdx, 0, derivedStatusKey)
}
