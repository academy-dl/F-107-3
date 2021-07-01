(function() {
  const form = document.forms;

  console.log(form);
});

(function() {
  const form = document.forms.signIn;

  const email = form.querySelector('input[name=email]');
  const password = form.elements.password;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
      email: email.value,
      password: password.value,
    };
    console.log(data);
  });
})();


function getAll(form) {
  let body = {};
  const inputs = form.querySelectorAll("input");
  const textareas = form.querySelectorAll("textarea");
  for(let input of inputs) {
      switch (input.type) {
          case "radio":
              if(input.checked)
                  body[input.name] = input.value;
                  break;
          case "checkbox":
              if(!body[input.name]) 
                  body[input.name] = [];
              if(input.checked)
                  body[input.name].push(input.value);
              break;
          case "file":
              body[input.name] = input.files;
              break;
          default:
              body[input.name] = input.value;
      }
  }
  for(let textarea of textareas) {
      body[textarea.name] = textarea.value;
  }
  return body;
}


function isEmail(email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function setErrorChecked(inputs, errorMessage) {
  const error = errorCreator(errorMessage);
  inputs[0].parentElement.parentElement
  .insertAdjacentElement('afterend', error);
  function handler() {
    error.remove();
    for(let input of [...inputs]) {
      input.removeEventListener('input', handler); 
      input.classList.remove('is-invalid');
    }
  }
  for(let input of [...inputs]) {
    input.classList.add('is-invalid');
    
    input.addEventListener('input', handler);
  }
}

function setError(input, messageError) {
  if(input[0]) {
    setErrorChecked(input, messageError);
  } else {
    setErrorText(input, messageError);
  }
}

function setErrorText(input, errorMessage) {
  const error = errorCreator(errorMessage);
  input.classList.add('is-invalid');
  input.insertAdjacentElement('afterend', error);
  input.addEventListener('input', function() {
    error.remove();
    input.classList.remove('is-invalid');
  }, {once: true});
}

function errorCreator(message) {
  let messageError = document.createElement('div');
  messageError.classList.add('invalid-feedback');
  messageError.innerText = message;
  return messageError;
}

(function() {
  const form = document.forms.signUp;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = form.elements.email;
    const password = form.elements.password;
    const name = form.elements.name;
    const avatar = form.elements.avatar;
    const accepnt = [...form.elements.accepnt].find(item => item.checked);
    
    let error = {};
    
    if(!accepnt) {
      error.accepnt = 'Пожалуйста выберете пункт';
    }

    if(!isEmail(email.value)) {
      error.email = 'Ошибка ввода, введите email';
    }

    if(password.value.length < 6) {
      error.password = 'Пароль слишком короткий';
    }

    if(Object.keys(error).length) {
      Object.keys(error).forEach(key => {
        const messageError = error[key];
        const input = form.elements[key];
        setError(input, messageError);
      })
      return;
    }
    const data = {
      email: email.value,
      password: password.value,
      name: name.value,
      accepnt: accepnt.value,
      avatar: avatar.files,
    };
    console.log(data);
  });
})();