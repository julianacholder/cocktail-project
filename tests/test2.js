/* In this test file I tried using an api from api ninjas that generate cocktail recipes without images. I used a switch case to try to include images based on the 
user input but failed because there are only so many images that I could include within the switch case. This method proved to be ineffective.*/

const input = document.querySelector('.input-bar');
const searchButton = document.getElementById('searchButton');
const result = document.getElementById('result');
const inputBody = document.querySelector('.cocktail-body');
const cocktailImg = document.querySelector('.cocktail-img');
const cocktailNotFound = document.getElementById('cocktailNotFound'); // Assuming this is the element where you display not found messages



async function getCocktail(cocktailName) {
  const API_KEY = "XhuYb4gXJaOozJq4pK+Hqg==3uASeJmZpvwZs9Fi";
  const URL = `https://api.api-ninjas.com/v1/cocktail?name=${cocktailName}`;

  try {
    const response = await fetch(URL, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (response.ok) {
      const cocktailData = await response.json();

      /*console.log('Cocktail Data:', cocktailData); // Add this line to log the data to the console*/

      // Check if cocktailData.cocktail is defined and not an empty array
      if (cocktailData) {
        // Handle successful response
        cocktailNotFound.style.display = "none";
        inputBody.style.display = "block";
        const cocktailNames = cocktailData.map(cocktail => cocktail.name);
        const cocktailIng = cocktailData.map(cocktail => cocktail.ingredients);
        const cocktailInstru = cocktailData.map(cocktail => cocktail.instructions);

        const firstCocktail = cocktailData[0];

        // Display information about the cocktails
        result.innerHTML = `<p>Cocktails: ${cocktailNames.join(', ')}</p>
        <p>Ingredients: ${cocktailIng.join(', ')}</p>
        <p>Instruction: ${cocktailInstru}</p>`;
       

     
        switch (firstCocktail.name) {
          case 'margarita':
            cocktailImg.src = "images/margarita.jpg";
            break;
          case 'bloody mary':
            cocktailImg.src = "images/bloodymary.png";
            break;
          case 'manhattan':
            cocktailImg.src = "images/manhattan.png";
            break;
          case 'vodka':
            cocktailImg.src = "images/vodka.png";
            break;
          case 'martini':
            cocktailImg.src = "images/martini.png";
            break;
          default:
            // Handle other cocktail names or set a default image
            break;
        }
      } else {
        // Handle the case when cocktailData.cocktail is undefined or an empty array
        displayErrorMessage('Cocktail data not available');
      }
    } else if (response.status === 404) {
      // Handle '404' response by showing an error message
      displayErrorMessage('Cocktail not found');
    } else {
      // Handle other HTTP status codes (e.g., 403, 500) with a generic error message
      displayErrorMessage(`Error fetching cocktail data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    displayErrorMessage('An unexpected error occurred');
  }
}




function displayErrorMessage(message) {
  cocktailNotFound.style.display = "block";
  inputBody.style.display = "none";
  cocktailNotFound.textContent = message;
}

searchButton.addEventListener('click', () => {
  getCocktail(input.value);
});