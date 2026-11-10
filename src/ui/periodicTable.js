import { ELEMENTS, TYPE_COLORS } from '../data/elements.js';

const TABLE_X = 32;
const TABLE_Y = 28;
const TILE_W = 32;
const TILE_H = 24;
const F_BLOCK_GAP = 8;

const PANEL = { x: TABLE_X + 2 * TILE_W, y: TABLE_Y, w: 10 * TILE_W, h: 3 * TILE_H };
const TAKE_BTN = { x: PANEL.x + PANEL.w - 72, y: PANEL.y + PANEL.h - 28, w: 64, h: 20 };

export function isOnTakeButton(px, py) {
    return px >= TAKE_BTN.x && px < TAKE_BTN.x + TAKE_BTN.w &&
           py >= TAKE_BTN.y && py < TAKE_BTN.y + TAKE_BTN.h;
}

function drawTakeButton(ctx, state) {
    const over = isOnTakeButton(state.mouse.x, state.mouse.y);
    ctx.fillStyle = state.trayFull ? '#555a6a' : (over ? '#ffe27a' : '#ffd23f');
    ctx.fillRect(TAKE_BTN.x, TAKE_BTN.y, TAKE_BTN.w, TAKE_BTN.h);
    ctx.fillStyle = '#1a1a20';
    ctx.font = '8px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText(state.trayFull ? 'FULL' : 'TAKE', TAKE_BTN.x + TAKE_BTN.w / 2, TAKE_BTN.y + 14);
}

function tilePos(el) {
    return {
        x: TABLE_X + el.col * TILE_W,
        y: TABLE_Y + el.row * TILE_H + (el.row >= 7 ? F_BLOCK_GAP: 0),
    };
}

export function getElementAt(px, py) {
    return ELEMENTS.find((el) => {
        const { x, y } = tilePos(el);
        return px >= x && px < x + TILE_W && py >= y && py < y + TILE_H;
    }) || null;
}

function outline(ctx, el, color) {
    if (!el) return;
    const { x, y } = tilePos(el);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, TILE_W - 2, TILE_H - 2);
}

function drawInfoPanel(ctx, el, state) {
    ctx.fillStyle = '#26382f';
    ctx.fillRect(PANEL.x + 2, PANEL.y + 2, PANEL.w - 4, PANEL.h - 4);

    if (!el) {
        ctx.fillStyle = '#e8e8e0';
        ctx.font = '8px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('HOVER AN ELEMENT', PANEL.x + PANEL.w / 2, PANEL.y + PANEL.h / 2 + 4);
        return;
    }

    ctx.textAlign = 'left';
    ctx.fillStyle = TYPE_COLORS[el.type];
    ctx.font = '32px "Press Start 2P"';
    ctx.fillText(el.symbol, PANEL.x + 12, PANEL.y + 44);

    ctx.fillStyle = '#e8e8e0';
    ctx.font = '16px "Press Start 2P"';
    ctx.fillText(el.name, PANEL.x + 100, PANEL.y + 28);
    ctx.font = '8px "Press Start 2P"';
    ctx.fillText('ATOMIC NUMBER ' + el.number, PANEL.x + 100, PANEL.y + 44);
    ctx.fillText(el.type.toUpperCase(), PANEL.x + 100, PANEL.y + 58);
    if (state.selected && !state.hovered) drawTakeButton(ctx, state);
}

export function drawPeriodicTable(ctx, state) {
    const { hovered, selected } = state;
    ctx.font = '8px "Press Start 2P"';
    ctx.textAlign = 'center';
    for (const el of ELEMENTS) {
        const { x, y } = tilePos(el);
        ctx.fillStyle = TYPE_COLORS[el.type];
        ctx.fillRect(x + 1, y + 1, TILE_W - 2, TILE_H - 2);
        ctx.fillStyle = '#1a1a20';
        ctx.fillText(el.symbol, x + TILE_W / 2, y + TILE_H / 2 + 4);
    }

    outline(ctx, selected, '#ffd23f');
    outline(ctx, hovered, '#ffffff');
    drawInfoPanel(ctx, hovered || selected, state);
}