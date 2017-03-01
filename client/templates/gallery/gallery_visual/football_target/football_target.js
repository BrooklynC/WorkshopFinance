//Changes Football Output options and updates Football document
Template.FootballTarget.events({
    'submit form': function(e) {
        e.preventDefault();

        var field = $(e.target).find('[id=footballAddTarget]');
        var targetSelection = field.val();

        var currentFootballId = this._id;
        var currentFootball = Footballs.findOne({_id:currentFootballId});
        var valuations = currentFootball.footballValuations;
        var valuationsCount = valuations.length;

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();

        var target = getTarget(currentFootballId, targetSelection);

        var footballType = getFootballType(targetSelection);

        if(currentUserId == ownerId) {
            if (valuationsCount > 0) {
                var saveCopy = confirm("Do you want to save a copy of this football first?");
                Meteor.call('footballTargetUpdateAndCopy', currentFootballId, target, footballType, saveCopy, function (error, result) {
                });
            } else {
                Meteor.call('footballTargetUpdate', currentFootballId, target, footballType, function (error, result) {
                });
            }

        }
        //Clear selections
        field.val('');
        localSelections.remove({});
    }
});

Template.FootballTarget.helpers({
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