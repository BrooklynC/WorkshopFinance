Template.ValuationResultsBuild.events({
    'change .build-selection': function(e) {
        e.preventDefault();

        var currentValuationId = this._id;
        var selection = $(e.target).val();

        Meteor.call('valuationBuildSelect', currentValuationId, selection, function(error, result) {});
    }
});

Template.ValuationResultsBuild.helpers({
    isCompany: function() {
        var marketType = this.marketType;
        if(marketType == "company") {
            return true;
        }
    },
    isComps: function() {
        var type = this.valuationType;
        if(type == "comps" || type == "models") {
            return true;
        }
    },
    selectedEvRevLtm: function() {
        var valuationMetric = this.valuationMetric;
        var valuationPeriod = this.valuationPeriod;
        if(valuationMetric == "EV/Revenue" && valuationPeriod == "LTM") {
            return "selected";
        }
    },
    selectedEvRevFy1: function() {
        var valuationMetric = this.valuationMetric;
        var valuationPeriod = this.valuationPeriod;
        if(valuationMetric == "EV/Revenue" && valuationPeriod == "FY1") {
            return "selected";
        }
    },
    selectedEvRevFy2: function() {
        var valuationMetric = this.valuationMetric;
        var valuationPeriod = this.valuationPeriod;
        if (valuationMetric == "EV/Revenue" && valuationPeriod == "FY2") {
            return "selected";
        }
    },
    selectedEvEbitdaLtm: function() {
        var valuationMetric = this.valuationMetric;
        var valuationPeriod = this.valuationPeriod;
        if(valuationMetric == "EV/EBITDA" && valuationPeriod == "LTM") {
            return "selected";
        }
    },
    selectedEvEbitdaFy1: function() {
        var valuationMetric = this.valuationMetric;
        var valuationPeriod = this.valuationPeriod;
        if(valuationMetric == "EV/EBITDA" && valuationPeriod == "FY1") {
            return "selected";
        }
    },
    selectedEvEbitdaFy2: function() {
        var valuationMetric = this.valuationMetric;
        var valuationPeriod = this.valuationPeriod;
        if(valuationMetric == "EV/EBITDA" && valuationPeriod == "FY2") {
            return "selected";
        }
    },
    selectedPriceEarningsLtm: function() {
        var valuationMetric = this.valuationMetric;
        var valuationPeriod = this.valuationPeriod;
        if(valuationMetric == "Price/Earnings" && valuationPeriod == "LTM") {
            return "selected";
        }
    },
    selectedPriceEarningsFy1: function() {
        var valuationMetric = this.valuationMetric;
        var valuationPeriod = this.valuationPeriod;
        if(valuationMetric == "Price/Earnings" && valuationPeriod == "FY1") {
            return "selected";
        }
    },
    selectedPriceEarningsFy2: function() {
        var valuationMetric = this.valuationMetric;
        var valuationPeriod = this.valuationPeriod;
        if(valuationMetric == "Price/Earnings" && valuationPeriod == "FY2") {
            return "selected";
        }
    },
    selectedEvRevFy0: function() {
        var valuationMetric = this.valuationMetric;
        var valuationPeriod = this.valuationPeriod;
        if(valuationMetric == "EV/Revenue" && valuationPeriod == "FY0") {
            return "selected";
        }
    },
    selectedEvAttendFy0: function() {
        var valuationMetric = this.valuationMetric;
        var valuationPeriod = this.valuationPeriod;
        if(valuationMetric == "EV/Attendance" && valuationPeriod == "FY0") {
            return "selected";
        }
    }
});