////GALLERY - TARGETS

//Values to display in Target item in Gallery
Template.registerHelper('galleryTargetData',function() {
    var target = {
        targetId: Template.parentData(0).targetId,
        targetType: Template.parentData(0).targetType,
        targetData: Template.parentData(0).targetData
    };

    switch(target.targetType) {
        case "company":
            switch(target.targetData) {
                case "feed":
                    var feedCompany = FeedCompanies.findOne({_id: target.targetId});
                    return {
                        targetName: feedCompany.companyName,
                        status: feedCompany.status,
                        ticker: feedCompany.ticker,
                        sector: feedCompany.sector,
                        subSector: feedCompany.subSector
                    };
                    break;
                case "custom":
                    var customCompany = TargetsCompanies.findOne({_id: targetId});
                    return {
                        targetName: customCompany.companyName,
                        status: customCompany.status,
                        ticker: "N/A",
                        sector: customCompany.sector,
                        subSector: customCompany.subSector
                    };
                    break;
            }
            break;
        case "team":
            switch(target.targetData) {
                case "feed":
                    var feedTeam = FeedTeams.findOne({_id: target.targetId});
                    return {
                        targetName: feedTeam.teamName,
                        city: feedTeam.teamCity,
                        ticker: feedTeam.ticker,
                        league: feedTeam.league,
                        leagueAbbrev: feedTeam.leagueAbbrev,
                        sport: feedTeam.sport,
                        attendance: feedTeam.financial.fy0.attendance
                    };
                    break;
            }
            break;
    }
});