// rates-config.js — National Baseline + State-Specific Payment Rate, Scenario Toggle & Guardrail Profiles
var FISCAL_YEAR_CONFIG = {
  adminPin: "2027",
  defaultState: "NATIONAL",
  fiscalYearLabel: "FY 2027",

  habitatSystems: {
    "ALL": { label: "All Active CPS (11)", codes: ["390", "420", "422", "643", "645", "646", "647", "649", "657", "658", "659"] },
    "PRAIRIE": { label: "🌾 Tallgrass Prairie & Pollinator", codes: ["420", "645", "647", "422", "649"] },
    "WETLAND": { label: "🦆 Wetland & Hydrology", codes: ["657", "658", "659", "646", "390"] },
    "RIPARIAN": { label: "🌳 Riparian, Forest & Edge", codes: ["390", "647", "422", "643", "645"] },
    "STRUCTURES": { label: "🦉 Wildlife Structures & Passage", codes: ["649", "643", "645"] }
  },

  nationalOverrides: {
    "420_1": { stateNote: "Guidance Note: Verify state payment schedule availability for seedlings/potted stock and planting equipment." },
    "420_3": { stateNote: "Guidance Note: Verify state payment schedule availability for herbaceous plugs and planting equipment." },
    "420_4": { stateNote: "Guidance Note: Check state payment schedule for maximum acreage caps on small-scale seeding and plugging." },
    "420_6": { stateNote: "Guidance Note: Check state payment schedule for maximum acreage caps per field on High Species Diversity plantings." },
    "420_7": { stateNote: "Guidance Note: Check state payment schedule for maximum acreage caps per field on Specialized Habitat plantings." },
    "420_9": { stateNote: "Guidance Note: Check state payment schedule for maximum acreage caps per field on High Species Diversity plantings." },
    "420_10": { stateNote: "Guidance Note: Check state payment schedule for maximum acreage caps per field on Specialized Habitat plantings." }
  },

  stateProfiles: {
    "NATIONAL": {
      label: "National Baseline (All Scenarios Open)",
      overrides: {}
    },
    "IA": {
      label: "Iowa (IA) — State-Calibrated",
      overrides: {
        "643_4": {
          techSpec: "Iowa Technical Guardrail: Apply only in seasonally dry ephemeral gullies or incised headcuts where low-tech rock structures (Zuni bowls, one-rock dams, rock rundowns) are installed in sequences of 3 to 5 structures."
        },
        "643_5": { enabled: false },
        "643_6": { enabled: false },
        "643_7": { enabled: false },
        "643_8": { enabled: false },
        "643_9": { enabled: false },
        "643_10": { enabled: false },
        "643_11": { enabled: false },
        "643_12": { enabled: false },
        "646_5": { enabled: false },
        "649_18": { enabled: false }
      }
    },
    "KS": {
      label: "Kansas (KS) — State-Calibrated",
      overrides: {
        "420_6": { stateNote: "Kansas Cost-List Rule: High Species Diversity plantings may only be used on a maximum of 5 acres per field." },
        "420_9": { stateNote: "Kansas Cost-List Rule: High Species Diversity plantings may only be used on a maximum of 5 acres per field." },
        "643_4": {
          techSpec: "Kansas Technical Guardrail: Appropriate in drier western/central regions in seasonally dry ephemeral gullies that flow only after rain; install Zuni bowls, one-rock dams, or rock rundowns in sequences of 3 to 5 structures."
        },
        "643_5": { enabled: false },
        "643_6": { enabled: false },
        "643_7": { enabled: false },
        "643_8": { enabled: false },
        "643_9": { enabled: false },
        "643_10": { enabled: false },
        "643_11": { enabled: false },
        "643_12": { enabled: false }
      }
    }
  }
};

var BASE_PRACTICES_CLONE = null;
var BASE_SCENARIOS_CLONE = null;

function applyStateProfile(stateCode) {
  if (typeof PRACTICES === "undefined" || typeof FISCAL_YEAR_CONFIG === "undefined") return;

  if (!BASE_PRACTICES_CLONE) {
    BASE_PRACTICES_CLONE = JSON.parse(JSON.stringify(PRACTICES));
  }
  if (!BASE_SCENARIOS_CLONE && typeof SCENARIOS !== "undefined") {
    BASE_SCENARIOS_CLONE = JSON.parse(JSON.stringify(SCENARIOS));
  }

  // Restore pristine baseline PRACTICES
  var freshPractices = JSON.parse(JSON.stringify(BASE_PRACTICES_CLONE));
  Object.keys(PRACTICES).forEach(function (k) { delete PRACTICES[k]; });
  Object.keys(freshPractices).forEach(function (k) { PRACTICES[k] = freshPractices[k]; });

  // Restore pristine baseline SCENARIOS
  if (typeof SCENARIOS !== "undefined" && BASE_SCENARIOS_CLONE) {
    var freshScenarios = JSON.parse(JSON.stringify(BASE_SCENARIOS_CLONE));
    SCENARIOS.length = 0;
    freshScenarios.forEach(function (item) { SCENARIOS.push(item); });
  }

  var profile = (FISCAL_YEAR_CONFIG.stateProfiles && FISCAL_YEAR_CONFIG.stateProfiles[stateCode])
    ? FISCAL_YEAR_CONFIG.stateProfiles[stateCode]
    : { overrides: {} };

  var mergedOverrides = {};
  var nat = FISCAL_YEAR_CONFIG.nationalOverrides || {};
  Object.keys(nat).forEach(function (id) {
    mergedOverrides[id] = Object.assign({}, nat[id]);
  });
  var st = profile.overrides || {};
  Object.keys(st).forEach(function (id) {
    mergedOverrides[id] = Object.assign({}, mergedOverrides[id] || {}, st[id]);
  });

  // Update SCENARIOS array
  if (typeof SCENARIOS !== "undefined") {
    for (var i = SCENARIOS.length - 1; i >= 0; i--) {
      var s = SCENARIOS[i];
      var patch = mergedOverrides[s.id];
      if (patch) {
        if (patch.enabled === false) {
          SCENARIOS.splice(i, 1);
          continue;
        }
        if (patch.rate) s.rate = patch.rate;
        if (patch.typicalTotal) s.typicalTotal = patch.typicalTotal;
        if (patch.capp) s.capp = patch.capp;
        if (patch.stateNote) s.stateNote = patch.stateNote;
        if (patch.techSpec) s.techSpec = patch.techSpec;
      }
    }
  }

  // Apply overrides & prune disabled branches in PRACTICES
  Object.values(PRACTICES).forEach(function (practice) {
    var disabledNodes = {};

    Object.keys(practice.nodes).forEach(function (nodeId) {
      var node = practice.nodes[nodeId];
      if (node.type === "result" && node.scenarioId && mergedOverrides[node.scenarioId]) {
        var patch = mergedOverrides[node.scenarioId];
        if (patch.enabled === false) {
          disabledNodes[nodeId] = true;
          return;
        }
        if (patch.stateNote) node.stateNote = patch.stateNote;
        if (patch.techSpec) node.techSpec = patch.techSpec;

        var matchedScenario = (typeof SCENARIOS !== "undefined")
          ? SCENARIOS.find(function (sc) { return sc.id === node.scenarioId; })
          : null;
        if (matchedScenario && (patch.rate || patch.typicalTotal)) {
          var unitShort = matchedScenario.unit.toLowerCase();
          var rateVal = patch.rate || matchedScenario.rate;
          var totVal = patch.typicalTotal || matchedScenario.typicalTotal;
          node.title = "Scenario " + matchedScenario.scenarioNum + " \u2014 " + matchedScenario.name +
            " (" + rateVal + "/" + unitShort +
            (totVal && totVal !== "N/A" ? " | Typ. " + matchedScenario.typicalSize + " = " + totVal : "") + ")";
        }
      }
    });

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
