Template.GalleryLibraryMenuScreen.helpers({
    sectorScreen: function() {
        var libraryType = Session.get('sessionLibraryType');
        switch(libraryType) {
            case "Comps":
                return Template.GalleryScreenCompSector;
                break;
            case "Comps Indices":
                return Template.FootballBlank;
                break;
            case "Deals":
                return Template.GalleryScreenDealSector;
                break;
            case "Deals Indices":
                return Template.FootballBlank;
                break;
        }
    }
});