const days = JSON.parse(localStorage.getItem('days'));
const users = JSON.parse(localStorage.getItem('users'));
const data = JSON.parse(localStorage.getItem('data'));

let HOUR_START = 10;
let HOUR_END = 18;
let HOURS = [];

//FORM elements
const eventTitle = document.querySelector('#eventTitleInput');
const usersSelect = document.querySelector('#participants');
const daysSelect = document.querySelector('#calendar-days');
const hoursSelect = document.querySelector('#time');
const form = document.querySelector('form');
const cancelBtn = document.querySelector('#cancelBtn');

const messageAlert = `
        <div class="alert alert-danger" role="alert">
            This is a danger alert—check it out!
        </div>`;

const messageSuccess = `
        <div class="alert alert-success" role="alert">
            This is a success alert—check it out!
        </div>`;


// Event Listeners
form.addEventListener('submit', onFormSubmitHandler);
cancelBtn.addEventListener('click', cancelBtnHandler);




let usersOptions = users.map(function(user){
	return `<option value="${user}">${user}</option>`;
})
usersSelect.innerHTML = usersOptions.join('');

let daysOptions = days.map(function(day){
	return `<option value="${day}">${day}</option>`;
})
daysSelect.innerHTML = daysOptions.join('');


for(; HOUR_START<=HOUR_END; HOUR_START++){
	let hour = `<option value="${HOUR_START}">${HOUR_START}:00</option>`;
	HOURS.push(hour);
}
hoursSelect.innerHTML = HOURS.join('');


function onFormSubmitHandler (e){
    e.preventDefault();
    let event = eventTitle.value,
        users = [...usersSelect.selectedOptions],
        day = daysSelect.value,
        time = hoursSelect.value;

        //Getting values from selected user options
        users = users.map(function(user){
            return user.value;
        })

    if (data[day] !== undefined && data[day][time] !== undefined && Object.keys(data[day][time]).length > 0){

        document.body.insertAdjacentHTML('afterbegin', messageAlert);
        setTimeout(()=>{
            document.body.querySelector('.alert-danger').remove();
        }, 2000);

    } else {
        document.querySelector('body').insertAdjacentHTML('afterbegin', messageSuccess);
        
        data[day] = {
            ...data[day],
            [time]:{
            name: event,
            users: users
            }
        }

        localStorage.setItem('data', JSON.stringify(data));

        setTimeout( ()=> {
            location.href = '/';
        }, 2000)
    }
}

function cancelBtnHandler(e){
    e.preventDefault();
    location.href = '/';
}
