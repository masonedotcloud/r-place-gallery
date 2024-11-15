<?php

$allowedOrigin = "https://masone.cloud";

// Verifica se la richiesta proviene dal dominio consentito
if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
    header('Access-Control-Allow-Origin: ' . $allowedOrigin);
}
// Definisci una variabile globale per memorizzare l'elenco dei file
$folderFilesCache = null;

function getRandomImageNameFromFolder($folderPath)
{
    global $folderFilesCache;

    // Se la cache non è stata ancora popolata, popola la cache
    if ($folderFilesCache === null) {
        // Apre la directory
        if (!is_dir($folderPath)) {
            return null;
        }
        $dirHandle = opendir($folderPath);

        $imageFiles = array();

        // Legge i nomi dei file e li filtra per includere solo immagini (escludendo "." e "..")
        while (($file = readdir($dirHandle)) !== false) {
            if (in_array(pathinfo($file, PATHINFO_EXTENSION), ['jpg', 'jpeg', 'png', 'gif'])) {
                $imageFiles[] = $file;
            }
        }

        // Chiude la directory
        closedir($dirHandle);

        // Memorizza l'elenco dei file nella cache
        $folderFilesCache = $imageFiles;
    }

    // Se non ci sono immagini nella cartella, restituisci null
    if (empty($folderFilesCache)) {
        return null;
    }

    // Seleziona casualmente un file dall'array delle immagini
    $randomImageFile = $folderFilesCache[array_rand($folderFilesCache)];

    // Restituisci solo il nome dell'immagine selezionata
    return $randomImageFile;
}



if(isset($_GET['get'])) {
    // Specifica il percorso della cartella contenente le immagini
    $folderPath = 'images';

    // Ottieni un'immagine casuale dalla cartella
    $randomImageURL = getRandomImageNameFromFolder($folderPath);

    // Verifica se è stata trovata un'immagine casuale e mostra l'immagine
    if ($randomImageURL) {
        echo $randomImageURL;
    }
}

if(isset($_GET['view']) && !empty($_GET['view'])) {
    $file_path = 'images/' . $_GET['view'];

  // Verifica se il file esiste
  if (file_exists($file_path)) {
      $mime_type = mime_content_type($file_path);
      header('Content-type: ' . $mime_type);
      header('Content-disposition: inline; filename="' . basename($file_path) . '"');
      header('Content-length: ' . filesize($file_path));
      readfile($file_path);
  } else {
      // Se il file non esiste, invia l'intestazione HTTP 404 Not Found
      header("HTTP/1.0 404 Not Found");
      echo "File not found.";
  }
}
