Template.GalleryVisual.helpers({
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
        var currentFootballId = Template.parentData(0)._id;
        self.subscribe('footballActive', currentFootballId);
    });
});