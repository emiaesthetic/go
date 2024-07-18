const modalControl = (overlay, openBtn) => {
  const openModal = () => overlay.classList.add('open');
  const closeModal = () => overlay.classList.remove('open');

  openBtn.addEventListener('click', openModal);

  overlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlay || target.classList.contains('modal__close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const formControl = (form, submitBtn, closeModal) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    console.log(userData);

    form.reset();
    closeModal();
    submitBtn.disabled = true;
  });

  form.addEventListener('input', () => {
    if (!form.userName.value.trim() || !form.userPhone.value.trim()) {
      submitBtn.disabled = true;
    } else {
      submitBtn.disabled = false;
    }
  });
};

const init = () => {
  const openBtn = document.querySelector('.header__button');
  const overlay = document.querySelector('.overlay');
  const form = overlay.querySelector('.modal');
  const submitBtn = overlay.querySelector('.modal__button');

  const {closeModal} = modalControl(overlay, openBtn);
  formControl(form, submitBtn, closeModal);
};

init();
