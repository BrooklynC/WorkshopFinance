Template.CoverageContent.helpers({
    coveragePage: function() {
        var coverage = Session.get('sessionCoverageType');
        var currentUserId = Meteor.userId();
        switch (coverage) {
            case "Footballs":
                var footballs = Footballs.find({$or:[{ownerId: currentUserId},{viewers:{$in:[currentUserId]}}]});
                if (!footballs) {
                    return Template.CoverageContentMessage;
                } else {
                    return Template.CoverageContentList;
                }
                break;
            case "Targets":
                var targets = Options.findOne({ownerId: currentUserId}).targets;
                var targetsCount = targets.length;
                if (targetsCount < 1) {
                    return Template.CoverageContentMessage;
                } else {
                    return Template.CoverageContentList;
                }
                break;
            case "Valuations":
                var valuations = Valuations.find({ownerId: currentUserId, valuationFavorite: true});
                if (!valuations) {
                    return Template.CoverageContentMessage;
                } else {
                    return Template.CoverageContentList;
                }
                break;
        }
    }
});

Template.CoverageContent.onCreated (function () {
    var self = this;
    self.autorun(function() {
        //Footballs needs to be refined
        self.subscribe('galleryFootballs');
        self.subscribe('galleryFootballsUser');
        self.subscribe('galleryFootballsShared');
        self.subscribe('galleryTargetsUser');
        self.subscribe('galleryTargetsShared');
        self.subscribe('galleryValuationsUser');
        self.subscribe('galleryValuationsShared');
    });
});