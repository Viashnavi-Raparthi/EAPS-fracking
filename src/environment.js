const door = document.getElementById('door-image');
const person = document.getElementById('person');
const personImage = document.getElementById("person-image");
const dialogueColumn = document.getElementById('dialogue-column');

const TEXT_SPEED = 30;
const ANIMATION_SPEED = 500;

door.addEventListener('click', function() {
    if (!door.classList.contains('open')) {
        door.classList.toggle('open');
        toggleKnocks();

        // Create a new dialogue element
        setTimeout(guestResponse, 800);
    }
});

const respondButton = document.getElementById('respond-button');

const guestDialogues = [
    "Hey! Do you have any idea how much damage you've caused?",
    "water poisoning",
    "into water supply",
    "Why don't you see for yourself?",
    "I'm one of your geologists, blah blah weird observations",
    "earthquakes",
    "Let me show you.",
    "You've destroyed our rural roads",
    "your trucks blah blah"
];

const userDialogues = [
  "Who are you? Damage? What are you talking about?",
  "how is this my fault",
  "don't believe you",
  "get out",
  "Okay what do you mean?",
  "??",
  "bye",
  "bruh",
  "sad"
];

const interactiveSpots = {4: ["water", "/raw-assets/images{m}{tps}/scientist.png"], 7: ["earthquake", "/raw-assets/images{m}{tps}/farmer.png"], 9: ["roads", "/raw-assets/images{m}{tps}/farmer.png"]}

var dialogueIndex = 0;

respondButton.addEventListener('click', function() {
    if (respondButton.classList.contains('unactive')) {
        return;
    }
    const newDialogueText = userDialogues[dialogueIndex++];
    displayNextDialogue(newDialogueText);

    if (dialogueIndex in interactiveSpots) {
        // Onto next person, close the door
        setTimeout(kickoutGuest, newDialogueText.length * TEXT_SPEED + 1000);
    } else {
        setTimeout(guestResponse, newDialogueText.length * TEXT_SPEED + 1000);
    }
});

function guestResponse() {
    displayNextDialogue(guestDialogues[dialogueIndex], false)
}

function kickoutGuest() {
    door.classList.toggle('open');
    removePreviousDialogue();
    setTimeout(() => {
        personImage.src = interactiveSpots[dialogueIndex][1];
        toggleKnocks();
    }, ANIMATION_SPEED);
}

function removePreviousDialogue() {
    // Remove the last dialogue from the column
    const previousDialogue = dialogueColumn.firstElementChild;
    if (previousDialogue) {
        previousDialogue.style.opacity = 0;
        previousDialogue.style.top = '-90%'; // Slide out
        setTimeout(() => {
        previousDialogue.remove();
        }, ANIMATION_SPEED); // Delay to ensure the animation completes before removal
    }
}

function displayNextDialogue(dialogueText, isUser = true) {
    removePreviousDialogue();

    // Create a new dialogue element
    const newDialogue = document.createElement('div');
    newDialogue.classList.add('dialogue');
    if (isUser) {
        newDialogue.classList.add('user-bubble');
        respondButton.classList.add("unactive");
    }
    else {
        setTimeout(() => {
            respondButton.classList.remove('unactive');
        }, ANIMATION_SPEED);
    }
    newDialogue.textContent = dialogueText;

    // Add the new dialogue to the column
    dialogueColumn.appendChild(newDialogue);

    // Animate the new dialogue to slide up and fade in
    setTimeout(() => {
        newDialogue.style.top = '10%'; // Slide up
        newDialogue.style.opacity = 1; // Fade in
    }, 10); // Delay to ensure the animation works properly
}

function toggleKnocks() {
    var knocks = document.querySelectorAll('.knock');
    knocks.forEach(function(knock) {
        knock.classList.toggle('active');
    });
}