const btnBuyProducts = [...document.querySelectorAll('[data-name]')];
const basketInterface = document.querySelector('.basket-list');
const btnBuyAll = document.querySelector('.btn-buy-all');
const basket = new Basket();

const removeItem = e => {
  const id = Number(e.target.dataset.id);
  basket.remove(id);
  createBasketInterface();
};
const createBasketInterface = () => {
  basketInterface.innerHTML = '';

  for (const { id, text } of basket.getBasketSummary()) {
    const newLi = document.createElement('li');
    newLi.innerHTML = text;
    newLi.addEventListener('click', removeItem);
    newLi.dataset.id = id;
    basketInterface.appendChild(newLi);
  }

  const basketTotalValue = basket.getTotalValue();

  btnBuyAll.innerHTML = `Make an order for: ${
    Math.round(basketTotalValue * 100) / 100
  }PLN`;

  btnBuyAll.disabled = basketTotalValue === 0;
  // if (basketTotalValue !== 0) btnBuyAll.removeAttribute('disabled');
  // else btnBuyAll.disabled = true;
};

const addProductToBasket = e => {
  const name = e.target.dataset.name;
  const price = Number(e.target.dataset.price);

  const newProduct = new Product(name, price);
  basket.add(newProduct);
  createBasketInterface();
};

const buyAllProducts = () => {
  alert(
    `Your order for ${basket.getTotalValue().toFixed(2)}PLN has been made!`
  );
  basket.clear();
  createBasketInterface();
};

for (const btn of btnBuyProducts)
  btn.addEventListener('click', addProductToBasket);

btnBuyAll.addEventListener('click', buyAllProducts);

createBasketInterface();
