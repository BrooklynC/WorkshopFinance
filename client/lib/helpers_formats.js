////GENERAL FORMATS

//Format with one decimal
Template.registerHelper('fixedOne', function(a) {
    return a.toFixed(1);
});

//Format with two decimals
Template.registerHelper('fixedTwo', function(a) {
    return a.toFixed(2);
});

//Format with no decimals for attendance figures
Template.registerHelper('simpleAttendanceFormat', function(a) {
    var b = a * 1000000;
    return numeral(b).format('0,0');
});

//Format with $ and one decimal for financial statement figures
Template.registerHelper('financialFormat', function(a) {
    return numeral(a).format('$0,0.0');
});

//Format with $ and two decimals for stock price
Template.registerHelper('priceFormat', function(a) {
    return numeral(a).format('$0,0.00');
});

//Format with one decimal and no currency sign for # of shares
Template.registerHelper('sharesFormat', function(a) {
    return numeral(a).format('0,0.0');
});

//Format with one decimal and no currency sign for multiples
Template.registerHelper('multipleFormat', function(a) {
    return numeral(a).format('0,0.0');
});

//Format to capitalize first letter
Template.registerHelper('capitalizeOne', function(a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
});

//Formal date format
Template.registerHelper('dateFormal', function(a) {
    return moment(a).format('MMMM Do, YYYY');
});

//Abbreviated date format
Template.registerHelper('dateAbbrev', function(a) {
    return moment(a).format('MM-DD-YY');
});

//Abbreviated date format for Comps valuation
Template.registerHelper('dateAbbrevComp', function(a) {
    var valuationType = this.valuationType;
    if(valuationType == "comps") {
        return moment(a).format('MM/DD/YY');
    }
});

////VALUATION TABLE FORMATS

//Format for multiple shown for selection in Valuation Table
Template.registerHelper('divideSelect', function(a, b) {
    var valuationMetric = Template.parentData(1).valuationMetric;
    switch(valuationMetric) {
        case "EV/Revenue":
            var result1 = a / b;
            if(result1 >= 0 || result1 <= 0) {
                var r1 = result1.toFixed(1);
                return numeral(r1).format('0,0.0');
            }
            break;
        case "EV/EBITDA":
            var result2 = a / b;
            if(result2 >= 0 || result2 <= 0) {
                var r2 = result2.toFixed(1);
                return numeral(r2).format('0,0.0');
            }
            break;
        case "EV/Attendance":
            var result3 = a / b * 1000000;
            if(result3 >= 0 || result3 <= 0) {
                var r3 = result3.toFixed(1);
                return numeral(r3).format('0,0.0');
            }
            break;
        case "P/E":
            var result4 = a / b;
            if(result4 >= 0 || result4 <= 0) {
                var r4 = result4.toFixed(1);
                return numeral(r4).format('0,0.0');
            }
            break;
    }
});

//Format for valuation table - Models
Template.registerHelper('modelValueFormat', function(a) {
    var footballOutput = Template.parentData(1).footballOutput;
    if(footballOutput == "Price per Share") {
        return numeral(a).format('0,0.00');
    } else {
        return numeral(a).format('0,0.0');
    }
});

//Format for valuation table - Custom
Template.registerHelper('customValueFormat', function(a) {
    var customStat = this.existingCustom;
    if(customStat == "Price") {
        return numeral(a).format('0,0.00');
    } else {
        return numeral(a).format('0,0.0');
    }
});

//Format for values in Football range, depends on footballType
Template.registerHelper('rangeFormat', function(a) {
    var footballId = this._id;
    var footballOutput = this.footballOutput;
    var max = getRangeCaps(footballId).max;
    if(max > 0) {
        switch (footballOutput) {
            case "Enterprise Value":
                return numeral(a).format('$0,0');
                break;
            case "Price per Share":
                return numeral(a).format('$0,0');
                break;
            case "Multiple":
                return numeral(a).format('0,0.0');
                break;
        }
    }
});

//Format for multiples in Football range
Template.registerHelper('footballMultiple', function() {
    var footballId = this._id;
    var footballOutput = this.footballOutput;
    var max = getRangeCaps(footballId).max;
    if(max > 0) {
        switch (footballOutput) {
            case "Enterprise Value":
                return "";
                break;
            case "Price per Share":
                return "";
                break;
            case "Multiple":
                return "x";
                break;
        }
    }
});

//Format for d3 data labels
Template.registerHelper('barFormat', function(footballId) {
    var footballOutput = Footballs.findOne({_id:footballId}).footballOutput;
    switch (footballOutput) {
        case "Enterprise Value":
            return d3.format(",.1f");
            break;
        case "Price per Share":
            return d3.format(",.2f");
            break;
        case "Multiple":
            return d3.format(",.1f");
            break;
    }
});

//Format for currency symbols in d3 data labels
Template.registerHelper('symCurrency', function(footballId) {
    var footballOutput = Footballs.findOne({_id:footballId}).footballOutput;
    switch (footballOutput) {
        case "Enterprise Value":
            return "$";
            break;
        case "Price per Share":
            return "$";
            break;
        case "Multiple":
            return "";
            break;
    }
});

//Format for multiples in d3 data labels
Template.registerHelper('symMultiple', function(footballId) {
    var footballOutput = Footballs.findOne({_id:footballId}).footballOutput;
    switch (footballOutput) {
        case "Enterprise Value":
            return "";
            break;
        case "Price per Share":
            return "";
            break;
        case "Multiple":
            return "x";
            break;
    }
});

//Format for value in Results based on footballOutput
Template.registerHelper('resultFormat', function(a) {
    var footballOutput = Template.parentData(1).footballOutput;
    var valuationSelections = this.valuationSelections;
    var valuationType = this.valuationType;

    if(valuationSelections.length > 0) {
        if(valuationType == "comps" || valuationType == "deals" || valuationType == "models") {
            switch (footballOutput) {
                case "Enterprise Value":
                    return numeral(a).format('$0,0.0');
                    break;
                case "Price per Share":
                    return numeral(a).format('$0,0.00');
                    break;
                case "Multiple":
                    return numeral(a).format('0,0.0');
                    break;
            }
        } else {
            var existingCustom = this.existingCustom;
            switch(existingCustom) {
                case "Value":
                    return numeral(a).format('$0,0.0');
                    break;
                case "Price":
                    return numeral(a).format('$0,0.00');
                    break;
                case "Multiple":
                    return numeral(a).format('0,0.0');
                    break;
            }
        }
    }
});

//Format for multiples in Valuation Results (likely refactor this into a previous helper)
Template.registerHelper('resultMultiple', function() {
    var footballOutput = Template.parentData(1).footballOutput;
    var valuationSelections = this.valuationSelections;
    var valuationType = this.valuationType;
    if(valuationSelections.length > 0) {
        if(valuationType == "comps" || valuationType == "deals" || valuationType == "models") {
            switch (footballOutput) {
                case "Enterprise Value":
                    return "";
                    break;
                case "Price per Share":
                    return "";
                    break;
                case "Multiple":
                    return "x";
                    break;
            }
        } else {
            var existingCustom = this.existingCustom;
            switch(existingCustom) {
                case "Value":
                    return "";
                    break;
                case "Price":
                    return "";
                    break;
                case "Multiple":
                    return "x";
                    break;
            }
        }
    }
});

////THEMES
//Formats for light and dark theme
Template.registerHelper('themeStyle', function() {
    var currentUserId = Meteor.userId();
    var theme = Options.findOne({ownerId:currentUserId}).theme;
    switch(theme) {
        case "light":
            return {
                main: "main-light",

                borderTop: "border-top-light",
                borderBottom: "border-bottom-light",
                border: "border-light",
                borderShaded: "border-shaded-light",
                borderShadedBottom: "border-shaded-bottom-light",
                borderCalendar: "border-calendar-light",

                btnDefault: "btn-default-light",
                formDropdown: "form-dropdown-light",
                formInput: "form-input-light",
                formDate: "form-date-light",

                calendar: "calendar-light",

                barText: "rgba(0, 0, 0, 1)"
            };
            break;
        case "dark":
            return {
                main: "main-dark",

                borderTop: "border-top-dark",
                borderBottom: "border-bottom-dark",
                border: "border-dark",
                borderShaded: "border-shaded-dark",
                borderShadedBottom: "border-shaded-bottom-dark",
                borderCalendar: "border-calendar-dark",

                btnDefault: "btn-default-dark",
                formDropdown: "form-dropdown-dark",
                formInput: "form-input-dark",
                formDate: "form-date-dark",

                calendar: "calendar-dark",

                barText: "rgba(170, 170, 170, 1)"
            };
            break;
    }
});