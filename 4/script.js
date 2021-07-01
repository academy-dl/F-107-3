(function () {
  let obj = {};

  while (true) {
    let key = prompt('Введите название ключа: ');
    if (!key) {
      break;
    }
    let value = prompt(`Введите значение для ключа ${key}: `);
    if (!value) {
      break;
    }

    obj[key] = value;
  }
  const keys = Object.keys(obj);
  keys.forEach((key, index) => {
    console.log(`${index + 1}) obj.${key} = ${obj[key]};`);
  });
});

(function () {
  const arr = [1, 2, 3];

  let id = 1;
  const users = arr
    .map(item => ({
      id: id++,
      name: prompt('Введите имя пользователя'),
      age: item + 20,
    }))
  // .findIndex(item => item.age === 23)
  // .filter(number => !(number % 2));

  console.log(users);

  const findName = '';

  const user = users.find(({name}) => name
    .toLocaleLowerCase()
    .trim()
    .includes(
      findName
        .toLocaleLowerCase()
        .trim()
    )
  );

  console.log(user);

  const summAge = users.reduce((prev, item, index, array) => {
    return prev + item.age;
  }, 0);
  console.log(summAge / users.length);

  const deletedUsers = users.splice(1, 1);

  console.log(deletedUsers);
});

(function() {
  const intervalId = setInterval(() => {
    console.log("Привет, это интервал!")
  }, 5 * 1000);
  const timoutId = setTimeout(() => {
    clearInterval(intervalId);
  }, 10 * 1000);
})();
