// Imports
import View from './view';
import * as config from '../config';

class CardsView extends View {
  parentElement = document.querySelector('.cards-cont');
  container = document.querySelector('.product-list');
  newCard = document.querySelector('#product_new');

  generateMarkup(data) {
    const rating = Math.trunc(data.avgRating);
    return `
    <div class="product-card" id="product_${data._id}">
        <img src="${data.img}" alt="${data.name}" />
        <div>
            <h4>${data.name}</h4>
            <div>
                <span>Price: ${config.PRICE_FORMAT.format(data.price)}</span>
                <span>Category: ${config.CAPITALIZE(data.cat)}</span>
                <span>${
                  rating < 1
                    ? 'No Rating yet.'
                    : 'Avarge Rating: ' + rating + '/10⭐'
                }</span>
            </div>
        </div>
    </div>`;
  }

  handleEventListener(handler) {
    this.container.addEventListener('click', handler);
  }

  highlightedCard(id) {
    this.container.childNodes.forEach((ele) => {
      if (!ele.classList) return;

      ele.id === `product_${id}`
        ? ele.classList.add('selected')
        : ele.classList.remove('selected');
    });

    if (id === 'new') this.newCard.classList.add('selected');
    else this.newCard.classList.remove('selected');
  }
}
export default new CardsView();
