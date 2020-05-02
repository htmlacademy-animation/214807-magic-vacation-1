import TypographyAnimator from './typography-animator';

const introTitleTypographyAnimator = new TypographyAnimator(
  '.intro__title',
  { time: 1000, properties: ['transform', 'opacity'] },
);
const introDateTypographyAnimator  = new TypographyAnimator(
  '.intro__date',
  { time: 1000, properties: ['transform', 'opacity'], transitionDelay: 500 },
);

introTitleTypographyAnimator.init();
introDateTypographyAnimator.init();

export {
  introTitleTypographyAnimator,
  introDateTypographyAnimator,
};
