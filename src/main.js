import { TEACHER_SPRITES } from './sprites/teacherSprites.js';
import { drawSprite } from './sprites/drawSprite.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const W = canvas.width;
const H = canvas.height;

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

function frame(t) {
    drawClassroom();

    const bob = Math.sin(t / 220) * 1.5;
    const sprite = TEACHER_SPRITES['teacher-buckley'];
    drawSprite(ctx, sprite, 132, 52 + bob, 2);

    requestAnimationFrame(frame);
}

document.fonts.load('16px "Press Start 2P"').then(
    () => requestAnimationFrame(frame),
    () => requestAnimationFrame(frame)
);