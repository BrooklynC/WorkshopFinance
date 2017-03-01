////VALUATION - BAR

//Switch between millions and billions in football
Template.registerHelper('scaleSwitch', function(footballId) {
    var football = Footballs.findOne({_id:footballId});
    var footballScale = football.footballScale;
    var footballOutput = football.footballOutput;
    if(footballOutput == "Enterprise Value") {
        switch(footballScale) {
            case "millions":
                return 1;
                break;
            case "billions":
                return 1000;
                break;
        }
    }
    else {
        return 1;
    }
});

//Calculates high and low value of valuation bar
Template.registerHelper('valuationLowHigh',function(footballId) {
    var football = Footballs.findOne({_id:footballId});
    var footballSpread = football.footballSpread;

    var valuationId = Template.parentData(0)._id;
    var valuationActive = UI._globalHelpers.resultValue(footballId, valuationId);

    return {
        valuationLow: valuationActive * (1 - (footballSpread / 100)),
        valuationHigh: valuationActive * (1 + (footballSpread / 100))
    };
});

//Uses high and low values from above to calculate values needed by d3 for valuation bar
Template.registerHelper('valuationCalcs',function(footballId) {
    var footballRangeLow = getRangeCaps(footballId).min;
    var footballRangeHigh = getRangeCaps(footballId).max;
    var footballRange = footballRangeHigh - footballRangeLow;

    var valuationLow = UI._globalHelpers.valuationLowHigh(footballId).valuationLow;
    var valuationHigh = UI._globalHelpers.valuationLowHigh(footballId).valuationHigh;
    var valuationRange = valuationHigh - valuationLow;
    var valuationStart = valuationLow - footballRangeLow;
    var valuationEnd = valuationStart + valuationRange;

    if(footballRange) {
        return {
            startPct: valuationStart / footballRange * 100,
            widthPct: valuationRange / footballRange * 100,
            endPct: valuationEnd / footballRange * 100
        };
    }
});

//Calculate values and spaces for labels for valuation bar
Template.registerHelper('valuationText',function(footballId) {
    var valuationStartPct = UI._globalHelpers.valuationCalcs(footballId).startPct;
    var valuationEndPct = UI._globalHelpers.valuationCalcs(footballId).endPct;

    var textSpace = 0.5;
    var scaleSwitch = UI._globalHelpers.scaleSwitch(footballId);

    var valuationLow = UI._globalHelpers.valuationLowHigh(footballId).valuationLow;
    var valuationHigh = UI._globalHelpers.valuationLowHigh(footballId).valuationHigh;

    return {
        valuationLowSpace: valuationStartPct - textSpace,
        valuationHighSpace: valuationEndPct + textSpace,
        valuationLowText: valuationLow / scaleSwitch,
        valuationHighText: valuationHigh / scaleSwitch
    }
});
