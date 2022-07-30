window.addEventListener('DOMContentLoaded', function () {
   const tabs = require('./modules/tabs'),
      modal = require('./modules/modal'),
      calc = require('./modules/calc'),
      forms = require('./modules/forms'),
      slider = require('./modules/slider'),
      timer = require('./modules/timer'),
      cards = require('./modules/cards');

   tabs();
   modal();
   calc();
   forms();
   slider();
   timer();
   cards();
});
   // getResource('  http://localhost:3000/menu')
   //    .then(data => createCard(data));

   // function createCard(data) {
   //    data.forEach(({ img, altimg, title, descr, price }) => {
   //       const element = document.createElement('div');
   //       element.classList.add('menu-item');

   //       element.innerHTML = `

   //       <img src=${img} alt=${altimg} >
   //       <h3 class="menu__item-subtitle">${title}</h3>
   //       <div class="menu__item-descr">${descr}</div>
   //       <div class="menu__item-divider"></div>
   //       <div class="menu__item-price">
   //          <div class="menu__item-cost">Цена:</div>
   //          <div class="menu__item-total"><span>${price}</span> руб/день</div>
   //       </div>
   //          `;
   //       document.querySelector('.menu . container').append(element);
   //    });
   // };













   //calculator




   // showSlides(slideIndex);

   // if (slides.length < 10) {
   //    total.textContent = `0${slides.length}`;
   // } else {
   //    total.textContent = slides.length;
   // }

   // function showSlides(n) {

   //    if (n > slides.length) {
   //       slideIndex = 1;
   //    }
   //    if (n < 1) {
   //       slideIndex = slides.length;
   //    }
   //    slides.forEach(item => item.style.display = 'none');

   //    slides[slideIndex - 1].style.display = 'block';

   //    if (slides.length < 10) {
   //       current.textContent = `0${slideIndex}`;
   //    } else {
   //       current.textContent = slideIndex;
   //    }
   // }
   // function plusSlides(n) {
   //    showSlides(slideIndex += n);
   // }
   // prev.addEventListener('click', () => {
   //    plusSlides(-1);
   // });
   // next.addEventListener('click', () => {
   //    plusSlides(1);
   // });




// class Crirp {
//    constructor(name, age, surname) {
//       this.name = name;
//       this._age = age;
//    }

//    #surname = 'Ronaldo';

//    say = () => {
//       console.log(`Name ${this.name} ${this.#surname} age: ${this.age}`)
//    }
//    get surname() {
//       return this.#surname;
//    }
//    set surname(surname) {
//       this.#surname = #surname;

//    }
// }

// const real = new Crirp('cristiano', 38, ronaldo);

// console.log(real.surname);

// class User {
//    constructor(name, age) {
//       this.name = name;
//       this._age = age;
//    }

//    #surname = 'asdas'
//    say() {
//       console.log(`Nsme user ${this.name} ${this.#surname} age ${this._age}`);
//    }


//    get age() {
//       return this._age;
//    }
//    set age(age) {
//       if (typeof age === 'number' && age > 0 && age < 110) {
//          this._age = age;
//       } else {
//          console.log('Noooooo~');
//       }
//    }
// }

// const ivan = new User('ivan', 21);
// console.log(ivan._age);

// ivan.say();

// const persone = {
//    name: 'Alex',
//    age: 19,

//    get userAge() {
//       return this.age;
//    },
//    set userAge(number) {
//       this.age = number;
//    }
// };



// console.log(persone.userAge = 30);
// console.log(persone.userAge);

// console.log('Запрос данных..');

// const req = new Promise((resolve, reject) => {
//    setTimeout(() => {
//       console.log('GOGOGOGO');

//       const product = {
//          name: 'TV',
//          price: 500
//       }

//       resolve(product);
//    }, 2000);
// });

// req.then((product) => {
//    return new Promise((resolve, reject) => {
//       setTimeout(() => {
//          product.status = true;
//          resolve(product);
//       }, 2000);
//    });
// }).then((product) => {
//    product.mod = "done";
//    return product;

// }).then((data) => {
//    console.log(data);
// }).catch(() => {
//    console.error('Плохо');
// }).finally(() => {
//    console.log('Final');
// });


// const test = time => {
//    return new Promise(resolve => {
//       setTimeout(() => { resolve(), time });
//    });
// };

// test(2000).then(() => console.log('1000 ms'));

// Promise.all([test(2000), test(1000)]).then(() => {
//    console.log('All');
// });

// Promise.race([test(11000), test(5000)]).then(() => {
//    console.log('All');
// });

// const urlObj = {
//    protocol: 'https',
//    domain: 'mysite.com',
//    showCurrentURL: function () {
//       console.log(this.domain)
//       const extractCurrProtocol = () => {
//          console.log(this.protocol);
//       }

//       console.log(`${extractCurrProtocol()}://${this.domain}`)
//    }
// }

// urlObj.showCurrentURL()



// const stud = {
//    name: 'asdas',
//    age: 21,
//    parent: {
//       mom: 'asd',
//       dad: 'zcf',
//    }
// }
// const clone = JSON.parse(JSON.stringify(stud));
// clone.parent.mom = 'Ann';
// console.log(clone);
// console.log(stud);


//--------------------------------------------------------------------------
//FILTER
// filter
// const names = ['asd', 'ghgggg', 'retvvfsgsgvsf', 'mjyqe', 'dgh'];

// const shortName = names.filter(function (name) {
//    return name.length < 5;
// });
// console.log(shortName);


// MAP
// const answer = ['ADFfg', 'FDAdgsd', 'asdFF'];

// const lower = answer.map(item =>  item.toLowerCase());

// console.log(lower);


//every/some

// const array = [4, 2, 1];
// console.log(array.every(item => typeof (item) === 'number'));

// const arrays = [4, 'sdf', 'sdf23'];
// console.log(arrays.some(item => typeof (item) === 'number'));

//reduce

// const arr = [3, 1, 5, 6, 7, 2];

// const res = arr.reduce((sum, current) => sum + current);
// console.log(res);


// const arr = ['asdas', 'apple', 'dir'];

// const res = arr.reduce((sum, current) => `${sum}, ${current}`);
// console.log(res);


// const obj = {
//    iven: 'persone',
//    ann: 'persone',
//    dog: 'animal',
//    cat: 'animal'
// };

// const newArray = Object.entries(obj)
//    .filter(item => item[1] === 'persone')
//    .map(item => item[0]);
// console.log(newArray);

// const funds = [
//    { amount: -1400 },
//    { amount: 2400 },
//    { amount: -1000 },
//    { amount: 500 },
//    { amount: 10400 },
//    { amount: -11400 }
// ];

// const getPositiveIncomeAmount = (data) => {
//    return data.filter(item => item.amount > 0)
//       .reduce((sum, current) => (typeof (sum) === 'object' ? sum.amount : sum) + current.amount);
// };
// console.log(getPositiveIncomeAmount(funds));

// const getTotalIncomeAmount = (data) => {
//    return data.some(item => item.amount > 0)
//       ? data.reduce((sum, current) => (typeof (sum) === 'object' ? sum.amount : sum) + current.amount)
//       : getPositiveIncomeAmount(funds);
// };

// console.log(getTotalIncomeAmount(funds));