Template.ValuationBuildTableCustom.events ({
    'click .btn-remove': function(e) {
        e.preventDefault();

        var currentValuationId = Template.parentData(0)._id;
        var currentSelection = this._id;

        var ownerId = Template.parentData(1).ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            if (confirm("Delete this comp?")) {
                Meteor.call('valuationBuildPull', currentValuationId, currentSelection, function(error, result) {
                });
            }
        }
    }
});

Template.ValuationBuildTableCustom.helpers({
    selections: function() {
        //Changes cursor used to display selections depending on valuationType and valuationElement
        var valuationSelections = this.valuationSelections;
        return Customs.find({_id: {$in: valuationSelections}});
    },
    stat: function() {
        var customStat = this.values.customStat;
        switch(customStat) {
            case "customValue":
                return "Custom Value";
                break;
            case "customPrice":
                return "Custom Price";
                break;
            case "customMultiple":
                return "Custom Multiple";
                break;
        }
    },
    value: function() {
        var stat = this.values.customStat;
        if(stat == "customValue") {
            var scale = Template.parentData(2).footballScale;
            switch(scale) {
                case "millions":
                    return this.values.customValue;
                    break;
                case "billions":
                    return this.values.customValue / 1000;
                    break;
            }
        } else {
            return this.values.customValue;
        }

    },
    customCurrency: function() {
        var stat = this.values.customStat;
        if(stat == "customValue" || stat == "customPrice") {
            return "$";
        } else {
            return "";
        }
    },
    customFormat: function(a) {
        var stat = this.values.customStat;
        if(stat === "customPrice") {
            return numeral(a).format('0,0.00');
        } else {
            return numeral(a).format('0,0.0');
        }
    },
    customMultiple: function() {
        var stat = this.values.customStat;
        if(stat == "customValue" || stat == "customPrice") {
            return "";
        } else {
            return "x";
        }
    }
    //},
    //buildValueAdjusted: function() {
    //    var footballType = Template.parentData(1).footballType;
    //    if(footballType == "target") {
    //        var scale = Template.parentData(1).footballScale;
    //        var valuationMetric = this.valuationMetric;
    //        var value = UI._globalHelpers.buildValue();
    //        console.log(value);switch(valuationMetric) {
    //            case "EV/Revenue":
    //                switch (scale) {
    //                    case "millions":
    //                        return value;
    //                        break;
    //                    case "billions":
    //                        return value / 1000;
    //                        break;
    //                }
    //                break;
    //            case "EV/EBITDA":
    //                switch (scale) {
    //                    case "millions":
    //                        return value;
    //                        break;
    //                    case "billions":
    //                        return value / 1000;
    //                        break;
    //                }
    //                break;
    //            case "EV/Attendance":
    //                switch (scale) {
    //                    case "millions":
    //                        return value;
    //                        break;
    //                    case "billions":
    //                        return value / 1000;
    //                        break;
    //                }
    //                break;
    //            case "Price/Earnings":
    //                return value;
    //                break;
    //        }
    //    }
    //},
    //targetReferenceValue: function() {
    //    var footballId = Template.parentData(1)._id;
    //    var football = Footballs.findOne({_id:footballId});
    //    var footballType = football.footballType;
    //    if(footballType == "target") {
    //        var targetId = football.footballTarget.targetId;
    //        var targetType = football.footballTarget.targetType;
    //        var targetData = football.footballTarget.targetData;
    //        var marketType = this.marketType;
    //        var valuationMetric = this.valuationMetric;
    //        var valuationPeriod = this.valuationPeriod;
    //        var scaleAdjust = getScale(footballId);
    //        var attendAdjust = getAttend(footballId);
    //        switch(marketType) {
    //            case "company":
    //                switch(targetType) {
    //                    case "company":
    //                        switch(targetData) {
    //                            case "feed":
    //                                var feedCompany = FeedCompanies.findOne({_id:targetId});
    //                                switch (valuationMetric) {
    //                                    case "EV/Revenue":
    //                                        switch (valuationPeriod) {
    //                                            case "LTM":
    //                                                return feedCompany.financial.ltm.revenue / scaleAdjust;
    //                                                break;
    //                                            case "FY1":
    //                                                return feedCompany.financial.fy1.revenue / scaleAdjust;
    //                                                break;
    //                                            case "FY2":
    //                                                return feedCompany.financial.fy2.revenue / scaleAdjust;
    //                                                break;
    //                                        }
    //                                        break;
    //                                    case "EV/EBITDA":
    //                                        switch (valuationPeriod) {
    //                                            case "LTM":
    //                                                return feedCompany.financial.ltm.ebitda / scaleAdjust;
    //                                                break;
    //                                            case "FY1":
    //                                                return feedCompany.financial.fy1.ebitda / scaleAdjust;
    //                                                break;
    //                                            case "FY2":
    //                                                return feedCompany.financial.fy2.ebitda / scaleAdjust;
    //                                                break;
    //                                        }
    //                                        break;
    //                                    case "Price/Earnings":
    //                                        switch (valuationPeriod) {
    //                                            case "LTM":
    //                                                return feedCompany.financial.ltm.eps;
    //                                                break;
    //                                            case "FY1":
    //                                                return feedCompany.financial.fy1.eps;
    //                                                break;
    //                                            case "FY2":
    //                                                return feedCompany.financial.fy2.eps;
    //                                                break;
    //                                        }
    //                                        break;
    //                                }
    //                                break;
    //                            case "custom":
    //                                var customCompany = TargetsCompanies.findOne({_id:targetId});
    //                                switch (valuationMetric) {
    //                                    case "EV/Revenue":
    //                                        switch (valuationPeriod) {
    //                                            case "LTM":
    //                                                return customCompany.financial.ltm.revenue / scaleAdjust;
    //                                                break;
    //                                            case "FY1":
    //                                                return customCompany.financial.fy1.revenue / scaleAdjust;
    //                                                break;
    //                                            case "FY2":
    //                                                return customCompany.financial.fy2.revenue / scaleAdjust;
    //                                                break;
    //                                        }
    //                                        break;
    //                                    case "EV/EBITDA":
    //                                        switch (valuationPeriod) {
    //                                            case "LTM":
    //                                                return customCompany.financial.ltm.ebitda / scaleAdjust;
    //                                                break;
    //                                            case "FY1":
    //                                                return customCompany.financial.fy1.ebitda / scaleAdjust;
    //                                                break;
    //                                            case "FY2":
    //                                                return customCompany.financial.fy2.ebitda / scaleAdjust;
    //                                                break;
    //                                        }
    //                                        break;
    //                                    case "Price/Earnings":
    //                                        switch (valuationPeriod) {
    //                                            case "LTM":
    //                                                return customCompany.financial.ltm.eps;
    //                                                break;
    //                                            case "FY1":
    //                                                return customCompany.financial.fy1.eps;
    //                                                break;
    //                                            case "FY2":
    //                                                return customCompany.financial.fy2.eps;
    //                                                break;
    //                                        }
    //                                        break;
    //                                }
    //                                break;
    //                        }
    //                }
    //                break;
    //            case "team":
    //                switch(targetType) {
    //                    case "team":
    //                        switch(targetData) {
    //                            case "feed":
    //                                var feedTeam = FeedTeams.findOne({_id:targetId});
    //                                switch (valuationMetric) {
    //                                    case "EV/Revenue":
    //                                        switch (valuationPeriod) {
    //                                            case "FY0":
    //                                                return feedTeam.financial.fy0.revenue / scaleAdjust;
    //                                                break;
    //                                        }
    //                                        break;
    //                                    case "EV/Attendance":
    //                                        switch (valuationPeriod) {
    //                                            case "FY0":
    //                                                return feedTeam.financial.fy0.attendance * attendAdjust;
    //                                                break;
    //                                        }
    //                                        break;
    //                                }
    //                                break;
    //                        }
    //                        break;
    //                }
    //                break;
    //        }
    //    }
});

