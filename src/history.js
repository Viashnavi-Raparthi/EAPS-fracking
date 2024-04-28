const START_DATE = 1860
const END_DATE = 2030

const colonelSpeeches = [
    "In the mid nineteenth century, a lot of us engineers and lot tried to figure out how we were going to get more gas",
    "Well, ain't nothing wrong with them quite yet but we just had so many and they weren't that efficient after some point, but we knew there was oil trapped down there",
    "You see, in 1862, one of my good friends' dad, Colonel Edward Roberts, was on the battlefield. And he said, hey, what if we just threw a torpedo down in this oil well",
    "Well first, all of them had said he was out of his mind. But then, the torpedo detonated and shattered the surrounding rocks",
    "Yup, look at you picking up on this!",
    "Well it took a lot of other technology but with horizontal drilling and this fracking idea, we were able to have great sources of domestic energy",
    "Good? Son, it was great! The US unlocked so many different reservoirs across the country. It even helped decrease the amount of CO2 in the air because we weren't going through as much coal"
];

const userSpeeches = [
    "Why, what happened to your regular methods?",
    "So what did you do?",
    "WHAT?! That's crazy, what happened??",
    "OHH, so is that when it was discovered that the flow of oil increased significantly at that well?",
    "What else happened?",
    "So just how good was natural gas production for the US at this time then?",
    "Huh, I never knew there was such a strong history behind this idea!"

];

document.addEventListener('DOMContentLoaded', function() {
    const timelineLine = document.querySelector('.timeline-line');
    const dateRange = END_DATE - START_DATE; // Total number of years in the date range

    function generateVerticalLines() {
        for (let year = START_DATE; year <= END_DATE; year += 10) {
            const line = document.createElement('div');
            if ((year - START_DATE) % 50 == 0) {
                line.classList.add('vertical-line', 'thick');
            } else {
                line.classList.add('vertical-line');
            }
            line.style.left = `${(year - START_DATE) / dateRange * timelineLine.clientWidth}px`;
            timelineLine.appendChild(line);
        }
    }

    generateVerticalLines(); // Initial generation

    const markers = document.querySelectorAll('.marker');
    const previewSection = document.querySelector('.preview-section');
    const eventHeader = document.querySelector('.event-header');
    const eventImage = document.querySelector('.event-image');
    const eventDescription = document.querySelector('.event-description');
    const continueButton = document.getElementById('continue-button');
    const timelineContainer = document.getElementById('timeline-container')
    const eventsClicked = [];

    function updateMarkerPositions() {
        markers.forEach(marker => {
            const year = parseInt(marker.dataset.year);
            const markerPosition = (year - START_DATE) / dateRange * timelineLine.clientWidth;
            marker.style.left = `${markerPosition}px`;
        });
    }

    function checkVistedEvents() {
        allVisited = true;
        eventsClicked.forEach(visited => {
            if (!visited) {
                allVisited = false;
            }
        });
        if (allVisited) {
            continueButton.style.display = "block";
            timelineContainer.classList.remove("active");
        }
    }

    updateMarkerPositions(); // Initial position update

    window.addEventListener('resize', function() {
        timelineLine.innerHTML = ''; // Clear existing lines
        generateVerticalLines(); // Regenerate lines
        updateMarkerPositions();
    });

    markers.forEach((marker, index) => {
        eventsClicked.push(false);
        marker.addEventListener('click', function() {
            const year = this.dataset.year;
            const eventName = this.querySelector('.event-name').textContent;
            const description = this.dataset.description;

            eventsClicked[index] = true;

            // Add animate-out class to slide out the existing event details
            previewSection.classList.add('animate-out');

            // After animation, update event information and slide in the new event details
            setTimeout(() => {
                eventHeader.textContent = eventName;
                eventImage.src = this.dataset.image;
                eventDescription.textContent = description;

                // Add animate-in class to slide in the new event details
                previewSection.classList.remove('animate-out');
                previewSection.classList.add('animate-in');

                // Remove animate-in class after animation completes
                setTimeout(() => {
                    previewSection.classList.remove('animate-in');
                    checkVistedEvents()
                }, 600); // Use the same duration as the CSS transition (0.5s)

            }, 600); // Use the same duration as the CSS transition (0.5s)
        });
    });
});
