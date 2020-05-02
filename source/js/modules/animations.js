import TypographyAnimator from './typography-animator';

const introTitleTypographyAnimator = new TypographyAnimator(
  '.intro__title',
  { time: 1000, properties: ['transform', 'opacity'] },
);
const introDateTypographyAnimator  = new TypographyAnimator(
  '.intro__date',
  { time: 1000, properties: ['transform', 'opacity'] },
);

introTitleTypographyAnimator.init();
introDateTypographyAnimator.init();


export default [
  introTitleTypographyAnimator,
  introDateTypographyAnimator,
];
