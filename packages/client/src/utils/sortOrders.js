export const sortOrders = (orders) =>
  [...orders].sort((a, b) => {
    if (a.orderTime < b.orderTime) {
      return 1;
    } else if (a.orderTime > b.orderTime) {
      return -1;
    } else {
      return 0;
    }
  });
