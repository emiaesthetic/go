const button = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');
const items = document.querySelectorAll('.header__menu-item');

const duration = 200;
const distance = document.documentElement.clientWidth;

const animation = (duration, func) => {
  let startTime = NaN;
  requestAnimationFrame(function step(timestamp) {
    startTime ||= timestamp;
    const progress =
      timestamp - startTime > duration ? 1 : (timestamp - startTime) / duration;

    func(progress);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  });
};

const circ = (time) => 1 - Math.sin(Math.acos(time));

const showMenu = (progress) => {
  const left = (circ(progress) - 1) * distance;
  menu.style.transform = `translateX(${left}px)`;
};

const hiddenMenu = (progress) => {
  const left = -circ(progress) * distance;
  menu.style.transform = `translateX(${left}px)`;
};

button.addEventListener('click', () => {
  button.classList.toggle('open');
  menu.classList.toggle('open');
  document.body.classList.toggle('stop-scroll');

  if (button.classList.contains('open')) {
    animation(duration, (progress) => {
      showMenu(progress);
    });
  } else {
    animation(duration, (progress) => {
      hiddenMenu(progress);
    });
  }
});

items.forEach((item) => {
  item.addEventListener('click', () => {
    button.classList.remove('open');
    menu.classList.remove('open');
    document.body.classList.remove('stop-scroll');

    animation(duration, (progress) => {
      hiddenMenu(progress);
    });
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth <= 940) {
    menu.style.transform = `translateX(${-100}%)`;
  } else {
    menu.style.transform = 'translateX(0)';
  }
});
