// Variabel untuk menandai apakah tombol close sudah diklik
let closeButtonClicked = false;
// Variabel untuk menandai apakah popup "Tidak ada harga murah" sudah ditampilkan
let priceNotFoundAlertShown = false;
// Variabel untuk menyimpan ID interval
let intervalId;

// Fungsi untuk mencari item dan mengklik tombol "View Listings"
function searchAndClick() {
    const searchValue = prompt("Masukkan nama item yang ingin Anda cari:");
    if (!searchValue) return; // Jika input kosong atau dibatalkan, keluar dari fungsi

    // Mendapatkan semua item listings
    const items = document.querySelectorAll('.Marketplace_item__l__LM');

    // Melakukan iterasi pada setiap item
    items.forEach(item => {
        const itemName = item.querySelector('.Marketplace_itemName__Recoz').textContent;
        // Memeriksa apakah nama item cocok dengan input pencarian
        if (itemName.toLowerCase().includes(searchValue.toLowerCase())) {
            // Mengklik tombol "View Listings" pada item yang cocok
            const viewListingsButton = item.querySelector('.Marketplace_viewListings__q_KfD');
            if (viewListingsButton) {
                viewListingsButton.click();
            }
        }
    });
}

searchAndClick();

// Fungsi untuk melakukan klik pada tombol "Buy" dan mengubah kelas div utama
function clickAndChangeClass(targetPrice, duration) {
    // Mendapatkan semua item listings
    const listings = document.querySelectorAll('.MarketplaceItemListings_listings__UGfIe .MarketplaceItemListings_listing__TyllF');

    let foundCheapItem = false;

    // Melakukan iterasi pada setiap item
    listings.forEach(item => {
        // Memeriksa apakah item memiliki harga kurang dari atau sama dengan harga target
        const price = item.textContent.includes('@') ? parseInt(item.textContent.split('@')[1].trim().replace(',', '')) : 0;
        if (price <= targetPrice) {
            // Mengklik tombol "Buy" pada item yang memiliki harga kurang dari atau sama dengan harga target
            const buyButton = item.querySelector('.commons_pushbutton__7Tpa3.MarketplaceItemListings_buyListing__jYwuF');
            if (buyButton) {
                buyButton.click(); // Mengklik tombol "Buy"
            }
            // Mengubah kelas div utama
            item.classList.add('MarketplaceItemListings_current__NPRAo');
            foundCheapItem = true;
        }
    });

    // Jika tidak ada harga murah (<= targetPrice), tampilkan popup "Tidak ada harga murah."
    if (!foundCheapItem) {
        clearInterval(intervalId);
        if (!priceNotFoundAlertShown) {
            alert("Tidak ada harga murah.");
            priceNotFoundAlertShown = true;
        }

        // Mencari tombol close dan melakukan klik jika belum pernah diklik sebelumnya
        const closeButton = document.querySelector('.commons_closeBtn__UobaL');
        if (closeButton && !closeButtonClicked) {
            closeButton.click();
            closeButtonClicked = true; // tandai bahwa tombol sudah diklik
        }
    }
}

// Fungsi untuk meng-handle kesalahan saat input harga
function handlePriceError() {
    alert("Masukkan harga yang valid.");
}

// Menampilkan popup untuk memasukkan harga dan durasi
const targetPrice = prompt("Masukkan harga yang ingin Anda beli:", "");
if (targetPrice === null || isNaN(targetPrice)) {
    handlePriceError();
} else {
    const duration = prompt("Masukkan berapa lama (dalam detik) Anda ingin menjalankan kode:", "");
    if (duration === null || isNaN(duration)) {
        handlePriceError();
    } else {
        // Jalankan klik dan perubahan kelas setiap 1 detik
        intervalId = setInterval(() => {
            clickAndChangeClass(targetPrice, duration);

            // Berhenti jika waktu sudah habis
            duration--;
            if (duration <= 0) {
                clearInterval(intervalId);
                alert("Waktu telah habis.");
            }
        }, 1000);
    }
}
