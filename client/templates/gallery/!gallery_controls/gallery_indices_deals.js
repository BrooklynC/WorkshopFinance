//This is used once by user "workshop" after database reset
Template.GalleryIndicesDeals.events({
    'submit form': function(e) {
        e.preventDefault();

        Meteor.call('createIndicesDeals', function (error, result) {
        });
    }
});