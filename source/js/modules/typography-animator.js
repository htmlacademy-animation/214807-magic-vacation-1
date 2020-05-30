export default class TypographyAnimator {

  constructor (
    elementSelector,
    { time, properties, classForActivate, timingFunction, transitionDelay }
  ) {
    this.TEXT_CSS_CLASS = `animated-text`;
    this.WORD_CSS_CLASS = `animated-text__word`;
    this.DELAY_STEP     = 50;

    this.transitionTime           = time;
    this.transitionProperties     = properties;
    this.transitionTimingFunction = timingFunction || `ease`;
    this.transitionDelay          = transitionDelay || 0;
    this.classForActivate         = classForActivate || `active`;
    this.elementSelector          = elementSelector;
    this.element                  = this.getAnimatedElement(this.elementSelector);
  }

  init () {
    this.prepareText();
  }

  runAnimation () {
    if (this.element) {
      setTimeout(() => {
        this.element.classList.add(this.classForActivate);
      });
    }
  }

  destroyAnimation () {
    this.element.classList.remove(this.classForActivate);
  }

  prepareText () {
    const content = this.getPreparedContent();

    this.element.classList.add(this.TEXT_CSS_CLASS);
    this.element.innerHTML = ``;
    this.element.appendChild(content);
  }

  getAnimatedElement (elementSelector) {
    return elementSelector ? document.querySelector(elementSelector) : null;
  }

  getText () {
    return this.element.textContent.trim().split(' ').filter((latter) => latter !== '');
  }

  getPreparedContent () {
    const text = this.getText();

    return text.reduce((fragmentParent, word, index) => {
      const prevWordLength = index ? text[index - 1].length : 0;
      const wordElement    = this.getWordElement(word, prevWordLength);
      const wordContainer  = document.createElement(`div`);

      wordContainer.classList.add(this.WORD_CSS_CLASS);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);

      return fragmentParent;
    }, document.createDocumentFragment());
  }

  getWordElement (word, prevWordLength) {
    const wordArray = Array.from(word);

    return wordArray.reduce((fragment, latter, index) => {
      const letterElement = this.createElement(latter, index + prevWordLength);
      fragment.appendChild(letterElement);
      return fragment;
    }, document.createDocumentFragment());
  }

  createElement (letter, index) {
    const span       = document.createElement(`span`);
    span.textContent = letter;

    span.style.transitionProperty       = this.transitionProperties.join(', ');
    span.style.transitionDuration       = `${this.transitionTime}ms`;
    span.style.transitionTimingFunction = this.transitionTimingFunction;
    span.style.transitionDelay          = `${this.getDelay(index)}ms`;

    return span;
  }

  getDelay (index) {
    let delay = 0;

    if (index % 3 === 0) {
      delay = this.DELAY_STEP * index;
    }
    else if ((index - 1) % 3 === 0) {
      delay = this.DELAY_STEP * (index + 1);
    }
    else if ((index + 1) % 3 === 0) {
      delay = this.DELAY_STEP * (index - 1);
    }

    return delay + this.transitionDelay;
  }
}
