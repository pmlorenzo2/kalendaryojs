# Zavin Datepicker

A simple and custom date picker built for Zavin apps.

## Overview

Zavin Datepicker is built to address the needs of having a widget that can handle user date selection. Even though there is an input date most browsers still don't have support for it. Thus the need to create a custom date picker for our Zavin apps.

## Installation

**Dependency:** Julia CSS

### 1.) Using our server's CDN

Import Zavin Datepicker CSS to your HTML.

```html
<link rel="stylesheet" href="...">
```

Import Zavin Datepicker JS to your script.

```js
import ZavinDatepicker from "...";
```

### 2.) Download a local copy on your machine

Coming soon...

## Sample Usage

```html
<div id="date"></div>
```

```js
const dateDatepicker = new ZavinDatepicker({
    id: "date",
    label: "Date",
    pickerIcon: "YOUR_PICKER_ICON.png",
    value: "2020-01-01",
    option: {
        prevIcon: "YOUR_PREV_ICON.png",
        nextIcon: "YOUR_NEXT_ICON.png",
        today: true
    }
});

// Render your datepicker instance
dateDatepicker.render();
```

## Documentation

### Instantiate Zavin Datepicker

This creates a new instance of Zavin Datepicker.

```js
new ZavinDatepicker(param)
```

- **param** `{Object}`

    This contains the parameters that will be used by Zavin Datepicker. **(Required)**

- **param.id** `{String}`

    Reference to the element this datepicker will be injected into. **(Required)**

- **param.label** `{String}`

    User-defined datepicker label.

- **param.pickerIcon** `{String}`

    Path to the icon for datepicker.

- **param.value** `{String}`

    Initial value for this datepicker. (Follow **YYYY-MM-DD** format)

- **param.option** `{Object}`

    The options this datepicker will have.

- **param.option.prevIcon** `{String}`

    Path to the icon for datepicker prev. (If defined prev option will be available)

- **param.option.nextIcon** `{String}`

    Path to the icon for datepicker next. (If defined next option will be available)

- **param.option.today** `{Boolean}`

    Set to true to make "Today" option available.

### Method: Render

Renders the instance of Zavin Datepicker.

```js
const datepicker = new ZavinDatepicker(...);

datepicker.render();
```

### Method: Set Value

Sets the value of a Zavin Datepicker's instance.

```js
const datepicker = new ZavinDatepicker(...);

datepicker.setValue(value);
```

- **value** `{String}`

    The new value for the given datepicker. **(Required)**
