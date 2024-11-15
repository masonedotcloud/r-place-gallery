const galleryContainer = document.getElementById('galleryContainer');

async function addNewImage() {
  try {
    const maxRetryCount = 5;
    let retryCount = 0;
    let imageURL;

    while (retryCount < maxRetryCount) {
      // Effettua la chiamata AJAX per ottenere l'URL dell'immagine casuale
      const response = await fetch('localhost/r-place-gallery/r-place-api/api.php?get');

      if (!response.ok) {
        // Se la chiamata non ha successo, incrementa il contatore dei tentativi e riprova
        retryCount++;
        continue;
      }

      // Se la chiamata ha successo, ottieni l'URL dell'immagine
      imageURL = await response.text();
      
      // Controlla se l'URL dell'immagine è valido
      const imageResponse = await fetch('localhost/r-place-gallery/r-place-api/api.php?view=' + imageURL);
      if (!imageResponse.ok) {
        // Se l'immagine non esiste, incrementa il contatore dei tentativi e riprova
        retryCount++;
        continue;
      }

      // Se l'immagine esiste, esci dal loop
      break;
    }

    if (retryCount === maxRetryCount) {
      console.error('Tutti i tentativi di fetch sono falliti.');
      return;
    }

    // Creazione e aggiunta dell'elemento section con classe container-img
    const containerImg = document.createElement('section');
    containerImg.classList.add('container-img');

    // Creazione e aggiunta dell'elemento div con classe img
    const img = document.createElement('div');
    img.classList.add('img');

    // Creazione e aggiunta dell'elemento div con classe frame
    const frame = document.createElement('div');
    frame.classList.add('frame');

    // Creazione dell'immagine con classe picture
    const picture = document.createElement('img'); 
    picture.classList.add('picture');

    // Aggiungi l'immagine di caricamento prima di avviare la chiamata AJAX
    picture.src = 'data/loading.gif'; // Sostituisci con il percorso corretto dell'immagine di caricamento
    picture.alt = '';
    picture.srcset = '';

    // Aggiorna l'attributo src dell'elemento picture con l'URL dell'immagine effettiva
    picture.onload = () => {
      picture.src = 'localhost/r-place-gallery/r-place-api/api.php?view=' + imageURL;
    };

    // Aggiunta dell'immagine all'elemento div con classe frame
    frame.appendChild(picture);

    // Aggiunta dell'elemento div con classe frame all'elemento div con classe img
    img.appendChild(frame);

    // Aggiunta dell'elemento div con classe img all'elemento section con classe container-img
    containerImg.appendChild(img);

    // Aggiunta dell'elemento section all'elemento con id galleryContainer
    galleryContainer.appendChild(containerImg);

  } catch (error) {
    console.error('Errore nella chiamata AJAX:', error);
  }
}


let totPixel = 0;

function update() {
  const currentScrollLeft = galleryContainer.scrollLeft;
  const pixelsMoved = Math.abs(currentScrollLeft - lastScrollLeft);

  if (currentScrollLeft > lastScrollLeft) {
    totPixel += pixelsMoved;
  } else if (currentScrollLeft < lastScrollLeft) {
    totPixel -= pixelsMoved;
  }

  if (totPixel >= pixelsToLoadImage()) {
    addNewImage();
    totPixel -= pixelsToLoadImage();
  }

  lastScrollLeft = currentScrollLeft;

}

// Funzione per decidere il numero di immagini da caricare in base alla larghezza dello schermo
function getNumberOfImagesToLoad() {
  const screenWidth = getScreenWidth();
  if (screenWidth <= 768) {
    return 15;
  } else {
    return 15;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Carica un numero specifico di immagini inizialmente
  for (let index = 0; index < getNumberOfImagesToLoad(); index++) {
    addNewImage();
  }
});
