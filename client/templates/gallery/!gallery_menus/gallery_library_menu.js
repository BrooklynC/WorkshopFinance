Session.set('sessionLibraryType', "Comps");

Template.LibraryMenu.events({
    'click .menu-library-filter': function(e) {
        e.preventDefault();

        var library = $(e.target).text();

        Session.set('sessionLibraryType', library);
    }
});

Template.LibraryMenu.helpers({
    libraryFilter: function() {
        return Session.get('sessionLibraryType');
    }
});