import * as PIXI from 'pixi.js';
import { initAssets } from './assets.ts';

const TOP_OF_DIRT = 330;
const HOLE_WIDTH = 15;

const app = new PIXI.Application();
await app.init({ width: 800, height: 600, preference:'webgl', backgroundColor: 0xCCCCCC})
document.body.appendChild(app.canvas);

await initAssets();

setup()

function setup() {
  // Create a sprite using the dirt texture
  const dirt = PIXI.Sprite.from('empty-field');
  dirt.width = app.screen.width;
  dirt.height = app.screen.height;
  app.stage.addChild(dirt);
  
  // Create a graphics object for drawing lines
  let graphics = new PIXI.Graphics();
  
  //Set up mouse events
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;
  app.stage.on('pointerdown', onPointerDown);
  app.stage.on('pointermove', onPointerMove);
  app.stage.on('pointerup', onPointerUp);
  
  let isDrawing = false;
  let lastPoint = null;
  
  function onPointerDown(event) {
      isDrawing = true;
      lastPoint = event.data.getLocalPosition(app.stage);
      if (lastPoint.y < TOP_OF_DIRT) {
        console.log("Uhoh, you drilled above the ground!")
        lastPoint = null;
      }
  }
  
  function onPointerMove(event) {
      if (!isDrawing) return;
      
      let newPoint = event.data.getLocalPosition(app.stage);
      if (newPoint.y < TOP_OF_DIRT) {
        console.log("Uhoh, you drilled above the ground!");
        lastPoint = null;
      }

      graphics.stroke({width: HOLE_WIDTH, color: 0x3B240B, cap: 'round'}); // Dark brown color
      if (lastPoint == null) {
        lastPoint = newPoint;
      }
      graphics.moveTo(lastPoint.x, lastPoint.y);
      graphics.lineTo(newPoint.x, newPoint.y);

      app.stage.addChild(graphics);

      //graphics = new PIXI.Graphics();
      
      lastPoint = newPoint;
  }
  
  function onPointerUp() {
      isDrawing = false;
      lastPoint = null;
  }
}
