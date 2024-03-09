// Assuming your form and results div have the same setup
document
  .getElementById("searchForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const searchQuery = document.getElementById("searchQuery").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    try {
      const response = await fetch("/.netlify/functions/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (!response.ok) {
        throw new Error("Search failed.");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        data.results.forEach((recipe) => {
          const element = document.createElement("div");
          element.classList.add("recipe");
          element.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                    <div class="recipe-info">
                        <h3 class="recipe-title">${recipe.title}</h3>
                        <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank" class="recipe-link">View Recipe</a>
                    </div>
                `;
          resultsDiv.appendChild(element);
        });
      } else {
        resultsDiv.innerHTML = "<p>No recipes found. Try another search.</p>";
      }
    } catch (error) {
      console.error("Error:", error);
      resultsDiv.innerHTML =
        "<p>Error fetching recipes. Please try again later.</p>";
    }
  });
