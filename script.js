document.addEventListener("DOMContentLoaded", function () {
    const recipeForm = document.getElementById("recipe-form");
    const recipeContainer = document.getElementById("recipes");

    // Load saved recipes from local storage
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [
        {
            name: "Spaghetti Carbonara",
            image: "https://source.unsplash.com/250x250/?spaghetti",
            description: "A classic Italian pasta dish with eggs, cheese, and pancetta."
        },
        {
            name: "Chocolate Cake",
            image: "https://source.unsplash.com/250x250/?cake",
            description: "A rich and moist chocolate cake perfect for dessert lovers."
        }
    ];

    // Function to render recipes
    function renderRecipes() {
        recipeContainer.innerHTML = "";
        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;

            recipeContainer.appendChild(recipeCard);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                deleteRecipe(index);
            });
        });

        // Save updated recipes to local storage
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    // Function to add new recipe
    recipeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("recipe-name").value.trim();
        const image = document.getElementById("recipe-image").value.trim();
        const description = document.getElementById("recipe-description").value.trim();

        if (name && image && description) {
            recipes.push({ name, image, description });
            renderRecipes();
            recipeForm.reset();
        } else {
            alert("Please fill in all fields!");
        }
    });

    // Function to delete a recipe
    function deleteRecipe(index) {
        recipes.splice(index, 1);
        renderRecipes();
    }

    // Initial render
    renderRecipes();
});
