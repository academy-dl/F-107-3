(function initLogin() {
  const modalLogin = document.querySelector(".j-modal-login");
  const buttonOpenLogin = document.querySelector(".j-login-button");
  const buttonCloseLogin = document.querySelector(".j-close-modal-login");
  const loginForm = document.forms.loginForm;


  function login(e) {
    e.preventDefault();
    let data = {};
    data.email = loginForm.email.value;
    data.password = loginForm.password.value;
    sendRequest({
      method: 'POST',
      url: '/api/users/login',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          console.log('Вы успешно вошли!')
          console.log(res);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          rerenderLinks();
          interactionModal(modalLogin);
          setTimeout(() => {
            location.pathname = '/11/profile';
          }, 2000)
        } else {
          throw res
        }
      })
      .catch(err => {
        if (err._message) {
          alert(err._message);
        }
        clearErorrs(loginForm);
        errorFormHandler(err.errors, loginForm);
      });
  }

  buttonOpenLogin.addEventListener('click', function () {
    interactionModal(modalLogin);
  });

  buttonCloseLogin.addEventListener('click', function () {
    interactionModal(modalLogin);
  });

  loginForm.addEventListener('submit', login);
})();

(function initRegister() {
  const buttonOpeningModalRegister = document.querySelector(".j-register-button");
  const modalRegister = document.querySelector(".j-modal-register");
  const buttonCloseModalRegister = document.querySelector(".j-close-modal-register");
  const loaderRegister = modalRegister.querySelector(".loader_js");
  const registerForm = document.forms.registerForm;

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
        if (res.success) {
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
})()

(function initPage() {
  rerenderLinks();
})();

