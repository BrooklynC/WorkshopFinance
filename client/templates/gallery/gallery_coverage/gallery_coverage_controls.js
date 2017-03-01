Template.CoverageControls.helpers({
    targetAdd: function() {
        var coverage = Session.get('sessionCoverageType');
        if(coverage == "targets") {
            return Template.GalleryTargetAdd;
        } else {
            return Template.FootballBlank;
        }
    },
    footballExpand: function() {
        var coverage = Session.get('sessionCoverageType');
        if(coverage == "valuations") {
            return Template.GalleryFootballExpand;
        } else {
            return Template.FootballBlank;
        }
    },
    footballNew: function() {
        var coverage = Session.get('sessionCoverageType');
        if(coverage == "valuations") {
            return Template.GalleryFootballNew;
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

