Session.set('sessionLibraryType', "comps");

Template.LibraryMenu.events({
    'change .library-filter': function(e) {
        e.preventDefault();

        var library = $(e.target).val();

        Session.set('sessionLibraryType', library);
    }
});

Template.LibraryMenu.helpers({
    isComps: function() {
        var library = Session.get('sessionLibraryType');
        if (library == "comps") {
            return "filter-library-active";
        }
    },
    isCompsIndices: function() {
        var library = Session.get('sessionLibraryType');
        if (library == "compsIndices") {
            return "filter-library-active";
        }
    },
    isDeals: function() {
        var library = Session.get('sessionLibraryType');
        if (library == "deals") {
            return "filter-library-active";
        }
    },
    isDealsIndices: function() {
        var library = Session.get('sessionLibraryType');
        if (library == "dealsIndices") {
            return "filter-library-active";
        }
    }
});