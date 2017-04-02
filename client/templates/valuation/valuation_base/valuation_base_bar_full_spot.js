//Determines coloring of bar
Template.ValuationBaseBarFullSpot.helpers({
    barContentType: function () {
        var valuationType = this.valuationType;
        switch (valuationType) {
            case "comps":
                return "bar-full-comps";
                break;
            case "deals":
                return "bar-full-deals";
                break;
            case "models":
                return "bar-full-models";
                break;
            case "custom":
                return "bar-full-custom";
                break;
        }
    },
    valuationId: function() {
        return this._id;
    }
});

//Bar dimensions depend on valuation results and range calculations
//Text is formatted and added for labels
Template.ValuationBaseBarFullSpot.onRendered (function () {
    const self = this;

    var footballId = Template.parentData(1)._id;
    var valuationId = Template.parentData(0)._id;

    var valuationStartPct = getValuationCalcs(footballId, valuationId).startPct;

    var valuationLowSpace = getValuationText(footballId, valuationId).valuationLowSpace;
    var valuationLowText = getValuationText(footballId, valuationId).valuationLowText;

    var barFormat = UI._globalHelpers.barFormat(footballId);
    var symCurrency = UI._globalHelpers.symCurrency(footballId);
    var symMultiple = UI._globalHelpers.symMultiple(footballId);
    var themeText = UI._globalHelpers.themeStyle().barText;

    var barContainer = d3.select("#spot" + valuationId)
        .append("svg")
        .attr("id", "svg-spot");

    var bar = barContainer.append("circle")
        .attr("cx", valuationStartPct + "%")
        .attr("cy", 50+"%")
        .attr("r", 10)
        .attr("id", "spot" + valuationId);

    var barLow = barContainer.append("text")
        .attr("x", valuationLowSpace + "%")
        .attr("y", 50+"%")
        .text(symCurrency + barFormat(valuationLowText) + symMultiple)
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .attr("fill", themeText)
        .style("left", "5px")
        .attr("id", "low" + valuationId);

    self.autorun(function() {
        var footballId = Template.parentData(1)._id;
        var valuationId = Template.parentData(0)._id;
        var valuationStartPct = getValuationCalcs(footballId, valuationId).startPct;

        var valuationLowSpace = getValuationText(footballId, valuationId).valuationLowSpace;
        var valuationLowText = getValuationText(footballId, valuationId).valuationLowText;

        var themeText = UI._globalHelpers.themeStyle().barText;
        var barFormat = UI._globalHelpers.barFormat(footballId);
        var symCurrency = UI._globalHelpers.symCurrency(footballId);
        var symMultiple = UI._globalHelpers.symMultiple(footballId);

        barContainer.select("#spot" + valuationId)
            .transition()
            .duration(0)
            .attr("cx", valuationStartPct + "%")
            .attr("cy", 50+"%")
            .attr("r", 10);

        barContainer.select("#low" + valuationId)
            .transition()
            .duration(0)
            .attr("x", valuationLowSpace + "%")
            .attr("y", 50+"%")
            .text(symCurrency + barFormat(valuationLowText) + symMultiple)
            .attr("text-anchor", "end")
            .attr("font-size", "12px")
            .attr("fill", themeText)
            .style("left", "5px");
    });
});