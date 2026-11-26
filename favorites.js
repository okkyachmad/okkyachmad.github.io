
(async function () {

    const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYXbWm91TscNYnshYOgKCxhEiXrhd224ALy42NRoYY_blTVOzBwRrq2v-J8Z0Bt_xQyD5E706IOqXY/pub?gid=0&single=true&output=csv";

    const app = document.getElementById("favorites-app");

    if (!app) return;

    app.innerHTML = `
        <input type="search"
            id="fav-search"
            placeholder="Cari produk atau catatan...">

        <div id="fav-categories"></div>
        <p id="fav-count"></p>
        <div id="fav-list">Memuat produk...</div>
    `;

    let products = [];
    let selectedCategory = "";

    const search = app.querySelector("#fav-search");
    const categories = app.querySelector("#fav-categories");
    const list = app.querySelector("#fav-list");
    const count = app.querySelector("#fav-count");

    function render() {

        const keyword = search.value.toLowerCase();

        const filtered = products.filter(product => {

            const matchesSearch = [
                product["Produk"],
                product["Kategori"],
                product["Catatan"],
                product["Testimoni Saya"]
            ].join(" ").toLowerCase().includes(keyword);

            const matchesCategory =
                !selectedCategory ||
                product["Kategori"] === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        count.textContent = filtered.length + " produk";
        list.replaceChildren();

        if (!filtered.length) {
            list.textContent = "Produk tidak ditemukan.";
            return;
        }

        filtered.forEach(product => {

            const card = document.createElement("article");
            card.className = "fav-card";

            const category = document.createElement("small");
            category.className = "fav-category";
            category.textContent = product["Kategori"];

            const title = document.createElement("h3");
            title.textContent = product["Produk"];

            const notes = document.createElement("p");
            notes.textContent = product["Catatan"];

            const testimonial = document.createElement("p");
            testimonial.className = "fav-testimonial";
            testimonial.textContent = product["Testimoni Saya"];

            card.append(category, title);

            if (product["Catatan"]) {
                card.appendChild(notes);
            }

            if (product["Testimoni Saya"]) {
                card.appendChild(testimonial);
            }

            try {
                const url = new URL(product["Link"]);

                if (["https:", "http:"].includes(url.protocol)) {

                    const link = document.createElement("a");
                    link.href = url.href;
                    link.textContent = "Lihat produk ↗";
                    link.target = "_blank";
                    link.rel = "noopener noreferrer sponsored";

                    card.appendChild(link);
                }

            } catch {
                // Link kosong atau bukan URL valid.
            }

            list.appendChild(card);
        });
    }

    function createCategories() {

        const names = [...new Set(
            products.map(p => p["Kategori"])
        )].filter(Boolean).sort();

        ["", ...names].forEach(name => {

            const button = document.createElement("button");

            button.type = "button";
            button.textContent = name || "Semua";
            button.className = "fav-filter";
            button.setAttribute(
                "aria-pressed", String(name === selectedCategory)
            );

            button.addEventListener("click", () => {

                selectedCategory = name;

                categories.querySelectorAll("button")
                    .forEach(b => {
                        b.classList.remove("active");
                        b.setAttribute("aria-pressed", "false");
                    });

                button.classList.add("active");
                button.setAttribute("aria-pressed", "true");
                render();
            });

            if (!name) button.classList.add("active");

            categories.appendChild(button);
        });
    }

    search.addEventListener("input", render);

    try {

        const response = await fetch(SHEET_URL);

        if (!response.ok) {
            throw new Error("Gagal mengambil data.");
        }

        const csv = await response.text();

        const result = Papa.parse(csv, {
            header: true,
            skipEmptyLines: "greedy",
            transformHeader: h => h.trim(),
            transform: v => v.trim()
        });

        products = result.data.filter(p => p["Produk"]);

        createCategories();
        render();

    } catch (error) {

        list.textContent = "Gagal memuat daftar produk.";
        console.error(error);
    }

})();
