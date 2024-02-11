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

    errorDisplay.innerText = errorMessage;
  };

  const clearError = (element) => {
    const parentDiv = element.parentElement;
    const errorDisplay = parentDiv.querySelector(".error");

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
      isSuccess = true;
    }
  };

  const setValidityTrue = (element) => {
    if (element === "email") {
      emailIsValid = true;
    } else if (element === "country") {
      countryIsValid = true;
    } else if (element === "zip") {
      zipIsValid = true;
    } else if (element === "pass") {
      passwordIsValid = true;
    } else if (element === "confirmPass") {
      cPassIsValid = true;
    }
  };

  return {
    setError,
    clearError,
    setSuccessMessage,
    checkSuccess,
    setValidityTrue,
  };
}

const functionFactory = functionsInitiate();

// Event Listeners

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (isSuccess) {
    functionFactory.setSuccessMessage(
      "Yay! Success! Here's a high five!",
      "green"
    );
  } else {
    functionFactory.setSuccessMessage("Fulfill all form requirements!", "red");
  }
});

email.addEventListener("input", () => {
  if (email.validity.valid && email.value != "" && email.value != null) {
    functionFactory.clearError(email);
    functionFactory.setValidityTrue("email");
  } else {
    if (email.value === "" || email.value === null) {
      functionFactory.setError(email, "Email is required");
    } else if (email.validity.typeMismatch) {
      functionFactory.setError(email, "Please enter a valid email adress");
    }
  }
});
