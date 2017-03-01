TargetsTeams = new Mongo.Collection('targetsTeams');

CapTableSchema = new SimpleSchema({
    enterpriseValue: {
        type: Number,
        label: "Enterprise Value",
        min: 0,
        decimal: true,
        optional: true
    }
});

ValueSchema = new SimpleSchema({
    revenue: {
        type: Number,
        label: "Revenue",
        min: 0,
        decimal: true,
        optional: true
    },
    attendance: {
        type: Number,
        label: "Attendance",
        decimal: true,
        optional: true
    }
});

PeriodSchema = new SimpleSchema({
    fy0: {
        type: ValueSchema,
        optional: true
    }
});

TargetsTeamsSchema = new SimpleSchema({
    ownerId: {
        type: String,
        label: "Owner ID",
        optional: true
    },
    ownerCategory: {
        type: String,
        label: "Owner Category",
        allowedValues:  ["user","workshop"],
        defaultValue: "user",
        optional: true
    },
    teamName: {
        type: String,
        label: "Team Name",
        optional: true
    },
    teamCity: {
        type: String,
        label: "Team City",
        optional: true
    },
    ticker: {
        type: String,
        label: "Ticker",
        optional: true
    },
    league: {
        type: String,
        label: "League",
        allowedValues: ["Major League Baseball","National Football League"],
        optional: true
    },
    leagueAbbrev: {
        type: String,
        label: "League",
        allowedValues: ["MLB","NFL"],
        optional: true
    },
    sport: {
        type: String,
        label: "Sport",
        allowedValues: ["baseball","football"],
        optional: true
    },
    feedId: {
        type: String,
        label: "Feed ID",
        optional: true
    },
    viewers: {
        type: [String],
        label: "Target tTeam Viewers",
        optional: true
    },
    sentBy: {
        type: String,
        label: "Sent by",
        optional: true
    },
    sharedBy: {
        type: String,
        label: "Shared by",
        optional: true
    },
    capTable: {
        type: CapTableSchema,
        optional: true
    },
    financial: {
        type: PeriodSchema,
        optional: true
    }
});

TargetsTeams.attachSchema(TargetsTeamsSchema);
