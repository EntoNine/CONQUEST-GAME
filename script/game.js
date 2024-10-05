const input = document.getElementById('fileInput');

let playerRace;
let playerClasse;

let playerName;

let playerStrength; 
let playerDexterity; 
let playerConstitution; 
let playerIntelligence; 
let playerWisdom; 
let playerCharisma;

let playerCurrentQuest;

let playerTotalPoints;
let playerSkillPoints;


function loadToGame() {
    const cinematics = document.getElementsByClassName("cinematic");
    const cinematic = cinematics[0];
    cinematic.style.display = "none";

    const gameplays = document.getElementsByClassName("gameplay");
    const gameplay = gameplays[0];
    gameplay.style.display = "block";

    var mainDiv = document.querySelector('.main-ui');
    if (mainDiv) {
        mainDiv.style.display = 'block';
    }
}


const landscapeMedia = [
    {
        image: 'cinematic/img/0.jpg',
        audio: 'cinematic/sound/0.mp3'
    },
    {
        image: 'cinematic/img/1.png',
        audio: 'cinematic/sound/1.mp3'
    },
    {
        image: 'cinematic/img/2.png',
        audio: 'cinematic/sound/2.mp3'
    },
    {
        image: 'cinematic/img/3.png',
        audio: 'cinematic/sound/3.mp3'
    },
    {
        image: 'cinematic/img/4.png',
        audio: 'cinematic/sound/4.mp3'
    },
    {
        image: 'cinematic/img/5.png',
        audio: 'cinematic/sound/5.mp3'
    }
];


let landscapeCurrentIndex = 1;

const landscapeCurrentImage = document.getElementById('current-imagete');
const landscapeCurrentAudio = document.getElementById('current-audio');
const nextButton = document.getElementById('next-button');

function updateMedia(index) {
    landscapeCurrentImage.src = landscapeMedia[index].image;
    landscapeCurrentAudio.src = landscapeMedia[index].audio;
    landscapeCurrentAudio.play();
}

function endOfList() {
    landscapeCurrentAudio.pause();
    landscapeCurrentAudio.currentTime = 0;
    console.log("La liste est terminée. Vous pouvez ajouter une autre action ici.");
    // Ajoutez ici votre fonction ou votre action à exécuter lorsque la liste est terminée.
    loadToGame();
}

nextButton.addEventListener('click', () => {
    landscapeCurrentAudio.pause();
    landscapeCurrentAudio.currentTime = 0; // Reset audio to the beginning
    landscapeCurrentIndex++;
    if (landscapeCurrentIndex >= landscapeMedia.length) {
        endOfList();
        landscapeCurrentIndex = 0; // Optionnel: Réinitialiser l'index pour recommencer la liste
    }
    updateMedia(landscapeCurrentIndex);
});

// Initial setup
//updateMedia(landscapeCurrentIndex);

input.addEventListener('change', function(event) {
    let file = event.target.files[0];
    
    // Vérification que le fichier est bien de type .cqst
    if (!file.name.endsWith('.cqst')) {
        console.error('Le fichier sélectionné n\'est pas de type .cqst.');
        return;
    }
    
    let reader = new FileReader();

    reader.onload = function(event) {
        try {
            let characterData = JSON.parse(event.target.result);
            
            // Assignation des valeurs aux variables existantes
            playerRace = characterData.race;
            playerClasse = characterData.class;
            playerName = characterData.name;
            playerStrength = characterData.strength;
            playerDexterity = characterData.dexterity;
            playerConstitution = characterData.constitution;
            playerIntelligence = characterData.intelligence;
            playerWisdom = characterData.wisdom;
            playerCharisma = characterData.charisma;
            playerCurrentQuest = characterData.currentQuest;
            playerTotalPoints = characterData.totalPoints;
            skillPoints = characterData.skillPoints;

            console.clear();

            // Utilisation des variables si nécessaire
            console.log('Race:', playerRace);
            console.log('Classe:', playerClasse);
            console.log('Nom du joueur:', playerName);
            console.log('Force:', playerStrength);
            console.log('Dextérité:', playerDexterity);
            console.log('Constitution:', playerConstitution);
            console.log('Intelligence:', playerIntelligence);
            console.log('Sagesse:', playerWisdom);
            console.log('Charisme:', playerCharisma);
            console.log('Quête actuelle:', playerCurrentQuest);
            console.log('Points totaux:', playerTotalPoints);
            console.log('Points de Skill totaux:', skillPoints);

            // Vous pouvez utiliser ces variables comme bon vous semble ici
            
            var button = document.getElementById('startAfter');
            button.style.display = 'block';


        } catch (e) {
            console.error('Erreur de parsing JSON :', e);
        }
    };
    
    reader.readAsText(file);
});

function cinematicYesOrNot() {
    if (playerCurrentQuest == 0) {
        var loadDiv = document.querySelector('.load');
        if (loadDiv) {
            loadDiv.style.display = 'none';
        }

        // Sélectionner l'élément avec la classe 'cinematic'
        var cinematicDiv = document.querySelector('.cinematic');
        if (cinematicDiv) {
            cinematicDiv.style.display = 'block';
        }
        updateMedia(landscapeCurrentIndex);
    } else {
        var loadDiv = document.querySelector('.load');
        if (loadDiv) {
            loadDiv.style.display = 'none';
        }
        var gameplayDiv = document.querySelector('.gameplay');
        if (gameplayDiv) {
            gameplayDiv.style.display = 'block';
        }
        
        var mainDiv = document.querySelector('.main-ui');
        if (mainDiv) {
            mainDiv.style.display = 'block';
        }
        }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#startAfter').addEventListener('click', function(event) {
        cinematicYesOrNot();
        
    });
});

const container = document.querySelector('.container');
const image = document.querySelector('.movable-image');
const buttons = document.querySelectorAll('.map-button');

let isDragging = false;
let startX, startY;
let initialLeft, initialTop;

container.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return; // Ignore les clics sur les boutons
    e.preventDefault(); // Empêche le comportement par défaut du navigateur
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = parseInt(image.style.left, 10) || 0;
    initialTop = parseInt(image.style.top, 10) || 0;
    image.style.cursor = 'grabbing';
});

container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Empêche le comportement par défaut du navigateur
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    
    let newLeft = initialLeft + dx;
    let newTop = initialTop + dy;
    
    // Limites pour empêcher l'image de dépasser les bords du conteneur
    newLeft = Math.max(Math.min(newLeft, 0), container.clientWidth - image.width);
    newTop = Math.max(Math.min(newTop, 0), container.clientHeight - image.height);

    image.style.left = `${newLeft}px`;
    image.style.top = `${newTop}px`;
    
    // Déplace également les boutons avec l'image
    buttons.forEach(button => {
        button.style.left = `${newLeft + parseInt(button.dataset.initialLeft, 10)}px`;
        button.style.top = `${newTop + parseInt(button.dataset.initialTop, 10)}px`;
    });
});

container.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Empêche le comportement par défaut du navigateur
    isDragging = false;
    image.style.cursor = 'grab';
});

container.addEventListener('mouseleave', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Empêche le comportement par défaut du navigateur
    isDragging = false;
    image.style.cursor = 'grab';
});

// Initialisation des positions des boutons
buttons.forEach(button => {
    button.dataset.initialLeft = button.style.left;
    button.dataset.initialTop = button.style.top;
});

function closeMap() {
    var mapDiv = document.querySelector('.main-map');
    if (mapDiv) {
            mapDiv.style.display = 'none';
    }
    var gameplayDiv = document.querySelector('.main-ui');
    if (gameplayDiv) {
        gameplayDiv.style.display = 'block';
    }
}

function openMap() {
    var mapDiv = document.querySelector('.main-map');
    if (mapDiv) {
            mapDiv.style.display = 'block';
    }
    var gameplayDiv = document.querySelector('.main-ui');
    if (gameplayDiv) {
        gameplayDiv.style.display = 'none';
    }
}

function questClose() {
    var questDiv = document.querySelector('.quest-menu');
    if (questDiv) {
            questDiv.style.display = 'none';
    }
    var gameplayDiv = document.querySelector('.main-ui');
    if (gameplayDiv) {
        gameplayDiv.style.display = 'block';
    }
}


function openQuest() {
    var questDiv = document.querySelector('.quest-menu');
    if (questDiv) {
            questDiv.style.display = 'block';
    }
    var gameplayDiv = document.querySelector('.main-ui');
    if (gameplayDiv) {
        gameplayDiv.style.display = 'none';
    }
}

