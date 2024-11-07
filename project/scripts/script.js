// scripts/script.js

// Маппинг хэшей на контентные файлы и скрипты инициализации
const routes = {
    'index': {
        content: 'pages/index_content.html',
        script: 'scripts/index.js',
        init: 'initializeIndexScripts',
        title: 'Главная'
    },
    // Ozon подменю
    'ozon': {
        content: 'pages/ozon/ozon.html',
        script: 'scripts/ozon/ozon.js',
        init: 'initializeOzonScripts',
        title: 'Сводка Ozon'
    }, 
    'ozon-price': {
        content: 'pages/ozon/ozon_price_content.html',
        script: 'scripts/ozon/ozon_price.js',
        init: 'initializeOzonPriceScripts',
        title: 'Ozon / Цены'
    },
    'ozon-promotion': {
        content: 'pages/ozon/ozon_promotion_content.html',
        script: 'scripts/ozon/ozon_promotion.js',
        init: 'initializeOzonPromotionScripts',
        title: 'Ozon / Продвижение'
    },
    'ozon-fbs-orders': {
        content: 'pages/ozon/ozon_fbs_orders_content.html',
        script: 'scripts/ozon/ozon_fbs_orders.js',
        init: 'initializeOzonFbsOrdersScripts',
        title: 'Ozon / FBS Заказы'
    },
    'ozon-fbo-orders': {
        content: 'pages/ozon/ozon_fbo_orders_content.html',
        script: 'scripts/ozon/ozon_fbo_orders.js',
        init: 'initializeOzonFboOrdersScripts',
        title: 'Ozon / FBO Заказы'
    },
    'ozon-analytics': {
        content: 'pages/ozon/ozon_analytics_content.html',
        script: 'scripts/ozon/ozon_analytics.js',
        init: 'initializeOzonAnalyticsScripts',
        title: 'Ozon / Аналитика'
    },
    // WB подменю
    'wb': {
        content: 'pages/wb/wb.html',
        script: 'scripts/wb/wbjs',
        init: 'initializeWbScripts',
        title: 'WB'
    },
    'wb-price': {
        content: 'pages/wb/wb_price_content.html',
        script: 'scripts/wb/wb_price.js',
        init: 'initializeWbPriceScripts',
        title: 'WB / Цены'
    },
    'wb-promotion': {
        content: 'pages/wb/wb_promotion_content.html',
        script: 'scripts/wb/wb_promotion.js',
        init: 'initializeWbPromotionScripts',
        title: 'WB / Продвижение'
    },
    'wb-fbs-orders': {
        content: 'pages/wb/wb_fbs_orders_content.html',
        script: 'scripts/wb/wb_fbs_orders.js',
        init: 'initializeWbFbsOrdersScripts',
        title: 'WB / FBS Заказы'
    },
    'wb-fbo-orders': {
        content: 'pages/wb/wb_fbo_orders_content.html',
        script: 'scripts/wb/wb_fbo_orders.js',
        init: 'initializeWbFboOrdersScripts',
        title: 'WB / FBO Заказы'
    },
    'wb-analytics': {
        content: 'pages/wb/wb_analytics_content.html',
        script: 'scripts/wb/wb_analytics.js',
        init: 'initializeWbAnalyticsScripts',
        title: 'WB / Аналитика'
    },
    'analytics': {
        content: 'pages/analytics_content.html',
        script: 'scripts/analytics.js',
        init: 'initializeAnalyticsScripts',
        title: 'Аналитика'
    },
    'users': {
        content: 'pages/users_content.html',
        script: 'scripts/users.js',
        init: 'initializeUsersScripts',
        title: 'Пользователи'
    },
    'account': {
        content: 'pages/users/account.html',
        script: 'scripts/users/account.js', // Если у вас есть специфический JS для аккаунта
        init: 'initializeAccountScripts', // Имя функции инициализации
        title: 'Личный кабинет'
    }
    // Добавьте другие маршруты по мере необходимости
};

// Переменная для отслеживания текущего загруженного скрипта
let currentScript = null;

// Функция для загрузки скриптов
function loadScript(scriptUrl) {
    return new Promise((resolve, reject) => {
        // Удаляем предыдущий скрипт, если он был загружен
        if (currentScript) {
            currentScript.remove();
            currentScript = null;
        }

        // Создаём новый скрипт
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Не удалось загрузить скрипт: ${scriptUrl}`));

        document.body.appendChild(script);
        currentScript = script;
    });
}

// Функция для загрузки контента на основе хэша
function loadContent() {
    // Получаем текущий хэш без символа #
    let hash = window.location.hash.substring(1);

    // Если hash пустой, устанавливаем 'index' как значение по умолчанию
    if (!hash) {
        hash = 'index';
        window.location.hash = hash;
    }

    // Получаем соответствующий маршрут
    const route = routes[hash];

    if (route) {
        fetch(route.content)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.text();
            })
            .then(html => {
                document.getElementById('content').innerHTML = html;
                setActiveMenu(hash);
                updatePageTitle(route.title);
                return loadScript(route.script);
            })
            .then(() => {
                // Вызов функции инициализации, если она определена
                if (route.init && typeof window[route.init] === 'function') {
                    window[route.init]();
                }
                console.log(`Скрипт ${route.script} загружен и инициализирован`);
            })
            .catch(error => console.error('Ошибка загрузки контента или скрипта:', error));
    } else {
        // Если маршрут не найден, можно загрузить страницу 404 или по умолчанию
        document.getElementById('content').innerHTML = '<h2>404 - Страница не найдена</h2>';
        setActiveMenu(null); // Снимаем активность с меню
        updatePageTitle('Страница не найдена');
    }
}

// Функция для обновления заголовка страницы
function updatePageTitle(title) {
    const pageTitleElement = document.querySelector('.page-title h1');
    if (pageTitleElement) {
        pageTitleElement.textContent = title;
    }
}

// Функция для установки активного пункта меню и раскрытия подменю
function setActiveMenu(activeHash) {
    // Удаляем класс 'active' у всех ссылок
    const allLinks = document.querySelectorAll('.sidebar ul li a');
    allLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Удаляем класс 'active' у всех пунктов меню
    const allMenuItems = document.querySelectorAll('.sidebar ul li');
    allMenuItems.forEach(item => {
        item.classList.remove('active');
    });

    // Добавляем класс 'active' к текущей ссылке
    const currentLink = document.querySelector(`.sidebar ul li a[href="#${activeHash}"]`);
    if (currentLink) {
        currentLink.classList.add('active');

        // Если текущая ссылка находится в подменю, добавляем класс 'active' к родителю
        const parentLi = currentLink.closest('.submenu li')?.parentElement?.parentElement;
        if (parentLi && parentLi.classList.contains('toggle-submenu')) {
            parentLi.classList.add('active');
        }
    }
}

// Обработчик изменения хэша
window.addEventListener('hashchange', loadContent);

// Обработчик кликов по меню
document.addEventListener('DOMContentLoaded', () => {
    const toggleSubmenuLinks = document.querySelectorAll('.sidebar ul li > a.toggle-submenu');

    toggleSubmenuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const parentLi = this.parentElement;
            const submenu = parentLi.querySelector('.submenu');

            if (submenu) {
                // Переключаем видимость подменю
                event.preventDefault();
                parentLi.classList.toggle('active');
            }
        });
    });

    const submenuLinks = document.querySelectorAll('.sidebar ul li .submenu li a');

    submenuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.getAttribute('href'); // Например, '#ozon-price'
            const hash = href.substring(1); // '#ozon-price' -> 'ozon-price'
            window.location.hash = hash;
        });
    });

    // Добавляем обработчик клика для иконки Личного кабинета
    const userAccountIcon = document.getElementById('user-account');
    if (userAccountIcon) {
        userAccountIcon.addEventListener('click', () => {
            window.location.hash = 'account';
        });
    }

    // Загрузка контента на основе текущего хэша или по умолчанию
    loadContent();
});