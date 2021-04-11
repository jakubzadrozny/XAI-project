import '@marcellejs/core/dist/marcelle.css';
import * as marcelle from '@marcellejs/core';
import { adversary } from './modules';

const fileUpload = marcelle.fileUpload();
fileUpload.title = 'Upload model files (.json and .bin)';

const imgUpload = marcelle.imageUpload();
const sketchpad = marcelle.sketchpad();
const webcam = marcelle.webcam();

let adversarialAttack = adversary(sketchpad.$images);
sketchpad.$images.subscribe((img) => {
  console.log(img);
  adversarialAttack.update(sketchpad.$thumbnails.value);
});

// Requires a stream of predictions
// conf = marcelle.classificationPlot();

const origConfidence = marcelle.chart({
  preset: 'bar',
});

const attackConfidence = marcelle.chart({
  preset: 'bar',
});

// Dashboard Interface
const myDashboard = marcelle.dashboard({
  title: 'XAI',
  author: 'Group E',
});

myDashboard
  .page('Adversarial attacks')
  .useLeft(fileUpload, sketchpad)
  .use([imgUpload, adversarialAttack], [origConfidence, attackConfidence]);

myDashboard.start();
