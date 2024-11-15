// Definiamo l'array con i 6 colori desiderati
const colori = [
    "#fec02a",
    "#f5042e",
    "#0BDA51",
    "#318CE7",
    "#9683EC",
    "#FF5800"
];

// Funzione per cambiare il colore
function cambiaColore() {
    const randomIndex = Math.floor(Math.random() * colori.length);
    let coloreScelto = colori[randomIndex];

    // Cambia il colore del testo e del body
    document.body.style.backgroundColor = coloreScelto;
    document.body.style.color = coloreScelto;

    // Salva la preferenza del colore nella localStorage
    localStorage.setItem("colorePreferito", coloreScelto);
}

$(document).ready(function () {
    // Aggiungi l'evento click al bottone
    const colorChangerBtn = document.getElementById("colorChanger");
    colorChangerBtn.addEventListener("click", cambiaColore);

    // Controlla se esiste una preferenza di colore salvata nella localStorage e applicala
    const colorePreferitoSalvato = localStorage.getItem("colorePreferito");
    document.body.style.backgroundColor = colorePreferitoSalvato ? colorePreferitoSalvato : colori[0];
    document.body.style.color = colorePreferitoSalvato ? colorePreferitoSalvato : colori[0];
});
