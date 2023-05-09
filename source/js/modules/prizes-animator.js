import PrizeCounter from './PrizeCounter';

export default class PrizesAnimator {
  constructor (elementSelector, { timeSteps, durations }) {
    this.elementSelector = elementSelector;
    this.timeSteps       = timeSteps || null;
    this.durations       = durations || [];
    this.isUntouch       = true;
  }

  get elements () {
    return document.querySelectorAll(this.elementSelector);
  }

  init () {
    this.correctTimeSteps();
  }

  runAnimations () {
    const counters = [];
    let timeShift  = 0;

    for (let i = 0; i < this.elements.length; i++) {
      const img    = this.elements[i].querySelector(`img`);
      const srcset = img.getAttribute(`data-src`);

      const counterElem = this.elements[i].querySelector(`[data-prize-count]`);
      counters[i]       = new PrizeCounter({
        elem     : counterElem,
        maxCount : Number(counterElem.dataset.prizeCount),
        counterMS: this.durations[i],
        fps      : 12,
      });

      timeShift += this.timeSteps[i];
      counters[i].timeShift = timeShift;

      setTimeout(() => {
        const j = i;
        img.setAttribute(`src`, `${srcset}?time=${Date.now()}`);
        counters[j].start();
      }, timeShift);
    }

    this.touch();
  }

  correctTimeSteps () {
    if (this.timeSteps === null) {
      this.timeSteps = [];

      for (let i = 0; i < this.elements.length; i++) {
        this.timeSteps[i] = 1000;
      }
    }
  }

  touch () {
    this.isUntouch = false;
  }

  run () {
    if (this.isUntouch) {
      this.runAnimations();
    }
  }
}
