Template.CoverageControls.helpers({
    isTargets: function() {
        var coverage = Session.get('sessionCoverageType');
        if(coverage == "Targets") {
            return true
        }
    },
    isValuations: function() {
        var coverage = Session.get('sessionCoverageType');
        if(coverage == "Valuations") {
            return true
        }
    }
});

Template.CoverageControls.onCreated (function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('galleryPillCompany');
    });
});

