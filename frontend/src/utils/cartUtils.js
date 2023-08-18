
export const addDecimals = (number) => {
  return (Math.round(number * 100) / 100).toFixed(2);
}

export const updateCart = (state, action) => {
  const item = action.payload;

  const existItem = state.cartItems.find((e) => e._id === item._id)
  if (existItem) {
    state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
  }
  else {
    state.cartItems = [...state.cartItems, item]; // this called umutable way because we creating a new memory
  }

  //calculate the total price:
  state.itemPrice = addDecimals(state.cartItems.reduce((acc, item) =>
    acc + item.price * item.qty, 0)); // 0 is the initial value of acc

  // if the price more than 100$ shippnig will be free
  state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);
  state.taxPrice = addDecimals(Number(state.itemPrice * 0.15).toFixed(2));//taxes
  state.totalPrice = (Number(state.itemPrice) +
                            Number(state.shippingPrice) +
                            Number(state.taxPrice)).toFixed(2);
  localStorage.setItem('cart', JSON.stringify(state));

  return (state);
}
