export default class TypographyAnimator {

  constructor ({ time, properties, classForActivate }, elementSelector = null) {
    this.TEXT_CSS_CLASS = `animated-text`;
    this.WORD_CSS_CLASS = `animated-text__word`;
    this.DELAY_STEP     = 50;

    this.animationTime       = time;
    this.animationProperties = properties;
    this.classForActivate    = classForActivate || `active`;
    this.elementSelector     = elementSelector;
    this.element             = this.getAnimatedElement(this.elementSelector);

    this.prePareText();
  }

  runAnimation () {
    if (!this.element) {
      return;
    }
    this.element.classList.add(this.classForActivate);
  }

  destroyAnimation () {
    this.element.classList.remove(this.classForActivate);
  }

  prePareText () {
    this.element.classList.add(this.TEXT_CSS_CLASS);

    const text = this.element.textContent.trim().split(' ').filter((latter) => latter !== '');

    const content = text.reduce((fragmentParent, word, index) => {
      const prevWordLength = index ? text[index - 1].length : 0;
      const wordElement   = this.getWordElement(word, prevWordLength);
      const wordContainer = document.createElement(`div`);

      wordContainer.classList.add(this.WORD_CSS_CLASS);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);

      return fragmentParent;
    }, document.createDocumentFragment());

    this.element.innerHTML = ``;
    this.element.appendChild(content);
  }

  getAnimatedElement (elementSelector) {
    return elementSelector ? document.querySelector(elementSelector) : null;
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

    span.style.transitionProperty       = this.animationProperties.join(', ');
    span.style.transitionDuration       = `${this.animationTime}ms`;
    span.style.transitionTimingFunction = `ease`;
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
    else {
      delay = this.DELAY_STEP * index;
    }

    return delay;
  }
}
