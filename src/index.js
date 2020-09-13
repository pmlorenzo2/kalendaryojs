
/**
 * KalendaryoJS -> src -> Index JS
 */


const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

// Define number of items to be generated in selection year
const selection_year_count = 10;


/**
 * Create and customize your own KalendaryoJS using this class.
 */
class KalendaryoJS {

    /**
     * Create instance of KalendaryoJS class.
     *
     * @param   {Object}    param
     *                      [REQUIRED]
     *
     * @param   {String}    param.id
     *                      Reference to the element this datepicker will be injected into.
     *                      [REQUIRED]
     *
     * @param   {String}    param.label
     *                      User-defined datepicker label.
     *
     * @param   {String}    param.pickerIcon
     *                      Path to the icon for datepicker.
     *
     * @param   {String}    param.value
     *                      Initial value for this datepicker.
     *                      (Follow YYYY-MM-DD format)
     *
     * @param   {Object}    param.option
     *                      The options this datepicker will have.
     *
     * @param   {String}    param.option.prevIcon
     *                      Path to the icon for datepicker prev.
     *                      (If defined prev option will be available)
     *
     * @param   {String}    param.option.nextIcon
     *                      Path to the icon for datepicker next.
     *                      (If defined next option will be available)
     *
     * @param   {Boolean}   param.option.today
     *                      Set to true to make "Today" option available.
     */
    constructor(param) {
        KalendaryoJS.validate(param);

        //- PROPERTY: Required
        this.id = param.id;

        //- PROPERTY: Optional
        this.label = param.label || "";
        this.pickerIcon = param.pickerIcon || "";
        this.value = param.value || "";
        this.option = param.option || null;

        // If value is defined then set it as initial values,
        // Else use date today as initial values
        if (this.value) {
            const values = this.value.split("-");
            this.currentYear = parseInt(values[0]);
            this.currentMonth = parseInt(values[1]) - 1; // Subtract by 1 to make it an index
            this.currentDate = parseInt(values[2]);
        } else {
            const today = new Date();
            this.currentYear = today.getFullYear();
            this.currentMonth = today.getMonth();
            this.currentDate = today.getDate();
        }
    }

    //- INSTANCE METHODS ---------------------------

    /**
     * Render this instance of KalendaryoJS.
     */
    render() {
        let datepickerElement,
            dateElement,
            headerElement,
            monthYearElement,
            selectionElement,
            selectionMonthElement,
            selectionYearElement,
            tableElement,
            daysBodyElement,
            valueElement;


        // ---------------------------------------
        // 🐇. Render datepicker here
        // ---------------------------------------

        // Define label element
        let labelElement;
        if (this.label) labelElement = `<h6 class="has-text-weight-bold">${this.label}</h6>`;
        else labelElement = "";

        // Define picker icon element
        let pickerIconElement;
        if (this.pickerIcon) {
            pickerIconElement = `
                <figure class="image is-24x24 has-margin-left-4">
                    <img src="${this.pickerIcon}">
                </figure>
            `;
        } else {
            pickerIconElement = "";
        }

        // Define prev option element
        let prevOptionElement;
        if (this.option && this.option.prevIcon) {
            prevOptionElement = `
                <div class="control">
                    <button class="button" type="button" id="${this.id}DatepickerPrev">
                        <figure class="image is-16x16">
                            <img src="${this.option.prevIcon}">
                        </figure>
                    </button>
                </div>
            `;
        } else {
            prevOptionElement = "";
        }

        // Define today option element
        let todayOptionElement;
        if (this.option && this.option.today) {
            todayOptionElement = `
                <div class="control">
                    <button class="button kalendaryojs-today" type="button" id="${this.id}DatepickerToday">Today</button>
                </div>
            `;
        } else {
            todayOptionElement = "";
        }

        // Define next option element
        let nextOptionElement;
        if (this.option && this.option.nextIcon) {
            nextOptionElement = `
                <div class="control">
                    <button class="button" type="button" id="${this.id}DatepickerNext">
                        <figure class="image is-16x16">
                            <img src="${this.option.nextIcon}">
                        </figure>
                    </button>
                </div>
            `;
        } else {
            nextOptionElement = "";
        }

        // Retrieve and inject datepicker code to element
        document.getElementById(this.id).innerHTML = `
            <div class="dropdown kalendaryojs" id="${this.id}Datepicker">
                <a href="javascript:void(0)" class="dropdown-trigger" id="${this.id}DatepickerTrigger">
                    <div>
                        ${labelElement}
                        <p id="${this.id}DatepickerDate"></p>
                    </div>
                    ${pickerIconElement}
                </a>
                <div class="dropdown-content" id="${this.id}DatepickerContent">
                    <section class="kalendaryojs-header" id="${this.id}DatepickerHeader">
                        <a href="javascript:void(0)" class="kalendaryojs-period" id="${this.id}DatepickerPeriod">
                            <h6 class="has-text-weight-bold" id="${this.id}DatepickerMonthYear"></h6>
                        </a>
                        <div class="field">
                            <div class="control-combined">
                                ${prevOptionElement}
                                ${todayOptionElement}
                                ${nextOptionElement}
                            </div>
                        </div>
                    </section>
                    <section class="kalendaryojs-selection is-hidden" id="${this.id}DatepickerSelection">
                        <div class="kalendaryojs-month" id="${this.id}DatepickerMonth"></div>
                        <div class="kalendaryojs-year" id="${this.id}DatepickerYear"></div>
                    </section>
                    <table class="kalendaryojs-table" id="${this.id}DatepickerTable">
                        <thead>
                            <tr id="${this.id}DatepickerDaysHeader"></tr>
                        </thead>
                        <tbody id="${this.id}DatepickerDaysBody"></tbody>
                    </table>
                </div>
                <input type="hidden" id="${this.id}DatepickerValue">
            </div>
        `;


        // ---------------------------------------
        // 🦀. Update datepicker elements
        // ---------------------------------------

        // Retrieve datepicker elements
        datepickerElement = document.getElementById(`${this.id}Datepicker`);
        dateElement = document.getElementById(`${this.id}DatepickerDate`);
        headerElement = document.getElementById(`${this.id}DatepickerHeader`);
        monthYearElement = document.getElementById(`${this.id}DatepickerMonthYear`);
        selectionElement = document.getElementById(`${this.id}DatepickerSelection`);
        selectionMonthElement = document.getElementById(`${this.id}DatepickerMonth`);
        selectionYearElement = document.getElementById(`${this.id}DatepickerYear`);
        tableElement = document.getElementById(`${this.id}DatepickerTable`);
        daysBodyElement = document.getElementById(`${this.id}DatepickerDaysBody`);
        valueElement = document.getElementById(`${this.id}DatepickerValue`);

        dateElement.textContent = `${months[this.currentMonth].substring(0, 3)}. ${this.currentDate}, ${this.currentYear}`;
        monthYearElement.textContent = `${months[this.currentMonth]} ${this.currentYear}`;

        // Update selection of Datepicker Month
        selectionMonthElement.innerHTML = "";
        for (let i = 0; i < months.length; i++) {

            // Set element as active if current iteration matches the current month
            let elementClass;
            if (i === this.currentMonth) elementClass = "kalendaryojs-item is-active";
            else elementClass = "kalendaryojs-item";

            selectionMonthElement.innerHTML += `<a href="javascript:void(0)" class="${elementClass}">${months[i]}</a>`;
        }

        // Update selection of Datepicker Year
        selectionYearElement.innerHTML = `<a href="javascript:void(0)" class="kalendaryojs-item is-active">${this.currentYear}</a>`;
        generateYears(selection_year_count, false, selectionYearElement);
        generateYears(selection_year_count, true, selectionYearElement);

        // Update header for days in a week
        const daysHeaderElement = document.getElementById(`${this.id}DatepickerDaysHeader`);
        daysHeaderElement.innerHTML = "";
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            daysHeaderElement.innerHTML += `<th>${day.substring(0, 3)}</th>`;
        }

        // Generate initial datepicker value
        valueElement.value = generateValue(this.currentYear, this.currentMonth, this.currentDate);

        // Generate days based on the initial values provided
        generateDays(this.currentYear, this.currentMonth, valueElement.value, daysBodyElement);


        // ---------------------------------------
        // 🦋. Event handlers here
        // ---------------------------------------

        // EVENT: Datepicker is clicked
        datepickerElement.onclick = (event) => {
            event.stopPropagation();
            if (!datepickerElement.classList.contains("is-active") && !datepickerElement.classList.contains("is-disabled")) {

                // Close the previously opened datepicker if any
                const activeDatepicker = document.querySelector(".dropdown.kalendaryojs.is-active");
                if (activeDatepicker) activeDatepicker.classList.remove("is-active");

                // Display calendar again if selection month and year are shown
                if (!selectionElement.classList.contains("is-hidden")) {
                    headerElement.classList.remove("is-hidden");
                    selectionElement.classList.add("is-hidden");
                    tableElement.classList.remove("is-hidden");
                }

                // Display current calendar if ever value was not changed but moved forward or backward
                if (generateValue(this.currentYear, this.currentMonth, this.currentDate) !== valueElement.value) {
                    const values = valueElement.value.split("-");
                    this.currentYear = parseInt(values[0]);
                    this.currentMonth = parseInt(values[1]) - 1; // Subtract by 1 to make it an index
                    this.currentDate = parseInt(values[2]);

                    dateElement.textContent = `${months[this.currentMonth].substring(0, 3)}. ${this.currentDate}, ${this.currentYear}`;
                    monthYearElement.textContent = `${months[this.currentMonth]} ${this.currentYear}`;
                    generateDays(this.currentYear, this.currentMonth, valueElement.value, daysBodyElement);
                }

                datepickerElement.classList.add("is-active");
            } else {
                datepickerElement.classList.remove("is-active");
            }
        };

        // EVENT: Datepicker Content is clicked
        document.getElementById(`${this.id}DatepickerContent`).onclick = (event) => {
            event.stopPropagation();
        };

        // EVENT: Datepicker Period is clicked
        document.getElementById(`${this.id}DatepickerPeriod`).onclick = () => {
            headerElement.classList.add("is-hidden");
            selectionElement.classList.remove("is-hidden");
            tableElement.classList.add("is-hidden");

            // Align scroll of Datepicker Month to the active month item
            const activeSelectionMonthItem = selectionMonthElement.querySelector("a.kalendaryojs-item.is-active");
            selectionMonthElement.scrollTop = activeSelectionMonthItem.offsetTop;

            // Align scroll of Datepicker Year to the active year item
            const activeSelectionYearItem = selectionYearElement.querySelector("a.kalendaryojs-item.is-active");
            selectionYearElement.scrollTop = activeSelectionYearItem.offsetTop;
        };

        // EVENT: Datepicker Prev is clicked
        // NOTE: Include this event only if option prevIcon is defined
        if (this.option && this.option.prevIcon) {
            document.getElementById(`${this.id}DatepickerPrev`).onclick = () => {

                // If current month is not January then show previous month,
                // Else show December of previous year
                if (this.currentMonth > 0) {
                    this.currentMonth -= 1;
                } else {
                    this.currentMonth = 11;
                    this.currentYear -= 1;
                }

                // Set date to first date of the month
                this.currentDate = 1;

                monthYearElement.textContent = `${months[this.currentMonth]} ${this.currentYear}`;
                refreshSelectionMonthActive(this.currentMonth, selectionMonthElement);
                refreshSelectionYearActive(this.currentYear, selectionYearElement);
                generateDays(this.currentYear, this.currentMonth, valueElement.value, daysBodyElement);
            };
        }

        // EVENT: Datepicker Today is clicked
        // NOTE: Include this event only if option today is set to true
        if (this.option && this.option.today) {
            document.getElementById(`${this.id}DatepickerToday`).onclick = () => {

                // Set to current date
                const today = new Date();
                this.currentYear = today.getFullYear();
                this.currentMonth = today.getMonth();
                this.currentDate = today.getDate();

                monthYearElement.textContent = `${months[this.currentMonth]} ${this.currentYear}`;
                refreshSelectionMonthActive(this.currentMonth, selectionMonthElement);
                refreshSelectionYearActive(this.currentYear, selectionYearElement);
                generateDays(this.currentYear, this.currentMonth, valueElement.value, daysBodyElement);
            };
        }

        // EVENT: Datepicker Next is clicked
        // NOTE: Include this event only if option nextIcon is defined
        if (this.option && this.option.nextIcon) {
            document.getElementById(`${this.id}DatepickerNext`).onclick = () => {

                // If current month is not December then show next month,
                // Else show January of next year
                if (this.currentMonth < 11) {
                    this.currentMonth += 1;
                } else {
                    this.currentMonth = 0;
                    this.currentYear += 1;
                }

                // Set date to first date of the month
                this.currentDate = 1;

                monthYearElement.textContent = `${months[this.currentMonth]} ${this.currentYear}`;
                refreshSelectionMonthActive(this.currentMonth, selectionMonthElement);
                refreshSelectionYearActive(this.currentYear, selectionYearElement);
                generateDays(this.currentYear, this.currentMonth, valueElement.value, daysBodyElement);
            };
        }

        // EVENT: Datepicker Month is clicked
        selectionMonthElement.onclick = (event) => {
            if (event.target && event.target.tagName === "A") {
                const datepickerMonthItem = event.target;

                // Retrieve month from the selected element's text
                const month = months.indexOf(datepickerMonthItem.textContent);

                // If selected element is not active and doesn't match the current month then proceed
                if (!datepickerMonthItem.classList.contains("is-active") && month !== this.currentMonth) {

                    // Update current month
                    this.currentMonth = month;

                    // Set date to first date of the month
                    this.currentDate = 1;

                    // Remove active indicator of previously selected element
                    const activeDatepickerMonthItem = selectionMonthElement.querySelector("a.kalendaryojs-item.is-active");
                    activeDatepickerMonthItem.classList.remove("is-active");

                    // Mark the newly selected element as active
                    datepickerMonthItem.classList.add("is-active");

                    monthYearElement.textContent = `${months[this.currentMonth]} ${this.currentYear}`;
                    generateDays(this.currentYear, this.currentMonth, valueElement.value, daysBodyElement);
                }

                headerElement.classList.remove("is-hidden");
                selectionElement.classList.add("is-hidden");
                tableElement.classList.remove("is-hidden");
            }
        };

        // EVENT: Datepicker Year is clicked
        selectionYearElement.onclick = (event) => {
            if (event.target && event.target.tagName === "A") {
                const datepickerYearItem = event.target;

                // Retrieve year from the selected element's text
                const year = parseInt(datepickerYearItem.textContent);

                // If selected element is not active and doesn't match the current year then proceed
                if (!datepickerYearItem.classList.contains("is-active") && year !== this.currentYear) {

                    // Update current year
                    this.currentYear = year;

                    // Set date to first date of the month
                    this.currentDate = 1;

                    // Remove active indicator of previously selected element
                    const activeDatepickerYearItem = selectionYearElement.querySelector("a.kalendaryojs-item.is-active");
                    activeDatepickerYearItem.classList.remove("is-active");

                    // Mark the newly selected element as active
                    datepickerYearItem.classList.add("is-active");

                    monthYearElement.textContent = `${months[this.currentMonth]} ${this.currentYear}`;
                    generateDays(this.currentYear, this.currentMonth, valueElement.value, daysBodyElement);
                }

                headerElement.classList.remove("is-hidden");
                selectionElement.classList.add("is-hidden");
                tableElement.classList.remove("is-hidden");
            }
        };

        // EVENT: Datepicker Year is scrolled
        selectionYearElement.onscroll = () => {

            // If Datepicker Year is scrolled to its max top then generate previous years,
            // Else If Datepicker Year is scrolled to its max bottom then generate next years
            if (selectionYearElement.scrollTop === 0) {
                generateYears(selection_year_count, false, selectionYearElement);

                // Align scroll to the last item scrolled at by the user
                const datepickerYearItem = selectionYearElement.querySelector("a.kalendaryojs-item");
                selectionYearElement.scrollTop += (datepickerYearItem.offsetHeight * selection_year_count);

            } else if ((selectionYearElement.scrollTop + selectionYearElement.offsetHeight) === selectionYearElement.scrollHeight) {
                generateYears(selection_year_count, true, selectionYearElement);
            }
        };

        // EVENT: Datepicker Days Body is clicked
        daysBodyElement.onclick = (event) => {
            if (event.target && event.target.tagName === "A") {
                const datepickerDateItem = event.target;

                // Retrieve date from the selected element's text
                const date = parseInt(datepickerDateItem.textContent);

                // If selected element is not active then proceed
                if (!datepickerDateItem.classList.contains("is-active")) {

                    // Update current date
                    this.currentDate = date;

                    // Remove active indicator of previously selected element
                    const activeDatepickerDateItem = daysBodyElement.querySelector("a.is-active");
                    if (activeDatepickerDateItem) activeDatepickerDateItem.classList.remove("is-active");

                    // Mark the newly selected element as active
                    datepickerDateItem.classList.add("is-active");

                    dateElement.textContent = `${months[this.currentMonth].substring(0, 3)}. ${this.currentDate}, ${this.currentYear}`;
                    valueElement.value = generateValue(this.currentYear, this.currentMonth, this.currentDate);

                    // Inform event listeners of the change that happened
                    valueElement.dispatchEvent(new Event("change"));
                }
            }
        };
    }

    /**
     * Sets the value of this datepicker's instance.
     *
     * @param   {String}    value
     *                      The new value for this datepicker.
     *                      [REQUIRED]
     */
    setValue(value) {

        //- VALIDATE: [value] - Required
        if (!value) throw new Error("value is required");
        if (typeof value !== "string") throw new Error("value must be a string");

        const values = value.split("-");
        this.currentYear = parseInt(values[0]);
        this.currentMonth = parseInt(values[1]) - 1; // Subtract by 1 to make it an index
        this.currentDate = parseInt(values[2]);

        // Retrieve the following Datepicker elements
        const dateElement = document.getElementById(`${this.id}DatepickerDate`);
        const monthYearElement = document.getElementById(`${this.id}DatepickerMonthYear`);
        const selectionMonthElement = document.getElementById(`${this.id}DatepickerMonth`);
        const selectionYearElement = document.getElementById(`${this.id}DatepickerYear`);
        const daysBodyElement = document.getElementById(`${this.id}DatepickerDaysBody`);
        const valueElement = document.getElementById(`${this.id}DatepickerValue`);

        // Update Datepicker Selection Year to accommodate the missing years
        const selectionYearItems = selectionYearElement.querySelectorAll("a.kalendaryojs-item");
        const firstYear = parseInt(selectionYearItems[0].textContent);
        const lastYear = parseInt(selectionYearItems[selectionYearItems.length - 1].textContent);
        if (this.currentYear < firstYear) generateYears((firstYear - this.currentYear) + selection_year_count, false, selectionYearElement);
        else if (this.currentYear > lastYear) generateYears((this.currentYear - lastYear) + selection_year_count, true, selectionYearElement);

        dateElement.textContent = `${months[this.currentMonth].substring(0, 3)}. ${this.currentDate}, ${this.currentYear}`;
        monthYearElement.textContent = `${months[this.currentMonth]} ${this.currentYear}`;
        refreshSelectionMonthActive(this.currentMonth, selectionMonthElement);
        refreshSelectionYearActive(this.currentYear, selectionYearElement);
        valueElement.value = generateValue(this.currentYear, this.currentMonth, this.currentDate);
        generateDays(this.currentYear, this.currentMonth, valueElement.value, daysBodyElement);
    }

    //- STATIC METHODS -----------------------------

    static validate(param) {

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

        //- VALIDATE: [param.value] - Optional
        if (param.value && typeof param.value !== "string") throw new Error("param.value must be a string");

        //- VALIDATE: [param.option] - Optional
        if (param.option && typeof param.option !== "object") throw new Error("param.option must be an object");

        //- VALIDATE: [param.option.prevIcon] - Optional
        if (param.option && param.option.prevIcon && typeof param.option.prevIcon !== "string") throw new Error("param.option.prevIcon must be a string");

        //- VALIDATE: [param.option.nextIcon] - Optional
        if (param.option && param.option.nextIcon && typeof param.option.nextIcon !== "string") throw new Error("param.option.nextIcon must be a string");

        //- VALIDATE: [param.option.today] - Optional
        if (param.option && param.option.today && typeof param.option.today !== "boolean") throw new Error("param.option.today must be a boolean");
    }
}


// Expose
export default KalendaryoJS;


/**
 * Generate the years forward or backward from the given year
 *
 * @param   {Number}    count
 * @param   {Boolean}   isNext
 * @param   {Element}   datepickerYear
 */
const generateYears = (count, isNext, datepickerYear) => {

    // Retrieve selection of years
    const datepickerYearItems = datepickerYear.querySelectorAll("a.kalendaryojs-item");

    // Extract year from selection
    let datepickerYearItem, year;
    if (isNext) datepickerYearItem = datepickerYearItems[datepickerYearItems.length - 1];
    else datepickerYearItem = datepickerYearItems[0];
    year = parseInt(datepickerYearItem.textContent);

    // Generate years forward or backward depending on the params set
    const years = [];
    for (let i = 0; i < count; i++) {
        if (isNext) {
            years.push(year += 1);
        } else {
            if (year !== 0) years.push(year -= 1);
            else break;
        }
    }

    // Loop and create Calendar Picker Item for each year
    for (let i = 0; i < years.length; i++) {
        const anchor = document.createElement("a");
        anchor.href = "javascript:void(0)";
        anchor.classList = "kalendaryojs-item";
        anchor.textContent = years[i];

        // Identify where to place the element
        if (isNext) datepickerYear.append(anchor);
        else datepickerYear.prepend(anchor);
    }
};


/**
 * Generate the days of a given month and year in calendar format
 *
 * @param   {Number}    year
 * @param   {Number}    month
 * @param   {String}    value
 * @param   {Element}   tableBody
 */
const generateDays = (year, month, value, tableBody) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get date today for reference purposes
    const today = new Date();

    // Sometimes the first day of the month doesn't start at Sunday
    let offset = firstDay.getDay();

    // Render the days in calendar format
    let dayCount = 1;
    tableBody.innerHTML = "";
    for (let i = 0; i < 6; i++) {

        // If the count hasn't surpassed the last date then continue rendering the days,
        // Else stop and don't proceed further
        if (dayCount <= lastDay.getDate()) {

            const tableRow = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                const tableData = document.createElement("td");

                // If the first count starts at Sunday then simply render it,
                // Else keep adding spacing until it aligns on its designated day
                if (offset === 0) {

                    // If the count surpasses the last date then stop and don't proceed further
                    if (dayCount > lastDay.getDate()) break;

                    const anchor = document.createElement("a");
                    anchor.href = "javascript:void(0)";
                    anchor.textContent = dayCount;

                    // Mark anchor as "active" if generated reference value matches the current datepicker value
                    let refValue = generateValue(year, month, dayCount);
                    if (refValue === value) anchor.classList.add("is-active");

                    // Mark anchor as "today" if provided date matches the date today
                    if (year === today.getFullYear() && month === today.getMonth() && dayCount === today.getDate()) anchor.classList.add("is-today");

                    tableData.appendChild(anchor);
                    tableRow.appendChild(tableData);

                    // Increment the count
                    dayCount++;

                } else {
                    tableRow.appendChild(tableData);
                    offset--;
                }
            }
            tableBody.appendChild(tableRow);

        } else {
            break;
        }
    }
};


/**
 * Generate datepicker value given the year, month, and date
 *
 * @param   {Number}    year
 * @param   {Number}    month
 * @param   {Number}    date
 *
 * @return  {String}    value
 */
const generateValue = (year, month, date) => {
    const datepickerMonth = month + 1; // Increment by 1 since this is an index

    // Extract value for month
    // NOTE: Month must be double digit
    let valueMonth;
    if (datepickerMonth < 10) valueMonth = "0" + datepickerMonth;
    else valueMonth = datepickerMonth;

    // Extract value for date
    // NOTE: Date must be double digit
    let valueDate;
    if (date < 10) valueDate = "0" + date;
    else valueDate = date;

    let value = `${year}-${valueMonth}-${valueDate}`;
    return value;
};


/**
 * Refresh Datepicker Month to see the new active item
 *
 * @param   {Number}    month
 * @param   {Element}   datepickerMonth
 */
const refreshSelectionMonthActive = (month, datepickerMonth) => {

    // Remove active indicator of previously selected month
    const activeSelectionMonthItem = datepickerMonth.querySelector("a.kalendaryojs-item.is-active");
    activeSelectionMonthItem.classList.remove("is-active");

    // Loop until we find the element that matches the current month and mark it as active
    const datepickerMonthItems = datepickerMonth.querySelectorAll("a.kalendaryojs-item");
    for (let i = 0; i < datepickerMonthItems.length; i++) {
        const datepickerMonthItem = datepickerMonthItems[i];
        const valueMonth = months.indexOf(datepickerMonthItem.textContent);
        if (valueMonth === month) {
            datepickerMonthItem.classList.add("is-active");
            break;
        }
    }
};


/**
 * Refresh Datepicker Year to see the new active item
 *
 * @param   {Number}    year
 * @param   {Element}   datepickerYear
 */
const refreshSelectionYearActive = (year, datepickerYear) => {

    // Remove active indicator of previously selected year
    const activeSelectionYearItem = datepickerYear.querySelector("a.kalendaryojs-item.is-active");
    activeSelectionYearItem.classList.remove("is-active");

    // Loop until we find the element that matches the current year and mark it as active
    const datepickerYearItems = datepickerYear.querySelectorAll("a.kalendaryojs-item");
    for (let i = 0; i < datepickerYearItems.length; i++) {
        const datepickerYearItem = datepickerYearItems[i];
        const valueYear = parseInt(datepickerYearItem.textContent);
        if (valueYear === year) {
            datepickerYearItem.classList.add("is-active");
            break;
        }
    }
};
