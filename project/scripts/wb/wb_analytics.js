// scripts/wb_analytics.js

function initializeWbAnalyticsScripts() {
    // Проверяем, существует ли элемент canvas с id 'wbSalesChart'
    const canvas = document.getElementById('wbSalesChart');
    if (!canvas) {
        console.error("Элемент canvas с id 'wbSalesChart' не найден.");
        return;
    }

    const ctx = canvas.getContext('2d');

    // Создаем новый график
    const wbSalesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
            datasets: [{
                label: 'Продажи WB',
                data: [180, 250, 350, 400, 220, 330],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
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

    console.log('График аналитики WB инициализирован.');
}