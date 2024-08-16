import View from './view';

class NavView extends View {
  parentElement = document.querySelector('#nav-button');

  handleEventListener(handler) {
    this.parentElement.addEventListener('click', handler);
  }

  changeButtonInnerHtml(str = 'Login / Register') {
    this.parentElement.innerHTML = str;
  }
}
export default new NavView();
