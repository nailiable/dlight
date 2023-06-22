import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HomeWorkOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M1 11v10h6v-5h2v5h6V11L8 6l-7 5zm12 8h-2v-5H5v5H3v-6.97l5-3.57 5 3.57V19zm4-12h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z\"/><path d=\"M10 3v1.97l2 1.43V5h9v14h-4v2h6V3z\"/>")
      .name("HomeWorkOutlined")
  }
}

export default HomeWorkOutlined as any as Typed<DLightIconType>