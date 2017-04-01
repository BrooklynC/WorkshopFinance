Template.CoverageControls.helpers({
    targetAdd: function() {
        var coverage = Session.get('sessionCoverageType');
        if(coverage == "Targets") {
            return Template.GalleryTargetPublicAdd;
        } else {
            return Template.FootballBlank;
        }
    },
    footballExpand: function() {
        var coverage = Session.get('sessionCoverageType');
        if(coverage == "Valuations") {
            return Template.GalleryValuationsFootballExpand;
        } else {
            return Template.FootballBlank;
        }
    },
    footballNew: function() {
        var coverage = Session.get('sessionCoverageType');
        if(coverage == "Valuations") {
            return Template.GalleryValuationsFootballNew;
        } else {
            return Template.FootballBlank;
        }
    }
});

Template.CoverageControls.onCreated (function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('galleryPillCompany');
    });
});

