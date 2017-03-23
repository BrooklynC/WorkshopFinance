Template.LibraryContentMessage.helpers({
    libraryMessage: function() {
        var library = Session.get('sessionLibraryType');
        switch(library) {
            case "Comps":
                return "You haven't selected any Comp criteria yet.";
                break;
            case "Comps Indices":
                return "You don't yet have any indices available.";
                break;
            case "Deals":
                return "You haven't selected any Deal criteria yet.";
                break;
            case "Deals Indices":
                return "You don't yet have any indices available.";
                break;
        }
    }
});
