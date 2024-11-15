function getScreenWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function pixelsToLoadImage() {
    const screenWidth = getScreenWidth();
    return screenWidth <= 768 ? 300 : 500;
}

function copyToClipboard(text) {
    const tempInput = document.createElement("input");
    tempInput.style.cssText = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

document.addEventListener('DOMContentLoaded', () => {
    // Funzione per nascondere il div dopo 5 secondi (5000 millisecondi)
    function hideDiv() {
        const myDiv = document.getElementById('loading-div');
        myDiv.style.display = 'none';
    }

    setTimeout(hideDiv, 1000);
});
