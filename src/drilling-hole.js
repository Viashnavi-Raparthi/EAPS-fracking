import * as PIXI from 'pixi.js';
import { initAssets } from './assets.ts';

const TOP_OF_DIRT = 330;
const HOLE_WIDTH = 15;

const colonelSpeeches = [
  "Oh, no! Trust me we’ve got a much better system worked out now. Here, how about I show you how it’s done here. Remember that each step is crucial to the success of the entire operation."
  ];
  
  const userSpeeches = [
  "Wait, but how does this whole process work? I mean we’re surely not just still throwing explosives down into a well, right",
  "Okay!"
  ];
  
  const textBlobs = [
  "Drill a wellbore vertically into the Earth. This will go through the layers of sediment and rock until it reaches our targeted shale formation. We can also extend our wellbore horizontally and make it go through the shale reservoir to help maximize the amount of contact",
  "Now we need to mix some fracking fluid.",
  "Grab this bucket and add water, sand, and some proppant.",
  "Since the fracking fluid has sand, the sand props the fractures open. The sand here serves as a proppant, allowing the hydrocarbons to flow more freely to the surface. The chemical additives in the fluid also help keep the process efficient by reducing friction and preventing bacterial growth within the wellbore"
  ];
  

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
