let row_table = document.querySelector('.tr');
let totalPrice = document.querySelector('.total_price')
let row=document.querySelector('.row');
let delBtn = document.querySelector('.del')
totalPrice.innerHTML = ''
var cart = [];

if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'))
}
else {
  cart = []

}
function renderProducts() {
  row_table.innerHTML = ""; // تفريغ المحتوى لمنع التكرار

  cart.forEach((e, index) => {



    let productloop = `
      <tr class="tr">
        <th scope="row">${index + 1}</th>
        <td>${e.name}</td>
        <td>
          <img src="${e.image}" class="img-fluid" style="max-width: 80px; height: auto;">
        </td>
        <td>
          <button class="btn btn-sm" onClick="increment(${e.id})">+</button>
          ${e.count}
          <button class="btn btn-sm" onClick="decrement(${e.id})">-</button>
        </td>
        <td>$ ${e.price * e.count}</td>
        <td>
          <button class="btn btn-sm btn-danger" onClick="removeItem(${e.id})">
          Delete  <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
    row_table.innerHTML += productloop;
  });
  if (cart.length==0) {
    row.innerHTML = `
    
    <div class="d-flex justify-content-center">
    <div class="col-lg-6 col-md-6 col-sm-12">
    <h3 class="text-success">Empty Cart</h3>
     <img src="./images/empty-cart.png" alt="" width="100%">
      <a href="./home.html" class="btn btn-success">Back To Home</a>
    </div>
    </div>
    
    `;
  }
  
}
if (!localStorage.getItem('credentials')) {
  window.location.href="login.html"
}


function updateTotalPrice() {
  totalPrice.innerHTML = `The Total Price : $ ${cart.reduce((total, e) => total + (e.price * e.count), 0)}`;
}
updateTotalPrice()
renderProducts()
function increment(id) {


  cart = cart.map((e) => {
    if (e.id == id) {
      e.count += 1

      return e
    }
    else {
      return e
    }
  })
  localStorage.setItem("cart", JSON.stringify(cart))

  renderProducts()
  updateTotalPrice()
}
function decrement(id) {
  cart = cart.map((e) => {
    if (e.id == id && e.count > 1) {
      e.count -= 1

      return e
    }
    else {
      return e
    }
  })
  localStorage.setItem("cart", JSON.stringify(cart))

  renderProducts()
  updateTotalPrice()
}
function removeItem(id) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this Product",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your Product file has been deleted!", {
          icon: "success",
        });
        cart = cart.filter((e) => {
          return e.id != id
        })
        localStorage.setItem("cart", JSON.stringify(cart))


        renderProducts();
        updateTotalPrice();
      } else {
        swal("Your Product is safe!");
      }
    });


}
delBtn.addEventListener("click", () => {
  swal({
    title: "Are you sure?",
    text: "You Will Empty Your Cart",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your Product file has been deleted!", {
          icon: "success",
        });
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart))
        renderProducts()
        updateTotalPrice()
      } else {
        swal("Your Product is safe!");
      }
    });

})