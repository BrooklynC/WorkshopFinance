Template.LibraryContent.helpers({
    libraryPage: function() {
        var libraryType = Session.get('sessionLibraryType');
        switch (libraryType) {
            case "Comps":
                var screenComps = Session.get('sessionScreenCompsSector');
                if (!screenComps) {
                    return Template.LibraryContentMessage;
                } else {
                    return Template.LibraryContentList;
                }
                break;
            case "Comps Indices":
                return Template.LibraryContentList;
                break;
            case "Deals":
                var screenDeals = Session.get('sessionScreenDealsSector');
                if (!screenDeals) {
                    return Template.LibraryContentMessage;
                } else {
                    return Template.LibraryContentList;
                }
                break;
            case "Deals Indices":
                return Template.LibraryContentList;
                break;
        }
    }
});

Template.LibraryContent.onCreated (function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('galleryCompanies');
        self.subscribe('galleryCompaniesIndices');
        self.subscribe('galleryDeals');
        self.subscribe('galleryDealsIndices');
    });
});