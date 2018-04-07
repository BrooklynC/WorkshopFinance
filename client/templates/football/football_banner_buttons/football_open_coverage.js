Template.FootballOpenCoverage.events({
    'click .open-coverage': function(e) {
        e.preventDefault();

        Session.set("footballContent", "coverage");
        Session.set('footballGalleryContent', "controls");
    }
});