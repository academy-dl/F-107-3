const buttonOpeningModalRegister = document.querySelector(".j-register-button");
const modalRegister = document.querySelector(".j-modal-register");
const buttonCloseModalRegister = document.querySelector(".j-close-modal-register");
const loaderRegister = modalRegister.querySelector(".loader_js");
const registerForm = document.forms.registerForm;

const linkToProfile = document.querySelector(".j-to-profile");


function register(e) {
  e.preventDefault();
  loaderRegister.classList.remove('hidden');
  let data = {};
  data.email = registerForm.email.value;
  data.name = registerForm.name.value;
  data.surname = registerForm.surname.value;
  data.password = registerForm.password.value;
  data.location = registerForm.location.value;
  data.age = +registerForm.age.value;
  sendRequest({
    method: 'POST', 
    url: '/api/users', 
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(res => {
      if(res.success) {
        interactionModal(modalRegister);
        alert(`Пользователь c id ${res.data.id} & email ${res.data.email} создан!`);
        registerForm.email.value = '';
        registerForm.name.value = '';
        registerForm.surname.value = '';
        registerForm.password.value = '';
        registerForm.location.value = '';
        registerForm.age.value = '';
      } else {
        throw res;
      }
    })
    .catch(err => {
      clearErorrs(registerForm);
      errorFormHandler(err.errors, registerForm);
    })
    .finally(() => {
      loaderRegister.classList.add('hidden');
    });
}

buttonOpeningModalRegister.addEventListener('click', () => {
  interactionModal(modalRegister);
});
buttonCloseModalRegister.addEventListener('click', () => {
  interactionModal(modalRegister);
  registerForm.email.value = '';
  registerForm.name.value = '';
  registerForm.surname.value = '';
  registerForm.password.value = '';
  registerForm.location.value = '';
  registerForm.age.value = '';
  clearErorrs(registerForm);
});

registerForm.addEventListener('submit', register);