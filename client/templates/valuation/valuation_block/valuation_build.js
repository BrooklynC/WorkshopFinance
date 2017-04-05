Template.ValuationBuild.helpers({
    //Only owner can add selections
    //valuationBuildAddAuto: function() {
    //    var ownerId = this.ownerId;
    //    var currentUserId = Meteor.userId();
    //    if (currentUserId == ownerId) {
    //        var valuationType = this.valuationType;
    //        switch (valuationType) {
    //            case "comps":
    //                return Template.ValuationBuildDataAuto;
    //                break;
    //            case "deals":
    //                return Template.ValuationBuildDataAuto;
    //                break;
    //            case "models":
    //                return Template.ValuationBuildModel;
    //                break;
    //            case "custom":
    //                return Template.ValuationBuildCustom;
    //                break;
    //        }
    //    } else {
    //        return Template.Blank;
    //    }
    //},
    valuationBuildAdd: function() {
        var ownerId = this.ownerId;
        var currentUserId = Meteor.userId();
        if (currentUserId == ownerId) {
            var valuationType = this.valuationType;
            var valuationElement = this.valuationElement;
            switch (valuationType) {
                case "comps":
                    switch(valuationElement) {
                        case "security":
                            return Template.ValuationBuildDataComps;
                            break;
                        case "index":
                            return Template.ValuationBuildDataCompsIndices;
                            break;
                    }
                    break;
                case "deals":
                    switch(valuationElement) {
                        case "security":
                            return Template.ValuationBuildDataDeals;
                            break;
                        case "index":
                            return Template.ValuationBuildDataDealsIndices;
                            break;
                    }
                    break;
                case "models":
                    return Template.ValuationBuildModel;
                    break;
                case "custom":
                    return Template.ValuationBuildCustom;
                    break;
            }
        } else {
            return Template.Blank;
        }
    },
    valuationBuildTable: function() {
        var valuationType = this.valuationType;
        switch(valuationType) {
            case "comps":
                return Template.ValuationBuildTableData;
                break;
            case "deals":
                return Template.ValuationBuildTableData;
                break;
            case "models":
                return Template.ValuationBuildTableModel;
                break;
            case "custom":
                return Template.ValuationBuildTableCustom;
                break;
        }
    }
});