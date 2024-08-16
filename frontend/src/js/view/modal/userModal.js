import ModalView from './modalView';

class UserModal extends ModalView {
  logoutBtn;

  generateMarkup(data) {
    return `
    <div class="user-title">User</div>
    <div class="user-modal">
        <div class="user-field">
            <p>${data.name}</p>
        </div>
        <div class="user-field">
            <p>${data.email}</p>
        </div>
        <div class="user-field">
            <button type="button" id="user-logout">Logout</button>
        </div>
    </div>`;
  }

  handleEventListener(handler) {
    this.logoutBtn = document.querySelector('#user-logout');
    this.logoutBtn.addEventListener('click', handler);
  }
}
export default new UserModal();
