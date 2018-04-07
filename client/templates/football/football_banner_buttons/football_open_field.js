Template.FootballOpenField.events({
    'click .open-field': function(e) {
        e.preventDefault();

        Session.set("footballContent", "field");
        Session.set('footballGalleryContent', "controls");
    }
});