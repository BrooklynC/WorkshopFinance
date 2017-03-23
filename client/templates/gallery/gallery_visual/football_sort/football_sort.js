//Changes Football Output options and updates Football document
Template.FootballSort.events({
    'click .menu-sort-text': function(e) {
        e.preventDefault();

        var newFootballSort = $(e.target).text();

        var currentFootballId = this._id;

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(currentUserId == ownerId) {
            Meteor.call('footballSortUpdate', currentFootballId, newFootballSort, function(error, result) {
            });
        }
    }
});

Template.FootballSort.helpers({
    isNotDateAsc: function() {
        var output = this.footballSort;
        if(output !== "Date (oldest first)") {
            return true
        }
    },
    isNotDateDesc: function() {
        var output = this.footballSort;
        if(output !== "Date (newest first)") {
            return true
        }
    },
    isNotValueAsc: function() {
        var output = this.footballSort;
        if(output !== "Value (ascending)") {
            return true
        }
    },
    isNotValueDesc: function() {
        var output = this.footballSort;
        if(output !== "Value (descending)") {
            return true
        }
    },
    isNotManual: function() {
        var output = this.footballSort;
        if(output !== "Manual") {
            return true
        }
    }
});