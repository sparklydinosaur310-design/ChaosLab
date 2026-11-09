const cache = new Map();

function bake(sprite) {
    const h = sprite.rows.length;
    const w = sprite.rows[0].length;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const g = c.getContext('2d');
    sprite.rows.forEach((row, y) => {
        [...row].forEach((ch, x) => {
            if (ch === '.') return;
            g.fillStyle = sprite.colors[ch];
            g.fillRect(x, y, 1, 1);
        });
    });
    return c;
}

export function drawSprite(ctx, sprite, x, y, scale = 1) {
    if (!cache.has(sprite)) cache.set(sprite, bake(sprite));
    const img = cache.get(sprite);
    ctx.drawImage(img, Math.round(x), Math.round(y), img.width * scale, img.height * scale);
}