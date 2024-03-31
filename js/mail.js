function sendMail() {
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var messageInput = document.getElementById("message");

  var name = nameInput.value;
  var email = emailInput.value;
  var message = messageInput.value;

  // Reset previous warnings
  resetWarnings();

  // Validate inputs
  var isValid = true;

  if (name.trim() === "") {
    showWarning(nameInput, "Please, enter your full name");
    isValid = false;
  }

  if (email.trim() === "") {
    showWarning(emailInput, "Please, enter your e-mail address");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showWarning(emailInput, "Please, enter a valid e-mail address");
    isValid = false;
  }

  if (message.trim() === "") {
    showWarning(messageInput, "Please, enter your message");
    isValid = false;
  }

  if (!isValid) {
    return; // Exit if any input is invalid
  }

  var params = {
    name: name,
    email: email,
    message: message,
  };

  const serviceID = "service_8zfo96f";
  const templateID = "template_6q40wgr";

  disableForm(); // Disable the form while sending the email

  emailjs
    .send(serviceID, templateID, params)
    .then(res => {
      console.log(res);
      showSuccessMessage();
    })
    .catch(err => {
      console.log(err);
      enableForm(); // Re-enable the form if an error occurs
    });
}

function resetWarnings() {
  var form = document.getElementById("cform");
  var warnings = form.querySelectorAll(".warning");

  warnings.forEach(warning => {
    warning.style.display = "none";
  });
}

function showWarning(input, message) {
  var warning = input.parentElement.querySelector(".warning");

  warning.style.display = "block";
  warning.textContent = message;
}

function isValidEmail(email) {
  // Use a regular expression to validate email format
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function disableForm() {
  var form = document.getElementById("cform");
  var button = form.querySelector(".button");
  var inputs = form.querySelectorAll("input, textarea");

  // Disable form inputs and button
  inputs.forEach(input => (input.disabled = true));
  button.disabled = true;
}

function enableForm() {
  var form = document.getElementById("cform");
  var button = form.querySelector(".button");
  var inputs = form.querySelectorAll("input, textarea");

  // Enable form inputs and button
  inputs.forEach(input => (input.disabled = false));
  button.disabled = false;
}

function showSuccessMessage() {
  document.getElementById("cform").style.display = "none";
  document.getElementById("success-message").style.display = "block";
}