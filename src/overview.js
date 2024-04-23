const colonelSpeeches = [
    "Hey, I'm Donovan Wells. Great to finally meet you... I've heard a lot about you from your grandfather.",
    "I'm a close friend of your late grandfather, George Mitchell. He left you quite the inheritence from his oil business. He wanted me to help you pick up the fracking business.",
    "Fracking. Like hydraulic fracking. He never mentioned this to you? Looks like I have my work cut out for me.",
    "It's a special technique for energy production, basically invented by your grandfather. It's used to extract oil and natural gas from underground by injecting pressurized fluid mixtures into rock. That creates fractures releasing the trapped oil and gas.",
    "Fracking has changed the energy landscape, globally promising energy security. It's reduced reliance on foreign oil and boosted the US economy. And it unlocks previously unusable reservoirs of oil and gas. Among other things.",
    "Sure, there's been some increasing debate against the process. People keep claiming it's damaging the environment and society. They want to add more regulations around fracking. But your grandfather didn't get rich by listening to those petty complaints.",
    "Placeholder text."
];

const userSpeeches = [
    "Sorry, I'm not sure I've heard of you, you know my grandfather?",
    "The oil business? Fracking?",
    "What's hydraulic fracking?",
    "What's so special about fracking?",
    "Sounds dangerous, is it safe?",
    "Ok let's get started."
];

// const speechTree = {

// }

const speechColumn = document.getElementById('speech-column');
const userInputBubble = document.getElementById('user-input');

let currentSpeechIndex = 0;

function displaySpeech(speechText, isColonelDonovan = true) {
    const speechBubble = document.createElement('div');
    speechBubble.classList.add('speech-bubble');

    if (!isColonelDonovan) {
        speechBubble.classList.add('user-speech-bubble');
    }
    const textContainer = document.createElement('span');
    speechBubble.appendChild(textContainer);

    // Add the speech bubble to the container
    speechColumn.appendChild(speechBubble);

    // Start revealing the text one character at a time
    let index = 0;
    const revealText = () => {
        if (index < speechText.length) {
            textContainer.textContent += speechText[index];
            index++;
            setTimeout(revealText, 50); // Adjust the delay between characters (in milliseconds)
        }
    };

    // Call revealText function to start revealing the text
    revealText();
}

function colonelResponse() {
    displaySpeech(colonelSpeeches[currentSpeechIndex]);
}

function displayUserQuestion() {
    // Here you can handle user input, for now, let's just display a predefined question
    const userQuestion = userSpeeches[currentSpeechIndex];
    displaySpeech(userQuestion, false);
    currentSpeechIndex++;

    // Trigger Colonel Donovan's response after the user's speech bubble is fully typed out
    setTimeout(colonelResponse, userQuestion.length * 50 + 1000); // Add a delay of 1 second after user's speech bubble is fully typed out
}

userInputBubble.addEventListener('click', displayUserQuestion);

// Initial introduction by Colonel Donovan
colonelResponse();
