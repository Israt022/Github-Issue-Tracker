const btn = document.getElementById("btn");

btn.addEventListener('click',()=>{
    const inpUserName = document.getElementById("inpName");
    const inpPassword = document.getElementById("inpPass");

    const username = inpUserName.value;
    const password = inpPassword.value;

    if(username === "admin" && password === "admin123"){
        window.location.assign("./main.html");
    }else{
        window.location.assign("/")
    }
})