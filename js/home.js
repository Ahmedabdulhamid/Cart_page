let row = document.querySelector('.row')
import { products } from "./data.js";
let logoutBtn=document.querySelector('.logout')
var cart=[];
let products2=[]

 localStorage.setItem("products",JSON.stringify(products))
 if (localStorage.getItem("products")) {
    products2=JSON.parse(localStorage.getItem("products"))
  console.log(localStorage.getItem("products"));
  
   
    
 }else{
  products2=[]

  
 }
  if (localStorage.getItem('cart')) {
   cart=JSON.parse(localStorage.getItem('cart'))
  }
  
  else{
    cart=[]
  
  }
function updateQuantity() {
  document.querySelector(".len").innerHTML =`<i class="fa-solid fa-cart-shopping"></i> (${cart.length})`
}
updateQuantity()
if (!localStorage.getItem('credentials')) {
  window.location.href="login.html"
}



function renderProducts() {
    products2.forEach((e) => {
      let encodedProduct = encodeURIComponent(JSON.stringify(e));
        let productloop= `
         <div class="col-lg-4 col-md-3 col-sm-12 my-3">
         <div class="card w-75 shadow-lg p-3 mb-5 bg-body-tertiary rounded"style="height:500px " >
       <img src="${e.image}" class="card-img-top" alt="${e.name}" height="300px">
       <div class="card-body">
         <h5 class="card-title">${e.name}</h5>
         <p class="card-text">price: ${e.price}</p>
         <button  class="add-to-cart gradient-btn orange text-center" data_id=${encodedProduct}>Add To Cart</button>
       </div>
     </div>
         </div>
         `
         row.innerHTML+=productloop
     })  
     
}

logoutBtn.addEventListener("click",()=>{
  localStorage.clear();
  window.location.href="login.html"
})
renderProducts();
document.querySelectorAll('.add-to-cart').forEach((button)=>{
  button.addEventListener("click",(e)=>{
    let object=e.target.getAttribute('data_id')
    object=JSON.parse(decodeURIComponent(object));
    let check=cart.some((e)=>{
      return e.id==object.id
    })
    if (!check) {
      cart.push({...object,count:1})
     console.log(cart);
     localStorage.setItem("cart",JSON.stringify(cart));
     swal( "Good job!","Product Added Successfully", "success");
     
    }
    else{
      cart=cart.map((e)=>{
        if (e.id==object.id) {
          e.count+=1;
          e.price*=e.count
          swal( "Good job!",`You Have ${e.count} from ${e.name}`, "success");

         return e
          
          
        }
        else{
          
          return e
          
        }
      })
      localStorage.setItem("cart",JSON.stringify(cart));
      
      
    }
    
    updateQuantity()
    
  })
})
