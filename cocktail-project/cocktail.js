const input = document.querySelector('.input-bar');
const searchButton = document.getElementById('searchButton');
const result = document.getElementById('result');

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
      throw new Error('Network response was not ok');
    }

    const cocktailData = await response.json();
    console.log(cocktailData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}





searchButton.addEventListener('click', () => {
  /*const userinput = input.value;*/
  getCocktail(input.value);
  result.innerHTML = (cocktailData);

})

