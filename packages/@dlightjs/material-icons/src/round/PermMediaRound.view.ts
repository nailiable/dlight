import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PermMediaRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 19H3V7c0-.55-.45-1-1-1s-1 .45-1 1v12c0 1.1.9 2 2 2h16c.55 0 1-.45 1-1s-.45-1-1-1z\"/><path d=\"M21 4h-7l-1.41-1.41c-.38-.38-.89-.59-1.42-.59H7c-1.1 0-1.99.9-1.99 2L5 15c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3 9h-8a.5.5 0 0 1-.4-.8l1.38-1.83c.2-.27.6-.27.8 0L13 12l2.22-2.97c.2-.27.6-.27.8 0l2.38 3.17a.5.5 0 0 1-.4.8z\"/>")
      .name("PermMediaRound")
  }
}

export default PermMediaRound as any as Typed<DLightIconType>