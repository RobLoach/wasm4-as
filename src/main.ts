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
