// rates-config.js — Annual Payment Rate, State Scenario Toggle & Technical Guardrails Config
// Edit ONLY this file each fiscal year (or per state) to toggle scenarios on/off, update rates, or publish technical guardrails!

var FISCAL_YEAR_CONFIG = {
  stateCode: "IA",
  fiscalYearLabel: "FY 2027",

  // Habitat System Quick-Filter Suites (Start from Ecological Goal without extra clicks)
  habitatSystems: {
    "ALL": { label: "All Active CPS (11)", codes: ["390", "420", "422", "643", "645", "646", "647", "649", "657", "658", "659"] },
    "PRAIRIE": { label: "🌾 Tallgrass Prairie & Pollinator", codes: ["420", "645", "647", "422", "649"] },
    "WETLAND": { label: "🦆 Wetland & Hydrology", codes: ["657", "658", "659", "646", "390"] },
    "RIPARIAN": { label: "🌳 Riparian, Forest & Edge", codes: ["390", "647", "422", "643", "645"] },
    "STRUCTURES": { label: "🦉 Wildlife Structures & Passage", codes: ["649", "643", "645"] }
  },

  // Map any scenarioId to:
  // - enabled: false (completely hides scenario & prunes dead-end branches from flowcharts)
  // - rate / typicalTotal / capp: annual schedule updates
  // - techSpec: state biologist technical guardrails (where, when & how to apply)
  // - stateNote: cost-list / program guidance notes
  overrides: {
    // CPS 420 — State Cost-List Caps & Vendor Availability
    "420_1": {
      stateNote: "State Cost-List Note: Verify local availability of seedlings/potted stock and planting equipment before contracting."
    },
    "420_3": {
      stateNote: "State Cost-List Note: Verify local availability of herbaceous plugs and specialized planting equipment before contracting."
    },
    "420_4": {
      stateNote: "State Cost-List Note: Check State Payment Schedule for maximum acreage caps on small-scale specialized seeding and plugging."
    },
    "420_6": {
      stateNote: "State Cost-List Note: Check State Payment Schedule for maximum acreage caps per field on High Species Diversity plantings."
    },
    "420_7": {
      stateNote: "State Cost-List Note: Check State Payment Schedule for maximum acreage caps per field on Specialized Habitat plantings."
    },
    "420_9": {
      stateNote: "State Cost-List Note: Check State Payment Schedule for maximum acreage caps per field on High Species Diversity plantings."
    },
    "420_10": {
      stateNote: "State Cost-List Note: Check State Payment Schedule for maximum acreage caps per field on Specialized Habitat plantings."
    },

    // CPS 643 — Rock Structure Technical Guardrails (Comment 2 Remedy)
    "643_4": {
      techSpec: "State Technical Guardrail: Apply only in seasonally dry ephemeral gullies or incised headcuts where low-tech rock structures (Zuni bowls, one-rock dams, rock rundowns) are installed in a sequence of 3 to 5 structures to arrest headcutting and reconnect floodplain hydrology."
    },

    // CPS 643 — Coastal Oyster Reef Scenarios Disabled for Inland States (Comment 1 Remedy)
    "643_5": { enabled: false },
    "643_6": { enabled: false },
    "643_7": { enabled: false },
    "643_8": { enabled: false },
    "643_9": { enabled: false },
    "643_10": { enabled: false },
    "643_11": { enabled: false },
    "643_12": { enabled: false },

    // CPS 646 — Rice-Field Fish Flow Flagged for State Applicability
    "646_5": {
      stateNote: "State Cost-List Note: Designed primarily for continuous-flow rice/cropland fish habitat; verify state payment schedule applicability before planning."
    },

    // CPS 649 — Western Large-Carnivore Electric Mat Flagged
    "649_18": {
      stateNote: "State Cost-List Note: Designed primarily for large carnivore (grizzly/wolf) deterrence; verify state eligibility before planning."
    }
  }
};

// Automatically applies overrides, techSpecs, and enabled:false branch pruning on page load
function applyAnnualOverrides() {
  if (typeof FISCAL_YEAR_CONFIG === "undefined" || !FISCAL_YEAR_CONFIG.overrides) return;
  var overrides = FISCAL_YEAR_CONFIG.overrides;

  // 1. Patch SCENARIOS array
  if (typeof SCENARIOS !== "undefined") {
    for (var i = SCENARIOS.length - 1; i >= 0; i--) {
      var s = SCENARIOS[i];
      var patch = overrides[s.id];
      if (patch) {
        if (patch.enabled === false) {
          SCENARIOS.splice(i, 1);
          continue;
        }
        if (patch.rate) s.rate = patch.rate;
        if (patch.typicalTotal) s.typicalTotal = patch.typicalTotal;
        if (patch.capp) s.capp = patch.capp;
        if (patch.source) s.source = patch.source;
        if (patch.stateNote) s.stateNote = patch.stateNote;
        if (patch.techSpec) s.techSpec = patch.techSpec;
      }
    }
  }

  // 2. Patch PRACTICES nodes and prune any branch whose scenarios are all disabled
  if (typeof PRACTICES !== "undefined") {
    Object.values(PRACTICES).forEach(function (practice) {
      var disabledNodes = {};

      // Mark result nodes with enabled: false
      Object.keys(practice.nodes).forEach(function (nodeId) {
        var node = practice.nodes[nodeId];
        if (node.type === "result" && node.scenarioId && overrides[node.scenarioId]) {
          var patch = overrides[node.scenarioId];
          if (patch.enabled === false) {
            disabledNodes[nodeId] = true;
            return;
          }
          if (patch.stateNote) node.stateNote = patch.stateNote;
          if (patch.techSpec) node.techSpec = patch.techSpec;

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

      // Iteratively prune options pointing to disabled nodes, and mark empty question nodes disabled
      var changed = true;
      while (changed) {
        changed = false;
        Object.keys(practice.nodes).forEach(function (nodeId) {
          if (disabledNodes[nodeId]) return;
          var node = practice.nodes[nodeId];
          if (node.options && Array.isArray(node.options)) {
            var beforeLen = node.options.length;
            node.options = node.options.filter(function (opt) { return !disabledNodes[opt.next]; });
            if (node.options.length !== beforeLen) changed = true;
            if (node.options.length === 0) {
              disabledNodes[nodeId] = true;
              changed = true;
            }
          }
        });
      }
    });
  }
}
