const pokemon_search = document.querySelector(".pokemon_search");
const cards = document.querySelector(".cards");
document.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_search.value}`)
            .then((data) => {if (data.status == 200) return data.json(); else throw new Error("pokemon not found");})
            .then((data) => {
                const div = document.createElement("div");
                div.setAttribute("class", "card");

                const h1 = document.createElement("h1");
                h1.textContent = data.name;

                const img = document.createElement("img");
                img.width = 400;
                img.height = 400;
                img.src = data.sprites.front_default;

                div.appendChild(h1);
                div.appendChild(img);
                cards.appendChild(div);
                pokemon_search.style.borderColor = "black";
            })
            .catch((err) => {
                console.log("ERROR:", err);
                pokemon_search.style.borderColor = "red";
            })
            .finally(() => {
                pokemon_search.value = "";
            });
    }
});
