////VALUATION TABLE

//Checks scale between millions and billions to adjust values in Valuations Table
getScale = function(footballId) {
    var scale = Footballs.findOne({_id:footballId}).footballScale;
    switch(scale) {
        case "millions":
            return 1;
            break;
        case "billions":
            return 1000;
    }
};

//Checks scale when Valuation Metric is EV/Attendance for a Team
getAttend = function(footballId) {
    var scale = Footballs.findOne({_id:footballId}).footballScale;
    switch(scale) {
        case "millions":
            return 1000000;
            break;
        case "billions":
            return 1000;
    }
};

//Changes Valuation Table Header to show two columns (for public company ticker and name) or one column, for
//deal name or index name
Template.registerHelper('twoColumnHeader', function() {
    var valuationType = this.valuationType;
    var valuationElement = this.valuationElement;
    switch(valuationType) {
        case "comps":
            switch(valuationElement) {
                case "security":
                    return true;
                    break;
                case "index":
                    return false;
                    break;
            }
            break;
        case "deals":
            switch(valuationElement) {
                case "security":
                    return false;
                    break;
                case "index":
                    return false;
                    break;
            }
            break;
    }
});

//Changes Valuation Table to show two columns (for public company ticker and name) or one column, for
//deal name or index name
Template.registerHelper('twoColumn', function() {
    var valuationType = Template.parentData(1).valuationType;
    var valuationElement = Template.parentData(1).valuationElement;
    switch(valuationType) {
        case "comps":
            switch(valuationElement) {
                case "security":
                    return true;
                    break;
                case "index":
                    return false;
                    break;
            }
            break;
        case "deals":
            switch(valuationElement) {
                case "security":
                    return false;
                    break;
                case "index":
                    return false;
                    break;
            }
            break;
    }
});

//Changes Valuation Table to show different layout whether company/deal or index
Template.registerHelper('isSecurity', function() {
    var valuationType = Template.parentData(1).valuationType;
    var valuationElement = Template.parentData(1).valuationElement;
    switch(valuationType) {
        case "comps":
            switch(valuationElement) {
                case "security":
                    return true;
                    break;
                case "index":
                    return false;
                    break;
            }
            break;
        case "deals":
            switch(valuationElement) {
                case "security":
                    return true;
                    break;
                case "index":
                    return false;
                    break;
            }
            break;
    }
});

//Adds Heading of Ticker if public company
Template.registerHelper('headingNameOne', function() {
    var marketType = this.marketType;
    var valuationType = this.valuationType;
    var valuationElement = this.valuationElement;
    switch(marketType) {
        case "company":
            switch(valuationType) {
                case "comps":
                    switch(valuationElement) {
                        case "security":
                            return "Ticker";
                            break;
                        case "index":
                            return '';
                            break;
                    }
                    break;
                case "deals":
                    switch(valuationElement) {
                        case "security":
                            return '';
                            break;
                        case "index":
                            return '';
                            break;
                    }
                    break;
            }
            break;
        case "team":
            switch(valuationType) {
                case "comps":
                    switch(valuationElement) {
                        case "security":
                            return "League";
                            break;
                    }
                    break;
            }
            break;
    }
});

//Changes Heading name depending on criteria
Template.registerHelper('headingNameTwo', function() {
    var marketType = this.marketType;
    var valuationType = this.valuationType;
    var valuationElement = this.valuationElement;
    switch(marketType) {
        case "company":
            switch(valuationType) {
                case "comps":
                    switch(valuationElement) {
                        case "security":
                            return "Company";
                            break;
                        case "index":
                            return "Index";
                            break;
                    }
                    break;
                case "deals":
                    switch(valuationElement) {
                        case "security":
                            return "Deal";
                            break;
                        case "index":
                            return "Index";
                            break;
                    }
                    break;
            }
            break;
        case "team":
            switch(valuationType) {
                case "comps":
                    switch(valuationElement) {
                        case "security":
                            return "Team";
                            break;
                    }
                    break;
            }
            break;
    }
});

//Changes Heading depending on criteria
Template.registerHelper('headingValueOne', function() {
    var valuationMetric = this.valuationMetric;
    switch (valuationMetric) {
        case "EV/Revenue":
            return "EV";
            break;
        case "EV/EBITDA":
            return "EV";
            break;
        case "EV/Attendance":
            return "EV";
            break;
        case "P/E":
            return "Price";
            break;
    }
});

//Changes Heading depending on valuationMetric and valuationPeriod
Template.registerHelper('headingValueTwo', function() {
    var valuationMetric = this.valuationMetric;
    var valuationPeriod = this.valuationPeriod;
    switch (valuationMetric) {
        case "EV/Revenue":
            switch (valuationPeriod) {
                case "LTM":
                    return "Revenue (LTM)";
                    break;
                case "FY0":
                    return "Revenue (FY0)";
                    break;
                case "FY1":
                    return "Revenue (FY1)";
                    break;
                case "FY2":
                    return "Revenue (FY2)";
                    break;
            }
            break;
        case "EV/EBITDA":
            switch (valuationPeriod) {
                case "LTM":
                    return "EBITDA (LTM)";
                    break;
                case "FY1":
                    return "EBITDA (FY1)";
                    break;
                case "FY2":
                    return "EBITDA (FY2)";
                    break;
            }
            break;
        case "EV/Attendance":
            switch (valuationPeriod) {
                case "FY0":
                    return "Attendance (FY0)";
                    break;
            }
            break;
        case "P/E":
            switch (valuationPeriod) {
                case "LTM":
                    return "EPS (LTM)";
                    break;
                case "FY1":
                    return "EPS (FY1)";
                    break;
                case "FY2":
                    return "EPS (FY2)";
                    break;
            }
            break;
    }
});

//Format for value one in Valuation table based on valuationMetric
Template.registerHelper('valueOneFormat', function(a) {
    if(a) {
        var valuationElement = Template.parentData(1).valuationElement;
        var valuationMetric = Template.parentData(1).valuationMetric;
        if(valuationElement === "security") {
            switch(valuationMetric) {
                case "EV/Revenue":
                    return numeral(a).format('$0,0.0');
                    break;
                case "EV/EBITDA":
                    return numeral(a).format('$0,0.0');
                    break;
                case "EV/Attendance":
                    return numeral(a).format('$0,0.0');
                    break;
                case "P/E":
                    return numeral(a).format('$0,0.00');
                    break;
            }
        }
    }
});

//Format for value two in Valuation table based on valuationMetric
Template.registerHelper('valueTwoFormat', function(a) {
    if(a) {
        var valuationElement = Template.parentData(1).valuationElement;
        var valuationMetric = Template.parentData(1).valuationMetric;
        if(valuationElement === "security") {
            switch(valuationMetric) {
                case "EV/Revenue":
                    return numeral(a).format('$0,0.0');
                    break;
                case "EV/EBITDA":
                    return numeral(a).format('$0,0.0');
                    break;
                case "EV/Attendance":
                    return numeral(a).format('0,0');
                    break;
                case "P/E":
                    return numeral(a).format('$0,0.00');
                    break;
            }
        }
    }
});

//Format for active value one at bottom of Valuation selections table. Differs from above because of different data context
Template.registerHelper('buildOneFormat', function(a) {
    if(a) {
        var valuationId = this._id;
        var footballId = Template.parentData(1)._id;
        var footballType = Template.parentData(1).footballType;
        if(footballType == "target") {
            var multiple = getBuildMultiple(footballId, valuationId);
            if(multiple) {
                var valuationMetric = this.valuationMetric;
                switch(valuationMetric) {
                    case "EV/Revenue":
                        return numeral(a).format('$0,0.0');
                        break;
                    case "EV/EBITDA":
                        return numeral(a).format('$0,0.0');
                        break;
                    case "EV/Attendance":
                        return numeral(a).format('$0,0.0');
                        break;
                    case "P/E":
                        return numeral(a).format('$0,0.00');
                        break;
                }
            }
        }
    }
});

//Format for active value one at bottom of Valuation selections table. Differs from above because of different data context
Template.registerHelper('buildTwoFormat', function(a) {
    if(a) {
        var valuationId = this._id;
        var footballId = Template.parentData(1)._id;
        var footballType = Template.parentData(1).footballType;
        if(footballType == "target") {
            var multiple = getBuildMultiple(footballId, valuationId);
            if(multiple) {
                var valuationMetric = this.valuationMetric;
                switch(valuationMetric) {
                    case "EV/Revenue":
                        return numeral(a).format('$0,0.0');
                        break;
                    case "EV/EBITDA":
                        return numeral(a).format('$0,0.0');
                        break;
                    case "EV/Attendance":
                        return numeral(a).format('0,0');
                        break;
                    case "P/E":
                        return numeral(a).format('$0,0.00');
                        break;
                }
            }
        }
    }
});

//Format for value in Valuations selections table
//Redundant right now, but keeping in case I expand options
Template.registerHelper('selectSymCurrency', function() {
    var valuationMetric = Template.parentData(1).valuationMetric;
    switch (valuationMetric) {
        case "EV/Revenue":
            return "";
            break;
        case "EV/EBITDA":
            return "";
            break;
        case "EV/Attendance":
            return "";
            break;
        case "P/E":
            return "";
            break;
    }
});

//Format for multiples in Valuations table
//Redundant right now, but keeping in case I expand options
Template.registerHelper('selectSymMultiple', function() {
    var valuationMetric = Template.parentData(1).valuationMetric;
    switch (valuationMetric) {
        case "EV/Revenue":
            return "x";
            break;
        case "EV/EBITDA":
            return "x";
            break;
        case "EV/Attendance":
            return "x";
            break;
        case "P/E":
            return "x";
            break;
    }
});

//Format for multiples in active values at bottom of Valuation table
//Redundant right now, but keeping in case I expand options
Template.registerHelper('buildSymCurrency', function() {
    var footballId = Template.parentData(1)._id;
    var valuationId = this._id;
    var valuationType = this.valuationType;
    var valuationMetric = this.valuationMetric;
    //var selections = this.valuationSelections;
    //var selectionsCount = selections.count;
    var existingCustom = this.existingCustom;
    var footballOutput = Template.parentData(1).footballOutput;
    var buildMultiple = getBuildMultiple(footballId, valuationId);
    if(buildMultiple) {
    //if(selectionsCount > 0) {
        switch(valuationType) {
            case "comps":
                switch (valuationMetric) {
                    case "EV/Revenue":
                        return "";
                        break;
                    case "EV/EBITDA":
                        return "";
                        break;
                    case "EV/Attendance":
                        return "";
                        break;
                    case "P/E":
                        return "";
                        break;
                }
                break;
            case "deals":
                switch (valuationMetric) {
                    case "EV/Revenue":
                        return "";
                        break;
                    case "EV/EBITDA":
                        return "";
                        break;
                    case "EV/Attendance":
                        return "";
                        break;
                    case "P/E":
                        return "";
                        break;
                }
                break;
            case "models":
                if(footballOutput == "Multiple") {
                    switch (valuationMetric) {
                        case "EV/Revenue":
                            return "";
                            break;
                        case "EV/EBITDA":
                            return "";
                            break;
                        case "EV/Attendance":
                            return "";
                            break;
                        case "P/E":
                            return "";
                            break;
                    }
                } else {
                    return "$";
                }
                break;
            case "custom":
                switch(existingCustom) {
                    case "Value":
                        return "$";
                        break;
                    case "Price":
                        return "$";
                        break;
                    case "Multiple":
                        return "";
                        break;
                }
        }
    }
});

//Format for multiples in active values at bottom of Valuation table
//Redundant right now, but keeping in case I expand options
Template.registerHelper('buildSymMultiple', function() {
    var footballId = Template.parentData(1)._id;
    var valuationId = this._id;
    var valuationType = this.valuationType;
    var valuationMetric = this.valuationMetric;
    //var selections = this.valuationSelections;
    //var selectionsCount = selections.length;
    var existingCustom = this.existingCustom;
    var footballOutput = Template.parentData(1).footballOutput;
    var buildMultiple = getBuildMultiple(footballId, valuationId);
    if(buildMultiple) {
        //if(selectionsCount > 0) {
        switch(valuationType) {
            case "comps":
                switch (valuationMetric) {
                    case "EV/Revenue":
                        return "x";
                        break;
                    case "EV/EBITDA":
                        return "x";
                        break;
                    case "EV/Attendance":
                        return "x";
                        break;
                    case "P/E":
                        return "x";
                        break;
                }
                break;
            case "deals":
                switch (valuationMetric) {
                    case "EV/Revenue":
                        return "x";
                        break;
                    case "EV/EBITDA":
                        return "x";
                        break;
                    case "EV/Attendance":
                        return "x";
                        break;
                    case "P/E":
                        return "x";
                        break;
                }
                break;
            case "models":
                if(footballOutput == "Multiple") {
                    switch (valuationMetric) {
                        case "EV/Revenue":
                            return "x";
                            break;
                        case "EV/EBITDA":
                            return "x";
                            break;
                        case "EV/Attendance":
                            return "x";
                            break;
                        case "P/E":
                            return "x";
                            break;
                    }
                } else {
                    return "";
                }
                break;
            case "custom":
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

//Returns price for selected comp
getCompPrice = function(companyId) {
    var company = FeedCompanies.findOne({_id:companyId});
    var valuation = Template.parentData(1);
    var valuationDate = valuation.valuationDate;
    var valuationPrice = 0;
    _.each(company.closingPrices, function(closingPrices) {
        if (closingPrices.date == valuationDate) valuationPrice = closingPrices.price;
    });
    return valuationPrice
};

//Returns all values for index
getValuationIndex = function(indexId, valuationId) {
    var valuationType = Valuations.findOne({_id: valuationId}).valuationType;
    var valuationDate = Valuations.findOne({_id: valuationId}).valuationDate;
    switch(valuationType) {
        case "comps":
            var indexComps = FeedCompaniesIndices.findOne({_id: indexId});
            var indexCompsValue = 0;
            _.each(indexComps.values, function (values) {
                if (values.date == valuationDate)
                    indexCompsValue = {
                        evRevenueLtm: values.evRevenueLtm,
                        evRevenueFy1: values.evRevenueFy1,
                        evRevenueFy2: values.evRevenueFy2,
                        evEbitdaLtm: values.evEbitdaLtm,
                        evEbitdaFy1: values.evEbitdaFy1,
                        evEbitdaFy2: values.evEbitdaFy2,
                        priceEarningsLtm: values.priceEarningsLtm,
                        priceEarningsFy1: values.priceEarningsFy1,
                        priceEarningsFy2: values.priceEarningsFy2
                    }
            });
            return indexCompsValue;
            break;
        case "deals":
            var indexDeals = FeedDealsIndices.findOne({_id:indexId});
            var indexDealsValue = 0;
            _.each(indexDeals.values, function(values) {
                if (values.date == null)
                    indexDealsValue = {
                        evRevenueLtm: values.evRevenueLtm,
                        evEbitdaLtm: values.evEbitdaLtm
                    }
            });
            return indexDealsValue;
    }
};

//Chooses appropriate value for index depending on valuationMetric and valuationPeriod
Template.registerHelper('valuationIndex',function(){
    var indexId = this._id;
    var valuationId = Template.parentData(1)._id;
    var valuationMetric = Template.parentData(1).valuationMetric;
    var valuationPeriod = Template.parentData(1).valuationPeriod;
    switch (valuationMetric) {
        case "EV/Revenue":
            switch(valuationPeriod) {
                case "LTM":
                    return getValuationIndex(indexId, valuationId).evRevenueLtm;
                    break;
                case "FY1":
                    return getValuationIndex(indexId, valuationId).evRevenueFy1;
                    break;
                case "FY2":
                    return getValuationIndex(indexId, valuationId).evRevenueFy2;
                    break;
            }
            break;
        case "EV/EBITDA":
            switch(valuationPeriod) {
                case "LTM":
                    return getValuationIndex(indexId, valuationId).evEbitdaLtm;
                    break;
                case "FY1":
                    return getValuationIndex(indexId, valuationId).evEbitdaFy1;
                    break;
                case "FY2":
                    return getValuationIndex(indexId, valuationId).evEbitdaFy2;
                    break;
            }
            break;
        case "P/E":
            switch(valuationPeriod) {
                case "LTM":
                    return getValuationIndex(indexId, valuationId).priceEarningsLtm;
                    break;
                case "FY1":
                    return getValuationIndex(indexId, valuationId).priceEarningsFy1;
                    break;
                case "FY2":
                    return getValuationIndex(indexId, valuationId).priceEarningsFy2;
                    break;
            }
            break;
    }
});

getStat = function(count, existingModel, menuStat) {
    if(count > 0) {
        return existingModel;
    } else {
        return menuStat
    }
};

