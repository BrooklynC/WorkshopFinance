Session.set('sessionCoverageType', "Footballs");

Template.CoverageMenu.events({
    'click .menu-coverage': function(e) {
        e.preventDefault();

        var coverage = $(e.target).text();

        Session.set('sessionCoverageType', coverage);
    }
});

Template.CoverageMenu.helpers({
    coverage: function() {
        return Session.get('sessionCoverageType');
    },
    isNotFootballs: function() {
        var coverage = Session.get('sessionCoverageType');
        if(coverage !== "Footballs") {
            return true
        }
    },
    isNotValuations: function() {
        var coverage = Session.get('sessionCoverageType');
        if(coverage !== "Valuations") {
            return true
        }
    },
    isNotTargets: function() {
        var coverage = Session.get('sessionCoverageType');
        if(coverage !== "Targets") {
            return true
        }
    }
});