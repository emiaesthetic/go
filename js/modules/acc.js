const isOpen = (elem) => elem.classList.contains('open');

const changeHeight = (accordion, content, height) => {
  content.style.height = isOpen(accordion) ? `${height}px` : '';
};

const changeHiddenAttribute = (accordion, content) => {
  if (isOpen(accordion)) {
    content.setAttribute('aria-hidden', false);
  } else {
    content.setAttribute('aria-hidden', true);
  }
};

const init = () => {
  const accordions = document.querySelectorAll('.accordion');
  const buttons = document.querySelectorAll('.accordion__control');
  const contents = document.querySelectorAll('.accordion__content');

  let height = 0;
  contents.forEach((content) => {
    if (height < content.scrollHeight) {
      height = content.scrollHeight;
    }
  });

  buttons.forEach((button, indexBtn) => {
    button.addEventListener('click', () => {
      accordions.forEach((accordion, indexAcc) => {
        const content = contents[indexAcc];
        if (indexBtn === indexAcc) {
          accordion.classList.toggle('open');
          changeHeight(accordion, content, height);
          changeHiddenAttribute(accordion, content);
        } else {
          accordion.classList.remove('open');
          content.style.height = '';
          content.setAttribute('aria-hidden', true);
        }
      });
    });
  });
};

init();
