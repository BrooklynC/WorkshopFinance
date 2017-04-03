Session.set('sessionMarketType', "none");

//Changes Football Output options and updates Football document
Template.FootballMarketType.events({
    //'change #market-type-selection': function(e) {
    //    e.preventDefault();
    //
    //    var currentFootballId = this._id;
    //    var currentFootball = Footballs.findOne({_id:currentFootballId});
    //    var valuations = currentFootball.footballValuations;
    //    var valuationsCount = valuations.length;
    //
    //    var marketType = $(e.target).val();
    //    var ownerId = this.ownerId;
    //    var currentUserId = Meteor.userId();
    //
    //    if(currentUserId == ownerId) {
    //        if (valuationsCount == 0) {
    //            Meteor.call('footballMarketTypeUpdate', currentFootballId, marketType, function (error, result) {
    //            });
    //        }
    //    }
    //}
});

Template.FootballMarketType.helpers({
    typeCompany: function() {
        var marketType = this.marketType;
        if(marketType == "company") {
            return "selected";
        }
    },
    typeTeam: function() {
        var marketType = this.marketType;
        if(marketType == "team") {
            return "selected";
        }
    }
});