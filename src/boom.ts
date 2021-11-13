
let effectCount = 0;

export default async function Boom(event, color: string = "rgba(0, 180, 255, 0.5)", type: 'square' | 'emoji' | 'shadow' = 'shadow') {
    let amount = 3;
    switch (type) {
        case 'shadow':
            amount = 3;
            break;
        case 'emoji':
        case 'square':
            break;
        default:
            type = 'shadow';
            amount = 3;
            break;
    }

    let x: number, y: number;
    if (event.clientX === 0 && event.clientY === 0) {
        const bbox = event.target.getBoundingClientRect();
        x = bbox.left + bbox.width / 2;
        y = bbox.top + bbox.height / 2;
    }
    else if (event.clientX && event.clientY) {
        x = event.clientX;
        y = event.clientY;
    }
    else if (event.touches && event.touches.length > 0) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    }
    else {
        return;
    }

    for (let i = 0; i < amount; i++) {

        createParticle(x, y + window.scrollY, type, color);
    }
}

function createParticle(x: number, y: number, type: 'square' | 'emoji' | 'shadow', color: string) {

    if (effectCount > 10) {
        return;
    }
    effectCount++;



    const particle = document.createElement('particle');

    document.body.appendChild(particle);
    particle.style.top = y + 'px';
    particle.style.left = x + 'px';
    let width: number | 'auto' = (Math.random() * 2 + 1);
    let destinationX = (Math.random() - 0.5) * 20;
    let destinationY = (Math.random() - 0.5) * 20;
    let rotation = Math.random() * 520;
    let delay = Math.random() * 200;

    switch (type) {
        case 'square':
            particle.style.background = color;
            particle.style.border = '1px solid white';
            break;
        case 'emoji':
            particle.innerHTML = ['❤', '🧡', '💛', '💚', '💙', '💜', '🤎'][Math.floor(Math.random() * 7)];
            particle.style.fontSize = `${width}rem`;
            width = 'auto';
            break;
        case 'shadow':
            particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 10)}px ${color}`;
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.border = '1px solid white';
            break;
    }

    particle.style.width = `${width}rem`;
    particle.style.height = `${width}rem`;

    const animation = particle.animate([
        {
            transform: `translate(${0}rem, ${0}rem)`,
            opacity: 1
        },
        {
            transform: `translate(${destinationX}rem, ${destinationY}rem)`,
            opacity: 0
        }
    ], {
        duration: Math.random() * 1000 + 3000,
        easing: 'cubic-bezier(0, 0.4, 0.5, 1)',
        delay: delay
    });
    animation.onfinish = removeParticle;
}

function removeParticle(e) {
    effectCount--;
    e.srcElement.effect.target.remove();
}

// if (document.body.animate) {
//     document.querySelectorAll('button').forEach(button => button.addEventListener('click', pop));
// }
