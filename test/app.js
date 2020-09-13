// app.js
import KalendaryoJS from "../src/index.js";

// Get date today
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDate = today.getDate();


//
// Update elements in DOM
//

const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const endDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
try {

    // Render From Datepicker
    const fromDatepicker = new KalendaryoJS({
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
    fromDatepicker.render();

    // Render To Datepicker
    const toDatepicker = new KalendaryoJS({
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
    toDatepicker.render();

} catch (error) {
    console.error(error);
}


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
