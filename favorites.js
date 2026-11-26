
(async function () {

    // =====================================
    // FAVORITES V7 - SVG ICONS
    // =====================================

    const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYXbWm91TscNYnshYOgKCxhEiXrhd224ALy42NRoYY_blTVOzBwRrq2v-J8Z0Bt_xQyD5E706IOqXY/pub?gid=0&single=true&output=csv";

    const app = document.getElementById("favorites-app");

    if (!app) return;

    let products = [];
    let selectedCategory = "";


    // =====================================
    // SVG ICON COLLECTION
    // =====================================

    const ICONS = {

        "smartphone": `
            <rect x="6" y="2" width="12" height="20" rx="2"/>
            <path d="M11 18h2"/>
        `,

        "laptop": `
            <rect x="4" y="3" width="16" height="13" rx="2"/>
            <path d="M4 16l-2 4h20l-2-4"/>
        `,

        "monitor": `
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M12 17v4M8 21h8"/>
        `,

        "tablet": `
            <rect x="4" y="2" width="16" height="20" rx="2"/>
            <path d="M11 18h2"/>
        `,

        "gamepad": `
            <rect x="2" y="6" width="20" height="12" rx="5"/>
            <path d="M6 12h4M8 10v4"/>
            <circle cx="16" cy="10" r="0.8"/>
            <circle cx="18" cy="14" r="0.8"/>
        `,

        "gamepad-2": `
            <path d="M7 6h10c3 0 4 3 5 8s-2 7-5 4l-2-2H9l-2 2c-3 3-6 1-5-4s2-8 5-8Z"/>
            <path d="M6 11h4M8 9v4"/>
            <circle cx="16" cy="10" r="0.8"/>
            <circle cx="18" cy="13" r="0.8"/>
        `,

        "headphones": `
            <path d="M3 14v-2a9 9 0 0 1 18 0v2"/>
            <rect x="3" y="12" width="5" height="9" rx="2"/>
            <rect x="16" y="12" width="5" height="9" rx="2"/>
        `,

        "speaker": `
            <rect x="5" y="2" width="14" height="20" rx="2"/>
            <circle cx="12" cy="15" r="4"/>
            <circle cx="12" cy="6" r="1"/>
        `,

        "camera": `
            <path d="M3 6h4l2-3h6l2 3h4v14H3Z"/>
            <circle cx="12" cy="13" r="4"/>
        `,

        "keyboard": `
            <rect x="2" y="5" width="20" height="14" rx="2"/>
            <path d="M6 9h1m3 0h1m3 0h1m3 0h1M6 12h1m3 0h1m3 0h1m3 0h1M7 16h10"/>
        `,

        "mouse": `
            <rect x="6" y="2" width="12" height="20" rx="6"/>
            <path d="M12 2v7"/>
        `,

        "watch": `
            <rect x="6" y="6" width="12" height="12" rx="3"/>
            <path d="M9 6V2h6v4M9 18v4h6v-4M12 9v3l2 1"/>
        `,

        "battery-charging": `
            <rect x="2" y="6" width="18" height="12" rx="2"/>
            <path d="M22 10v4M11 8l-3 5h5l-2 3"/>
        `,

        "cable": `
            <path d="M5 2v4m4-4v4M4 6h6v3a3 3 0 0 1-6 0ZM7 12v4a4 4 0 0 0 8 0v-2M12 10h6v4h-6ZM14 6v4m2-4v4"/>
        `,

        "coffee": `
            <path d="M3 8h14v7a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5ZM17 9h2a3 3 0 0 1 0 6h-2M7 2v3m4-3v3"/>
        `,

        "utensils": `
            <path d="M4 2v7a3 3 0 0 0 6 0V2M7 2v20M18 2c-3 3-4 6-4 10h4m0-10v20"/>
        `,

        "cookie": `
            <path d="M21 13a9 9 0 1 1-10-10c0 5 5 10 10 10Z"/>
            <circle cx="8" cy="10" r="0.8"/>
            <circle cx="10" cy="16" r="0.8"/>
            <circle cx="15" cy="14" r="0.8"/>
        `,

        "pizza": `
            <path d="M12 22 2 5a20 20 0 0 1 20 0ZM5 10a15 15 0 0 1 14 0"/>
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="17" r="0.8"/>
        `,

        "droplets": `
            <path d="M9 3C6 7 3 10 3 14a6 6 0 0 0 12 0c0-4-3-7-6-11Z"/>
            <path d="M17 3c2 3 4 5 4 8a4 4 0 0 1-4 4"/>
        `,

        "wrench": `
            <path d="M14 3a6 6 0 0 0-7 8L2 17a3 3 0 0 0 5 4l6-6a6 6 0 0 0 8-7l-4 4-5-5Z"/>
        `,

        "backpack": `
            <rect x="5" y="5" width="14" height="17" rx="4"/>
            <path d="M9 5V3h6v2M5 13h14M9 17h6"/>
        `,

        "book-open": `
            <path d="M12 5C9 3 5 3 2 4v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-3-1-7-1-10 1Zm0 0v15"/>
        `,

        "shirt": `
            <path d="M8 3 2 7l3 6 3-2v10h8V11l3 2 3-6-6-4c0 4-8 4-8 0Z"/>
        `,

        "package": `
            <path d="m12 2 10 5v10l-10 5-10-5V7Zm0 10v10M2 7l10 5 10-5M7 4l10 5"/>
        `,

        "cpu": `
            <rect x="5" y="5" width="14" height="14" rx="2"/>
            <rect x="9" y="9" width="6" height="6"/>
            <path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3"/>
        `,

        "house": `
            <path d="m2 11 10-9 10 9M5 9v13h14V9M10 22v-8h4v8"/>
        `,

        "shopping-bag": `
            <path d="M4 7h16l1 15H3ZM8 9V5a4 4 0 0 1 8 0v4"/>
        `,

        "film": `
            <rect x="2" y="3" width="20" height="18" rx="2"/>
            <path d="M7 3v18M17 3v18M2 9h5m-5 6h5m10-6h5m-5 6h5M7 12h10"/>
        `,

        "heart": `
            <path d="M12 21 3 12a5.5 5.5 0 0 1 9-6 5.5 5.5 0 0 1 9 6Z"/>
        `

    };


    // =====================================
    // DEFAULT CATEGORY ICONS
    // =====================================

    const CATEGORY_ICONS = {
        tech: "cpu",
        food: "utensils",
        gaming: "gamepad-2",
        lifestyle: "shopping-bag",
        books: "book-open",
        audio: "headphones",
        home: "house",
        tools: "wrench",
        film: "film",
        fashion: "shirt"
    };


    // =====================================
    // CREATE SVG ICON
    // =====================================

    function createIcon(product) {

        const requested = String(
            product["Icon"] || ""
        ).trim().toLowerCase();

        const category = String(
            product["Kategori"] || ""
        ).trim().toLowerCase();

        const fallback =
            CATEGORY_ICONS[category] || "package";

        const name = Object.hasOwn(ICONS, requested)
            ? requested
            : fallback;

        const wrapper = document.createElement("div");

        wrapper.className = "fav-icon";
        wrapper.setAttribute("aria-hidden", "true");

        wrapper.innerHTML = `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                ${Object.hasOwn(ICONS, name)
                    ? ICONS[name]
                    : ICONS.package}
            </svg>
        `;

        return wrapper;
    }


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
            host === domain ||
            host.endsWith("." + domain);

        if (
            matches("shopee.co.id") ||
            matches("shope.ee")
        ) return "Shopee";

        if (
            matches("tokopedia.com") ||
            matches("tokopedia.link")
        ) return "Tokopedia";

        if (
            matches("lazada.co.id") ||
            matches("lazada.com")
        ) return "Lazada";

        if (matches("blibli.com")) {
            return "Blibli";
        }

        return "Lihat Produk";
    }


    // =====================================
    // CREATE LINKS
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
    // RENDER PRODUCTS
    // =====================================

    function render() {

        const keyword =
            search.value.trim().toLowerCase();

        const filtered = products.filter(product => {

            const searchableText = [
                product["Produk"],
                product["Kategori"],
                product["Catatan"],
                product["Label Testimoni"],
                product["Label Link"]
            ].join(" ").toLowerCase();

            return searchableText.includes(keyword) &&
                (
                    !selectedCategory ||
                    product["Kategori"] === selectedCategory
                );
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


            // PRODUCT HEADER

            const header = document.createElement("div");
            header.className = "fav-header";

            const icon = createIcon(product);

            const heading = document.createElement("div");
            heading.className = "fav-heading";

            const category = document.createElement("small");
            category.className = "fav-category";

            category.textContent =
                product["Kategori"] || "Lainnya";

            const title = document.createElement("h3");
            title.textContent = product["Produk"];

            heading.append(category, title);
            header.append(icon, heading);
            card.appendChild(header);


            // PRODUCT DESCRIPTION

            if (product["Catatan"]) {

                const notes = document.createElement("p");

                notes.className = "fav-notes";
                notes.textContent = product["Catatan"];

                card.appendChild(notes);
            }


            // PRODUCT LINKS

            const links = document.createElement("div");
            links.className = "fav-links";


            // TESTIMONIAL

            const testimonialURL = normalizeURL(
                product["Testimoni Saya"]
            );

            if (testimonialURL) {

                const testimonialLink = createLink(
                    testimonialURL,
                    product["Label Testimoni"] ||
                    "Baca Testimoni"
                );

                testimonialLink.className =
                    "fav-review-link";

                links.appendChild(testimonialLink);
            }


            // AFFILIATE

            const productURL = normalizeURL(
                product["Link"] || product["Link Beli"]
            );

            if (productURL) {

                const affiliateLink = createLink(
                    productURL,
                    product["Label Link"] ||
                    marketplaceName(productURL),
                    true
                );

                affiliateLink.className =
                    "fav-shop-link";

                links.appendChild(affiliateLink);
            }

            if (links.children.length) {
                card.appendChild(links);
            }

            list.appendChild(card);

        });
    }


    // =====================================
    // CATEGORY FILTER
    // =====================================

    function createCategories() {

        categories.replaceChildren();

        const names = [...new Set(
            products.map(p => p["Kategori"])
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
                            "aria-pressed", "false"
                        );
                    });

                button.classList.add("active");

                button.setAttribute(
                    "aria-pressed", "true"
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
