document.addEventListener('DOMContentLoaded', () => {
  const url = "https://thecocktaildb.com/api/json/v1/1/";
  const result = document.getElementById("result");
  const errorImg = document.querySelector('.error-img');
  const cocktailNotFound = document.getElementById('cocktailNotFound');
  const cocktailBody = document.querySelector('.cocktail-body');
  const inputBar = document.querySelector('.input-bar');
  const searchButton = document.getElementById("searchButton");
  const moreButton = document.querySelector(".moreButton");

  const displayCocktail = (myDrink) => {
    let count = 1;
    let ingredients = [];

    cocktailBody.style.display = "block";
    cocktailNotFound.style.display = "none";

    for (let i in myDrink) {
      let ingredient = "";
      let measure = "";
      if (i.startsWith("strIngredient") && myDrink[i]) {
        ingredient = myDrink[i];
        if (myDrink[`strMeasure` + count]) {
          measure = myDrink[`strMeasure` + count];
        } else {
          measure = "";
        }
        count += 1;
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
  };

  const handleSearch = (endpoint) => {
    const input = inputBar.value;

    if (input === "") {
      result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
    } else {
      fetch(url + endpoint + input)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(data.drinks[0]);
          const myDrink = data.drinks[0];
          console.log(myDrink.strDrink);
          console.log(myDrink.strDrinkThumb);
          console.log(myDrink.strInstructions);
          displayCocktail(myDrink);
        })
        .catch(() => {
          errorImg.src = "images/404.png";
          cocktailNotFound.style.display = "block";
          cocktailBody.style.display = "none";
          cocktailNotFound.style.display = 'flex';
        });
    }
  };

  const randomImg = (endpoint) => {
    inputBar.value = "";

      fetch(url + endpoint)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(data.drinks[0]);
          const myDrink = data.drinks[0];
          console.log(myDrink.strDrink);
          console.log(myDrink.strDrinkThumb);
          console.log(myDrink.strInstructions);
          displayCocktail(myDrink);
        })
        .catch(() => {
          errorImg.src = "images/404.png";
          cocktailNotFound.style.display = "block";
          cocktailBody.style.display = "none";
          cocktailNotFound.style.display = 'flex';
        });
    }
  

  searchButton.addEventListener("click", () => {
    handleSearch("search.php?s=");
  });

  moreButton.addEventListener("click", () => {
    randomImg("random.php");
  });
});