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

```js
new ZavinDatepicker(param)
```

- **param** `Object`
- **param.id** `String`
- **param.label** `String`
- **param.pickerIcon** `String`
- **param.value** `String`
- **param.option** `Object`
- **param.option.prevIcon** `String`
- **param.option.nextIcon** `String`
- **param.option.today** `Boolean`
