const START_DATE = 1850
const END_DATE = 2000

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

    function updateMarkerPositions() {
        markers.forEach(marker => {
            const year = parseInt(marker.dataset.year);
            const markerPosition = (year - START_DATE) / dateRange * timelineLine.clientWidth;
            marker.style.left = `${markerPosition}px`;
        });
    }

    updateMarkerPositions(); // Initial position update

    window.addEventListener('resize', function() {
        timelineLine.innerHTML = ''; // Clear existing lines
        generateVerticalLines(); // Regenerate lines
        updateMarkerPositions();
    });

    markers.forEach(marker => {
        marker.addEventListener('click', function() {
            const year = this.dataset.year;
            const description = this.dataset.description;
            const eventDetailsContainer = document.querySelector('.event-details-container');
            const eventDetails = eventDetailsContainer.querySelector('.event-details');
            const eventDetailsImg = eventDetails.querySelector('img');
            const eventDetailsDescription = eventDetails.querySelector('.description');

            eventDetailsImg.src = `event_${year}.jpg`; // Change the image source based on the year
            eventDetailsDescription.textContent = description;

            eventDetailsContainer.style.top = '20px'; // Show event details container
        });
    });

    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        const eventDetailsContainer = document.querySelector('.event-details-container');
        eventDetailsContainer.style.top = '-200px'; // Hide event details container
    });
});
