import { Application, Graphics, Sprite } from 'pixi.js';
import { initAssets } from './assets.ts';

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
  

const app = new Application();
await app.init({ width: 800, height: 600, preference:'webgl', backgroundColor: 0xCCCCCC})
document.body.appendChild(app.canvas);

await initAssets();

setup()

function setup() {
  // Define colors for dirt and rock
  const layerColors = [0xC5F9FE, 0x8CC341, 0x89613B, 0x774B26, 0x27A8E0, 0x554741, 0x736356, 0xCDAC8D]
  const layerHeights = [250, 10, 20, 40, 30, 60, 30, 100]

  // Define the width and height of each layer
  const layerWidth = app.screen.width;

  let depth = 0;
  // Loop through and draw the layers of dirt and rock
  for (let i = 0; i < layerColors.length; i++) {
    let layer = new Graphics()
      .rect(0, depth, layerWidth, layerHeights[i])
      .fill(layerColors[i]);
    depth += layerHeights[i];
    app.stage.addChild(layer);
  }

  const button = Sprite.from('build-well-button');
  button.width = 120;
  button.height = 40;
  button.x = 100;
  button.y = 180;
  app.stage.addChild(button);
}

function setupDrilling() {
  // Create a graphics object for drawing lines
  let graphics = new Graphics();
  
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
      if (newPoint.y < layerHeights[0] + (HOLE_WIDTH/2)) {
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
