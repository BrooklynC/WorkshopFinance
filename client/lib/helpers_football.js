////FOOTBALL

//Creates an object to insert as Target, depending on certain criteria that have been selected
getTarget = function(currentFootballId, targetSelection) {
    var football = Footballs.findOne({_id:currentFootballId});
    if(!football) {
        return {
            targetId: "none",
            targetType: "none",
            targetData: "none"
        }
    } else {
        var marketType = Footballs.findOne({_id:currentFootballId}).marketType;
        var targetData = Session.get('targetData');
        if(targetSelection == "none")  {
        //if(!targetSelection)  {
            return {
                targetId: "none",
                targetType: "none",
                targetData: "none"
            }
        } else {
            switch(marketType) {
                case "company":
                    switch(targetData) {
                        case "feed":
                            var feedCompanyId = FeedCompanies.findOne({ticker:targetSelection})._id;
                            return {
                                targetId: feedCompanyId,
                                targetType: "company",
                                targetData: "feed"
                            };
                    }
                    break;
                case "team":
                    switch(targetData) {
                        case "feed":
                            var feedTeamId = FeedTeams.findOne({ticker:targetSelection})._id;
                            return {
                                targetId: feedTeamId,
                                targetType: "team",
                                targetData: "feed"
                            };
                    }
                    break;
            }
        }
    }
};

//Chooses footballType to set, depending on whether or not a target is selected
getFootballType = function(targetSelection) {
    if(targetSelection == "none")  {
        return "market"
    } else {
        return "target"
    }
};

//Checks scale to call in range calculations
getScaleRange = function(footballId) {
    var football = Footballs.findOne({_id:footballId});
    var scale = football.footballScale;
    var output = football.footballOutput;
    if(output == "Enterprise Value") {
        switch(scale) {
            case "millions":
                return 1;
                break;
            case "billions":
                return 1000;
        }
    } else {
        return 1;
    }
};

//Factor to use in rounding values in Range calculations
getRangeOutput = function(footballId) {
    var output = Footballs.findOne({_id:footballId}).footballOutput;
    switch(output) {
        case "Enterprise Value":
            return {
                small: 5000,
                large: 10000,
                xLarge: 25000
            };
            break;
        case "Price per Share":
            return {
                small: 10,
                large: 10,
                xLarge: 10
            };
            break;
        case "Multiple":
            return {
                small: 1,
                large: 1,
                xLarge: 1
            };
            break;
    }
};

//Calculates boundaries for FootballRange by taking max/min of array that includes all valuations, Current Value and Trading Value
//Max/min are rounded using helper above
getRangeCaps = function(footballId) {
    var football = Footballs.findOne({_id:footballId});
    var footballType = football.footballType;
    var footballOutput = football.footballOutput;
    var valuations = football.footballValuations;
    var results = [];
    //Push result from each valuation into results array
    if(valuations) {
        valuations.forEach(function(valuationId) {
            var valuation = Valuations.findOne({_id:valuationId});
            var valuationSelections = valuation.valuationSelections;
            if(valuationSelections.length > 0) {
                var valuationType = valuation.valuationType;
                var activeResult = getResultValue(footballId, valuationId);
                if(valuationType == "comps" || valuationType == "deals" || valuationType == "models") {
                    //var activeResult = valuation.valuationActive;
                    if (activeResult) {
                        results.push(activeResult);
                    }
                } else {
                    var existingCustom = valuation.existingCustom;
                    switch (footballOutput) {
                        case "Enterprise Value":
                            if (existingCustom == "Value") {
                                if (activeResult) {
                                    results.push(activeResult);
                                }
                            }
                            break;
                        case "Price per Share":
                            if (existingCustom == "Price") {
                                if (activeResult) {
                                    results.push(activeResult);
                                }
                            }
                            break;
                        case "Multiple":
                            if (existingCustom == "Multiple") {
                                if (activeResult) {
                                    results.push(activeResult);
                                }
                            }
                            break;
                    }
                }
            }
        });
    }
    //Push result from each includeCurrent, if it exists, into results array
    var includeCurrent = football.includeCurrent;
    var current = UI._globalHelpers.targetCurrent(footballId);
    if(includeCurrent) {
        results.push(current);
    }
    //Find low and high valuation multiples of results array
    var resultLow = Math.min.apply(null, results);
    var resultHigh = Math.max.apply(null, results);

    //Check if any results has any values
    var resultsLength = results.length;
    var resultsWithCurrent = [];
    if(resultsLength > 0) {
        //Applies footballSpread to low and high valuation multiples
        var spread = football.footballSpread;
        var rangeLowSpread = resultLow * (1 - spread/100);
        var rangeHighSpread = resultHigh * (1 + spread/100);
        //Push low and high into resultsWithCurrent array
        resultsWithCurrent.push(rangeLowSpread, rangeHighSpread);
    }

    //Push includeTrading result, if it exists, into resultsWithCurrent array
    if(footballType == "target") {
        var targetId = football.footballTarget.targetId;
        var targetType = football.footballTarget.targetType;
        var targetData = football.footballTarget.targetData;
        switch(targetType) {
            case "company":
                switch(targetData) {
                    case "feed":
                        var status = FeedCompanies.findOne({_id:targetId}).status;
                        if(status == "public") {
                            var includeTrading = football.includeTrading;
                            var tradingSpread = 0.1;
                            var tradingLow = current * (1 - tradingSpread);
                            var tradingHigh = current * (1 + tradingSpread);
                            if(includeTrading) {
                                resultsWithCurrent.push(tradingLow, tradingHigh);
                            }
                        }
                }
        }
    }

    //Find low and high valuation multiples of resultsWithCurrent array
    var resultLowAll = Math.min.apply(null, resultsWithCurrent);
    var resultHighAll = Math.max.apply(null, resultsWithCurrent);

    //Gets rounding metric for each output
    var outputRangeSmall = getRangeOutput(footballId).small;
    var outputRangeLarge = getRangeOutput(footballId).large;
    var outputRangeXlarge = getRangeOutput(footballId).xLarge;

    //Rounds low and high multiples based on above
    if(resultHighAll < "100000") {
        var rangeLowRoundSmall = Math.floor(resultLowAll / outputRangeSmall) * outputRangeSmall;
        var rangeHighRoundSmall = Math.ceil(resultHighAll / outputRangeSmall) * outputRangeSmall;
    } else {
        if(resultHighAll >= "100000" && resultHighAll < "1000000") {
            var rangeLowRoundLarge = Math.floor(resultLowAll / outputRangeLarge) * outputRangeLarge;
            var rangeHighRoundLarge = Math.ceil(resultHighAll / outputRangeLarge) * outputRangeLarge;
        } else {
            var rangeLowRoundXlarge = Math.floor(resultLowAll / outputRangeXlarge) * outputRangeXlarge;
            var rangeHighRoundXlarge = Math.ceil(resultHighAll / outputRangeXlarge) * outputRangeXlarge;
        }
    }

    //Calculates cushion to apply to low and high
    var cushion = football.footballCushion;
    var rangeCushionSmall = cushion * outputRangeSmall;
    var rangeCushionLarge = cushion * outputRangeLarge;
    var rangeCushionXlarge = cushion * outputRangeXlarge;

    //Adds a cushion to low and high and limits low to zero
    if(results) {
        if(resultHighAll < "100000") {
            var rangeLowFinalSmall = rangeLowRoundSmall - rangeCushionSmall;
            var rangeHighFinalSmall = rangeHighRoundSmall + rangeCushionSmall;
            return {
                min: Math.max(0, rangeLowFinalSmall),
                max: rangeHighFinalSmall
            }
        } else {
            if(resultHighAll >= "100000" && resultHighAll < "1000000") {
                var rangeLowFinalLarge = rangeLowRoundLarge - rangeCushionLarge;
                var rangeHighFinalLarge = rangeHighRoundLarge + rangeCushionLarge;
                return {
                    min: Math.max(0, rangeLowFinalLarge),
                    max: rangeHighFinalLarge
                }
            } else {
                var rangeLowFinalXlarge = rangeLowRoundXlarge - rangeCushionXlarge;
                var rangeHighFinalXlarge = rangeHighRoundXlarge + rangeCushionXlarge;
                return {
                    min: Math.max(0, rangeLowFinalXlarge),
                    max: rangeHighFinalXlarge
                }
            }
        }
    }
};

//Get Current Price for this target for use in Current d3 rendering
getTargetPrice = function(footballId) {
    var football = Footballs.findOne({_id:footballId});
    var footballType = football.footballType;
    if(footballType == "target") {
        var targetId = football.footballTarget.targetId;
        var targetType = football.footballTarget.targetType;
        var targetData = football.footballTarget.targetData;
        switch(targetType) {
            case "company":
                switch(targetData) {
                    case "feed":
                        var feedCompany = FeedCompanies.findOne({_id:targetId});
                        var currentDate = football.includeCurrentDate;

                        var currentPrice = 0;
                        _.each(feedCompany.closingPrices, function (closingPrices) {
                            if (closingPrices.date == currentDate) currentPrice = closingPrices.price;
                        });
                        return currentPrice;
                        break;
                }
        }
    }
};

//Use Current Price, depending on footballOutput
//This helper is called in FootballFieldCurrent and FootballFieldTrading
Template.registerHelper('targetCurrent',function(footballId){
    var football = Footballs.findOne({_id:footballId});
    var footballOutput = football.footballOutput;
    var footballType = football.footballType;

    if(footballType == "target") {
        var targetId = football.footballTarget.targetId;
        var targetType = football.footballTarget.targetType;
        var targetData = football.footballTarget.targetData;
        switch(targetType) {
            case "company":
                switch (targetData) {
                    case "feed":
                        var targetPrice = getTargetPrice(footballId);

                        var feedCompany = FeedCompanies.findOne({_id: targetId});
                        var sharesOsFeed = feedCompany.capTable.sharesOs;
                        var netDebtFeed = feedCompany.capTable.netDebt;
                        var marketCapFeed = sharesOsFeed * targetPrice;
                        var evFeed = marketCapFeed + netDebtFeed;

                        switch (footballOutput) {
                            case "Enterprise Value":
                                return marketCapFeed + netDebtFeed;
                                break;
                            case "Price per Share":
                                return targetPrice;
                                break;
                            case "Multiple":
                                var currentMetric = football.includeCurrentMetric;
                                var currentPeriod = football.includeCurrentPeriod;
                                switch (currentMetric) {
                                    case "EV/Revenue":
                                        switch (currentPeriod) {
                                            case "LTM":
                                                return evFeed / feedCompany.financial.ltm.revenue;
                                                break;
                                            case "FY1":
                                                return evFeed / feedCompany.financial.fy1.revenue;
                                                break;
                                            case "FY2":
                                                return evFeed / feedCompany.financial.fy2.revenue;
                                                break;
                                        }
                                        break;
                                    case "EV/EBITDA":
                                        switch (currentPeriod) {
                                            case "LTM":
                                                return evFeed / feedCompany.financial.ltm.ebitda;
                                                break;
                                            case "FY1":
                                                return evFeed / feedCompany.financial.fy1.ebitda;
                                                break;
                                            case "FY2":
                                                return evFeed / feedCompany.financial.fy2.ebitda;
                                                break;
                                        }
                                        break;
                                    case "Price/Earnings":
                                        switch (currentPeriod) {
                                            case "LTM":
                                                return targetPrice / feedCompany.financial.ltm.eps;
                                                break;
                                            case "FY1":
                                                return targetPrice / feedCompany.financial.fy1.eps;
                                                break;
                                            case "FY2":
                                                return targetPrice / feedCompany.financial.fy2.eps;
                                                break;
                                        }
                                        break;
                                }
                        }
                        break;
                }
        }
    }
});

//Helper for Current d3
Template.registerHelper('currentCalcs',function(footballId) {
    //var footballRangeLow = 0;
    //var footballRangeHigh = 20000;
    var footballRangeLow = getRangeCaps(footballId).min;
    var footballRangeHigh = getRangeCaps(footballId).max;
    var footballRange = footballRangeHigh - footballRangeLow;

    var targetCurrent = UI._globalHelpers.targetCurrent(footballId);
    var start = targetCurrent - footballRangeLow;
    return {
        startPct: start / footballRange * 100
    }
});

Template.registerHelper('tradingCalcs',function(footballId) {
    //var footballRangeLow = 0;
    //var footballRangeHigh = 20000;
    var footballRangeLow = getRangeCaps(footballId).min;
    var footballRangeHigh = getRangeCaps(footballId).max;
    var footballRange = footballRangeHigh - footballRangeLow;

    //10% spread on either side of current price
    var targetCurrent = UI._globalHelpers.targetCurrent(footballId);
    var spread = 0.1;
    var targetLow = targetCurrent * (1 - spread);
    var targetHigh = targetCurrent * (1 + spread);
    var targetWidth = targetHigh - targetLow;
    var start = targetLow - footballRangeLow;
    return {
        startPct: start / footballRange * 100,
        widthPct: targetWidth / footballRange * 100
    }
});

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

////THE NEXT SET OF HELPERS DISABLE THE ABILITY TO EDIT A FOOTBALL FIELD OR VALUATION, DEPENDING ON CERTAIN VARIABLES

//Disables editing if the current user is not the owner
Template.registerHelper('disableOption',function() {
    var ownerId = Template.parentData(0).ownerId;
    var ownerIdTwo = Template.parentData(1).ownerId;
    var currentUserId = Meteor.userId();
    if(currentUserId !== ownerId && currentUserId !== ownerIdTwo) {
        return "disabled";
    }
});

//Disables editing if the current user is not the owner
Template.registerHelper('disableOptionGallery',function() {
    var ownerId = Template.parentData(0).ownerId;
    var currentUserId = Meteor.userId();
    if(currentUserId !== ownerId) {
        return "disabled";
    }
});

//Disables ability to add current or trading values if company is not public
Template.registerHelper('disableOptionPublic',function() {
    var currentUserId = Meteor.userId();
    var ownerId = this.ownerId;
    if(currentUserId !== ownerId) {
        return "disabled";
    } else {
        var footballType = this.footballType;
        switch(footballType) {
            case "market":
                return "disabled";
                break;
            case "target":
                var target = this.footballTarget;
                switch(target.targetType) {
                    case "company":
                        switch(target.targetData) {
                            case "feed":
                                var statusCompany = FeedCompanies.findOne({_id:target.targetId}).status;
                                if(statusCompany == "private") {
                                    return "disabled";
                                }
                                break;
                        }
                        break;
                    case "team":
                        switch(target.targetData) {
                            case "feed":
                                var statusTeam = "private";
                                if(statusTeam == "private") {
                                    return "disabled";
                                }
                                break;
                        }

                }
        }
    }
});

//Disables ability to change Valuation Type or Element if selections have already been made
Template.registerHelper('disableOptionFull',function() {
    var selections = this.valuationSelections;
    var count = selections.length;
    if(count > 0) {
        return "disabled";
    }
});

//Toggle calc between average, median, high and low
Template.registerHelper('calc',function(){
    var valuationCalc = this.valuationCalc;
    switch(valuationCalc) {
        case "average":
            return "Average";
            break;
        case "median":
            return "Median";
            break;
        case "high":
            return "High";
            break;
        case "low":
            return "Low";
            break;
    }
});

