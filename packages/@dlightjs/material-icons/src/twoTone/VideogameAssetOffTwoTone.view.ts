import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VideogameAssetOffTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m10.83 8 8 8H20V8h-9.17zm6.67 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-4.33 4-3-3H9v2H7v-2H5v-2h2V9.83L5.17 8H4v8h9.17z\" opacity=\".3\"/><path d=\"M17.5 9c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-6.67-1H20v8h-1.17l1.87 1.87c.75-.29 1.3-1.02 1.3-1.87V8c0-1.1-.9-2-2-2H8.83l2 2zm8.95 14.61L15.17 18H4c-1.1 0-2-.9-2-2V8c0-.85.55-1.58 1.3-1.87L1.39 4.22 2.8 2.81l18.38 18.38-1.4 1.42zM13.17 16l-3-3H9v2H7v-2H5v-2h2V9.83L5.17 8H4v8h9.17z\"/>")
      .name("VideogameAssetOffTwoTone")
  }
}

export default VideogameAssetOffTwoTone as any as Typed<DLightIconType>