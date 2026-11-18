// app.js — Complete Interactive Flowchart, Unresolved Resource Concerns & Print Controller
var currentPracticeCode = null;
var currentNodeId = null;
var stepHistory = [];

document.addEventListener("DOMContentLoaded", function () {
  if (typeof PRACTICES === "undefined" || typeof SCENARIOS === "undefined") {
    var selector = document.getElementById("practice-selector");
    if (selector) {
      selector.innerHTML = '<div class="node-stop"><strong>Data Error:</strong> One of the data files failed to load. Check Console (F12).</div>';
    }
    return;
  }
    if (typeof applyAnnualOverrides === "function") applyAnnualOverrides();
  renderPracticeCards();
});

function switchView(viewName) {
  document.getElementById("view-flow").classList.toggle("hidden", viewName !== "flow");
  document.getElementById("view-scenarios").classList.toggle("hidden", viewName !== "scenarios");
  document.getElementById("tab-flow").classList.toggle("active", viewName === "flow");
  document.getElementById("tab-scenarios").classList.toggle("active", viewName === "scenarios");
}

function renderPracticeCards() {
  var container = document.getElementById("practice-selector");
  container.innerHTML = "";

  Object.values(PRACTICES).forEach(function (practice) {
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

  if (node.type === "gate") {
    var gateOpts = node.options.map(function (opt) {
      var safeLabel = opt.label.replace(/'/g, "\\'");
      return '<button class="option-btn" type="button" onclick="selectOption(\'' + safeLabel + '\', \'' + opt.next + '\')">' + opt.label + '</button>';
    }).join("");

    qEl.innerHTML =
      '<div class="node-card node-gate">' +
        '<span class="badge-black-diamond">&#9670; PRE-CONDITION GATE</span>' +
        '<h3 style="display:block; font-size:1.08rem; font-weight:700; color:#111827; margin:8px 0 6px 0;">' + node.title + '</h3>' +
        '<p>' + node.text + '</p>' +
        '<div class="option-list">' + gateOpts + '</div>' +
      '</div>';
  } else if (node.type === "stop") {
    qEl.innerHTML =
      '<div class="node-card node-stop">' +
        '<span class="badge-red-hexagon">&#128721; STOP / ALTERNATE CPS</span>' +
        '<h3 style="display:block; font-size:1.08rem; font-weight:700; color:#111827; margin:8px 0 6px 0;">' + node.title + '</h3>' +
        '<p>' + node.text + '</p>' +
        '<div class="action-box">Recommended Action: ' + node.action + '</div>' +
        '<button class="print-btn" type="button" onclick="window.print()" style="margin-top:14px; padding:10px 18px; background-color:#14532d; color:#ffffff; border:none; border-radius:6px; font-size:0.95rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">&#128424; Print Plan Summary</button>'
      '</div>';
  } else if (node.type === "question") {
    var qOpts = node.options.map(function (opt) {
      var safeLabel = opt.label.replace(/'/g, "\\'");
      return '<button class="option-btn" type="button" onclick="selectOption(\'' + safeLabel + '\', \'' + opt.next + '\')">' + opt.label + '</button>';
    }).join("");

    qEl.innerHTML =
      '<div class="node-card node-question">' +
        '<span class="badge-yellow-diamond">&#128160; DECISION / CAPP CRITERIA</span>' +
        '<h3 style="display:block; font-size:1.08rem; font-weight:700; color:#111827; margin:8px 0 6px 0;">' + node.title + '</h3>' +
        '<p>' + node.text + '</p>' +
        '<div class="option-list">' + qOpts + '</div>' +
      '</div>';
  } else if (node.type === "result") {
    var supportingHtml = "";
    if (practice.supportingPractices) {
      var checklistItems = Object.keys(practice.supportingPractices)
        .map(function (groupName) {
          var safeVal = groupName.replace(/"/g, "&quot;");
          return (
            '<label style="display:flex; align-items:flex-start; gap:8px; margin-bottom:6px; cursor:pointer; font-weight:500;">' +
              '<input type="checkbox" class="rc-support-checkbox" value="' + safeVal + '" onchange="updateSupportingChecklist()" style="margin-top:4px; transform:scale(1.15);">' +
              '<span>Secondary <strong>' + groupName + '</strong> concerns on site?</span>' +
            '</label>'
          );
        })
        .join("");

      supportingHtml =
        '<div class="supporting-box" style="border: 2px solid #0284c7; background: #f0f9ff; margin-top:12px;">' +
          '<div id="supporting-checklist-controls">' +
            '<h4 style="color:#0369a1; margin-bottom:6px;">&#128309; Secondary Resource Concerns &amp; Supporting Practices (Check all that apply)</h4>' +
            '<p style="font-size:0.82rem; color:#334155; margin-bottom:8px;">Select any secondary site issues that CPS ' + practice.code + ' alone cannot resolve:</p>' +
            checklistItems +
          '</div>' +
          '<div id="selected-supporting-output" style="margin-top:8px; font-size:0.86rem;">' +
            '<em style="color:#4b5563;">No secondary resource concerns selected. Primary practice alone is sufficient.</em>' +
          '</div>' +
        '</div>';
    }

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
        stateNoteHtml +
        supportingHtml +
        omHtml +
        '<button class="print-btn" type="button" onclick="window.print()" style="margin-top:14px; padding:10px 18px; background-color:#14532d; color:#ffffff; border:none; border-radius:6px; font-size:0.95rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">&#128424; Print Plan Summary</button>' +
      '</div>';
  }
}
function filterScenarios() {
var searchVal = document.getElementById("scenario-search").value.toLowerCase().trim();
var cpsVal = document.getElementById("practice-filter").value;
var catVal = document.getElementById("category-filter").value;
var filtered = SCENARIOS.filter(function (s) {
var matchCps = cpsVal === "ALL" || s.code === cpsVal;
var matchCat = catVal === "ALL" || s.category === catVal;
var textBlob = (s.code + " " + s.practiceName + " " + s.capp + " " + s.scenarioNum + " " + s.name + " " + s.description).toLowerCase();
var matchSearch = !searchVal || textBlob.indexOf(searchVal) !== -1;
return matchCps && matchCat && matchSearch;
});
document.getElementById("scenario-count").textContent = "Showing " + filtered.length + " of " + SCENARIOS.length + " FY27 / FY26 Practice Scenarios";
var listEl = document.getElementById("scenario-list");
listEl.innerHTML = filtered.map(function (s) {
return (
'' +
'' +
'' +
'CPS ' + s.code + '' +
'CAPP: ' + s.capp + '' +
'Scenario ' + s.scenarioNum + '' +
'' +
'' + s.rate + ' / ' + s.unit + '' +
'' +
'' + s.practiceName + ' — ' + s.name + '' +
'Typical Size: ' + s.typicalSize + ' | Typical Total: ' + s.typicalTotal + ' | Source: ' + s.source + '' +
'' + s.description + '' +
''
);
}).join("");
}
