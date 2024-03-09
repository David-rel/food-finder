document
  .getElementById("searchForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const searchQuery = document.getElementById("searchQuery").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    try {
      const response = await fetch("/search-recipes", {
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
      console.log(data);

      if (data.results && data.results.length > 0) {
        data.results.forEach((recipe) => {
          const element = document.createElement("div");
          element.classList.add("recipe");
          element.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                    <div class="recipe-info">
                        <h3 class="recipe-title">${recipe.title}</h3>
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
