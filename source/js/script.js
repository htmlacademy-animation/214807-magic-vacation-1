// modules
import mobileHeight       from './modules/mobile-height-adjust.js';
import slider             from './modules/slider.js';
import menu               from './modules/menu.js';
import footer             from './modules/footer.js';
import chat               from './modules/chat.js';
import result             from './modules/result.js';
import form               from './modules/form.js';
import social             from './modules/social.js';
import FullPageScroll     from './modules/full-page-scroll';
import TypographyAnimator from './modules/typography-animator';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const introTitleTypographyAnimator = new TypographyAnimator(
  { time: 1000, properties: ['transform', 'opacity'] },
  '.intro__title',
);
const introDateTypographyAnimator  = new TypographyAnimator(
  { time: 1000, properties: ['transform', 'opacity'] },
  '.intro__date',
);

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.addEventListener(`load`, () => {
  document.body.classList.add(`loaded`);
  introTitleTypographyAnimator.runAnimation();
  introDateTypographyAnimator.runAnimation();
});
