const datePickerWrapper = document.querySelector('.datepicker-wrapper');
datePickerWrapper.innerHTML=
`      
<div class="datepicker">
    <div class="btn--close-datepicker">X</div>
    <div class="datepicker__top">
        <div class="btn--prev"><</div>
        <div class="datepicker__show-date"></div>
        <div class="btn--next">></div>
    </div>
    <div class="datepicker__choose-date">
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
        <div class="date"></div>
    </div>
</div>`
const datepicker = datePickerWrapper.querySelector('.datepicker')
const datepickerShowDate = datepicker.querySelector('.datepicker__show-date');
const nextBtn = datepicker.querySelector('.datepicker__top>.btn--next');
const prevBtn = datepicker.querySelector('.datepicker__top>.btn--prev');
const dates = datepicker.querySelectorAll('.datepicker__choose-date>.date');
let selectedDatepickerInput = null;


let d = new Date();
let thisYear = null;
let thisMonth = null; 

let y = 0;
const standardYear = 2000;
const standardYearFirstWeekDay = 5;

const getDayOfYear = (year)=>{
    if(year%4 !== 0)return 365;
    if(year%100 !== 0)return 366;
    if(year%400 !== 0)return 365;
    return 366;
}
const getMonthDayOfYear  = (year)=>{
    let dayOfLeapYear = [31,29,31,30,31,30,31,31,30,31,30,31];
    let dayOfNonLeapYear = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(year%4 !== 0)return dayOfNonLeapYear;
    if(year%100 !== 0)return dayOfLeapYear;
    if(year%400 !== 0)return dayOfNonLeapYear;
    return dayOfLeapYear;
}
const getFirstWeekDayOfYear = (year)=>{
    let diff = year - standardYear;
    let weekDay = standardYearFirstWeekDay;

    if(diff>0){
        for(let i=0; i<diff; i++){
            let dayOfYear = getDayOfYear(standardYear+i);
            weekDay = (weekDay+dayOfYear)%7;
        }
        return weekDay;
    }else if(diff<0){
        for(let i=-1; i>=diff; i--){
            let dayOfYear = getDayOfYear(standardYear+i);
            weekDay = (weekDay-dayOfYear)%7;
        }    
        return weekDay+7;    
    }
    return weekDay;
}
const getFirstWeekdayOfThisMonth = (year ,month)=>{
    let firstWeekDayOfThisMonth = getFirstWeekDayOfYear(year);
    let monthDayOfThisYear = getMonthDayOfYear(year);
    for(let i=0; i<month-1; i++){
        firstWeekDayOfThisMonth = (firstWeekDayOfThisMonth + monthDayOfThisYear[i])%7;
    }
    return firstWeekDayOfThisMonth;
}
const setShowDate = (year,month)=>{
    datepickerShowDate.textContent = `${year}??? ${month}???`;
    let DayNumArr = getMonthDayOfYear(year);
    let dayNum = DayNumArr[month-1];
    let startWeekDay = (getFirstWeekdayOfThisMonth(year, month)+1)%7;
    for(i=0; i<37; i++){
        if(i<startWeekDay || i>(startWeekDay+dayNum-1)){
            dates[i].textContent='';
            continue;
        }
        dates[i].textContent = i-startWeekDay+1;
    }
}

document.querySelector('body').addEventListener('click',e=>{
    if(e.target.classList.contains('datepicker-input')){
        thisYear = d.getFullYear();
        thisMonth = d.getMonth()+1;
        datePickerWrapper.classList.add('active');
        setShowDate(thisYear,thisMonth);
        selectedDatepickerInput = e.target;
        return;
    }
    if(e.target.classList.contains('btn--prev')){
        thisMonth--;
        if(thisMonth<1){
            thisYear -= 1;
            thisMonth = 12;
        }
        setShowDate(thisYear,thisMonth);
        return;
    }
    if(e.target.classList.contains('btn--next')){
        thisMonth++;
        if(thisMonth>12){
            thisYear += 1;
            thisMonth = 1;
        }
        setShowDate(thisYear,thisMonth);
        return;
    }
    if(e.target.classList.contains('date')){
        let selectedDate = e.target.textContent;
        if(e.target.textContent !== ''){
            let year = thisYear.toString();
            let month = thisMonth.toString();
            selectedDatepickerInput.value = year.padStart(4,'0')+'/'+month.padStart(2,'0')
            +'/'+selectedDate.padStart(2,'0');
            
            selectedDatepickerInput = null;
            datePickerWrapper.classList.remove('active');
        }
        return;
    }
    if(e.target.classList.contains('btn--close-datepicker')){
        datePickerWrapper.classList.remove('active');
    }
})




