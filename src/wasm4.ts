/**********************************************************************************************
*
*   wasm4-as - Drop-in replacement for WASM-4's AssemblyScript to ease development.
*
*   DEPENDENCIES:
*       - WASM-4 https://wasm4.org
* 
*   USAGE:
*       1. Replace your project's wasm4.ts with this one in your src directory.
*
*       2. Import using one of the following:
*           import * as w4 from "./wasm4"
*
*           import { color, palette, cls, line, pixel, hline, vline, ellipse, oval, rect, text, textWidth, textHeight, circ, btn, btnp, mouse, mousep, mousex, mousey, rand, diskw, diskr } from "./wasm4"
*
*   LICENSE: zlib/libpng
*
*   wasm4-as is licensed under an unmodified zlib/libpng license, which is an OSI-certified,
*   BSD-like license that allows static linking with closed source software:
*
*   Copyright (c) 2022 Rob Loach (@RobLoach)
*
*   This software is provided "as-is", without any express or implied warranty. In no event
*   will the authors be held liable for any damages arising from the use of this software.
*
*   Permission is granted to anyone to use this software for any purpose, including commercial
*   applications, and to alter it and redistribute it freely, subject to the following restrictions:
*
*     1. The origin of this software must not be misrepresented; you must not claim that you
*     wrote the original software. If you use this software in a product, an acknowledgment
*     in the product documentation would be appreciated but is not required.
*
*     2. Altered source versions must be plainly marked as such, and must not be misrepresented
*     as being the original software.
*
*     3. This notice may not be removed or altered from any source distribution.
*
**********************************************************************************************/

//
// WASM-4: https://wasm4.org/docs

// ┌───────────────────────────────────────────────────────────────────────────┐
// │                                                                           │
// │ Platform Constants                                                        │
// │                                                                           │
// └───────────────────────────────────────────────────────────────────────────┘

export const SCREEN_SIZE: u32 = 160;

// ┌───────────────────────────────────────────────────────────────────────────┐
// │                                                                           │
// │ Memory Addresses                                                          │
// │                                                                           │
// └───────────────────────────────────────────────────────────────────────────┘

export const PALETTE: usize = 0x04;
export const DRAW_COLORS: usize = 0x14;
export const GAMEPAD1: usize = 0x16;
export const GAMEPAD2: usize = 0x17;
export const GAMEPAD3: usize = 0x18;
export const GAMEPAD4: usize = 0x19;
export const MOUSE_X: usize = 0x1a;
export const MOUSE_Y: usize = 0x1c;
export const MOUSE_BUTTONS: usize = 0x1e;
export const SYSTEM_FLAGS: usize = 0x1f;
export const FRAMEBUFFER: usize = 0xa0;

export const BUTTON_1: u8 = 1;
export const BUTTON_2: u8 = 2;
export const BUTTON_LEFT: u8 = 16;
export const BUTTON_RIGHT: u8 = 32;
export const BUTTON_UP: u8 = 64;
export const BUTTON_DOWN: u8 = 128;

export const MOUSE_LEFT: u8 = 1;
export const MOUSE_RIGHT: u8 = 2;
export const MOUSE_MIDDLE: u8 = 4;

export const SYSTEM_PRESERVE_FRAMEBUFFER = 1;
export const SYSTEM_HIDE_GAMEPAD_OVERLAY = 2;

// ┌───────────────────────────────────────────────────────────────────────────┐
// │                                                                           │
// │ Drawing Functions                                                         │
// │                                                                           │
// └───────────────────────────────────────────────────────────────────────────┘

/** Copies pixels to the framebuffer. */
// @ts-ignore: decorator
@external("env", "blit")
export declare function blit (spritePtr: usize, x: i32, y: i32, width: u32, height: u32, flags: u32): void;

/** Copies a subregion within a larger sprite atlas to the framebuffer. */
// @ts-ignore: decorator
@external("env", "blitSub")
export declare function blitSub (spritePtr: usize, x: i32, y: i32, width: u32, height: u32,
    srcX: u32, srcY: u32, stride: i32, flags: u32): void;

export const BLIT_1BPP: u32 = 0;
export const BLIT_2BPP: u32 = 1;
export const BLIT_FLIP_X: u32 = 2;
export const BLIT_FLIP_Y: u32 = 4;
export const BLIT_ROTATE: u32 = 8;

/** Draws a line between two points. */
// @ts-ignore: decorator
@external("env", "line")
declare function w4line (x1: i32, y1: i32, x2: i32, y2: i32): void;

/** Draws a horizontal line. */
// @ts-ignore: decorator
@external("env", "hline")
declare function w4hline (x: i32, y: i32, len: u32): void;

/** Draws a vertical line. */
// @ts-ignore: decorator
@external("env", "vline")
declare function w4vline (x: i32, y: i32, len: u32): void;

/** Draws an oval (or circle). */
// @ts-ignore: decorator
@external("env", "oval")
declare function w4oval (x: i32, y: i32, width: u32, height: u32): void;

/** Draws a rectangle. */
// @ts-ignore: decorator
@external("env", "rect")
declare function w4rect (x: i32, y: i32, width: u32, height: u32): void;

/** Draws text using the built-in system font. */
function w4text (str: string, x: i32, y: i32): void {
    const byteLength = load<u32>(changetype<usize>(str) - 4);
    textUtf16(str, byteLength, x, y);
}

// @ts-ignore: decorator
@external("env", "textUtf16")
declare function textUtf16 (text: string, byteLength: u32, x: i32, y: i32): void;

// ┌───────────────────────────────────────────────────────────────────────────┐
// │                                                                           │
// │ Sound Functions                                                           │
// │                                                                           │
// └───────────────────────────────────────────────────────────────────────────┘

/** Plays a sound tone. */
// @ts-ignore: decorator
@external("env", "tone")
export declare function tone (frequency: u32, duration: u32, volume: u32, flags: u32): void;

export const TONE_PULSE1: u32 = 0;
export const TONE_PULSE2: u32 = 1;
export const TONE_TRIANGLE: u32 = 2;
export const TONE_NOISE: u32 = 3;
export const TONE_MODE1: u32 = 0;
export const TONE_MODE2: u32 = 4;
export const TONE_MODE3: u32 = 8;
export const TONE_MODE4: u32 = 12;

// ┌───────────────────────────────────────────────────────────────────────────┐
// │                                                                           │
// │ Storage Functions                                                         │
// │                                                                           │
// └───────────────────────────────────────────────────────────────────────────┘

/** Reads up to `size` bytes from persistent storage into the pointer `destPtr`. */
// @ts-ignore: decorator
@external("env", "diskr")
declare function w4diskr (dest: usize, size: u32): u32;

/** Writes up to `size` bytes from the pointer `srcPtr` into persistent storage. */
// @ts-ignore: decorator
@external("env", "diskw")
declare function w4diskw (src: usize, size: u32): u32;

// ┌───────────────────────────────────────────────────────────────────────────┐
// │                                                                           │
// │ Other Functions                                                           │
// │                                                                           │
// └───────────────────────────────────────────────────────────────────────────┘

/** Prints a message to the debug console. */
export function trace (str: string): void {
    const ptr = changetype<usize>(str);
    const byteLength = load<u32>(ptr - 4);
    traceUtf16(ptr, byteLength);
}

// @ts-ignore: decorator
@external("env", "traceUtf16")
declare function traceUtf16 (str: usize, byteLength: u32): void;

// Pass abort messages to trace()
function abortHandler (message: string | null, fileName: string | null, lineNumber: u32, columnNumber: u32) :void {
    const ptr = changetype<usize>(message);
    if (ptr != 0) {
        const byteLength = load<u32>(ptr - 4);
        traceUtf16(ptr, byteLength);
    }
}

// Avoid requiring an external seed. Call `Math.seedRandom()` to manually seed `Math.random()`.
function seedHandler (): f64 {
    return 0;
}

/**
 * Sets the drawing colors.
 *
 * @param col1 The color index to use as the first color.
 * @param col2 The color index to use as the second color.
 * @param col3 The color index to use as the third color.
 * @param col4 The color index to use as the fourth color.
 */
export function color(col1:u16 = 1, col2:u16 = 2, col3:u16 = 3, col4:u16 = 4) :void {
    store<u16>(DRAW_COLORS, (col4 << 16) + (col3 << 8) + (col2 << 4) + col1)
}

/**
 * Sets the palette registry using either numbers, or hex strings.
 *
 * @param col1 u32|string The first color in the registry.
 * @param col2 u32|string The second color in the registry.
 * @param col3 u32|string The third color in the registry.
 * @param col4 u32|string The fourth color in the registry.
 */
export function palette<T>(col1:T, col2:T, col3:T, col4:T) :void {
    if (isString(col1)) {
        store<u32>(PALETTE, Number.parseInt(col1, 16) as u32);
        store<u32>(PALETTE, Number.parseInt(col2, 16) as u32, 4);
        store<u32>(PALETTE, Number.parseInt(col3, 16) as u32, 8);
        store<u32>(PALETTE, Number.parseInt(col4, 16) as u32, 12);
    }
    else {
        store<u32>(PALETTE, col1 as u32);
        store<u32>(PALETTE, col2 as u32, 4);
        store<u32>(PALETTE, col3 as u32, 8);
        store<u32>(PALETTE, col4 as u32, 12);
    }
}

/**
 * Clears the frame buffer to the given color.
 *
 * @param col The color from the palette to use to clear the background.
 */
export function cls(col:u8 = 0) :void {
    // Adapt the desired color to the index in the palette.
    if (col > 0) {
        col--
    }
    memory.fill(FRAMEBUFFER, col | (col << 2) | (col << 4) | (col << 6), SCREEN_SIZE * SCREEN_SIZE / 4)
}

/**
 * Draw a line on the screen.
 */
export function line(x1:i32, y1:i32, x2:i32, y2:i32, col:u16 = 1) :void {
    color(col)
    if (y1 == y2) {
        w4hline(x1, y1, x2 - x1)
    }
    else if (x1 == x2) {
        w4vline(x1, y1, y2 - y1)
    }
    else {
        w4line(x1, y1, x2, y2)
    }
}

export function hline(x1:i32, y1:i32, length:i32, col:u16 = 1) :void {
    color(col)
    w4hline(x1, y1, length)
}

export function vline(x1:i32, y1:i32, length:i32, col:u16 = 1) :void {
    color(col)
    w4vline(x1, y1, length)
}

export function pixel(x:i32, y:i32, col:u16 = 1) :void {
    color(col)
    w4hline(x, y, 1)
}

export function ellipse(centerX:i32, centerY:i32, radiusH:i32, radiusV:i32, outline:u16 = 1, fill:u16 = 0) :void {
    color(fill, outline)
    w4oval(centerX - radiusH, centerY - radiusV, radiusH * 2, radiusV * 2)
}

export function oval(x:i32, y:i32, width:i32, height:i32, outline:u16 = 1, fill:u16 = 0) :void {
    color(fill, outline)
    w4oval(x, y, width, height)
}

export function rect(x:i32, y:i32, width:i32, height:i32, outline:u16 = 1, fill:u16 = 0) :void {
    color(fill, outline)
    w4rect(x, y, width, height)
}

export function textWidth(str:string) :i32 {
    return str.length * 8
}

export function textHeight(str:string) :i32 {
    return str.split('\n').length * 8
}

/**
 * Draws text on the screen at the given coordinates, with the given color, background and alignment.
 *
 * @param horizontalAlign 0 left aligned, 1 center aligned, 2 right aligned.
 * @param verticalAlign 0 top aligned, 1 center aligned, 2 bottom aligned.
 */
export function text(text:string, x:i32, y:i32, col:u16 = 1, background:u16 = 0, horizontalAlign:u8 = 0, verticalAlign:u8 = 0) :void {
    color(col, background)
    
    // TODO: Support newlines in DrawText alignment
    switch (horizontalAlign) {
        case 1:
            x -= textWidth(text) / 2
            break
        case 2:
            x -= textWidth(text)
            break
    }

    switch (verticalAlign) {
        case 1:
            y -= textHeight(text) / 2
            break
        case 2:
            y -= textHeight(text)
            break
    }

    w4text(text, x, y)
}

export function circ(x:i32, y:i32, radius:i32, outline:u16 = 1, fill:u16 = 0) :void {
    color(fill, outline)
    w4oval(x - radius, y - radius, radius * 2, radius * 2)
}

export function btn(button:u8, player:i32 = 0) :bool {
    return (load<u8>(GAMEPAD1 + player) & button) as bool
}

let btnPreviousState = new Array<u8>(4)
export function bntp(button:u8, player:i32 = 0) :bool {
    let gamepad:u8 = load<u8>(GAMEPAD1 + player)
    let pressedThisFrame:u8 = gamepad & (gamepad ^ btnPreviousState[player])
    btnPreviousState[player] = gamepad
    return (pressedThisFrame & button) as bool
}

export function mouse(button:u8) :bool {
    return (load<u8>(MOUSE_BUTTONS) & button) as bool
}

let mousebtnPreviousState:u8
export function mousep(button:u8) :bool {
    let buttons:u8 = load<u8>(MOUSE_BUTTONS)
    let pressedThisFrame = buttons & (buttons ^ mousebtnPreviousState)
    mousebtnPreviousState = buttons
    return (pressedThisFrame & button) as bool
}

/**
 * Get the X coordinate of the mouse.
 */
export function mousex() :i16 {
    return load<i16>(MOUSE_X)
}

/**
 * Get the Y coordinate of the mouse.
 */
export function mousey() :i16 {
    return load<i16>(MOUSE_Y)
}

/**
 * Retrieve a random value between the two given values.
 *
 * @param min The minimum number.
 * @param max The maximum number.
 *
 * @return A random number between the min and max.
 */
export function rand<T>(min :T, max: T) :T {
  return (Math.random() * (max - min) + min) as T;
}

/**
 * Save an integer value to persistent memory.
 *
 * @param position The position of which to save the value.
 * @param value The value to save into persistent memory.
 *
 * @return True when the file saves correctly.
 */
export function diskw(position:u32, value:i32) :bool {
    if (position >= 256) {
        return false
    }

    const temporaryData = memory.data(4) // Size of an i32
    store<i32>(temporaryData, value)
    const ptr = memory.data(1024)
    w4diskr(ptr, 1024)
    memory.copy(ptr + position * 4, temporaryData, 4)
    w4diskw(ptr, 1024)

    return true
}

/**
 * Load an integer value from persistent memory.
 *
 * @param position The position of which to load the value.
 *
 * @return The integer value that was saved in memory.
 */
export function diskr(position:u32) :i32 {
    if (position >= 256) {
        return 0
    }

    const temporaryData = memory.data(4) // Size of an i32
    const ptr = memory.data(1024)
    w4diskr(ptr, 1024)
    memory.copy(temporaryData, ptr + position * 4, 4)
    return load<i32>(temporaryData)
}