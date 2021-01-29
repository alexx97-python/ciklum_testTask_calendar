const columnHeaders = ['Name', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const rowHeaders = [10,11,12,13,14,15,16,17,18];

function renderCalendarTemplate (){
    let block = document.querySelector('.calendar-wrapper');
    let table = document.createElement('table');
    table.classList.add('calendar-table')
    let tr = document.createElement('tr');
    columnHeaders.forEach((element) => {
        let td = document.createElement('td');
        td.innerHTML = element;
        td.id = element.toLowerCase()
        tr.append(td);
    })
    table.append(tr);
    rowHeaders.forEach(element => {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = `${element}:00`;
        td.id = element;
        tr.append(td);

        for (let i=0; i<5; i++){
            let td = document.createElement('td');
            tr.append(td);
        }
        table.append(tr);
    })

    block.insertAdjacentElement('beforeend', table)
}

renderCalendarTemplate()