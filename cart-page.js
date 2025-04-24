document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const summary = document.getElementById("total-summary");
    const TAX_RATE = 0.08875;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    fetch("products.json")
      .then(res => res.json())
      .then(products => {
        renderCart(products);
  
        function renderCart(products) {
          cartContainer.innerHTML = "";
          let subtotal = 0;
  
          cart.forEach((item, index) => {
            const product = products.find(p => p.id === item.id);
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
  
            cartContainer.innerHTML += `
              <div class="card mb-3">
                <div class="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5>${product.name}</h5>
                    <p>$${product.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                  </div>
                  <div>
                    <button class="btn btn-sm btn-secondary" data-action="decrease" data-index="${index}">−</button>
                    <button class="btn btn-sm btn-secondary" data-action="increase" data-index="${index}">+</button>
                    <button class="btn btn-sm btn-danger" data-action="remove" data-index="${index}">🗑 Remove</button>
                  </div>
                </div>
              </div>
            `;
          });
  
          const tax = subtotal * TAX_RATE;
          const total = subtotal + tax;
  
          summary.innerHTML = `
            Subtotal: $${subtotal.toFixed(2)}<br>
            Tax: $${tax.toFixed(2)}<br>
            <strong>Total: $${total.toFixed(2)}</strong>
          `;
  
          attachEventListeners();
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartCount(); // from cart-utils
        }
  
        function attachEventListeners() {
          document.querySelectorAll("button").forEach(btn => {
            const index = parseInt(btn.dataset.index);
            const action = btn.dataset.action;
  
            btn.onclick = () => {
              if (action === "increase") cart[index].quantity += 1;
              if (action === "decrease" && cart[index].quantity > 1) cart[index].quantity -= 1;
              if (action === "remove") cart.splice(index, 1);
              renderCart(products);
            };
          });
        }
      });
  });
  