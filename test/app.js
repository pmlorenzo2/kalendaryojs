// app.js
import ZavinDatepicker from "../src/index.js";

ZavinDatepicker.render({
    id: "from",
    label: "From",
    pickerIcon: "./icons/icons8-calendar-100.png",
    option: {
        prevIcon: "./icons/icons8-back-100.png",
        nextIcon: "./icons/icons8-forward-100.png"
    }
});

ZavinDatepicker.render({
    id: "to",
    label: "To",
    pickerIcon: "./icons/icons8-calendar-100.png",
    option: {
        prevIcon: "./icons/icons8-back-100.png",
        nextIcon: "./icons/icons8-forward-100.png"
    }
});

document.onclick = () => {
    const fromDatepicker = document.getElementById("fromDatepicker");
    if (fromDatepicker) fromDatepicker.classList.remove("is-active");

    const toDatepicker = document.getElementById("toDatepicker");
    if (toDatepicker) toDatepicker.classList.remove("is-active");
};
