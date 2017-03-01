//Pass-word protected entry into Workshop
var basicAuth = new HttpBasicAuth("workshop", "colorado");
basicAuth.protect();