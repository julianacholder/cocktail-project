document.addEventListener('DOMContentLoaded', function () {
  const searchUrl = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
  const randomUrl = "https://thecocktaildb.com/api/json/v1/1/random.php";
  const result = document.getElementById("result");
  const errorImg = document.querySelector('.error-img');
  const cocktailNotFound = document.getElementById('cocktailNotFound');
  const cocktailBody = document.querySelector('.cocktail-body');
  const inputBar = document.querySelector('.input-bar');
  const searchButton = document.getElementById("searchButton");
  const moreButton = document.querySelector(".moreButton");

  const fetchCocktailData = (url, clearInput = false) => {
    const input = inputBar.value.trim();

    if (input === "" && !clearInput) {
      result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
      return;
    }

    if (clearInput) {
      inputBar.value = "";
    }

    fetch(url + input)
      .then(response => response.json())
      .then(data => {
        const myDrink = data.drinks ? data.drinks[0] : null;

        if (!myDrink) {
          throw new Error("Drink not found");
        }

        const count = 1;
        const ingredients = [];

        cocktailBody.style.display = "block";
        cocktailNotFound.style.display = "none";

        for (let i in myDrink) {
          if (i.startsWith("strIngredient") && myDrink[i]) {
            const ingredient = myDrink[i];
            const measure = myDrink[`strMeasure${ingredients.length + 1}`] || "";
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        result.innerHTML = `
          <img src="${myDrink.strDrinkThumb}" alt="${myDrink.strDrink}">
          <h2>${myDrink.strDrink}</h2>
          <h3>Ingredients:</h3>
          <ul class="ingredients"></ul>
          <h3>Instructions:</h3>
          <div>${myDrink.strInstructions.replace(/\./g, '.<br>')}</div>`;

        const ingredientsCon = document.querySelector(".ingredients");
        ingredients.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.innerText = item;
          ingredientsCon.appendChild(listItem);
        });
      })
      .catch(() => {
        errorImg.src = "images/404.png";
        cocktailNotFound.style.display = "block";
        cocktailBody.style.display = "none";
      });
  };

  window.addEventListener("load", () => fetchCocktailData(randomUrl, true));
  searchButton.addEventListener("click", () => fetchCocktailData(searchUrl));
  moreButton.addEventListener("click", () => fetchCocktailData(randomUrl, true));
});
