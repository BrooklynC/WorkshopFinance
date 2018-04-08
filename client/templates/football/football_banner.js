//Toggles Football Name between form and text view
Template.FootballBanner.events({
    'click #football-name-value': function(e) {
        e.preventDefault();

        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();
        var nameState = Template.instance().showName.get();

        if(currentUserId == ownerId) {
            if(nameState == true) {
                Template.instance().showName.set(false);
            }
        }
    },
    'submit #football-name-form': function(e) {
        e.preventDefault();

        var currentFootballId = this._id;
        var footballName = $(e.target).find('[name=football-name-edit]').val();

        Meteor.call('footballNameUpdate', currentFootballId, footballName, function(error, result) {
        });
        Template.instance().showName.set(true)
    }
});

Template.FootballBanner.helpers({
    footballDetails: function() {
        var footballContent = Session.get('footballContent');
        switch(footballContent) {
            case "field":
                return Template.FootballBannerDetails;
                break;
            case "controls":
                return Template.FootballBannerDetails;
                break;
            case "library":
                return Template.FootballBannerDetails;
                break;
            case "coverage":
                return Template.FootballBannerLogo;
                break;
            case "profile":
                return Template.FootballBannerLogo;
                break;
        }
    }
});

Template.FootballBanner.onCreated (function () {
    this.showName = new ReactiveVar(true);
});