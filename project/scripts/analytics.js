// scripts/analytics.js

function initializeAnalyticsScripts() {
    // Проверяем, существует ли элемент canvas с id 'salesContent'
    const canvas = document.getElementById('salesContent');
    if (!canvas) {
        console.error("Элемент canvas с id 'salesContent' не найден.");
        return;
    }

    const ctx = canvas.getContext('2d');

    // Создаем новый график
    const salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            datasets: [{
                label: 'Продажи',
                data: [120, 190, 300, 500, 200, 300],
                backgroundColor: 'rgba(26, 115, 232, 0.2)',
                borderColor: 'rgba(26, 115, 232, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    console.log('График продаж инициализирован.');
}