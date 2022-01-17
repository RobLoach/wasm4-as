import * as w4 from "./wasm4"
import * as w4x from "./wasm4x"
//import * as words from "./words"

let randomNum:i32 = 0;

export function start() : void {
    w4.trace("DFSAADFASD")
    //env.seed()

}

export function update (): void {
    Math.random()

    //w4x.palette(209486, 9279918, 15672124, 15658734);
    store<u16>(w4.DRAW_COLORS, 2)
    //w4.text("Hello from\nAssemblyScript!", 10, 10)

    const gamepad = load<u8>(w4.GAMEPAD1)
    if (gamepad & w4.BUTTON_1) {
        store<u16>(w4.DRAW_COLORS, 4)
    }

    let num = 3

    w4.text("Press X to blink " + num.toString(), 16, 90)

    
    //w4.text(words.words[4], 20, 20)

    //w4x.cls(4)

    w4x.SetColor(2,3)
    //w4.text("Hello World!", 50, 50)

    w4x.ClearBackground(2)

    w4x.DrawRectangle(30, 10, 10, 10, 1, 1)
    w4x.DrawRectangle(50, 10, 10, 10, 2, 2)
    w4x.DrawRectangle(70, 10, 10, 10, 3, 3)
    w4x.DrawRectangle(90, 10, 10, 10, 4, 4)

    w4x.DrawCircle(100, 100, 20, 3, 2)

    if (w4x.IsGamepadButtonDown(w4.BUTTON_LEFT)) {
        w4x.DrawRectangle(20, 20, 40, 40, 3)
    }

    if (w4x.IsMouseButtonPressed(w4.MOUSE_LEFT)) {
        randomNum = w4x.GetRandomValue(10, 100)
    }

    w4x.DrawText("Random Num: " + randomNum.toString(), 10, 100, 3)
}
