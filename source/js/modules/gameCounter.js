import StepsAnimation from './StepsAnimation';

const MESSAGE_BTN          = `messageButton`;
const GAME_COUNTER_MINUTES = `gameCounterMinutes`;
const GAME_COUNTER_SECONDS = `gameCounterSeconds`;

export default class GameCounter extends StepsAnimation {
  constructor ({ counterMS, fps = 1 }) {
    super({ counterMS: counterMS || 5 * 60 * 1000, fps });

    this.counter = this.limit;

    this.gameCounterMinutesElem = null;
    this.gameCounterSecondsElem = null;
    this.messageButtonElem      = null;
  }

  init () {
    this.gameCounterMinutesElem = document.getElementById(GAME_COUNTER_MINUTES);
    this.gameCounterSecondsElem = document.getElementById(GAME_COUNTER_SECONDS);
    this.messageButtonElem      = document.getElementById(MESSAGE_BTN);

    this.messageButtonElem.addEventListener(`click`, () => {
      if (this.startTime) {
        return;
      }
      this.start();
    });
  }

  draw () {
    this.counter  = this.counter - this.elapsed;
    const minutes = Math.floor(this.counter / (60 * 1000));
    const seconds = Math.ceil((this.counter - (minutes * 60 * 1000)) / 1000);

    this.gameCounterMinutesElem.innerHTML = this.getTimeString(minutes);
    this.gameCounterSecondsElem.innerHTML = this.getTimeString(seconds);
  }

  getTimeString (time) {
    return String(time).length === 2 ? time : `0${time}`;
  }
}
