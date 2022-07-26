window.addEventListener('DOMContentLoaded', (e) => {

   // TABS
   e.preventDefault();


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


   // TIMER
   const deadline = '2022-07-29';

   function getTimeREmaining(endtime) {

      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date());


      if (t <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
         days = Math.floor((t / (1000 * 60 * 60 * 24))),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
      }


      return {
         total: t,
         days: days,
         hours: hours,
         minutes: minutes,
         seconds: seconds
      };
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds');
      timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
         const t = getTimeREmaining(endtime);

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

   //modal

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

   // Используем классы для карточек

   class MenuCard {
      constructor(src, alt, title, desc, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.desc = desc;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 55;
         this.changeToRub();
      }

      changeToRub() {
         this.price = this.price * this.transfer;
      }
      render() {
         const element = document.createElement('div');
         if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }


         element.innerHTML = `
        
               <img src=${this.src} alt=${this.alt} >
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.desc}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
               </div>
      `;
         this.parent.append(element);
      }
   }

   new MenuCard(
      'img/tabs/vegy.jpg',
      'vegy',
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      11,
      '.menu .container',

   ).render();

   new MenuCard(
      'img/tabs/elite.jpg',
      'elite',
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      12,
      '.menu .container',
      'menu__item',
   ).render();

   new MenuCard(
      'img/tabs/post.jpg',
      'post',
      'Меню "Постно1"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      9,
      '.menu .container',
      'menu__item',
   ).render();

   // Form

   const forms = document.querySelectorAll('form');

   const message = {
      load: 'img/form/spinner.svg',
      error: 'Что то не так',
      success: 'Все хорошо мы скоро пришлем ответ'
   }
   forms.forEach((item) => {
      postDate(item);
   });

   function postDate(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('img');
         statusMessage.src = message.load;
         statusMessage.style.cssText = `
         display: block;
         margin: 0 auto;
         `;
         form.insertAdjacentElement('afterend', statusMessage);
         //

         const request = new XMLHttpRequest();
         request.open('POST', 'server.php');
         request.setRequestHeader('Content-type', 'apllication/json');

         const formData = new FormData(form);

         const object = {};

         formData.forEach((value, key) => {
            object[key] = value;
         });

         const json = JSON.stringify(object);
         request.send(json);

         request.addEventListener('load', () => {
            if (request.status === 200) {
               console.log(request.response);
               showThanksModal(message.success);

               form.reset();
               statusMessage.remove();
            } else {
               showThanksModal(message.error);
            }
         });
      });
   }


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
});



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


