/* 
Task 2: Form Validation (JavaScript):
Implement JavaScript to validate the payment form data before submission.
What techniques would you use to ensure data integrity and security in
payment details? */

const nameError = document.getElementById("name-error");
const cardnoError = document.getElementById("cardno-error");
const expirydateError = document.getElementById("expirydate-error");
const securitycodeError = document.getElementById("securitycode-error");
const submitError = document.getElementById("submit-error");

function validateName() {
  const name = document.getElementById("username").value.trim();
  if (name.length == 0) {
    nameError.innerHTML = "Name is required.";
    return false;
  }
  if (!name.match(/^[A-Za-z]+\s[A-Za-z]+$/)) {
    nameError.innerHTML = "Enter a valid name.";
    return false;
  }
  nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
}

function validateCardNo() {
  const cardno = document.getElementById("cardno").value.trim();
  const s = cardno.replace(/[^0-9]/g, "");

  if (s.length < 13 || s.length > 19) {
    cardnoError.innerHTML =
      "Card number length must be between 13 and 19 digits.";
    return false;
  }
  let sum = 0;
  let sd = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let num = parseInt(s[i], 10);
    if (sd) {
      num *= 2;
      if (num > 9) {
        num -= 9;
      }
    }
    sum += num;
    sd = !sd;
  }
  if (sum % 10 !== 0) {
    cardnoError.innerHTML = "Invalid card number.";
    return false;
  }
  cardnoError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
}

function validateExpiryDate() {
  const expirydate = document.getElementById("expirydate").value.trim();
  if (!expirydate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
    expirydateError.innerHTML = "Invalid format";
    return false;
  }

  const [month, year] = expirydate.split("/").map((num) => parseInt(num, 10));

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() % 100;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    expirydateError.innerHTML = "Expiry date cannot be in the past.";
    return false;
  }

  expirydateError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
}

function validateCVV() {
  const cvv = document.getElementById("cvvcode").value;
  if (cvv.length == 0) {
    securitycodeError.innerHTML = "CVV is required";
    return false;
  }
  if (!cvv.match(/^[0-9]{3,4}$/)) {
    securitycodeError.innerHTML = "Not a valid CVV.";
    return false;
  }
  securitycodeError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  return true;
}

function validateForm(event) {
  event.preventDefault();

  const isValid =
    validateName() && validateCardNo() && validateExpiryDate() && validateCVV();

  if (isValid) {
    const formData = {
      name: document.getElementById("username").value.trim(),
      cardNumber: document.getElementById("cardno").value.trim(),
      expiryDate: document.getElementById("expirydate").value.trim(),
      cvv: document.getElementById("cvvcode").value.trim(),
    };

    function handlePayment() {
      // TODO: Handle the payment for the user after successful validation
    }
    validatePaymentForm(formData)
      .then((serverResponse) => {
        if (serverResponse.status === "SUCCESS") {
          handlePayment();
        } else {
          submitError.style.display = "block";
          submitError.innerHTML = serverResponse.message;
        }
      })
      .catch((error) => {
        console.error("Server validation failed:", error);
        submitError.style.display = "block";
        submitError.innerHTML = "Server validation failed. Please try again.";
      });
  } else {
    submitError.style.display = "block";
    submitError.innerHTML = "Please enter all required fields.";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 5000);
  }
}

function validatePaymentForm(data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/validate-payment", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };

    xhr.send(JSON.stringify(data));
  });
}
