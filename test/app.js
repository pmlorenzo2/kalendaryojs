// app.js
import ZavinDatepicker from "../src/index.js";

// Get date today
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDate = today.getDate();


//
// Update elements in DOM
//

// Render From Datepicker
const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
ZavinDatepicker.render({
    id: "from",
    label: "From",
    pickerIcon: "./assets/icons/icons8-calendar-100.png",
    value: dayjs(startDate).format("YYYY-MM-DD"),
    option: {
        prevIcon: "./assets/icons/icons8-back-100.png",
        nextIcon: "./assets/icons/icons8-forward-100.png",
        today: true
    }
});

// Render To Datepicker
const endDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
ZavinDatepicker.render({
    id: "to",
    label: "To",
    pickerIcon: "./assets/icons/icons8-calendar-100.png",
    value: dayjs(endDate).format("YYYY-MM-DD"),
    option: {
        prevIcon: "./assets/icons/icons8-back-100.png",
        nextIcon: "./assets/icons/icons8-forward-100.png",
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
