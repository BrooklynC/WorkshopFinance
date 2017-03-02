//This is used once by user "workshop" after database reset
Template.GalleryIndicesComps.events({
    'submit form': function(e) {
        e.preventDefault();

        Meteor.call('addIndicesComps', function (error, result) {
        });
    }
});