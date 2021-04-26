function pwdcheck(){
  var x1 = document.forms["myForm"]["firstname"];
  var nameRegex = /^[a-öA-Ö_ ]*$/;
  var x7 = document.forms["myForm"]["lastname"];
  var lastnameRegex = /^[a-öA-Ö_ ]*$/;
  var x2 = document.forms["myForm"]["email"];
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  var x3 = document.forms["myForm"]["address"];
  var adressRegex = /^[a-öA-Ö0-9_ :]*$/;
  var x4 = document.forms["myForm"]["city"];
  var cityRegex = /^[a-öA-Ö]*$/;
  var x5 = document.forms["myForm"]["zipcode"];
  var zipRegex = /^\d{3} \d{2}$/;
  var x6 = document.forms["myForm"]["phonenumber"];
  var phoneRegex = /^[0-9]*$/;

  
  if (x1.value == "") {
    alert("Du måste ange ditt namn");
   return false;
  } else if (!nameRegex.test(x1.value)) {
    alert("Felaktigt format på namn");
    return false;
  }

  if (x7.value == "") {
      alert("Du måste ange ditt efternamn");
      return false;
  } else if (!lastnameRegex.test(x7.value)) {
      alert("Felaktigt format på ditt efternamn");
      return false;
  }

  if (x3.value == "") {
    alert("Du måste ange din adress");
    return false;
  } else if (!adressRegex.test(x3.value)) {
    alert("Felaktigt format på adress");
    return false;
  }

  if (x5.value == "") {
    alert("Du måste ange ditt postnummer");
    return false;
  } else if (!zipRegex.test(x5.value)) {
    alert("Felaktigt format på postnummer, xxx xx");
    return false;
  }

  if (x4.value == "") {
    alert("Du måste ange din ort");
    return false;
  } else if (!cityRegex.test(x4.value)) {
    alert("Felaktigt format på ort");
    return false;
  }

  if (x6.value == "") {
    alert("Du måste ange ditt telefonnummer");
    return false;
  } else if (!phoneRegex.test(x6.value)) {
    alert("Felaktigt format på telefonnummer");
    return false;
  }

  if (x2.value == "") {
    alert("Du måste ange din email");
    return false;
  } else if (!emailRegex.test(x2.value)) {
    alert("Felaktigt format på email");
    return false;
  }
} 
     
