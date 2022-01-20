# WASM-4 AssemblyScript Extras

WASM-4 AssemblyScript Extras (*wasm4-as*) is a drop-in replacement to WASM-4's default API to ease development and make using WASM-4 feel more at home.

## Features

- Set the palette using hex strings
- Rapidly change drawing colors directly through the drawing methods
- Input API to check if buttons were pressed once
- Write to persistent memory like an integer array
- Save having to reference API memory addresses directly

## API

The API is highly inspired by raylib, Borland BGI and XNA, aiming to be easy to read and understand.

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

## Usage

1. Replace your project's `wasm4.ts` this [wasm4.ts](src/wasm4.ts)
2. Import all the methods by using either of the following:
    ``` js
    // WASM-4
    import * as w4 from "./wasm4"

    // WASM-4
    import { color, palette, cls, line, pixel, hline, vline, ellipse, oval, rect, text, textWidth, textHeight, circ, btn, btnp, mouse, mousep, mousex, mousey, rand, diskw, diskr } from "./wasm4"
    ```

## License

*wasm4-as* is licensed under an unmodified zlib/libpng license, which is an OSI-certified, BSD-like license that allows static linking with closed source software. Check [LICENSE](LICENSE) for further details.