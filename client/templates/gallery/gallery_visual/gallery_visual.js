Template.GalleryVisual.events({
    'click #gallery-visual-base': function(e) {
        e.preventDefault();

        var sessionGalleryExisting = Session.get('sessionGallery');
        Session.set('sessionGallery', "visual");
        var sessionGalleryNew = Session.get('sessionGallery');

        if(sessionGalleryExisting !== sessionGalleryNew) {
            localSelections.remove({})
        }
    }
});

Template.GalleryVisual.helpers({
    currentFootballId: function () {
        var currentUserId = Meteor.userId();
        var footballActive = Options.findOne({ownerId:currentUserId}).footballActive;
        return Footballs.findOne({_id:footballActive});
    },
    targetName: function() {
        var footballType = this.footballType;
        if(footballType == "market") {
            return "Market Comparison";
        } else {
            var targetId = this.footballTarget.targetId;
            var target = FeedCompanies.findOne({_id:targetId});
            return target.companyName;
        }
    }
});

Template.GalleryVisual.onCreated (function () {
    var self = this;
    self.autorun(function() {
        var currentUserId = Meteor.userId();
        var footballActive = Options.findOne({ownerId:currentUserId}).footballActive;
        self.subscribe('galleryFootballActive', footballActive);
    });
});