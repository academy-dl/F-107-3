(function () {
  let name = prompt('Введите имя: ');
  while (!validateStr(name)) {
    name = prompt('Вы ввели неправильное имя. Введите имя заново: ');
  }

  let sName = prompt('Введите фамилию: ');
  while (!validateStr(sName)) {
    sName = prompt('Вы ввели неправильную фамилию. Введите фамилию заново: ');
  }

  let ageStr = prompt('Введите возраст: ');
  let age = +ageStr;
  while (!validateNumber(age) || ageStr === null || ageStr === '') {
    ageStr = prompt('Вы ввели неправильный возраст. Введите возраст заново: ');
    age = +ageStr;
  }

  const user = {
    name,
    sName,
    age
  };

  console.log(user);
});

(function () {
  let counterInvalid = counterCreator();
  let counterNullExeption = counterCreator(2);
  const age = getAge({
    onReject: (checker) => {
      if (checker) {
        console.log(`Он безнадежен, он уже ${counterNullExeption()} раз отказался, он не знает что такое число....`);
      } else {
        console.log(`Он безнадежен, он сделал уже ${counterInvalid()} попыток, он не знает что такое число....`);
      }
    }
  });

  console.log(age);

  function getAge(options = {}) {
    let ageStr = prompt('Введите возраст: ');
    let age = +ageStr;
    if (validateNumber(age) && ageStr !== null && ageStr !== '') {
      return age;
    }
    if (typeof options.onReject === 'function') {
      options.onReject(ageStr === null);
    }
    return getAge(options.onReject);
  }
})();

function counterCreator(step = 1) {
  let index = 0;
  return function () {
    index += step;
    return index;
  }
}

function validateStr(string) {
  return typeof string === 'string' && string.length;
}

function validateNumber(number) {
  return typeof number === 'number' && number === number;
}