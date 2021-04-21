function pwdcheck(){
    let password = document.getElementsByName("newpwd")[0].value
    let confirmPassword = document.getElementsByName("newpwd2")[0].value
        if(password == confirmPassword){
            var pass="OK"
            }
            else{
            var pass="NO"
            }
    if(pass=="OK"){
        return true
    }
    else{
        alert("Lösenorden måste stämma med varandra");
        return false
    }           
}




