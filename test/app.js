// app.js
import ZavinDatepicker from "../src/index.js";


//
// Update elements in DOM
//

// Render From Datepicker
ZavinDatepicker.render({
    id: "from",
    label: "From",
    pickerIcon: "./icons/icons8-calendar-100.png",
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
