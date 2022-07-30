/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

            function calc() {
               const result = document.querySelector('.calculating__result span');
               let sex, height, weight, age, ratio;

               if (localStorage.getItem('sex')) {
                  sex = localStorage.getItem('sex');
               } else {
                  sex = 'female';
                  localStorage.setItem('sex', 'female');
               }

               if (localStorage.getItem('ratio')) {
                  ratio = localStorage.getItem('ratio');
               } else {
                  ratio = 1.375;
                  localStorage.setItem('ratio', 1.375);
               }

               function initLocalSettings(selector, activeClass) {
                  const elements = document.querySelectorAll(selector);

                  elements.forEach(elem => {
                     elem.classList.remove(activeClass);
                     if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                        elem.classList.add(activeClass);
                     }
                     if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                        elem.classList.add(activeClass);
                     }
                  });
               }
               initLocalSettings('#gender div', 'calculating__choose-item_active');
               initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


               function calcTotal() {
                  if (!sex || !height || !weight || !age || !ratio) {
                     result.textContent = '-';
                     return;
                  }

                  if (sex === 'female') {
                     result.textContent = Math.round((447.6 + (9.2) * weight) + (3.1 * height) - (4.3 * age) * ratio);
                  } else {
                     result.textContent = Math.round((88.36 + (13.4) * weight) + (4.8 * height) - (5.7 * age) * ratio);
                  }
               }
               calcTotal();

               function getStaticInfo(selector, activeClass) {
                  const elements = document.querySelectorAll(selector);

                  elements.forEach(elem => {
                     elem.addEventListener('click', (e) => {
                        if (e.target.getAttribute('data-ratio')) {
                           ratio = +e.target.getAttribute('data-ratio');
                           localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                        } else {
                           sex = e.target.getAttribute('id');
                           localStorage.setItem('sex', e.target.getAttribute('id'));
                        }
                        console.log(ratio, sex);

                        elements.forEach(elem => {
                           elem.classList.remove(activeClass);
                        });
                        e.target.classList.add(activeClass);
                        calcTotal();
                     });
                  });
               }
               getStaticInfo('#gender div', 'calculating__choose-item_active');
               getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

               function getDinamicInfo(selector) {
                  const input = document.querySelector(selector);

                  input.addEventListener('input', () => {

                     if (input.value.match(/\D/g)) {
                        input.style.border = '1px solid red';
                     } else {
                        input.style.border = 'none';
                     }

                     switch (input.getAttribute('id')) {
                        case 'height':
                           height = +input.value;
                           break;
                        case 'weight':
                           weight = +input.value;
                           break;
                        case 'age':
                           age = +input.value;
                           break;
                     }
                     calcTotal();
                  });

               }
               getDinamicInfo('#height');
               getDinamicInfo('#weight');
               getDinamicInfo('#age');

            }
            module.exports = calc;

            /***/
         }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

            function cards() {
               // Используем классы для создание карточек меню

               class MenuCard {
                  constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                     this.src = src;
                     this.alt = alt;
                     this.title = title;
                     this.descr = descr;
                     this.price = price;
                     this.classes = classes;
                     this.parent = document.querySelector(parentSelector);
                     this.transfer = 27;
                     this.changeToUAH();
                  }

                  changeToUAH() {
                     this.price = this.price * this.transfer;
                  }

                  render() {
                     const element = document.createElement('div');

                     if (this.classes.length === 0) {
                        this.classes = "menu__item";
                        element.classList.add(this.classes);
                     } else {
                        this.classes.forEach(className => element.classList.add(className));
                     }

                     element.innerHTML = `
               <img src=${this.src} alt=${this.alt}>
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                   <div class="menu__item-cost">Цена:</div>
                   <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
               </div>
           `;
                     this.parent.append(element);
                  }
               }

               getResource('http://localhost:3000/menu')
                  .then(data => {
                     data.forEach(({ img, altimg, title, descr, price }) => {
                        new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
                     });
                  });

               async function getResource(url) {
                  let res = await fetch(url);

                  if (!res.ok) {
                     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
                  }

                  return await res.json();
               }
            }

            module.exports = cards;

            /***/
         }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

            function forms() {
               const forms = document.querySelectorAll('form');

               const message = {
                  load: 'img/form/spinner.svg',
                  error: 'Что то не так',
                  success: 'Все хорошо мы скоро пришлем ответ'
               };
               forms.forEach((item) => {
                  bindPostDate(item);
               });

               const postDate = async (url, data) => {
                  let res = await fetch(url, {
                     method: 'POST',
                     headers: {
                        'Content-type': 'application/json'
                     },
                     body: data
                  });
                  return await res.json();
               };

               function showThanksModal(message) {
                  const prevModalDialog = document.querySelector('.modal__dialog');

                  prevModalDialog.classList.add('hide');

                  openModal();

                  const thanksModal = document.createElement('div');
                  thanksModal.classList.add('modal__dialog');
                  thanksModal.innerHTML = `
         <div class = "modal__content">
         <div class="modal__close" data-close>×</div>
         <div class = "modal__title">${message}</div>
         </div>
      `;
                  document.querySelector('.modal').append(thanksModal);

                  setTimeout(() => {
                     thanksModal.remove();
                     prevModalDialog.classList.add('show');
                     prevModalDialog.classList.remove('hide');
                     closeModal();
                  }, 4000);
               }

               function bindPostDate(form) {
                  form.addEventListener('submit', (e) => {
                     e.preventDefault();

                     let statusMessage = document.createElement('img');
                     statusMessage.src = message.load;
                     statusMessage.style.cssText = `
         display: block;
         margin: 0 auto;
         `;
                     form.insertAdjacentElement('afterend', statusMessage);
                     //
                     const formData = new FormData(form);

                     const json = JSON.stringify(Object.fromEntries(formData.entries()));

                     postDate('http://localhost:3000/requests', json)
                        .then(data => {
                           console.log(data);
                           showThanksModal(message.success);
                           statusMessage.remove();
                        }).catch(() => {
                           showThanksModal(message.failure);
                        }).finally(() => {
                           form.reset();
                        });
                  });
               }

            }
            module.exports = forms;

            /***/
         }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

            function modal() {

               const modalTrigger = document.querySelectorAll('[data-modal]'),
                  modal = document.querySelector('.modal');



               function openModal() {
                  modal.classList.add('show');
                  modal.classList.remove('hide');
                  document.body.style.overflow = 'hidden';
                  clearInterval(modalTimer);
               }
               modalTrigger.forEach(btn => {
                  btn.addEventListener('click', openModal);
               });


               function closeModal() {
                  modal.classList.remove('show');
                  modal.classList.add('hide');
                  document.body.style.overflow = '';
               }


               modal.addEventListener('click', (e) => {
                  if (e.target === modal || e.target.getAttribute('data-close') == '') {
                     closeModal();
                  }
               });

               document.addEventListener('keydown', (e) => {
                  if (e.code === 'Escape' && modal.classList.contains('show')) {
                     closeModal();
                  }
               });

               const modalTimer = setTimeout(openModal, 500000);

               function modalByScroll() {
                  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
                     openModal();
                     window.removeEventListener('scroll', modalByScroll);
                  }
               };
               window.addEventListener('scroll', modalByScroll);


            }
            module.exports = modal;

            /***/
         }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

            function slider() {
               const slides = document.querySelectorAll('.offer__slide'),
                  slider = document.querySelector('.offer__slider'),
                  prev = document.querySelector('.offer__slider-prev'),
                  next = document.querySelector('.offer__slider-next'),
                  total = document.querySelector('#total'),
                  current = document.querySelector('#current'),
                  slidesWrapper = document.querySelector('.offer__slider-wrapper'),
                  slidesField = document.querySelector('.offer__slider-inner'),
                  width = window.getComputedStyle(slidesWrapper).width;


               let slideIndex = 1;
               let offset = 0;

               if (slides.length < 10) {
                  total.textContent = `0${slides.length}`;
                  current.textContent = `0${slideIndex}`;
               } else {
                  total.textContent = slides.length;
                  current.textContent = slideIndex;
               }

               slidesField.style.width = 100 * slides.length + '%';
               slidesField.style.display = 'flex';
               slidesField.style.transition = '0.5s all';

               slidesWrapper.style.overflow = 'hidden';

               slides.forEach(slide => {
                  slide.style.width = width;
               });
               slider.style.position = 'relative';

               const indicators = document.createElement('ol'),
                  dots = [];
               indicators.classList.add('carousel-indicators');
               slider.append(indicators);

               for (let i = 0; i < slides.length; i++) {
                  const dot = document.createElement('li');
                  dot.setAttribute('data-slide-to', i + 1);
                  dot.classList.add('dot');
                  if (i == 0) {
                     dot.style.opacity = 1;
                  }

                  indicators.append(dot);
                  dots.push(dot);

               }
               activeCurrDots = () => {
                  if (slides.length < 10) {
                     current.textContent = `0${slideIndex}`;
                  } else {
                     current.textContent = slideIndex;
                  }
               };
               showActiveDots = () => {
                  dots.forEach(dot => dot.style.opacity = '0.5');
                  dots[slideIndex - 1].style.opacity = 1;
               };

               deleteNotDigits = (str) => {
                  return +str.replace(/\D/g, '');
               }

               next.addEventListener('click', () => {
                  if (offset == deleteNotDigits(width) * (slides.length - 1)) {
                     offset = 0;
                  } else {
                     offset += deleteNotDigits(width);
                  }
                  slidesField.style.transform = `translateX(-${offset}px)`;
                  if (slideIndex == slides.length) {
                     slideIndex = 1;
                  } else {
                     slideIndex++;
                  }
                  activeCurrDots();
                  showActiveDots();
               });

               prev.addEventListener('click', () => {
                  if (offset == 0) {
                     offset = deleteNotDigits(width) * (slides.length - 1);
                  } else {
                     offset -= deleteNotDigits(width);
                  }
                  slidesField.style.transform = `translateX(-${offset}px)`;

                  if (slideIndex == 1) {
                     slideIndex = slides.length;
                  } else {
                     slideIndex--;
                  }

                  activeCurrDots();
                  showActiveDots();
               });

               dots.forEach(dot => {
                  dot.addEventListener('click', (e) => {
                     const slideTo = e.target.getAttribute('data-slide-to');

                     slideIndex = slideTo;
                     offset = deleteNotDigits(width) * (slideTo - 1);

                     slidesField.style.transform = `translateX(-${offset}px)`;

                     activeCurrDots();
                     showActiveDots();
                  });
               });

            }
            module.exports = slider;

            /***/
         }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

            function tabs() {

               const tabs = document.querySelectorAll('.tabheader__item'),
                  tabsContent = document.querySelectorAll('.tabcontent'),
                  tabsParent = document.querySelector('.tabheader__items');

               function hideTabContent() {
                  tabsContent.forEach(item => {
                     item.classList.add('hide');
                     item.classList.remove('show', 'fade');
                  });
                  tabs.forEach(item => {
                     item.classList.remove('tabheader__item_active');
                  });
               }

               function showTabContent(i = 0) {
                  tabsContent[i].classList.remove('hide');
                  tabsContent[i].classList.add('show', 'fade');
                  tabs[i].classList.add('tabheader__item_active');
               }
               hideTabContent();
               showTabContent();

               tabsParent.addEventListener('click', (event) => {
                  const target = event.target;

                  if (target && target.classList.contains('tabheader__item')) {
                     tabs.forEach((item, i) => {
                        if (target == item) {
                           hideTabContent();
                           showTabContent(i);
                        }
                     });
                  }
               });
            }

            module.exports = tabs;

            /***/
         }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

            function timer() {
               // Timer

               const deadline = '2022-08-31';

               function getTimeRemaining(endtime) {
                  const t = Date.parse(endtime) - Date.parse(new Date()),
                     days = Math.floor((t / (1000 * 60 * 60 * 24))),
                     seconds = Math.floor((t / 1000) % 60),
                     minutes = Math.floor((t / 1000 / 60) % 60),
                     hours = Math.floor((t / (1000 * 60 * 60) % 24));

                  return {
                     'total': t,
                     'days': days,
                     'hours': hours,
                     'minutes': minutes,
                     'seconds': seconds
                  };
               }

               function getZero(num) {
                  if (num >= 0 && num < 10) {
                     return '0' + num;
                  } else {
                     return num;
                  }
               }

               function setClock(selector, endtime) {

                  const timer = document.querySelector(selector),
                     days = timer.querySelector("#days"),
                     hours = timer.querySelector('#hours'),
                     minutes = timer.querySelector('#minutes'),
                     seconds = timer.querySelector('#seconds'),
                     timeInterval = setInterval(updateClock, 1000);

                  updateClock();

                  function updateClock() {
                     const t = getTimeRemaining(endtime);

                     days.innerHTML = getZero(t.days);
                     hours.innerHTML = getZero(t.hours);
                     minutes.innerHTML = getZero(t.minutes);
                     seconds.innerHTML = getZero(t.seconds);

                     if (t.total <= 0) {
                        clearInterval(timeInterval);
                     }
                  }
               }

               setClock('.timer', deadline);
            }

            module.exports = timer;

            /***/
         })

      /******/
   });
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
         /******/
      }
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
         /******/
      };
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
      /******/
   }
   /******/
   /************************************************************************/
   var __webpack_exports__ = {};
   // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
   (() => {
      /*!**********************!*\
        !*** ./js/script.js ***!
        \**********************/
      window.addEventListener('DOMContentLoaded', function () {
         const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
            modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
            calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
            forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
            slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
            timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
            cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");

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
   })();

   /******/
})()
   ;
//# sourceMappingURL=bundle.js.map