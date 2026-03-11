const pond2 = document.getElementById('pond2')

let lastBubbleTime = 0;

const BUBBLE_INTERVAL1 = 60;

pond2.addEventListener('mousemove', function() {
        const now = Date.now();
        if (now - lastBubbleTime < BUBBLE_INTERVAL1) return;
        lastBubbleTime = now;

        let rect = pond2.getBoundingClientRect();
        let bubble = document.createElement('div')
        bubble.className = 'bubble';
    
        let bubbleWidth = 10; // Как в CSS
        let bubbleHeight = 10; // Как в CSS

        let bubbleX = event.clientX - rect.x
        let bubbleY = event.clientY - rect.y

        bubble.style.left = bubbleX - ( bubbleWidth / 2 ) + 'px';
        bubble.style.top = bubbleY - ( bubbleHeight / 2 ) + 'px';
        bubble.style.background = 'initial';
        bubble.style.backgroundColor = 'white';

        pond2.appendChild(bubble)

        setTimeout(() => {
            bubble.classList.add('bubble--active2')
        }, 10)
    }
);

