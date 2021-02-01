
// Initial data object
let data = {
    monday:
        {
            10: {
                name: 'Daily Meeting',
                users: ['Anna', 'Ivan']
            },
            18: {
                name: 'Scrum Meeting',
                users: ['Anna', 'Oleg']
            }
        }
    ,
    friday: {
        13: {
            name: 'Grooming',
            users: ['Irina', 'Ivan']
        },
        18:{
            name: 'Scrum Meeting',
            users: ['Anna', 'Irina']
        }
    }
};
const days = ['monday','tuesday','wednesday','thursday','friday'];

// Setting data into local storage or fetting it from it
if(localStorage.data === undefined){
    localStorage.setItem('data', JSON.stringify(data));
} else {
    data = JSON.parse(localStorage.getItem('data'));
}

class Calendar{

    constructor(){
        this.calendar = this.createCalendar();
    }

    createCalendar(){
        // creates layout(objeсt) for calendar
        let calendar = {};

        days.forEach(function(day){
            let hours = {};
            for(let i=10; i<=18; i++){
                hours[i] = {};
            }
            calendar[day] = hours;
        });
        return calendar;
    }

    renderCalendar(){
        let ths = [],
            trs = [],
            hour = 10;

        for(let i=10; i<=18; i++){
            let tds = [`<td>${hour}:00</td>`];

            for(let td=0; td<days.length; td++){
                tds.push(`<td data-hour="${hour}" data-day="${days[td]}"></td>`);
            }

            let tr = `<tr>${tds.join('')}</tr>`;
            trs.push(tr);

            hour++;
        }

        for(let key in this.calendar){
            ths.push(`<th>${key}</th>`);
        }

        let table = document.createElement('table'),
            thead = table.createTHead(),
            tbody = table.createTBody();

        thead.innerHTML = `<tr><th>Name</th>${ths.join('')}</tr>`;
        tbody.innerHTML = `${trs.join('')}`;
        document.body.append(table);

        const navigation = document.createElement('div');
        navigation.classList = 'navigation-section'

        this.getUsers();
        navigation.append(this.renderUsers());

        const createBtn = document.createElement('button');
        createBtn.innerText = 'New event +';
        createBtn.classList = 'create-btn btn btn-success';
        createBtn.addEventListener('click', function(){
            location.href = '/create';
        })
        navigation.append(createBtn);

        document.body.prepend(navigation);
    }

    fillData(userName){
        let MYCL = this.calendar;
        for(let key in data){
            if(MYCL[key]){
                let dayInMyCL = MYCL[key];

                for(let event in data[key]){
                    if(userName){
                        if(data[key][event].users && data[key][event].users.includes(userName)){
                            //console.log(data[key][event]);
                            dayInMyCL[event] = data[key][event];
                        } else{
                            dayInMyCL[event] = '';
                        }
                    } else{
                        dayInMyCL[event] = data[key][event];
                    }
                }
            }
        }

        this.renderData();
    }

    renderData(){
        let myCL = this.calendar;
        for(let key in myCL){
            let day = myCL[key];
            for(let event in day){
                let td = document.querySelector(`td[data-hour="${event}"][data-day="${key}"]`);
                td.innerHTML = Object.keys(day[event]).length>0 ? this.renderEvent(day[event]) : '';
            }
        }
        this.addRemoveEvent();
    }

    renderEvent(event){
        return `<div class="event">${event.name} <img class="removeEvent" src="images/cancel.svg" alt="cancel" width="13"></div>`;
    }

    addRemoveEvent(){
        let removeEvents = document.querySelectorAll('.removeEvent');
        removeEvents.forEach(function(btn){
            btn.addEventListener('click',function(e){
                let td = this.parentElement.parentElement,
                    hour = td.dataset.hour,
                    day = td.dataset.day;

                myCalendar.calendar[day][hour] = {};
                data[day][hour] = {};
                console.log(data);
                localStorage.setItem('data', JSON.stringify(data));

                myCalendar.renderData();
            })
        });
    }

    getUsers(){
        let users = [];

        for(let key in data){
            for(let event in data[key]){
                users.push(data[key][event].users);
            }
        }

        myCalendar.users = users.flat().filter((v, i, a) => a.indexOf(v) === i);
    }

    renderUsers(){
        let options = ['<option value="all">All users</option>'];
        for(let key in this.users){
            options.push(`<option data-user="${this.users[key]}">${this.users[key]}</option>`)
        }

        let select = document.createElement('select');
        select.classList='btn btn-info dropdown-toggle'
        select.innerHTML = `${options.join('')}`;

        select.addEventListener('change',this.getUserEvent);
        return select;
    }

    getUserEvent(e){
        let selectedUser = e.target.value === 'all' ? undefined : e.target.value;
        myCalendar.fillData(selectedUser);
    }

}

let myCalendar = new Calendar();

myCalendar.renderCalendar();
myCalendar.fillData();