JavaScript code to validate the payment form data before submission is created.

This code includes client-side form validation and an additional step for server-side validation using an AJAX request to ensure data integrity and security for the payment details

This JavaScript code validates a payment form by checking the user's input in various fields (Name, Card Number, Expiry Date, and CVV). It uses nameError, cardnoError, expirydateError, securitycodeError, and submiteError to validate each field based on specific rules and ensures that the entire form is valid before submission.
If all validations pass (isValid is true), it proceeds to server-side validation. Otherwise, an error message is displayed.

Sends the formData object to a server endpoint (/validate-payment) for server-side validation via the ajaxValidateForm function.
If the server responds with status: "SUCCESS", the client proceeds to generate a payment token using createPaymentToken.
If the server responds with an error, displays the server's error message.

Name Validation (validateName):
Checks:
Field is not empty.
Name follows the format Firstname Lastname (two words, each starting with letters).
Steps:
If the field is empty, it displays "Name is required."
If it doesn't match the regex ^[A-Za-z]+\s[A-Za-z]+$, it displays "Enter a valid name."
If valid, displays a checkmark icon.

Card Number Validation (validateCardNo):
Checks:
Card number contains 13 to 19 digits (excluding spaces or other non-digit characters).
Validates the number using the Luhn algorithm (used by credit card companies to validate card numbers).
Steps:
Strips non-digit characters using cardno.replace(/[^0-9]/g, "").
Ensures the length is between 13 and 19 digits.
Applies the Luhn algorithm:
Starting from the last digit, double every second digit and subtract 9 if the result is greater than 9.
Sum all digits and check if the total is divisible by 10.
Displays "Invalid card number." if the check fails.

Expiry Date Validation (validateExpirydate):
Checks:
Matches the format MM/YY.
Date is not in the past.
Steps:
Validates the format using expirydate.match(/^(0[1-9]|1[0-2])\/\d{2}$/).
Splits the input into month and year, then compares it to the current month and year.
Displays "Invalid format" or "Expiry date cannot be in the past." if checks fail.

CVV Validation (validateCvv):
Checks:
Field is not empty.
CVV is a 3- or 4-digit number.
Steps:
Validates format using cvv.match(/^[0-9]{3,4}$/).
Displays "CVV is required" or "Not a valid CVV." if checks fail.

Client-Side Validation:

Reduces the likelihood of sending invalid data to the server.
Provides immediate feedback to users.
Server-Side Validation:

Ensures that malicious users cannot bypass validation by manipulating the client-side code.
Validates additional details, such as the card's validity or account balance.
AJAX Requests:

Avoids full-page reloads for seamless user experience.
Sends data securely to the server for further validation.
Error Handling:

Handles both client-side and server-side errors to provide a robust and secure process.
Example Scenario
Client-Side Validation:

User enters:

Name: "Priyanka Sheelakumari" → Valid.
Card Number: "1255888889801005" → Passes the Luhn algorithm.
Expiry Date: "12/25" → Valid.
CVV: "123" → Valid.
All checks pass, and the form proceeds to server-side validation.

AJAX Request:

Sends formData to /validate-payment.
Server responds with:
json
Copy code
{
  "status": "SUCCESS",
  "message": "Validated successfully."
}
Payment Token Generation:

createPaymentToken is called to handle further processing.
Error Handling:

If the server response includes an error (eg: "Card declined"), displays the error to the user.
