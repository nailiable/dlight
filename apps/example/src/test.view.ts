import { HStack } from "@dlightjs/components"
// import { css } from "@dlightjs/emotion"
import { transformWithEsbuild } from "vite"
import { DLightIcon, DLightIconType, HelpOutlineOutlined } from "@dlightjs/material-icons"
import DLight, { View, $, type CustomNode } from "@dlightjs/dlight"
import { span, div, css } from "@dlightjs/easy-css"

class TestView extends View {
  count = 1
  Body() {
    div(this.count)
    button("+")
      .onclick(() => {
        this.count++
      })
  }
}

export default TestView
