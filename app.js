console.log("Hello World!\n==========\n");

// Exercise 1 Section
console.log("EXERCISE 1:\n==========\n");

document.getElementById("theme").addEventListener("change", themeChange);
let selectedIndex;

// Fucntion to change the theme colors of the page
function themeChange() {
  console.log("---Begin themeChange()---");

  const colorBlack = "black";
  const colorWhite = "white";
  const lightTheme = "light";
  const darkTheme = "dark";
  const rootElement = "html";

  const root = document.getElementById(rootElement);

  switch (this.value) {
    case lightTheme:
      root.style.color = colorBlack;
      root.style.backgroundColor = colorWhite;
      break;
    case darkTheme:
      root.style.color = colorWhite;
      root.style.backgroundColor = colorBlack;
      break;
    default:
      root.style.color = colorBlack;
      root.style.backgroundColor = colorWhite;
      break;
  }
  console.log("---End changeTheme()---");
}
/* 
   Change visibility to hidden
   and change src on all images
   to #
*/
function blankImages(prefix) {
  console.log("---Begin blankImages()---");
  console.log(`Parameters: prefix=${prefix}`);

  const visibility = "hidden";
  const gifSearchId = "gifSearch";

  for (let i = 1; i <= 5; i++) {
    let imageObj = document.getElementById(`${prefix}${i}`);
    imageObj.src = "#";
    imageObj.style.visibility = visibility;
  }
  console.log("---End blankImages()---");
}

/*
  Main controlling function called by
  action on the form
*/
function controller(searchKey, theme) {
  console.log("---Begin controller()---");
  console.log(`Parameters: searchKey=${searchKey}\ntheme=${theme}`);

  const gifSearchId = "gifSearch";

  getGiph(searchKey)
    .then(function (response) {
      if (response == null) {
        throw new Error("Error has occured in fetch");
      }
      console.log("getGiph Promise fulfilled response returned response below");
      console.log(response);
      if ("reason" in response) {
        if (response.reason == "not found") {
          throw new Error("Not Found");
        }
      }
      console.log(response.ranks.languages);
      let languages = response.ranks.languages;
      let keys = Object.keys(languages);
      console.log("obj contains " + keys.length + " keys: " + keys);
      /* response will contain an array of objects
         inside the array of objects we will obtain the 
         url to display.
      */
      document.getElementById("user-name").innerText = response.username;
      document.getElementById("honor").innerText = response.honor;
      document.getElementById("clan").innerText = response.clan;
      document.getElementById("leader-board").innerText =
        response.leaderboardPosition;
      populateLanguage(languages);
      /* Dont reset the select box.
         Want to keep the current selected value of the box
         since an even listener is being used to change the theme 
         colors.
      */
      //document.getElementById("exercise-form").reset();
      document.getElementById(gifSearchId).value = "";
    })
    .catch(function (error) {
      console.log(`getGiph error=${error}`);
      if (error == "Error: Not Found") {
        let errorLine = document.getElementById("error-line");
        errorLine.innerText = `User Name "${searchKey}" Not Found`;
        errorLine.style.color = "red";
        document.getElementById(gifSearchId).value = "";
      }
    });
  console.log("---End controller()---");
}

async function getGiph(searchKey) {
  console.log("---Begin getGiph()---");
  console.log(`Parameters: searchKey=${searchKey}`);

  const baseURL = "https://www.codewars.com/api/v1/users";
  const fetchURL = `${baseURL}/${searchKey}`;

  const errorLineId = "error-line";
  const colorError = "red";

  console.log(`fetchURL=${fetchURL}`);

  let arrayObj;

  await fetch(fetchURL, { mode: "cors" })
    .then(function (response) {
      console.log("1st then fetch promise response - ");
      console.log(response);
      return response.json();
    })
    .then(function (response) {
      console.log("2nd then fetch promise response");
      console.log(response);
      console.log(JSON.stringify(response, null, 2));
      arrayObj = response;
      /* response.data will contain an array of objects
         inside the array of objects we will obtain the 
         url to display.
      */
    })
    .catch(function (error) {
      console.log(`Fetch error=${error}`);
      const errorLine = document.getElementById(errorLineId);
      errorLine.innerText =
        "An error occured when fetching the giph image - check console logs.";
      errorLine.style.color = colorError;
      arrayObj = null;
    });
  console.log("End getGiph()---");
  return arrayObj;
}

/* Helper function to populate the image tags
   with the correct url's returned from the api
*/
function populateLanguage(languages) {
  console.log("---Begin populateLanguages()---");
  console.log(`Parameters: response=${languages}`);
  console.log(`Parameters: response=`);
  console.log(languages);

  const errorLineId = "error-line";
  const returnedLineId = "returned-line";
  const errorColor = "red";
  const successColor = "green";
  const visibility = "visible";

  const errorLine = document.getElementById(errorLineId);
  errorLine.innerText = "";
  let keys = Object.keys(languages);
  let keys2 = "";
  for (let i = 0; i < keys.length; i++) {
    keys2 += `${keys[i]}, `;
  }
  document.getElementById("languages").innerText = keys2;
  console.log("---End populateImages()---");
}

// Form Validation called by onsubmit on form
function validateForm(searchKey) {
  console.log("---Begin validateForm()---");
  console.log(`Parameters: searchKey=${searchKey}`);
  console.log("---End validateForm()---");
  return true;
}
