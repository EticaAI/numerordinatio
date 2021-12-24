// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
console.log('numerordinatio.mjs')

export const name = 'square';

export function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return {
    length: length,
    x: x,
    y: y,
    color: color
  };
}