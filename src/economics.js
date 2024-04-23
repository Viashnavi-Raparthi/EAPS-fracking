const speeches = [
    "Speech 1",
    "Speech 2",
    // Add more speeches as needed
];

const speechColumn = document.getElementById('speech-column');

function displaySpeech(speechText, isUserSpeech = false) {
    const speechBubble = document.createElement('div');
    speechBubble.classList.add('speech-bubble');
    if (isUserSpeech) {
        speechBubble.classList.add('user-speech-bubble');
    }
    speechBubble.textContent = speechText;
    speechColumn.appendChild(speechBubble);
}

function handleImageClick(event) {
    const speechIndex = event.target.dataset.speechIndex;
    const speechText = speeches[speechIndex];
    // Clear previous speech bubbles
    speechColumn.innerHTML = '';
    // Display the speech
    displaySpeech(speechText, true);
    // Simulate response after some delay
    setTimeout(() => {
        displayColonelResponse();
    }, 1000);
}

function displayColonelResponse() {
    // Simulate Colonel's response
    const colonelResponse = "Colonel's response...";
    displaySpeech(colonelResponse);
}

// Add event listeners to clickable images
const clickableImages = document.querySelectorAll('.clickable-image');
clickableImages.forEach(image => {
    image.addEventListener('click', handleImageClick);
});

// Initial introduction by Colonel
const initialColonelSpeech = "Welcome! Click on an image to start the conversation.";
displaySpeech(initialColonelSpeech);
