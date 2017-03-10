////GALLERY PUBLICATIONS

//GALLERY
Meteor.publish('feedCompanies', function() {
    return FeedCompanies.find({},{
        fields:{_id:1,
            ticker:1,
            companyName:1,
            sector:1
        }
    });
});

Meteor.publish('feedTeams', function() {
    return FeedTeams.find({},{
        fields:{_id:1,
            teamName: 1,
            teamCity: 1,
            ticker:1,
            league: 1,
            leagueAbbrev: 1,
            sport: 1
        }
    });
});

Meteor.publish('footballActive', function(currentFootballId) {
    check(currentFootballId, String);
    return Footballs.find({_id:currentFootballId});
});

Meteor.publish("userStatus", function() {
    return Meteor.users.find({ "status.online": true });
});