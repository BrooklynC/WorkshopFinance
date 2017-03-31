Session.set('sessionLibraryType', "Comps");

Template.LibraryMenu.events({
    'click .menu-library-filter': function(e) {
        e.preventDefault();

        var library = $(e.target).text();

        Session.set('sessionLibraryType', library);
    }
});

Template.LibraryMenu.helpers({
    libraryType: function() {
        return Session.get('sessionLibraryType');
    },
    sectorScreen: function() {
        var libraryType = Session.get('sessionLibraryType');
        switch(libraryType) {
            case "Comps":
                return Template.GalleryLibraryScreenComp;
                break;
            case "Comps Indices":
                return Template.FootballBlank;
                break;
            case "Deals":
                return Template.GalleryLibraryScreenDeal;
                break;
            case "Deals Indices":
                return Template.FootballBlank;
                break;
        }
    }
});