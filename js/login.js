let form=document.querySelector('.form')
let email=document.querySelector('.email')
let password =document.querySelector('.password')
let btn =document.querySelector('.btn')
let Alert=document.querySelector(".alert")

if (localStorage.getItem('credentials')) {
    window.location.href="home.html"
  }
form.addEventListener("submit",(e)=>{
    e.preventDefault()
   if (password.value== "" || email.value=="") {
         Alert.style.display="block"
        Alert.innerHTML="You Should Fill All Fields..."
    } 
   else {
        let credentials = {
            email: email.value,
            password: password.value
        };
        localStorage.setItem("credentials", JSON.stringify(credentials));
         window.location.href = "home.html";
    }
    
})



