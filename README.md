Created a registration page (/register) using an EJS form with name attributes for inputs.
Configured Express to parse form data using express.urlencoded({ extended: false }).
Used bcrypt to securely hash user passwords before storing them.
Fixed the form by ensuring name attributes were correctly set for all input fields.
Stored registered users in an array and redirected them to the login page after successful registration. (Shouldn't be done on prod) - as im just starting i did for basic
