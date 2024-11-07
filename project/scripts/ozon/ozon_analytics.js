// scripts/ozon_analytics.js

function initializeOzonAnalyticsScripts() {
    // Проверяем, существует ли элемент canvas с id 'ozonSalesChart'
    const canvas = document.getElementById('ozonSalesChart');
    if (!canvas) {
        console.error("Элемент canvas с id 'ozonSalesChart' не найден.");
        return;
    }

    const ctx = canvas.getContext('2d');

    // Создаем новый график
    const ozonSalesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            datasets: [{
                label: 'Продажи Ozon',
                data: [150, 230, 320, 450, 210, 310],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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

    console.log('График аналитики Ozon инициализирован.');
}