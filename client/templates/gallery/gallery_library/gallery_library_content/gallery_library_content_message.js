Template.LibraryContentMessage.helpers({
    libraryMessage: function() {
        var library = Session.get('sessionLibraryType');
        switch(library) {
            case "comps":
                return "You haven't selected any Comp criteria yet.";
                break;
            case "compsIndices":
                return "You don't yet have any indices available.";
                break;
            case "deals":
                return "You haven't selected any Deal criteria yet.";
                break;
            case "dealsIndices":
                return "You don't yet have any indices available.";
                break;
        }
    }
});
