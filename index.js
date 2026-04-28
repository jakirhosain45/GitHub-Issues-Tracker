
const loginbtn =document.getElementById('loginbtn')


loginbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const useername =document.getElementById('username').value
    const password =document.getElementById('password').value
    if(!useername || !password){
        alert('please provide username and password')
    }
    else if(useername === "admin" && password === "admin123"){
        window.location.href = "/home.html"
    }
    else{
        alert('Invalid  username or password')
    }
    
})

