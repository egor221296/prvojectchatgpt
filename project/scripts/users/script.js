// Скрипт для меню в индексе
document.addEventListener('click', function(event) {
    const userAccount = document.querySelector('.user-account');
    const dropdown = document.querySelector('.user-account-dropdown');
    
    // Если клик был вне user-account, скрыть выпадающее меню
    if (!userAccount.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Показывать меню при наведении и скрывать при уходе курсора
const userAccountElement = document.querySelector('.user-account');
const dropdownElement = document.querySelector('.user-account-dropdown');

userAccountElement.addEventListener('mouseenter', function() {
    dropdownElement.style.display = 'block';
});

userAccountElement.addEventListener('mouseleave', function() {
    dropdownElement.style.display = 'none';
});
