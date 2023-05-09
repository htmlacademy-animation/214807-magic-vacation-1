export default class StepsAnimation {
  constructor ({ counterMS, fps = 1 }) {
    this.limit     = counterMS || 1000;
    this.counter   = this.limit;
    this.requestId = null;

    this.fpsInterval = 1000 / fps;
    this.now         = null;
    this.then        = null;
    this.elapsed     = null;
    this.startTime   = null;
  }

  start () {
    this.then      = Date.now();
    this.requestId = window.requestAnimationFrame(this.step.bind(this));
  }

  step (timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp;
    }

    let progress = timestamp - this.startTime;

    this.now     = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);

      this.draw(this.elapsed);
    }

    if (progress < this.limit) {
      window.requestAnimationFrame(this.step.bind(this));
    }
    else {
      this.end();
    }
  }

  end () {
    window.cancelAnimationFrame(this.requestId);
    this.reset();
  }

  reset () {
    this.counter   = this.limit;
    this.startTime = null;
    this.requestId = null;

    this.now       = null;
    this.then      = null;
    this.elapsed   = null;
    this.startTime = null;

    this.updateCounterInElem();
  }

  draw (elapsed) {}
}
