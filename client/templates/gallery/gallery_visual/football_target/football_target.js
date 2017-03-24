//Changes Football Output options and updates Football document
Template.FootballTarget.events({
    'click .target-options li': function(e) {
        e.preventDefault();

        var ticker = this.ticker;

        getTargetTicker = function(ticker) {
            if(ticker == null) {
                return "none"
            } else {
                return ticker;
            }
        };
        var target = getTargetTicker(ticker);

        Template.instance().state.set('target', target);
    },
    'submit form': function(e) {
        e.preventDefault();

        var targetSelection = Template.instance().state.get('target');

        var currentFootballId = this._id;
        var currentFootball = Footballs.findOne({_id:currentFootballId});
        var valuations = currentFootball.footballValuations;
        var valuationsCount = valuations.length;

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        if(targetSelection !== null) {
            var targetObject = getTarget(currentFootballId, targetSelection);
            console.log("Target Object: ", targetObject);
            var footballType = getFootballType(targetSelection);

            if(currentUserId == ownerId) {
                if (valuationsCount > 0) {
                    var saveCopy = confirm("Select OK to recreate this football field with this new target.  Select Cancel to update the existing football field with this target.");
                    Meteor.call('footballTargetUpdateAndCopy', currentFootballId, targetObject, footballType, saveCopy, function (error, result) {
                    });
                } else {
                    Meteor.call('footballTargetUpdate', currentFootballId, targetObject, footballType, function (error, result) {
                    });
                }
            } else {
                return Meteor.call('footballSave', currentFootballId, targetSelection, footballType, function () {
                });
            }
        }
        //Clear selections
        localSelections.remove({});
    }
});

Template.FootballTarget.helpers({
    targetsHealthcare: function() {
        return FeedCompanies.find({sector:"Healthcare"}, {sort: {companyName: 1}});
    },
    targetsMaterials: function() {
        return FeedCompanies.find({sector:"Materials"}, {sort: {timeCreated: 1}});
    },
    targetsIndustrials: function() {
        return FeedCompanies.find({sector:"Industrials"}, {sort: {timeCreated: 1}});
    },
    targetsIt: function() {
        return FeedCompanies.find({sector:"Information Technology"}, {sort: {timeCreated: 1}});
    },
    targetsFinancials: function() {
        return FeedCompanies.find({sector:"Financials"}, {sort: {timeCreated: 1}});
    },
    targetsConsumerStaples: function() {
        return FeedCompanies.find({sector:"Consumer Staples"}, {sort: {timeCreated: 1}});
    },
    targetsConsumerDisc: function() {
        return FeedCompanies.find({sector:"Consumer Discretionary"}, {sort: {timeCreated: 1}});
    },
    targetsUtilities: function() {
        return FeedCompanies.find({sector:"Utilities"}, {sort: {timeCreated: 1}});
    },
    targetsEnergy: function() {
        return FeedCompanies.find({sector:"Energy"}, {sort: {timeCreated: 1}});
    },
    targetsTelecom: function() {
        return FeedCompanies.find({sector:"Telecommunication Services"}, {sort: {timeCreated: 1}});
    },
    settings: function() {
        var market = Template.parentData(0).marketType;
        switch(market) {
            case "company":
                return {
                    position: "bottom",
                    limit: 5,
                    rules: [
                        {
                            token: "",
                            collection: FeedCompanies,
                            field: "ticker",
                            template: Template.GalleryPillCompany
                        }
                    ]
                };
                break;
            case "team":
                return {
                    position: "bottom",
                    limit: 5,
                    rules: [
                        {
                            token: "",
                            collection: FeedTeams,
                            field: "teamName",
                            template: Template.GalleryPillTeam
                        }
                    ]
                };
                break;
        }
    }
});

Template.FootballTarget.helpers({
    updateTarget: function() {
        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();
        if(ownerId == currentUserId) {
            return "Save as New / Update"
        } else {
            return "Save as New"
        }
    }
});


Template.FootballTarget.onCreated (function () {
    this.state = new ReactiveDict;
    this.state.set('target', null);
});