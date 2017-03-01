Session.set('sessionScreenDealsSector', "");

Template.GalleryScreenDealSector.events({
    'change #screen-deal-inner': function(e) {
        e.preventDefault();

        var selection = $(e.target).val();

        Session.set('sessionScreenDealsSector', selection);
    }
});