// rates-config.js — Annual Fiscal Year Payment Rate, CAPP Narrative & State Cost-List Note Override Table
// Edit ONLY this file each fiscal year (or per state) to update rates, CAPP codes, or state cost-list notes!

var FISCAL_YEAR_CONFIG = {
  fiscalYearLabel: "FY 2027",
  // Map any scenarioId to updated rate, typicalTotal, capp code, or stateNote:
  overrides: {
    // CPS 420 State Cost-List & Vendor Availability Notes (Comments 2 & 3)
    "420_1": {
      stateNote: "State Cost-List Note: Verify local availability of seedlings/potted stock and planting equipment before contracting."
    },
    "420_3": {
      stateNote: "State Cost-List Note: Verify local availability of herbaceous plugs and specialized planting equipment before contracting."
    },
    "420_4": {
      stateNote: "State Cost-List Note: Check your State Payment Schedule for maximum acreage caps on small-scale specialized seeding and plugging."
    },
    "420_6": {
      stateNote: "State Cost-List Note: Check your State Payment Schedule for maximum acreage caps per field on High Species Diversity plantings."
    },
    "420_7": {
      stateNote: "State Cost-List Note: Check your State Payment Schedule for maximum acreage caps per field on Specialized Habitat plantings."
    },
    "420_9": {
      stateNote: "State Cost-List Note: Check your State Payment Schedule for maximum acreage caps per field on High Species Diversity plantings."
    },
    "420_10": {
      stateNote: "State Cost-List Note: Check your State Payment Schedule for maximum acreage caps per field on Specialized Habitat plantings."
    },

    // CPS 643 Coastal-Only Scenario Notes (Comment 2)
    "643_5": { stateNote: "State Cost-List Note: Subtidal oyster reef scenarios apply to coastal/estuarine states only and are not offered in inland states." },
    "643_6": { stateNote: "State Cost-List Note: Subtidal oyster reef scenarios apply to coastal/estuarine states only and are not offered in inland states." },
    "643_7": { stateNote: "State Cost-List Note: Subtidal oyster reef scenarios apply to coastal/estuarine states only and are not offered in inland states." },
    "643_8": { stateNote: "State Cost-List Note: Subtidal oyster reef scenarios apply to coastal/estuarine states only and are not offered in inland states." },
    "643_9": { stateNote: "State Cost-List Note: Subtidal oyster reef scenarios apply to coastal/estuarine states only and are not offered in inland states." },
    "643_10": { stateNote: "State Cost-List Note: Subtidal oyster reef scenarios apply to coastal/estuarine states only and are not offered in inland states." },
    "643_11": { stateNote: "State Cost-List Note: Subtidal oyster reef scenarios apply to coastal/estuarine states only and are not offered in inland states." },
    "643_12": { stateNote: "State Cost-List Note: Oyster reef monitoring scenarios apply to coastal/estuarine states only and are not offered in inland states." }
  }
};

// Automatically applies overrides and stateNotes to SCENARIOS and PRACTICES on page load
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
        if (patch.stateNote) s.stateNote = patch.stateNote;
      }
    });
  }

  // 2. Update matching flowchart result nodes in PRACTICES
  if (typeof PRACTICES !== "undefined") {
    Object.values(PRACTICES).forEach(function (practice) {
      Object.values(practice.nodes).forEach(function (node) {
        if (node.type === "result" && node.scenarioId && overrides[node.scenarioId]) {
          var patch = overrides[node.scenarioId];
          if (patch.stateNote) {
            node.stateNote = patch.stateNote;
          }
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
