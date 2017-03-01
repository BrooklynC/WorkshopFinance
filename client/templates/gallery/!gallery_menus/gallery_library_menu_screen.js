Template.GalleryLibraryMenuScreen.helpers({
    sectorScreen: function() {
        var libraryType = Session.get('sessionLibraryType');
        switch(libraryType) {
            case "none":
                return Template.FootballBlank;
                break;
            case "comps":
                return Template.GalleryScreenCompSector;
                break;
            case "compsIndices":
                return Template.FootballBlank;
                break;
            case "deals":
                return Template.GalleryScreenDealSector;
                break;
            case "dealsIndices":
                return Template.FootballBlank;
                break;
        }
    }
});