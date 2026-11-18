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

  bar.innerHTML = "";
  var systems = FISCAL_YEAR_CONFIG.habitatSystems;

  Object.keys(systems).forEach(function (key) {
    var isActive = activeHabitatFilter === key;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = systems[key].label;
    btn.style.cssText = isActive
      ? "padding:7px 12px; border-radius:20px; border:2px solid #14532d; background:#14532d; color:#ffffff; font-size:0.82rem; font-weight:700; cursor:pointer;"
      : "padding:7px 12px; border-radius:20px; border:1px solid #9ca3af; background:#ffffff; color:#1f2937; font-size:0.82rem; font-weight:600; cursor:pointer;";
    btn.onclick = function () {
      setHabitatFilter(key);
    };
    bar.appendChild(btn);
  });
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
