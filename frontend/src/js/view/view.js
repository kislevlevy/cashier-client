export default class View {
  // Render spinner into the DOM:
  rederSpinner(ele = this.parentElement) {
    ele.innerHTML = `
      <div class="spinner-cont">
          <span style="font-size: 48px" class="spin">
              <i class="fa-solid fa-spinner"></i>
          </span>
      </div>
      `;
  }

  // Render message:
  renderMessage(msg, ele = this.parentElement) {
    ele.innerHTML = `<h4 style="padding:10px; text-align:center;">${msg}</h4>`;
  }

  // Render markup to
  renderToParent(data, ele = this.parentElement) {
    return ele.insertAdjacentHTML('afterbegin', this.generateMarkup(data));
  }

  clearParent(ele = this.parentElement) {
    ele.innerHTML = '';
  }
}
