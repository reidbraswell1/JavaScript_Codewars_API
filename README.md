# JavaScript APIs

## Getting Started

1. Open your command line and navigate to your `repos` directory (if you do not have a `repos` folder, then you can use `mkdir repos` to create one)
2. Use this template repository to start a new project in your repos folder: `git clone <repo_name>`
3. cd `repo_name` to navigate into your new repo directory
4. Start Visual Studio Code and select 'Open Folder'. Then select `repo_name` to open the folder in the editor (or just type `code .` in your terminal inside the repo directory)
5. Follow the instructions on the README.md file to complete exercises
6. Open the index.html file to get started

## Exercise 1

- Let's play around with API calls to Giphy

1. Open your index.html
2. Beneath the p tag, but before the img tag, add the following:
   - Label, input, and button
3. Feel free to label and style
4. Open your app.js
5. Add an event listener to the button that listens for a click event, and does the following:
   - Selects the img element and assigns it to a variable
   - Selects the input element, grabs the `value` from the element and assigns it to a variable
   - Then, write a fetch request to "https://api.giphy.com/v1/gifs/translate?api_key=YOURAPIKEY&s="
   - Add the stored input value from above to the end of the api call
   - Make sure that you enable CORS with `{mode: "cors"}`
   - Chain a `.then` that takes the response and converts the json to a regular object
   - Chain another `.then` that takes the result and assigns the image url of the response object to the image tag source
   - Add the `.catch` method that accepts a callback that `console.log`'s the rejection (if any)
6. If you have added the event listener correctly, and correctly called the Giphy API, then you will be able:
   - Let the user input any keyword to the input box
   - Let the user press the button
   - And display a gif in the image tag depending on the API response for the keyword
