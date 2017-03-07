////VALUATION - BUILD

//Calculate average of a passed array
getAverageVal = function(multiples) {
    var multiplesCut = [];
    multiples.forEach(function (a) {
        //Ignore any N/A values
        if(a > 0 || a < 0) {
            multiplesCut.push(a);
        }
    });
    var total = 0;
    var l = multiplesCut.length;
    for(var i=0; i < l; i++) {
        total += multiplesCut[i];
    }
    return total / l;
};

//Calculate median of a passed array
getMedianVal = function(multiples) {
    var multiplesCut = [];
    multiples.forEach(function (a) {
        //Ignore any N/A values
        if(a > 0 || a < 0) {
            multiplesCut.push(a);
        }
    });
    multiplesCut.sort(function(a,b) {
        return a - b;
    });
    var l = multiplesCut.length;
    var half = Math.floor(l/2);
    if(l % 2) {
        return multiplesCut[half];
    } else {
        return (multiplesCut[half - 1] + multiplesCut[half]) / 2;
    }
};

//Calculate high of a passed array
getHighVal = function(multiples) {
    var multiplesCut = [];
    multiples.forEach(function (a) {
        //Ignore any N/A values
        if(a > 0 || a < 0) {
            multiplesCut.push(a);
        }
    });
    return Math.max.apply(null, multiplesCut);
};

//Calculate low of a passed array
getLowVal = function(multiples) {
    var multiplesCut = [];
    multiples.forEach(function (a) {
        //Ignore any N/A values
        if(a > 0 || a < 0) {
            multiplesCut.push(a);
        }
    });
    return Math.min.apply(null, multiplesCut);
};

//Calculate all averages, medians, highs and lows of valuation.  Saves one object with all values
getValAll = function(footballId, valuationId) {
    var valuation = Valuations.findOne({_id:valuationId});
    var valuationType = valuation.valuationType;
    var valuationSelections = valuation.valuationSelections;
    var valuationMultiples = valuation.multiples;
    var marketType = Footballs.findOne({_id:footballId}).marketType;

    if(valuationSelections.length > 0) {
        if(valuationMultiples) {
            switch(marketType) {
                case "company":
                    switch(valuationType) {
                        case "comps":
                            var evRevLtm = valuation.multiples.evRevenueLtm;
                            var evRevFy1 = valuation.multiples.evRevenueFy1;
                            var evRevFy2 = valuation.multiples.evRevenueFy2;
                            var evEbitdaLtm = valuation.multiples.evEbitdaLtm;
                            var evEbitdaFy1 = valuation.multiples.evEbitdaFy1;
                            var evEbitdaFy2 = valuation.multiples.evEbitdaFy2;
                            var peLtm = valuation.multiples.priceEarningsLtm;
                            var peFy1 = valuation.multiples.priceEarningsFy1;
                            var peFy2 = valuation.multiples.priceEarningsFy2;

                            return {
                                average: {
                                    evRevLtm: getAverageVal(evRevLtm),
                                    evRevFy1: getAverageVal(evRevFy1),
                                    evRevFy2: getAverageVal(evRevFy2),
                                    evEbitdaLtm: getAverageVal(evEbitdaLtm),
                                    evEbitdaFy1: getAverageVal(evEbitdaFy1),
                                    evEbitdaFy2: getAverageVal(evEbitdaFy2),
                                    peLtm: getAverageVal(peLtm),
                                    peFy1: getAverageVal(peFy1),
                                    peFy2: getAverageVal(peFy2)
                                },
                                median: {
                                    evRevLtm: getMedianVal(evRevLtm),
                                    evRevFy1: getMedianVal(evRevFy1),
                                    evRevFy2: getMedianVal(evRevFy2),
                                    evEbitdaLtm: getMedianVal(evEbitdaLtm),
                                    evEbitdaFy1: getMedianVal(evEbitdaFy1),
                                    evEbitdaFy2: getMedianVal(evEbitdaFy2),
                                    peLtm: getMedianVal(peLtm),
                                    peFy1: getMedianVal(peFy1),
                                    peFy2: getMedianVal(peFy2)
                                },
                                high: {
                                    evRevLtm: getHighVal(evRevLtm),
                                    evRevFy1: getHighVal(evRevFy1),
                                    evRevFy2: getHighVal(evRevFy2),
                                    evEbitdaLtm: getHighVal(evEbitdaLtm),
                                    evEbitdaFy1: getHighVal(evEbitdaFy1),
                                    evEbitdaFy2: getHighVal(evEbitdaFy2),
                                    peLtm: getHighVal(peLtm),
                                    peFy1: getHighVal(peFy1),
                                    peFy2: getHighVal(peFy2)
                                },
                                low: {
                                    evRevLtm: getLowVal(evRevLtm),
                                    evRevFy1: getLowVal(evRevFy1),
                                    evRevFy2: getLowVal(evRevFy2),
                                    evEbitdaLtm: getLowVal(evEbitdaLtm),
                                    evEbitdaFy1: getLowVal(evEbitdaFy1),
                                    evEbitdaFy2: getLowVal(evEbitdaFy2),
                                    peLtm: getLowVal(peLtm),
                                    peFy1: getLowVal(peFy1),
                                    peFy2: getLowVal(peFy2)
                                }

                            };
                            break;
                        case "deals":
                            var evRevLtmDeals = valuation.multiples.evRevenueLtm;
                            var evEbitdaLtmDeals = valuation.multiples.evEbitdaLtm;

                            return {
                                average: {
                                    evRevLtm: getAverageVal(evRevLtmDeals),
                                    evEbitdaLtm: getAverageVal(evEbitdaLtmDeals)
                                },
                                median: {
                                    evRevLtm: getMedianVal(evRevLtmDeals),
                                    evEbitdaLtm: getMedianVal(evEbitdaLtmDeals)
                                },
                                high: {
                                    evRevLtm: getHighVal(evRevLtmDeals),
                                    evEbitdaLtm: getHighVal(evEbitdaLtmDeals)
                                },
                                low: {
                                    evRevLtm: getLowVal(evRevLtmDeals),
                                    evEbitdaLtm: getLowVal(evEbitdaLtmDeals)
                                }
                            };
                            break;
                        case "models":
                            var enterpriseValueModel = valuation.multiples.enterpriseValue;
                            var pricePerShareModel = valuation.multiples.pricePerShare;
                            var evRevLtmModel = valuation.multiples.evRevenueLtm;
                            var evRevFy1Model = valuation.multiples.evRevenueFy1;
                            var evRevFy2Model = valuation.multiples.evRevenueFy2;
                            var evEbitdaLtmModel = valuation.multiples.evEbitdaLtm;
                            var evEbitdaFy1Model = valuation.multiples.evEbitdaFy1;
                            var evEbitdaFy2Model = valuation.multiples.evEbitdaFy2;
                            var peLtmModel = valuation.multiples.priceEarningsLtm;
                            var peFy1Model = valuation.multiples.priceEarningsFy1;
                            var peFy2Model = valuation.multiples.priceEarningsFy2;

                            return {
                                average: {
                                    enterpriseValue: getAverageVal(enterpriseValueModel),
                                    pricePerShare: getAverageVal(pricePerShareModel),
                                    evRevLtm: getAverageVal(evRevLtmModel),
                                    evRevFy1: getAverageVal(evRevFy1Model),
                                    evRevFy2: getAverageVal(evRevFy2Model),
                                    evEbitdaLtm: getAverageVal(evEbitdaLtmModel),
                                    evEbitdaFy1: getAverageVal(evEbitdaFy1Model),
                                    evEbitdaFy2: getAverageVal(evEbitdaFy2Model),
                                    peLtm: getAverageVal(peLtmModel),
                                    peFy1: getAverageVal(peFy1Model),
                                    peFy2: getAverageVal(peFy2Model)
                                },
                                median: {
                                    enterpriseValue: getMedianVal(enterpriseValueModel),
                                    pricePerShare: getMedianVal(pricePerShareModel),
                                    evRevLtm: getMedianVal(evRevLtmModel),
                                    evRevFy1: getMedianVal(evRevFy1Model),
                                    evRevFy2: getMedianVal(evRevFy2Model),
                                    evEbitdaLtm: getMedianVal(evEbitdaLtmModel),
                                    evEbitdaFy1: getMedianVal(evEbitdaFy1Model),
                                    evEbitdaFy2: getMedianVal(evEbitdaFy2Model),
                                    peLtm: getMedianVal(peLtmModel),
                                    peFy1: getMedianVal(peFy1Model),
                                    peFy2: getMedianVal(peFy2Model)
                                },
                                high: {
                                    enterpriseValue: getHighVal(enterpriseValueModel),
                                    pricePerShare: getHighVal(pricePerShareModel),
                                    evRevLtm: getHighVal(evRevLtmModel),
                                    evRevFy1: getHighVal(evRevFy1Model),
                                    evRevFy2: getHighVal(evRevFy2Model),
                                    evEbitdaLtm: getHighVal(evEbitdaLtmModel),
                                    evEbitdaFy1: getHighVal(evEbitdaFy1Model),
                                    evEbitdaFy2: getHighVal(evEbitdaFy2Model),
                                    peLtm: getHighVal(peLtmModel),
                                    peFy1: getHighVal(peFy1Model),
                                    peFy2: getHighVal(peFy2Model)
                                },
                                low: {
                                    enterpriseValue: getLowVal(enterpriseValueModel),
                                    pricePerShare: getLowVal(pricePerShareModel),
                                    evRevLtm: getLowVal(evRevLtmModel),
                                    evRevFy1: getLowVal(evRevFy1Model),
                                    evRevFy2: getLowVal(evRevFy2Model),
                                    evEbitdaLtm: getLowVal(evEbitdaLtmModel),
                                    evEbitdaFy1: getLowVal(evEbitdaFy1Model),
                                    evEbitdaFy2: getLowVal(evEbitdaFy2Model),
                                    peLtm: getLowVal(peLtmModel),
                                    peFy1: getLowVal(peFy1Model),
                                    peFy2: getLowVal(peFy2Model)
                                }

                            };
                            break;
                        case "custom":
                            var customValue = valuation.multiples.customValue;

                            return {
                                average: {
                                    customValue: getAverageVal(customValue)
                                },
                                median: {
                                    customValue: getMedianVal(customValue)
                                },
                                high: {
                                    customValue: getHighVal(customValue)
                                },
                                low: {
                                    customValue: getLowVal(customValue)
                                }

                            };
                            break;
                    }
                    break;
                case "team":
                    switch(valuationType) {
                        case "comps":
                            var evRevFy0 = valuation.multiples.evRevenueFy0;
                            var evAttendanceFy0 = valuation.multiples.evAttendanceFy0;

                            return {
                                average: {
                                    evRevFy0: getAverageVal(evRevFy0),
                                    evAttendanceFy0: getAverageVal(evAttendanceFy0)
                                },
                                median: {
                                    evRevFy0: getMedianVal(evRevFy0),
                                    evAttendanceFy0: getMedianVal(evAttendanceFy0)
                                },
                                high: {
                                    evRevFy0: getHighVal(evRevFy0),
                                    evAttendanceFy0: getHighVal(evAttendanceFy0)
                                },
                                low: {
                                    evRevFy0: getLowVal(evRevFy0),
                                    evAttendanceFy0: getLowVal(evAttendanceFy0)
                                }
                            };
                            break;
                    }

            }
        }
    }
};

//Determine which value is active, depending on valuationCalc (average, median, high or low)
getVal = function(footballId, valuationId) {
    var valuation = Valuations.findOne({_id:valuationId});
    var valuationCalc = valuation.valuationCalc;
    var valuationSelections = valuation.valuationSelections;
    var valuationMultiples = valuation.multiples;

    if(valuationSelections.length > 0) {
        if(valuationMultiples) {
            switch(valuationCalc) {
                case "average":
                    return getValAll(footballId, valuationId).average;
                    break;
                case "median":
                    return getValAll(footballId, valuationId).median;
                    break;
                case "high":
                    return getValAll(footballId, valuationId).high;
                    break;
                case "low":
                    return getValAll(footballId, valuationId).low;
                    break;
            }
        }
    }
};

//Determines which multiple is active, based on valuationMetric and valuationPeriod
//This will be the multiple used to calculate the dimensions of the bar
getBuildMultiple = function(footballId, valuationId) {
    var football = Footballs.findOne({_id: footballId});
    var footballOutput = football.footballOutput;
    var marketType = football.marketType;

    var valuation = Valuations.findOne({_id: valuationId});
    var valuationMetric = valuation.valuationMetric;
    var valuationPeriod = valuation.valuationPeriod;
    var valuationSelections = valuation.valuationSelections;
    var valuationMultiples = valuation.multiples;

    var val = getVal(footballId, valuationId);

    var scaleAdjust = getScaleRange(footballId);

    if (valuationSelections.length > 0) {
        if (valuationMultiples) {
            switch (marketType) {
                case "company":
                    var valuationType = valuation.valuationType;
                    switch (valuationType) {
                        case "comps":
                            switch (valuationMetric) {
                                case "EV/Revenue":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return val.evRevLtm;
                                            break;
                                        case "FY1":
                                            return val.evRevFy1;
                                            break;
                                        case "FY2":
                                            return val.evRevFy2;
                                            break;
                                    }
                                    break;
                                case "EV/EBITDA":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return val.evEbitdaLtm;
                                            break;
                                        case "FY1":
                                            return val.evEbitdaFy1;
                                            break;
                                        case "FY2":
                                            return val.evEbitdaFy2;
                                            break;
                                    }
                                    break;
                                case "Price/Earnings":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return val.peLtm;
                                            break;
                                        case "FY1":
                                            return val.peFy1;
                                            break;
                                        case "FY2":
                                            return val.peFy2;
                                            break;
                                    }
                                    break;
                            }
                            break;
                        case "deals":
                            switch (valuationMetric) {
                                case "EV/Revenue":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return val.evRevLtm;
                                            break;
                                        case "FY1":
                                            return val.evRevFy1;
                                            break;
                                        case "FY2":
                                            return val.evRevFy2;
                                            break;
                                    }
                                    break;
                                case "EV/EBITDA":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return val.evEbitdaLtm;
                                            break;
                                        case "FY1":
                                            return val.evEbitdaFy1;
                                            break;
                                        case "FY2":
                                            return val.evEbitdaFy2;
                                            break;
                                    }
                                    break;
                                case "Price/Earnings":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return val.peLtm;
                                            break;
                                        case "FY1":
                                            return val.peFy1;
                                            break;
                                        case "FY2":
                                            return val.peFy2;
                                            break;
                                    }
                                    break;
                            }
                            break;
                        case "models":
                            switch (footballOutput) {
                                case "Enterprise Value":
                                    return val.enterpriseValue / scaleAdjust;
                                    break;
                                case "Price per Share":
                                    return val.pricePerShare;
                                    break;
                                case "Multiple":
                                    switch (valuationMetric) {
                                        case "EV/Revenue":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return val.evRevLtm;
                                                    break;
                                                case "FY1":
                                                    return val.evRevFy1;
                                                    break;
                                                case "FY2":
                                                    return val.evRevFy2;
                                                    break;
                                            }
                                            break;
                                        case "EV/EBITDA":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return val.evEbitdaLtm;
                                                    break;
                                                case "FY1":
                                                    return val.evEbitdaFy1;
                                                    break;
                                                case "FY2":
                                                    return val.evEbitdaFy2;
                                                    break;
                                            }
                                            break;
                                        case "Price/Earnings":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return val.peLtm;
                                                    break;
                                                case "FY1":
                                                    return val.peFy1;
                                                    break;
                                                case "FY2":
                                                    return val.peFy2;
                                                    break;
                                            }
                                            break;
                                    }
                                    break;
                            }
                            break;
                        case "custom":
                            var existingCustom = this.existingCustom;
                            if (existingCustom == "customValue") {
                                var scale = Template.parentData(1).footballScale;
                                switch (scale) {
                                    case "millions":
                                        return val.customValue;
                                        break;
                                    case "billions":
                                        return val.customValue / 1000;
                                        break;
                                }
                            } else {
                                return val.customValue;
                            }
                            break;
                    }
                    break;
                case "team":
                    switch (valuationMetric) {
                        case "EV/Revenue":
                            switch (valuationPeriod) {
                                case "FY0":
                                    return val.evRevFy0;
                                    break;
                            }
                            break;
                        case "EV/Attendance":
                            switch (valuationPeriod) {
                                case "FY0":
                                    return val.evAttendanceFy0;
                                    break;
                            }
                            break;
                    }
                    break;
            }
        }
    }
};

Template.registerHelper('buildMultiple',function(){
    var valuationId = this._id;
    var footballId = Template.parentData(1)._id;
    return getBuildMultiple(footballId, valuationId);
});

//Determines which Build Value from above is active, given valuationMetric and valuationPeriod
//This is the value used to calculate the dimensions of the bar
getBuildValue = function(footballId, valuationId) {
    var football = Footballs.findOne({_id:footballId});
    var footballType = football.footballType;
    var footballOutput = football.footballOutput;
    var targetType = football.footballTarget.targetType;

    var valuation = Valuations.findOne({_id:valuationId});
    var valuationSelections = valuation.valuationSelections;
    var valuationMetric = valuation.valuationMetric;
    var valuationPeriod = valuation.valuationPeriod;
    var valuationMultiples = valuation.multiples;

    var buildMultiple = getBuildMultiple(valuation, footballId);

    if(valuationSelections.length > 0) {
        if(valuationMultiples) {
            if (footballType == "target") {
                switch (targetType) {
                    case "company":
                        var feedCompany = FeedCompanies.findOne({_id: target.targetId});

                        var feedCompanyData = {
                            revenueLtm: feedCompany.financial.ltm.revenue,
                            revenueFy1: feedCompany.financial.fy1.revenue,
                            revenueFy2: feedCompany.financial.fy2.revenue,
                            ebitdaLtm: feedCompany.financial.ltm.ebitda,
                            ebitdaFy1: feedCompany.financial.fy1.ebitda,
                            ebitdaFy2: feedCompany.financial.fy2.ebitda,
                            epsLtm: feedCompany.financial.ltm.eps,
                            epsFy1: feedCompany.financial.fy1.eps,
                            epsFy2: feedCompany.financial.fy2.eps,
                            sharesOs: feedCompany.capTable.sharesOs,
                            netDebt: feedCompany.capTable.netDebt
                        };
                        var valuationType = valuation.valuationType;
                        switch(valuationType) {
                            case "comps":
                                switch (valuationMetric) {
                                    case "EV/Revenue":
                                        switch (valuationPeriod) {
                                            case "LTM":
                                                return feedCompanyData.revenueLtm * buildMultiple;
                                                break;
                                            case "FY1":
                                                return feedCompanyData.revenueFy1 * buildMultiple;
                                                break;
                                            case "FY2":
                                                return feedCompanyData.revenueFy2 * buildMultiple;
                                                break;
                                        }
                                        break;
                                    case "EV/EBITDA":
                                        switch (valuationPeriod) {
                                            case "LTM":
                                                return feedCompanyData.ebitdaLtm * buildMultiple;
                                                break;
                                            case "FY1":
                                                return feedCompanyData.ebitdaFy1 * buildMultiple;
                                                break;
                                            case "FY2":
                                                return feedCompanyData.ebitdaFy2 * buildMultiple;
                                                break;
                                        }
                                        break;
                                    case "Price/Earnings":
                                        switch (valuationPeriod) {
                                            case "LTM":
                                                return feedCompanyData.epsLtm * buildMultiple;
                                                break;
                                            case "FY1":
                                                return feedCompanyData.epsFy1 * buildMultiple;
                                                break;
                                            case "FY2":
                                                return feedCompanyData.epsFy2 * buildMultiple;
                                                break;
                                        }
                                        break;
                                }
                                break;
                            case "deals":
                                switch (valuationMetric) {
                                    case "EV/Revenue":
                                        switch (valuationPeriod) {
                                            case "LTM":
                                                return feedCompanyData.revenueLtm * buildMultiple;
                                                break;
                                            case "FY1":
                                                return feedCompanyData.revenueFy1 * buildMultiple;
                                                break;
                                            case "FY2":
                                                return feedCompanyData.revenueFy2 * buildMultiple;
                                                break;
                                        }
                                        break;
                                    case "EV/EBITDA":
                                        switch (valuationPeriod) {
                                            case "LTM":
                                                return feedCompanyData.ebitdaLtm * buildMultiple;
                                                break;
                                            case "FY1":
                                                return feedCompanyData.ebitdaFy1 * buildMultiple;
                                                break;
                                            case "FY2":
                                                return feedCompanyData.ebitdaFy2 * buildMultiple;
                                                break;
                                        }
                                        break;
                                    case "Price/Earnings":
                                        switch (valuationPeriod) {
                                            case "LTM":
                                                return feedCompanyData.epsLtm * buildMultiple;
                                                break;
                                            case "FY1":
                                                return feedCompanyData.epsFy1 * buildMultiple;
                                                break;
                                            case "FY2":
                                                return feedCompanyData.epsFy2 * buildMultiple;
                                                break;
                                        }
                                        break;
                                }
                                break;
                            case "models":
                                switch(footballOutput) {
                                    case "Enterprise Value":
                                        return buildMultiple;
                                        break;
                                    case "Price per Share":
                                        return buildMultiple;
                                        break;
                                }
                                break;
                            case "custom":
                                return buildMultiple;
                                break;
                        }
                        break;
                    case "team":
                        var feedTeam = FeedTeams.findOne({_id: target.targetId});

                        var feedTeamData = {
                            revenueFy0: feedTeam.financial.fy0.revenue,
                            attendanceFy0: feedTeam.financial.fy0.attendance
                        };
                        switch (valuationMetric) {
                            case "EV/Revenue":
                                switch (valuationPeriod) {
                                    case "FY0":
                                        return feedTeamData.revenueFy0 * buildMultiple;
                                        break;
                                }
                                break;
                            case "EV/Attendance":
                                switch (valuationPeriod) {
                                    case "FY0":
                                        return feedTeamData.attendanceFy0 * buildMultiple;
                                        break;
                                }
                                break;
                        }
                        break;
                }
            }
        }
    }
};

Template.registerHelper('buildValue',function(){
    var footballId = Template.parentData(1)._id;
    var valuationId = Template.parentData(0)._id;
    return getBuildValue(footballId, valuationId);
});

//Determines Active Result from above, given valuationOutput, valuationOutputPeriod, valuationMetric, ValuationPeriod
getResultValue = function(footballId, valuationId) {
    var football = Footballs.findOne({_id: footballId});
    var footballOutput = football.footballOutput;
    var footballType = football.footballType;
    var marketType = football.marketType;

    var valuation = Valuations.findOne({_id: valuationId});
    var valuationSelections = valuation.valuationSelections;
    var valuationMultiples = valuation.multiples;

    if (valuationSelections.length > 0 && valuationMultiples) {
        var valuationMetric = valuation.valuationMetric;
        var valuationPeriod = valuation.valuationPeriod;
        var valuationOutput = valuation.valuationOutput;
        var valuationOutputPeriod = valuation.valuationOutputPeriod;

        var buildMultiple = getBuildMultiple(footballId, valuationId);
        if (buildMultiple) {
            if (footballType == "market") {
                switch (marketType) {
                    case "company":
                        switch (valuationMetric) {
                            case "EV/Revenue":
                                switch (valuationPeriod) {
                                    case "LTM":
                                        console.log(getResultAll(footballId, valuationId).evRevLtm);
                                        return getResultAll(footballId, valuationId).evRevLtm;
                                        break;
                                    case "FY1":
                                        return getResultAll(footballId, valuationId).evRevFy1;
                                        break;
                                    case "FY2":
                                        return getResultAll(footballId, valuationId).evRevFy2;
                                        break;
                                }
                                break;
                            case "EV/EBITDA":
                                switch (valuationPeriod) {
                                    case "LTM":
                                        return getResultAll(footballId, valuationId).evEbitdaLtm;
                                        break;
                                    case "FY1":
                                        return getResultAll(footballId, valuationId).evEbitdaFy1;
                                        break;
                                    case "FY2":
                                        return getResultAll(footballId, valuationId).evEbitdaFy2;
                                        break;
                                }
                                break;
                            case "Price/Earnings":
                                switch (valuationPeriod) {
                                    case "LTM":
                                        return getResultAll(footballId, valuationId).peLtm;
                                        break;
                                    case "FY1":
                                        return getResultAll(footballId, valuationId).peFy1;
                                        break;
                                    case "FY2":
                                        return getResultAll(footballId, valuationId).peFy2;
                                        break;
                                }
                                break;
                        }
                        break;
                    case "team":
                        switch (valuationMetric) {
                            case "EV/Revenue":
                                switch (valuationPeriod) {
                                    case "FY0":
                                        return getResultAll(footballId, valuationId).evRevFy0;
                                        break;
                                }
                                break;
                            case "EV/Attendance":
                                switch (valuationPeriod) {
                                    case "FY0":
                                        return getResultAll(footballId, valuationId).evAttendanceFy0;
                                        break;
                                }
                                break;
                        }
                        break;
                }
            } else {
                var targetType = football.footballTarget.targetType;
                switch (targetType) {
                    case "company":
                        var valuationType = valuation.valuationType;
                        if (valuationType == "comps" || valuationType == "deals") {
                            switch (valuationMetric) {
                                case "EV/Revenue":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            switch (footballOutput) {
                                                case "Enterprise Value":
                                                    return getResultAll(footballId, valuationId).evRev.ltm.ev;
                                                    break;
                                                case "Price per Share":
                                                    return getResultAll(footballId, valuationId).evRev.ltm.price;
                                                    break;
                                                case "Multiple":
                                                    switch (valuationOutput) {
                                                        case "EV/Revenue":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evRev.ltm.multiple.evRev.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evRev.ltm.multiple.evRev.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evRev.ltm.multiple.evRev.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "EV/EBITDA":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evRev.ltm.multiple.evEbitda.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evRev.ltm.multiple.evEbitda.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evRev.ltm.multiple.evEbitda.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "Price/Earnings":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evRev.ltm.multiple.pe.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evRev.ltm.multiple.pe.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evRev.ltm.multiple.pe.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                    break;
                                            }
                                            break;
                                        case "FY1":
                                            switch (footballOutput) {
                                                case "Enterprise Value":
                                                    return getResultAll(footballId, valuationId).evRev.fy1.ev;
                                                    break;
                                                case "Price per Share":
                                                    return getResultAll(footballId, valuationId).evRev.fy1.price;
                                                    break;
                                                case "Multiple":
                                                    switch (valuationOutput) {
                                                        case "EV/Revenue":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evRev.fy1.multiple.evRev.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evRev.fy1.multiple.evRev.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evRev.fy1.multiple.evRev.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "EV/EBITDA":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evRev.fy1.multiple.evEbitda.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evRev.fy1.multiple.evEbitda.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evRev.fy1.multiple.evEbitda.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "Price/Earnings":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evRev.fy1.multiple.pe.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evRev.fy1.multiple.pe.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evRev.fy1.multiple.pe.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                    break;
                                            }
                                            break;
                                        case "FY2":
                                            switch (footballOutput) {
                                                case "Enterprise Value":
                                                    return getResultAll(footballId, valuationId).evRev.fy2.ev;
                                                    break;
                                                case "Price per Share":
                                                    return getResultAll(footballId, valuationId).evRev.fy2.price;
                                                    break;
                                                case "Multiple":
                                                    switch (valuationOutput) {
                                                        case "EV/Revenue":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evRev.fy2.multiple.evRev.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evRev.fy2.multiple.evRev.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evRev.fy2.multiple.evRev.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "EV/EBITDA":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evRev.fy2.multiple.evEbitda.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evRev.fy2.multiple.evEbitda.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evRev.fy2.multiple.evEbitda.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "Price/Earnings":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evRev.fy2.multiple.pe.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evRev.fy2.multiple.pe.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evRev.fy2.multiple.pe.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                    break;
                                            }
                                            break;
                                    }
                                    break;
                                case "EV/EBITDA":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            switch (footballOutput) {
                                                case "Enterprise Value":
                                                    return getResultAll(footballId, valuationId).evEbitda.ltm.ev;
                                                    break;
                                                case "Price per Share":
                                                    return getResultAll(footballId, valuationId).evEbitda.ltm.price;
                                                    break;
                                                case "Multiple":
                                                    switch (valuationOutput) {
                                                        case "EV/Revenue":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evEbitda.ltm.multiple.evRev.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evEbitda.ltm.multiple.evRev.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evEbitda.ltm.multiple.evRev.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "EV/EBITDA":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evEbitda.ltm.multiple.evEbitda.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evEbitda.ltm.multiple.evEbitda.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evEbitda.ltm.multiple.evEbitda.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "Price/Earnings":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evEbitda.ltm.multiple.pe.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evEbitda.ltm.multiple.pe.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evEbitda.ltm.multiple.pe.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                    break;
                                            }
                                            break;
                                        case "FY1":
                                            switch (footballOutput) {
                                                case "Enterprise Value":
                                                    return getResultAll(footballId, valuationId).evEbitda.fy1.ev;
                                                    break;
                                                case "Price per Share":
                                                    return getResultAll(footballId, valuationId).evEbitda.fy1.price;
                                                    break;
                                                case "Multiple":
                                                    switch (valuationOutput) {
                                                        case "EV/Revenue":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy1.multiple.evRev.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy1.multiple.evRev.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy1.multiple.evRev.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "EV/EBITDA":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy1.multiple.evEbitda.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy1.multiple.evEbitda.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy1.multiple.evEbitda.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "Price/Earnings":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy1.multiple.pe.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy1.multiple.pe.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy1.multiple.pe.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                    break;
                                            }
                                            break;
                                        case "FY2":
                                            switch (footballOutput) {
                                                case "Enterprise Value":
                                                    return getResultAll(footballId, valuationId).evEbitda.fy2.ev;
                                                    break;
                                                case "Price per Share":
                                                    return getResultAll(footballId, valuationId).evEbitda.fy2.price;
                                                    break;
                                                case "Multiple":
                                                    switch (valuationOutput) {
                                                        case "EV/Revenue":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy2.multiple.evRev.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy2.multiple.evRev.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy2.multiple.evRev.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "EV/EBITDA":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy2.multiple.evEbitda.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy2.multiple.evEbitda.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy2.multiple.evEbitda.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "Price/Earnings":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy2.multiple.pe.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy2.multiple.pe.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).evEbitda.fy2.multiple.pe.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                    break;
                                            }
                                            break;
                                    }
                                    break;
                                case "Price/Earnings":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            switch (footballOutput) {
                                                case "Enterprise Value":
                                                    return getResultAll(footballId, valuationId).pe.ltm.ev;
                                                    break;
                                                case "Price per Share":
                                                    return getResultAll(footballId, valuationId).pe.ltm.price;
                                                    break;
                                                case "Multiple":
                                                    switch (valuationOutput) {
                                                        case "EV/Revenue":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).pe.ltm.multiple.evRev.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).pe.ltm.multiple.evRev.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).pe.ltm.multiple.evRev.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "EV/EBITDA":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).pe.ltm.multiple.evEbitda.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).pe.ltm.multiple.evEbitda.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).pe.ltm.multiple.evEbitda.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "Price/Earnings":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).pe.ltm.multiple.pe.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).pe.ltm.multiple.pe.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).pe.ltm.multiple.pe.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                    break;
                                            }
                                            break;
                                        case "FY1":
                                            switch (footballOutput) {
                                                case "Enterprise Value":
                                                    return getResultAll(footballId, valuationId).pe.fy1.ev;
                                                    break;
                                                case "Price per Share":
                                                    return getResultAll(footballId, valuationId).pe.fy1.price;
                                                    break;
                                                case "Multiple":
                                                    switch (valuationOutput) {
                                                        case "EV/Revenue":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).pe.fy1.multiple.evRev.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).pe.fy1.multiple.evRev.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).pe.fy1.multiple.evRev.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "EV/EBITDA":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).pe.fy1.multiple.evEbitda.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).pe.fy1.multiple.evEbitda.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).pe.fy1.multiple.evEbitda.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "Price/Earnings":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).pe.fy1.multiple.pe.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).pe.fy1.multiple.pe.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).pe.fy1.multiple.pe.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                    }
                                                    break;
                                            }
                                            break;
                                        case "FY2":
                                            switch (footballOutput) {
                                                case "Enterprise Value":
                                                    return getResultAll(footballId, valuationId).pe.fy2.ev;
                                                    break;
                                                case "Price per Share":
                                                    return getResultAll(footballId, valuationId).pe.fy2.price;
                                                    break;
                                                case "Multiple":
                                                    switch (valuationOutput) {
                                                        case "EV/Revenue":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).pe.fy2.multiple.evRev.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).pe.fy2.multiple.evRev.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).pe.fy2.multiple.evRev.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "EV/EBITDA":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).pe.fy2.multiple.evEbitda.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).pe.fy2.multiple.evEbitda.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).pe.fy2.multiple.evEbitda.fy2;
                                                                    break;
                                                            }
                                                            break;
                                                        case "Price/Earnings":
                                                            switch (valuationOutputPeriod) {
                                                                case "LTM":
                                                                    return getResultAll(footballId, valuationId).pe.fy2.multiple.pe.ltm;
                                                                    break;
                                                                case "FY1":
                                                                    return getResultAll(footballId, valuationId).pe.fy2.multiple.pe.fy1;
                                                                    break;
                                                                case "FY2":
                                                                    return getResultAll(footballId, valuationId).pe.fy2.multiple.pe.fy2;
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
                        } else {
                            if (valuationType == "models") {
                                switch (footballOutput) {
                                    case "Enterprise Value":
                                        return getResultAll(footballId, valuationId).enterpriseValue;
                                        break;
                                    case "Price per Share":
                                        return getResultAll(footballId, valuationId).pricePerShare;
                                        break;
                                    case "Multiple":
                                        switch (valuationMetric) {
                                            case "EV/Revenue":
                                                switch (valuationPeriod) {
                                                    case "LTM":
                                                        return getResultAll(footballId, valuationId).evRevenueLtm;
                                                        break;
                                                    case "FY1":
                                                        return getResultAll(footballId, valuationId).evRevenueFy1;
                                                        break;
                                                    case "FY2":
                                                        return getResultAll(footballId, valuationId).evRevenueFy2;
                                                        break;
                                                }
                                                break;
                                            case "EV/EBITDA":
                                                switch (valuationPeriod) {
                                                    case "LTM":
                                                        return getResultAll(footballId, valuationId).evEbitdaLtm;
                                                        break;
                                                    case "FY1":
                                                        return getResultAll(footballId, valuationId).evEbitdaFy1;
                                                        break;
                                                    case "FY2":
                                                        return getResultAll(footballId, valuationId).evEbitdaFy2;
                                                        break;
                                                }
                                                break;
                                            case "Price/Earnings":
                                                switch (valuationPeriod) {
                                                    case "LTM":
                                                        return getResultAll(footballId, valuationId).priceEarningsLtm;
                                                        break;
                                                    case "FY1":
                                                        return getResultAll(footballId, valuationId).priceEarningsFy1;
                                                        break;
                                                    case "FY2":
                                                        return getResultAll(footballId, valuationId).priceEarningsFy2;
                                                        break;
                                                }
                                                break;
                                        }
                                        break;
                                }
                            } else {
                                return getResultAll(footballId, valuationId).customValue;
                            }
                        }
                        break;
                    case "team":
                        switch (valuationMetric) {
                            case "EV/Revenue":
                                switch (valuationPeriod) {
                                    case "FY0":
                                        switch (footballOutput) {
                                            case "Enterprise Value":
                                                return getResultAll(footballId, valuationId).evRev.fy0.ev;
                                                break;
                                            case "Multiple":
                                                switch (valuationOutput) {
                                                    case "EV/Revenue":
                                                        switch (valuationOutputPeriod) {
                                                            case "FY0":
                                                                return getResultAll(footballId, valuationId).evRev.fy0.multiple.evRev.fy0;
                                                                break;
                                                        }
                                                        break;
                                                    case "EV/Attendance":
                                                        switch (valuationOutputPeriod) {
                                                            case "FY0":
                                                                return getResultAll(footballId, valuationId).evRev.fy0.multiple.evAttendance.fy0;
                                                                break;
                                                        }
                                                        break;
                                                }
                                                break;
                                        }
                                        break;
                                }
                                break;
                            case "EV/Attendance":
                                switch (valuationPeriod) {
                                    case "FY0":
                                        switch (footballOutput) {
                                            case "Enterprise Value":
                                                return getResultAll(footballId, valuationId).evAttendance.fy0.ev;
                                                break;
                                            case "Multiple":
                                                switch (valuationOutput) {
                                                    case "EV/Revenue":
                                                        switch (valuationOutputPeriod) {
                                                            case "FY0":
                                                                return getResultAll(footballId, valuationId).evAttendance.fy0.multiple.evRev.fy0;
                                                                break;
                                                        }
                                                        break;
                                                    case "EV/Attendance":
                                                        switch (valuationOutputPeriod) {
                                                            case "FY0":
                                                                return getResultAll(footballId, valuationId).evAttendance.fy0.multiple.evAttendance.fy0;
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
                        break;
                }
            }
        }
    }
};

Template.registerHelper('resultValue', function() {
    var footballId = Template.parentData(1)._id;
    var valuationId = Template.parentData(0)._id;
    return getResultValue(footballId, valuationId);
});

//Calculates high and low value of valuation bar
Template.registerHelper('valuationLowHigh',function(footballId) {
    var football = Footballs.findOne({_id:footballId});
    var footballSpread = football.footballSpread;

    var valuationId = Template.parentData(0)._id;
    //var valuationActive = Valuations.findOne({_id:valuationId}).valuationActive;
    var valuationActive = getResultValue(footballId, valuationId);

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