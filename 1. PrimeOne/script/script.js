'use strict';

const menuIcon = document.querySelector('.menu-icon'),
    menu = document.querySelector('.menu'),
    body = document.body;

menuIcon.addEventListener('click', function () {
    toggleMenu();
});

menu.addEventListener('click', function (event) {
    if (event.target.tagName == 'A' || event.target.classList.contains('menu')) {
        toggleMenu();
    }
});

function toggleMenu() {
    menuIcon.classList.toggle('_active');
    menu.classList.toggle('_active');
    body.classList.toggle('_lock');
}

const bgi = document.querySelectorAll('.bgi');

for (let index = 0; index < bgi.length; index++) {
    const item = bgi[index],
        img = item.firstElementChild;

    item.style.backgroundImage = "url('" + img.getAttribute('src') + "')";
    img.remove();
}

// Простая валидация
const validateForms = document.querySelectorAll('.validate');

for (let index = 0; index < validateForms.length; index++) {
    const item = validateForms[index],
        inputs = item.querySelectorAll('input, textarea');

    item.addEventListener('submit', function (event) {
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];

            if (input.value == 0) input.classList.add('error');
        }
        if (item.querySelectorAll('.error')) event.preventDefault();
    });
}