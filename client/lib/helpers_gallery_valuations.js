////GALLERY - VALUATIONS

//Chooses valuationType and valuationElement to include when adding new Valuation
getValuationSelect = function() {
    var library = Session.get('sessionLibraryType');
    switch(library) {
        case "Comps":
            return {
                type: "comps",
                element: "security"
            };
            break;
        case "Comps Indices":
            return {
                type: "comps",
                element: "index"
            };
            break;
        case "Deals":
            return {
                type: "deals",
                element: "security"
            };
            break;
        case "Deals Indices":
            return {
                type: "deals",
                element: "index"
            };
            break;
    }
};

//Chooses valuationMetric, valuationPeriod, output and outputPeriod to include when adding new Valuation
getValuationInfo = function(marketType) {
    switch(marketType) {
        case "company":
            return {
                metric: "EV/EBITDA",
                period: "LTM",
                output: "EV/EBITDA",
                outputPeriod: "LTM"
            };
            break;
        case "team":
            return {
                metric: "EV/Revenue",
                period: "FY0",
                output: "EV/Revenue",
                outputPeriod: "FY0"
            };
            break;
    }
};