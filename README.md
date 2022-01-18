# WASM-4 Utils

Utility functions for WASM-4 AssemblyScript to ease development.

## API

The API is highly inspired by raylib, Borland BGI and XNA, aiming to be easy to read and understand.

``` ts
SetColor(color1, color2, color3, color4)
SetPalette(color1, color2, color3, color4)
ClearBackground(color)
DrawLine(x1, y1, x2, y2, color)
DrawPixel(x, y, color)
DrawHorizontalLine(x, y, length, color)
DrawVerticalLine(x, y, length, color)
DrawEllipse(x, y, radiusH, radiusV, color, fill)
DrawRectangle(x, y, width, height, color, fill)
DrawText(text, x, y, color, background, horizontalAlign, verticalAlign)
DrawCircle(x, y, radius, color, fill)
IsGamepadButtonDown(button, player)
IsGamepadButtonPressed(button, player)
IsMouseButtonDown(button, player)
IsMouseButtonPressed(button, player)
GetMouseX()
GetMouseY()
GetRandomValue(min, max)
SaveStorageValue(position, value)
LoadStorageValue(position)
```

## Usage

1. Copy wasm4-utils.ts to your src directory.
2. Import all the methods by using the following:
    ``` js
    import { SetColor, SetPalette, ClearBackground, DrawLine, DrawPixel, DrawHorizontalLine, DrawVerticalLine, DrawEllipse, DrawRectangle, DrawText, DrawCircle, IsGamepadButtonDown, IsGamepadButtonPressed, IsMouseButtonDown, IsMouseButtonPressed, GetMouseX, GetMouseY, GetRandomValue } from "./wasm4-utils"
    ```

3. Update the path below to your own local "./wasm4".

## License

*wasm4-utils* is licensed under an unmodified zlib/libpng license, which is an OSI-certified, BSD-like license that allows static linking with closed source software. Check [LICENSE](LICENSE) for further details.