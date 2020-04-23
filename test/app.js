// app.js
import ZavinDatepicker from "../src/index.js";

// Generate value given the year, month, and date
const generateValue = (year, month, date) => {
    const dateMonth = month + 1; // Increment by 1 since this is an index

    // Extract value for month
    // NOTE: Month must be double digit
    let valueMonth;
    if (dateMonth < 10) valueMonth = "0" + dateMonth;
    else valueMonth = dateMonth;

    // Extract value for date
    // NOTE: Date must be double digit
    let valueDate;
    if (date < 10) valueDate = "0" + date;
    else valueDate = date;

    let value = `${year}-${valueMonth}-${valueDate}`;
    return value;
};

// Get date today
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1; // Increment by 1 since method returns an index
const todayDate = today.getDate();


//
// Update elements in DOM
//

// Render From Datepicker
ZavinDatepicker.render({
    id: "from",
    label: "From",
    pickerIcon: "./icons/icons8-calendar-100.png",
    value: `${todayYear}-${todayMonth}-${todayDate}`,
    option: {
        prevIcon: "./icons/icons8-back-100.png",
        nextIcon: "./icons/icons8-forward-100.png",
        today: true
    }
});

// Render To Datepicker
ZavinDatepicker.render({
    id: "to",
    label: "To",
    pickerIcon: "./icons/icons8-calendar-100.png",
    value: `${todayYear}-${todayMonth + 1}-${todayDate}`,
    option: {
        prevIcon: "./icons/icons8-back-100.png",
        nextIcon: "./icons/icons8-forward-100.png",
        today: true
    }
});


//
// Place all event handlers here
//

// EVENT: DOM is clicked
document.onclick = () => {
    const fromDatepicker = document.getElementById("fromDatepicker");
    if (fromDatepicker) fromDatepicker.classList.remove("is-active");

    const toDatepicker = document.getElementById("toDatepicker");
    if (toDatepicker) toDatepicker.classList.remove("is-active");
};
