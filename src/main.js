import { TEACHER_SPRITES } from './sprites/teacherSprites.js';
import { drawSprite } from './sprites/drawSprite.js';
import { drawPeriodicTable, getElementAt } from './ui/periodicTable.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const W = 320;
const H = 180;

function drawClassroom() {
    ctx.fillStyle = '#6f8fa8';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#8a6a4a';
    ctx.fillRect(0, 132, W, H - 132);
    ctx.fillStyle = '#7a5c3e';
    for (let x = 0; x < W; x += 24) ctx.fillRect(x, 132, 2, H - 132);

    ctx.fillStyle = '#3a3a48';
    ctx.fillRect(0, 128, W, 4);

    ctx.fillStyle = '#5a3d24';
    ctx.fillRect(16, 6, 288, 44);
    ctx.fillStyle = '#26382f';
    ctx.fillRect(20, 10, 280, 36);

    ctx.fillStyle = '#e8e8e0';
    ctx.textAlign = 'center';
    ctx.font = '16px "Press Start 2P"';
    ctx.fillText('CHAOSLAB', W / 2, 28);
    ctx.font = '8px "Press Start 2P"';
    ctx.fillText('Safety goggles are recommended.', W / 2, 42);
}

let scene = 'classroom';
let hovered = null;
let selected = null;

function toCanvas(e) {
    const r = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - r.left) * canvas.width / r.width,
        y: (e.clientY - r.top) * canvas.height / r.height,
    };
}

canvas.addEventListener('mousemove', (e) => {
    const p = toCanvas(e);
    hovered = scene === 'lab' ? getElementAt(p.x, p.y) : null;
});

canvas.addEventListener('click', (e) => {
    const p = toCanvas(e);
    if (scene === 'classroom') {
        scene = 'lab';
        hovered = getElementAt(p.x, p.y);
    } else {
        selected = getElementAt(p.x, p.y) || selected;
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') scene = 'classroom';
});

function drawLab() {
    ctx.fillStyle = '#1d2230';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#5a3d24';
    ctx.fillRect(0, 290, canvas.width, 70);
    ctx.fillStyle = '#7a5c3e';
    ctx.fillRect(0, 290, canvas.width, 6);

    ctx.fillStyle = '#e8e8e0';
    ctx.textAlign = 'left';
    ctx.font = '8px "Press Start 2P"';
    ctx.fillText('PERIODIC TABLE', 32, 18);
    ctx.fillText('ESC = BACK TO CLASS', 32, 348);

    drawPeriodicTable(ctx, hovered, selected);
}

function frame(t) {
    if (scene === 'classroom') {
        ctx.save();
        ctx.scale(2, 2);
        drawClassroom();

        const bob = Math.sin(t / 220) * 1.5;
        drawSprite(ctx, TEACHER_SPRITES['teacher-buckley'], 132, 52 + bob, 2);

        if (Math.floor(t / 500) % 2 === 0) {
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.font = '8px "Press Start 2P"';
            ctx.fillText('CLICK TO START', W / 2, 162);
        }
        ctx.restore();
    } else {
        drawLab();
    }
    
    requestAnimationFrame(frame);
}

document.fonts.load('16px "Press Start 2P"').then(
    () => requestAnimationFrame(frame),
    () => requestAnimationFrame(frame)
);