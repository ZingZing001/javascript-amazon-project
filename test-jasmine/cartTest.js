import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

const product1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const product2 = "5b6fc6f-327a-4ec4-896f-486349e85a3d";

describe("test suite: addToCart", () => {
  it("Add an iteam already in cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    console.log(localStorage.getItem("cart"));
    addToCart(product1);
    addToCart(product1);
    expect(cart.length).toEqual(1);
    let totalQuantites = 0;
    cart.forEach(cartItem => {
      totalQuantites += cartItem.quantity
    });
    expect(totalQuantites).toEqual(2);
  }),
    it("Add an item that is not in cart", () => {
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([]);
      });
      loadFromStorage();
      console.log(cart);
      addToCart(product1);
      addToCart(product2);
      expect(cart.length).toEqual(2);
      let totalQuantites = 0;
      cart.forEach(cartItem => {
        totalQuantites += cartItem.quantity
      });
      expect(totalQuantites).toEqual(2);
    });
});