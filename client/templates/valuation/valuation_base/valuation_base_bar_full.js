//Determines coloring of bar
Template.ValuationBaseBarFull.helpers({
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
Template.ValuationBaseBarFull.onRendered (function () {
    const self = this;

    var footballId = Template.parentData(1)._id;
    var valuationId = Template.parentData(0)._id;

    var valuationStartPct = getValuationCalcs(footballId, valuationId).startPct;
    var valuationWidthPct = getValuationCalcs(footballId, valuationId).widthPct;

    var valuationLowSpace = getValuationText(footballId, valuationId).valuationLowSpace;
    var valuationHighSpace = getValuationText(footballId, valuationId).valuationHighSpace;
    var valuationLowText = getValuationText(footballId, valuationId).valuationLowText;
    var valuationHighText = getValuationText(footballId, valuationId).valuationHighText;

    var barFormat = UI._globalHelpers.barFormat(footballId);
    var symCurrency = UI._globalHelpers.symCurrency(footballId);
    var symMultiple = UI._globalHelpers.symMultiple(footballId);
    var themeText = UI._globalHelpers.themeStyle().barText;

    var barContainer = d3.select("#bar" + valuationId)
        .append("svg")
        .attr("id", "svg-bar");

    var bar = barContainer.append("rect")
        .attr("x", valuationStartPct + "%")
        .attr("y", 0)
        .attr("height", 35)
        .attr("width", valuationWidthPct + "%")
        .attr("id", "bar" + valuationId);

    var barLow = barContainer.append("text")
        .attr("x", valuationLowSpace + "%")
        .attr("y", "20px")
        .text(symCurrency + barFormat(valuationLowText) + symMultiple)
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .attr("fill", themeText)
        .style("left", "5px")
        .attr("id", "low" + valuationId);

    var barHigh = barContainer.append("text")
        .attr("x", valuationHighSpace + "%")
        .attr("y", "20px")
        .text(symCurrency + barFormat(valuationHighText) + symMultiple)
        .attr("text-anchor", "start")
        .attr("font-size", "12px")
        .attr("fill", themeText)
        .style("right", "5px")
        .attr("id", "high" + valuationId);

    self.autorun(function() {
        var footballId = Template.parentData(1)._id;
        var valuationId = Template.parentData(0)._id;
        var valuationStartPct = getValuationCalcs(footballId, valuationId).startPct;
        var valuationWidthPct = getValuationCalcs(footballId, valuationId).widthPct;

        var valuationLowSpace = getValuationText(footballId, valuationId).valuationLowSpace;
        var valuationHighSpace = getValuationText(footballId, valuationId).valuationHighSpace;
        var valuationLowText = getValuationText(footballId, valuationId).valuationLowText;
        var valuationHighText = getValuationText(footballId, valuationId).valuationHighText;

        var themeText = UI._globalHelpers.themeStyle().barText;
        var barFormat = UI._globalHelpers.barFormat(footballId);
        var symCurrency = UI._globalHelpers.symCurrency(footballId);
        var symMultiple = UI._globalHelpers.symMultiple(footballId);

        barContainer.select("#bar" + valuationId)
            .transition()
            .duration(0)
            .attr("x", valuationStartPct + "%")
            .attr("y", 0)
            .attr("height", 35)
            .attr("width", valuationWidthPct + "%");

        barContainer.select("#low" + valuationId)
            .transition()
            .duration(0)
            .attr("x", valuationLowSpace + "%")
            .attr("y", "20px")
            .text(symCurrency + barFormat(valuationLowText) + symMultiple)
            .attr("text-anchor", "end")
            .attr("font-size", "12px")
            .style("left", "5px")
            .attr("fill", themeText);

        barContainer.select("#high" + valuationId)
            .transition()
            .duration(0)
            .attr("x", valuationHighSpace + "%")
            .attr("y", "20px")
            .text(symCurrency + barFormat(valuationHighText) + symMultiple)
            .attr("text-anchor", "start")
            .attr("font-size", "12px")
            .style("right", "5px")
            .attr("fill", themeText);
    });
});