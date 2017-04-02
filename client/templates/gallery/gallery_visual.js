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
        var currentFootballId = Options.findOne({ownerId:currentUserId}).footballActive;
        self.subscribe('footballActive', currentFootballId);
    });
});