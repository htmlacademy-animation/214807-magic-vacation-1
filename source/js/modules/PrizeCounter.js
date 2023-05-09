import StepsAnimation from './StepsAnimation';

export default class PrizeCounter extends StepsAnimation {
  constructor ({ elem, maxCount, counterMS, fps = 1 }) {
    super({ counterMS, fps });
    this.prizeCounterElem = elem;
    this.maxCount         = maxCount;
    this.shiftCount       = 1;
    this.counter          = 1;

    this.init();
  }

  init () {
    this.shiftCount = Number(this.prizeCounterElem.dataset.prizeStart);
    this.distance   = this.maxCount - this.shiftCount;
    this.counter    = this.shiftCount;
  }

  draw (elapsed) {
    if (elapsed) {
      this.counter += (this.distance * elapsed) / this.limit;
      this.counter = Math.ceil(this.counter);

      this.prizeCounterElem.innerHTML = this.counter < this.maxCount ? this.counter : this.maxCount;
    }
  }
}
