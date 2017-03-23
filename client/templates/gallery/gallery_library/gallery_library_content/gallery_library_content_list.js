//Changes documents to show depending on which Gallery is active.
//One Gallery Item template, content changes depending on active.
Template.LibraryContentList.helpers({
    library: function() {
        var sessionLibraryType = Session.get('sessionLibraryType');
        switch (sessionLibraryType) {
            case "Comps":
                var screenSectorComps = Session.get('sessionScreenCompsSector');
                if(screenSectorComps !== '') {
                    var sectorComps = screenSectorComps
                }
                return FeedCompanies.find(
                    {sector: sectorComps}
                );
                break;
            case "Comps Indices":
                return FeedCompaniesIndices.find({});
                break;
            case "Deals":
                var screenSectorDeals = Session.get('sessionScreenDealsSector');
                if(screenSectorDeals !== '') {
                    var sectorDeals = screenSectorDeals
                }
                return FeedDeals.find(
                    {sector: sectorDeals}
                );
                break;
            case "Deals Indices":
                return FeedDealsIndices.find({});
                break;
        }
    }
});