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

const $list = document.getElementById("productList");
const $delete = document.getElementById("deleteProduct");
const $form = document.getElementById("productForm");

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  postProductFn(data);
  $form.reset();
});
