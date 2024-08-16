// Imports
import View from '../view';

export default class FormView extends View {
  parentElement = document.querySelector('.product-edit');

  getFormData() {
    const formData = new FormData();
    let isFull = true;
    const formObj = {
      name: this.parentElement.querySelector("[name='product-name']").value,
      price: this.parentElement.querySelector("[name='product-price']").value,
      img: this.parentElement.querySelector("[name='product-img']").files[0],
      cat: this.parentElement
        .querySelector("[name='product-cat'")
        .value.split('-')[1],
    };
    console.log(formObj);

    Object.entries(formObj).forEach(([key, value]) =>
      value ? formData.append(key, value) : (isFull = false)
    );

    return { formData, isFull };
  }

  handleEventListener(handleEdit, handleDelete, handleFeedback) {
    const form = document.querySelector('.form-edit');
    form.addEventListener('submit', handleEdit);
    form.addEventListener('click', function (e) {
      if (e.target.className === 'form-edit-delete') handleDelete(e);
      if (e.target.className === 'form-edit-feedback') handleFeedback(e);
      return;
    });
  }
}
