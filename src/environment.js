const door = document.getElementById('door-image');
const person = document.getElementById('person');
const dialogueColumn = document.getElementById('dialogue-column');

door.addEventListener('click', function() {
    door.classList.toggle('open');
    person.style.display = door.classList.contains('open') ? 'block' : 'none'; // Show or hide the person image

    if (door.classList.contains('open')) {
        // Create a new dialogue element
        const newDialogue = document.createElement('div');
        newDialogue.classList.add('dialogue');
        const newDialogueText = guestDialogues[dialogueIndex];
        newDialogue.textContent = newDialogueText;

        // Add the new dialogue to the column
        dialogueColumn.appendChild(newDialogue);

        // Animate the dialogue bubble to slide up and fade in
        setTimeout(function() {
            newDialogue.style.top = '10%'; // Slide up
            newDialogue.style.opacity = 1; // Fade in
        }, 800); // Delay to ensure the animation works properly
    }
});

const respondButton = document.getElementById('respond-button');

const guestDialogues = [
    "Hey! Do you have any idea how much damage you've caused?",
    "blah blah blah",
    "bluh bluh bluh"
];

const userDialogues = [
  "Who are you? Damage? What are you talking about?",
  "ho ho ho",
  "do do do"
];

var dialogueIndex = 0;

respondButton.addEventListener('click', function() {
    if (respondButton.classList.contains('unactive')) {
        return;
    }
    const newDialogueText = userDialogues[dialogueIndex++];
    displayNextDialogue(newDialogueText);

    setTimeout(guestResponse, newDialogueText.length * 50 + 1000);
});

function guestResponse() {
    displayNextDialogue(guestDialogues[dialogueIndex], false)
}

function displayNextDialogue(dialogueText, isUser = true) {
    // Remove the last dialogue from the column
    const previousDialogue = dialogueColumn.firstElementChild;
    if (previousDialogue) {
        previousDialogue.style.opacity = 0;
        previousDialogue.style.top = '-90%'; // Slide out
        setTimeout(() => {
        previousDialogue.remove();
        }, 500); // Delay to ensure the animation completes before removal
    }

    // Create a new dialogue element
    const newDialogue = document.createElement('div');
    newDialogue.classList.add('dialogue');
    if (isUser) {
        newDialogue.classList.add('user-bubble');
        respondButton.classList.add("unactive");
    }
    else {
        respondButton.classList.remove('unactive');
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