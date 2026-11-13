// =========================================================================
// 1. NRCS CONSERVATION PRACTICE STANDARDS & INTERACTIVE FLOWCHARTS
// =========================================================================
var PRACTICES = {
  "390": {
    code: "390",
    name: "Riparian Herbaceous Cover",
    source: "CPS 390 & FY 2026 Scenarios",
    rcSummary: "Water Quality (Sediment/Nutrient Filtering), Streambank Stability, Riparian Wildlife & Pollinator Habitat",
    om: "Inspect 2x/yr and after major storm events; maintain minimum width (>= 35 ft or 2.5x bankfull width); mow/burn <= 1/3 annually outside nesting season.",
    supporting: "Fence (382), Access Control (472), Prescribed Grazing (528A), Herbaceous Weed Treatment (315), Streambank Protection (580), Grade Stabilization Structure (410).",
    start: "390_q1",
    nodes: {
      "390_q1": {
        tag: "CPS 390 · Step 1",
        q: "Is the site exposed to high-velocity flood scour or active bank erosion requiring live vegetative reinforcement?",
        note: "Standard drill seeding works for gentle filter strips, while high-velocity zones require live plugs or sprigs.",
        options: [
          { label: "Yes — High-velocity scour or active bank toe erosion", next: "390_s44" },
          { label: "No — Standard riparian buffer / filter strip zone", next: "390_q2" }
        ]
      },
      "390_q2": {
        tag: "CPS 390 · Step 2",
        q: "What is the primary vegetative objective and Ecological Site Description (ESD) requirement?",
        note: "Select based on whether standard grasses, diverse pollinator mixes, or specialized ESD seed mixes are required.",
        options: [
          { label: "Sediment trapping & nutrient filtering (Stiff-stemmed grasses)", next: "390_s39" },
          { label: "Pollinator & wildlife habitat (Diverse native grass + forb mix)", next: "390_s40" },
          { label: "Specialized / Rare ESD seed mix required", next: "390_s41" }
        ]
      },
      "390_s39": {
        type: "result",
        tag: "CPS 390 · Scenario 39",
        q: "Scenario 39: Riparian Herbaceous Cover — Grass ($1,026.38/ac)",
        note: "No-till or range drill adapted stiff-stemmed grasses for sediment trapping and filter strip performance."
      },
      "390_s40": {
        type: "result",
        tag: "CPS 390 · Scenario 40",
        q: "Scenario 40: Riparian Herbaceous Cover — Native Grass and Forbs ($1,026.38/ac)",
        note: "Diverse native grass and forb mix with overlapping bloom periods for pollinators and wildlife."
      },
      "390_s41": {
        type: "result",
        tag: "CPS 390 · Scenario 41",
        q: "Scenario 41: Riparian Herbaceous Cover — Specialized Seed ($1,443.13/ac)",
        note: "High-cost specialized native seed mix tailored to target Ecological Site Descriptions (ESDs)."
      },
      "390_s44": {
        type: "result",
        tag: "CPS 390 · Scenario 44",
        q: "Scenario 44: Riparian Herbaceous Cover — Plugging and Seeding ($7,038.68/ac)",
        note: "Combined native seeding and live sprigging/plugging for high-velocity scour zones."
      }
    }
  },

  "420": {
    code: "420",
    name: "Wildlife Habitat Planting",
    source: "CPS 420 & FY 2026 Scenarios",
    rcSummary: "Terrestrial Habitat for Wildlife & Pollinators, Plant Structure & Composition",
    om: "Control invasive weeds during establishment; conduct rotational mowing, disking, or prescribed burning on 1/3 to 1/5 of area outside primary nesting season.",
    supporting: "Herbaceous Weed Treatment (315), Prescribed Burning (338), Mulching (484), Tree/Shrub Site Prep (490), Fence (382), Irrigation System Microirrigation (441).",
    start: "420_q1",
    nodes: {
      "420_q1": {
        tag: "CPS 420 · Step 1",
        q: "Is this a CRP re-enrollment maintenance action, a small-scale planting (< 5 ac / sq ft), or a field-scale seeding?",
        note: "Planting scale and current land use (Cropland vs. Non-Cropland) determine the scenario.",
        options: [
          { label: "CRP Re-enrollment Maintenance", next: "420_crp" },
          { label: "Small-scale / Spot planting (Sq Ft or < 5 ac)", next: "420_q2" },
          { label: "Field-scale seeding on Cropland (Includes foregone income)", next: "420_q3" },
          { label: "Field-scale seeding on Non-Cropland / Fallow", next: "420_q4" }
        ]
      },
      "420_q2": {
        tag: "CPS 420 · Step 2 (Small Scale)",
        q: "Select the plant stock and footprint size:",
        options: [
          { label: "Spot-planting potted native forbs/shrubs (~225 sq ft)", next: "420_s257" },
          { label: "Containerized woody seedlings (~1/4 ac / 10,890 sq ft)", next: "420_s192" },
          { label: "Herbaceous native plugs (~1/4 ac / 10,890 sq ft)", next: "420_s303" },
          { label: "Specialized seeding + live plugs/shrubs (< 5 ac)", next: "420_s272" }
        ]
      },
      "420_q3": {
        tag: "CPS 420 · Step 2 (Cropland)",
        q: "Select the seed mix diversity level required on Cropland:",
        options: [
          { label: "Low Species Diversity (Basic native mix)", next: "420_s302" },
          { label: "High Species Diversity (Pollinator / diverse native mix)", next: "420_s271" },
          { label: "Specialized Habitat Requirements (High-cost specialized seed)", next: "420_s193" }
        ]
      },
      "420_q4": {
        tag: "CPS 420 · Step 2 (Non-Cropland)",
        q: "Select the seed mix diversity level required on Non-Cropland:",
        options: [
          { label: "Low Species Diversity (Basic native mix)", next: "420_s301" },
          { label: "High Species Diversity (Pollinator / diverse native mix)", next: "420_s299" },
          { label: "Specialized Habitat Requirements (High-cost specialized seed)", next: "420_s300" }
        ]
      },
      "420_crp": { type: "result", tag: "CPS 420 · CRP", q: "Scenario CRP-R: Wildlife Habitat Planting — CRP Re-enrollment Maintenance (CRP Rate)", note: "Maintain existing wildlife habitat planting per CRP contract." },
      "420_s257": { type: "result", tag: "CPS 420 · Scenario 257", q: "Scenario 257: Potted Plants or Shrubs — Spot 225 sq ft ($3.35/sq ft)", note: "Spot-treating sod and hand-planting potted native forbs (e.g. milkweed) or shrubs." },
      "420_s192": { type: "result", tag: "CPS 420 · Scenario 192", q: "Scenario 192: Seedlings — ~1/4 ac ($0.77/sq ft)", note: "Small-scale (~1/4 ac / 10,890 sq ft) establishment using containerized woody seedlings." },
      "420_s303": { type: "result", tag: "CPS 420 · Scenario 303", q: "Scenario 303: Herbaceous Plugs — ~1/4 ac ($1.35/sq ft)", note: "Small-scale (~1/4 ac / 10,890 sq ft) establishment using herbaceous native plugs." },
      "420_s272": { type: "result", tag: "CPS 420 · Scenario 272", q: "Scenario 272: Specialized Seeding and Plugging — < 5 ac ($8,514.32/ac)", note: "Small acreage (< 5 ac) combining native seeding with live plugs or shrubs." },
      "420_s302": { type: "result", tag: "CPS 420 · Scenario 302", q: "Scenario 302: Low Species Diversity on Cropland ($1,012.70/ac)", note: "Field-scale cropland conversion using basic native mix; includes foregone crop income." },
      "420_s271": { type: "result", tag: "CPS 420 · Scenario 271", q: "Scenario 271: High Species Diversity on Cropland ($1,595.98/ac)", note: "Field-scale high-diversity native grasses/forbs on cropland; includes foregone crop income." },
      "420_s193": { type: "result", tag: "CPS 420 · Scenario 193", q: "Scenario 193: Specialized Habitat Req. on Cropland ($2,362.73/ac)", note: "High-cost specialized native seed mix on active cropland; includes foregone crop income." },
      "420_s301": { type: "result", tag: "CPS 420 · Scenario 301", q: "Scenario 301: Low Species Diversity on Non-Cropland ($406.91/ac)", note: "Field-scale basic native seeding on fallow/non-cropland." },
      "420_s299": { type: "result", tag: "CPS 420 · Scenario 299", q: "Scenario 299: High Species Diversity on Non-Cropland ($885.06/ac)", note: "Diverse native grass/forb seeding on fallow or non-cropland without foregone crop income." },
      "420_s300": { type: "result", tag: "CPS 420 · Scenario 300", q: "Scenario 300: Specialized Habitat Req. on Non-Cropland ($1,862.08/scen)", note: "Specialized native habitat seed mix on fallow/non-cropland without foregone crop income." }
    }
  },

  "422": {
    code: "422",
    name: "Hedgerow Planting",
    source: "CPS 422 & FY 2026 Scenarios",
    rcSummary: "Terrestrial Habitat Corridors, Beneficial Insect / Pollinator Habitat, Air Quality (Particulate/Odor/Drift Interception)",
    om: "Control competing weeds during establishment; prune or rejuvenate <= 1/3 of woody length annually outside nesting season; exclude insecticides on Beetle Banks.",
    supporting: "Tree/Shrub Site Preparation (490), Windbreak/Shelterbelt Establishment (380), Pest Management Conservation System (595), Field Border (386), Fence (382).",
    start: "422_q1",
    nodes: {
      "422_q1": {
        tag: "CPS 422 · Step 1",
        q: "What is the primary conservation purpose of the linear hedgerow?",
        options: [
          { label: "Air quality mitigation (Poultry exhaust dust/odor or pesticide drift screen)", next: "422_q2" },
          { label: "Beneficial predatory insect overwintering (Beetle Bank)", next: "422_s32" },
          { label: "Woody wildlife travel corridor & cover (>= 1 woody row)", next: "422_q3" }
        ]
      },
      "422_q2": {
        tag: "CPS 422 · Step 2 (Air Quality)",
        q: "Is the screen placed opposite poultry house exhaust fans or as a general drift/odor barrier?",
        options: [
          { label: "Tall warm-season grasses opposite poultry house exhaust fans", next: "422_s29" },
          { label: "Woody / tall grass screen (50-65% porosity) for odor or drift", next: "422_scr" }
        ]
      },
      "422_q3": {
        tag: "CPS 422 · Step 2 (Terrain)",
