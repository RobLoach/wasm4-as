import * as w4 from "./wasm4"

/**
 * Sets the drawing color.
 */
export function color(col1:u16 = 0, col2:u16 = 0, col3:u16 = 0, col4:u16 = 0) :void {
    store<u16>(w4.DRAW_COLORS, (col4 << 16) + (col3 << 8) + (col2 << 4) + col1)
}

export function palette(col1:u32, col2:u32, col3:u32, col4:u32) :void {
    store<u32>(w4.PALETTE, col1);
    store<u32>(w4.PALETTE, col2, 2);
    store<u32>(w4.PALETTE, col3, 4);
    store<u32>(w4.PALETTE, col4, 8);
}

export function cls(col:u8 = 1) :void {
    // Adopt the desired color to the index in the palette.
    if (col - 1 >= 0) {
        col--;
    }
    memory.fill(w4.FRAMEBUFFER, col | (col << 2) | (col << 4) | (col << 6), w4.SCREEN_SIZE * w4.SCREEN_SIZE / 4)
}

export function line(x1:i32, y1:i32, x2:i32, y2:i32, col:u16 = 100) :void {
    if (col != 100) {
        color(col)
    }
    w4.line(x1, y1, x2, y2)
}

export function hline(x:i32, y:i32, len:i32, col:u16 = 100) :void {
    if (col != 100) {
        color(col)
    }
    w4.hline(x, y, len)
}

export function vline(x:i32, y:i32, len:i32, col:u16 = 100) :void {
    if (col != 100) {
        color(col)
    }
    w4.vline(x, y, len)
}

export function oval(x:i32, y:i32, width:i32, height:i32, outline:u16 = 100, fill:u16 = 0) :void {
    if (outline != 100) {
        color(fill, outline)
    }
    w4.oval(x, y, width, height)
}

export function rect(x:i32, y:i32, width:i32, height:i32, outline:u16 = 100, fill:u16 = 0) :void {
    if (outline != 100) {
        color(fill, outline)
    }
    w4.rect(x, y, width, height)
}

export function text(str:string, x:i32, y:i32, col:u16 = 100, background:u16 = 0) :void {
    if (col != 100) {
        color(col, background)
    }
    w4.text(str, x, y)
}

export function circ(x:i32, y:i32, radius:i32, outline:u16 = 100, fill:u16 = 0) :void {
    if (outline != 100) {
        color(fill, outline)
    }
    w4.oval(x - radius / 2, y - radius / 2, radius, radius)
}

export function btn(button:u8, player:i32 = 0) :bool {
    return (load<u8>(w4.GAMEPAD1 + player) & button) as bool
}

let btnPreviousState = new Array<u8>(4)
export function btnp(button:u8, player:i32 = 0) :bool {
    let gamepad:u8 = load<u8>(w4.GAMEPAD1 + player)
    let pressedThisFrame:u8 = gamepad & (gamepad ^ btnPreviousState[player])
    btnPreviousState[player] = gamepad
    return (pressedThisFrame & button) as bool
}

export function mousebtn(button:u8) :bool {
    return (load<u8>(w4.MOUSE_BUTTONS) & button) as bool
}

let mousebtnPreviousState:u8
export function mousebtnp(button:u8) :bool {
    let buttons:u8 = load<u8>(w4.MOUSE_BUTTONS)
    let pressedThisFrame:u8 = buttons & (buttons ^ mousebtnPreviousState)
    mousebtnPreviousState = buttons
    return (pressedThisFrame & button) as bool
}

export function mousex() :i16 {
    return load<i16>(MOUSE_X)
}

export function mousey() :i16 {
    return load<i16>(MOUSE_Y)
}

export function spr(spritePtr:usize, x:i32, y:i32, width:i32, height:i32, flip_x:bool = false, flip_y:bool = false, bpp:i32 = w4.BLIT_2BPP) :void {
    if (flip_x) {
        bpp &= BLIT_FLIP_X;
    }
    if (flip_y) {
        bpp &= BLIT_FLIP_Y;
    }
    w4.blit(spritePtr, x, y, width, height, bpp);
}

export function random<T>(min :T, max: T) :T {
  return (Math.random() * (max - min) + min) as T;
}