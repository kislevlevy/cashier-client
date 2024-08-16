import ModalView from './modalView';

class FeedbackModal extends ModalView {
  generateMarkup(data) {
    return `
    <div class="feedback-title">
      <span>Create Feedback</span>
      <span>${data.name}</span>
    </div>
    <form class="feedback-form" id="feedback-${data._id}">
      <fieldset class="rating" name="rating">
        <input type="radio" id="star5" name="rating" value="10" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>
        <input type="radio" id="star4half" name="rating" value="9" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
        <input type="radio" id="star4" name="rating" value="8" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
        <input type="radio" id="star3half" name="rating" value="7" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
        <input type="radio" id="star3" name="rating" value="6" /><label class = "full" for="star3" title="Meh - 3 stars"></label>
        <input type="radio" id="star2half" name="rating" value="5" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
        <input type="radio" id="star2" name="rating" value="4" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
        <input type="radio" id="star1half" name="rating" value="3" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
        <input type="radio" id="star1" name="rating" value="2" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
        <input type="radio" id="starhalf" name="rating" value="1" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
      </fieldset>
      <textarea name="body" placeholder="Please tell us more about your experience (optional)" rows="3"></textarea>
      <div class="feedback-submit">
        <input type="submit" value="Submit Feedback" />
      </div>
    </form>`;
  }

  getFormData() {
    return {
      rating:
        Array.from(this.form.querySelector("[name='rating']").children).find(
          (ele) => ele.localName === 'input' && ele.checked
        )?.value || '',
      body: this.form.querySelector("[name='body']").value,
    };
  }

  handleClickEventListener(formSubmit) {
    this.form = document.querySelector('.feedback-form');
    this.form.addEventListener('submit', formSubmit);
  }
}
export default new FeedbackModal();

/*
.map((ele) => {
          return { checked: ele.checked, value: ele.value };
        })

        .map((ele) => {
        return { checked: ele.checked, value: ele.value };
      }),
*/
