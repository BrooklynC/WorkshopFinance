////GALLERY - COMPS
//NOT CURRENTLY USED - THESE WOULD BE USED FOR COMPANY OVERVIEW

//Find current price for comp, default date 12/31/15
getCompanyPrice = function(companyId) {
    var company = FeedCompanies.findOne({_id:companyId});
    var currentDate = "2015-12-31";
    var currentPrice = 0;
    _.each(company.closingPrices, function(closingPrices) {
        if (closingPrices.date == currentDate) currentPrice = closingPrices.price;
    });
    return currentPrice
};

//Calls values from feedCompanies document and getCompanyPrice helper (above) for Gallery - Comps
Template.registerHelper('companyFeed',function(){
    var companyId = this._id;
    var company = FeedCompanies.findOne({_id: companyId});
    var netDebt = company.capTable.netDebt;
    var price = getCompanyPrice(companyId);
    var sharesOs = company.capTable.sharesOs;
    var marketCap = sharesOs * price;
    var ev = marketCap + netDebt;
    return {
        revenueLtm: company.financial.ltm.revenue,
        revenueFy1: company.financial.fy1.revenue,
        revenueFy2: company.financial.fy2.revenue,
        ebitdaLtm: company.financial.ltm.ebitda,
        ebitdaFy1: company.financial.fy1.ebitda,
        ebitdaFy2: company.financial.fy2.ebitda,
        epsLtm: company.financial.ltm.eps,
        epsFy1: company.financial.fy1.eps,
        epsFy2: company.financial.fy2.eps,
        priceOption: price,
        yearHigh: company.capTable.yearHigh,
        yearLow: company.capTable.yearLow,
        sharesOs: company.capTable.sharesOs,
        marketCap: marketCap,
        enterpriseValue: ev,
        evRevenueLtm: ev / this.financial.ltm.revenue,
        evRevenueFy1: ev / this.financial.fy1.revenue,
        evRevenueFy2: ev / this.financial.fy2.revenue,
        evEbitdaLtm: ev / this.financial.ltm.ebitda,
        evEbitdaFy1: ev / this.financial.fy1.ebitda,
        evEbitdaFy2: ev / this.financial.fy2.ebitda,
        priceEarningsLtm: price / this.financial.ltm.eps,
        priceEarningsFy1: price / this.financial.fy1.eps,
        priceEarningsFy2: price / this.financial.fy2.eps
    };
});