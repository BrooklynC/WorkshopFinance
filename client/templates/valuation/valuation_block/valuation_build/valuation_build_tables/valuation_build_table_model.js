Template.ValuationBuildTableModel.events ({
    'click .btn-remove': function(e) {
        e.preventDefault();

        var currentValuationId = Template.parentData(0)._id;
        var currentSelection = this._id;

        var ownerId = Template.parentData(1).ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            if (confirm("Delete this comp?")) {
                Meteor.call('valuationBuildPull', currentUserId, currentValuationId, currentSelection, function(error, result) {
                });
            }
        }
    }
});

Template.ValuationBuildTableModel.helpers({
    selections: function() {
        //Changes cursor used to display selections depending on valuationType and valuationElement
        var valuationSelections = this.valuationSelections;
        return Models.find({_id: {$in: valuationSelections}});
    },
    modelStat: function() {
        var stat = this.values.stat;
        switch(stat) {
            case "enterpriseValue":
                return "Enterprise Value";
                break;
            case "pricePerShare":
                return "Price per Share";
                break;
            case "evRevenueLtm":
                return "EV/Revenue (LTM)";
                break;
            case "evRevenueFy1":
                return "EV/Revenue (FY1)";
                break;
            case "evRevenueFy2":
                return "EV/Revenue (FY2)";
                break;
            case "evEbitdaLtm":
                return "EV/EBITDA (LTM)";
                break;
            case "evEbitdaFy1":
                return "EV/EBITDA (FY1)";
                break;
            case "evEbitdaFy2":
                return "EV/EBITDA (FY2)";
                break;
            case "priceEarningsLtm":
                return "Price/Earnings (LTM)";
                break;
            case "priceEarningsFy1":
                return "Price/Earnings (FY1)";
                break;
            case "priceEarningsFy2":
                return "Price/Earnings (FY2)";
                break;
        }
    },
    modelValue: function() {
        var stat = this.values.stat;
        switch(stat) {
            case "enterpriseValue":
                var scale = Template.parentData(2).footballScale;
                switch(scale) {
                    case "millions":
                        return this.values.enterpriseValue;
                        break;
                    case "billions":
                        return this.values.enterpriseValue / 1000;
                        break;
                }
                break;
            case "pricePerShare":
                return this.values.pricePerShare;
                break;
            case "evRevenueLtm":
                return this.values.evRevenueLtm;
                break;
            case "evRevenueFy1":
                return this.values.evRevenueFy1;
                break;
            case "evRevenueFy2":
                return this.values.evRevenueFy2;
                break;
            case "evEbitdaLtm":
                return this.values.evEbitdaLtm;
                break;
            case "evEbitdaFy1":
                return this.values.evEbitdaFy1;
                break;
            case "evEbitdaFy2":
                return this.values.evEbitdaFy2;
                break;
            case "priceEarningsLtm":
                return this.values.priceEarningsLtm;
                break;
            case "priceEarningsFy1":
                return this.values.priceEarningsFy1;
                break;
            case "priceEarningsFy2":
                return this.values.priceEarningsFy2;
                break;
        }
    },
    modelImplied: function() {
        var footballOutput = Template.parentData(2).footballOutput;
        var valuationMetric = Template.parentData(1).valuationMetric;
        var valuationPeriod = Template.parentData(1).valuationPeriod;
        switch(footballOutput) {
            case "Enterprise Value":
                var scale = Template.parentData(2).footballScale;
                switch(scale) {
                    case "millions":
                        return this.values.enterpriseValue;
                        break;
                    case "billions":
                        return this.values.enterpriseValue / 1000;
                        break;
                }
                break;
            case "Price per Share":
                return this.values.pricePerShare;
                break;
            case "Multiple":
                switch (valuationMetric) {
                    case "EV/Revenue":
                        switch(valuationPeriod) {
                            case "LTM":
                                return this.values.evRevenueLtm;
                                break;
                            case "FY1":
                                return this.values.evRevenueFy1;
                                break;
                            case "FY2":
                                return this.values.evRevenueFy2;
                                break;
                        }
                        break;
                    case "EV/EBITDA":
                        switch(valuationPeriod) {
                            case "LTM":
                                return this.values.evEbitdaLtm;
                                break;
                            case "FY1":
                                return this.values.evEbitdaFy1;
                                break;
                            case "FY2":
                                return this.values.evEbitdaFy2;
                                break;
                        }
                        break;
                    case "Price/Earnings":
                        switch(valuationPeriod) {
                            case "LTM":
                                return this.values.priceEarningsLtm;
                                break;
                            case "FY1":
                                return this.values.priceEarningsFy1;
                                break;
                            case "FY2":
                                return this.values.priceEarningsFy2;
                                break;

                        }
                        break;
                }
                break;
        }
    },
    modelCurrency: function() {
        var stat = this.values.stat;
        if(stat == "enterpriseValue" || stat == "pricePerShare") {
            return "$";
        } else {
            return "";
        }
    },
    modelFormat: function(a) {
        var stat = this.values.stat;
        if(stat === "pricePerShare") {
            return numeral(a).format('0,0.00');
        } else {
            return numeral(a).format('0,0.0');
        }
    },
    modelMultiple: function() {
        var stat = this.values.stat;
        if(stat == "enterpriseValue" || stat == "pricePerShare") {
            return "";
        } else {
            return "x";
        }
    },
    modelImpliedCurrency: function() {
        var footballOutput = Template.parentData(2).footballOutput;
        switch(footballOutput) {
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
    },
    modelImpliedFormat: function(a) {
        var footballOutput = Template.parentData(2).footballOutput;
        if(footballOutput === "Price per Share") {
            return numeral(a).format('0,0.00');
        } else {
            return numeral(a).format('0,0.0');
        }
    },
    modelImpliedMultiple: function() {
        var footballOutput = Template.parentData(2).footballOutput;
        switch(footballOutput) {
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
    },
    result: function() {
        var footballId = Template.parentData(1)._id;
        var football = Footballs.findOne({_id:footballId});
        var output = football.footballOutput;
        var valuationId = this._id;
        var valuationSelections = this.valuationSelections;
        var scaleAdjust = getScale(footballId);
        if (valuationSelections.length > 0) {
            var valuationType = this.valuationType;
            if (valuationType == "comps" || valuationType == "deals" || valuationType == "models") {
                if (output == "Enterprise Value") {
                    return getResultValue(footballId, valuationId) / scaleAdjust;
                } else {
                    return getResultValue(footballId, valuationId);
                }
            } else {
                var existingCustom = this.existingCustom;
                if(existingCustom == "customValue") {
                    return getResultValue(footballId, valuationId) / scaleAdjust;
                } else {
                    return getResultValue(footballId, valuationId);
                }
            }
        }
    }
});

