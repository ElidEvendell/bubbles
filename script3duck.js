console.log('Скрипт утки загружен');

const pond3 = document.getElementById('pond3');
const duck = document.getElementById('duck');

let isDragging = false;
let lastBubbleTime1 = 0;
const BUBBLE_INTERVAL2 = 50;

function setDuckToCenter() {
    const pondRect = pond3.getBoundingClientRect();
    const duckWidth = duck.offsetWidth;
    const duckHeight = duck.offsetHeight;

    if (duckWidth === 0 || duckHeight === 0) return;

    const left = (pondRect.width - duckWidth) / 2;
    const top = (pondRect.height - duckHeight) / 2;

    duck.style.left = left + 'px';
    duck.style.top = top + 'px';
}

if (duck.complete) {
    setDuckToCenter();
} else {
    duck.addEventListener('load', setDuckToCenter);
}

duck.addEventListener('mousedown', function(event) {
    event.preventDefault();
    isDragging = true;

    const shiftX = event.clientX - duck.getBoundingClientRect().left;
    const shiftY = event.clientY - duck.getBoundingClientRect().top;

    function moveAt(clientX, clientY) {
        const pondRect = pond3.getBoundingClientRect();
        const duckRect = duck.getBoundingClientRect();

        let newLeft = clientX - shiftX - pondRect.left;
        let newTop = clientY - shiftY - pondRect.top;

        newLeft = Math.max(0, Math.min(newLeft, pondRect.width - duckRect.width));
        newTop = Math.max(0, Math.min(newTop, pondRect.height - duckRect.height));

        duck.style.left = newLeft + 'px';
        duck.style.top = newTop + 'px';
    }

    function onMouseMove(event) {
        if (!isDragging) return;
        moveAt(event.clientX, event.clientY);

        const now = Date.now();
        if (now - lastBubbleTime1 >= BUBBLE_INTERVAL) {
            lastBubbleTime1 = now;

            const duckRect = duck.getBoundingClientRect();
            const pondRect = pond3.getBoundingClientRect();

            const bubbleX = duckRect.left + duckRect.width / 2 - pondRect.left;
            const bubbleY = duckRect.top + duckRect.height / 2 - pondRect.top;

            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.left = (bubbleX - 5) + 'px';
            bubble.style.top = (bubbleY - 5) + 'px';

            pond3.appendChild(bubble);

            setTimeout(() => {
                bubble.classList.add('bubble--active3');
            }, 10);

            bubble.addEventListener('transitionend', () => bubble.remove(), { once: true });
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    moveAt(event.clientX, event.clientY);
});

duck.addEventListener('dragstart', (e) => e.preventDefault());
