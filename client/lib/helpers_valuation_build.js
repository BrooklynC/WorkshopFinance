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

//Determines which multiple to use for Build, using previous helpers to determine Average/Median/High/Low
getBuildMultiple = function(footballId, valuationId) {
    var valuation = Valuations.findOne({_id:valuationId});
    var valuationSelections = valuation.valuationSelections;
    var valuationMultiples = valuation.multiples;
    var marketType = Footballs.findOne({_id:footballId}).marketType;

    if(valuationSelections.length > 0) {
        if(valuationMultiples) {
            var val = getVal(footballId, valuationId);
            switch(marketType) {
                case "company":
                    return {
                        enterpriseValue: val.enterpriseValue,
                        pricePerShare: val.pricePerShare,
                        evRevLtm: val.evRevLtm,
                        evRevFy1: val.evRevFy1,
                        evRevFy2: val.evRevFy2,
                        evEbitdaLtm: val.evEbitdaLtm,
                        evEbitdaFy1: val.evEbitdaFy1,
                        evEbitdaFy2: val.evEbitdaFy2,
                        peLtm: val.peLtm,
                        peFy1: val.peFy1,
                        peFy2: val.peFy2,
                        customValue: val.customValue
                    };
                    break;
                case "team":
                    return {
                        evRevFy0: val.evRevFy0,
                        evAttendanceFy0: val.evAttendanceFy0
                    };
                    break;
            }
        }
    }
};

//Determines which multiple is active, based on valuationMetric and valuationPeriod
//This will be the multiple used to calculate the dimensions of the bar
Template.registerHelper('buildMultiple',function(){
    var valuationId = this._id;

    var footballId = Template.parentData(1)._id;
    var football = Footballs.findOne({_id:footballId});
    var marketType = football.marketType;
    var footballOutput = football.footballOutput;

    var valuation = Valuations.findOne({_id:valuationId});
    var valuationMetric = valuation.valuationMetric;
    var valuationPeriod = valuation.valuationPeriod;
    var valuationSelections = valuation.valuationSelections;
    var valuationMultiples = valuation.multiples;

    var scaleAdjust = getScaleRange(footballId);

    if(valuationSelections.length > 0) {
        if(valuationMultiples) {
            switch(marketType) {
                case "company":
                    var valuationType = valuation.valuationType;
                    switch(valuationType) {
                        case "comps":
                            switch (valuationMetric) {
                                case "EV/Revenue":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return getBuildMultiple(footballId, valuationId).evRevLtm;
                                            break;
                                        case "FY1":
                                            return getBuildMultiple(footballId, valuationId).evRevFy1;
                                            break;
                                        case "FY2":
                                            return getBuildMultiple(footballId, valuationId).evRevFy2;
                                            break;
                                    }
                                    break;
                                case "EV/EBITDA":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return getBuildMultiple(footballId, valuationId).evEbitdaLtm;
                                            break;
                                        case "FY1":
                                            return getBuildMultiple(footballId, valuationId).evEbitdaFy1;
                                            break;
                                        case "FY2":
                                            return getBuildMultiple(footballId, valuationId).evEbitdaFy2;
                                            break;
                                    }
                                    break;
                                case "Price/Earnings":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return getBuildMultiple(footballId, valuationId).peLtm;
                                            break;
                                        case "FY1":
                                            return getBuildMultiple(footballId, valuationId).peFy1;
                                            break;
                                        case "FY2":
                                            return getBuildMultiple(footballId, valuationId).peFy2;
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
                                            return getBuildMultiple(footballId, valuationId).evRevLtm;
                                            break;
                                        case "FY1":
                                            return getBuildMultiple(footballId, valuationId).evRevFy1;
                                            break;
                                        case "FY2":
                                            return getBuildMultiple(footballId, valuationId).evRevFy2;
                                            break;
                                    }
                                    break;
                                case "EV/EBITDA":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return getBuildMultiple(footballId, valuationId).evEbitdaLtm;
                                            break;
                                        case "FY1":
                                            return getBuildMultiple(footballId, valuationId).evEbitdaFy1;
                                            break;
                                        case "FY2":
                                            return getBuildMultiple(footballId, valuationId).evEbitdaFy2;
                                            break;
                                    }
                                    break;
                                case "Price/Earnings":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return getBuildMultiple(footballId, valuationId).peLtm;
                                            break;
                                        case "FY1":
                                            return getBuildMultiple(footballId, valuationId).peFy1;
                                            break;
                                        case "FY2":
                                            return getBuildMultiple(footballId, valuationId).peFy2;
                                            break;
                                    }
                                    break;
                            }
                            break;
                        case "models":
                            switch (footballOutput) {
                                case "Enterprise Value":
                                    return getBuildMultiple(footballId, valuationId).enterpriseValue / scaleAdjust;
                                    break;
                                case "Price per Share":
                                    return getBuildMultiple(footballId, valuationId).pricePerShare;
                                    break;
                                case "Multiple":
                                    switch (valuationMetric) {
                                        case "EV/Revenue":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return getBuildMultiple(footballId, valuationId).evRevLtm;
                                                    break;
                                                case "FY1":
                                                    return getBuildMultiple(footballId, valuationId).evRevFy1;
                                                    break;
                                                case "FY2":
                                                    return getBuildMultiple(footballId, valuationId).evRevFy2;
                                                    break;
                                            }
                                            break;
                                        case "EV/EBITDA":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return getBuildMultiple(footballId, valuationId).evEbitdaLtm;
                                                    break;
                                                case "FY1":
                                                    return getBuildMultiple(footballId, valuationId).evEbitdaFy1;
                                                    break;
                                                case "FY2":
                                                    return getBuildMultiple(footballId, valuationId).evEbitdaFy2;
                                                    break;
                                            }
                                            break;
                                        case "Price/Earnings":
                                            switch (valuationPeriod) {
                                                case "LTM":
                                                    return getBuildMultiple(footballId, valuationId).peLtm;
                                                    break;
                                                case "FY1":
                                                    return getBuildMultiple(footballId, valuationId).peFy1;
                                                    break;
                                                case "FY2":
                                                    return getBuildMultiple(footballId, valuationId).peFy2;
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
                                console.log("existingCustom: ", existingCustom);
                                console.log("Scale: ", scale);
                                switch (scale) {
                                    case "millions":
                                        return getBuildMultiple(footballId, valuationId).customValue;
                                        break;
                                    case "billions":
                                        return getBuildMultiple(footballId, valuationId).customValue / 1000;
                                        break;
                                }
                            } else {
                                return getBuildMultiple(footballId, valuationId).customValue;
                            }
                            break;
                    }
                    break;
                case "team":
                    switch (valuationMetric) {
                        case "EV/Revenue":
                            switch (valuationPeriod) {
                                case "FY0":
                                    return getBuildMultiple(footballId, valuationId).evRevFy0;
                                    break;
                            }
                            break;
                        case "EV/Attendance":
                            switch (valuationPeriod) {
                                case "FY0":
                                    return getBuildMultiple(footballId, valuationId).evAttendanceFy0;
                                    break;
                            }
                            break;
                    }
                    break;
            }
        }
    }
});

//Calculates all Build Values using selected Build Multiple from above, as well as data from private or public company
getBuildValue = function(footballId, valuationId) {
    var football = Footballs.findOne({_id:footballId});
    var footballType = football.footballType;

    var valuation = Valuations.findOne({_id:valuationId});
    var valuationSelections = valuation.valuationSelections;
    var valuationMultiples = valuation.multiples;
    var multiple = getBuildMultiple(footballId, valuationId);

    if(valuationSelections.length > 0) {
        if(valuationMultiples) {
            if (footballType == "target") {
                var target = {
                    targetId: football.footballTarget.targetId,
                    targetType: football.footballTarget.targetType,
                    targetData: football.footballTarget.targetData
                };
                switch(target.targetType) {
                    case "company":
                        switch(target.targetData) {
                            case "feed":
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
                                        return {
                                            evEvRevLtm: feedCompanyData.revenueLtm * multiple.evRevLtm,
                                            evEvRevFy1: feedCompanyData.revenueFy1 * multiple.evRevFy1,
                                            evEvRevFy2: feedCompanyData.revenueFy2 * multiple.evRevFy2,
                                            evEvEbitdaLtm: feedCompanyData.ebitdaLtm * multiple.evEbitdaLtm,
                                            evEvEbitdaFy1: feedCompanyData.ebitdaFy1 * multiple.evEbitdaFy1,
                                            evEvEbitdaFy2: feedCompanyData.ebitdaFy2 * multiple.evEbitdaFy2,
                                            pricePeLtm: feedCompanyData.epsLtm * multiple.peLtm,
                                            pricePeFy1: feedCompanyData.epsFy1 * multiple.peFy1,
                                            pricePeFy2: feedCompanyData.epsFy2 * multiple.peFy2
                                        };
                                        break;
                                    case "deals":
                                        return {
                                            evEvRevLtm: feedCompanyData.revenueLtm * multiple.evRevLtm,
                                            evEvRevFy1: feedCompanyData.revenueFy1 * multiple.evRevFy1,
                                            evEvRevFy2: feedCompanyData.revenueFy2 * multiple.evRevFy2,
                                            evEvEbitdaLtm: feedCompanyData.ebitdaLtm * multiple.evEbitdaLtm,
                                            evEvEbitdaFy1: feedCompanyData.ebitdaFy1 * multiple.evEbitdaFy1,
                                            evEvEbitdaFy2: feedCompanyData.ebitdaFy2 * multiple.evEbitdaFy2,
                                            pricePeLtm: feedCompanyData.epsLtm * multiple.peLtm,
                                            pricePeFy1: feedCompanyData.epsFy1 * multiple.peFy1,
                                            pricePeFy2: feedCompanyData.epsFy2 * multiple.peFy2
                                        };
                                        break;
                                    case "models":
                                        return {
                                            enterpriseValue: multiple.enterpriseValue,
                                            pricePerShare: multiple.pricePerShare
                                        };
                                        break;
                                    case "custom":
                                        return {
                                            customValue: multiple.customValue
                                        };
                                        break;
                                }
                                break;
                            case "custom":
                                var customCompany = TargetsCompanies.findOne({_id: target.targetId});
                                var customCompanyData = {
                                    revenueLtm: customCompany.financial.ltm.revenue,
                                    revenueFy1: customCompany.financial.fy1.revenue,
                                    revenueFy2: customCompany.financial.fy2.revenue,
                                    ebitdaLtm: customCompany.financial.ltm.ebitda,
                                    ebitdaFy1: customCompany.financial.fy1.ebitda,
                                    ebitdaFy2: customCompany.financial.fy2.ebitda,
                                    epsLtm: customCompany.financial.ltm.eps,
                                    epsFy1: customCompany.financial.fy1.eps,
                                    epsFy2: customCompany.financial.fy2.eps,
                                    sharesOs: customCompany.capTable.sharesOs,
                                    netDebt: customCompany.capTable.netDebt
                                };
                                return {
                                    evEvRevLtm: customCompanyData.revenueLtm * multiple.evRevLtm,
                                    evEvRevFy1: customCompanyData.revenueFy1 * multiple.evRevFy1,
                                    evEvRevFy2: customCompanyData.revenueFy2 * multiple.evRevFy2,
                                    evEvEbitdaLtm: customCompanyData.ebitdaLtm * multiple.evEbitdaLtm,
                                    evEvEbitdaFy1: customCompanyData.ebitdaFy1 * multiple.evEbitdaFy1,
                                    evEvEbitdaFy2: customCompanyData.ebitdaFy2 * multiple.evEbitdaFy2,
                                    pricePeLtm: customCompanyData.epsLtm * multiple.peLtm,
                                    pricePeFy1: customCompanyData.epsFy1 * multiple.peFy1,
                                    pricePeFy2: customCompanyData.epsFy2 * multiple.peFy2
                                };
                                break;
                        }
                        break;
                    case "team":
                        switch(target.targetData) {
                            case "feed":
                                var feedTeam = FeedTeams.findOne({_id: target.targetId});

                                var feedTeamData = {
                                    revenueFy0: feedTeam.financial.fy0.revenue,
                                    attendanceFy0: feedTeam.financial.fy0.attendance
                                };
                                return {
                                    evEvRevFy0: feedTeamData.revenueFy0 * multiple.evRevFy0,
                                    evEvAttendanceFy0: feedTeamData.attendanceFy0 * multiple.evAttendanceFy0
                                };
                                break;
                        }
                        break;
                }
            }
        }
    }
};

//Determines which Build Value from above is active, given valuationMetric and valuationPeriod
//This is the value used to calculate the dimensions of the bar
Template.registerHelper('buildValue',function(){
    var footballId = Template.parentData(1)._id;
    var football = Footballs.findOne({_id:footballId});
    var footballType = football.footballType;
    var footballOutput = football.footballOutput;
    var targetType = football.footballTarget.targetType;

    var valuationId = Template.parentData(0)._id;
    var valuation = Valuations.findOne({_id:valuationId});
    var valuationSelections = valuation.valuationSelections;
    var valuationMetric = valuation.valuationMetric;
    var valuationPeriod = valuation.valuationPeriod;
    var valuationMultiples = valuation.multiples;

    var value = getBuildValue(footballId, valuationId);

    if(valuationSelections.length > 0) {
        if(valuationMultiples) {
            if (footballType == "target") {
                switch (targetType) {
                    case "company":
                        var valuationType = valuation.valuationType;
                        switch(valuationType) {
                            case "comps":
                                switch (valuationMetric) {
                                    case "EV/Revenue":
                                        switch (valuationPeriod) {
                                            case "LTM":
                                                return value.evEvRevLtm;
                                                break;
                                            case "FY1":
                                                return value.evEvRevFy1;
                                                break;
                                            case "FY2":
                                                return value.evEvRevFy2;
                                                break;
                                        }
                                        break;
                                    case "EV/EBITDA":
                                        switch (valuationPeriod) {
                                            case "LTM":
                                                return value.evEvEbitdaLtm;
                                                break;
                                            case "FY1":
                                                return value.evEvEbitdaFy1;
                                                break;
                                            case "FY2":
                                                return value.evEvEbitdaFy2;
                                                break;
                                        }
                                        break;
                                    case "Price/Earnings":
                                        switch (valuationPeriod) {
                                            case "LTM":
                                                return value.pricePeLtm;
                                                break;
                                            case "FY1":
                                                return value.pricePeFy1;
                                                break;
                                            case "FY2":
                                                return value.pricePeFy2;
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
                                                return value.evEvRevLtm;
                                                break;
                                            case "FY1":
                                                return value.evEvRevFy1;
                                                break;
                                            case "FY2":
                                                return value.evEvRevFy2;
                                                break;
                                        }
                                        break;
                                    case "EV/EBITDA":
                                        switch (valuationPeriod) {
                                            case "LTM":
                                                return value.evEvEbitdaLtm;
                                                break;
                                            case "FY1":
                                                return value.evEvEbitdaFy1;
                                                break;
                                            case "FY2":
                                                return value.evEvEbitdaFy2;
                                                break;
                                        }
                                        break;
                                    case "Price/Earnings":
                                        switch (valuationPeriod) {
                                            case "LTM":
                                                return value.pricePeLtm;
                                                break;
                                            case "FY1":
                                                return value.pricePeFy1;
                                                break;
                                            case "FY2":
                                                return value.pricePeFy2;
                                                break;
                                        }
                                        break;
                                }
                                break;
                            case "models":
                                switch(footballOutput) {
                                    case "Enterprise Value":
                                        return value.enterpriseValue;
                                        break;
                                    case "Price per Share":
                                        return value.pricePerShare;
                                        break;
                                }
                                break;
                            case "custom":
                                return value.customValue;
                                break;
                        }
                        break;
                    case "team":
                        switch (valuationMetric) {
                            case "EV/Revenue":
                                switch (valuationPeriod) {
                                    case "FY0":
                                        return value.evEvRevFy0;
                                        break;
                                }
                                break;
                            case "EV/Attendance":
                                switch (valuationPeriod) {
                                    case "FY0":
                                        return value.evEvAttendanceFy0;
                                        break;
                                }
                                break;
                        }
                        break;
                }
            }
        }
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