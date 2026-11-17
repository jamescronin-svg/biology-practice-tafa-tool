// app.js — Interactive Flowchart, Unresolved Resource Concerns Checklist & FY27 Scenario Controller
let currentPracticeCode = null;
let currentNodeId = null;
let stepHistory = [];

document.addEventListener("DOMContentLoaded", () => {
  if (typeof PRACTICES === "undefined" || typeof SCENARIOS === "undefined") {
    const selector = document.getElementById("practice-selector");
    if (selector) {
      selector.innerHTML = `<div class="node-stop"><strong>Data Error:</strong> One of the data files failed to load. Check Console (F12).</div>`;
    }
    return;
  }
  renderPracticeCards();
  filterScenarios();
});

function switchView(viewName) {
  document.getElementById("view-flow").classList.toggle("hidden", viewName !== "flow");
  document.getElementById("view-scenarios").classList.toggle("hidden", viewName !== "scenarios");
  document.getElementById("tab-flow").classList.toggle("active", viewName === "flow");
  document.getElementById("tab-scenarios").classList.toggle("active", viewName === "scenarios");
}

function renderPracticeCards() {
  const container = document.getElementById("practice-selector");
  container.innerHTML = "";

  Object.values(PRACTICES).forEach(practice => {
    const card = document.createElement("div");
    card.className = "practice-card";
    card.onclick = () => startPractice(practice.code);
    card.innerHTML = `
      <span class="practice-code">CPS ${practice.code}</span>
      <h3>${practice.name}</h3>
      <p>${practice.category}</p>
    `;
    container.appendChild(card);
  });
}

function startPractice(code) {
  currentPracticeCode = code;
  const practice = PRACTICES[code];
  stepHistory = [];
  currentNodeId = practice.startNode;

  document.getElementById("practice-selector").classList.add("hidden");
  document.getElementById("flow-container").classList.remove("hidden");

  document.getElementById("flow-practice-banner").innerHTML = `
    <h2>CPS ${practice.code} — ${practice.name}</h2>
    <div class="meta"><strong>Source:</strong> ${practice.source}</div>
    <div class="meta"><strong>Priority Resource Concerns:</strong> ${practice.rcSummary}</div>
  `;

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
  const prev = stepHistory.pop();
  currentNodeId = prev.nodeId;
  renderCurrentNode();
}

function selectOption(optionLabel, nextNodeId) {
  const practice = PRACTICES[currentPracticeCode];
  const node = practice.nodes[currentNodeId];
  stepHistory.push({
    nodeId: currentNodeId,
    questionTitle: node.title,
    chosenLabel: optionLabel
  });
  currentNodeId = nextNodeId;
  renderCurrentNode();
}

function updateSupportingChecklist() {
  const practice = PRACTICES[currentPracticeCode];
  if (!practice || !practice.supportingPractices) return;

  const checkboxes = document.querySelectorAll(".rc-support-checkbox:checked");
  const outputEl = document.getElementById("selected-supporting-output");
  if (!outputEl) return;

  if (checkboxes.length === 0) {
    outputEl.innerHTML = `<em style="color:#4b5563;">No secondary resource concerns selected. Primary practice alone is sufficient.</em>`;
    return;
  }

  const selectedGroups = Array.from(checkboxes).map(cb => {
    const groupKey = cb.value;
    const codes = practice.supportingPractices[groupKey] || [];
    return `
      <div style="margin-top:6px; padding:8px; background:#ecfdf5; border-left:4px solid #15803d; border-radius:4px;">
        <strong>${groupKey}:</strong> ${codes.join(", ")}
      </div>
    `;
  });

  outputEl.innerHTML = `
    <div style="margin-top:8px; font-weight:700; color:#14532d;">Recommended Supporting CPS Codes to Add to Plan:</div>
    ${selectedGroups.join("")}
  `;
}

function renderCurrentNode() {
  const practice = PRACTICES[currentPracticeCode];
  const node = practice.nodes[currentNodeId];

  // Update Undo button
  document.getElementById("btn-undo").disabled = stepHistory.length === 0;

  // Render History Trail
  const historyEl = document.getElementById("flow-history");
  historyEl.innerHTML = stepHistory
    .map((h, i) => `<div class="history-item"><strong>Step ${i + 1}:</strong> ${h.questionTitle} → <em>${h.chosenLabel}</em></div>`)
    .join("");

  const qEl = document.getElementById("current-question");

  if (node.type === "gate") {
    qEl.innerHTML = `
      <div class="node-card node-gate">
        <span class="badge-black-diamond">◆ PRE-CONDITION GATE</span>
        <h3>${node.title}</h3>
        <p>${node.text}</p>
        <div class="option-list">
          ${node.options.map(opt => `<button class="option-btn" type="button" onclick="selectOption('${opt.label.replace(/'/g, "\\'")}', '${opt.next}')">${opt.label}</button>`).join("")}
        </div>
      </div>
    `;
  } else if (node.type === "stop") {
    qEl.innerHTML = `
      <div class="node-card node-stop">
        <span class="badge-red-hexagon">🛑 STOP / ALTERNATE CPS</span>
        <h3>${node.title}</h3>
        <p>${node.text}</p>
        <div class="action-box">Recommended Action: ${node.action}</div>
      </div>
    `;
  } else if (node.type === "question") {
    qEl.innerHTML = `
      <div class="node-card node-question">
        <span class="badge-yellow-diamond">💠 DECISION / CAPP CRITERIA</span>
        <h3>${node.title}</h3>
        <p>${node.text}</p>
        <div class="option-list">
          ${node.options.map(opt => `<button class="option-btn" type="button" onclick="selectOption('${opt.label.replace(/'/g, "\\'")}', '${opt.next}')">${opt.label}</button>`).join("")}
        </div>
      </div>
    `;
  } else if (node.type === "result") {
    let supportingHtml = "";
    if (practice.supportingPractices) {
      const checklistItems = Object.keys(practice.supportingPractices)
        .map(groupName => `
          <label style="display:flex; align-items:flex-start; gap:8px; margin-bottom:6px; cursor:pointer; font-weight:500;">
            <input type="checkbox" class="rc-support-checkbox" value="${groupName.replace(/"/g, "&quot;")}" onchange="updateSupportingChecklist()" style="margin-top:4px; transform:scale(1.15);">
            <span>Unresolved <strong>${groupName}</strong> concerns on site?</span>
          </label>
        `)
        .join("");

      supportingHtml = `
        <div class="supporting-box" style="border: 2px solid #0284c7; background: #f0f9ff;">
          <h4 style="color:#0369a1; margin-bottom:6px;">🔵 Unresolved Spreadsheet Resource Concerns? (Check all that apply)</h4>
          <p style="font-size:0.82rem; color:#334155; margin-bottom:8px;">Select any secondary site issues that CPS ${practice.code} alone cannot resolve:</p>
          ${checklistItems}
          <div id="selected-supporting-output" style="margin-top:8px; font-size:0.86rem;">
            <em style="color:#4b5563;">No secondary resource concerns selected. Primary practice alone is sufficient.</em>
          </div>
        </div>
      `;
    }

    qEl.innerHTML = `
      <div class="node-card node-result">
        <span class="badge-green-result">✅ RECOMMENDED PAYMENT SCENARIO</span>
        <h3>${node.title}</h3>
        <p><strong>Criteria:</strong> ${node.criteria}</p>
        ${node.om ? `<div class="om-box"><strong>Operation &amp; Maintenance (O&amp;M):</strong> ${node.om}</div>` : ""}
        ${supportingHtml}
      </div>
    `;
  }
}

function filterScenarios() {
  const searchVal = document.getElementById("scenario-search").value.toLowerCase().trim();
  const cpsVal = document.getElementById("practice-filter").value;
  const catVal = document.getElementById("category-filter").value;

  const filtered = SCENARIOS.filter(s => {
    const matchCps = cpsVal === "ALL" || s.code === cpsVal;
    const matchCat = catVal === "ALL" || s.category === catVal;
    const textBlob = `${s.code} ${s.practiceName} ${s.capp} ${s.scenarioNum} ${s.name} ${s.description}`.toLowerCase();
    const matchSearch = !searchVal || textBlob.includes(searchVal);
    return matchCps && matchCat && matchSearch;
  });

  document.getElementById("scenario-count").textContent = `Showing ${filtered.length} of ${SCENARIOS.length} FY27 / FY26 Practice Scenarios`;

  const listEl = document.getElementById("scenario-list");
  listEl.innerHTML = filtered.map(s => `
    <div class="scenario-card">
      <div class="scenario-header">
        <div class="scenario-tags">
          <span class="tag-cps">CPS ${s.code}</span>
          <span class="tag-capp">CAPP: ${s.capp}</span>
          <span class="tag-num">Scenario ${s.scenarioNum}</span>
        </div>
        <div class="scenario-rate">${s.rate} / ${s.unit}</div>
      </div>
      <h3>${s.practiceName} — ${s.name}</h3>
      <div class="scenario-meta"><strong>Typical Size:</strong> ${s.typicalSize} | <strong>Typical Total:</strong> ${s.typicalTotal} | <strong>Source:</strong> ${s.source}</div>
      <div class="scenario-desc">${s.description}</div>
    </div>
  `).join("");
}
