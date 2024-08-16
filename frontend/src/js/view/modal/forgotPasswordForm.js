import ModalView from './modalView';

class ForgotPasswordForm extends ModalView {
  generateMarkup() {
    return `
    <div class="user-title">Forgot Password</div>
    <form class="user-form" name="forgot">
      <div class="user-field">
        <input type="text" required name="email" />
        <label>Email</label>
      </div>
      <div class="user-field">
        <input type="submit" value="Send Reset Code" />
      </div>
      <div class="switch-form-login">Remeber your password? <a href="#">login now</a>
      </div>
    </form>`;
  }

  generateMarkupAfter() {
    this.parentElement.innerHTML = `
    <div class="user-title">Forgot Password</div>
    <form class="user-form" name="forgot">
      <div class="user-field">
        <input type="text" required name="token" />
        <label>Insert Token Here</label>
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
        <input type="submit" value="Reset Password" />
      </div>
      <div class="switch-form-login">Remeber your password? <a href="#">login now</a>
      </div>
    </form>`;
  }

  getFormData() {
    return {
      email: this.form.querySelector("[name='email']").value,
    };
  }

  getFormDataAfter() {
    return {
      token: this.form.querySelector("[name='token']").value,
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
export default new ForgotPasswordForm();
