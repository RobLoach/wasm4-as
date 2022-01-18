/**********************************************************************************************
*
*   wasm4-utils - Utility functions for WASM-4 AssemblyScript to ease development.
*
*   DEPENDENCIES:
*       - WASM-4 https://wasm4.org
* 
*   USAGE:
*
*   1. Copy wasm4-utils.ts to your src directory.
*
*   2. Import all the methods by using the following:
*           import { SetColor, SetPalette, ClearBackground, DrawLine, DrawPixel, DrawHorizontalLine, DrawVerticalLine, DrawEllipse, DrawRectangle, DrawText, DrawCircle, IsGamepadButtonDown, IsGamepadButtonPressed, IsMouseButtonDown, IsMouseButtonPressed, GetMouseX, GetMouseY, GetRandomValue } from "wasm4-utils"
*
*   3. Update the path below to your own local "./wasm4".
*
*   LICENSE: zlib/libpng
*
*   wasm4-utils is licensed under an unmodified zlib/libpng license, which is an OSI-certified,
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

import * as w4 from "./wasm4"

/**
 * Sets the drawing colors.
 *
 * @param col1 The color index to use as the first color.
 * @param col2 The color index to use as the second color.
 * @param col3 The color index to use as the third color.
 * @param col4 The color index to use as the fourth color.
 */
export function SetColor(col1:u16 = 1, col2:u16 = 2, col3:u16 = 3, col4:u16 = 4) :void {
    store<u16>(w4.DRAW_COLORS, (col4 << 16) + (col3 << 8) + (col2 << 4) + col1)
}

/**
 * Sets the palette registry.
 *
 * @param col1 u32|string The first color in the registry.
 * @param col2 u32|string The second color in the registry.
 * @param col3 u32|string The third color in the registry.
 * @param col4 u32|string The fourth color in the registry.
 */
export function SetPalette<T>(col1:T, col2:T, col3:T, col4:T) :void {
    if (isString(col1)) {
        store<u32>(w4.PALETTE, Number.parseInt(col1, 16) as u32);
        store<u32>(w4.PALETTE, Number.parseInt(col2, 16) as u32, 4);
        store<u32>(w4.PALETTE, Number.parseInt(col3, 16) as u32, 8);
        store<u32>(w4.PALETTE, Number.parseInt(col4, 16) as u32, 12);
    }
    else {
        store<u32>(w4.PALETTE, col1 as u32);
        store<u32>(w4.PALETTE, col2 as u32, 4);
        store<u32>(w4.PALETTE, col3 as u32, 8);
        store<u32>(w4.PALETTE, col4 as u32, 12);
    }
}

/**
 * Clears the frame buffer to the given color.
 *
 * @param col The color from the palette to use to clear the background.
 */
export function ClearBackground(col:u8 = 0) :void {
    // Adapt the desired color to the index in the palette.
    if (col > 0) {
        col--
    }
    memory.fill(w4.FRAMEBUFFER, col | (col << 2) | (col << 4) | (col << 6), w4.SCREEN_SIZE * w4.SCREEN_SIZE / 4)
}

export function DrawLine(x1:i32, y1:i32, x2:i32, y2:i32, col:u16 = 1) :void {
    SetColor(col)
    if (y1 == y2) {
        w4.hline(x1, y1, x2 - x1)
    }
    else if (x1 == x2) {
        w4.vline(x1, y1, y2 - y1)
    }
    else {
        w4.line(x1, y1, x2, y2)
    }
}

export function DrawHorizontalLine(x1:i32, y1:i32, length:i32, col:u16 = 1) :void {
    SetColor(col)
    w4.hline(x1, y1, length)
}

export function DrawVerticalLine(x1:i32, y1:i32, length:i32, col:u16 = 1) :void {
    SetColor(col)
    w4.vline(x1, y1, length)
}

export function DrawPixel(x:i32, y:i32, col:u16 = 1) :void {
    SetColor(col)
    w4.hline(x, y, 1)
}

export function DrawEllipse(centerX:i32, centerY:i32, radiusH:i32, radiusV:i32, outline:u16 = 1, fill:u16 = 0) :void {
    SetColor(fill, outline)
    w4.oval(centerX - radiusH, centerY - radiusV, radiusH * 2, radiusV * 2)
}

export function DrawRectangle(x:i32, y:i32, width:i32, height:i32, outline:u16 = 1, fill:u16 = 0) :void {
    SetColor(fill, outline)
    w4.rect(x, y, width, height)
}

export function TextWidth(str:string) :i32 {
    return str.length * 8
}

export function TextHeight(str:string) :i32 {
    return str.split('\n').length * 8
}

/**
 * Draws text on the screen at the given coordinates, with the given color, background and alignment.
 *
 * @param horizontalAlign 0 left aligned, 1 center aligned, 2 right aligned.
 * @param verticalAlign 0 top aligned, 1 center aligned, 2 bottom aligned.
 */
export function DrawText(text:string, x:i32, y:i32, col:u16 = 1, background:u16 = 0, horizontalAlign:u8 = 0, verticalAlign:u8 = 0) :void {
    SetColor(col, background)
    
    // TODO: Support newlines in DrawText alignment
    switch (horizontalAlign) {
        case 1:
            x -= TextWidth(text) / 2
            break
        case 2:
            x -= TextWidth(text)
            break
    }

    switch (verticalAlign) {
        case 1:
            y -= TextHeight(text) / 2
            break
        case 2:
            y -= TextHeight(text)
            break
    }

    w4.text(text, x, y)
}

export function DrawCircle(x:i32, y:i32, radius:i32, outline:u16 = 1, fill:u16 = 0) :void {
    SetColor(fill, outline)
    w4.oval(x - radius, y - radius, radius * 2, radius * 2)
}

export function IsGamepadButtonDown(button:u8, player:i32 = 0) :bool {
    return (load<u8>(w4.GAMEPAD1 + player) & button) as bool
}

let btnPreviousState = new Array<u8>(4)
export function IsGamepadButtonPressed(button:u8, player:i32 = 0) :bool {
    let gamepad:u8 = load<u8>(w4.GAMEPAD1 + player)
    let pressedThisFrame:u8 = gamepad & (gamepad ^ btnPreviousState[player])
    btnPreviousState[player] = gamepad
    return (pressedThisFrame & button) as bool
}

export function IsMouseButtonDown(button:u8) :bool {
    return (load<u8>(w4.MOUSE_BUTTONS) & button) as bool
}

let mousebtnPreviousState:u8
export function IsMouseButtonPressed(button:u8) :bool {
    let buttons:u8 = load<u8>(w4.MOUSE_BUTTONS)
    let pressedThisFrame = buttons & (buttons ^ mousebtnPreviousState)
    mousebtnPreviousState = buttons
    return (pressedThisFrame & button) as bool
}

export function GetMouseX() :i16 {
    return load<i16>(w4.MOUSE_X)
}

export function GetMouseY() :i16 {
    return load<i16>(w4.MOUSE_Y)
}

/**
 * Retrieve a random value between the two given values.
 *
 * @param min The minimum number.
 * @param max The maximum number.
 *
 * @return A random number between the min and max.
 */
export function GetRandomValue<T>(min :T, max: T) :T {
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
export function SaveStorageValue(position:u32, value:i32) :bool {
    if (position >= 256) {
        return false
    }

    const temporaryData = memory.data(4) // Size of an i32
    store<i32>(temporaryData, value)
    const ptr = memory.data(1024)
    w4.diskr(ptr, 1024)
    memory.copy(ptr + position * 4, temporaryData, 4)
    w4.diskw(ptr, 1024)

    return true
}

/**
 * Load an integer value from persistent memory.
 *
 * @param position The position of which to load the value.
 *
 * @return The integer value that was saved in memory.
 */
export function LoadStorageValue(position:u32) :i32 {
    if (position >= 256) {
        return 0
    }

    const temporaryData = memory.data(4) // Size of an i32
    const ptr = memory.data(1024)
    w4.diskr(ptr, 1024)
    memory.copy(temporaryData, ptr + position * 4, 4)
    return load<i32>(temporaryData)
}

export const SCREEN_SIZE:u32 = w4.SCREEN_SIZE