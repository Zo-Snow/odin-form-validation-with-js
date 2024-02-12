const form = document.querySelector("form");
const email = document.querySelector("#email");
const country = document.querySelector("#country");
const zip = document.querySelector("#zip");
const password = document.querySelector("#password");
const cPassword = document.querySelector("#c-password");

let isSuccess = false;

function functionsInitiate() {
  let emailIsValid = false;
  let countryIsValid = false;
  let zipIsValid = false;
  let passwordIsValid = false;
  let cPassIsValid = false;

  const setError = (element, errorMessage) => {
    const parentDiv = element.parentElement;
    const errorDisplay = parentDiv.querySelector(".error");
    element.classList = "invalid-input";

    errorDisplay.innerText = errorMessage;
  };

  const clearError = (element) => {
    const parentDiv = element.parentElement;
    const errorDisplay = parentDiv.querySelector(".error");
    element.classList = "valid-input";

    errorDisplay.innerText = "";
  };

  const setSuccessMessage = (message, color) => {
    const displayMessage = document.querySelector(".sucess");

    displayMessage.innerText = message;
    displayMessage.style.color = color;
  };

  const checkSuccess = () => {
    if (
      emailIsValid &&
      countryIsValid &&
      zipIsValid &&
      passwordIsValid &&
      cPassIsValid
    ) {
      console.log("email vaue: " + emailIsValid);
      console.log("country vaue: " + countryIsValid);
      console.log("zip vaue: " + zipIsValid);
      console.log("password vaue: " + passwordIsValid);
      console.log("cconfr password vaue: " + cPassIsValid);
      return true;
    } else {
      console.log("email vaue: " + emailIsValid);
      console.log("country vaue: " + countryIsValid);
      console.log("zip vaue: " + zipIsValid);
      console.log("password vaue: " + passwordIsValid);
      console.log("cconfr password vaue: " + cPassIsValid);
    }
  };

  const setValidity = (element, validity) => {
    if (element === "email") {
      if (validity === "false") {
        emailIsValid = false;
      } else if (validity === "true") {
        emailIsValid = true;
      }
    } else if (element === "country") {
      if (validity === "false") {
        countryIsValid = false;
      } else if (validity === "true") {
        countryIsValid = true;
      }
    } else if (element === "zip") {
      if (validity === "false") {
        zipIsValid = false;
      } else if (validity === "true") {
        zipIsValid = true;
      }
    } else if (element === "pass") {
      if (validity === "false") {
        passwordIsValid = false;
      } else if (validity === "true") {
        passwordIsValid = true;
      }
    } else if (element === "confirmPass") {
      if (validity === "false") {
        cPassIsValid = false;
      } else if (validity === "true") {
        cPassIsValid = true;
      }
    }
  };

  return {
    setError,
    clearError,
    setSuccessMessage,
    checkSuccess,
    setValidity,
  };
}

const functionFactory = functionsInitiate();

// Event Listeners

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (functionFactory.checkSuccess()) {
    if (password.value === cPassword.value) {
      isSuccess = true;
      console.log(password.value);
      console.log(cPassword.value);
    } else {
      isSuccess = false;
    }
  } else {
    isSuccess = false;
  }

  if (isSuccess) {
    functionFactory.setSuccessMessage(
      "Yay! Success! Here's a high five!",
      "rgb(113, 219, 113)"
    );
  } else if (password.value != cPassword.value) {
    functionFactory.setSuccessMessage(
      "Please make sure passwords match!",
      "red"
    );
  } else {
    functionFactory.setSuccessMessage("Fulfill all form requirements!", "red");
  }
});

email.addEventListener("input", () => {
  if (email.validity.valid && email.value != "" && email.value != null) {
    functionFactory.clearError(email);
    functionFactory.setValidity("email", "true");
  } else {
    if (email.value === "" || email.value === null) {
      functionFactory.setError(email, "Email is required");
    } else if (email.validity.typeMismatch) {
      functionFactory.setError(email, "Please enter a valid email adress");
    }
    functionFactory.setValidity("email", "false");
  }
});

country.addEventListener("input", () => {
  if (country.value != "" && country.value != null) {
    functionFactory.clearError(country);
    functionFactory.setValidity("country", "true");
  } else {
    if (country.value === "" || country.value === null) {
      functionFactory.setError(country, "Country is required");
    }
    functionFactory.setValidity("country", "false");
  }
});

zip.addEventListener("input", () => {
  if (
    zip.value != "" &&
    zip.value != null &&
    zip.value.length === 5 &&
    parseInt(zip.value)
  ) {
    functionFactory.clearError(zip);
    functionFactory.setValidity("zip", "true");
  } else {
    if (zip.value === "" || zip.value === null) {
      functionFactory.setError(zip, "Zip code is required");
    } else if (zip.value.length != 5) {
      functionFactory.setError(zip, "Zip code has to have 5 letters");
    } else if (!parseInt(zip.value)) {
      functionFactory.setError(zip, "A zip code can only have numbers!");
    }
    functionFactory.setValidity("zip", "false");
  }
});

password.addEventListener("input", () => {
  if (
    password.value != "" &&
    password.value != null &&
    password.value.length >= 8
  ) {
    functionFactory.clearError(password);
    functionFactory.setValidity("pass", "true");
  } else {
    if (password.value === "" || password.value === null) {
      functionFactory.setError(password, "Password is required");
    } else if (password.value.length < 8) {
      functionFactory.setError(
        password,
        "Your password requires atleast 8 characters"
      );
    }
    functionFactory.setValidity("pass", "false");
  }
});

cPassword.addEventListener("input", () => {
  if (
    cPassword.value != "" &&
    cPassword.value != null &&
    cPassword.value === password.value
  ) {
    functionFactory.clearError(cPassword);
    functionFactory.setValidity("confirmPass", "true");
  } else {
    if (cPassword.value === "" || cPassword.value === null) {
      functionFactory.setError(cPassword, "Please confirm password");
    } else if (cPassword.value != password.value) {
      functionFactory.setError(cPassword, "Passwords do not match");
    }
    functionFactory.setValidity("confirmPass", "false");
  }
});
