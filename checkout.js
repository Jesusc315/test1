document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkout-form");
    const summary = document.getElementById("order-summary");
  
    // Display cart summary
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    fetch("products.json")
      .then((res) => res.json())
      .then((products) => {
        let total = 0;
        summary.innerHTML = cart.map(item => {
          const product = products.find(p => p.id === item.id);
          total += product.price * item.quantity;
          return `<p>${product.name} x ${item.quantity} - $${(product.price * item.quantity).toFixed(2)}</p>`;
        }).join("") + `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
      });
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const pass = document.getElementById("password").value;
  
      const res = await fetch("users.json");
      const users = await res.json();
      const user = users.find(u => u.email === email && u.password === pass);
  
      if (!user) {
        alert("Invalid login!");
        return;
      }
  
      // Save order data in query string
      const params = new URLSearchParams({
        orderId: Math.floor(Math.random() * 1000000),
        date: new Date().toLocaleDateString(),
      });
  
      window.location.href = `confirmation.html?${params}`;
    });
  });
  