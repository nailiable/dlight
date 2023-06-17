import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, p, button, span, SubView } from "@dlightjs/types"
import Header from "./Header.view"
import { wrap, slogan2, countWrap, countBtn, btnHover, btnWrap, countText } from "./style.module.css"

class App extends View {
  count = 0
  btnStatus = [0, 0]  // hover = 1
  @SubView
  Btn({ _$content, onclick, index }: any): any {
    button(_$content)
      .className(countBtn)
      .className(this.btnStatus[index] === 1 ? btnHover : null)
      .onclick(onclick)
      .onmouseover(() => {
        this.btnStatus[index] = 1
        this.btnStatus = [...this.btnStatus]
      })
      .onmouseleave(() => {
        this.btnStatus[index] = 0
        this.btnStatus = [...this.btnStatus]
      })
  }


  Body() {
    div()
      .className(wrap)
    {
      Header()
      div()
        .className(slogan2)
      {
        p()
        {
          span("D")
            ._color("rgb(194, 225, 154)")
          span("Light")
            ._color("rgb(241,192,149)")
        }
        p("Your Modern")
          ._margin("0px")
        p("Web Framework")
      }
      div()
        .className(countWrap)
      {
        p(this.count)
          .className(countBtn)
          .className(countText)
        div()
          .className(btnWrap)
        {
          this.Btn("count ++")
            .index(0)
            .onclick(() => {
              this.count++
            })
          this.Btn("count --")
            .index(1)
            .onclick(() => {
              this.count--
            })
        }
      }
    }
  }
}

export default App as any as Typed<App>