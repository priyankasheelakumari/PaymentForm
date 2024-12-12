To improve the usability and appearance of the payment form
css is applied with responsiveness by adding media queries to ensure proper style for different media types.

CSS box-sizing property used to include the padding and border in an element's total width and height.

Used relative units like rem, em, vh in terms of providing a scalable and maintainable design.
Used % that render an element relative to the size of the element's parent.

For input validation hightlighting uses <span> element to display error message.
Once the input value is validated will display a checkmark icon to improve user experience.
Also added input focus  styles like change in border color of selected input field to highlight the field selected by user.

Includes the "Poppins" font from Google Fonts, giving the form a modern, clean look.
Sets a dark blue background to give a professional, elegant appearance.
Ensures the heading is centered with a white background for contrast and better readability.

Uses Flexbox to center the form vertically and horizontally inside the .form-container.
The form has a maximum width (max-width: 600px) for better usability on larger screens while staying responsive on smaller screens.

Each input field is wrapped inside a .input-group for a consistent structure.

Accessibility:
Ensure sufficient contrast (dark text on light backgrounds).
Use clear focus styles (input:focus) to improve navigation for keyboard and screen reader users.

Responsiveness:
Use media queries to ensure the form looks good on various devices and screen sizes.

Consistency:
Use a unified font family, color scheme, and spacing to maintain visual harmony.

Error Handling:
Provide immediate feedback with clear error messages.

Padding and Alignment:
Use padding and margins to separate elements for a clean layout.