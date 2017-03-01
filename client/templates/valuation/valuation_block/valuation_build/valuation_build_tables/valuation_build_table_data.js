Template.ValuationBuildTableData.events ({
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

Template.ValuationBuildTableData.helpers({
    selections: function() {
        //Changes cursor used to display selections depending on valuationType and valuationElement
        var valuationSelections = this.valuationSelections;

        if (valuationSelections) {
            var marketType = this.marketType;
            var valuationType = this.valuationType;
            var valuationElement = this.valuationElement;
            switch(marketType) {
                case "company":
                    switch (valuationType) {
                        case "comps":
                            switch (valuationElement) {
                                case "security":
                                    return FeedCompanies.find({_id: {$in: valuationSelections}});
                                    break;
                                case "index":
                                    return FeedCompaniesIndices.find({_id: {$in: valuationSelections}});
                                    break;
                            }
                            break;
                        case "deals":
                            switch (valuationElement) {
                                case "security":
                                    return FeedDeals.find({_id: {$in: valuationSelections}});
                                    break;
                                case "index":
                                    return FeedDealsIndices.find({_id: {$in: valuationSelections}});
                                    break;
                            }
                            break;
                        case "models":
                                return Models.find({_id: {$in: valuationSelections}});
                                break;
                    }
                    break;
                case "team":
                    switch (valuationType) {
                        case "comps":
                            switch (valuationElement) {
                                case "security":
                                    return FeedTeams.find({_id: {$in: valuationSelections}});
                                    break;
                            }
                            break;
                    }
                    break;
                }
            }
    },
    selectInfo: function() {
        var marketType = Template.parentData(1).marketType;
        switch(marketType) {
            case "company":
                return {
                    iden: this.ticker,
                    name: this.companyName
                };
                break;
            case "team":
                return {
                    iden: this.leagueAbbrev,
                    name: this.teamName
                };
                break;
        }
    },
    selectCity: function() {
        var marketType = Template.parentData(1).marketType;
        switch(marketType) {
            case "company":
                return '';
                break;
            case "team":
                return this.teamCity;
                break;
        }
    },
    valueOne: function () {
        var footballId = Template.parentData(2)._id;
        var valuationMetric = Template.parentData(1).valuationMetric;
        var scaleAdjust = getScale(footballId);
        var marketType = Template.parentData(1).marketType;
        var valuationType = Template.parentData(1).valuationType;
        var valuationElement = Template.parentData(1).valuationElement;
        switch(marketType) {
            case "company":
                switch(valuationType) {
                    case "comps":
                        switch(valuationElement) {
                            case "security":
                                var companyId = this._id;
                                var sharesOs = this.capTable.sharesOs;
                                var netDebt = this.capTable.netDebt;
                                var stockPrice = getCompPrice(companyId);
                                var marketCap = sharesOs * stockPrice;
                                var evComp = marketCap + netDebt;
                                switch (valuationMetric) {
                                    case "EV/Revenue":
                                        return evComp / scaleAdjust;
                                        break;
                                    case "EV/EBITDA":
                                        return evComp / scaleAdjust;
                                        break;
                                    case "Price/Earnings":
                                        return stockPrice;
                                        break;
                                }
                                break;
                            case "index":
                                return '';
                                break;
                        }
                        break;
                    case "deals":
                        switch(valuationElement) {
                            case "security":
                                var evDeal = this.dealTerms.enterpriseValueDeal;
                                switch (valuationMetric) {
                                    case "EV/Revenue":
                                        return evDeal / scaleAdjust;
                                        break;
                                    case "EV/EBITDA":
                                        return evDeal / scaleAdjust;
                                        break;
                                }
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
                                var evTeam = this.capTable.enterpriseValue;
                                switch (valuationMetric) {
                                    case "EV/Revenue":
                                        return evTeam / scaleAdjust;
                                        break;
                                    case "EV/Attendance":
                                        return evTeam / scaleAdjust;
                                        break;
                                }
                                break;
                        }
                        break;
                }
                break;
        }
    },
    valueTwo: function () {
        var footballId = Template.parentData(2)._id;
        var marketType = Template.parentData(1).marketType;
        var valuationMetric = Template.parentData(1).valuationMetric;
        var valuationPeriod = Template.parentData(1).valuationPeriod;
        var valuationElement = Template.parentData(1).valuationElement;
        var scaleAdjust = getScale(footballId);
        var attendAdjust = getAttend(footballId);

        switch(marketType) {
            case "company":
                switch (valuationElement) {
                    case "security":
                        switch (valuationMetric) {
                            case "EV/Revenue":
                                switch (valuationPeriod) {
                                    case "LTM":
                                        return this.financial.ltm.revenue / scaleAdjust;
                                        break;
                                    case "FY1":
                                        return this.financial.fy1.revenue / scaleAdjust;
                                        break;
                                    case "FY2":
                                        return this.financial.fy2.revenue / scaleAdjust;
                                        break;
                                }
                                break;
                            case "EV/EBITDA":
                                switch (valuationPeriod) {
                                    case "LTM":
                                        return this.financial.ltm.ebitda / scaleAdjust;
                                        break;
                                    case "FY1":
                                        return this.financial.fy1.ebitda / scaleAdjust;
                                        break;
                                    case "FY2":
                                        return this.financial.fy2.ebitda / scaleAdjust;
                                        break;
                                }
                                break;
                            case "Price/Earnings":
                                switch (valuationPeriod) {
                                    case "LTM":
                                        return this.financial.ltm.eps;
                                        break;
                                    case "FY1":
                                        return this.financial.fy1.eps;
                                        break;
                                    case "FY2":
                                        return this.financial.fy2.eps;
                                        break;
                                }
                                break;
                            default:
                                return "";
                        }
                        break;
                    case "index":
                        return '';
                        break;
                }
                break;
            case "team":
                switch (valuationElement) {
                    case "security":
                        switch (valuationMetric) {
                            case "EV/Revenue":
                                switch (valuationPeriod) {
                                    case "FY0":
                                        return this.financial.fy0.revenue / scaleAdjust;
                                        break;
                                }
                                break;
                            case "EV/Attendance":
                                switch (valuationPeriod) {
                                    case "FY0":
                                        return this.financial.fy0.attendance * attendAdjust;
                                        break;
                                }
                                break;
                        }
                        break;
                }
                break;
        }
    },
    buildValueAdjusted: function() {
        var footballType = Template.parentData(1).footballType;
        if(footballType == "target") {
            var scale = Template.parentData(1).footballScale;
            var valuationMetric = this.valuationMetric;
            var value = UI._globalHelpers.buildValue();
            switch(valuationMetric) {
                case "EV/Revenue":
                    switch (scale) {
                        case "millions":
                            return value;
                            break;
                        case "billions":
                            return value / 1000;
                            break;
                    }
                    break;
                case "EV/EBITDA":
                    switch (scale) {
                        case "millions":
                            return value;
                            break;
                        case "billions":
                            return value / 1000;
                            break;
                    }
                    break;
                case "EV/Attendance":
                    switch (scale) {
                        case "millions":
                            return value;
                            break;
                        case "billions":
                            return value / 1000;
                            break;
                    }
                    break;
                case "Price/Earnings":
                    return value;
                    break;
            }
        }
    },
    targetReferenceValue: function() {
        var footballId = Template.parentData(1)._id;
        var football = Footballs.findOne({_id:footballId});
        var footballType = football.footballType;
        if(footballType == "target") {
            var targetId = football.footballTarget.targetId;
            var targetType = football.footballTarget.targetType;
            var targetData = football.footballTarget.targetData;
            var marketType = this.marketType;
            var valuationMetric = this.valuationMetric;
            var valuationPeriod = this.valuationPeriod;
            var scaleAdjust = getScale(footballId);
            var attendAdjust = getAttend(footballId);
            switch(marketType) {
                case "company":
                    switch(targetType) {
                        case "company":
                            switch(targetData) {
                                case "feed":
                                    var feedCompany = FeedCompanies.findOne({_id:targetId});
                                    switch (valuationMetric) {
                                        case "EV/Revenue":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return feedCompany.financial.ltm.revenue / scaleAdjust;
                                                    break;
                                                case "FY1":
                                                    return feedCompany.financial.fy1.revenue / scaleAdjust;
                                                    break;
                                                case "FY2":
                                                    return feedCompany.financial.fy2.revenue / scaleAdjust;
                                                    break;
                                            }
                                            break;
                                        case "EV/EBITDA":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return feedCompany.financial.ltm.ebitda / scaleAdjust;
                                                    break;
                                                case "FY1":
                                                    return feedCompany.financial.fy1.ebitda / scaleAdjust;
                                                    break;
                                                case "FY2":
                                                    return feedCompany.financial.fy2.ebitda / scaleAdjust;
                                                    break;
                                            }
                                            break;
                                        case "Price/Earnings":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return feedCompany.financial.ltm.eps;
                                                    break;
                                                case "FY1":
                                                    return feedCompany.financial.fy1.eps;
                                                    break;
                                                case "FY2":
                                                    return feedCompany.financial.fy2.eps;
                                                    break;
                                            }
                                            break;
                                    }
                                    break;
                                case "custom":
                                    var customCompany = TargetsCompanies.findOne({_id:targetId});
                                    switch (valuationMetric) {
                                        case "EV/Revenue":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return customCompany.financial.ltm.revenue / scaleAdjust;
                                                    break;
                                                case "FY1":
                                                    return customCompany.financial.fy1.revenue / scaleAdjust;
                                                    break;
                                                case "FY2":
                                                    return customCompany.financial.fy2.revenue / scaleAdjust;
                                                    break;
                                            }
                                            break;
                                        case "EV/EBITDA":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return customCompany.financial.ltm.ebitda / scaleAdjust;
                                                    break;
                                                case "FY1":
                                                    return customCompany.financial.fy1.ebitda / scaleAdjust;
                                                    break;
                                                case "FY2":
                                                    return customCompany.financial.fy2.ebitda / scaleAdjust;
                                                    break;
                                            }
                                            break;
                                        case "Price/Earnings":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return customCompany.financial.ltm.eps;
                                                    break;
                                                case "FY1":
                                                    return customCompany.financial.fy1.eps;
                                                    break;
                                                case "FY2":
                                                    return customCompany.financial.fy2.eps;
                                                    break;
                                            }
                                            break;
                                    }
                                    break;
                            }
                    }
                    break;
                case "team":
                    switch(targetType) {
                        case "team":
                            switch(targetData) {
                                case "feed":
                                    var feedTeam = FeedTeams.findOne({_id:targetId});
                                    switch (valuationMetric) {
                                        case "EV/Revenue":
                                            switch (valuationPeriod) {
                                                case "FY0":
                                                    return feedTeam.financial.fy0.revenue / scaleAdjust;
                                                    break;
                                            }
                                            break;
                                        case "EV/Attendance":
                                            switch (valuationPeriod) {
                                                case "FY0":
                                                    return feedTeam.financial.fy0.attendance * attendAdjust;
                                                    break;
                                            }
                                            break;
                                    }
                                    break;
                            }
                            break;
                    }
                    break;
            }
        }
    }
});

