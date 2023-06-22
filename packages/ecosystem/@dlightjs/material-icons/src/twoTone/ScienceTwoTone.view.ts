import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ScienceTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 6h-2v5.33L6 18h12l-5-6.67z\" opacity=\".3\"/><path d=\"M20.8 18.4 15 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H8.04c-.42 0-.65.48-.39.81L9 6.5v4.17L3.2 18.4c-.49.66-.02 1.6.8 1.6h16c.82 0 1.29-.94.8-1.6zM6 18l5-6.67V6h2v5.33L18 18H6z\"/>")
      .name("ScienceTwoTone")
  }
}

export default ScienceTwoTone as any as Typed<DLightIconType>