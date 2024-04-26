import { Application, Graphics, Sprite } from 'pixi.js';
import { initAssets } from './assets.ts';

const HOLE_WIDTH = 15;
const EXAMPLE_WIDTH = 5;

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

var buildButton;
const BUILD_BUTTON_POSITION = {x: 100, y: 180};
var oilWell;
const WELL_POSITION = {x: 115, y: 130};
var exampleLine;

const layerColors = [0xC5F9FE, 0x8CC341, 0x89613B, 0x774B26, 0x27A8E0, 0x554741, 0x736356, 0xCDAC8D]
const layerHeights = [250, 10, 20, 40, 30, 60, 30, 100]

const EXAMPLE_LINE = [{x: 160, y: 260}, {x: 160, y: 400}, { x: 161.37, y: 415.63 }, { x: 165.43, y: 430.78 }, { x: 172.06, y: 445.00 }, { x: 181.06, y: 457.85 }, { x: 192.15, y: 468.94 }, { x: 205.00, y: 477.94 }, { x: 219.22, y: 484.57 }, { x: 234.37, y: 488.63 }, {x: 250, y: 490}, {x: 600, y: 490}];

setup();

function setup() {
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  // Define the width and height of each layer
  const layerWidth = app.screen.width;

  let depth = 0;
  let layer = new Graphics();
  // Loop through and draw the layers of dirt and rock
  for (let i = 0; i < layerColors.length; i++) {
    layer.rect(0, depth, layerWidth, layerHeights[i]);
    layer.fill(layerColors[i]);
    depth += layerHeights[i];
    app.stage.addChild(layer);
  }

  buildButton = Sprite.from('build-well-button');
  buildButton.width = 120;
  buildButton.height = 40;
  buildButton.position = BUILD_BUTTON_POSITION;
  buildButton.eventMode = 'static';
  buildButton.cursor = 'pointer';
  buildButton.on('pointerdown', buildWell);

  app.stage.addChild(buildButton);
}

function buildWell() {
  app.stage.removeChild(buildButton);

  oilWell = Sprite.from('oil-well');
  oilWell.width = 90;
  oilWell.height = 120;
  oilWell.position = WELL_POSITION;
  oilWell.on('pointerdown', buildWell);

  app.stage.addChild(oilWell);
  setupDrilling();
  drawExampleLine();
}

function setupDrilling() {
  // Create a graphics object for drawing lines
  let graphics = new Graphics();
  
  //Set up mouse events
  app.stage.on('pointerdown', onPointerDown);
  app.stage.on('pointermove', onPointerMove);
  app.stage.on('pointerup', onPointerUp);
  
  let isDrawing = false;
  let lastPoint = null;
  
  function onPointerDown(event) {
      isDrawing = true;
      lastPoint = event.data.getLocalPosition(app.stage);
      if (lastPoint.y < layerHeights[0] + (HOLE_WIDTH/2)) {
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

      if (lastPoint == null) {
        lastPoint = newPoint;
      }
      graphics.moveTo(lastPoint.x, lastPoint.y);
      graphics.lineTo(newPoint.x, newPoint.y);
      graphics.stroke({width: HOLE_WIDTH, color: 0x3B240B, cap: 'round'}); // Dark brown color

      app.stage.addChild(graphics);
      
      lastPoint = newPoint;
  }
  
  function onPointerUp() {
      isDrawing = false;
      lastPoint = null;
  }
}

function drawExampleLine() {
  let exampleLine = new Graphics();

  for (let i = 0; i < EXAMPLE_LINE.length - 1; i++) {
    exampleLine.moveTo(EXAMPLE_LINE[i].x, EXAMPLE_LINE[i].y);
    exampleLine.lineTo(EXAMPLE_LINE[i+1].x, EXAMPLE_LINE[i+1].y);
    exampleLine.stroke({width: EXAMPLE_WIDTH, color: 0x9E0D03, cap: 'round'});

    console.log(exampleLine);
    app.stage.addChild(exampleLine);
  }
}

