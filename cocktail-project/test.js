document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  const input = document.getElementById('input');
  const resultElement = document.getElementById('result');

  searchButton.addEventListener('click', async () => {
    const userInput = input.value;

    if (userInput.trim() !== '') {
      try {
        const cocktailData = await getCocktail(userInput);

        // Display the result on the page
        resultElement.innerHTML = `<p>Name: ${cocktailData.ingredients}</p>
                                   <p>Category: ${cocktailData.category}</p>
                                   <p>Instructions: ${cocktailData.instructions}</p>`;
      } catch (error) {
        // Handle the error, log it, or display a user-friendly message
        console.error('Error:', error.message);
      }
    }
  });
});

async function getCocktail(cocktailName) {
  const API_KEY = "XhuYb4gXJaOozJq4pK+Hqg==3uASeJmZpvwZs9Fi";
  const apiURL = `https://api.api-ninjas.com/v1/cocktail?name=${cocktailName}`;

  try {
    const response = await fetch(apiURL, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const cocktailData = await response.json();
    return cocktailData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for the calling code to handle
  }
}
