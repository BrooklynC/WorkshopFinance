Template.FootballOpenProfile.events({
    'click .open-profile': function(e) {
        e.preventDefault();

        Session.set("footballContent", "profile");
        Session.set('footballGalleryContent', "controls");
    }
});