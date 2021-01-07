const textLabels = {
    body: {
        noMatch: "Нет результатов",
        toolTip: "Сортировка",
        columnHeaderTooltip: column => `Сортировка по ${column.label}`
    },
    pagination: {
        next: "Следующая страница",
        previous: "Предыдущая страница",
        rowsPerPage: "Записей на странице",
        displayRows: "из",
    },
    toolbar: {
        search: "Поиск",
        downloadCsv: "Загрузить CSV",
        print: "Печать",
        viewColumns: "Отображаемые колонки",
        filterTable: "Фильтры",
    },
    filter: {
        all: "Все",
        title: "ФИЛЬТРЫ",
        reset: "СБРОСИТЬ",
    },
    viewColumns: {
        title: "Показать колонки",
        titleAria: "Показать/скрыть колонки",
    },
    selectedRows: {
        text: "Выбрано",
        delete: "Удалить",
        deleteAria: "Удалить выбранные записи",
    }
}

export default textLabels