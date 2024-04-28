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
        "firstWell": "Perfect. We should start making a profit from that well. When the money flows in, just hover over it to collect. You'll need at least $10 M to build another.",
        "secondWell": "By doing all of this, think about all of the smaller econimies we are stimulating. We're creating jobs for the people at these sites and creating more jobs because of the construction and waste management we need.",
        "thirdWell": "With all of these wells, we can help the US become more energy independent. This means that we can play a role in reducing the dependency on foreign oil imports. Also, all of the energy independence benefits will trickle down into the markets and industries in the US. This revenue from taxes and lease payments can be used as funding for school districts and other big projects. Look at the great work we're doing!"
    }
    const TEXT_SPEED = 30;

    var dialogueText = document.getElementById('dialogue');
    var textTimeoutId;

    // Array of coordinates for building buttons
    var buttonCoordinates = [
        { x: 50, y: 70 },
        { x: 20, y: 50 },
        { x: 75, y: 40 }
        // Add more coordinates as needed
    ];

    var ownedWells = [];
    var currentMoney = 10; // Initial money amount

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
            if (currentMoney < 10) {
                return;
            }

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

                currentMoney -= 10;
                moneyCounter.textContent = 'Money: $' + currentMoney + " M"; // Update money counter text

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
            currentMoney += 1; // Increase money by $100
            moneyCounter.textContent = 'Money: $' + currentMoney + " M";
        });
        buttonsContainer.appendChild(cash);
    }

    function checkSpeechConditions() {
        if (ownedWells.length == 1) {
            donovanSpeak("firstWell");
        }

        if (ownedWells.length == 2) {
            donovanSpeak("secondWell");
        }

        if (ownedWells.length == 3) {
            donovanSpeak("thirdWell");
            document.getElementById("continue-button").style.display = 'block';
        }
    }

    function donovanSpeak(speech) {
        speechText = donovanSpeech[speech];

        clearInterval(textTimeoutId);

        dialogueText.textContent = "";
        let index = 0;
        
        const revealText = () => {
            if (index < speechText.length) {
                dialogueText.textContent += speechText[index];
                index++;
            }
        };

        textTimeoutId = setInterval(revealText, TEXT_SPEED); // Adjust the delay between characters (in milliseconds)
    }

    donovanSpeak("intro");
});
