const CACHE_KEY = "calculation_history";
function checkForStorage() {
    // Fungsi tersebut akan kita gunakan di dalam if statement setiap fungsi transaksi pada localStorage.
    return typeof(Storage) !== "undefined"
}

// buat juga fungsi untuk menyimpan data riwayat kalkulasi pada localStorage.
function putHistory(data) {
    if(checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        }else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
            // JSON.parse = ngubah nilai objek ke bentuk string lagi pd objek JvS
            // JSON.stringify() = ngubah objek javascript ke bentuk string
            // soalnya local storage cuma bisa nyimpen data primitif kaya string
        }
        
        historyData.unshift(data);
        // unshift() = dipake buat nambahin nilai baru pd array yg ditaro diawal index, bisa juga ngembaliin nilai panjang array abis ditambah nilai baru

        if (historyData.length > 5) {
            historyData.pop();
            // pop() = buat ngapus nilai index terakhir pd array, jadi ukuran array history data ga bakal lebih dari 5
        }


        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));

    }
}

function showHistory() {
    if(checkForStorage()){
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory(){
    const historyData = showHistory();
    let historyList = document.querySelector('#historyList');

    // slalu hapus konten HTML pd elemen historyList biar gak nampilin data ganda
    historyList.innerHTML = "";

    for(let history of historyData){
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

renderHistory();