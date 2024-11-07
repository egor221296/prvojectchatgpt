// script.js

function loadContent() {
    fetch('ozon_content.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
            initializeOzonScripts(); // Инициализация скриптов, специфичных для Ozon
        })
        .catch(error => console.error('Ошибка загрузки контента:', error));
}

function initializeOzonScripts() {
    const exportButton = document.getElementById('export-button');
    if (exportButton) {
        exportButton.addEventListener('click', () => {
            // Ваш код для выгрузки данных

            
            alert('Выгрузка данных...');
        });
    }

    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase();
            const rows = document.querySelectorAll('#data-table tbody tr');
            rows.forEach(row => {
                const sku = row.cells[0].textContent.toLowerCase();
                const name = row.cells[1].textContent.toLowerCase();
                if (sku.includes(query) || name.includes(query)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }



    // Добавьте любые другие скрипты, необходимые для работы центрального контента
}

document.addEventListener('DOMContentLoaded', loadContent);