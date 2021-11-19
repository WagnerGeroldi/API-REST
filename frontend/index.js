const API_URL = "http://localhost:8080/api/products";

const edit = document.querySelector("#edit");

const productList = document.querySelector("#product-list");
const form = document.querySelector("#form");
const formEdit = document.querySelector("#formEdit");

function eventoBotaoExcluir() {
  const btnExcluir = document.querySelectorAll(".btnExcluir");

  btnExcluir.forEach((botao) => {
    botao.onclick = function (e) {
      e.preventDefault();
      const id = this.dataset.id;

      fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      }).then((response) => {
        response.json().then((data) => {
          if (data.message === "success") {
            obterLista();
            alert("Deletado com sucesso");
          } else {
            alert("OPS! Deu um erro, tente novamente");
          }
        });
      });
    };
  });
}

function eventoBotaoEditar() {
  const btnEditar = document.querySelectorAll(".btnEditar");

  btnEditar.forEach((botao) => {
    botao.onclick = function (e) {
      e.preventDefault();

      edit.classList.remove("hidden");

      const id = this.dataset.id;
      const name = this.dataset.name;
      const brand = this.dataset.brand;
      const price = this.dataset.price;

      document.forms["formEdit"].id.value = id;
      document.forms["formEdit"].name.value = name;
      document.forms["formEdit"].brand.value = brand;
      document.forms["formEdit"].price.value = price;
    };
  });
}

function obterLista() {
  fetch(API_URL).then((response) => {
    response
      .json()
      .then((data) => {
        const productsHtml = data
          .map(
            (product) => `
      <li>
          ${product.name} - ${product.brand} - ${product.price} - 
          <a href="#" class="btnEditar" 
          data-id=${product._id}
          data-name=${product.name}
          data-brand=${product.brand}
          data-price=${product.price}>[editar]
          </a>

          <a href="#" class="btnExcluir" data-id=${product._id}>[excluir]</a>
          </li>
          <br>
      `
          )
          .join(""); // colocar join para unir todos os itens

        productList.innerHTML = productsHtml;

        eventoBotaoExcluir();
        eventoBotaoEditar();
      })
      .catch((err) => console.log(err));
  });
}
obterLista();

//cadastrar
form.onsubmit = function (e) {
  e.preventDefault();

  const name = document.forms["form"].name.value;
  const brand = document.forms["form"].brand.value;
  const price = document.forms["form"].price.value;

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      brand,
      price,
    }),
  }).then((response) => {
    response.json().then((data) => {
      if (data.message === "success") {
        alert("Cadastrado com sucesso");
        form.reset();
        obterLista();
      } else {
        alert("OPS! Deu um erro, tente novamente");
      }
    });
  });
};

//editar

formEdit.onsubmit = function (e) {
  e.preventDefault();

  const id = document.forms["formEdit"].id.value;
  const name = document.forms["formEdit"].name.value;
  const brand = document.forms["formEdit"].brand.value;
  const price = document.forms["formEdit"].price.value;

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      brand,
      price,
    }),
  }).then((response) => {
    response.json().then((data) => {
      if (data.message === "success") {
        formEdit.reset();
        edit.classList.add("hidden");
        obterLista();
        alert("Alterdo com sucesso com sucesso");
      } else {
        alert("OPS! Deu um erro, tente novamente");
      }
    });
  });
};



function cancelar() {
  edit.classList.add('hidden')
}