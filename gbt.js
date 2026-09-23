const screens = document.querySelectorAll('.screen');
const dateInput = document.getElementById('dateInput');
const unlockBtn = document.getElementById('unlockBtn');
const errorMessage = document.getElementById('errorMessage');
const music = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');

function showScreen(id) {
    const nextScreen = document.getElementById(id);

    if (!nextScreen) {
        console.error('Screen not found:', id);
        return;
    }

    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    nextScreen.classList.add('active');
    nextScreen.scrollTop = 0;
}

function createParticles() {
    const container = document.getElementById('particles');

    for (let i = 0; i < 35; i++) {
        const particle = document.createElement('div');

        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${8 + Math.random() * 14}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;

        container.appendChild(particle);
    }
}

function unlock() {
    const value = dateInput.value.trim();

    if (value === '24.09.2026' || value === '24/09/2026') {
        errorMessage.textContent = '';

        music.play().catch(() => {});

        showScreen('correctScreen');

        setTimeout(() => {
            showScreen('birthdayScreen');
        }, 1500000);

        return;
    }

    errorMessage.textContent = 'Hmm... bu tarih değil gibi. Tekrar dene 🤍';

    dateInput.classList.remove('shake');

    void dateInput.offsetWidth;

    dateInput.classList.add('shake');
}

unlockBtn.addEventListener('click', unlock);

dateInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        unlock();
    }
});

dateInput.addEventListener('input', event => {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 2) {
        value = value.slice(0, 2) + '.' + value.slice(2);
    }

    if (value.length > 5) {
        value = value.slice(0, 5) + '.' + value.slice(5);
    }

    event.target.value = value;
});

const continueButtons = document.querySelectorAll('.continue-btn');

console.log('Continue buttons found:', continueButtons.length);

continueButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();

        const nextScreen = this.dataset.next;

        console.log('Continue clicked:', nextScreen);

        if (nextScreen) {
            showScreen(nextScreen);
        }
    });
});

musicControl.addEventListener('click', () => {
    if (music.paused) {
        music.play().catch(() => {});
        musicControl.classList.add('playing');
    } else {
        music.pause();
        musicControl.classList.remove('playing');
    }
});

music.addEventListener('play', () => {
    musicControl.classList.add('playing');
});

music.addEventListener('pause', () => {
    musicControl.classList.remove('playing');
});

createParticles();