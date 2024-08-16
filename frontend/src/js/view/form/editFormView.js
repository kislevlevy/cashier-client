// Imports
import FormView from './formView';
import * as auth from '../../auth';

class EditFormView extends FormView {
  parentElement = document.querySelector('.product-edit');

  makeFeedbackObj(feedbacks) {
    const feedbacksMap = feedbacks.map(
      (ele) => `
      <div class="feedabck-card">
      <div><h4>${ele.rating}/10⭐ - ${ele.author.name}</h4></div>
      <p>${ele.body}</p>
      </div>
      `
    );

    return `
      <div class="feedback-cont">
        <h3>Feedbacks:</h3><br/>
        <div class="feedback-card-cont">
          ${feedbacksMap.join('\n')}
        </div>
      </div>
      `;
  }

  generateMarkup(data) {
    const { cat } = data;
    return `
    <form class="form-edit" id="product-${data._id}">
        <img src="${data.img}" alt="${data.name}" />
        <ul>
            <li>
                <span>Name:</span>
                <input name="product-name" type="text" value="${data.name}" />
            </li>
            <li>
                <span>Price:</span>
                <input name="product-price" type="number" value="${data.price}" />
            </li>
            <li>
                <span>Image File:</span>
                <input type="file" name="product-img" accept="image/*">
            </li>
            <li>
                <span>Catagory:</span>
                <select name="product-cat">
                <option hidden>Select</option>
                <option ${
                  cat === 'food' && 'selected'
                } value="cat-food">Food</option>
                <option ${
                  cat === 'animals' && 'selected'
                } value="cat-animals">Animals</option>
                <option ${
                  cat === 'clothing' && 'selected'
                } value="cat-clothing">Clothing</option>
                </select>
            </li>
        </ul>
        ${data.feedbacks.length > 0 ? this.makeFeedbackObj(data.feedbacks) : ''}
        <div>
          <button type="submit">Save Changes</button>
          ${
            auth.state.currentUser.role !== 'free'
              ? `<button type="button" class="form-edit-feedback">Add Feedback</button>`
              : ''
          }
          <button type="button" class="form-edit-delete">Delete Item</button>
        </div>
    </form>`;
  }
}
export default new EditFormView();
