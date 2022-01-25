# WASM-4 AssemblyScript Extras

WASM-4 AssemblyScript Extras (*wasm4-as*) is a drop-in replacement to WASM-4's [`wasm4.ts`](src/wasm4.ts) to ease development and make using WASM-4 with AssemblyScript feel more at home.

## Features

- Set the palette using hex strings
- Rapidly change drawing colors directly through the drawing methods
- Input API to check if buttons were pressed once
- Write to persistent memory like an integer array
- Clean API to avoid having to reference the WASM-4 memory address banks directly

## Example

``` js
import * as w4 from "./wasm4"

export function start() : void {
    // Palette
    // https://lospec.com/palette-list/mononoke-san
    w4.palette("03324e", "c74148", "dbb9a0", "ffffff")
}

export function update (): void {
    // Clear the screen.
    w4.cls()

    // Draw some Rectangles
    w4.rect(0, 0, w4.SCREEN_SIZE / 2, w4.SCREEN_SIZE / 2, 1, 1)
    w4.rect(w4.SCREEN_SIZE / 2, 0, w4.SCREEN_SIZE / 2, w4.SCREEN_SIZE / 2, 2, 2)
    w4.rect(0, w4.SCREEN_SIZE / 2, w4.SCREEN_SIZE / 2, w4.SCREEN_SIZE / 2, 3, 3)
    w4.rect(w4.SCREEN_SIZE / 2, w4.SCREEN_SIZE / 2, w4.SCREEN_SIZE / 2, w4.SCREEN_SIZE / 2, 4, 4)

    // Shapes
    w4.circ(10, 20, 10, 3, 2)
    w4.ellipse(40, 20, 10, 5, 3, 2)
    w4.line(80, 120, 50, 80, 2)
    w4.pixel(w4.mousex(), w4.mousey(), 2)

    // Text
    w4.text("Hello World!", w4.SCREEN_SIZE / 2, w4.SCREEN_SIZE / 2, 4, 2, 1, 1)

    // Input
    if (w4.mouse(w4.MOUSE_LEFT)) {
        w4.text("Random Number: " + w4.rand(0, 100).toString(), 0, w4.SCREEN_SIZE, 1, 0, 0, 2)
    }
}
```

## Quick Start

``` bash
npm i
npm start
```

## Usage

1. Replace your project's `wasm4.ts` this [wasm4.ts](src/wasm4.ts)
2. Import all the methods by using either of the following:
    ``` js
    // WASM-4
    import * as w4 from "./wasm4"

    // WASM-4
    import { color, palette, cls, line, pixel, hline, vline, ellipse, oval, rect, text, textWidth, textHeight, circ, btn, btnp, mouse, mousep, mousex, mousey, rand, diskw, diskr } from "./wasm4"
    ```

## API

The API builds ontop of the base WASM-4 API to be a bit more user-friendly.

``` js
color([color1], [color2], [color3], [color4])
palette(color1, color2, color3, color4)
cls([color])
line(x1, y1, x2, y2, [color])
pixel(x, y, [color])
hline(x, y, length, [color])
vline(x, y, length, [color])
ellipse(x, y, radiusH, radiusV, [color], [fill])
rect(x, y, width, height, [color], [fill])
text(text, x, y, [color], [background], [horizontalAlign], [verticalAlign])
circ(x, y, radius, [color], [fill])
btn(button, [player])
btnp(button, [player])
mouse(button)
mousep(button)
mousex()
mousey()
rand(min, max)
diskw(position, value)
diskr(position)
```

## License

*wasm4-as* is licensed under an unmodified zlib/libpng license, which is an OSI-certified, BSD-like license that allows static linking with closed source software. Check [LICENSE](LICENSE) for further details.
