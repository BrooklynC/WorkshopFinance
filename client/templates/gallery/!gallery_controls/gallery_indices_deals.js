//This is used once by user "workshop" after database reset
Template.GalleryIndicesDeals.events({
    'submit form': function(e) {
        e.preventDefault();

        Meteor.call('addIndicesDeals', function (error, result) {
        });
    }
});