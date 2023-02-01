class Basket {
  constructor() {
    this.items = this.loadFromLocalStorage() ?? [];
    // this.totalValue = 0;
  }

  clear() {
    this.items = [];
    this.saveToLocalStorage();
  }

  add(item) {
    this.items.push(item);
    this.saveToLocalStorage();
    // this.addToTotalValue(item.price);
  }

  getTotalValue() {
    return this.items.reduce((prev, el) => prev + el.price, 0);
  }
  // addToTotalValue(newPrice) {
  //   this.totalValue += newPrice;
  // }
  getBasketSummary() {
    return this.items.map((product, i) => {
      return {
        id: i + 1,
        text: `${i + 1} - ${product.name} - ${product.price.toFixed(2)}PLN`,
      };
    });
  }
  remove(no) {
    this.items.splice(no - 1, 1);
    this.saveToLocalStorage();
  }
  saveToLocalStorage() {
    localStorage.setItem('basket-items', JSON.stringify(this.items));
  }
  loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('basket-items'));
  }
}
class Product {
  constructor(productName, productPrice) {
    this.name = productName;
    this.price = productPrice;
  }

  setNewPrice(newPrice) {
    this.price = newPrice;
  }
}

// const shopBasket = new Basket();

// const oranges = new Product('Oranges', 6.5);
// const cucumbers = new Product('Cucumbers', 7.2);
// shopBasket.add(oranges);
// shopBasket.add(cucumbers);

// console.log(shopBasket.getTotalValue());
// shopBasket.remove(1);
// shopBasket.showBasket();
// console.log(shopBasket.getTotalValue());
