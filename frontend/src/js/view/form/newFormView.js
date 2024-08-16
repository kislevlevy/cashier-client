// Imports
import FormView from './formView';

class NewFormView extends FormView {
  parentElement = document.querySelector('.product-edit');

  generateMarkup() {
    return `
    <form class="form-edit" id="product-post">
        <img
        src="https://static-00.iconduck.com/assets.00/insert-image-icon-2048x1921-yclt1rdm.png"
        />
        <ul>
            <li>
                <span>Name:</span>
                <input name="product-name" type="text" />
            </li>
            <li>
                <span>Price:</span>
                <input name="product-price" type="number" />
            </li>
            <li>
                <span>Image File:</span>
                <input type="file" name="product-img" accept="image/*">
            </li>
            <li>
                <span>Catagory:</span>
                <select name="product-cat">
                    <option hidden>Select</option>
                    <option value="cat-food">Food</option>
                    <option value="cat-animals">Animals</option>
                    <option value="cat-clothing">Clothing</option>
                </select>
            </li>
        </ul>
        <button type="submit" >Add new product!</button>
    </form>`;
  }
}
export default new NewFormView();
