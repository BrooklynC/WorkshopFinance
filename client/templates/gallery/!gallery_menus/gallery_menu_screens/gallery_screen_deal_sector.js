Session.set('sessionScreenDealsSector', '');

Template.GalleryScreenDealSector.events({
    'click .screen-comp-sector': function(e) {
        e.preventDefault();

        var sector = $(e.target).text();

        Session.set('sessionScreenDealsSector', sector);
    }
});

Template.GalleryScreenDealSector.helpers({
    sectorTitle: function() {
        var title = Session.get('sessionScreenDealsSector');
        if(title == '') {
            return "Select Sector";
        } else {
            return Session.get('sessionScreenDealsSector');
        }
    }
});