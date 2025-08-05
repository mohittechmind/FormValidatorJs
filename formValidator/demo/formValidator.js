/**
 * -------------------------------------------
 * ✅ FormValidator Class – Usage Reference
 * -------------------------------------------
 *
 * 🔸 Class Name        | 🔹 Where to Use It                          | 🔹 Purpose
 * -------------------------------------------------------------------------------------
 * required_field       | All mandatory inputs                        | Basic required validation
 * check-radio-wrap     | Parent <div> of checkboxes/radios           | Group selection validation
 * email                | Email input field                           | Email format validation
 * phone                | Phone number input                          | Checks for exactly 10 digits
 * only_number          | Numeric input fields                        | Accepts only digits
 * password             | Password input                              | Min 6 characters required
 * confirmp             | Confirm password field                      | Must match the .password field
 *
 * ✅ Example:
 * <input type="text" class="form-control required_field email" />
 *
 * 📌 Initialize using:
 *    new FormValidator("form");
 */

console.log(
  "%c✨ Form validation library created by Techmind Softwares ✨",
  "background: #000; color: white; font-size: 14px; font-weight: bold; padding: 8px 12px; border-radius: 4px;"
);

class FormValidator {
  constructor(formSelector, options = {}) {
    // this.form = document.querySelector(formSelector);
    this.form =
      formSelector instanceof HTMLElement
        ? formSelector
        : document.querySelector(formSelector);
    this.fields = this.form.querySelectorAll(".required_field");
    this.onSuccess = options.onSuccess || null;

    this.form.addEventListener("submit", this.validateForm.bind(this));
  }

  setError(element, message) {
    let errorBox = document.createElement("span");
    errorBox.classList.add("errorBox");
    errorBox.innerText = message;
    element.parentElement.appendChild(errorBox);
  }

  clearErrors() {
    this.form.querySelectorAll(".errorBox").forEach((e) => e.remove());
  }

  validateForm(event) {
    this.clearErrors();
    let isValid = true;

    this.fields.forEach((field) => {
      const value = field.value?.trim();
      const classList = field.classList;

      // For checkbox group
      if (classList.contains("check-radio-wrap")) {
        const checked = field.querySelectorAll("input:checked");
        if (checked.length === 0) {
          this.setError(
            field.children[0],
            "Please select at least one checkbox"
          );
          isValid = false;
        }
      }

      if (value === "") {
        this.setError(field, "This field is required");
        isValid = false;
        return;
      }

      if (classList.contains("email")) {
        if (!/\S+@\S+\.\S+/.test(value)) {
          this.setError(field, "Invalid email format");
          isValid = false;
        }
      }

      if (classList.contains("phone")) {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length !== 10) {
          this.setError(field, "Phone number must be 10 digits");
          isValid = false;
        }
      }

      if (classList.contains("only_number")) {
        if (isNaN(value)) {
          this.setError(field, "Only numbers allowed");
          isValid = false;
        }
      }

      if (classList.contains("password")) {
        if (value.length < 6) {
          this.setError(field, "Password must be at least 6 characters");
          isValid = false;
        }
      }

      if (classList.contains("confirmp")) {
        const password = this.form.querySelector(".password").value;
        if (value !== password) {
          this.setError(field, "Passwords do not match");
          isValid = false;
        }
      }
    });

    if (!isValid) {
      event.preventDefault();
    } else if (this.onSuccess && typeof this.onSuccess === "function") {
      event.preventDefault(); // prevent default submit
      this.onSuccess(new FormData(this.form)); // pass form data
    }
  }
}
