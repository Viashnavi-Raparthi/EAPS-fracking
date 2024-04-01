import * as PIXI from 'pixi.js';
import { initAssets } from './assets.ts';

const app = new PIXI.Application();
await app.init({ width: 640, height: 360, preference:'webgl' })
document.body.appendChild(app.canvas);

console.log("Hi")

// Create a Graphics object, draw a rectangle and fill it
let obj = new PIXI.Graphics()
  .rect(0, 0, 200, 100)
  .fill(0xff0000);

// Add it to the stage to render
app.stage.addChild(obj);

await initAssets();

// Create a bunny Sprite
const bunny = PIXI.Sprite.from('home-page');

app.stage.addChild(bunny);