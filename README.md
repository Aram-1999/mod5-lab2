# Reflection Questions

1. It doesn't refresh the page. This helps with the debugging process as logs don't disappear after hitting the submit button.

2. JavaScript validation attributes provide more flexibility and customization. You can change error messages, display a list of them, and more. Basic HTML validation is useful for common checks such as required, but for cases like comparing two password fields, JavaScript is necessary.

3. I used setItem and getItem methods on localStorage by passing the key - "username", as its first argument and value as its second argument. Local storage does not have an expiration and the storage can be access by anyone using the same browser which makes it not a good option at all to store sensitive data.

4. The challenge was to figure out how to get both password fields to show an error when the other one changes. It wasn't too difficult since I needed to verify that both passwords are equal and then set the error message to an empty string if the entries were matching.

5. I used appropriate positioning of the if checks and a div container for error messages to display multiple errors when they occured.