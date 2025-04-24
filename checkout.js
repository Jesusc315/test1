// checkout.js

document.addEventListener("DOMContentLoaded", () => {
  const summary = document.getElementById("order-summary");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    summary.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {
      let subtotal = 0;
      let summaryHTML = '';

      cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return; // ❗ Handle missing product ID
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        summaryHTML += `<p>${product.name} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>`;
      });

      const tax = subtotal * 0.08875; // Tax rate
      const total = subtotal + tax;

      summaryHTML += `
        <hr>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Tax (8.875%): $${tax.toFixed(2)}</p>
        <strong><p>Total: $${total.toFixed(2)}</p></strong>
      `;

      summary.innerHTML = summaryHTML;
    })
    .catch(error => {
      summary.innerHTML = `<p>Error loading products: ${error.message}</p>`;
    });
});
