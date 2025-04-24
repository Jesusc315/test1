document.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then((res) => res.json())
    .then((products) => {
      const grid = document.getElementById("product-grid");

      products.forEach((product) => {
        const card = `
          <div class="col">
            <div class="card h-100">
              <img src="${product.image}" class="card-img-top" alt="${product.name}" />
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="text-success">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
              </div>
            </div>
          </div>
        `;
        grid.insertAdjacentHTML("beforeend", card);
      });

      // Handle Add to Cart
      document.querySelectorAll(".add-to-cart").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          addToCart(id);
        });
      });
    });

  function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id == id);
    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ id: parseInt(id), quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  }
});
