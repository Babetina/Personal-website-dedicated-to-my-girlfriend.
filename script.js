/**
 * Romantic Website Logic
 * Clean vanilla javascript implementation for interactivity.
 */

// ============================================================================
// 1. CONFIGURATION
// ============================================================================

// Set your anniversary/relationship start date here (Current format: YYYY-MM-DDTHH:MM:SS)
const originDate = new Date('2018-09-28T00:00:00'); 

// The message that will be "typed out" in the hero section
const loveMessage = "I just wanted to make something special for you to remind you how much you mean to me. Every day with you is a beautiful adventure. I love you more than words can say.";


// ============================================================================
// 2. BACKGROUND ANIMATION LOGIC (Floating Hearts)
// ============================================================================
function createFloatingHearts() {
    const container = document.getElementById('bg-animation');
    // Emojis that will float up
    const tokens = ['❤️', '💖', '✨', '💕', '🌸'];
    
    // Interval sets how frequently a new heart is spawned (800ms)
    setInterval(() => {
        const item = document.createElement('div');
        item.classList.add('floating-heart');
        
        // Randomize the start horizontal position across the full viewport width
        item.style.left = Math.random() * 100 + 'vw';
        
        // Randomize the animation duration so they rise at different speeds (10s to 22s)
        const animationDuration = 10 + Math.random() * 12;
        item.style.animationDuration = animationDuration + 's';
        
        // Randomize the size (15px to 35px)
        const size = 15 + Math.random() * 20; 
        item.style.fontSize = size + 'px';
        
        // Pick a random token symbol
        item.innerText = tokens[Math.floor(Math.random() * tokens.length)];
        
        // Add it to the DOM
        container.appendChild(item);

        // Crucial: Clean up older DOM elements after animation completes to avoid memory leaks
        setTimeout(() => {
            item.remove();
        }, animationDuration * 1000); // converting s to ms
        
    }, 800);
}


// ============================================================================
// 3. TYPEWRITER EFFECT
// ============================================================================
function typeWriter(text, i, fnCallback) {
    const textElement = document.getElementById('typewriter-text');
    
    // Inject the cursor dynamically if it hasn't been added yet
    if (!document.querySelector('.cursor')) {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        // Insert cursor immediately following the text container
        textElement.parentNode.insertBefore(cursor, textElement.nextSibling);
    }
    
    // Recursively handle the typing
    if (i < text.length) {
        textElement.innerHTML = text.substring(0, i + 1);
        
        // Randomize typing speed for a more human/natural feel (30ms to 90ms)
        const typingSpeed = 30 + Math.random() * 60;
        
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, typingSpeed);
    } else if (typeof fnCallback == 'function') {
        // Once completed, call the optional callback function
        setTimeout(fnCallback, 700);
    }
}


// ============================================================================
// 4. RELATIONSHIP TIME COUNTER
// ============================================================================
function updateTimeCounter() {
    const now = new Date();
    // Getting difference in milliseconds
    const diff = now - originDate;
    
    // Mathematical calculations to convert milliseconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    const counterElement = document.getElementById('time-counter');
    
    if (counterElement) {
        // Build out the dynamic HTML structure inside the counter container container
        counterElement.innerHTML = `
            <div class="time-box">
                <!-- Data displays -->
                <span class="value">${days}</span>
                <span class="label">Days</span>
            </div>
            <div class="time-box">
                <!-- Using padStart to ensure 0-padding (e.g., '09' instead of '9') -->
                <span class="value">${hours.toString().padStart(2, '0')}</span>
                <span class="label">Hours</span>
            </div>
            <div class="time-box">
                <span class="value">${minutes.toString().padStart(2, '0')}</span>
                <span class="label">Mins</span>
            </div>
            <div class="time-box">
                <span class="value">${seconds.toString().padStart(2, '0')}</span>
                <span class="label">Secs</span>
            </div>
        `;
    }
}


// ============================================================================
// 5. INITIALIZATION
// ============================================================================
// Wait for DOM to fully load before triggering scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Fire the animated floating background
    createFloatingHearts();
    
    // 2. Start typewriter effect after a small 1-second delay for dramatic effect
    setTimeout(() => {
        typeWriter(loveMessage, 0, function() {});
    }, 1000);
    
    // 3. Mount and continuously update the time counter
    updateTimeCounter();
    setInterval(updateTimeCounter, 1000); // 1000 milliseconds = 1 update per second
});
