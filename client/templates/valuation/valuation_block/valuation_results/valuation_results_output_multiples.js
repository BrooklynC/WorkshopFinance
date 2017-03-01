Template.ValuationResultsOutputMultiples.events({
    'change .result-selection': function(e) {
        e.preventDefault();

        var currentValuationId = this._id;
        var selection = $(e.target).val();

        Meteor.call('valuationResultSelect', currentValuationId, selection, function(error, result) {});
    }
});

Template.ValuationResultsOutputMultiples.helpers({
    isCompany: function() {
        var marketType = this.marketType;
        if(marketType == "company") {
            return true;
        }
    },
    isComps: function() {
        var type = this.valuationType;
        if(type == "comps") {
            return true;
        }
    },
    selectedEvRevLtm: function() {
        var valuationOutput = this.valuationOutput;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        if(valuationOutput == "EV/Revenue" && valuationOutputPeriod == "LTM") {
            return "selected";
        }
    },
    selectedEvRevFy1: function() {
        var valuationOutput = this.valuationOutput;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        if(valuationOutput == "EV/Revenue" && valuationOutputPeriod == "FY1") {
            return "selected";
        }
    },
    selectedEvRevFy2: function() {
        var valuationOutput = this.valuationOutput;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        if(valuationOutput == "EV/Revenue" && valuationOutputPeriod == "FY2") {
            return "selected";
        }
    },
    selectedEvEbitdaLtm: function() {
        var valuationOutput = this.valuationOutput;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        if(valuationOutput == "EV/EBITDA" && valuationOutputPeriod == "LTM") {
            return "selected";
        }
    },
    selectedEvEbitdaFy1: function() {
        var valuationOutput = this.valuationOutput;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        if(valuationOutput == "EV/EBITDA" && valuationOutputPeriod == "FY1") {
            return "selected";
        }
    },
    selectedEvEbitdaFy2: function() {
        var valuationOutput = this.valuationOutput;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        if(valuationOutput == "EV/EBITDA" && valuationOutputPeriod == "FY2") {
            return "selected";
        }
    },
    selectedPeLtm: function() {
        var valuationOutput = this.valuationOutput;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        if(valuationOutput == "Price/Earnings" && valuationOutputPeriod == "LTM") {
            return "selected";
        }
    },
    selectedPeFy1: function() {
        var valuationOutput = this.valuationOutput;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        if(valuationOutput == "Price/Earnings" && valuationOutputPeriod == "FY1") {
            return "selected";
        }
    },
    selectedPeFy2: function() {
        var valuationOutput = this.valuationOutput;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        if(valuationOutput == "Price/Earnings" && valuationOutputPeriod == "FY2") {
            return "selected";
        }
    },
    selectedEvRevFy0: function() {
        var valuationOutput = this.valuationOutput;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        if(valuationOutput == "EV/Revenue" && valuationOutputPeriod == "FY0") {
            return "selected";
        }
    },
    selectedEvAttendFy0: function() {
        var valuationOutput = this.valuationOutput;
        var valuationOutputPeriod = this.valuationOutputPeriod;
        if(valuationOutput == "EV/Attendance" && valuationOutputPeriod == "FY0") {
            return "selected";
        }
    }
});