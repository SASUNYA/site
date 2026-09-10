// Змініть посилання тут — вони оновляться у секції та футері.
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/4uvack?stkn=enVmZXJybzVibTEz&utm_source=qr',
  tiktok: 'https://www.tiktok.com/@4uvack.s?_r=1&_t=ZS-99clRuaiIq7',
  telegram: 'https://t.me/fiksik_s'
};
document.querySelectorAll('[data-social]').forEach(link => { link.href = SOCIAL_LINKS[link.dataset.social]; });
document.getElementById('year').textContent = new Date().getFullYear();
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const heroImage = document.querySelector('.hero-image');
let pending = false;
function paintParallax() {
  const offset = motionPreference.matches ? 0 : Math.min(window.scrollY, innerHeight) * .15;
  heroImage.style.transform = `translate3d(0,${offset}px,0)`;
  pending = false;
}
addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(paintParallax); } }, {passive: true});
motionPreference.addEventListener('change', paintParallax);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, {threshold:.08});
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
}

document.querySelectorAll('[data-photo]').forEach(element => {
  const photo = window.PHOTOS[element.dataset.photo];
  if (!photo || !photo.src) return;
  element.style.backgroundImage = 'url(' + JSON.stringify(photo.src) + ')';
  element.style.setProperty('--photo-position', photo.position || '50% 50%');
  element.style.setProperty('--photo-mobile-position', photo.mobilePosition || photo.position || '50% 50%');
  element.setAttribute('aria-label', photo.alt);
  element.classList.add('has-photo');
});
