var activeStateCode = localStorage.getItem("nrcs_selected_state") || "NATIONAL";

function initStateSelector() {
  var selectEl = document.getElementById("state-select");
  if (!selectEl || typeof FISCAL_YEAR_CONFIG === "undefined" || !FISCAL_YEAR_CONFIG.stateProfiles) return;

  var profiles = FISCAL_YEAR_CONFIG.stateProfiles;
  selectEl.innerHTML = "";
  Object.keys(profiles).forEach(function (code) {
    var opt = document.createElement("option");
    opt.value = code;
    opt.textContent = profiles[code].label;
    if (code === activeStateCode) opt.selected = true;
    selectEl.appendChild(opt);
  });

  changeStateProfile(activeStateCode);
}

function changeStateProfile(code) {
  activeStateCode = code;
  localStorage.setItem("nrcs_selected_state", code);
  if (typeof applyStateProfile === "function") {
    applyStateProfile(code);
  }
  var statusEl = document.getElementById("state-profile-status");
  if (statusEl && FISCAL_YEAR_CONFIG.stateProfiles[code]) {
    statusEl.textContent = FISCAL_YEAR_CONFIG.stateProfiles[code].label;
  }
  if (currentPracticeCode) {
    startPractice(currentPracticeCode);
  } else {
    renderPracticeCards();
  }
}
// app.js — National/State Profile Selector, Single-Row Habitat Filter, Admin Panel & Flowchart Controller
var currentPracticeCode = null;
var currentNodeId = null;
var stepHistory = [];
var activeHabitatFilter = "ALL";
var activeStateCode = localStorage.getItem("nrcs_selected_state") || "NATIONAL";

document.addEventListener("DOMContentLoaded", function () {
  if (typeof PRACTICES === "undefined") {
    var selector = document.getElementById("practice-selector");
    if (selector) {
      selector.innerHTML = '<div class="node-stop"><strong>Data Error:</strong> Flowchart data failed to load. Check Console (F12).</div>';
    }
    return;
  }
  initStateSelector();
  renderHabitatFilterBar();
  renderPracticeCards();
});

function initStateSelector() {
  var fySub = document.getElementById("header-fy-subtitle");
  if (fySub && typeof FISCAL_YEAR_CONFIG !== "undefined" && FISCAL_YEAR_CONFIG.fiscalYearLabel) {
    fySub.textContent = FISCAL_YEAR_CONFIG.fiscalYearLabel;
  }

  var selectEl = document.getElementById("state-select");
  if (!selectEl || typeof FISCAL_YEAR_CONFIG === "undefined" || !FISCAL_YEAR_CONFIG.stateProfiles) return;

  var profiles = FISCAL_YEAR_CONFIG.stateProfiles;
  selectEl.innerHTML = "";
  Object.keys(profiles).forEach(function (code) {
    var opt = document.createElement("option");
    opt.value = code;
    opt.textContent = profiles[code].label;
    if (code === activeStateCode) opt.selected = true;
    selectEl.appendChild(opt);
  });

  changeStateProfile(activeStateCode, true);
}

function changeStateProfile(code, skipRender) {
  activeStateCode = code;
  localStorage.setItem("nrcs_selected_state", code);
  if (typeof applyStateProfile === "function") {
    applyStateProfile(code);
  }
  var statusEl = document.getElementById("state-profile-status");
  if (statusEl && FISCAL_YEAR_CONFIG.stateProfiles[code]) {
    statusEl.textContent = FISCAL_YEAR_CONFIG.stateProfiles[code].label;
  }
  if (!skipRender) {
    if (currentPracticeCode) {
      startPractice(currentPracticeCode);
    } else {
      renderPracticeCards();
    }
  }
}

function setHabitatFilter(key) {
  activeHabitatFilter = key;
  renderHabitatFilterBar();
  renderPracticeCards();
}

function renderHabitatFilterBar() {
  var bar = document.getElementById("habitat-filter-bar");
  if (!bar || typeof FISCAL_YEAR_CONFIG === "undefined" || !FISCAL_YEAR_CONFIG.habitatSystems) return;

  bar.innerHTML = "";
  var systems = FISCAL_YEAR_CONFIG.habitatSystems;

  Object.keys(systems).forEach(function (key) {
    var isActive = activeHabitatFilter === key;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = systems[key].label;
    btn.style.cssText = isActive
      ? "width:100%; padding:8px 8px; border-radius:8px; border:2px solid #14532d; background:#14532d; color:#ffffff; font-size:0.78rem; font-weight:700; cursor:pointer; text-align:center;"
      : "width:100%; padding:8px 8px; border-radius:8px; border:1px solid #9ca3af; background:#ffffff; color:#1f2937; font-size:0.78rem; font-weight:600; cursor:pointer; text-align:center;";
    btn.onclick = function () {
      setHabitatFilter(key);
    };
    bar.appendChild(btn);
  });
}

function renderPracticeCards() {
  var container = document.getElementById("practice-selector");
  container.innerHTML = "";

  var allowedCodes = null;
  if (typeof FISCAL_YEAR_CONFIG !== "undefined" && FISCAL_YEAR_CONFIG.habitatSystems && FISCAL_YEAR_CONFIG.habitatSystems[activeHabitatFilter]) {
    allowedCodes = FISCAL_YEAR_CONFIG.habitatSystems[activeHabitatFilter].codes;
  }

  Object.values(PRACTICES).forEach(function (practice) {
    if (allowedCodes && allowedCodes.indexOf(practice.code) === -1) return;

    var card = document.createElement("div");
    card.className = "practice-card";
    card.onclick = function () { startPractice(practice.code); };
    card.innerHTML =
      '<span class="practice-code">CPS ' + practice.code + '</span>' +
      '<h3>' + practice.name + '</h3>' +
      '<p>' + practice.category + '</p>';
    container.appendChild(card);
  });
}

function startPractice(code) {
  currentPracticeCode = code;
  var practice = PRACTICES[code];
  stepHistory = [];
  currentNodeId = practice.startNode;

  var filterBar = document.getElementById("habitat-filter-bar");
  if (filterBar) filterBar.classList.add("hidden");

  document.getElementById("practice-selector").classList.add("hidden");
  document.getElementById("flow-container").classList.remove("hidden");

  document.getElementById("flow-practice-banner").innerHTML =
    '<h2>CPS ' + practice.code + ' &mdash; ' + practice.name + '</h2>' +
    '<div class="meta"><strong>Source:</strong> ' + practice.source + '</div>' +
    '<div class="meta"><strong>Priority Resource Concerns:</strong> ' + practice.rcSummary + '</div>';

  renderCurrentNode();
}

function resetFlow() {
  currentPracticeCode = null;
  currentNodeId = null;
  stepHistory = [];
  document.getElementById("flow-container").classList.add("hidden");
  var filterBar = document.getElementById("habitat-filter-bar");
  if (filterBar) filterBar.classList.remove("hidden");
  document.getElementById("practice-selector").classList.remove("hidden");
}

function restartCurrentPractice() {
  if (currentPracticeCode) {
    startPractice(currentPracticeCode);
  }
}

function undoStep() {
  if (stepHistory.length === 0) return;
  var prev = stepHistory.pop();
  currentNodeId = prev.nodeId;
  renderCurrentNode();
}

function selectOption(optionLabel, nextNodeId) {
  var practice = PRACTICES[currentPracticeCode];
  var node = practice.nodes[currentNodeId];
  stepHistory.push({
    nodeId: currentNodeId,
    questionTitle: node.title,
    chosenLabel: optionLabel
  });
  currentNodeId = nextNodeId;
  renderCurrentNode();
}

function updateSupportingChecklist() {
  var practice = PRACTICES[currentPracticeCode];
  if (!practice || !practice.supportingPractices) return;

  document.querySelectorAll(".rc-support-checkbox").forEach(function (cb) {
    if (cb.parentElement) {
      cb.parentElement.classList.toggle("is-checked", cb.checked);
    }
  });

  var checkboxes = document.querySelectorAll(".rc-support-checkbox:checked");
  var outputEl = document.getElementById("selected-supporting-output");
  if (!outputEl) return;

  if (checkboxes.length === 0) {
    outputEl.innerHTML = '<em style="color:#4b5563;">No secondary resource concerns selected. Primary practice alone is sufficient.</em>';
    return;
  }

  var companionHtml = "";
  var alternativeHtml = "";

  Array.from(checkboxes).forEach(function (cb) {
    var groupKey = cb.value;
    var codes = practice.supportingPractices[groupKey] || [];
    var isAlternative = groupKey.toLowerCase().indexOf("alternative") !== -1;

    if (isAlternative) {
      alternativeHtml +=
        '<div class="node-card node-stop" style="margin-top:10px; padding:12px;">' +
          '<span class="badge-red-hexagon">&#128721; STOP &mdash; USE PREFERABLE ALTERNATIVE CPS</span>' +
          '<div style="font-weight:700; margin-bottom:4px;">' + groupKey + '</div>' +
          '<p style="font-size:0.86rem; margin-bottom:6px;">' +
            'Do <strong>not</strong> stack these practices with CPS ' + practice.code + ' on the same footprint. Replace CPS ' + practice.code + ' with the applicable primary practice below:' +
          '</p>' +
          '<div class="action-box" style="font-size:0.86rem;">' +
            'Preferable Alternative CPS Codes: ' + codes.join(", ") +
          '</div>' +
        '</div>';
    } else {
      companionHtml +=
        '<div style="margin-top:8px; padding:10px; background:#ecfdf5; border-left:5px solid #15803d; border-radius:6px;">' +
          '<div style="font-weight:700; color:#14532d; margin-bottom:2px;">&#9989; Companion Supporting Practices &mdash; ' + groupKey + ':</div>' +
          '<div style="font-size:0.86rem; color:#1f2937;">Add to plan alongside CPS ' + practice.code + ': <strong>' + codes.join(", ") + '</strong></div>' +
        '</div>';
    }
  });

  if (alternativeHtml && companionHtml) {
    companionHtml =
      '<div style="margin-top:12px; padding:8px 10px; background:#fef3c7; border-left:4px solid #d97706; border-radius:4px; font-size:0.84rem; color:#92400e;">' +
        '<strong>Note:</strong> Resolve the alternative practice selection above first before adding CPS ' + practice.code + ' companion practices.' +
      '</div>' +
      companionHtml;
  }

  outputEl.innerHTML = alternativeHtml + companionHtml;
}

function copyPlanSummary() {
  var practice = PRACTICES[currentPracticeCode];
  var node = practice.nodes[currentNodeId];
  var lines = [];

  lines.push("NRCS CONSERVATION PLAN SUMMARY (" + (typeof FISCAL_YEAR_CONFIG !== "undefined" ? FISCAL_YEAR_CONFIG.fiscalYearLabel : "FY27") + ")");
  lines.push("Practice: CPS " + practice.code + " - " + practice.name);
  lines.push("Source: " + practice.source);
  lines.push("");

  if (stepHistory.length > 0) {
    lines.push("Decision Path:");
    stepHistory.forEach(function (h, i) {
      lines.push("  " + (i + 1) + ". " + h.questionTitle + " -> " + h.chosenLabel);
    });
    lines.push("");
  }

  if (node.type === "stop") {
    lines.push("OUTCOME: STOP / ALTERNATE CPS - " + node.title);
    lines.push("Reason: " + node.text);
    lines.push("Recommended Action: " + node.action);
  } else {
    lines.push("SELECTED SCENARIO: " + node.title);
    lines.push("Criteria: " + node.criteria);
    if (node.techSpec) lines.push(node.techSpec);
    if (node.stateNote) lines.push(node.stateNote);

    var checkboxes = document.querySelectorAll(".rc-support-checkbox:checked");
    if (checkboxes.length > 0 && practice.supportingPractices) {
      lines.push("");
      lines.push("Secondary Resource Concerns & Supporting Practices:");
      Array.from(checkboxes).forEach(function (cb) {
        var groupKey = cb.value;
        var codes = practice.supportingPractices[groupKey] || [];
        var prefix = groupKey.toLowerCase().indexOf("alternative") !== -1 ? "[ALTERNATIVE CPS - DO NOT STACK] " : "[COMPANION CPS] ";
        lines.push("  - " + prefix + groupKey + ": " + codes.join(", "));
      });
    }

    if (node.om) {
      lines.push("");
      lines.push("Operation & Maintenance (O&M): " + node.om);
    }
  }

  var textOutput = lines.join("\n");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textOutput).then(function () {
      var btn = document.getElementById("copy-summary-btn");
      if (btn) {
        btn.innerHTML = "&#9989; Copied to Clipboard!";
        setTimeout(function () { btn.innerHTML = "&#128203; Copy Plan Summary"; }, 2500);
      }
    });
  } else {
    prompt("Copy your conservation plan summary below (Ctrl+C):", textOutput);
  }
}
function renderCurrentNode() {
  var practice = PRACTICES[currentPracticeCode];
  var node = practice.nodes[currentNodeId];

  document.getElementById("btn-undo").disabled = stepHistory.length === 0;

  var historyEl = document.getElementById("flow-history");
  historyEl.innerHTML = stepHistory
    .map(function (h, i) {
      return '<div class="history-item"><strong>Step ' + (i + 1) + ':</strong> ' + h.questionTitle + ' &rarr; <em>' + h.chosenLabel + '</em></div>';
    })
    .join("");

  var qEl = document.getElementById("current-question");

  var actionButtonsHtml =
    '<div class="no-print-actions" style="display:flex; flex-wrap:wrap; gap:10px; margin-top:14px;">' +
      '<button class="print-btn" type="button" onclick="window.print()" style="margin-top:0; padding:10px 18px; background-color:#14532d; color:#ffffff; border:none; border-radius:6px; font-size:0.95rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">&#128424; Print Plan Summary</button>' +
      '<button id="copy-summary-btn" class="print-btn" type="button" onclick="copyPlanSummary()" style="margin-top:0; padding:10px 18px; background-color:#1e3a8a; color:#ffffff; border:none; border-radius:6px; font-size:0.95rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">&#128203; Copy Plan Summary</button>' +
    '</div>';

  if (node.type === "gate") {
    qEl.innerHTML =
      '<div class="node-card node-gate">' +
        '<span class="badge-black-diamond">&#9670; PRE-CONDITION GATE</span>' +
        '<h3 style="display:block; font-size:1.08rem; font-weight:700; color:#111827; margin:8px 0 6px 0;">' + node.title + '</h3>' +
        '<p>' + node.text + '</p>' +
        '<div id="node-options-container" class="option-list"></div>' +
      '</div>';

    var gateContainer = document.getElementById("node-options-container");
    node.options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.textContent = opt.label;
      btn.onclick = function () { selectOption(opt.label, opt.next); };
      gateContainer.appendChild(btn);
    });
  } else if (node.type === "stop") {
    qEl.innerHTML =
      '<div class="node-card node-stop">' +
        '<span class="badge-red-hexagon">&#128721; STOP / ALTERNATE CPS</span>' +
        '<h3 style="display:block; font-size:1.08rem; font-weight:700; color:#111827; margin:8px 0 6px 0;">' + node.title + '</h3>' +
        '<p>' + node.text + '</p>' +
        '<div class="action-box">Recommended Action: ' + node.action + '</div>' +
        actionButtonsHtml +
      '</div>';
  } else if (node.type === "question") {
    qEl.innerHTML =
      '<div class="node-card node-question">' +
        '<span class="badge-yellow-diamond">&#128160; DECISION / CAPP CRITERIA</span>' +
        '<h3 style="display:block; font-size:1.08rem; font-weight:700; color:#111827; margin:8px 0 6px 0;">' + node.title + '</h3>' +
        '<p>' + node.text + '</p>' +
        '<div id="node-options-container" class="option-list"></div>' +
      '</div>';

    var qContainer = document.getElementById("node-options-container");
    node.options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.textContent = opt.label;
      btn.onclick = function () { selectOption(opt.label, opt.next); };
      qContainer.appendChild(btn);
    });
  } else if (node.type === "result") {
    var supportingHtml = "";
    if (practice.supportingPractices) {
      supportingHtml =
        '<div class="supporting-box" style="border: 2px solid #0284c7; background: #f0f9ff; margin-top:12px;">' +
          '<div id="supporting-checklist-controls">' +
            '<h4 style="color:#0369a1; margin-bottom:6px;">&#128309; Secondary Resource Concerns &amp; Supporting Practices (Check all that apply)</h4>' +
            '<p style="font-size:0.82rem; color:#334155; margin-bottom:8px;">Select any secondary site issues that CPS ' + practice.code + ' alone cannot resolve:</p>' +
            '<div id="supporting-checkbox-list"></div>' +
          '</div>' +
          '<div id="selected-supporting-output" style="margin-top:8px; font-size:0.86rem;">' +
            '<em style="color:#4b5563;">No secondary resource concerns selected. Primary practice alone is sufficient.</em>' +
          '</div>' +
        '</div>';
    }

    var techSpecHtml = node.techSpec
      ? '<div style="margin-top:10px; padding:10px 12px; background:#f3e8ff; border-left:4px solid #7e22ce; border-radius:4px; font-size:0.88rem; color:#581c87;"><strong>&#128208; ' + node.techSpec + '</strong></div>'
      : '';

    var stateNoteHtml = node.stateNote
      ? '<div style="margin-top:10px; padding:10px 12px; background:#fefce8; border-left:4px solid #ca8a04; border-radius:4px; font-size:0.88rem; color:#854d0e;"><strong>&#128204; ' + node.stateNote + '</strong></div>'
      : '';

    var omHtml = node.om
      ? '<div class="om-box" style="margin-top:14px;"><strong>Operation &amp; Maintenance (O&amp;M):</strong> ' + node.om + '</div>'
      : '';

    qEl.innerHTML =
      '<div class="node-card node-result">' +
        '<span class="badge-green-result">&#9989; RECOMMENDED PAYMENT SCENARIO</span>' +
        '<h3 style="display:block; font-size:1.08rem; font-weight:700; color:#111827; margin:8px 0 6px 0;">' + node.title + '</h3>' +
        '<p><strong>Criteria:</strong> ' + node.criteria + '</p>' +
        techSpecHtml +
        stateNoteHtml +
        supportingHtml +
        omHtml +
        actionButtonsHtml +
      '</div>';

    if (practice.supportingPractices) {
      var cbList = document.getElementById("supporting-checkbox-list");
      Object.keys(practice.supportingPractices).forEach(function (groupName) {
        var lbl = document.createElement("label");
        lbl.style.cssText = "display:flex; align-items:flex-start; gap:8px; margin-bottom:6px; cursor:pointer; font-weight:500;";
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.className = "rc-support-checkbox";
        cb.value = groupName;
        cb.style.cssText = "margin-top:4px; transform:scale(1.15);";
        cb.onchange = updateSupportingChecklist;
        var span = document.createElement("span");
        span.innerHTML = "Secondary <strong>" + groupName + "</strong> concerns on site?";
        lbl.appendChild(cb);
        lbl.appendChild(span);
        cbList.appendChild(lbl);
      });
    }
  }
}
// ==========================================
// PIN-PROTECTED ADMINISTRATOR PANEL LOGIC
// ==========================================
function openAdminModal() {
  var modal = document.getElementById("admin-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  document.getElementById("admin-pin-input").value = "";
  document.getElementById("admin-pin-error").textContent = "";
}

function closeAdminModal() {
  var modal = document.getElementById("admin-modal");
  if (modal) modal.classList.add("hidden");
}

function verifyAdminPin() {
  var entered = document.getElementById("admin-pin-input").value.trim();
  var expected = (typeof FISCAL_YEAR_CONFIG !== "undefined" && FISCAL_YEAR_CONFIG.adminPin) ? FISCAL_YEAR_CONFIG.adminPin : "2027";
  if (entered !== expected) {
    document.getElementById("admin-pin-error").textContent = "Incorrect PIN. Please try again.";
    return;
  }
  document.getElementById("admin-pin-gate").classList.add("hidden");
  document.getElementById("admin-controls").classList.remove("hidden");
  populateAdminDropdowns();
}

function populateAdminDropdowns() {
  document.getElementById("admin-fy-input").value = FISCAL_YEAR_CONFIG.fiscalYearLabel || "FY 2027";

  var stSelect = document.getElementById("admin-state-select");
  stSelect.innerHTML = "";
  Object.keys(FISCAL_YEAR_CONFIG.stateProfiles).forEach(function (code) {
    var opt = document.createElement("option");
    opt.value = code;
    opt.textContent = FISCAL_YEAR_CONFIG.stateProfiles[code].label;
    if (code === activeStateCode) opt.selected = true;
    stSelect.appendChild(opt);
  });

  var scSelect = document.getElementById("admin-scenario-select");
  scSelect.innerHTML = "";
  var sourceList = BASE_SCENARIOS_CLONE || SCENARIOS || [];
  sourceList.forEach(function (sc) {
    var opt = document.createElement("option");
    opt.value = sc.id;
    opt.textContent = "CPS " + sc.code + " | Scen " + sc.scenarioNum + " - " + sc.name;
    scSelect.appendChild(opt);
  });

  loadAdminScenarioFields();
}

function loadAdminScenarioFields() {
  var stateCode = document.getElementById("admin-state-select").value;
  var scenId = document.getElementById("admin-scenario-select").value;
  var sourceList = BASE_SCENARIOS_CLONE || SCENARIOS || [];
  var baseScen = sourceList.find(function (s) { return s.id === scenId; }) || {};

  var profile = FISCAL_YEAR_CONFIG.stateProfiles[stateCode] || { overrides: {} };
  var patch = (profile.overrides && profile.overrides[scenId]) || {};
  var natPatch = (FISCAL_YEAR_CONFIG.nationalOverrides && FISCAL_YEAR_CONFIG.nationalOverrides[scenId]) || {};

  document.getElementById("admin-scen-enabled").checked = (patch.enabled !== false);
  document.getElementById("admin-scen-rate").value = patch.rate || baseScen.rate || "";
  document.getElementById("admin-scen-total").value = patch.typicalTotal || baseScen.typicalTotal || "";
  document.getElementById("admin-scen-capp").value = patch.capp || baseScen.capp || "";
  document.getElementById("admin-scen-techspec").value = patch.techSpec || natPatch.techSpec || "";
  document.getElementById("admin-scen-statenote").value = patch.stateNote || natPatch.stateNote || "";
  document.getElementById("admin-save-status").textContent = "";
}

function applyAdminChangeInBrowser() {
  var newFy = document.getElementById("admin-fy-input").value.trim();
  if (newFy) {
    FISCAL_YEAR_CONFIG.fiscalYearLabel = newFy;
    var fySub = document.getElementById("header-fy-subtitle");
    if (fySub) fySub.textContent = newFy;
  }

  var stateCode = document.getElementById("admin-state-select").value;
  var scenId = document.getElementById("admin-scenario-select").value;
  if (!FISCAL_YEAR_CONFIG.stateProfiles[stateCode].overrides) {
    FISCAL_YEAR_CONFIG.stateProfiles[stateCode].overrides = {};
  }

  var entry = {};
  if (!document.getElementById("admin-scen-enabled").checked) {
    entry.enabled = false;
  }
  var r = document.getElementById("admin-scen-rate").value.trim();
  var t = document.getElementById("admin-scen-total").value.trim();
  var c = document.getElementById("admin-scen-capp").value.trim();
  var ts = document.getElementById("admin-scen-techspec").value.trim();
  var sn = document.getElementById("admin-scen-statenote").value.trim();

  if (r) entry.rate = r;
  if (t) entry.typicalTotal = t;
  if (c) entry.capp = c;
  if (ts) entry.techSpec = ts;
  if (sn) entry.stateNote = sn;

  FISCAL_YEAR_CONFIG.stateProfiles[stateCode].overrides[scenId] = entry;
  changeStateProfile(stateCode, false);
  document.getElementById("admin-save-status").textContent = "Applied to live preview! Click 'Export rates-config.js' to download the updated file for GitHub.";
}

function downloadUpdatedRatesConfig() {
  applyAdminChangeInBrowser();
  var fileContent =
    "// rates-config.js — Exported from NRCS Biology Practice TA-FA Flowchart Maker Admin Panel\n" +
    "var FISCAL_YEAR_CONFIG = " + JSON.stringify(FISCAL_YEAR_CONFIG, null, 2) + ";\n\n" +
    "var BASE_PRACTICES_CLONE = null;\n" +
    "var BASE_SCENARIOS_CLONE = null;\n\n" +
    applyStateProfile.toString() + "\n";

  var blob = new Blob([fileContent], { type: "application/javascript" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "rates-config.js";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

