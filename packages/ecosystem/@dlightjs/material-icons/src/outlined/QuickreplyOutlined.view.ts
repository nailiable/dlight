import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class QuickreplyOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 17.17V4h16v6h2V4c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h9v-2H5.17L4 17.17z\"/><path d=\"M22.5 16h-2.2l1.7-4h-5v6h2v5z\"/>")
      .name("QuickreplyOutlined")
  }
}

export default QuickreplyOutlined as any as Typed<DLightIconType>