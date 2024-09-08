import Inputmask from 'inputmask';
import JustValidate from 'just-validate';

const modalControl = (overlay, btnGroup) => {
  const openModal = () => overlay.classList.add('open');
  const closeModal = () => overlay.classList.remove('open');

  btnGroup.forEach((button) => button.addEventListener('click', openModal));

  overlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlay || target.classList.contains('modal__close')) {
      closeModal();
    }
  });
};

const formControl = (form) => {
  const validator = new JustValidate(form, {validateBeforeSubmitting: false});

  validator
      .addField(form.userName, [
        {
          rule: 'required',
          errorMessage: 'Укажите имя',
        },
        {
          rule: 'minLength',
          value: 2,
          errorMessage: 'Имя должно содержать не менее 2 символов',
        },
        {
          rule: 'customRegexp',
          value: '^[А-ЯËа-яё]+$',
          errorMessage: 'Имя должно содержать только кириллические буквы',
        },
      ])
      .addField(form.userPhone, [
        {
          rule: 'required',
          errorMessage: 'Укажите телефон',
        },
        {
          rule: 'custom',
          validator: () => {
            const phone = form.userPhone.inputmask.unmaskedvalue();
            return /^\d{10}$/.test(phone);
          },
          errorMessage: 'Неверный телефон',
        },
      ])
      .onSuccess(({target}) => {
        fetch('https://jsonplaceholder.typicode.com/todos/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: target.userName.value,
            userPhone: target.userPhone.value,
          }),
        })
            .then(response => {
              if (!response.ok) {
                throw new Error('Что-то пошло не так...');
              }
              return response.json();
            })
            .then(data => {
              const formTitle = form.querySelector('.modal__title');
              formTitle.textContent = `
                Ваша заявка принята, номер заявки ${data.id}
              `;
              form.reset();
            })
            .catch(error => console.error(error));
      });
};

const init = () => {
  const buttons = document.querySelectorAll('.header__button');
  const overlay = document.querySelector('.overlay');
  const form = overlay.querySelector('.modal');

  const phoneMask = new Inputmask('+7(999)999-99-99');
  phoneMask.mask(form.userPhone);

  modalControl(overlay, buttons);
  formControl(form);
};

init();
