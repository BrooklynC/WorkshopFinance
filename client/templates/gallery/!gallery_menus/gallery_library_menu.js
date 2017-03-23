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
    //},
    //isNotComps: function() {
    //    var library = Session.get('sessionLibraryType');
    //    if (library !== "Comps") {
    //        return true;
    //    }
    //},
    //isNotCompsIndices: function() {
    //    var library = Session.get('sessionLibraryType');
    //    if (library !== "Comps Indices") {
    //        return true;
    //    }
    //},
    //isNotDeals: function() {
    //    var library = Session.get('sessionLibraryType');
    //    if (library !== "Deals Indices") {
    //        return true;
    //    }
    //},
    //isNotDealsIndices: function() {
    //    var library = Session.get('sessionLibraryType');
    //    if (library !== "Deals Indices") {
    //        return true;
    //    }
    }
});