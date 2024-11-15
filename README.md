# r-place-gallery

Benvenuto in **r-place-gallery**, una galleria interattiva ispirata al progetto collaborativo "r/place". Questo progetto permette di navigare in un'ampia raccolta di immagini generate dagli utenti, offrendo funzionalità dinamiche come scrolling fluido, caricamento asincrono di immagini e personalizzazione del tema.

## **Funzionalità Principali**
- **Interfaccia fluida**: Scorrimento orizzontale con supporto per mouse, touch e scrolling automatico.
- **Caricamento dinamico delle immagini**: Le immagini vengono aggiunte automaticamente man mano che si scorre la galleria.
- **Cambio tema**: Personalizzazione dei colori dello sfondo con preferenze salvate in LocalStorage.
- **Copiatura del link**: Pulsante per copiare rapidamente il link del sito.
- **Gestione API flessibile**: Le immagini vengono recuperate da un'API esterna.


## **Installazione**

### **Requisiti**
- Un server web (es. Apache, Nginx) con supporto PHP per l'API.
- Browser moderno con supporto JavaScript.
- (Opzionale) Supporto HTTPS per un'API sicura.

### **Passaggi**
1. **Clona il repository**
   ```bash
   git clone https://github.com/masonedotcloud/r-place-gallery.git
   cd r-place-gallery
   ```

2. **Configura l'API**
   - Puoi scegliere di:
     - **Ospitare l'API su un dominio separato**. Modifica le chiamate API nel file JavaScript per puntare all'URL dell'API:
       ```javascript
       const apiBaseUrl = "https://api.esempio.com/r-place-api";
       ```
     - **Ospitare l'API localmente** nella sottocartella del progetto. Per farlo:
       - Copia i file dell'API nella sottocartella `r-place-api`.
       - Assicurati che il server abbia i permessi per eseguire gli script PHP.

3. **Carica i file sul server**
   - Carica l'intero progetto sul tuo server web nella directory desiderata.

4. **Configura i permessi**
   - Assicurati che la cartella `r-place-api` (se ospitata localmente) sia leggibile dal server.



## **Struttura del Progetto**
```
r-place-gallery/
│
├── css/                    # Fogli di stile CSS per il sito
├── data/                   # Risorse statiche come immagini di anteprima e GIF di caricamento
├── script/                 # Script JavaScript per le funzionalità interattive
├── r-place-api/            # (Opzionale) File dell'API, se ospitata localmente
├── index.html              # Pagina principale della galleria
├── stats.php               # Script PHP per la gestione delle statistiche
└── README.md               # Documentazione del progetto
```



## **API**
Le immagini sono recuperate tramite chiamate a un'API. Di seguito, una panoramica delle endpoint utilizzati:

- **`GET /api.php?get`**
  - Restituisce un URL casuale di un'immagine disponibile.

- **`GET /api.php?view=<imageURL>`**
  - Restituisce il contenuto dell'immagine specificata.



## **Caratteristiche Tecniche**
- **Frontend**:
  - Utilizza **HTML5**, **CSS3**, e **JavaScript** (ES6+).
  - Dipendenze:
    - [jQuery](https://jquery.com)
    - [jQuery TouchSwipe](https://github.com/mattbryson/TouchSwipe-Jquery-Plugin)
    - [Font Awesome](https://fontawesome.com)

- **Backend**:
  - Gestito tramite **PHP** per le chiamate API.

## Licenza

Questo progetto è distribuito sotto la Licenza MIT - vedi il file [LICENSE](LICENSE) per ulteriori dettagli.


## Autore

Questo progetto è stato creato da [alessandromasone](https://github.com/alessandromasone).