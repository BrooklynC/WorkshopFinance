Template.FootballLibrary.events({
    'click #btn-comps': function(e) {
        e.preventDefault();

        var library = "Comps";

        Session.set('sessionLibraryType', library);
        localSelections.remove({})
    },
    'click #btn-comps-indices': function(e) {
        e.preventDefault();

        var library = "Comps Indices";

        Session.set('sessionLibraryType', library);
        localSelections.remove({})
    },
    'click #btn-deals': function(e) {
        e.preventDefault();

        var library = "Deals";

        Session.set('sessionLibraryType', library);
        localSelections.remove({})
    },
    'click #btn-deals-indices': function(e) {
        e.preventDefault();

        var library = "Deals Indices";

        Session.set('sessionLibraryType', library);
        localSelections.remove({})
    }
});

Template.FootballLibrary.helpers({
    sectorScreen: function() {
        var libraryType = Session.get('sessionLibraryType');
        switch(libraryType) {
            case "Comps":
                return Template.GalleryLibraryScreenComp;
                break;
            case "Comps Indices":
                return Template.Blank;
                break;
            case "Deals":
                return Template.GalleryLibraryScreenDeal;
                break;
            case "Deals Indices":
                return Template.Blank;
                break;
        }
    },
    indexTrue: function() {
        var libraryType = Session.get('sessionLibraryType');

        if(libraryType == "Comps Indices" || libraryType == "Deals Indices") {
            return true
        }
    },
    indexName: function() {
        return Session.get('sessionLibraryType');
    }
});

Template.FootballLibrary.onCreated (function () {
});

