function allocate(salesOrders, purchaseOrders) {
  if (!Array.isArray(salesOrders) || !Array.isArray(purchaseOrders))
    throw new Error("Invalid data types. Both parameters must be strings");

  const ordersSales = salesOrders.sort(
    (a, b) => new Date(a.created) - new Date(b.created)
  );
  const ordersPurchases = purchaseOrders.sort(
    (a, b) => new Date(a.receiving) - new Date(b.receiving)
  );

  let totalQuantityInStock = 0;
  const allocatedOrders = [];

  while (ordersSales.length > 0 && ordersPurchases.length > 0) {
    let currentPurchase = ordersPurchases.shift();
    let currentSalesOrder = ordersSales[0];

    totalQuantityInStock += currentPurchase.quantity;

    while (totalQuantityInStock > 0 && ordersSales.length > 0) {
      const salesOrder = ordersSales.shift();

      allocatedOrders.push({
        id: currentPurchase.id,
        date: currentSalesOrder.receiving
      });


      totalQuantityInStock -= salesOrder.quantity;
      if (ordersSales.length == 0) break;

    }
  }
  return allocatedOrders;
}

Como pueden ver, la función allocate recibe dos arrays: salesOrders (órdenes de venta) y purchaseOrders (órdenes de compra). Primero, valida que ambos parámetros sean arrays. Luego, ordena ambos arrays por fecha, las órdenes de venta por la fecha de creación (created) y las órdenes de compra por la fecha de recepción (receiving).
Después, entra en un bucle while que continúa mientras haya órdenes de venta y de compra. Dentro del bucle, toma la primera orden de compra y la primera orden de venta. Suma la cantidad de la orden de compra a la variable totalQuantityInStock.
Luego, entra en otro bucle while interno que itera mientras haya stock disponible (totalQuantityInStock > 0) y haya órdenes de venta. Dentro de este bucle, va tomando las órdenes de venta y restando su cantidad del stock disponible. Crea un nuevo objeto con el ID de la orden de compra y la fecha de recepción de la orden de venta, y lo agrega al array allocatedOrders. Finalmente, devuelve el array allocatedOrders.

