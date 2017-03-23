Session.set('sessionScreenCompsSector', '');

Template.GalleryScreenCompSector.events({
    'click .screen-comp-sector': function(e) {
        e.preventDefault();

        var sector = $(e.target).text();

        Session.set('sessionScreenCompsSector', sector);
    }
});

Template.GalleryScreenCompSector.helpers({
    sectorTitle: function() {
        var title = Session.get('sessionScreenCompsSector');
        if(title == '') {
            return "Select Sector";
        } else {
            return Session.get('sessionScreenCompsSector');
        }
    }
});

