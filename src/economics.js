document.addEventListener('DOMContentLoaded', function() {
    var mapContainer = document.getElementById('map-container');
    var buttonsContainer = document.getElementById('buttons-container');
    var buildingsContainer = document.getElementById('buildings-container');
    var usMap = document.getElementById('us-map');
    var moneyCounter = document.getElementById('money-counter'); // Get the money counter element

    var buildingTypes = ['oil-well', 'house1', 'house2', 'house3'];

    var dialogueContainer = document.getElementById('dialogue-container');
    const donovanSpeech = {
        "intro": "Alright, now that you know how the wells are built, let's start constructing new ones around the US.",
        "firstWell": "Perfect. We should start making a profit from that well. When the money flows in, just hover over it to collect."
    }

    // Array of coordinates for building buttons
    var buttonCoordinates = [
        { x: 50, y: 50 },
        { x: 20, y: 80 },
        { x: 75, y: 20 }
        // Add more coordinates as needed
    ];

    var ownedWells = [];
    var currentMoney = 1000; // Initial money amount

    // Set the dimensions of buttons and buildings containers based on the image size
    function updateContainerDimensions() {
        buttonsContainer.style.width = usMap.offsetWidth + 'px';
        buttonsContainer.style.height = usMap.offsetHeight + 'px';
        buildingsContainer.style.width = usMap.offsetWidth + 'px';
        buildingsContainer.style.height = usMap.offsetHeight + 'px';
    }

    // Call the function initially to set initial dimensions
    updateContainerDimensions();

    // Add event listener for window resize
    window.addEventListener('resize', updateContainerDimensions);

    // Create building buttons
    buttonCoordinates.forEach(function(coord) {
        var button = document.createElement('button');
        button.classList.add('build-button');
        button.textContent = 'Build a well';
        button.style.left = coord.x + '%';
        button.style.top = coord.y + '%';
        buttonsContainer.appendChild(button);

        // Add click event listener to each button
        button.addEventListener('click', function() {
            button.remove();

            var type = buildingTypes[0];

            // Create a new building element
            var building = document.createElement('img');
            building.classList.add('building');
            building.src = `/raw-assets/images{m}{tps}/${type}.png`;
            building.style.left = coord.x + '%';
            building.style.top = (coord.y - 10) + '%'; // Start above the button
            building.style.opacity = 0; // Start with 0 opacity
            buildingsContainer.appendChild(building);

            ownedWells.push(coord);

            checkSpeechConditions();

            // Animate the building
            setTimeout(function() {
                building.style.top = coord.y + '%'; // Move to final position
                building.style.opacity = 1; // Fade in

                currentMoney -= 100;
                moneyCounter.textContent = 'Money: $' + currentMoney; // Update money counter text

                // Spawn cash image every X seconds
                setInterval(function() {
                    spawnCash(coord);
                }, 5000);
            }, 50); // Delay to allow transition effect
        });
    });

    function spawnCash(coord) {
        var cash = document.createElement('img');
        cash.src = '/raw-assets/images{m}{tps}/cash.webp';
        cash.classList.add('cash');
        cash.style.left = coord.x + (Math.random() * 8) - 4 + '%';
        cash.style.top = coord.y + (Math.random() * 8) - 4 + '%';
        cash.addEventListener('mouseover', function() {
            // Animate cash when hovered over
            this.style.transition = 'top 0.5s, opacity 0.5s';
            this.style.top = coord.y - 10 + '%';
            this.style.opacity = 0;
            currentMoney += 100; // Increase money by $100
            moneyCounter.textContent = 'Money: $' + currentMoney;
        });
        buttonsContainer.appendChild(cash);
    }

    function checkSpeechConditions() {
        if (ownedWells.length == 1) {
            donovanSpeak("firstWell");
        }
    }

    function donovanSpeak(speech) {
        var dialogue = document.createElement('div');
        dialogue.classList.add('dialogue');
        dialogue.textContent = donovanSpeech[speech];
        dialogueContainer.appendChild(dialogue);

        // Remove the active class from existing dialogues
        var activeDialogues = document.querySelectorAll('.dialogue.active');
        activeDialogues.forEach(function(dialogue) {
            dialogue.classList.remove('active');
            setTimeout(function() {
                dialogue.remove(); // Remove the dialogue after transition
            }, 500); // Wait for transition to complete
        });

        // Add active class to the new dialogue to slide it in
        setTimeout(function() {
            dialogue.classList.add('active');
        }, 50); // Delay to ensure transition works properly
    }

    donovanSpeak("intro");
});
