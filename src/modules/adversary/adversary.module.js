import { Module, Stream } from '@marcellejs/core';
import * as marcelle from '@marcellejs/core';
import Component from './adversary.svelte';


const adverClass = marcelle.select({
  options: [
    'cat',
    'dog'
  ]
});
adverClass.title = "Turn this image into a:";

const noiseSlider = marcelle.slider();
noiseSlider.title = "Noise";

const viewNoise = marcelle.button({ text: 'View Noise' });

export class Adversary extends Module {
  constructor(options) {
    super();
    this.title = 'Adversarial Image';
    // this.options = options;
    // this.$img = options;

    this.adverClass = adverClass;
    this.noiseSlider = noiseSlider;
    this.viewNoise = viewNoise;

    console.log(this.$img);
  }

  update(image) {
    this.$img = image;
    document.getElementById("sketchImage").src = image;
    console.log(this.$img);
  }

  mount(target) {
    const t = target || document.querySelector(`#${this.id}`);
    if (!t) return;
    this.destroy();
    this.$$.app = new Component({
      target: t,
      props: {
        title: this.title,
        // img: this.$img,
        // options: this.options,
        // adverClass: this.adverClass,
        // noiseSlider: this.noiseSlider,
        // viewNoise: this.viewNoise,
      },
    });

    this.adverClass.mount(t);
    this.noiseSlider.mount(t);
    this.viewNoise.mount(t);
  }
}
