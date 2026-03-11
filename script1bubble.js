const randomTo = (max) => Math.trunc(Math.random() * max);

let randomMode = false;

const randomModeBtn = document.getElementById('randomModeBtn');

randomModeBtn.addEventListener('click', function() {
    randomMode = !randomMode;
    
    if (randomMode) {
        randomModeBtn.textContent = 'Выключить рандомные цвета';
        randomModeBtn.classList.add('rainbow-text');
        randomModeBtn.classList.remove('blue-text');
    } else {
        randomModeBtn.textContent = 'Включить рандомные цвета';
        randomModeBtn.classList.add('blue-text');
        randomModeBtn.classList.remove('rainbow-text');
    }
});

pond.onclick = function(event) {
    let rect = pond.getBoundingClientRect();

    let bubble = document.createElement('div')
    bubble.className = 'bubble';
    
    let bubbleWidth = 10; // Как в CSS
    let bubbleHeight = 10; // Как в CSS

    let bubbleX = event.clientX - rect.x
    let bubbleY = event.clientY - rect.y

    bubble.style.left = bubbleX - ( bubbleWidth / 2 ) + 'px';
    bubble.style.top = bubbleY - ( bubbleHeight / 2 ) + 'px';

    if (randomMode) {

        let randomR = randomTo(255);
        let randomG = randomTo(255);
        let randomB = randomTo(255);

        bubble.style.backgroundColor = `rgba(${randomR}, ${randomG}, ${randomB}, 0.8)`;
    }

    pond.appendChild(bubble)

    setTimeout(() => {
        bubble.classList.add('bubble--active')
    }, 10)

    bubble.addEventListener('transitionend', function() {
        bubble.remove()
    })
}



