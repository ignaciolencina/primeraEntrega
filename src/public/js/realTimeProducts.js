const socket = io();

const postProductFn = async (data) => {
  const res = await fetch(`http://localhost:8080/api/v1/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Ocurrió un error guardando la entrada");
  }
};

const deleteProductFn = async (id) => {
  const res = await fetch(`http://localhost:8080/api/v1/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(
      "Ocurrió un error intentando eliminar el producto seleccionado"
    );
  }
};

const $list = document.getElementById("productList");
const $form = document.getElementById("productForm");

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  postProductFn(data);
  $form.reset();
});

$list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;
    deleteProductFn(id);
  }
});

socket.on("productsUpdated", (products) => {
  renderProducts(products);
});

function renderProducts(products) {
  $list.innerHTML = ""; // Limpiamos la lista actual
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${product.title}</strong> / Precio: ${product.price} / Código: ${product.code}
      <button class="delete-btn" data-id="${product.id}">Eliminar</button>
    `;
    $list.appendChild(li);
  });
}
