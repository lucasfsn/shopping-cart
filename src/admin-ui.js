const loginPanel = document.querySelector('.admin-login');
const adminPanel = document.querySelector('.admin-add-product');
const loginButton = document.querySelector('.login-button');

const login = () => {
  const name = document.querySelector('[name="login-username"]').value;
  const password = document.querySelector('[name="login-password"]').value;
  if (name === 'Admin' && password === '123') {
    adminPanel.classList.remove('hidden');
    loginPanel.classList.add('hidden');
  } else alert('Wrong username or password!');
};

loginButton.addEventListener('click', login);

//

const saveProductToLocalStorage = (name, price) => {
  const productsList = JSON.parse(localStorage.getItem('shop-products')) ?? [];
  productsList.push({ name, price });
  localStorage.setItem('shop-products', JSON.stringify(productsList));
};

const addProductForm = document.querySelector('.form-admin');
const nameInput = document.querySelector('[name="product-name"]');
const priceInput = document.querySelector('[name="product-price"]');
const productsList = document.querySelector('.products-list');

const addProductToShop = (name, price) => {
  const newLi = document.createElement('li');
  const newStrong = document.createElement('strong');
  newStrong.innerText = name;
  const newPriceText = document.createTextNode(` - ${price.toFixed(2)}`);
  const newBtn = document.createElement('button');
  newBtn.classList.add('btn-buy-product');
  newBtn.dataset.name = name;
  newBtn.dataset.price = String(price);
  newBtn.innerText = 'Buy';
  newBtn.addEventListener('click', addProductToBasket);

  newLi.appendChild(newStrong);
  newLi.appendChild(newPriceText);
  newLi.appendChild(newBtn);

  productsList.appendChild(newLi);
};

const loadProductsFromLocalStorage = () => {
  const productsList = JSON.parse(localStorage.getItem('shop-products')) ?? [];
  for (const { name, price } of productsList) {
    addProductToShop(name, price);
  }
};

const handleAddProductFormSubmit = e => {
  e.preventDefault();

  const nameFromInput = nameInput.value;
  const priceFromInput = Number(priceInput.value);

  addProductToShop(nameFromInput, priceFromInput);
  saveProductToLocalStorage(nameFromInput, priceFromInput);
};
addProductForm.addEventListener('submit', handleAddProductFormSubmit);

loadProductsFromLocalStorage();

// console.log(e.target.elements['product-name'].value);
// console.log(nameInput.value);
