import { Application, Graphics, Sprite } from 'pixi.js';
import { initAssets } from './assets.ts';

const HOLE_WIDTH = 17;
const EXAMPLE_WIDTH = 5;
const PERFORATION_WIDTH = 5;
const DRILL_COLOR = 0x3B240B;
const WATER_COLOR = 0x00819E;

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
  
var canvasContainer = document.getElementById("canvas-container");

const app = new Application();
await app.init({ width: 800, height: 600, preference:'webgl', backgroundColor: 0xCCCCCC})
canvasContainer.appendChild(app.canvas);

await initAssets();

var buildButton;
const BUILD_BUTTON_POSITION = {x: 100, y: 180};
var oilWell;
const WELL_POSITION = {x: 115, y: 130};
var exampleLine;
var drillHole;
var continueBtn;
var retryBtn;
var fillBtn;
var perforateBtn;
var fillProgress;
let fillIntervalId;

const RETRY_BUTTON_POSITION = {x: 300, y: 100};
const CONTINUE_BUTTON_POSITION = {x: 300, y: 160};
const PERFORATION_BUTTON_POSITION = {x: 300, y: 300};

const layerColors = [0xC5F9FE, 0x8CC341, 0x89613B, 0x774B26, 0x27A8E0, 0x554741, 0x736356, 0xCDAC8D]
const layerHeights = [250, 10, 20, 40, 30, 60, 30, 100]

const EXAMPLE_LINE = [{x: 160, y: 260}, {x: 160, y: 400}, { x: 161.37, y: 415.63 }, { x: 165.43, y: 430.78 }, { x: 172.06, y: 445.00 }, { x: 181.06, y: 457.85 }, { x: 192.15, y: 468.94 }, { x: 205.00, y: 477.94 }, { x: 219.22, y: 484.57 }, { x: 234.37, y: 488.63 }, {x: 250, y: 490}, {x: 600, y: 490}];

const PERFORATIONS = [[{x: 300, y: 460}, {x: 300, y: 520}], [{x: 350, y: 460}, {x: 350, y: 520}], [{x: 400, y: 460}, {x: 400, y: 520}], [{x: 450, y: 460}, {x: 450, y: 520}], [{x: 500, y: 460}, {x: 500, y: 520}], [{x: 550, y: 460}, {x: 550, y: 520}]]
const filledPerforations = [];

let drillLine = [];

var dialogueText = document.getElementById("chat-p");

setup();

function setup() {
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  // Define the width and height of each layer
  drawLayers();

  buildButton = Sprite.from('build-well-button');
  buildButton.width = 120;
  buildButton.height = 40;
  buildButton.position = BUILD_BUTTON_POSITION;
  buildButton.eventMode = 'static';
  buildButton.cursor = 'pointer';
  buildButton.on('pointerdown', buildWell);

  app.stage.addChild(buildButton);
}

function drawLayers(startAt = 0) {
  const layerWidth = app.screen.width;

  let depth = 0;
  let layer = new Graphics();
  // Loop through and draw the layers of dirt and rock
  for (let i = 0; i < layerColors.length; i++) {
    if (startAt <= i) {
      layer.rect(0, depth, layerWidth, layerHeights[i]);
      layer.fill(layerColors[i]);
    }
    depth += layerHeights[i];
  }
  app.stage.addChild(layer);
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
  drawLine(EXAMPLE_LINE, EXAMPLE_WIDTH, 0x9E0D03);
}

function setupDrilling() {
  // Create a graphics object for drawing lines
  drillHole = new Graphics();
  
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
        return;
      }

      if (lastPoint == null) {
        lastPoint = newPoint;
      }

      drillHole.moveTo(lastPoint.x, lastPoint.y);
      drillHole.lineTo(newPoint.x, newPoint.y);
      drillHole.stroke({width: HOLE_WIDTH, color: DRILL_COLOR, cap: 'round'}); // Dark brown color

      drillLine.push(lastPoint);

      app.stage.addChild(drillHole);
      
      lastPoint = newPoint;
  }
  
  function onPointerUp() {
    if (lastPoint != null) {
      drillLine.push(lastPoint);
    }
    isDrawing = false;
    lastPoint = null;
    if (drillLine.length > 0) {
      showContinue();
      app.stage.off('pointerdown', onPointerDown);
      app.stage.off('pointermove', onPointerMove);
      app.stage.off('pointerup', onPointerUp);
    }
  }
}

function showContinue() {
  continueBtn = Sprite.from('continue-button');
  continueBtn.width = 120;
  continueBtn.height = 40;
  continueBtn.position = CONTINUE_BUTTON_POSITION;
  continueBtn.eventMode = 'static';
  continueBtn.cursor = 'pointer';
  continueBtn.on('pointerdown', continueFilling);

  app.stage.addChild(continueBtn);

  retryBtn = Sprite.from('retry-button');
  retryBtn.width = 120;
  retryBtn.height = 40;
  retryBtn.position = RETRY_BUTTON_POSITION;
  retryBtn.eventMode = 'static';
  retryBtn.cursor = 'pointer';
  retryBtn.on('pointerdown', retryDrilling);

  app.stage.addChild(retryBtn);
}

function retryDrilling() {
  app.stage.removeChild(drillHole);
  drillLine = [];
  setupDrilling();
  app.stage.removeChild(continueBtn);
  app.stage.removeChild(retryBtn);
}

function continueFilling() {
  app.stage.removeChild(continueBtn);
  app.stage.removeChild(retryBtn);

  fillBtn = Sprite.from('fill-hole-button');
  fillBtn.width = 120;
  fillBtn.height = 40;
  fillBtn.position = RETRY_BUTTON_POSITION;
  fillBtn.eventMode = 'static';
  fillBtn.cursor = 'pointer';
  fillBtn.on('pointerdown', startFilling);
  fillBtn.on('pointerup', endFilling);

  app.stage.addChild(fillBtn);
  fillProgress = 0;
}

function startFilling() {
  fillProgress += 5;
  drawLine(drillLine.slice(0, fillProgress), HOLE_WIDTH, 0xC9C9C9);
  drawLine(drillLine, HOLE_WIDTH - 8, DRILL_COLOR);

  if (fillProgress > drillLine.length) {
    clearTimeout(fillIntervalId);
    setupExplosion();
  } else {
    fillIntervalId = setTimeout(startFilling, 1);
  }
}

function endFilling() {
  clearTimeout(fillIntervalId);
}

function setupExplosion() {
  app.stage.removeChild(fillBtn);

  perforateBtn = Sprite.from('perforation-button');
  perforateBtn.width = 120;
  perforateBtn.height = 40;
  perforateBtn.position = PERFORATION_BUTTON_POSITION;
  perforateBtn.eventMode = 'static';
  perforateBtn.cursor = 'pointer';
  perforateBtn.on('pointerdown', perforate);

  app.stage.addChild(perforateBtn);
}

function perforate() {
  for (let i = 0; i < PERFORATIONS.length; i++) {
    drawLine(PERFORATIONS[i], PERFORATION_WIDTH, DRILL_COLOR);
    filledPerforations[i] = false;
  }
  app.stage.removeChild(perforateBtn);
  setupWater();
}

function setupWater() {
  fillBtn = Sprite.from('fill-hole-button');
  fillBtn.width = 120;
  fillBtn.height = 40;
  fillBtn.position = RETRY_BUTTON_POSITION;
  fillBtn.eventMode = 'static';
  fillBtn.cursor = 'pointer';
  fillBtn.on('pointerdown', fillWater);

  app.stage.addChild(fillBtn);
  fillProgress = 0;
}

function fillWater() {
  fillProgress += 3;
  drawLine(drillLine.slice(0, fillProgress), HOLE_WIDTH - 8, WATER_COLOR);
  fillProgress = Math.min(fillProgress, drillLine.length - 1)

  for (let i = 0; i < PERFORATIONS.length; i++) {
    let line = PERFORATIONS[i];
    if (drillLine[fillProgress].x > line[0].x && !filledPerforations[i]) {
      drawLine(line, PERFORATION_WIDTH, WATER_COLOR);
      createCrackedEffect(line[0], 5, 10, 20, 4, WATER_COLOR);
      createCrackedEffect(line[1], 5, 10, 20, 4, WATER_COLOR);
      filledPerforations[i] = true;
    }
  };

  if (fillProgress > drillLine.length) {
    clearTimeout(fillIntervalId);
  } else {
    fillIntervalId = setTimeout(fillWater, 1);
  }
}

function createCrackedEffect(origin, numLines, minLength, maxLength, lineWidth, color) {
  for (let i = 0; i < numLines; i++) {
    // Calculate random end point for the line
    const angle = Math.random() * Math.PI * 2; // Random angle
    const length = Math.random() * (maxLength - minLength) + minLength; // Random length
    const endX = origin.x + Math.cos(angle) * length;
    const endY = origin.y + Math.sin(angle) * length;

    // Draw the line
    drawLine([origin, {x: endX, y: endY}], lineWidth, color);
  }
}

function drawLine(linePositions, width, color) {
  let exampleLine = new Graphics();

  for (let i = 0; i < linePositions.length - 1; i++) {
    exampleLine.moveTo(linePositions[i].x, linePositions[i].y);
    exampleLine.lineTo(linePositions[i+1].x, linePositions[i+1].y);
    exampleLine.stroke({width: width, color: color, cap: 'round'});

    console.log(exampleLine);
    app.stage.addChild(exampleLine);
  }
}

