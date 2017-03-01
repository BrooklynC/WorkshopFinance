Session.set('sessionScreenCompsSector', '');

Template.GalleryScreenCompSector.events({
    'change #screen-comp-inner': function(e) {
        e.preventDefault();

        var selection = $(e.target).val();

        Session.set('sessionScreenCompsSector', selection);
    }
});