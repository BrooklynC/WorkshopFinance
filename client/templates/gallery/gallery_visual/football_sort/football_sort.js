//Changes Football Output options and updates Football document
Template.FootballSort.events({
    'change #sort-selection': function(e) {
        e.preventDefault();

        var currentFootballId = this._id;

        var newFootballSort = $(e.target).val();
        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            Meteor.call('footballSortUpdate', currentFootballId, newFootballSort, function(error, result) {
            });
        }
    }
});

Template.FootballSort.helpers({
    sortDateAscend: function() {
        var footballSort = this.footballSort;
        if(footballSort == "Date (oldest first)") {
            return "selected";
        }
    },
    sortDateDescend: function() {
        var footballSort = this.footballSort;
        if(footballSort == "Date (newest first)") {
            return "selected";
        }
    },
    sortValueAscend: function() {
        var footballSort = this.footballSort;
        if(footballSort == "Value (ascending)") {
            return "selected";
        }
    },
    sortValueDescend: function() {
        var footballSort = this.footballSort;
        if(footballSort == "Value (descending)") {
            return "selected";
        }
    },
    sortManual: function() {
        var footballSort = this.footballSort;
        if(footballSort == "Manual") {
            return "selected";
        }
    }
});