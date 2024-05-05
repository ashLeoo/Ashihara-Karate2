function validateForm() {
  var firstName = document.forms["myForm"]["firstName"].value;
  var lastName = document.forms["myForm"]["lastName"].value;
  var email = document.forms["myForm"]["email"].value;
  var gender = document.forms["myForm"]["gender"].value;
  var location = document.forms["myForm"]["location"].value;
  var age = document.forms["myForm"]["age"].value;

  if (firstName == "") {
      alert("Vă rugăm să completați prenumele!");
      return false;
  }
  if (lastName == "") {
      alert("Vă rugăm să completați numele!");
      return false;
  }
  if (email == "") {
      alert("Vă rugăm să completați adresa de email!");
      return false;
  }
  if (gender == "") {
      alert("Vă rugăm să selectați genul!");
      return false;
  }
  if (location == "") {
      alert("Vă rugăm să selectați locația Dojo!");
      return false;
  }
  if (age == "") {
      alert("Vă rugăm să completați vârsta!");
      return false;
  }
  return true; // Permite trimiterea formularului dacă toate câmpurile sunt completate
}
