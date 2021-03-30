// Включение "строгого" режима
'use strict';

// Переключение пунктов меню
const navItems = document.querySelectorAll('a.header__link');

let currentURL = (window.location.hash) ? window.location.hash : '#main',
    selectedNavItem = document.querySelector('a[href="' + currentURL + '"]');

selectedNavItem.classList.add('_selected');
document.querySelector(currentURL).classList.add('_show');

for (let index = 0; index < navItems.length; index++) {
    const item = navItems[index];

    item.addEventListener('click', function (event) {
        const href = item.getAttribute('href');

        if (selectedNavItem != item) {
            showContent(href);
            selectItem(item);
            changeURL(href);
            selectedNavItem = item;
        }
    });
}

function selectItem(item) {
    const classToAdd = '_selected';
    item.classList.add(classToAdd);
    selectedNavItem.classList.remove(classToAdd);
}

function changeURL(newURL) {
    currentURL = newURL;
}

function showContent(contentID) {
    const content = document.querySelector(contentID),
        currentContent = document.querySelector(currentURL);

    content.classList.add('_show');
    currentContent.classList.remove('_show');
}

// Меню сортировки
const sortBlock = document.querySelector('.sort'),
    sortBtn = sortBlock.querySelector('.sort__title'),
    sortMenu = sortBlock.querySelector('.sort__menu');

let selectedSortItem = sortMenu.querySelector('.sort__item._selected');

sortBlock.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('sort__item')) {
        if (target != selectedSortItem) {
            selectSortItem(target);
            sortMenu.classList.toggle('_show');
        }
    } else if (target.classList.contains('sort__title')) {
        sortMenu.classList.toggle('_show');
    }
});

function selectSortItem(item) {
    selectedSortItem.classList.remove('_selected');
    item.classList.add('_selected');
    sortBtn.innerText = item.innerText;
    selectedSortItem = item;
}

let orders = document.querySelectorAll('.order');

for (let index = 0; index < orders.length; index++) {
    const order = orders[index],
        orderText = order.querySelector('.order__text'),
        btnMoreText = order.querySelector('.order__text-more');

    order.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('order__text-more')) {
            toggleFullOrder(order, btnMoreText);
        }
    });
}

function isOverflowed(item) {
    if (item.scrollHeight > item.clientHeight) {
        return true;
    }
    return false;
}

function toggleFullOrder(order, btn) {
    if (order.classList.contains('_full')) {
        order.classList.remove('_full');
        btn.innerText = 'Подробнее';
    } else {
        order.classList.add('_full');
        btn.innerText = 'Свернуть';
    }
}

const regSubmit = document.querySelector('.popup-reg__submit');

regSubmit.addEventListener('click', async function (event) {
    event.preventDefault();

    const form = regSubmit.closest('form'),
        urlRequest = 'reg.php',
        dataSend = new FormData(form);

    let request, result;

    formValidate(form, 'input', 'max');
    if (!form.querySelector('.error')) {
        request = await fetch(urlRequest, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-urldecode',
            },
            body: dataSend,
        });
        if (request.ok) {
            result = await request.text();
        } else {
            alert('Неожиданная ошибка, попробуйте позже...');
        }
    }
});

function formValidate(form, selector = 'input', type = 'min') {
    const items = form.querySelectorAll(selector);

    for (let index = 0; index < items.length; index++) {
        const item = items[index];

        switch (item.getAttribute('name')) {
            case 'name':
                nameValidate(item);
                break;
            case 'email':
                emailValidate(item);
                break;
            case 'password':
                passwordValidate(item);
                break;
            default:
                break;
        }
    }
}

function nameValidate(item) {
    const reg = /[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?/,
        name = item.value;

    if (name.length > 1 && reg.test(name)) {
        item.classList.remove('error');
    } else {
        item.classList.add('error');
    }
}

function emailValidate(item) {
    const reg = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
        email = item.value;

    if (reg.test(email)) {
        item.classList.remove('error');
    } else {
        item.classList.add('error');
    }
}

function passwordValidate(item) {
    const password = item.value;

    if (password.length > 7) {
        item.classList.remove('error');
    } else {
        item.classList.add('error');
    }
}

// Модальные окна
const popups = document.querySelectorAll('.popup'),
    popupLinks = document.querySelectorAll('button[data-popup]'),
    fixedElements = document.querySelectorAll('.fixed');

for (let index = 0; index < popupLinks.length; index++) {
    const item = popupLinks[index],
        popup = document.querySelector(item.dataset.popup);

    item.addEventListener('click', function () {
        if (popup) {
            openPopup(popup);
        }
    });
}

for (let index = 0; index < popups.length; index++) {
    const popup = popups[index];

    popup.addEventListener('mousedown', function (event) {
        const target = event.target;

        if (target.classList.contains('popup-close') || !target.closest('.popup-content')) {
            closePopup(popup);
        }
    });
}

function openPopup(popup) {
    bodyLock();
    popup.classList.add('_open');
}

function closePopup(popup) {
    bodyUnlock();
    popup.classList.remove('_open');
}

function bodyLock() {
    const body = document.body;

    body.classList.add('_lock');
}

function bodyUnlock() {
    const body = document.body;

    body.classList.remove('_lock');
}

