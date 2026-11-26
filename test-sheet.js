
(async function () {
    const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYXbWm91TscNYnshYOgKCxhEiXrhd224ALy42NRoYY_blTVOzBwRrq2v-J8Z0Bt_xQyD5E706IOqXY/pub?gid=0&single=true&output=csv";

    const container = document.getElementById("sheet-test");

    if (!container) return;

    container.textContent = "Mengambil data Google Sheets...";

    try {
        const response = await fetch(SHEET_URL);

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        const data = await response.text();

        container.textContent = "Koneksi berhasil!\n\n" + data;

    } catch (error) {
        container.textContent = "Koneksi gagal: " + error.message;
        console.error(error);
    }
})();
