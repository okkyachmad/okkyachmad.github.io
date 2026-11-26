
(async function () {

    // =====================================
    // CONFIGURATION
    // =====================================

    const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYXbWm91TscNYnshYOgKCxhEiXrhd224ALy42NRoYY_blTVOzBwRrq2v-J8Z0Bt_xQyD5E706IOqXY/pub?gid=0&single=true&output=csv";

    const app = document.getElementById("favorites-app");

    if (!app) return;

    let products = [];
    let selectedCategory = "";


    // =====================================
    // MAIN STRUCTURE
    // =====================================

    app.innerHTML = `
        <input
            type="search"
            id="fav-search"
            aria-label="Cari produk"
            placeholder="Cari produk atau catatan..."
        >

        <div id="fav-categories"></div>

        <p id="fav-count" aria-live="polite"></p>

        <div id="fav-list">
            Memuat produk...
        </div>
    `;

    const search = app.querySelector("#fav-search");
    const categories = app.querySelector("#fav-categories");
    const list = app.querySelector("#fav-list");
    const count = app.querySelector("#fav-count");


    // =====================================
    // URL VALIDATION
    // =====================================

    function normalizeURL(value) {

        let url = String(value || "").trim();

        if (!url) return null;

        if (!/^[a-z][a-z0-9+.-]*:/i.test(url)) {

            if (!/^[\w-]+(\.[\w-]+)+([/:?#]|$)/.test(url)) {
                return null;
            }

            url = "https://" + url;
        }

        try {

            const parsed = new URL(url);

            if (
                ["http:", "https:"].includes(parsed.protocol) &&
                parsed.hostname.includes(".") &&
                !parsed.username &&
                !parsed.password
            ) {
                return parsed;
            }

        } catch {
            return null;
        }

        return null;
    }


    // =====================================
    // MARKETPLACE DETECTION
    // =====================================

    function marketplaceName(url) {

        const host = url.hostname.toLowerCase();

        const matches = domain =>
            host === domain || host.endsWith("." + domain);

        if (
            matches("shopee.co.id") ||
            matches("shope.ee")
        ) {
            return "Shopee";
        }

        if (
            matches("tokopedia.com") ||
            matches("tokopedia.link")
        ) {
            return "Tokopedia";
        }

        if (matches("lazada.co.id")) {
            return "Lazada";
        }

        if (matches("blibli.com")) {
            return "Blibli";
        }

        return "Lihat Produk";
    }


    // =====================================
    // CREATE CLICKABLE LINKS
    // =====================================

    function createLink(url, label, affiliate = false) {

        const link = document.createElement("a");

        link.href = url.href;
        link.textContent = label + " ↗";
        link.target = "_blank";

        link.rel = affiliate
            ? "noopener noreferrer sponsored"
            : "noopener noreferrer";

        return link;
    }


    // =====================================
    // RENDER PRODUCT CARDS
    // =====================================

    function render() {

        const keyword = search.value.trim().toLowerCase();

        const filtered = products.filter(product => {

            const searchableText = [
                product["Produk"],
                product["Kategori"],
                product["Catatan"],
                product["Label Testimoni"],
                product["Label Link Beli"]
            ].join(" ").toLowerCase();

            const matchesSearch =
                searchableText.includes(keyword);

            const matchesCategory =
                !selectedCategory ||
                product["Kategori"] === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        count.textContent = filtered.length + " produk";

        list.replaceChildren();

        if (!filtered.length) {

            const empty = document.createElement("p");

            empty.className = "fav-empty";
            empty.textContent = "Produk tidak ditemukan.";

            list.appendChild(empty);

            return;
        }

        filtered.forEach(product => {

            const card = document.createElement("article");

            card.className = "fav-card";


            // CATEGORY

            const category = document.createElement("small");

            category.className = "fav-category";

            category.textContent =
                product["Kategori"] || "Lainnya";

            category.dataset.category =
                (product["Kategori"] || "")
                .trim()
                .toLowerCase();


            // PRODUCT NAME

            const title = document.createElement("h3");

            title.textContent = product["Produk"];


            // PRODUCT NOTES

            const notes = document.createElement("p");

            notes.className = "fav-notes";

            notes.textContent = product["Catatan"] || "";


            // CARD CONTENT

            card.append(category, title);

            if (product["Catatan"]) {
                card.appendChild(notes);
            }


            // LINKS CONTAINER

            const links = document.createElement("div");

            links.className = "fav-links";


            // TESTIMONIAL LINK

            const testimonialURL = normalizeURL(
                product["Testimoni Saya"]
            );

            if (testimonialURL) {

                const testimonialLabel =
                    product["Label Testimoni"] ||
                    "Baca Testimoni";

                const testimonialLink = createLink(
                    testimonialURL,
                    testimonialLabel
                );

                testimonialLink.className =
                    "fav-review-link";

                links.appendChild(testimonialLink);
            }


            // AFFILIATE LINK

            const productURL = normalizeURL(
                product["Link"]
            );

            if (productURL) {

                const productLabel =
                    product["Label Link"] ||
                    marketplaceName(productURL);

                const affiliateLink = createLink(
                    productURL,
                    productLabel,
                    true
                );

                affiliateLink.className =
                    "fav-shop-link";

                links.appendChild(affiliateLink);
            }


            // ADD LINKS TO CARD

            if (links.children.length) {
                card.appendChild(links);
            }

            list.appendChild(card);

        });
    }


    // =====================================
    // AUTOMATIC CATEGORY FILTER
    // =====================================

    function createCategories() {

        categories.replaceChildren();

        const names = [...new Set(
            products.map(product => product["Kategori"])
        )].filter(Boolean).sort();

        ["", ...names].forEach(name => {

            const button = document.createElement("button");

            button.type = "button";
            button.textContent = name || "Semua";
            button.className = "fav-filter";

            button.setAttribute(
                "aria-pressed",
                String(name === selectedCategory)
            );

            if (name === selectedCategory) {
                button.classList.add("active");
            }

            button.addEventListener("click", () => {

                selectedCategory = name;

                categories.querySelectorAll("button")
                    .forEach(item => {

                        item.classList.remove("active");

                        item.setAttribute(
                            "aria-pressed",
                            "false"
                        );

                    });

                button.classList.add("active");

                button.setAttribute(
                    "aria-pressed",
                    "true"
                );

                render();
            });

            categories.appendChild(button);

        });
    }


    // =====================================
    // SEARCH
    // =====================================

    search.addEventListener("input", render);


    // =====================================
    // LOAD GOOGLE SHEETS
    // =====================================

    try {

        if (typeof Papa === "undefined") {
            throw new Error("Papa Parse belum dimuat.");
        }

        const response = await fetch(SHEET_URL, {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data.");
        }

        const csv = await response.text();

        const result = Papa.parse(csv, {

            header: true,

            skipEmptyLines: "greedy",

            transformHeader: header =>
                header.trim(),

            transform: value =>
                value.trim()

        });

        if (!result.meta.fields?.includes("Produk")) {
            throw new Error("Header spreadsheet tidak sesuai.");
        }

        products = result.data.filter(
            product => product["Produk"]
        );

        createCategories();

        render();

    } catch (error) {

        list.textContent =
            "Gagal memuat katalog. Silakan refresh halaman.";

        console.error("Favorites:", error);

    }

})();
