import ModalView from './modalView';

class LoginForm extends ModalView {
  generateMarkup() {
    return `
    <div class="user-title">Login</div>
    <form class="user-form" name="login">
      <div class="user-field">
        <input type="text" required name="email" />
        <label>Email Address</label>
      </div>
      <div class="user-field">
        <input type="password" required name="password" />
        <label>Password</label>
      </div>
      <div class="user-field">
        <input type="submit" value="Login" />
      </div>
      <div class="switch-form-register">Not a member? <a href="#">register now</a>
      <div class="switch-form-forgot">Forgot your password <a href="#">reset password now</a>
      </div>
    </form>`;
  }

  getFormData() {
    return {
      email: this.form.querySelector("[name='email']").value,
      password: this.form.querySelector("[name='password']").value,
    };
  }

  handleClickEventListener(switchFormRegister, formSubmit, switchFormForgot) {
    this.form = document.querySelector('.user-form');

    this.form
      .querySelector('.switch-form-register a')
      .addEventListener('click', switchFormRegister);
    this.form
      .querySelector('.switch-form-forgot a')
      .addEventListener('click', switchFormForgot);
    this.form.addEventListener('submit', formSubmit);
  }
}
export default new LoginForm();
