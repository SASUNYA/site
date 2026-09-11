// Додавай нову машину, скопіювавши блок { ... } нижче і підставивши свої дані.
// year можна лишити порожнім '', якщо не пам'ятаєш рік.
window.CARS = [
  {
    year: '',
    name: 'Ока',
    photo: 'photos/oka.jpg',
    note: 'Хоч і старенька, але найулюбленіша — запамʼятається на все життя.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('car-timeline');
  if (!container || !window.CARS) return;
  window.CARS.forEach(car => {
    const item = document.createElement('div');
    item.className = 'timeline-item reveal';
    const yearHtml = car.year ? `<span class="timeline-year">${car.year}</span>` : '';
    item.innerHTML =
      `<div class="timeline-photo" style="background-image:url('${car.photo}')"></div>` +
      `<div class="timeline-content">${yearHtml}<h3>${car.name}</h3><p>${car.note || ''}</p></div>`;
    container.appendChild(item);
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, {threshold:.08});
    container.querySelectorAll('.reveal').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
  } else {
    container.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
});
