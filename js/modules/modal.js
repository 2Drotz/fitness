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