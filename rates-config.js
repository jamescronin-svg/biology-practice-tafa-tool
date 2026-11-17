// rates-config.js — Annual Fiscal Year Payment Rate & CAPP Narrative Override Table
// Edit ONLY this file each fiscal year to update rates, typical totals, or CAPP codes across the entire app!

var FISCAL_YEAR_CONFIG = {
  fiscalYearLabel: "FY 2027",
  // Map any scenarioId (from data-scenarios.js) to updated rate, typicalTotal, or capp code:
  overrides: {
    // Example format (uncomment or edit any scenarioId below when new annual schedules publish):
    // "390_1": { rate: "$1,050.00", typicalTotal: "$525.00", capp: "00N / 01N / 02N / 03N" },
    // "420_5": { rate: "$1,040.00", typicalTotal: "$5,200.00", capp: "00N / 01N" },
    // "649_8": { rate: "$47.50", typicalTotal: "$47.50", capp: "00N" }
  }
};

// Automatically applies overrides to SCENARIOS and PRACTICES on page load
function applyAnnualOverrides() {
  if (typeof FISCAL_YEAR_CONFIG === "undefined" || !FISCAL_YEAR_CONFIG.overrides) return;
  var overrides = FISCAL_YEAR_CONFIG.overrides;

  // 1. Update SCENARIOS array
  if (typeof SCENARIOS !== "undefined") {
    SCENARIOS.forEach(function (s) {
      var patch = overrides[s.id];
      if (patch) {
        if (patch.rate) s.rate = patch.rate;
        if (patch.typicalTotal) s.typicalTotal = patch.typicalTotal;
        if (patch.capp) s.capp = patch.capp;
        if (patch.source) s.source = patch.source;
      }
    });
  }

  // 2. Update matching flowchart result titles in PRACTICES
  if (typeof PRACTICES !== "undefined") {
    Object.values(PRACTICES).forEach(function (practice) {
      Object.values(practice.nodes).forEach(function (node) {
        if (node.type === "result" && node.scenarioId && overrides[node.scenarioId]) {
          var patch = overrides[node.scenarioId];
          var matchedScenario = (typeof SCENARIOS !== "undefined")
            ? SCENARIOS.find(function (sc) { return sc.id === node.scenarioId; })
            : null;
          if (matchedScenario && patch.rate) {
            var unitShort = matchedScenario.unit.toLowerCase();
            node.title = "Scenario " + matchedScenario.scenarioNum + " \u2014 " + matchedScenario.name +
              " (" + patch.rate + "/" + unitShort +
              (patch.typicalTotal && patch.typicalTotal !== "N/A" ? " | Typ. " + matchedScenario.typicalSize + " = " + patch.typicalTotal : "") + ")";
          }
        }
      });
    });
  }
}
