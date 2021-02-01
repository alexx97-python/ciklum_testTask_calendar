const days = ['monday','tuesday','wednesday','thursday','friday'];

const data = JSON.parse(localStorage.getItem('data'));

function renderCreateForm (){
    const wrapper = document.createElement('div');

    const form = document.createElement('form');

    const div1 = document.createElement('div');
    const label1 = document.createElement('label');
    label1.innerText = 'Name of The Event:';
    const input1 = document.createElement('input');
    input1.classList.add('event-title-input')
    div1.append(label1, input1);

    const div2 = document.createElement('div');
    const label2 = document.createElement('label');
    label2.innerText = 'Participants:';
    //TODO: need multiple select of users instead of input;
    const input2 = document.createElement('input');
    input2.classList.add('participants-input');
    div2.append(label2, input2);

    const div3 = document.createElement('div');
    const label3 = document.createElement('label');
    label3.innerText = 'Day:';
    const select_day = document.createElement('select');
    select_day.classList.add('select-day-form');
    let options_day = [];
    days.forEach(element => {
        let option = `<option value=${element}>${element}</option>`
        options_day.push(option);
    })
    select_day.innerHTML = options_day.join(',');
    div3.append(label3, select_day);

    const div4 = document.createElement('div');
    const label4 = document.createElement('label');
    label4.innerText = 'Time:';
    const select_time = document.createElement('select');
    select_time.classList.add('select-time-form');
    let options_time = [];
    for (let i=10; i<=18; i++){
        let option = `<option value=${i}>${i}:00</option>`
        options_time.push(option);
    }
    select_time.innerHTML = options_time.join(',');
    div4.append(label4, select_time);

    const div5 = document.createElement('div');
    const create_btn = document.createElement('button');
    create_btn.addEventListener('click', createBtnHandler);
    create_btn.innerText = 'Create';
    create_btn.classList.add('create-btn')
    const cancel_btn = document.createElement('button');
    cancel_btn.addEventListener('click', cancelBtnHandler);
    cancel_btn.innerText = 'Cancel';
    cancel_btn.classList.add('cancel-btn');
    div5.append(create_btn, cancel_btn);

    form.append(div1, div2, div3, div4, div5);
    wrapper.append(form);
    document.body.append(wrapper);
}

function createBtnHandler (e){
    e.preventDefault();
    const eventTitle = document.querySelector('.event-title-input').value;
    const participants = document.querySelector('.participants-input'). value;
    const day = document.querySelector('.select-day-form'). value;
    const time = document.querySelector('.select-time-form').value;

    if (data[day] !== undefined && data[day][time] !== undefined && Object.keys(data[day][time]).length > 0){
        console.log('This day and time is taken')
    } else {
        console.log('Setting')
        data[day] = {
            ...data[day],
            [time]:{
            name: eventTitle,
            users: participants
            }
        }
    }

    console.log(data);
    localStorage.setItem('data', JSON.stringify(data));



}

function cancelBtnHandler(e){
    e.preventDefault();
    location.href = '/';
}

renderCreateForm();