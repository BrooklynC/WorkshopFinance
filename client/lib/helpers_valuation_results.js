////VALUATION RESULTS

//Calculates all potential Valuation Results, including when Build Value is transformed by selecting a different valuationOutput
getResults = function(footballId, valuationId){
    var football = Footballs.findOne({_id:footballId});
    var footballType = football.footballType;
    var marketType = football.marketType;

    var valuation = Valuations.findOne({_id: valuationId});
    var valuationType = valuation.valuationType;
    var valuationSelections = valuation.valuationSelections;
    var valuationMultiples = valuation.multiples;

    if(valuationSelections.length > 0) {
        if (valuationMultiples) {
            var multiple = getBuildMultipleAll(footballId, valuationId);
            if (multiple) {
                if (footballType == "market") {
                    switch(marketType) {
                        case "company":
                            switch (valuationType) {
                                case "comps":
                                    return {
                                        evRevLtm: multiple.evRevLtm,
                                        evRevFy1: multiple.evRevFy1,
                                        evRevFy2: multiple.evRevFy2,
                                        evEbitdaLtm: multiple.evEbitdaLtm,
                                        evEbitdaFy1: multiple.evEbitdaFy1,
                                        evEbitdaFy2: multiple.evEbitdaFy2,
                                        peLtm: multiple.peLtm,
                                        peFy1: multiple.peFy1,
                                        peFy2: multiple.peFy2
                                    };

                                    break;
                                case "deals":
                                    return {
                                        evRevLtm: multiple.evRevLtm,
                                        evEbitdaLtm: multiple.evEbitdaLtm
                                    };
                                    break;
                                case "models":
                                    return {
                                        evRevLtm: multiple.evRevLtm,
                                        evRevFy1: multiple.evRevFy1,
                                        evRevFy2: multiple.evRevFy2,
                                        evEbitdaLtm: multiple.evEbitdaLtm,
                                        evEbitdaFy1: multiple.evEbitdaFy1,
                                        evEbitdaFy2: multiple.evEbitdaFy2,
                                        peLtm: multiple.peLtm,
                                        peFy1: multiple.peFy1,
                                        peFy2: multiple.peFy2
                                    };
                                    break;
                                case "custom":
                                    return {
                                        customValue: multiple.customValue,
                                        evRevLtm: multiple.customValue,
                                        evRevFy1: multiple.customValue,
                                        evRevFy2: multiple.customValue,
                                        evEbitdaLtm: multiple.customValue,
                                        evEbitdaFy1: multiple.customValue,
                                        evEbitdaFy2: multiple.customValue,
                                        peLtm: multiple.customValue,
                                        peFy1: multiple.customValue,
                                        peFy2: multiple.customValue
                                    };
                                    break;
                            }
                            break;
                        case "team":
                            switch (valuationType) {
                                case "comps":
                                    return {
                                        evRevFy0: multiple.evRevFy0,
                                        evAttendanceFy0: multiple.evAttendanceFy0
                                    };
                                    break;
                            }
                            break;
                    }
                } else {
                    var targetId = football.footballTarget.targetId;
                    var targetType = football.footballTarget.targetType;
                    var targetData = football.footballTarget.targetData;
                    var buildValue = getBuildValues(footballId, valuationId);
                    switch (targetType) {
                        case "company":
                            switch (targetData) {
                                case "feed":
                                    var feedCompany = FeedCompanies.findOne({_id: targetId});
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
                                    switch (valuationType) {
                                        case "comps":
                                            return {
                                                evRev: {
                                                    ltm: {
                                                        ev: buildValue.evEvRevLtm,
                                                        price: (buildValue.evEvRevLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvRevLtm / feedCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvRevLtm / feedCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvRevLtm / feedCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvRevLtm / feedCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvRevLtm / feedCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvRevLtm / feedCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvRevLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvRevLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvRevLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy2

                                                            }
                                                        }
                                                    },
                                                    fy1: {
                                                        ev: buildValue.evEvRevFy1,
                                                        price: (buildValue.evEvRevFy1 - feedCompanyData.netDebt) / feedCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvRevFy1 / feedCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvRevFy1 / feedCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvRevFy1 / feedCompanyData.revenueFy2

                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvRevFy1 / feedCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvRevFy1 / feedCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvRevFy1 / feedCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvRevFy1 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvRevFy1 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvRevFy1 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy2

                                                            }
                                                        }

                                                    },
                                                    fy2: {
                                                        ev: buildValue.evEvRevFy2,
                                                        price: (buildValue.evEvRevFy2 - feedCompanyData.netDebt) / feedCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvRevFy2 / feedCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvRevFy2 / feedCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvRevFy2 / feedCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvRevFy2 / feedCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvRevFy2 / feedCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvRevFy2 / feedCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvRevFy2 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvRevFy2 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvRevFy2 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy2

                                                            }
                                                        }
                                                    }
                                                },
                                                evEbitda: {
                                                    ltm: {
                                                        ev: buildValue.evEvEbitdaLtm,
                                                        price: (buildValue.evEvEbitdaLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvEbitdaLtm / feedCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvEbitdaLtm / feedCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvEbitdaLtm / feedCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvEbitdaLtm / feedCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvEbitdaLtm / feedCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvEbitdaLtm / feedCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvEbitdaLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvEbitdaLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvEbitdaLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy2
                                                            }
                                                        }
                                                    },
                                                    fy1: {
                                                        ev: buildValue.evEvEbitdaFy1,
                                                        price: (buildValue.evEvEbitdaFy1 - feedCompanyData.netDebt) / feedCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvEbitdaFy1 / feedCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvEbitdaFy1 / feedCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvEbitdaFy1 / feedCompanyData.revenueFy2

                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvEbitdaFy1 / feedCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvEbitdaFy1 / feedCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvEbitdaFy1 / feedCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvEbitdaFy1 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvEbitdaFy1 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvEbitdaFy1 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy2

                                                            }
                                                        }
                                                    },
                                                    fy2: {
                                                        ev: buildValue.evEvEbitdaFy2,
                                                        price: (buildValue.evEvEbitdaFy2 - feedCompanyData.netDebt) / feedCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvEbitdaFy2 / feedCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvEbitdaFy2 / feedCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvEbitdaFy2 / feedCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvEbitdaFy2 / feedCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvEbitdaFy2 / feedCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvEbitdaFy2 / feedCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvEbitdaFy2 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvEbitdaFy2 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvEbitdaFy2 - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy2
                                                            }
                                                        }
                                                    }
                                                },
                                                pe: {
                                                    ltm: {
                                                        ev: (buildValue.pricePeLtm * feedCompanyData.sharesOs) + feedCompanyData.netDebt,
                                                        price: buildValue.pricePeLtm,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: ((buildValue.pricePeLtm * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.revenueLtm,
                                                                fy1: ((buildValue.pricePeLtm * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.revenueFy1,
                                                                fy2: ((buildValue.pricePeLtm * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.revenueFy2

                                                            },
                                                            evEbitda: {
                                                                ltm: ((buildValue.pricePeLtm * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.ebitdaLtm,
                                                                fy1: ((buildValue.pricePeLtm * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.ebitdaFy1,
                                                                fy2: ((buildValue.pricePeLtm * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: buildValue.pricePeLtm / feedCompanyData.epsLtm,
                                                                fy1: buildValue.pricePeLtm / feedCompanyData.epsFy1,
                                                                fy2: buildValue.pricePeLtm / feedCompanyData.epsFy2
                                                            }
                                                        }
                                                    },
                                                    fy1: {
                                                        ev: (buildValue.pricePeFy1 * feedCompanyData.sharesOs) + feedCompanyData.netDebt,
                                                        price: buildValue.pricePeFy1,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: ((buildValue.pricePeFy1 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.revenueLtm,
                                                                fy1: ((buildValue.pricePeFy1 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.revenueFy1,
                                                                fy2: ((buildValue.pricePeFy1 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.revenueFy2

                                                            },
                                                            evEbitda: {
                                                                ltm: ((buildValue.pricePeFy1 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.ebitdaLtm,
                                                                fy1: ((buildValue.pricePeFy1 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.ebitdaFy1,
                                                                fy2: ((buildValue.pricePeFy1 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: buildValue.pricePeFy1 / feedCompanyData.epsLtm,
                                                                fy1: buildValue.pricePeFy1 / feedCompanyData.epsFy1,
                                                                fy2: buildValue.pricePeFy1 / feedCompanyData.epsFy2

                                                            }
                                                        }
                                                    },
                                                    fy2: {
                                                        ev: (buildValue.pricePeFy2 * feedCompanyData.sharesOs) + feedCompanyData.netDebt,
                                                        price: buildValue.pricePeFy2,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: ((buildValue.pricePeFy2 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.revenueLtm,
                                                                fy1: ((buildValue.pricePeFy2 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.revenueFy1,
                                                                fy2: ((buildValue.pricePeFy2 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.revenueFy2

                                                            },
                                                            evEbitda: {
                                                                ltm: ((buildValue.pricePeFy2 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.ebitdaLtm,
                                                                fy1: ((buildValue.pricePeFy2 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.ebitdaFy1,
                                                                fy2: ((buildValue.pricePeFy2 * feedCompanyData.sharesOs) + feedCompanyData.netDebt) / feedCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: buildValue.pricePeFy2 / feedCompanyData.epsLtm,
                                                                fy1: buildValue.pricePeFy2 / feedCompanyData.epsFy1,
                                                                fy2: buildValue.pricePeFy2 / feedCompanyData.epsFy2
                                                            }
                                                        }
                                                    }
                                                }
                                            };
                                            break;
                                        case "deals":
                                            return {
                                                evRev: {
                                                    ltm: {
                                                        ev: buildValue.evEvRevLtm,
                                                        price: (buildValue.evEvRevLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvRevLtm / feedCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvRevLtm / feedCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvRevLtm / feedCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvRevLtm / feedCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvRevLtm / feedCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvRevLtm / feedCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvRevLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvRevLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvRevLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy2

                                                            }
                                                        }
                                                    }
                                                },
                                                evEbitda: {
                                                    ltm: {
                                                        ev: buildValue.evEvEbitdaLtm,
                                                        price: (buildValue.evEvEbitdaLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvEbitdaLtm / feedCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvEbitdaLtm / feedCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvEbitdaLtm / feedCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvEbitdaLtm / feedCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvEbitdaLtm / feedCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvEbitdaLtm / feedCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvEbitdaLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvEbitdaLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvEbitdaLtm - feedCompanyData.netDebt) / feedCompanyData.sharesOs / feedCompanyData.epsFy2
                                                            }
                                                        }
                                                    }
                                                }
                                            };
                                            break;
                                        case "models":
                                            return {
                                                enterpriseValue: buildValue.enterpriseValue,
                                                pricePerShare: buildValue.pricePerShare,
                                                evRevenueLtm: getBuildMultipleAll(footballId, valuationId).evRevLtm,
                                                evRevenueFy1: getBuildMultipleAll(footballId, valuationId).evRevFy1,
                                                evRevenueFy2: getBuildMultipleAll(footballId, valuationId).evRevFy2,
                                                evEbitdaLtm: getBuildMultipleAll(footballId, valuationId).evEbitdaLtm,
                                                evEbitdaFy1: getBuildMultipleAll(footballId, valuationId).evEbitdaFy1,
                                                evEbitdaFy2: getBuildMultipleAll(footballId, valuationId).evEbitdaFy2,
                                                priceEarningsLtm: getBuildMultipleAll(footballId, valuationId).peLtm,
                                                priceEarningsFy1: getBuildMultipleAll(footballId, valuationId).peFy1,
                                                priceEarningsFy2: getBuildMultipleAll(footballId, valuationId).peFy2
                                            };
                                            break;
                                        case "custom":
                                            return {
                                                customValue: buildValue.customValue
                                            }

                                    }
                                    break;
                                case "custom":
                                    var customCompany = TargetsCompanies.findOne({_id: targetId});
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
                                    switch (valuationType) {
                                        case "comps":
                                            return {
                                                evRev: {
                                                    ltm: {
                                                        ev: buildValue.evEvRevLtm,
                                                        price: (buildValue.evEvRevLtm - customCompanyData.netDebt) / customCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvRevLtm / customCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvRevLtm / customCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvRevLtm / customCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvRevLtm / customCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvRevLtm / customCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvRevLtm / customCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvRevLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvRevLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvRevLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy2

                                                            }
                                                        }
                                                    },
                                                    fy1: {
                                                        ev: buildValue.evEvRevFy1,
                                                        price: (buildValue.evEvRevFy1 - customCompanyData.netDebt) / customCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvRevFy1 / customCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvRevFy1 / customCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvRevFy1 / customCompanyData.revenueFy2

                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvRevFy1 / customCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvRevFy1 / customCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvRevFy1 / customCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvRevFy1 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvRevFy1 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvRevFy1 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy2

                                                            }
                                                        }

                                                    },
                                                    fy2: {
                                                        ev: buildValue.evEvRevFy2,
                                                        price: (buildValue.evEvRevFy2 - customCompanyData.netDebt) / customCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvRevFy2 / customCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvRevFy2 / customCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvRevFy2 / customCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvRevFy2 / customCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvRevFy2 / customCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvRevFy2 / customCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvRevFy2 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvRevFy2 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvRevFy2 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy2

                                                            }
                                                        }
                                                    }
                                                },
                                                evEbitda: {
                                                    ltm: {
                                                        ev: buildValue.evEvEbitdaLtm,
                                                        price: (buildValue.evEvEbitdaLtm - customCompanyData.netDebt) / customCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvEbitdaLtm / customCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvEbitdaLtm / customCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvEbitdaLtm / customCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvEbitdaLtm / customCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvEbitdaLtm / customCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvEbitdaLtm / customCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvEbitdaLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvEbitdaLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvEbitdaLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy2
                                                            }
                                                        }
                                                    },
                                                    fy1: {
                                                        ev: buildValue.evEvEbitdaFy1,
                                                        price: (buildValue.evEvEbitdaFy1 - customCompanyData.netDebt) / customCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvEbitdaFy1 / customCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvEbitdaFy1 / customCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvEbitdaFy1 / customCompanyData.revenueFy2

                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvEbitdaFy1 / customCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvEbitdaFy1 / customCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvEbitdaFy1 / customCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvEbitdaFy1 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvEbitdaFy1 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvEbitdaFy1 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy2

                                                            }
                                                        }
                                                    },
                                                    fy2: {
                                                        ev: buildValue.evEvEbitdaFy2,
                                                        price: (buildValue.evEvEbitdaFy2 - customCompanyData.netDebt) / customCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvEbitdaFy2 / customCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvEbitdaFy2 / customCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvEbitdaFy2 / customCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvEbitdaFy2 / customCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvEbitdaFy2 / customCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvEbitdaFy2 / customCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvEbitdaFy2 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvEbitdaFy2 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvEbitdaFy2 - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy2
                                                            }
                                                        }
                                                    }
                                                },
                                                pe: {
                                                    ltm: {
                                                        ev: (buildValue.pricePeLtm * customCompanyData.sharesOs) + customCompanyData.netDebt,
                                                        price: buildValue.pricePeLtm,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: ((buildValue.pricePeLtm * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.revenueLtm,
                                                                fy1: ((buildValue.pricePeLtm * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.revenueFy1,
                                                                fy2: ((buildValue.pricePeLtm * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.revenueFy2

                                                            },
                                                            evEbitda: {
                                                                ltm: ((buildValue.pricePeLtm * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.ebitdaLtm,
                                                                fy1: ((buildValue.pricePeLtm * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.ebitdaFy1,
                                                                fy2: ((buildValue.pricePeLtm * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: buildValue.pricePeLtm / customCompanyData.epsLtm,
                                                                fy1: buildValue.pricePeLtm / customCompanyData.epsFy1,
                                                                fy2: buildValue.pricePeLtm / customCompanyData.epsFy2
                                                            }
                                                        }
                                                    },
                                                    fy1: {
                                                        ev: (buildValue.pricePeFy1 * customCompanyData.sharesOs) + customCompanyData.netDebt,
                                                        price: buildValue.pricePeFy1,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: ((buildValue.pricePeFy1 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.revenueLtm,
                                                                fy1: ((buildValue.pricePeFy1 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.revenueFy1,
                                                                fy2: ((buildValue.pricePeFy1 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.revenueFy2

                                                            },
                                                            evEbitda: {
                                                                ltm: ((buildValue.pricePeFy1 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.ebitdaLtm,
                                                                fy1: ((buildValue.pricePeFy1 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.ebitdaFy1,
                                                                fy2: ((buildValue.pricePeFy1 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: buildValue.pricePeFy1 / customCompanyData.epsLtm,
                                                                fy1: buildValue.pricePeFy1 / customCompanyData.epsFy1,
                                                                fy2: buildValue.pricePeFy1 / customCompanyData.epsFy2

                                                            }
                                                        }
                                                    },
                                                    fy2: {
                                                        ev: (buildValue.pricePeFy2 * customCompanyData.sharesOs) + customCompanyData.netDebt,
                                                        price: buildValue.pricePeFy2,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: ((buildValue.pricePeFy2 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.revenueLtm,
                                                                fy1: ((buildValue.pricePeFy2 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.revenueFy1,
                                                                fy2: ((buildValue.pricePeFy2 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.revenueFy2

                                                            },
                                                            evEbitda: {
                                                                ltm: ((buildValue.pricePeFy2 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.ebitdaLtm,
                                                                fy1: ((buildValue.pricePeFy2 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.ebitdaFy1,
                                                                fy2: ((buildValue.pricePeFy2 * customCompanyData.sharesOs) + customCompanyData.netDebt) / customCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: buildValue.pricePeFy2 / customCompanyData.epsLtm,
                                                                FY1: buildValue.pricePeFy2 / customCompanyData.epsFy1,
                                                                fy2: buildValue.pricePeFy2 / customCompanyData.epsFy2
                                                            }
                                                        }
                                                    }
                                                }
                                            };
                                            break;
                                        case "deals":
                                            return {
                                                evRev: {
                                                    ltm: {
                                                        ev: buildValue.evEvRevLtm,
                                                        price: (buildValue.evEvRevLtm - customCompanyData.netDebt) / customCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvRevLtm / customCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvRevLtm / customCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvRevLtm / customCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvRevLtm / customCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvRevLtm / customCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvRevLtm / customCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvRevLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvRevLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvRevLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy2

                                                            }
                                                        }
                                                    }
                                                },
                                                evEbitda: {
                                                    ltm: {
                                                        ev: buildValue.evEvEbitdaLtm,
                                                        price: (buildValue.evEvEbitdaLtm - customCompanyData.netDebt) / customCompanyData.sharesOs,
                                                        multiple: {
                                                            evRev: {
                                                                ltm: buildValue.evEvEbitdaLtm / customCompanyData.revenueLtm,
                                                                fy1: buildValue.evEvEbitdaLtm / customCompanyData.revenueFy1,
                                                                fy2: buildValue.evEvEbitdaLtm / customCompanyData.revenueFy2
                                                            },
                                                            evEbitda: {
                                                                ltm: buildValue.evEvEbitdaLtm / customCompanyData.ebitdaLtm,
                                                                fy1: buildValue.evEvEbitdaLtm / customCompanyData.ebitdaFy1,
                                                                fy2: buildValue.evEvEbitdaLtm / customCompanyData.ebitdaFy2

                                                            },
                                                            pe: {
                                                                ltm: (buildValue.evEvEbitdaLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsLtm,
                                                                fy1: (buildValue.evEvEbitdaLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy1,
                                                                fy2: (buildValue.evEvEbitdaLtm - customCompanyData.netDebt) / customCompanyData.sharesOs / customCompanyData.epsFy2
                                                            }
                                                        }
                                                    }
                                                }
                                            };
                                            break;
                                    }
                                    break;
                            }
                            break;
                        case "team":
                            switch (targetData) {
                                case "feed":
                                    var feedTeam = FeedTeams.findOne({_id: targetId});
                                    var feedTeamData = {
                                        revenueFy0: feedTeam.financial.fy0.revenue,
                                        attendanceFy0: feedTeam.financial.fy0.attendance
                                    };
                                    switch (valuationType) {
                                        case "comps":
                                            return {
                                                evRev: {
                                                    fy0: {
                                                        ev: buildValue.evEvRevFy0,
                                                        multiple: {
                                                            evRev: {
                                                                fy0: buildValue.evEvRevFy0 / feedTeamData.revenueFy0
                                                            },
                                                            evAttendance: {
                                                                fy0: buildValue.evEvRevFy0 / feedTeamData.attendanceFy0
                                                            }
                                                        }
                                                    }
                                                },
                                                evAttendance: {
                                                    fy0: {
                                                        ev: buildValue.evEvAttendanceFy0,
                                                        multiple: {
                                                            evRev: {
                                                                fy0: buildValue.evEvAttendanceFy0 / feedTeamData.revenueFy0
                                                            },
                                                            evAttendance: {
                                                                fy0: buildValue.evEvAttendanceFy0 / feedTeamData.attendanceFy0

                                                            }
                                                        }
                                                    }
                                                }
                                            };
                                            break;
                                    }
                                    break;
                            }
                            break;
                    }
                }
            }
        }
    }
};

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

            var valuesExist = getResults(footballId, valuationId);
            if (valuesExist) {
                if (footballType == "market") {
                    switch (marketType) {
                        case "company":
                            switch (valuationMetric) {
                                case "EV/Revenue":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return getResults(footballId, valuationId).evRevLtm;
                                            break;
                                        case "FY1":
                                            return getResults(footballId, valuationId).evRevFy1;
                                            break;
                                        case "FY2":
                                            return getResults(footballId, valuationId).evRevFy2;
                                            break;
                                    }
                                    break;
                                case "EV/EBITDA":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return getResults(footballId, valuationId).evEbitdaLtm;
                                            break;
                                        case "FY1":
                                            return getResults(footballId, valuationId).evEbitdaFy1;
                                            break;
                                        case "FY2":
                                            return getResults(footballId, valuationId).evEbitdaFy2;
                                            break;
                                    }
                                    break;
                                case "Price/Earnings":
                                    switch (valuationPeriod) {
                                        case "LTM":
                                            return getResults(footballId, valuationId).peLtm;
                                            break;
                                        case "FY1":
                                            return getResults(footballId, valuationId).peFy1;
                                            break;
                                        case "FY2":
                                            return getResults(footballId, valuationId).peFy2;
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
                                            return getResults(footballId, valuationId).evRevFy0;
                                            break;
                                    }
                                    break;
                                case "EV/Attendance":
                                    switch (valuationPeriod) {
                                        case "FY0":
                                            return getResults(footballId, valuationId).evAttendanceFy0;
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
                                                        return getResults(footballId, valuationId).evRev.ltm.ev;
                                                        break;
                                                    case "Price per Share":
                                                        return getResults(footballId, valuationId).evRev.ltm.price;
                                                        break;
                                                    case "Multiple":
                                                        switch (valuationOutput) {
                                                            case "EV/Revenue":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evRev.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evRev.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evRev.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "EV/EBITDA":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evEbitda.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evEbitda.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evEbitda.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "Price/Earnings":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.pe.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.pe.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.pe.fy2;
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
                                                        return getResults(footballId, valuationId).evRev.fy1.ev;
                                                        break;
                                                    case "Price per Share":
                                                        return getResults(footballId, valuationId).evRev.fy1.price;
                                                        break;
                                                    case "Multiple":
                                                        switch (valuationOutput) {
                                                            case "EV/Revenue":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evRev.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evRev.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evRev.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "EV/EBITDA":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evEbitda.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evEbitda.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evEbitda.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "Price/Earnings":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.pe.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.pe.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.pe.fy2;
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
                                                        return getResults(footballId, valuationId).evRev.fy2.ev;
                                                        break;
                                                    case "Price per Share":
                                                        return getResults(footballId, valuationId).evRev.fy2.price;
                                                        break;
                                                    case "Multiple":
                                                        switch (valuationOutput) {
                                                            case "EV/Revenue":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evRev.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evRev.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evRev.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "EV/EBITDA":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evEbitda.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evEbitda.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evEbitda.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "Price/Earnings":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.pe.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.pe.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.pe.fy2;
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
                                                        return getResults(footballId, valuationId).evEbitda.ltm.ev;
                                                        break;
                                                    case "Price per Share":
                                                        return getResults(footballId, valuationId).evEbitda.ltm.price;
                                                        break;
                                                    case "Multiple":
                                                        switch (valuationOutput) {
                                                            case "EV/Revenue":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evRev.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evRev.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evRev.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "EV/EBITDA":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evEbitda.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evEbitda.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evEbitda.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "Price/Earnings":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.pe.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.pe.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.pe.fy2;
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
                                                        return getResults(footballId, valuationId).evEbitda.fy1.ev;
                                                        break;
                                                    case "Price per Share":
                                                        return getResults(footballId, valuationId).evEbitda.fy1.price;
                                                        break;
                                                    case "Multiple":
                                                        switch (valuationOutput) {
                                                            case "EV/Revenue":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evRev.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evRev.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evRev.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "EV/EBITDA":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evEbitda.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evEbitda.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evEbitda.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "Price/Earnings":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.pe.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.pe.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.pe.fy2;
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
                                                        return getResults(footballId, valuationId).evEbitda.fy2.ev;
                                                        break;
                                                    case "Price per Share":
                                                        return getResults(footballId, valuationId).evEbitda.fy2.price;
                                                        break;
                                                    case "Multiple":
                                                        switch (valuationOutput) {
                                                            case "EV/Revenue":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evRev.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evRev.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evRev.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "EV/EBITDA":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evEbitda.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evEbitda.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evEbitda.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "Price/Earnings":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.pe.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.pe.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.pe.fy2;
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
                                                        return getResults(footballId, valuationId).pe.ltm.ev;
                                                        break;
                                                    case "Price per Share":
                                                        return getResults(footballId, valuationId).pe.ltm.price;
                                                        break;
                                                    case "Multiple":
                                                        switch (valuationOutput) {
                                                            case "EV/Revenue":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evRev.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evRev.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evRev.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "EV/EBITDA":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evEbitda.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evEbitda.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evEbitda.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "Price/Earnings":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.pe.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.pe.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.pe.fy2;
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
                                                        return getResults(footballId, valuationId).pe.fy1.ev;
                                                        break;
                                                    case "Price per Share":
                                                        return getResults(footballId, valuationId).pe.fy1.price;
                                                        break;
                                                    case "Multiple":
                                                        switch (valuationOutput) {
                                                            case "EV/Revenue":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evRev.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evRev.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evRev.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "EV/EBITDA":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evEbitda.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evEbitda.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evEbitda.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "Price/Earnings":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.pe.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.pe.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.pe.fy2;
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
                                                        return getResults(footballId, valuationId).pe.fy2.ev;
                                                        break;
                                                    case "Price per Share":
                                                        return getResults(footballId, valuationId).pe.fy2.price;
                                                        break;
                                                    case "Multiple":
                                                        switch (valuationOutput) {
                                                            case "EV/Revenue":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evRev.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evRev.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evRev.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "EV/EBITDA":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evEbitda.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evEbitda.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evEbitda.fy2;
                                                                        break;
                                                                }
                                                                break;
                                                            case "Price/Earnings":
                                                                switch (valuationOutputPeriod) {
                                                                    case "LTM":
                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.pe.ltm;
                                                                        break;
                                                                    case "FY1":
                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.pe.fy1;
                                                                        break;
                                                                    case "FY2":
                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.pe.fy2;
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
                                            var ev = getResults(footballId, valuationId).enterpriseValue;
                                            console.log("EV: ", ev);
                                            return getResults(footballId, valuationId).enterpriseValue;
                                            break;
                                        case "Price per Share":
                                            return getResults(footballId, valuationId).pricePerShare;
                                            break;
                                        case "Multiple":
                                            switch (valuationMetric) {
                                                case "EV/Revenue":
                                                    switch (valuationPeriod) {
                                                        case "LTM":
                                                            return getResults(footballId, valuationId).evRevenueLtm;
                                                            break;
                                                        case "FY1":
                                                            return getResults(footballId, valuationId).evRevenueFy1;
                                                            break;
                                                        case "FY2":
                                                            return getResults(footballId, valuationId).evRevenueFy2;
                                                            break;
                                                    }
                                                    break;
                                                case "EV/EBITDA":
                                                    switch (valuationPeriod) {
                                                        case "LTM":
                                                            return getResults(footballId, valuationId).evEbitdaLtm;
                                                            break;
                                                        case "FY1":
                                                            return getResults(footballId, valuationId).evEbitdaFy1;
                                                            break;
                                                        case "FY2":
                                                            return getResults(footballId, valuationId).evEbitdaFy2;
                                                            break;
                                                    }
                                                    break;
                                                case "Price/Earnings":
                                                    switch (valuationPeriod) {
                                                        case "LTM":
                                                            return getResults(footballId, valuationId).priceEarningsLtm;
                                                            break;
                                                        case "FY1":
                                                            return getResults(footballId, valuationId).priceEarningsFy1;
                                                            break;
                                                        case "FY2":
                                                            return getResults(footballId, valuationId).priceEarningsFy2;
                                                            break;
                                                    }
                                                    break;
                                            }
                                            break;
                                    }
                                } else {
                                    return getResults(footballId, valuationId).customValue;
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
                                                    return getResults(footballId, valuationId).evRev.fy0.ev;
                                                    break;
                                                case "Multiple":
                                                    switch (valuationOutput) {
                                                        case "EV/Revenue":
                                                            switch (valuationOutputPeriod) {
                                                                case "FY0":
                                                                    return getResults(footballId, valuationId).evRev.fy0.multiple.evRev.fy0;
                                                                    break;
                                                            }
                                                            break;
                                                        case "EV/Attendance":
                                                            switch (valuationOutputPeriod) {
                                                                case "FY0":
                                                                    return getResults(footballId, valuationId).evRev.fy0.multiple.evAttendance.fy0;
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
                                                    return getResults(footballId, valuationId).evAttendance.fy0.ev;
                                                    break;
                                                case "Multiple":
                                                    switch (valuationOutput) {
                                                        case "EV/Revenue":
                                                            switch (valuationOutputPeriod) {
                                                                case "FY0":
                                                                    return getResults(footballId, valuationId).evAttendance.fy0.multiple.evRev.fy0;
                                                                    break;
                                                            }
                                                            break;
                                                        case "EV/Attendance":
                                                            switch (valuationOutputPeriod) {
                                                                case "FY0":
                                                                    return getResults(footballId, valuationId).evAttendance.fy0.multiple.evAttendance.fy0;
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

Template.registerHelper('resultValue', function(footballId, valuationId) {
    return getResultValue(footballId, valuationId);
});

////Determines Active Result from above, given valuationOutput, valuationOutputPeriod, valuationMetric, ValuationPeriod
//Template.registerHelper('resultValue',function(footballId, valuationId) {
//    var football = Footballs.findOne({_id:footballId});
//    var footballOutput = football.footballOutput;
//    var footballType = football.footballType;
//    var marketType = football.marketType;
//
//    var valuation = Valuations.findOne({_id: valuationId});
//    var valuationSelections = valuation.valuationSelections;
//
//    if (valuationSelections.length > 0) {
//        var valuationMultiples = valuation.multiples;
//        var valuationMetric = valuation.valuationMetric;
//        var valuationPeriod = valuation.valuationPeriod;
//        var valuationOutput = valuation.valuationOutput;
//        var valuationOutputPeriod = valuation.valuationOutputPeriod;
//
//        if (valuationMultiples) {
//            var valuesExist = getResults(footballId, valuationId);
//            if(valuesExist) {
//                if(footballType == "market") {
//                    switch(marketType) {
//                        case "company":
//                            switch(valuationMetric) {
//                                case "EV/Revenue":
//                                    switch(valuationPeriod) {
//                                        case "LTM":
//                                            return getResults(footballId, valuationId).evRevLtm;
//                                            break;
//                                        case "FY1":
//                                            return getResults(footballId, valuationId).evRevFy1;
//                                            break;
//                                        case "FY2":
//                                            return getResults(footballId, valuationId).evRevFy2;
//                                            break;
//                                    }
//                                    break;
//                                case "EV/EBITDA":
//                                    switch(valuationPeriod) {
//                                        case "LTM":
//                                            return getResults(footballId, valuationId).evEbitdaLtm;
//                                            break;
//                                        case "FY1":
//                                            return getResults(footballId, valuationId).evEbitdaFy1;
//                                            break;
//                                        case "FY2":
//                                            return getResults(footballId, valuationId).evEbitdaFy2;
//                                            break;
//                                    }
//                                    break;
//                                case "Price/Earnings":
//                                    switch(valuationPeriod) {
//                                        case "LTM":
//                                            return getResults(footballId, valuationId).peLtm;
//                                            break;
//                                        case "FY1":
//                                            return getResults(footballId, valuationId).peFy1;
//                                            break;
//                                        case "FY2":
//                                            return getResults(footballId, valuationId).peFy2;
//                                            break;
//                                    }
//                                    break;
//                            }
//                            break;
//                        case "team":
//                            switch(valuationMetric) {
//                                case "EV/Revenue":
//                                    switch (valuationPeriod) {
//                                        case "FY0":
//                                            return getResults(footballId, valuationId).evRevFy0;
//                                            break;
//                                    }
//                                    break;
//                                case "EV/Attendance":
//                                    switch (valuationPeriod) {
//                                        case "FY0":
//                                            return getResults(footballId, valuationId).evAttendanceFy0;
//                                            break;
//                                    }
//                                    break;
//                            }
//                            break;
//                    }
//                } else {
//                    var targetType = football.footballTarget.targetType;
//                    switch(targetType) {
//                        case "company":
//                            var valuationType = valuation.valuationType;
//                            if(valuationType == "comps" || valuationType == "deals") {
//                                switch (valuationMetric) {
//                                    case "EV/Revenue":
//                                        switch (valuationPeriod) {
//                                            case "LTM":
//                                                switch (footballOutput) {
//                                                    case "Enterprise Value":
//                                                        return getResults(footballId, valuationId).evRev.ltm.ev;
//                                                        break;
//                                                    case "Price per Share":
//                                                        return getResults(footballId, valuationId).evRev.ltm.price;
//                                                        break;
//                                                    case "Multiple":
//                                                        switch (valuationOutput) {
//                                                            case "EV/Revenue":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evRev.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evRev.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evRev.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "EV/EBITDA":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evEbitda.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evEbitda.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.evEbitda.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "Price/Earnings":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.pe.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.pe.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evRev.ltm.multiple.pe.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                        }
//                                                        break;
//                                                }
//                                                break;
//                                            case "FY1":
//                                                switch (footballOutput) {
//                                                    case "Enterprise Value":
//                                                        return getResults(footballId, valuationId).evRev.fy1.ev;
//                                                        break;
//                                                    case "Price per Share":
//                                                        return getResults(footballId, valuationId).evRev.fy1.price;
//                                                        break;
//                                                    case "Multiple":
//                                                        switch (valuationOutput) {
//                                                            case "EV/Revenue":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evRev.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evRev.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evRev.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "EV/EBITDA":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evEbitda.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evEbitda.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.evEbitda.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "Price/Earnings":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.pe.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.pe.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evRev.fy1.multiple.pe.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                        }
//                                                        break;
//                                                }
//                                                break;
//                                            case "FY2":
//                                                switch (footballOutput) {
//                                                    case "Enterprise Value":
//                                                        return getResults(footballId, valuationId).evRev.fy2.ev;
//                                                        break;
//                                                    case "Price per Share":
//                                                        return getResults(footballId, valuationId).evRev.fy2.price;
//                                                        break;
//                                                    case "Multiple":
//                                                        switch (valuationOutput) {
//                                                            case "EV/Revenue":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evRev.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evRev.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evRev.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "EV/EBITDA":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evEbitda.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evEbitda.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.evEbitda.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "Price/Earnings":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.pe.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.pe.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evRev.fy2.multiple.pe.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                        }
//                                                        break;
//                                                }
//                                                break;
//                                        }
//                                        break;
//                                    case "EV/EBITDA":
//                                        switch (valuationPeriod) {
//                                            case "LTM":
//                                                switch (footballOutput) {
//                                                    case "Enterprise Value":
//                                                        return getResults(footballId, valuationId).evEbitda.ltm.ev;
//                                                        break;
//                                                    case "Price per Share":
//                                                        return getResults(footballId, valuationId).evEbitda.ltm.price;
//                                                        break;
//                                                    case "Multiple":
//                                                        switch (valuationOutput) {
//                                                            case "EV/Revenue":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evRev.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evRev.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evRev.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "EV/EBITDA":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evEbitda.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evEbitda.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.evEbitda.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "Price/Earnings":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.pe.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.pe.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evEbitda.ltm.multiple.pe.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                        }
//                                                        break;
//                                                }
//                                                break;
//                                            case "FY1":
//                                                switch (footballOutput) {
//                                                    case "Enterprise Value":
//                                                        return getResults(footballId, valuationId).evEbitda.fy1.ev;
//                                                        break;
//                                                    case "Price per Share":
//                                                        return getResults(footballId, valuationId).evEbitda.fy1.price;
//                                                        break;
//                                                    case "Multiple":
//                                                        switch (valuationOutput) {
//                                                            case "EV/Revenue":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evRev.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evRev.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evRev.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "EV/EBITDA":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evEbitda.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evEbitda.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.evEbitda.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "Price/Earnings":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.pe.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.pe.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy1.multiple.pe.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                        }
//                                                        break;
//                                                }
//                                                break;
//                                            case "FY2":
//                                                switch (footballOutput) {
//                                                    case "Enterprise Value":
//                                                        return getResults(footballId, valuationId).evEbitda.fy2.ev;
//                                                        break;
//                                                    case "Price per Share":
//                                                        return getResults(footballId, valuationId).evEbitda.fy2.price;
//                                                        break;
//                                                    case "Multiple":
//                                                        switch (valuationOutput) {
//                                                            case "EV/Revenue":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evRev.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evRev.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evRev.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "EV/EBITDA":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evEbitda.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evEbitda.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.evEbitda.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "Price/Earnings":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.pe.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.pe.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).evEbitda.fy2.multiple.pe.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                        }
//                                                        break;
//                                                }
//                                                break;
//                                        }
//                                        break;
//                                    case "Price/Earnings":
//                                        switch (valuationPeriod) {
//                                            case "LTM":
//                                                switch (footballOutput) {
//                                                    case "Enterprise Value":
//                                                        return getResults(footballId, valuationId).pe.ltm.ev;
//                                                        break;
//                                                    case "Price per Share":
//                                                        return getResults(footballId, valuationId).pe.ltm.price;
//                                                        break;
//                                                    case "Multiple":
//                                                        switch (valuationOutput) {
//                                                            case "EV/Revenue":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evRev.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evRev.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evRev.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "EV/EBITDA":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evEbitda.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evEbitda.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.evEbitda.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "Price/Earnings":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.pe.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.pe.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).pe.ltm.multiple.pe.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                        }
//                                                        break;
//                                                }
//                                                break;
//                                            case "FY1":
//                                                switch (footballOutput) {
//                                                    case "Enterprise Value":
//                                                        return getResults(footballId, valuationId).pe.fy1.ev;
//                                                        break;
//                                                    case "Price per Share":
//                                                        return getResults(footballId, valuationId).pe.fy1.price;
//                                                        break;
//                                                    case "Multiple":
//                                                        switch (valuationOutput) {
//                                                            case "EV/Revenue":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evRev.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evRev.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evRev.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "EV/EBITDA":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evEbitda.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evEbitda.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.evEbitda.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "Price/Earnings":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.pe.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.pe.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).pe.fy1.multiple.pe.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                        }
//                                                        break;
//                                                }
//                                                break;
//                                            case "FY2":
//                                                switch (footballOutput) {
//                                                    case "Enterprise Value":
//                                                        return getResults(footballId, valuationId).pe.fy2.ev;
//                                                        break;
//                                                    case "Price per Share":
//                                                        return getResults(footballId, valuationId).pe.fy2.price;
//                                                        break;
//                                                    case "Multiple":
//                                                        switch (valuationOutput) {
//                                                            case "EV/Revenue":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evRev.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evRev.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evRev.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "EV/EBITDA":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evEbitda.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evEbitda.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.evEbitda.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                            case "Price/Earnings":
//                                                                switch (valuationOutputPeriod) {
//                                                                    case "LTM":
//                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.pe.ltm;
//                                                                        break;
//                                                                    case "FY1":
//                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.pe.fy1;
//                                                                        break;
//                                                                    case "FY2":
//                                                                        return getResults(footballId, valuationId).pe.fy2.multiple.pe.fy2;
//                                                                        break;
//                                                                }
//                                                                break;
//                                                        }
//                                                        break;
//                                                }
//                                                break;
//                                        }
//                                        break;
//                                }
//                            } else {
//                                if(valuationType == "models") {
//                                    switch(footballOutput) {
//                                        case "Enterprise Value":
//                                            var ev = getResults(footballId, valuationId).enterpriseValue;
//                                            console.log("EV: ", ev);
//                                            return getResults(footballId, valuationId).enterpriseValue;
//                                            break;
//                                        case "Price per Share":
//                                            return getResults(footballId, valuationId).pricePerShare;
//                                            break;
//                                        case "Multiple":
//                                            switch(valuationMetric) {
//                                                case "EV/Revenue":
//                                                    switch(valuationPeriod) {
//                                                        case "LTM":
//                                                            return getResults(footballId, valuationId).evRevenueLtm;
//                                                            break;
//                                                        case "FY1":
//                                                            return getResults(footballId, valuationId).evRevenueFy1;
//                                                            break;
//                                                        case "FY2":
//                                                            return getResults(footballId, valuationId).evRevenueFy2;
//                                                            break;
//                                                    }
//                                                    break;
//                                                case "EV/EBITDA":
//                                                    switch(valuationPeriod) {
//                                                        case "LTM":
//                                                            return getResults(footballId, valuationId).evEbitdaLtm;
//                                                            break;
//                                                        case "FY1":
//                                                            return getResults(footballId, valuationId).evEbitdaFy1;
//                                                            break;
//                                                        case "FY2":
//                                                            return getResults(footballId, valuationId).evEbitdaFy2;
//                                                            break;
//                                                    }
//                                                    break;
//                                                case "Price/Earnings":
//                                                    switch(valuationPeriod) {
//                                                        case "LTM":
//                                                            return getResults(footballId, valuationId).priceEarningsLtm;
//                                                            break;
//                                                        case "FY1":
//                                                            return getResults(footballId, valuationId).priceEarningsFy1;
//                                                            break;
//                                                        case "FY2":
//                                                            return getResults(footballId, valuationId).priceEarningsFy2;
//                                                            break;
//                                                    }
//                                                    break;
//                                            }
//                                            break;
//                                    }
//                                } else {
//                                    return getResults(footballId, valuationId).customValue;
//                                }
//                            }
//                            break;
//                        case "team":
//                            switch (valuationMetric) {
//                                case "EV/Revenue":
//                                    switch (valuationPeriod) {
//                                        case "FY0":
//                                            switch (footballOutput) {
//                                                case "Enterprise Value":
//                                                    return getResults(footballId, valuationId).evRev.fy0.ev;
//                                                    break;
//                                                case "Multiple":
//                                                    switch (valuationOutput) {
//                                                        case "EV/Revenue":
//                                                            switch (valuationOutputPeriod) {
//                                                                case "FY0":
//                                                                    return getResults(footballId, valuationId).evRev.fy0.multiple.evRev.fy0;
//                                                                    break;
//                                                            }
//                                                            break;
//                                                        case "EV/Attendance":
//                                                            switch (valuationOutputPeriod) {
//                                                                case "FY0":
//                                                                    return getResults(footballId, valuationId).evRev.fy0.multiple.evAttendance.fy0;
//                                                                    break;
//                                                            }
//                                                            break;
//                                                    }
//                                                    break;
//                                            }
//                                            break;
//                                    }
//                                    break;
//                                case "EV/Attendance":
//                                    switch (valuationPeriod) {
//                                        case "FY0":
//                                            switch (footballOutput) {
//                                                case "Enterprise Value":
//                                                    return getResults(footballId, valuationId).evAttendance.fy0.ev;
//                                                    break;
//                                                case "Multiple":
//                                                    switch (valuationOutput) {
//                                                        case "EV/Revenue":
//                                                            switch (valuationOutputPeriod) {
//                                                                case "FY0":
//                                                                    return getResults(footballId, valuationId).evAttendance.fy0.multiple.evRev.fy0;
//                                                                    break;
//                                                            }
//                                                            break;
//                                                        case "EV/Attendance":
//                                                            switch (valuationOutputPeriod) {
//                                                                case "FY0":
//                                                                    return getResults(footballId, valuationId).evAttendance.fy0.multiple.evAttendance.fy0;
//                                                                    break;
//                                                            }
//                                                            break;
//                                                    }
//                                                    break;
//                                            }
//                                            break;
//                                    }
//                                    break;
//                            }
//                            break;
//                    }
//                }
//            }
//        }
//    }
//});