// Imports
import View from './view';

class SearchView extends View {
  parentElement = document.querySelector('.product-list-sort');

  getFormData() {
    return {
      q: this.parentElement.querySelector("[name='product-query']").value || '',
      min: this.parentElement.querySelector("[name='product-min']").value || '',
      max: this.parentElement.querySelector("[name='product-max']").value || '',
      sort:
        this.parentElement
          .querySelector("[name='product-sort']")
          .value.split('-')[1] || '',
      cat:
        this.parentElement
          .querySelector("[name='product-cat']")
          .value.split('-')[1] || '',
    };
  }

  handleEventListener(handler) {
    this.parentElement.addEventListener('submit', handler);
  }
}
export default new SearchView();
