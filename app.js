document.getElementById('search-button').addEventListener('click', searchRecipes);

async function searchRecipes() {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=YOUR_API_KEY`);
    const data = await response.json();
    displayRecipes(data.results);
}

function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('recipe-results');
    resultsContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div>
                <h3>${recipe.title}</h3>
                <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
            </div>
        `;
        resultsContainer.appendChild(recipeCard);
    });
}

async function viewRecipe(id) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=YOUR_API_KEY`);
    const recipe = await response.json();
    displayRecipeDetails(recipe);
}

function displayRecipeDetails(recipe) {
    const detailsContainer = document.getElementById('recipe-details');
    detailsContainer.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredients</h3>
        <ul>
            ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <h3>Instructions</h3>
        <p>${recipe.instructions}</p>
        <button onclick="addToShoppingList(${recipe.id})">Add Ingredients to Shopping List</button>
    `;
}

function addToShoppingList(id) {
    const listContainer = document.getElementById('shopping-list-items');
    const ingredients = document.querySelectorAll('#recipe-details ul li');
    ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.className = 'shopping-list-item';
        listItem.innerHTML = `
            <span>${ingredient.innerText}</span>
            <button onclick="markAsBought(this)">Bought</button>
        `;
        listContainer.appendChild(listItem);
    });
}

function markAsBought(button) {
    button.parentElement.classList.toggle('bought');
}
