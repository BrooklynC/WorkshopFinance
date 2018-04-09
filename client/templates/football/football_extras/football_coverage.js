Template.FootballCoverage.events({
    'click #btn-footballs': function(e) {
        e.preventDefault();

        var coverage = "Footballs";

        Session.set('sessionCoverageType', coverage);
    },
    'click #btn-targets': function(e) {
        e.preventDefault();

        var coverage = "Targets";

        Session.set('sessionCoverageType', coverage);
    }
});

Template.FootballCoverage.helpers({
    isTargets: function() {
        var coverage = Session.get('sessionCoverageType');

        if(coverage == "Targets") {
            return true
        }
    },
    coverageName: function() {
        return Session.get('sessionCoverageType');
    }
});

Template.FootballCoverage.onCreated (function () {
});

