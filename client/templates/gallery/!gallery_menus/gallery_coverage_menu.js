Session.set('sessionCoverageType', "footballs");

Template.CoverageMenu.events({
    'change .coverage-filter': function(e) {
        e.preventDefault();

        var coverage = $(e.target).val();

        Session.set('sessionCoverageType', coverage);
    }
});

Template.CoverageMenu.helpers({
    isFootballs: function() {
        var coverage = Session.get('sessionCoverageType');
        if (coverage == "footballs") {
            return "filter-coverage-active";
        }
    },
    isValuations: function() {
        var coverage = Session.get('sessionCoverageType');
        if (coverage == "valuations") {
            return "filter-coverage-active";
        }
    },
    isTargets: function() {
        var coverage = Session.get('sessionCoverageType');
        if (coverage == "targets") {
            return "filter-coverage-active";
        }
    }
});