import { openModal, closeModal } from './modal';
import { postDate } from '../services/services';

function forms(formSelector, modalTimerId) {
   const forms = document.querySelectorAll(formSelector);

   const message = {
      load: 'img/form/spinner.svg',
      error: 'Что то не так',
      success: 'Все хорошо мы скоро пришлем ответ'
   };
   forms.forEach((item) => {
      bindPostDate(item);
   });



   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');

      openModal('.modal', modalTimerId);

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
         closeModal('.modal');
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
export default forms;