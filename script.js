const lines = [
    { text: "Hey", speed: 80 }, 
    { text: "Is my bububear feeling okay?", speed: 50 },
    { text: "is the world being harsh to you?", speed: 80 }, 
    { text: "Mylovelove, it's okay...", speed: 80 }, 
    { text: "I'm here.", speed: 80 },
    { text: "tap the screen once or twice", speed: 80 },
    { text: "Turn on ur volume", speed: 80},
    { text: "Just come to me whenever you dont feel well, okay?", speed: 80},
    { text: "You always have me Reirei, Iloveyou", speed: 120 }
];

let currentLine = 0;
const fadeOutSpeed = 1000; // Speed of fading out in milliseconds
const delayBetweenLines = 1000; // Delay between each line (in milliseconds)
const initialDelay = 2000; // Delay before the first line starts (in milliseconds)

// Array of audio elements to be played sequentially
const audioTracks = [
    document.getElementById('backgroundMusic1'),
    document.getElementById('backgroundMusic2'),
    document.getElementById('backgroundMusic3'),
    // Add more audio elements as needed
];

let audioAllowed = false; // Variable to check if audio is allowed to play
document.addEventListener('click', () => {
    audioAllowed = true; // User has interacted with the page, allow audio to play later
}, { once: true });

function typeLine(line, element) {
    element.innerHTML = ''; // Clear the previous text
    let index = 0;
    const typingSpeed = line.speed;

    const typeInterval = setInterval(() => {
        if (index < line.text.length) {
            element.innerHTML += line.text.charAt(index); // Add one character at a time
            index++;
        } else {
            clearInterval(typeInterval); // Stop typing when the line is done
            setTimeout(() => {
                fadeOut(element); // Start fade-out after typing completes
            }, delayBetweenLines); // Delay before fading out and moving to the next line
        }
    }, typingSpeed);
}

function fadeOut(element) {
    element.style.transition = `opacity ${fadeOutSpeed}ms ease`;
    element.style.opacity = 0; // Fade out

    setTimeout(() => {
        currentLine++; // Move to the next line
        if (currentLine < lines.length) {
            const nextLineElement = document.getElementById('line' + (currentLine + 1));
            nextLineElement.style.opacity = 1; // Ensure the next line is visible
            typeLine(lines[currentLine], nextLineElement); // Start typing the next line
        } else if (audioAllowed) {
            playAudioSequentially(); // Start playing audio tracks after all lines are done
        } else {
            console.log("Music permission was not granted.");
        }
    }, fadeOutSpeed); // Wait for the fade-out to complete before starting the next line
}

function playAudioSequentially() {
    if (audioTracks.length > 0) {
        const currentAudio = audioTracks.shift(); // Get the next audio track
        currentAudio.play(); // Play the current audio

        // When the current audio ends, play the next one
        currentAudio.addEventListener('ended', () => {
            playAudioSequentially(); // Recursively call to play the next audio
        });
    } else {
        console.log("All audio tracks have been played.");
    }
}

// Make the first line visible before typing
const firstLineElement = document.getElementById('line1');
firstLineElement.style.opacity = 1; // Set opacity to 1 before starting to type
setTimeout(() => {
typeLine(lines[currentLine], firstLineElement); // Start typing the first line
}, initialDelay);
