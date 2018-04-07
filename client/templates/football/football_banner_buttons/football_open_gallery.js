Template.FootballOpenGallery.events({
    'click .open-gallery': function(e) {
        e.preventDefault();

        Session.set("footballContent", "gallery")
    }
});