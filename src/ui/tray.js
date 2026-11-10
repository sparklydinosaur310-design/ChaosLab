import { TYPE_COLORS } from '../data/elements.js';

export const TRAY_MAX = 8;

const SLOT_W = 36;
const SLOT_H = 32;
const SLOT_GAP = 8;
const TRAY_X = 32;
const TRAY_Y = 304;

function slotX(i) {
    return TRAY_X + i * (SLOT_W + SLOT_GAP);
}

export function getTraySlotAt(px, py) {
    for (let i = 0; i < TRAY_MAX; i++) {
        const x = slotX(i);
        if (px >= x && px < x + SLOT_W && py >= TRAY_Y && py < TRAY_Y + SLOT_H) return i;
    }
    return -1;
}

export function drawTray(ctx, tray, mouse) {
    const over = getTraySlotAt(mouse.x, mouse.y);
    ctx.font = '8px "Press Start 2P"';

    for (let i = 0; i < TRAY_MAX; i++) {
        const x = slotX(i);
        ctx.fillStyle = '#2a1c10';
        ctx.fillRect(x, TRAY_Y, SLOT_W, SLOT_H);

        const el = tray[i];
        if (el) {
            ctx.fillStyle = TYPE_COLORS[el.type];
            ctx.fillRect(x + 3, TRAY_Y + 3, SLOT_W - 6, SLOT_H - 6);
            ctx.fillStyle = '#1a1a20';
            ctx.textAlign = 'center';
            ctx.fillText(el.symbol, x + SLOT_W / 2, TRAY_Y + SLOT_H / 2 + 4);

            if (i === over) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.strokeRect(x + 1, TRAY_Y + 1, SLOT_W - 2, SLOT_H - 2);
            }
        }
    }

    ctx.fillStyle = '#e8e8e0';
    ctx.textAlign = 'left';
    ctx.fillText(`TRAY ${tray.length}/${TRAY_MAX}`, slotX(TRAY_MAX) + 4, TRAY_Y + 14);
    ctx.fillText('CLICK TO REMOVE', slotX(TRAY_MAX) + 4, TRAY_Y + 30 );
}