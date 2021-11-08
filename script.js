
const main = document.querySelector('.main-cats');
const input = document.querySelector('input');
const returnButton = document.querySelector('.return');
const modal = document.querySelector('.modal');
const divModal = document.querySelector('.modal-div');
const imgModal = document.querySelector('.modal-img');
const spanModal = document.querySelector('.modal-span');
const pModal = document.querySelector('.modal-p');

const root = document.querySelector('body');
const themeButton = document.querySelector('.light');
const buttonText = document.querySelector('.button-text');

const stdTheme = localStorage.getItem('theme');

const adaptability = document.querySelector('.adaptability');
const intelligence = document.querySelector('.intelligence');
const energy = document.querySelector('.energy-level');
const vocalisation = document.querySelector('.vocalisation');
const dogFriendly = document.querySelector('.dog-friendly');
const childFriendly = document.querySelector('.child-friendly');

themeButton.textContent = stdTheme === 'light' ? '🤍' : '💜';
buttonText.textContent = stdTheme === 'light' ? 'Light theme' : 'Dark theme';

root.style.setProperty('--color-background', stdTheme === 'light' ? '#fae6fae6' : '#000000bf');
root.style.setProperty('--color-text', stdTheme === 'light' ? '#000000bf' : '#fae6fae6');
root.style.setProperty('--color-button', stdTheme === 'light' ? '#ee82ee' : '#6c29aa');

themeButton.addEventListener('click', () => {
    themeButton.textContent = themeButton.textContent === '🤍' ? '💜' : '🤍';
    buttonText.textContent = buttonText.textContent === 'Light theme' ? 'Dark theme' : 'Light theme';

    localStorage.setItem('theme', stdTheme === 'light' ? 'dark' : 'light');

    const changeBackground = root.style.getPropertyValue('--color-background') === '#fae6fae6' ? '#000000bf' : '#fae6fae6';
    root.style.setProperty('--color-background', changeBackground);

    const changeText = root.style.getPropertyValue('--color-background') === '#fae6fae6' ? '#000000bf' : '#fae6fae6';
    root.style.setProperty('--color-text', changeText);

    const changeButton = root.style.getPropertyValue('--color-background') === '#fae6fae6' ? '#ee82ee' : '#6c29aa';
    root.style.setProperty('--color-button', changeButton);
});


fetch('https://api.thecatapi.com/v1/breeds/?api_key=72f90d8c-bce0-48bd-ab9f-a49183a4a1e1').then(response => {
    const promiseBody = response.json();
    promiseBody.then(body => {
        body.forEach(cat => {
            const div = document.createElement('div');
            div.classList.add('cat');
            div.dataset.id = cat.id;

            const catImg = document.createElement('img');
            catImg.classList.add('cat-image');
            if (cat.image && cat.image.url) {
                catImg.src = cat.image.url;
            }
            else {
                if (cat.name === 'European Burmese') {
                    catImg.src = 'https://cdn2.thecatapi.com/images/uvyjW5KIG.jpg';
                }
                if (cat.name === 'Malayan') {
                    catImg.src = 'https://cdn2.thecatapi.com/images/vPOdKNqUm.jpg';
                }
                if (cat.name === 'Persian') {
                    catImg.src = 'https://cdn2.thecatapi.com/images/3Pem6K30P.jpg';
                }
            }
            const breedName = document.createElement('span');
            breedName.classList.add('breed-name')
            breedName.textContent = cat.name;

            div.append(catImg, breedName);
            main.append(div);
            openModal();
        });
    });
});

function openModal() {
    const catimgs = document.querySelectorAll('.cat');
    catimgs.forEach(cat => {
        cat.firstChild.addEventListener('click', () => {
            modal.classList.remove('hidden');
            imgModal.src = cat.firstChild.src;
            fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${cat.dataset.id}&api_key=72f90d8c-bce0-48bd-ab9f-a49183a4a1e1`).then(response => {
                const promiseBody = response.json();

                promiseBody.then(body => {
                    spanModal.textContent = body[0].breeds[0].name;
                    pModal.textContent = body[0].breeds[0].description;
                    adaptability.textContent = body[0].breeds[0].adaptability;
                    intelligence.textContent = body[0].breeds[0].intelligence;
                    energy.textContent = body[0].breeds[0].energy_level;
                    vocalisation.textContent = body[0].breeds[0].vocalisation;
                    dogFriendly.textContent = body[0].breeds[0].dog_friendly;
                    childFriendly.textContent = body[0].breeds[0].child_friendly;
                });
            });
        });
    });
}

modal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

input.addEventListener('keydown', event => {
    const catimgs = Array.from(main.children);
    if (event.key === 'Enter') {
        returnButton.classList.add('hidden');
        catimgs.forEach(cat => {
            cat.style.display = 'flex'
            if (!cat.children[1].textContent.toLowerCase().includes(input.value.toLowerCase()) && input.value !== '') {
                returnButton.classList.remove('hidden');
                cat.style.display = 'none';
            }
        });
        input.value = '';
    }
});

returnButton.addEventListener('click', () => {
    returnButton.classList.add('hidden');
    const catimgs = Array.from(main.children);
    catimgs.forEach(cat => cat.style.display = 'flex');
});