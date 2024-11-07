// scripts/wb_price.js

function initializeWbPriceScripts() {
    // Обработка кнопки "Выгрузка таблицы"
    const exportButton = document.getElementById('export-button');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            exportTableToExcel('data-table', 'таблица_данных');
        });
    }

    // Функция для экспорта таблицы в Excel
    function exportTableToExcel(tableID, filename = '') {
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

        // Укажите имя файла
        filename = filename ? filename + '.xls' : 'excel_data.xls';

        // Создание ссылки для загрузки
        downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            var blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Создание ссылки для других браузеров
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

            // Указание имени файла
            downloadLink.download = filename;

            // Инициация загрузки
            downloadLink.click();
        }
    }

    // Функция для поиска по артикулу или названию
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            var searchValue = this.value.toLowerCase();
            var tableRows = document.querySelectorAll('.table-container tbody tr');

            tableRows.forEach(function(row) {
                var sku = row.cells[0].textContent.toLowerCase();
                var name = row.cells[1].textContent.toLowerCase();

                if (sku.includes(searchValue) || name.includes(searchValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Обработка изменений в ячейках "Себестоимость" и "Прибыль"
    const editableCells = document.querySelectorAll('.editable-cell.green-cell');
    editableCells.forEach(function(cell) {
        cell.addEventListener('input', calculateFinalPrice);
    });

    function calculateFinalPrice() {
        var rows = document.querySelectorAll('.table-container tbody tr');

        rows.forEach(function(row) {
            var costPrice = parseFloat(row.cells[4].textContent.replace(/[^0-9.-]+/g,"")) || 0;
            var profit = parseFloat(row.cells[5].textContent.replace(/[^0-9.-]+/g,"")) || 0;
            var finalPriceCell = row.cells[6];

            var finalPrice = costPrice + profit;
            finalPriceCell.textContent = finalPrice.toLocaleString('ru-RU') + '₽';
        });
    }

    
    // Добавьте свои скрипты здесь
}