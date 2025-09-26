// input objects
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// error divs
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// form object
const registrationForm = document.getElementById("registrationForm");
const submitStatus = document.getElementById("submit-status");

// load the username from local storage
document.addEventListener("DOMContentLoaded", () => {
  const savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    usernameInput.value = savedUsername;
  }
});

// input event listeners
usernameInput.addEventListener("input", () => {
  usernameError.innerHTML = "";
  let errorMessage = "";
  if (usernameInput.validity.valid) {
    usernameInput.setCustomValidity("");
    return;
  }
  if (usernameInput.validity.valueMissing) {
    errorMessage += "The field can not be empty!";
  }
  if (usernameInput.validity.tooShort) {
    errorMessage += "The username must be at least 8 characters!";
  }
  if (usernameInput.validity.patternMismatch) {
    errorMessage += "It must contain only letters!";
  }
  if (usernameInput.validity.typeMismatch) {
    errorMessage += "The input must be of type text!";
  }

  usernameInput.setCustomValidity(errorMessage);

  usernameInput.validationMessage.split("!").forEach((message) => {
    if (message) {
      usernameError.innerHTML += `<p>${message}</p>`;
    }
  });
  submitReady();
});

emailInput.addEventListener("input", () => {
  emailError.innerHTML = "";

  if (emailInput.validity.valueMissing) {
    emailInput.setCustomValidity("The field can not be empty!");
  } else if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity("The input must be of type email!");
  } else {
    emailInput.setCustomValidity("");
  }

  if (emailInput.validationMessage) {
    emailError.innerHTML = `<p>${emailInput.validationMessage}</p>`;
  }
  submitReady();
});

passwordInput.addEventListener("input", () => {
  passwordError.innerHTML = "";
  let errorMessage = "";
  if (passwordInput.validity.valid) {
    passwordInput.setCustomValidity("");
  }

  if (passwordInput.validity.valueMissing) {
    errorMessage += "The field can not be empty!";
  } else {
    if (passwordInput.validity.tooShort) {
      errorMessage += "The username must be at least 8 characters!";
    }
    if (!passwordInput.value.match(/[A-Z]+/)) {
      errorMessage += "The password must have an uppercase letter!";
    }
    if (!passwordInput.value.match(/[a-z]+/)) {
      errorMessage += "The password must have an lowercase letter!";
    }
    if (!passwordInput.value.match(/[0-9]+/)) {
      errorMessage += "The password must have an number!";
    }
  }
  if (confirmPasswordError.innerHTML.includes(`Password enteries must match!`)) {
      confirmPasswordError.innerHTML = passwordError.innerHTML.replace(
        `<p>Passwords don't match</p>`,
        ""
      );
      confirmPasswordInput.setCustomValidity("");
    }
  if (passwordInput.value !== confirmPasswordInput.value) {
    errorMessage += "Passwords don't match!";
  }
  passwordInput.setCustomValidity(errorMessage);

  passwordInput.validationMessage.split("!").forEach((message) => {
    if (message) {
      passwordError.innerHTML += `<p>${message}</p>`;
    }
  });

  submitReady();
});

confirmPasswordInput.addEventListener("input", () => {
  confirmPasswordError.innerHTML = "";
  if (confirmPasswordInput.validity.valueMissing) {
    confirmPasswordInput.setCustomValidity(
      "This field must be filled for password verification!"
    );
  } else if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity("Password enteries must match!");
  } else {
    confirmPasswordInput.setCustomValidity("");
    if (passwordError.innerHTML.includes(`Passwords don't match`)) {
      passwordError.innerHTML = passwordError.innerHTML.replace(
        `<p>Passwords don't match</p>`,
        ""
      );
      passwordInput.setCustomValidity("");
    }
  }

  if (confirmPasswordInput.validationMessage) {
    confirmPasswordError.innerHTML = `<p>${confirmPasswordInput.validationMessage}</p>`;
  }

  submitReady();
});

//helper function that returns true if the form is filled correctly and false otherwise
function submitReady() {
  if (
    usernameInput.value &&
    emailInput.value &&
    passwordInput.value &&
    confirmPasswordInput.value &&
    usernameError.innerHTML === "" &&
    emailError.innerHTML === "" &&
    passwordError.innerHTML === "" &&
    confirmPasswordError.innerHTML === ""
  ) {
    submitStatus.textContent = "Ready to Submit!";
    submitStatus.classList.add("submit-ready");
    return true;
  } else {
    submitStatus.textContent = "Fill all the fields in the required format";
    submitStatus.classList.remove("submit-ready");
    return false;
  }
}

// submit event listener
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (submitReady()) {
    localStorage.setItem("username", usernameInput.value);
  }

  if (!registrationForm.checkValidity()) {
    const firstInvalid = registrationForm.querySelector(":user-invalid");
    firstInvalid.focus();
    return
  }

  registrationForm.reset()
  usernameInput.value = localStorage.getItem('username')
});

