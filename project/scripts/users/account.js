// scripts/account/account.js

function initializeAccountScripts() {
    console.log('Скрипты для Личного кабинета инициализированы.');

    const changeTariffButton = document.querySelector('.btn-blue');
    if (changeTariffButton) {
        changeTariffButton.addEventListener('click', () => {
            alert('Функционал изменения тарифа пока не реализован.');
            // Здесь вы можете добавить модальное окно или перенаправление на страницу с тарифами
        });
    }
}