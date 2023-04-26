const MESSAGE_BTN = `messageButton`;
const GAME_COUNTER_MINUTES = `gameCounterMinutes`;
const GAME_COUNTER_SECONDS = `gameCounterSeconds`;

export default class GameCounter {
  constructor({counterMS, fps = 1}) {
    this.limit = counterMS || 5 * 60 * 1000;
    this.counter = this.limit;
    this.requestId = null;

    this.fpsInterval = 1000 / fps;
    this.now = null;
    this.then = null;
    this.elapsed = null;
    this.startTime = null;

    this.gameCounterMinutesElem = null;
    this.gameCounterSecondsElem = null;
    this.messageButtonElem = null;
  }

  init() {
    this.gameCounterMinutesElem = document.getElementById(GAME_COUNTER_MINUTES);
    this.gameCounterSecondsElem = document.getElementById(GAME_COUNTER_SECONDS);
    this.messageButtonElem = document.getElementById(MESSAGE_BTN);

    // eslint-disable-next-line no-console
    console.log(this.gameCounterMinutesElem);

    this.messageButtonElem.addEventListener(`click`, () => {
      if (this.startTime) {
        return;
      }
      this.start();
    });
  }

  start() {
    this.then = Date.now();
    this.requestId = window.requestAnimationFrame(this.step.bind(this));
  }

  updateTimeInElems() {
    this.counter = this.counter - this.elapsed;
    const minutes = Math.floor(this.counter / (60 * 1000));
    const seconds = Math.ceil((this.counter - (minutes * 60 * 1000)) / 1000);

    this.gameCounterMinutesElem.innerHTML = this.getTimeString(minutes);
    this.gameCounterSecondsElem.innerHTML = this.getTimeString(seconds);
  }

  getTimeString(time) {
    return String(time).length === 2 ? time : `0${time}`;
  }

  step(timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp;
    }

    let progress = timestamp - this.startTime;

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);

      this.updateTimeInElems(this.elapsed);
    }

    if (progress < this.limit) {
      window.requestAnimationFrame(this.step.bind(this));
    } else {
      this.end();
    }
  }

  end() {
    window.cancelAnimationFrame(this.requestId);
    this.reset();
  }

  reset() {
    this.counter = this.limit;
    this.startTime = null;
    this.requestId = null;

    this.now = null;
    this.then = null;
    this.elapsed = null;
    this.startTime = null;

    this.updateTimeInElems();
  }
}
