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
    const previewSection = document.querySelector('.preview-section');
    const eventHeader = document.querySelector('.event-header');
    const eventImage = document.querySelector('.event-image');
    const eventDescription = document.querySelector('.event-description');

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
            const eventName = this.querySelector('.event-name').textContent;
            const description = this.dataset.description;

            // Add animate-out class to slide out the existing event details
            previewSection.classList.add('animate-out');

            // After animation, update event information and slide in the new event details
            setTimeout(() => {
                eventHeader.textContent = eventName;
                eventImage.src = `/raw-assets/images{m}{tps}/event_${year}.jpg`;
                eventDescription.textContent = description;

                // Add animate-in class to slide in the new event details
                previewSection.classList.remove('animate-out');
                previewSection.classList.add('animate-in');

                // Remove animate-in class after animation completes
                setTimeout(() => {
                    previewSection.classList.remove('animate-in');
                }, 300); // Use the same duration as the CSS transition (0.3s)

            }, 300); // Use the same duration as the CSS transition (0.3s)

        });
    });
});
