//Values to display in Football item in Gallery
Template.registerHelper('galleryFootballTarget',function(){
    var footballType = Template.parentData(0).footballType;
    if(footballType == "market") {
        return {
            targetName: "Market Comparison",
            ticker: "No target"
        };
    } else {
        var target = {
            targetId: this.footballTarget.targetId,
            targetType: this.footballTarget.targetType,
            targetData: this.footballTarget.targetData
        };
        switch(target.targetType) {
            case "company":
                switch(target.targetData) {
                    case "feed":
                        var feedCompany = FeedCompanies.findOne({_id:target.targetId});
                        return {
                            targetName: feedCompany.companyName,
                            ticker: feedCompany.ticker
                        };
                        break;
                }
                break;
            case "team":
                switch(target.targetData) {
                    case "feed":
                        var feedTeam = FeedTeams.findOne({_id:target.targetId});
                        return {
                            targetName: feedTeam.teamName,
                            ticker: feedTeam.ticker
                        };
                        break;
                }
                break;
        }
    }
});

