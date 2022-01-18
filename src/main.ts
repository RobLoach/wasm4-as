import * as w4 from "./wasm4"

import { SetColor, SetPalette, ClearBackground, SCREEN_SIZE, DrawLine, DrawPixel, DrawHorizontalLine, DrawVerticalLine, DrawEllipse, DrawRectangle, DrawText, DrawCircle, IsGamepadButtonDown, IsGamepadButtonPressed, IsMouseButtonDown, IsMouseButtonPressed, GetMouseX, GetMouseY, GetRandomValue, SaveStorageValue, LoadStorageValue } from "./wasm4-utils"

export function start() : void {
    w4.trace("Running.")
}

export function update (): void {
    ClearBackground(3)

    DrawRectangle(0, 0, SCREEN_SIZE / 2, SCREEN_SIZE / 2, 1, 1)
    DrawRectangle(SCREEN_SIZE / 2, 0, SCREEN_SIZE / 2, SCREEN_SIZE / 2, 2, 2)
    DrawRectangle(0, SCREEN_SIZE / 2, SCREEN_SIZE / 2, SCREEN_SIZE / 2, 3, 3)
    DrawRectangle(SCREEN_SIZE / 2, SCREEN_SIZE / 2, SCREEN_SIZE / 2, SCREEN_SIZE / 2, 4, 4)

    DrawCircle(10, 20, 10, 3, 2)
    DrawEllipse(40, 20, 10, 5, 3, 2)
    DrawLine(80, 120, 50, 80, 2)

    DrawText("Hello World!!", SCREEN_SIZE / 2, SCREEN_SIZE / 2, 4, 2, 1, 1)

    DrawPixel(GetMouseX(), GetMouseY(), 2)

    if (IsMouseButtonDown(w4.MOUSE_LEFT)) {
        DrawText("Random Number: " + GetRandomValue(0, 100).toString(), 0, SCREEN_SIZE, 1, 0, 0, 2)
    }
}
