export default class PrizesAnimator {

  constructor (elementSelector, { timeSteps }) {
    this.elementSelector = elementSelector;
    this.timeSteps       = timeSteps || null;
    this.isUntouch       = true;
  }

  get elements () {
    return document.querySelectorAll(this.elementSelector);
  }

  init () {
    this.correctTimeSteps();
  }

  setSvgToImg () {
    let timeShift = 0;

    for (let i = 0; i < this.elements.length; i++) {
      const source = this.elements[i].querySelector('source');
      const img    = this.elements[i].querySelector('img');
      const srcset = source.getAttribute('srcset');
      timeShift += this.timeSteps[i];

      setTimeout(() => {
        img.setAttribute('src', `${srcset}?time=${Date.now()}`);
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

  runAnimation () {
    if (this.isUntouch) {
      this.setSvgToImg();
    }
  }
}
