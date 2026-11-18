// app.js — Complete Interactive Flowchart, Habitat System Filter, State Guardrails & Copy/Print Controller
var currentPracticeCode = null;
var currentNodeId = null;
var stepHistory = [];
var activeHabitatFilter = "ALL";

document.addEventListener("DOMContentLoaded", function () {
  if (typeof PRACTICES === "undefined") {
    var selector = document.getElementById("practice-selector");
    if (selector) {
      selector.innerHTML = '<div class="node-stop"><strong>Data Error:</strong> Flowchart data failed to load. Check Console (F12).</div>';
    }
    return;
  }
  if (typeof applyAnnualOverrides === "function") {
    applyAnnualOverrides();
  }
  renderHabitatFilterBar();
  renderPracticeCards();
});

function renderHabitatFilterBar() {
  var bar = document.getElementById("habitat-filter-bar");
  if (!bar || typeof FISCAL_YEAR_CONFIG === "undefined" || !FISCAL_YEAR_CONFIG.habitatSystems) return;

  var systems = FISCAL_YEAR_CONFIG.habitatSystems;
  bar.innerHTML = Object.keys(systems).map(function (key) {
    var isActive = activeHabitatFilter === key;
    var btnStyle = isActive
      ? "padding:7px 12px; border-radius:20px; border:2px solid #14532d; background:#14532d; color:#ffffff; font-size:0.82rem; font-weight:700; cursor:pointer;"
      : "padding:7px 12px; border-radius:20px; border:1px solid #9ca3af; background:#ffffff; color:#1f2937; font-size:0.82rem; font-weight:600; cursor:pointer;";
    return '<button type="button" style="' + btnStyle + '" onclick="setHabitatFilter(\'' + key + '\')">' + systems[key].label + '</button>';
  }).join("");
}

function setHabitatFilter(key) {
  activeHabitatFilter = key;
  renderHabitatFilterBar();
  renderPracticeCards();
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
'🖨 Print Plan Summary' +
'📋 Copy Plan Summary' +
'';
if (node.type === "gate") {
var gateOpts = node.options.map(function (opt) {
var safeLabel = opt.label.replace(/'/g, "\'");
return '' + opt.label + '';
}).join("");
qEl.innerHTML =
'' +
'◆ PRE-CONDITION GATE' +
'' + node.title + '' +
'' + node.text + '' +
'' + gateOpts + '' +
'';
} else if (node.type === "stop") {
qEl.innerHTML =
'' +
'🛑 STOP / ALTERNATE CPS' +
'' + node.title + '' +
'' + node.text + '' +
'Recommended Action: ' + node.action + '' +
actionButtonsHtml +
'';
} else if (node.type === "question") {
var qOpts = node.options.map(function (opt) {
var safeLabel = opt.label.replace(/'/g, "\'");
return '' + opt.label + '';
}).join("");
qEl.innerHTML =
'' +
'💠 DECISION / CAPP CRITERIA' +
'' + node.title + '' +
'' + node.text + '' +
'' + qOpts + '' +
'';
} else if (node.type === "result") {
var supportingHtml = "";
if (practice.supportingPractices) {
var checklistItems = Object.keys(practice.supportingPractices)
.map(function (groupName) {
var safeVal = groupName.replace(/"/g, """);
return (
'' +
'' +
'Secondary ' + groupName + ' concerns on site?' +
''
);
})
.join("");
supportingHtml =
'' +
'' +
'🔵 Secondary Resource Concerns & Supporting Practices (Check all that apply)' +
'Select any secondary site issues that CPS ' + practice.code + ' alone cannot resolve:' +
checklistItems +
'' +
'' +
'No secondary resource concerns selected. Primary practice alone is sufficient.' +
'' +
'';
}
var techSpecHtml = node.techSpec
? '📐 ' + node.techSpec + ''
: '';
var stateNoteHtml = node.stateNote
? '📌 ' + node.stateNote + ''
: '';
var omHtml = node.om
? 'Operation & Maintenance (O&M): ' + node.om + ''
: '';
qEl.innerHTML =
'' +
'✅ RECOMMENDED PAYMENT SCENARIO' +
'' + node.title + '' +
'Criteria: ' + node.criteria + '' +
techSpecHtml +
stateNoteHtml +
supportingHtml +
omHtml +
actionButtonsHtml +
'';
}
}
