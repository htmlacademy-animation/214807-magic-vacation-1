import TypographyAnimator from './typography-animator';
import PrizesAnimator from './prizes-animator';

const introTitleTypographyAnimator = new TypographyAnimator(
    `.intro__title`,
    {time: 1000, properties: [`transform`, `opacity`]},
);
const introDateTypographyAnimator = new TypographyAnimator(
    `.intro__date`,
    {time: 1000, properties: [`transform`, `opacity`], transitionDelay: 500},
);

const prizesAnimator = new PrizesAnimator(`.prizes__item`, {timeSteps: [1000, 4000, 2000]});

introTitleTypographyAnimator.init();
introDateTypographyAnimator.init();
prizesAnimator.init();

export {
  introTitleTypographyAnimator,
  introDateTypographyAnimator,
  prizesAnimator,
};
