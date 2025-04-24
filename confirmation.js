document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");
  
    document.getElementById("order-id").textContent = orderId;
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    fetch("products.json")
      .then(res => res.json())
      .then(products => {
        let summary = "";
        cart.forEach(item => {
          const product = products.find(p => p.id === item.id);
          summary += `<p>${product.name} x ${item.quantity} - $${(product.price * item.quantity).toFixed(2)}</p>`;
        });
        document.getElementById("summary").innerHTML = summary;
      });
  
    // Clear cart after order
    localStorage.removeItem("cart");
  });
  