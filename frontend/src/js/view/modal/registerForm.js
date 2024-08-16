import ModalView from './modalView';

class RegisterForm extends ModalView {
  generateMarkup() {
    return `
    <div class="user-title">Register</div>
    <form class="user-form" name="register">
      <div class="user-field">
        <input type="text" required name="name" />
        <label>Full Name</label>
      </div>
      <div class="user-field">
        <input type="text" required name="email" />
        <label>Email Address</label>
      </div>
      <div class="user-field">
        <input type="password" required name="password" />
        <label>Password</label>
      </div>
      <div class="user-field">
        <input type="password" required name="password-confirm" />
        <label>Password Confirm</label>
      </div>
      <div class="user-field">
        <input type="submit" value="Register" />
      </div>
      <div class="switch-form-login">Already a member? <a href="#">login now</a></div>
    </form>`;
  }

  getFormData() {
    return {
      name: this.form.querySelector("[name='name']").value,
      email: this.form.querySelector("[name='email']").value,
      password: this.form.querySelector("[name='password']").value,
      passwordConfirm: this.form.querySelector("[name='password-confirm']").value,
    };
  }

  handleClickEventListener(switchForm, formSubmit) {
    this.form = document.querySelector('.user-form');

    this.form
      .querySelector('.switch-form-login a')
      .addEventListener('click', switchForm);
    this.form.addEventListener('submit', formSubmit);
  }
}
export default new RegisterForm();
