// const name = prompt('Введите имя: ');
// const sName = prompt('Введите фамилию: ');
// const age = +prompt('Введите возраст: ');

// const user = {
//   name,
//   sName,
//   age
// };

// console.log(typeof user.age);


// const str = prompt('Введите свое имя: ');

// str += ' умный';

// alert(str);

let users = [{
  id: 111,
  name: 'name 1',
}, {
  id: 211,
  name: 'name 2',
}, {
  id: 23,
  name: 'qwe',
  sName: 's name',
}, {
  id: 4,
  name: 'name 4',
}, {
  id: 5,
  name: 'name 5',
}, {
  id: 6,
  name: 'name 6',
}, {
  id: 7,
  name: 'name 7',
},];

const key = 'id';
for (let i = 0; i < users.length; i++) {
  let user = users[i];
  // if (confirm(`Хотите увидеть пользователя ${user.name}?`)) {
  //   continue;
  // }
  console.log(`arr[${i}] = `, user[key]);
}

// let i = 0;
// while(i < users.length) {
//   let user = users[i];
//   console.log(`arr[${i}] = `, user[key]);
//   i++;
// }
let number, numberStr;
numberStr = prompt('Введите число:');
number = +numberStr;
while(number !== number || numberStr === null || !numberStr.length) {
  numberStr = prompt('Вы допустили ошибку при вводе числа, попробуйте еще раз:', 1);
  number = +numberStr;
}

console.log(number);