const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const emailAddress = document.getElementById("email_address");
const generalEnquiry = document.getElementById("general-enquiry");
const supportRequest = document.getElementById("support-request");
const messageArea = document.getElementById("message_area");
const checkBox = document.getElementById("checkbox");
const form = document.getElementById("form-id");

// Function to show error message
const showError = (input, message) => {
  const formDiv =
    input.type === "checkbox"
      ? input.closest(".checkbox-div")
      : input.parentElement;
  const errorDisplay = formDiv.querySelector(".error-message");

  // Add red border only to input elements, not labels for radio buttons
  if (input.type !== "radio") {
    input.style.borderColor = "red";
  }

  if (!errorDisplay) {
    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.textContent = message;
    formDiv.appendChild(error);
  } else {
    errorDisplay.textContent = message;
  }
};

const validateEmail = (email) => {
  // Regular expression for basic email validation
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

// Function to clear error message
const clearError = (input) => {
  const formDiv =
    input.type === "checkbox"
      ? input.closest(".checkbox-div")
      : input.parentElement;
  const errorDisplay = formDiv.querySelector(".error-message");

  // Reset border color only for input elements, not labels for radio buttons
  if (input.type !== "radio") {
    input.style.borderColor = "";
  }

  if (errorDisplay) {
    formDiv.removeChild(errorDisplay);
  }
};

// Function to clear form
const clearForm = () => {
  form.reset();
  clearError(firstName);
  clearError(lastName);
  clearError(emailAddress);
  clearError(messageArea);
  clearError(generalEnquiry.parentElement);
  clearError(supportRequest.parentElement);
  clearError(checkBox);
};

// Function to create and show custom alert
const showCustomAlert = () => {
  // Create alert element
  const alertDiv = document.createElement("div");
  alertDiv.className = "custom-alert";

  // Alert content
  alertDiv.innerHTML = `
    <div class="custom-alert-header">
    <img src="./assets/images/icon-success-check.svg" />
    <span>Message Sent!</span>
    </div>
    <p>Thanks for completing the form. We'll be in touch soon!</p>
  `;

  // Append to body
  document.body.appendChild(alertDiv);

  // Hide after 3 seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);

  // Hide on click anywhere
  document.addEventListener(
    "click",
    () => {
      alertDiv.remove();
    },
    { once: true }
  );
};

// Form submit event listener
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Clear previous errors
  clearError(firstName);
  clearError(lastName);
  clearError(emailAddress);
  clearError(messageArea);
  clearError(checkBox);

  let hasError = false;

  // Validate first name
  if (firstName.value.trim() === "") {
    showError(firstName, "This field is required.");
    hasError = true;
  }

  // Validate last name
  if (lastName.value.trim() === "") {
    showError(lastName, "This field is required.");
    hasError = true;
  }

  //Validate email
  if (emailAddress.value.trim() === "") {
    showError(emailAddress, "Email address is required.");
    isValid = false;
  } else if (!validateEmail(emailAddress.value.trim())) {
    showError(emailAddress, "Please enter a valid email Address.");
    isValid = false;
  }
  // Validate radio buttons
  if (!generalEnquiry.checked && !supportRequest.checked) {
    showError(generalEnquiry.parentElement, "Please select a query type.");
    hasError = true;
  }

  // Validate message area
  if (messageArea.value.trim() === "") {
    showError(messageArea, "This field is required.");
    hasError = true;
  }

  // Validate checkbox
  if (!checkBox.checked) {
    showError(
      checkBox,
      "To submit this form, please consent to being contacted."
    );
    hasError = true;
  }

  // If no errors, show custom alert and clear form
  if (!hasError) {
    clearForm(); // Clear form fields
    showCustomAlert(); // Show custom alert
  }
});
