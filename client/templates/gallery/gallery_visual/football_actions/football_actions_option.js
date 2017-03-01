//Add username, run method to send or share
Template.FootballActionsOption.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentUser = Meteor.user();
        var currentUsername = currentUser.username;

        var currentFootballId = this._id;

        var field = $(e.target).find('[id=selection]');
        var selection = field.val();
        field.val('');

        var action = Session.get('sessionActions');
        switch(action) {
            case "save":
                return Meteor.call('footballSave', currentFootballId, selection, function () {
                    Session.set('sessionActions', "none");
                });
                break;
            case "send":
                if(selection == currentUsername) {
                    return alert("You can't send a Football to yourself.")
                } else {
                    return Meteor.call('footballSend', currentFootballId, selection, function () {
                        Session.set('sessionActions', "none");
                    });
                }
                break;
            case "share":
                if(selection == currentUsername) {
                    return alert("You can't share a Football with yourself.");
                } else {
                    Meteor.call('footballShare', currentFootballId, selection, function () {
                        Session.set('sessionActions', "none");
                    });
                }
        }
    }
});

//Select new target to attach to new Football
//Different method will be run depending on whether target is selected
Template.FootballActionsOption.helpers({
    settings: function() {
        var marketType = this.marketType;
        var action = Session.get('sessionActions');
        switch(action) {
            case "save":
                switch(marketType) {
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
                break;
            case "send":
                return {
                    position: "bottom",
                    limit: 5,
                    rules: [
                        {
                            token: "",
                            collection: Meteor.users,
                            field: "username",
                            template: Template.GalleryPillUser
                        }
                    ]
                };
                break;
            case "share":
                return {
                    position: "bottom",
                    limit: 5,
                    rules: [
                        {
                            token: "",
                            collection: Meteor.users,
                            field: "username",
                            template: Template.GalleryPillUser
                        }
                    ]
                };
                break;
        }
    },
    //Text for button in new template
    action: function() {
        return Session.get('sessionActions');
    }
});

Template.FootballActionsOption.onCreated (function () {
    var self = this;
    self.autorun(function() {
        self.subscribe('pillFeedComps');
    });
});