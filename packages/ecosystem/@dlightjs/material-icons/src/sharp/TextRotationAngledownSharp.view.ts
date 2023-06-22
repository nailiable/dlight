import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TextRotationAngledownSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 21v-4.24l-1.41 1.41-9.2-9.19-1.41 1.41 9.19 9.19L10.76 21H15zM11.25 8.48l3.54 3.54-.92 2.19 1.48 1.48 4.42-11.14-1.06-1.05L7.57 7.92 9.06 9.4l2.19-.92zm6.59-3.05-2.23 4.87-2.64-2.64 4.87-2.23z\"/>")
      .name("TextRotationAngledownSharp")
  }
}

export default TextRotationAngledownSharp as any as Typed<DLightIconType>