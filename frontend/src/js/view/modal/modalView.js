import View from '../view';

export default class ModalView extends View {
  modal = document.querySelector('.modal-my');
  overlay = document.querySelector('.overlay-my');
  parentElement = document.querySelector('.modal-cont-my');
  form;

  // On the end of animation function:
  animateEl(ele, classAnimate, classRestore) {
    // Ending of annimation function:
    const ending = () => {
      //Remove and restore class on the element:
      ele.classList.remove(classAnimate);
      classRestore && ele.classList.add(classRestore);

      // Remove the animation end event listner:
      ele.removeEventListener('animationend', ending);
    };

    // Listen to ending of annimation:
    ele.addEventListener('animationend', ending);

    // Add CSS animation class:
    ele.classList.add(classAnimate);
  }

  openModal() {
    this.modal.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  }

  closeModal() {
    // animate the transition and hide the element:
    this.animateEl(this.modal, 'zoom-out', 'hidden');
    this.animateEl(this.overlay, 'zoom-out', 'hidden');
  }

  handleEventListener(handler) {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') handler();
    });
    this.overlay.addEventListener('click', function (e) {
      if (e.target.value === 'close-modal') handler();
      if (e.target.className.includes('overlay')) handler();
    });
  }
}
