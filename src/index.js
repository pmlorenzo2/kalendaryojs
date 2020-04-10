
/**
 * Zavin Datepicker -> src -> Index JS
 */


// [Enter description]
class ZavinDatepicker {
    constructor(element, name, label, icon, option) {

        // Validate [element] - Required
        if (!element) throw new Error("element param is required");
        if (typeof element !== "object") throw new Error("element param must be an object");

        // Validate [name] - Required
        if (!name) throw new Error("name param is required");
        if (typeof name !== "string") throw new Error("name param must be a string");

        // Validate optional params
        if (label && typeof label !== "string") throw new Error("label param must be a string");
        if (icon && typeof icon !== "string") throw new Error("icon param must be a string");

        // Validate [option]
        if (option) {
            if (typeof option !== "object") throw new Error("option param must be an object");

            // Validate [option.prevAndNextButton]
            const prevAndNextButton = option.prevAndNextButton;
            if (prevAndNextButton) {
                if (typeof prevAndNextButton !== "object") throw new Error("prevAndNextButton of option param must be an object");

                // Validate [option.prevAndNextButton.prevIcon]
                if (!prevAndNextButton.prevIcon) throw new Error("prevIcon of prevAndNextButton is required");
                if (typeof prevAndNextButton.prevIcon !== "string") throw new Error("prevIcon of prevAndNextButton must be a string");

                // Validate [option.prevAndNextButton.nextIcon]
                if (!prevAndNextButton.nextIcon) throw new Error("nextIcon of prevAndNextButton is required");
                if (typeof prevAndNextButton.nextIcon !== "string") throw new Error("nextIcon of prevAndNextButton must be a string");
            }
        }

        this.element = element;
        this.name = name;
        this.label = label;
        this.icon = icon;
        this.option = option;
    }
}


// Export Class
export { ZavinDatepicker };
