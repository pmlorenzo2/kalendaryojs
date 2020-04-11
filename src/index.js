
/**
 * Zavin Datepicker -> src -> Index JS
 */


const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

// Define number of items to be generated in selection year
const selection_year_count = 10;

const render = async (param) => {
    let currentYear, currentMonth, currentDate;


    // ---------------------------------------
    // 🐬. Tasks before render
    // ---------------------------------------

    //- VALIDATE: [param] - Required
    if (!param) throw new Error("param is required");
    if (typeof param !== "object") throw new Error("param must be an object");

    //- VALIDATE: [param.id] - Required
    if (!param.id) throw new Error("param.id is required");
    if (typeof param.id !== "string") throw new Error("param.id must be a string");

    //- VALIDATE: [param.label] - Optional
    if (param.label && typeof param.label !== "string") throw new Error("param.label must be a string");

    //- VALIDATE: [param.pickerIcon] - Optional
    if (param.pickerIcon && typeof param.pickerIcon !== "string") throw new Error("param.pickerIcon must be a string");

    //- VALIDATE: [param.prevIcon] - Optional
    if (param.prevIcon && typeof param.prevIcon !== "string") throw new Error("param.prevIcon must be a string");

    //- VALIDATE: [param.nextIcon] - Optional
    if (param.nextIcon && typeof param.nextIcon !== "string") throw new Error("param.nextIcon must be a string");

    // Use date today as initial for current values
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    currentDate = today.getDate();


    // ---------------------------------------
    // 🐇. Render datepicker here
    // ---------------------------------------
    let labelElement;
    if (param.label) labelElement = `<h6 class="has-text-weight-bold">${param.label}</h6>`;

    let pickerIconElement;
    if (param.pickerIcon) {
        pickerIconElement = `
            <figure class="image is-24x24 has-margin-left-4">
                <img src="${param.pickerIcon}">
            </figure>
        `;
    }

    let prevOptionElement;
    if (param.prevIcon) {
        prevOptionElement = `
            <div class="control">
                <button class="button" type="button" id="${param.id}DatepickerPrev">
                    <figure class="image is-16x16">
                        <img src="${param.prevIcon}">
                    </figure>
                </button>
            </div>
        `;
    }

    let nextOptionElement;
    if (param.nextIcon) {
        nextOptionElement = `
            <div class="control">
                <button class="button" type="button" id="${param.id}DatepickerNext">
                    <figure class="image is-16x16">
                        <img src="${param.nextIcon}">
                    </figure>
                </button>
            </div>
        `;
    }

    document.getElementById(param.id).innerHTML = `
        <div class="dropdown zavin-datepicker" id="${param.id}Datepicker">
            <a href="javascript:void(0)" class="dropdown-trigger" id="${param.id}DatepickerTrigger">
                <div>
                    ${labelElement}
                    <p id="${param.id}DatepickerDate">${months[currentMonth].substring(0, 3)}. ${currentDate}, ${currentYear}</p>
                </div>
                ${pickerIconElement}
            </a>
            <div class="dropdown-content">
                <section class="zavin-datepicker-header" id="${param.id}DatepickerHeader">
                    <a href="javascript:void(0)" class="zavin-datepicker-period" id="${param.id}DatepickerPeriod">
                        <h6 class="has-text-weight-bold" id="${param.id}DatepickerMonthYear">${months[currentMonth]} ${currentYear}</h6>
                    </a>
                    <div class="field">
                        <div class="control-combined">
                            ${prevOptionElement}
                            <div class="control">
                                <button class="button" type="button" id="${param.id}DatepickerToday">Today</button>
                            </div>
                            ${nextOptionElement}
                        </div>
                    </div>
                </section>
                <section class="zavin-datepicker-selection" id="${param.id}DatepickerSelection"></section>
                <section class="zavin-datepicker-table" id="${param.id}DatepickerTable"></section>
            </div>
        </div>
    `;


    // ---------------------------------------
    // 🦋. Event handlers here
    // ---------------------------------------
};


// Expose
export default { render };
