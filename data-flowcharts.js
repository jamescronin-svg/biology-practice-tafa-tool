// data-flowcharts.js — Batch 1 of 2 (Practices 390, 420, 422, 643, 644, 645)
// Updated for FY27 CAPP Narratives, Black Diamond Pre-Condition Gates, and Red Hexagon Terminal Stops

const PRACTICES = {
  "390": {
    code: "390",
    name: "Riparian Herbaceous Cover",
    category: "Water Quality / Hydrology",
    source: "CPS 390 (Nov 2022), FY27 CAPP & FY26 Scenarios",
    rcSummary: "Water Quality/Quantity, Streambank Stability, Fish & Wildlife/Pollinator Habitat, Plant Condition",
        supportingPractices: {
      "Livestock & Access Control": ["382 Fence", "472 Access Control", "528 Prescribed Grazing", "578 Stream Crossing", "614 Watering Facility", "561 Heavy Use Area"],
      "Up-Gradient & Bank Stabilization": ["580 Streambank Protection", "342 Critical Area Planting", "393 Filter Strip", "395 Stream Habitat Imp."],
      "Site Prep, Pest & Habitat Mgmt": ["314 Brush Mgmt", "315 Herbaceous Weed Treatment", "647 Early Successional Habitat"],
      "Woody Buffer or Upland Cover Alternatives": ["391 Riparian Forest Buffer", "327 Conservation Cover"]
    },
    startNode: "gate1",
    nodes: {
      "gate1": {
        type: "gate",
        shape: "black-diamond",
        title: "Pre-Condition 1: Channel & Streambank Stability",
        text: "Are the stream channel and streambanks stable enough to support herbaceous establishment without severe bank sloughing?",
        options: [
          { label: "No — Unstable Banks / Active Sloughing", next: "stop_banks" },
          { label: "Yes — Banks Stable (or Stabilized)", next: "gate2" }
        ]
      },
      "stop_banks": {
        type: "stop",
        shape: "red-hexagon",
        title: "DO NOT INSTALL 390 ALONE",
        text: "Herbaceous cover alone cannot stabilize actively eroding or vertical banks.",
        action: "Stabilize channel and banks first using Streambank and Shoreline Protection (580) or Grade Stabilization Structure (410) before planning 390."
      },
      "gate2": {
        type: "gate",
        shape: "black-diamond",
        title: "Pre-Condition 2: Native Seed Bank & Natural Regeneration",
        text: "Does a desirable native seed bank or rootstock already exist on site that will regenerate naturally once disturbance stops?",
        options: [
          { label: "Yes — Adequate Native Seed Bank Exists", next: "stop_regen" },
          { label: "No — Planting / Seeding Required", next: "capp_select" }
        ]
      },
      "stop_regen": {
        type: "stop",
        shape: "red-hexagon",
        title: "PLANTING NOT REQUIRED (DO NOT USE 390)",
        text: "Artificial seeding is unnecessary when native riparian vegetation will recover naturally.",
        action: "Use natural regeneration paired with Access Control (472) or Prescribed Grazing (528)."
      },
      "capp_select": {
        type: "question",
        shape: "yellow-diamond",
        title: "FY27 CAPP Narrative Code",
        text: "Select the applicable FY27 CAPP Narrative objective for this site:",
        options: [
          { label: "00N-CRP-R — CRP Re-enrollment (Maintain existing cover)", next: "res_crp" },
          { label: "00N — Basic Riparian Cover (Narrow strip: >= 2.5x stream width or 35 ft)", next: "q_method" },
          { label: "01N — Fish & Wildlife Design (Wide strip, diverse native grasses/forbs)", next: "q_method" },
          { label: "02N / 03N — Increase Width of Existing Riparian Herbaceous Cover", next: "q_method" }
        ]
      },
      "res_crp": {
        type: "result",
        shape: "blue-om",
        scenarioId: "390_CRP",
        title: "00N-CRP-R — CRP Re-enrollment (Standalone O&M)",
        criteria: "No new establishment scenario payment; maintain existing riparian herbaceous cover to meet planned CRP objectives.",
        om: "Manage existing stand per CRP contract. Mow or disturb <= 1/3 per year outside nesting/fawning season; control noxious weeds."
      },
      "q_method": {
        type: "question",
        shape: "yellow-diamond",
        title: "Species Mix & Establishment Method",
        text: "Select the site hydrology and species mix needed:",
        options: [
          { label: "Severe hydrology / scour risk requiring live sprigs + seed", next: "res_44" },
          { label: "Specialized / high-cost seed mix for specific ecological site", next: "res_41" },
          { label: "Standard native grass & forb mix (Wildlife / Pollinator diversity)", next: "res_40" },
          { label: "Stiff-stemmed grasses only (Water Quality / Bank stability)", next: "res_39" }
        ]
      },
      "res_39": {
        type: "result",
        scenarioId: "390_1",
        title: "Scenario 39 — Grass ($1,026.38/ac | Typ. 0.5 ac = $513.19)",
        criteria: "No-till or range drill seeding of site-adapted stiff-stemmed grasses.",
        om: "Defer grazing >= 2 yrs until established; control pests; inspect up-gradient erosion."
      },
      "res_40": {
        type: "result",
        scenarioId: "390_2",
        title: "Scenario 40 — Native Grass and Forbs ($1,026.38/ac | Typ. 0.5 ac = $513.19)",
        criteria: "Diverse native grass and forb mix with varying bloom times.",
        om: "Defer grazing >= 2 yrs; disturb <= 1/3 annually outside nesting season."
      },
      "res_41": {
        type: "result",
        scenarioId: "390_3",
        title: "Scenario 41 — Specialized Seed ($1,443.13/ac | Typ. 0.5 ac = $721.57)",
        criteria: "Higher-cost specialized native seed mix for specific ecological site or habitat needs.",
        om: "Defer grazing >= 2 yrs; control invasive species."
      },
      "res_44": {
        type: "result",
        scenarioId: "390_4",
        title: "Scenario 44 — Plugging and Seeding ($7,038.68/ac | Typ. 0.5 ac = $3,519.34)",
        criteria: "Combined live sprigs/plugs and seeding for high-scour riparian zones.",
        om: "Defer grazing >= 2 yrs; inspect after high-flow events."
      }
    }
  },

  "420": {
    code: "420",
    name: "Wildlife Habitat Planting",
    category: "Wildlife / Habitat",
    source: "CPS 420 (May 2019), FY27 CAPP & FY26 Scenarios",
    rcSummary: "Terrestrial Habitat for Wildlife & Invertebrates (Pollinators), Degraded Plant Condition (WHEG < 0.50)",
       supportingPractices: {
      "Site Prep & Invasive Control": ["314 Brush Mgmt", "315 Herbaceous Weed Treatment", "338 Prescribed Burning", "340 Cover Crop"],
      "Protection & Long-Term Mgmt": ["382 Fence", "472 Access Control", "528 Prescribed Grazing", "647 Early Successional Habitat"],
      "Adjunct Structural / Buffer Practices": ["422 Hedgerow Planting", "649 Structures for Wildlife", "390 Riparian Herbaceous Cover", "393 Filter Strip"],
      "Forage, Timber, or Erosion Alternatives": ["512 Pasture and Hay Planting", "550 Range Planting", "612 Tree/Shrub Establishment", "342 Critical Area Planting"]
    },
    startNode: "gate1",
    nodes: {
      "gate1": {
        type: "gate",
        shape: "black-diamond",
        title: "Pre-Condition 1: Vegetative Management Only?",
        text: "Can habitat targets (WHEG >= 0.50) be achieved using vegetative management alone without planting?",
        options: [
          { label: "Yes — Existing Native Cover Can Be Managed", next: "stop_mgmt" },
          { label: "No — New Planting / Interplanting Required", next: "gate2" }
        ]
      },
      "stop_mgmt": {
        type: "stop",
        shape: "red-hexagon",
        title: "DO NOT USE CODE 420",
        text: "Planting is unnecessary when existing native vegetation can meet habitat goals through management.",
        action: "Use management practices instead: Prescribed Burning (338), Prescribed Grazing (528), Forest Stand Improvement (666), Brush/Weed Mgmt (314/315), or Early Successional Habitat (647)."
      },
      "gate2": {
        type: "gate",
        shape: "black-diamond",
        title: "Pre-Condition 2: Scope Exclusion Check",
        text: "Is the primary objective commercial timber/tree establishment, commercial forage production, or critical erosion control?",
        options: [
          { label: "Yes — Primary Goal Is Trees, Forage, or Erosion Control", next: "stop_scope" },
          { label: "No — Primary Goal Is Wildlife / Pollinator Habitat", next: "capp_select" }
        ]
      },
      "stop_scope": {
        type: "stop",
        shape: "red-hexagon",
        title: "OUT OF SCOPE FOR CODE 420",
        text: "Code 420 applies only where wildlife/invertebrate habitat is the primary objective.",
        action: "Use Tree/Shrub Establishment (612), Forage/Range Planting (512/550), or Critical Area Planting (342)."
      },
      "capp_select": {
        type: "question",
        shape: "yellow-diamond",
        title: "FY27 CAPP Narrative Code",
        text: "Select the applicable FY27 CAPP Narrative objective:",
        options: [
          { label: "00N-CRP-R — CRP Re-enrollment (Maintain existing cover)", next: "res_crp" },
          { label: "00N — Full Habitat Establishment (Plant herbaceous/shrub cover >= 50% potential)", next: "q_scale_00n" },
          { label: "01N — Habitat Augmentation / Interplanting (Address missing life-need)", next: "q_scale_01n" }
        ]
      },
      "res_crp": {
        type: "result",
        shape: "blue-om",
        scenarioId: "420_CRP",
        title: "00N-CRP-R — CRP Re-enrollment (Standalone O&M)",
        criteria: "Maintain existing wildlife habitat planting to meet planned CRP objectives.",
        om: "Manage existing cover per CRP contract; schedule disturbance outside primary nesting/brood-rearing season."
      },
      "q_scale_00n": {
        type: "question",
        shape: "yellow-diamond",
        title: "Planting Scale & Material Type (00N)",
        text: "Select the treatment area size and planting material:",
        options: [
          { label: "Very Small (~1/4 ac / 10,890 sq ft) — Potted Plants / Seedlings / Shrubs", next: "res_192" },
          { label: "Small Area (~1/4 ac / 10,890 sq ft) — Herbaceous Plugs", next: "res_303" },
          { label: "Small Acreage (< 5 ac) — Combined Seeding + Supplemental Plugs/Shrubs", next: "res_272" },
        { label: "Field Scale (Typ. 5 ac) — Broadcast or Drill Seeding", next: "q_landuse" }
]
},
"q_scale_01n": {
type: "question",
shape: "yellow-diamond",
title: "Interplanting Scale & Land Use (01N)",
text: "Select the interplanting method and site land use:",
options: [
{ label: "Spot Treatment & Hand Planting (~225 sq ft) — Potted Plants/Shrubs", next: "res_257" },
{ label: "Acreage-Scale Interplanting on Active Cropland (Foregone Income)", next: "q_crop_div" }
]
},
"q_landuse": {
type: "question",
shape: "yellow-diamond",
title: "Land Use & Foregone Income Eligibility",
text: "Is the field-scale seeding occurring on active cropland eligible for foregone income, or fallow/non-cropland?",
options: [
{ label: "Active Cropland (With Foregone Income)", next: "q_crop_div" },
{ label: "Fallow or Non-Cropland (No Foregone Income)", next: "q_noncrop_div" }
]
},
"q_crop_div": {
type: "question",
shape: "yellow-diamond",
title: "Cropland Species Diversity Tier",
text: "Select the seed mix diversity level:",
options: [
{ label: "Low Species Diversity", next: "res_302" },
{ label: "High Species Diversity", next: "res_271" },
{ label: "Specialized Habitat Requirements", next: "res_193" }
]
},
"q_noncrop_div": {
type: "question",
shape: "yellow-diamond",
title: "Non-Cropland Species Diversity Tier",
text: "Select the seed mix diversity level:",
options: [
{ label: "Low Species Diversity", next: "res_301" },
{ label: "High Species Diversity", next: "res_299" },
{ label: "Specialized Habitat Requirements", next: "res_300" }
]
},
"res_192": {
type: "result",
scenarioId: "420_1",
title: "Scenario 192 — Planting with Seedlings ($0.77/sq ft | Typ. 10,890 sq ft = $8,380.48)",
criteria: "Potted plants, plugs, or shrubs on ~1/4 acre.",
om: "Protect from grazing/mowing during establishment; manage disturbance outside nesting season."
},
"res_257": {
type: "result",
scenarioId: "420_2",
title: "Scenario 257 — Interplanting with Potted Plants or Shrubs ($3.35/sq ft | Typ. 225 sq ft = $753.52)",
criteria: "Interplanting into existing herbaceous habitat for a missing life-need.",
om: "Protect newly planted plugs/shrubs from browsing and weed competition."
},
"res_303": {
type: "result",
scenarioId: "420_3",
title: "Scenario 303 — Planting with Plugs ($1.35/sq ft | Typ. 10,890 sq ft = $14,730.62)",
criteria: "Small-patch establishment using herbaceous plugs.",
om: "Protect from grazing/mowing during establishment; schedule disturbance outside nesting season."
},
"res_272": {
type: "result",
scenarioId: "420_4",
title: "Scenario 272 — Specialized Seeding and Plugging ($8,514.32/ac | Typ. 1 ac = $8,514.32)",
criteria: "High-quality nectar/pollen habitat (< 5 ac) combining seeding with plugs/shrubs.",
om: "Protect from grazing/mowing during establishment; control invasive species."
},
"res_302": {
type: "result",
scenarioId: "420_5",
title: "Scenario 302 — Low Species Diversity on Cropland, Foregone Income ($1,012.70/ac | Typ. 5 ac = $5,063.49)",
criteria: "Field-scale low-diversity wildlife seed mix on active cropland.",
om: "Protect from grazing/mowing during establishment; manage disturbance outside nesting season."
},
"res_271": {
type: "result",
scenarioId: "420_6",
title: "Scenario 271 — High Species Diversity on Cropland, Foregone Income ($1,595.98/ac | Typ. 5 ac = $7,979.92)",
criteria: "Field-scale high-diversity wildlife/pollinator mix on active cropland.",
om: "Protect from grazing/mowing during establishment; manage disturbance outside nesting season."
},
"res_193": {
type: "result",
scenarioId: "420_7",
title: "Scenario 193 — Specialized Habitat Requirements on Cropland, Foregone Income ($2,362.73/ac | Typ. 5 ac = $11,813.64)",
criteria: "Field-scale specialized seed mix for targeted wildlife species on active cropland.",
om: "Protect from grazing/mowing during establishment; manage disturbance outside nesting season."
},
"res_301": {
type: "result",
scenarioId: "420_8",
title: "Scenario 301 — Low Species Diversity on Non-Cropland ($406.91/ac | Typ. 5 ac = $2,034.56)",
criteria: "Field-scale low-diversity wildlife seed mix on fallow or non-cropland.",
om: "Protect from grazing/mowing during establishment; manage disturbance outside nesting season."
},
"res_299": {
type: "result",
scenarioId: "420_9",
title: "Scenario 299 — High Species Diversity on Fallow or Non-Cropland ($885.06/ac | Typ. 5 ac = $4,425.31)",
criteria: "Field-scale high-diversity wildlife/pollinator mix on fallow or non-cropland.",
om: "Protect from grazing/mowing during establishment; manage disturbance outside nesting season."
},
"res_300": {
type: "result",
scenarioId: "420_10",
title: "Scenario 300 — Specialized Habitat Requirements on Non-Cropland ($1,862.08/ac | Typ. 5 ac = $9,310.39)",
criteria: "Field-scale specialized seed mix on non-cropland.",
om: "Protect from grazing/mowing during establishment; manage disturbance outside nesting season."
}
}
},
"422": {
code: "422",
name: "Hedgerow Planting",
category: "Wildlife / Habitat",
source: "CPS 422 (Nov 2024) & FY26 Scenarios",
rcSummary: "Terrestrial/Aquatic Habitat, Beneficial Invertebrates/IPM, Air Quality PM/Drift/Odor, Visual/Physical Screens",
supportingPractices: {
"Establishment & Site Prep": ["490 Tree/Shrub Site Prep", "484 Mulching", "441 Irrigation System, Microirrigation", "382 Fence", "472 Access Control"],
"Habitat & Pest Augmentation": ["420 Wildlife Habitat Planting", "649 Structures for Wildlife", "595 Pest Management Conservation System"],
"Erosion / Nutrient / Snow Trapping Alternatives": ["380 Windbreak/Shelterbelt Estab.", "391 Riparian Forest Buffer", "393 Filter Strip", "601 Vegetative Barrier", "311 Alley Cropping"]
},
startNode: "gate1",
nodes: {
"gate1": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 1: Primary Purpose Check",
text: "Is the primary purpose erosion control, nutrient trapping, or snow trapping?",
options: [
{ label: "Yes — Primary Purpose Is Erosion, Nutrient, or Snow Trapping", next: "stop_purpose" },
{ label: "No — Primary Purpose Is Wildlife, IPM, or Air Quality/Visual Screen", next: "gate2" }
]
},
"stop_purpose": {
type: "stop",
shape: "red-hexagon",
title: "DO NOT USE CODE 422",
text: "Code 422 is not intended for erosion control, nutrient filtration, or snow management.",
action: "Use Windbreak/Shelterbelt Establishment (380), Riparian Forest Buffer (391), Filter Strip (393), Vegetative Barrier (601), Cross Wind Trap Strips (589C), or Alley Cropping (311)."
},
"gate2": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 2: Grassland Fragmentation Check",
text: "Is the site located within an open grassland supporting area-sensitive grassland nesting birds?",
options: [
{ label: "Yes — Open Grassland with Area-Sensitive Birds", next: "stop_grassland" },
{ label: "No — Suitable Landscape Context for Linear Cover", next: "capp_select" }
]
},
"stop_grassland": {
type: "stop",
shape: "red-hexagon",
title: "AVOID HEDGEROW PLANTING (DO NOT USE 422)",
text: "Linear woody cover fragments open grassland and increases nest predation and cowbird parasitism.",
action: "Use Wildlife Habitat Planting (420) or Early Successional Habitat Development (647) instead."
},
"capp_select": {
type: "question",
shape: "yellow-diamond",
title: "CAPP Narrative & Hedgerow Type",
text: "Select the hedgerow configuration and primary objective:",
options: [
{ label: "00N — Wildlife Hedgerow (Woody linear cover, >= 1 woody row)", next: "q_terrain" },
{ label: "01N — Beetle Bank (Raised linear mound for beneficial insects)", next: "res_32" },
{ label: "02N — Hedgerow Screen (Woody plants &/or tall grasses >= 3 ft)", next: "q_screen" }
]
},
"q_terrain": {
type: "question",
shape: "yellow-diamond",
title: "Site Terrain & Planting Method (00N)",
text: "Select site access and planting labor requirements:",
options: [
{ label: "Rugged / difficult-to-access terrain requiring hand planting", next: "res_30" },
{ label: "Flat, accessible terrain suitable for machine planting", next: "res_31" }
]
},
"q_screen": {
type: "question",
shape: "yellow-diamond",
title: "Screening / Air Quality Application Type (02N)",
text: "Select the target screening application:",
options: [
{ label: "Poultry house exhaust fans (odor & particulate matter mitigation)", next: "res_29" },
{ label: "Field pesticide drift, odor, dust, or visual/noise screen (50-65% density)", next: "stop_screen_guidance" }
]
},
"res_30": {
type: "result",
scenarioId: "422_2",
title: "Scenario 30 — Wildlife Hedgerow, High Labor ($3.32/ft | Typ. 800 ft = $2,656.92)",
criteria: "Multi-species woody linear wildlife cover hand-planted on rugged terrain.",
om: "Protect from unwanted fire & grazing; rejuvenate <= 1/3 length/width outside nesting season."
},
"res_31": {
type: "result",
scenarioId: "422_3",
title: "Scenario 31 — Wildlife Hedgerow, Low Labor ($2.35/ft | Typ. 800 ft = $1,875.97)",
criteria: "Multi-species woody linear wildlife cover machine-planted on accessible terrain.",
om: "Protect from unwanted fire & grazing; rejuvenate <= 1/3 length/width outside nesting season."
},
"res_32": {
type: "result",
scenarioId: "422_4",
title: "Scenario 32 — Beetle Bank ($1.92/ft | Typ. 750 ft = $1,442.20)",
criteria: "Raised linear earth mound planted with perennial bunchgrasses for overwintering predatory insects. Protect from pesticide drift (Agronomy Tech Note 9).",
om: "Protect from tillage, unwanted fire, and pesticide drift; renovate in sections outside overwintering periods."
},
"res_29": {
type: "result",
scenarioId: "422_1",
title: "Scenario 29 — Grasses for Poultry House Air Quality Mitigation ($3.23/ft | Typ. 180 ft = $581.09)",
criteria: "Tall warm-season/stiff grasses planted down-wind of poultry house exhaust fans.",
om: "Maintain >= 3 ft height; prevent weed invasion and protect from equipment damage."
},
"stop_screen_guidance": {
type: "stop",
shape: "red-hexagon",
title: "DESIGN GUIDANCE ONLY (NO SEPARATE PAYMENT SCENARIO)",
text: "Field drift, dust, and visual/noise screens (50-65% porosity) do not have a standalone payment scenario in the FY26 schedule.",
action: "Select chemical-tolerant species and exclude pollinator-attractive plants if intercepting toxic pesticide drift. Use Scenario 30 or 31 only if meeting full woody wildlife hedgerow criteria."
}
}
},
"643": {
code: "643",
name: "Restoration of Rare or Declining Natural Communities",
category: "Wildlife / Habitat",
source: "CPS 643 (Mar 2017), FY27 CAPP & FY26 Scenarios",
rcSummary: "Degraded Plant Condition, Inadequate Terrestrial & Aquatic Habitat, Erosion, Water Quality & Hydrology",
supportingPractices: {
  "Engineering & Hydrology": ["356 Dike and Levee", "362 Diversion", "378 Pond", "410 Grade Stabilization Structure", "580 Streambank Protection", "584 Channel Bed Stabilization", "587 Structure for Water Control"],
  "Vegetative & Facilitating": ["327 Conservation Cover", "338 Prescribed Burning", "314 Brush Mgmt", "315 Herbaceous Weed Treatment"],
  "Protection & Management": ["382 Fence", "472 Access Control", "528 Prescribed Grazing", "666 Forest Stand Improvement"],
  "Non-Rare Community or Standard Restoration Alternatives": ["657 Wetland Restoration", "645 Wildlife Habitat Management", "550 Range Planting", "612 Tree/Shrub Establishment"]
},
startNode: "gate1",
nodes: {
"gate1": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 1: Historical Site Verification",
text: "Did the site historically support a rare or declining natural community (verified by ecological site description, soils, or historical records)?",
options: [
{ label: "No — Site Did Not Historically Support This Community", next: "stop_history" },
{ label: "Yes — Verified Historical Rare/Declining Community", next: "gate2" }
]
},
"stop_history": {
type: "stop",
shape: "red-hexagon",
title: "DO NOT USE CODE 643",
text: "Code 643 requires restoring a rare or declining natural community that historically occupied the site.",
action: "Use Wetland Restoration (657), Wildlife Habitat Management (645), Range Planting (550), or Tree/Shrub Establishment (612)."
},
"gate2": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 2: Annual Management Sufficiency",
text: "Can target plant and animal community conditions be met solely through annual management actions without abiotic/biotic restoration?",
options: [
{ label: "Yes — Annual Management Alone Meets Targets", next: "stop_annual" },
{ label: "No — Abiotic or Structural Restoration Needed", next: "capp_select" }
]
},
"stop_annual": {
type: "stop",
shape: "red-hexagon",
title: "DO NOT USE CODE 643",
text: "Code 643 is ineligible where annual management alone achieves the target community.",
action: "Use Prescribed Burning (338), Prescribed Grazing (528), Forest Stand Improvement (666), or Pest/Weed Mgmt (595 / 315)."
},
"capp_select": {
type: "question",
shape: "yellow-diamond",
title: "FY27 CAPP Narrative Code",
text: "Select the applicable FY27 CAPP Narrative category:",
options: [
{ label: "00N-CRP-R — CRP Re-enrollment (Maintain existing rare/declining community)", next: "res_crp" },
{ label: "00N — Standard Abiotic/Biotic Community Restoration (Micro-topography)", next: "q_micro" },
{ label: "01N — Stream & Floodplain Restoration (Low-tech structures)", next: "q_stream" },
{ label: "02N — Oyster Reef Restoration (Shallow subtidal, without harvest)", next: "q_oyster" }
]
},
"res_crp": {
type: "result",
shape: "blue-om",
scenarioId: "643_CRP",
title: "00N-CRP-R — CRP Re-enrollment (Standalone O&M)",
criteria: "Maintain existing rare or declining natural communities to meet planned CRP objectives.",
om: "Maintain restored abiotic and biotic conditions per CRP contract; control invasive species."
},
"q_micro": {
type: "question",
shape: "yellow-diamond",
title: "Micro-Topography Depth & Equipment (00N)",
text: "Select the excavation depth and equipment required:",
options: [
{ label: "Shallow Micro-Topographic Features (2-6 in.) — Normal Farming Equipment", next: "res_5" },
{ label: "Deep Micro-Topographic Features (6-12 in.) — Heavy Equipment", next: "res_6" }
]
},
"q_stream": {
type: "question",
shape: "yellow-diamond",
title: "Low-Tech Stream Structure Type (01N)",
text: "Select the low-tech process-based restoration structure type:",
options: [
{ label: "Woody Structures — Beaver Dam Analogues (BDAs) or Post-Assisted Log Structures (PALS)", next: "res_221" },
{ label: "Rock Structures — Zuni Bowls, One-Rock Dams, or Rock Rundowns", next: "res_226" }
]
},
"q_oyster": {
type: "question",
shape: "yellow-diamond",
title: "Oyster Reef Implementation Method / Phase (02N)",
text: "Select the oyster reef restoration or monitoring method:",
options: [
{ label: "Bulk / Acreage Reef Construction (Bagged Dredging, Barge Crane, or New Site Shell)", next: "q_oyster_bulk" },
{ label: "Tote-Based Reef Restoration (Spat on Shell Only or Shell Only)", next: "q_oyster_tote" },
{ label: "Oyster Bar Construction (Base & Implementation) or Annual Monitoring (Yrs 1-3)", next: "q_oyster_bar" }
]
},
"q_oyster_bulk": {
type: "question",
shape: "yellow-diamond",
title: "Bulk Oyster Reef Method",
text: "Select the bulk installation scenario:",
options: [
{ label: "Bagged Dredging, Spat on Shell ($21,937.35/ac)", next: "res_247" },
{ label: "Barge Crane ($24,843.80/ac)", next: "res_289" },
{ label: "Restoration, Planted Shells on New Site ($19,332.73/ac)", next: "res_352" }
]
},
"q_oyster_tote": {
type: "question",
shape: "yellow-diamond",
title: "Tote-Based Oyster Reef Method",
text: "Select the tote-based scenario:",
options: [
{ label: "Restoration, Spat on Shell Only ($1,234.49/tote | Typ. 60 totes)", next: "res_310" },
{ label: "Restoration, Communities with Shell Only ($76.87/tote | Typ. 90 totes)", next: "res_331" }
]
},
"q_oyster_bar": {
type: "question",
shape: "yellow-diamond",
title: "Oyster Bar or Monitoring Scenario",
text: "Select the oyster bar or monitoring phase:",
options: [
{ label: "Oyster Bar, Spat on Cultch (Base $15,284.22 + Impl. $7,075.30/ac-in)", next: "res_436_457" },
{ label: "Oyster Bar, No Spat on Cultch (Base $2,636.66 + Impl. $6,002.24/ac-in)", next: "res_478_499" },
{ label: "Oyster Reef Monitoring (Year 1: $3,574.81 | Year 2: $7,452.39 | Year 3: $12,071.11)", next: "res_373_415" }
]
},
"res_5": {
type: "result",
scenarioId: "643_1",
title: "Scenario 5 — Shallow Micro-Topographic Features ($60.98/ac | Typ. 20 ac = $1,219.54)",
criteria: "Create 2-6 in. micro-topography using normal farming equipment.",
om: "Follow post-restoration monitoring schedule; control reinvasion by noxious/invasive species."
},
"res_6": {
type: "result",
scenarioId: "643_2",
title: "Scenario 6 — Deep Micro-Topographic Features ($166.90/ac | Typ. 20 ac = $3,337.99)",
criteria: "Create 6-12 in. micro-topography using heavy equipment.",
om: "Follow post-restoration monitoring schedule; control reinvasion by noxious/invasive species."
},
"res_221": {
type: "result",
scenarioId: "643_3",
title: "Scenario 221 — Beaver Dam Analogues or PALS ($57.05/lin ft | Typ. 400 ft = $22,818.24)",
criteria: "Low-tech woody stream/floodplain structures to kick-start natural hydrologic processes.",
om: "Inspect structures after high-flow events; add woody material as needed for adaptive management."
},
"res_226": {
type: "result",
scenarioId: "643_4",
title: "Scenario 226 — Rock Structure ($926.36/cu yd | Typ. 4.5 cu yd = $4,168.64)",
criteria: "Low-tech rock structures (Zuni bowls, one-rock dams, rock rundowns) to arrest headcuts and reconnect floodplains.",
om: "Inspect rock structures after major runoff events and reset displaced stone."
},
"res_247": {
type: "result",
scenarioId: "643_5",
title: "Scenario 247 — Bagged Dredging, Spat on Shell ($21,937.35/ac)",
criteria: "Subtidal oyster reef restoration without harvest using bagged spat-on-shell.",
om: "Prohibit harvest; conduct scheduled reef monitoring."
},
"res_289": {
type: "result",
scenarioId: "643_6",
title: "Scenario 289 — Barge Crane ($24,843.80/ac)",
criteria: "Subtidal oyster reef restoration deployed via barge crane without harvest.",
om: "Prohibit harvest; conduct scheduled reef monitoring."
},
"res_352": {
type: "result",
scenarioId: "643_7",
title: "Scenario 352 — Restoration, Planted Shells on New Site ($19,332.73/ac)",
criteria: "Subtidal oyster reef establishment on new site without harvest.",
om: "Prohibit harvest; conduct scheduled reef monitoring."
},
"res_310": {
type: "result",
scenarioId: "643_8",
title: "Scenario 310 — Restoration, Spat on Shell Only ($1,234.49/tote | Typ. 60 totes = $74,069.18)",
criteria: "Tote-based deployment of spat-on-shell on shallow subtidal soils without harvest.",
om: "Prohibit harvest; conduct scheduled reef monitoring."
},
"res_331": {
type: "result",
scenarioId: "643_9",
title: "Scenario 331 — Restoration, Communities with Shell Only ($76.87/tote | Typ. 90 totes = $6,918.71)",
criteria: "Tote-based deployment of cultch shell without harvest.",
om: "Prohibit harvest; conduct scheduled reef monitoring."
},
"res_436_457": {
type: "result",
scenarioId: "643_10",
title: "Scenarios 436 & 457 — Oyster Bar, Spat on Cultch (Base $15,284.22 + Impl. $7,075.30/ac-in)",
criteria: "Oyster bar base preparation and spat-on-cultch implementation without harvest.",
om: "Prohibit harvest; monitor spat recruitment and reef elevation."
},
"res_478_499": {
type: "result",
scenarioId: "643_11",
title: "Scenarios 478 & 499 — Oyster Bar, No Spat on Cultch (Base $2,636.66 + Impl. $6,002.24/ac-in)",
criteria: "Oyster bar base preparation and cultch implementation without harvest.",
om: "Prohibit harvest; monitor natural spat recruitment and reef elevation."
},
"res_373_415": {
type: "result",
scenarioId: "643_12",
title: "Scenarios 373, 394 & 415 — Oyster Reef Monitoring (Yr 1: $3,574.81 | Yr 2: $7,452.39 | Yr 3: $12,071.11)",
criteria: "Post-restoration oyster reef biological and structural monitoring across Years 1-3.",
om: "Submit annual monitoring data for adaptive management."
}
}
},
"645": {
code: "645",
name: "Wildlife Habitat Management",
category: "Wildlife / Habitat",
source: "CPS 645 (2026 - NHCP Notice 179), FY27 CAPP & FY26 Scenarios",
rcSummary: "Terrestrial Habitat for Wildlife & Invertebrates (Food, Cover, Connectivity, Conflict Reduction)",
supportingPractices: {
  "Fencing, Watering & Access": ["382 Fence", "472 Access Control", "614 Watering Facility"],
  "Disturbance & Pest Management": ["314 Brush Mgmt", "315 Herbaceous Weed Treatment", "595 Pest Mgmt"],
  "Screens, Buffers & Nesting Structures": ["422 Hedgerow Planting", "649 Structures for Wildlife", "390 Riparian Herbaceous Cover", "393 Filter Strip"],
  "More Specific Practice Alternatives": ["420 Wildlife Habitat Planting", "647 Early Successional Habitat Dev-Mgmt", "338 Prescribed Burning", "528 Prescribed Grazing", "646 Seasonal Water Mgmt for Wildlife"]
},
startNode: "gate1",
nodes: {
"gate1": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 1: More Specific NRCS Practice Check",
text: "Does a MORE SPECIFIC NRCS practice standard exist for the primary action needed on this site?",
options: [
{ label: "Yes — A Specific Standard Covers the Primary Action", next: "stop_specific" },
{ label: "No — Action Fits Code 645 Management Criteria", next: "capp_select" }
]
},
"stop_specific": {
type: "stop",
shape: "red-hexagon",
title: "DO NOT USE CODE 645",
text: "Code 645 cannot substitute for a more specific NRCS conservation practice standard.",
action: "Use the specific standard instead: Perennial Planting (420), Early Successional Habitat (647), Wetland (644), Riparian (390), Structures (649), Prescribed Burn (338), or Prescribed Grazing (528)."
},
"capp_select": {
type: "question",
shape: "yellow-diamond",
title: "FY27 CAPP Narrative Code",
text: "Select the applicable FY27 CAPP Narrative level:",
options: [
{ label: "00N — Standard Mgmt (Enable movement & provide food/cover to meet minimum WHEG)", next: "q_action" },
{ label: "01N — High Enhancement (Exceed & improve upon WHEG even if baseline already passes)", next: "q_action" }
]
},
"q_action": {
type: "question",
shape: "yellow-diamond",
title: "Target Habitat Management Action",
text: "Select the primary wildlife habitat management action:",
options: [
{ label: "Plant annual seasonal food or cover", next: "q_annual_land" },
{ label: "Set back woody succession / increase structural diversity", next: "q_disturb" },
{ label: "Modify crop harvest timing for nesting birds (Silage-Corn Rotation)", next: "res_628" },
{ label: "Wildlife movement passage or carnivore deterrent fencing", next: "q_fence" }
]
},
"q_annual_land": {
type: "question",
shape: "yellow-diamond",
title: "Land Use & Cropping Season Impact",
text: "Select the land use and foregone income status:",
options: [
{ label: "Non-Cropland (Mowing, disking, fertilizer & annual seed)", next: "res_327" },
{ label: "Cropland — With Foregone Income (Replaces cash crop)", next: "res_392" },
{ label: "Cropland — Without Foregone Income (Outside cash-crop season)", next: "res_393" }
]
},
"q_disturb": {
type: "question",
shape: "yellow-diamond",
title: "Disturbance Method & Bare Ground Need",
text: "Select the mechanical vegetation management method:",
options: [
{ label: "Mowing (Set back woody growth & increase height diversity)", next: "res_586" },
{ label: "Disking (Create bare ground & early successional brood habitat)", next: "res_607" }
]
},
"q_fence": {
type: "question",
shape: "yellow-diamond",
title: "Fence Passage or Carnivore Deterrence Method",
text: "Select the fence management or deterrent scenario:",
options: [
{ label: "Adjustable-Wire / Lay-Down Fence & Gates (Wildlife passage)", next: "res_397" },
{ label: "Turbo Fladry Carnivore Deterrent Fence — Year One (Install & takedown)", next: "res_398" },
{ label: "Turbo Fladry Carnivore Deterrent Fence — Years Two Through Five", next: "res_399" }
]
},
"res_327": {
type: "result",
scenarioId: "645_1",
title: "Scenario 327 — Non-Cropland ($449.35/ac | Typ. 10 ac = $4,493.45)",
criteria: "Mowing, disking, cultipacking, fertilizer, and annual wildlife seed on non-cropland.",
om: "Re-evaluate WHEG post-treatment; adjust timing/intensity to avoid wildlife/nest mortality."
},
"res_392": {
type: "result",
scenarioId: "645_2",
title: "Scenario 392 — Cropland, Foregone Income ($694.58/ac | Typ. 10 ac = $6,945.80)",
criteria: "Planting annual wildlife forage/cover on cropland in lieu of a cash crop.",
om: "Re-evaluate WHEG post-treatment; maintain cover through target wildlife use window."
},
"res_393": {
type: "result",
scenarioId: "645_3",
title: "Scenario 393 — Cropland, without Foregone Income ($223.62/ac | Typ. 10 ac = $2,236.20)",
criteria: "Establishing annual wildlife forage/cover outside the cash-crop season.",
om: "Re-evaluate WHEG post-treatment; adjust timing to avoid nesting mortality."
},
"res_586": {
type: "result",
scenarioId: "645_4",
title: "Scenario 586 — Mowing ($327.33/ac | Typ. 2 ac = $654.65)",
criteria: "Rotational mowing to set back woody succession and increase structural diversity.",
om: "Schedule mowing outside primary nesting and brood-rearing periods."
},
"res_607": {
type: "result",
scenarioId: "645_5",
title: "Scenario 607 — Disking ($204.93/ac | Typ. 2 ac = $409.86)",
criteria: "Strip or block disking to expose bare ground and stimulate annual forbs.",
om: "Avoid steep slopes prone to erosion; schedule outside nesting season."
},
"res_628": {
type: "result",
scenarioId: "645_6",
title: "Scenario 628 — Delayed Harvest, Silage-Corn Rotation ($815.04/ac | Typ. 20 ac = $16,300.81)",
criteria: "Delay forage harvest in silage-corn rotations to prevent grassland bird nest destruction.",
om: "Verify harvest deferral dates per state wildlife biology guidelines."
},
"res_397": {
type: "result",
scenarioId: "645_7",
title: "Scenario 397 — Adjustable-Wire / Lay-Down Fence & Gates ($0.12/lin ft | Typ. 5,280 ft = $633.57)",
criteria: "Game camera monitoring and seasonal wire/gate adjustments for ungulate/wildlife movement.",
om: "Log seasonal wire drop/raise dates and maintain fence tension."
},
"res_398": {
type: "result",
scenarioId: "645_8",
title: "Scenario 398 — Turbo Fladry Carnivore Deterrent Fence, Year One ($1.95/lin ft | Typ. 5,280 ft = $10,306.86)",
criteria: "Materials, installation, energizer upkeep, and seasonal takedown for carnivore deterrence.",
om: "Check voltage and flag spacing weekly; remove and store cleanly at season end."
},
"res_399": {
type: "result",
scenarioId: "645_9",
title: "Scenario 399 — Turbo Fladry Carnivore Deterrent Fence, Years 2-5 ($0.55/lin ft | Typ. 5,280 ft = $2,882.54)",
criteria: "Seasonal re-installation, monitoring, and takedown in Years 2 through 5.",
om: "Inspect flags and polywire before each deployment; maintain energizer charge."
}
}
},
    "646": {
    code: "646",
    name: "Seasonal Water Management for Wildlife",
    category: "Wildlife / Habitat",
    source: "CPS 646 (Nov 2024), FY27 CAPP & FY26 Scenarios",
    rcSummary: "Terrestrial & Aquatic Habitat for Wildlife, Waterfowl, Shorebirds, Amphibians & Fish",
    supportingPractices: {
   "Water Control & Infrastructure": ["356 Dike and Levee", "587 Structure for Water Control", "533 Pumping Plant", "362 Diversion", "430 Irrigation Pipeline"],
   "Vegetation, Pest & Access Control": ["314 Brush Mgmt", "315 Herbaceous Weed Treatment", "338 Prescribed Burning", "382 Fence", "472 Access Control", "420 Wildlife Habitat Planting"],
   "Permanent Restoration or Water Storage Alternatives": ["657 Wetland Restoration", "658 Wetland Creation", "614 Watering Facility", "378 Pond"]
    },
    startNode: "gate1",
    nodes: {
      "gate1": {
        type: "gate",
        shape: "black-diamond",
        title: "Pre-Condition 1: Water Control Infrastructure Check",
        text: "Is the necessary water control infrastructure (dikes, water control structures, or pumps) already in place or planned via separate practices?",
        options: [
          { label: "No — Infrastructure Not in Place or Planned", next: "stop_infra" },
          { label: "Yes — Infrastructure Present or Planned", next: "gate2" }
        ]
      },
      "stop_infra": {
        type: "stop",
        shape: "red-hexagon",
        title: "INFRASTRUCTURE REQUIRED FIRST (DO NOT USE 646 ALONE)",
        text: "Code 646 covers seasonal water manipulation and requires functional water-control infrastructure.",
        action: "Plan and install Dike and Levee (356), Structure for Water Control (587), or Pumping Plant (533) first."
      },
      "gate2": {
        type: "gate",
        shape: "black-diamond",
        title: "Pre-Condition 2: Scope Exclusion Check",
        text: "Is the primary purpose permanent wetland restoration, livestock watering, or agricultural wastewater management?",
        options: [
          { label: "Yes — Permanent Restoration, Livestock Water, or Wastewater", next: "stop_scope" },
          { label: "No — Seasonal Wildlife / Fish Shallow-Water Habitat", next: "capp_select" }
        ]
      },
      "stop_scope": {
        type: "stop",
        shape: "red-hexagon",
        title: "OUT OF SCOPE FOR CODE 646",
        text: "Code 646 applies only to seasonal water management for wildlife or fish habitat.",
        action: "Use Wetland Restoration (657), Wetland Creation (658), Watering Facility (614), or Pond (378)."
      },
      "capp_select": {
        type: "question",
        shape: "yellow-diamond",
        title: "FY27 CAPP Narrative Code",
        text: "Select the applicable FY27 CAPP Narrative objective:",
        options: [
          { label: "00N-CRP-R — CRP Re-enrollment (Maintain existing seasonal water regime)", next: "res_crp" },
          { label: "00N — Shallow Water Habitat (Manage hydroperiod & drawdown)", next: "q_taxa" }
        ]
      },
      "res_crp": {
        type: "result",
        shape: "blue-om",
        scenarioId: "646_CRP",
        title: "00N-CRP-R — CRP Re-enrollment (Standalone O&M)",
        criteria: "Maintain seasonal water regime and structures to meet planned CRP objectives.",
        om: "Manage hydroperiod and drawdown per CRP contract; maintain visible depth gauge and control structures."
      },
      "q_taxa": {
        type: "question",
        shape: "yellow-diamond",
        title: "Primary Target Taxa & Flow Requirement (00N)",
        text: "Select the target species group and water flow pattern:",
        options: [
          { label: "Cropland (e.g., Rice) for Fish — Continual Pumped Flow + Fish Passage", next: "res_7" },
          { label: "Wildlife / Waterfowl / Shorebirds / Amphibians — Managed Seasonal Standing Water", next: "q_delivery" }
        ]
      },
      "q_delivery": {
        type: "question",
        shape: "yellow-diamond",
        title: "Water Delivery Method",
        text: "How is seasonal water supplied to the impoundment?",
        options: [
          { label: "Capture / Divert Water (Gravity / runoff — no mechanical pumping)", next: "q_cap_labor" },
          { label: "Pump Water Onsite (Mechanical pumping required)", next: "q_pump_labor" }
        ]
      },
      "q_cap_labor": {
        type: "question",
        shape: "yellow-diamond",
        title: "Site Management & Labor Intensity (Capture Water)",
        text: "Select the expected monitoring and beaver/structure maintenance intensity:",
        options: [
          { label: "High Labor — Active beaver activity or inefficient control structures", next: "res_3" },
          { label: "Low Labor — Reliable gravity capture with minimal maintenance", next: "res_4" }
        ]
      },
      "q_pump_labor": {
        type: "question",
        shape: "yellow-diamond",
        title: "Site Management & Labor Intensity (Pump Water)",
        text: "Select the expected pumping, monitoring, and beaver/structure maintenance intensity:",
        options: [
          { label: "High Labor — Active beaver activity or complex control adjustments", next: "res_5" },
          { label: "Low Labor — Standard pumping with low structure maintenance", next: "res_6" }
        ]
      },
      "res_3": {
        type: "result",
        scenarioId: "646_1",
        title: "Scenario 3 — Capture Water, High Labor Inputs Required ($53.82/ac | Typ. 75 ac = $4,036.22)",
        criteria: "Gravity-captured seasonal water on sites with high beaver activity or complex adjustments.",
        om: "Install visible depth gauge; log depth weekly; inspect structures/beaver activity; execute planned drawdown."
      },
      "res_4": {
        type: "result",
        scenarioId: "646_2",
        title: "Scenario 4 — Capture Water, Low Labor Inputs Required ($30.54/ac | Typ. 75 ac = $2,290.70)",
        criteria: "Gravity-captured seasonal water on sites with low maintenance needs.",
        om: "Install visible depth gauge; log depth weekly; execute planned drawdown."
      },
      "res_5": {
        type: "result",
        scenarioId: "646_3",
        title: "Scenario 5 — Pump Water, High Labor Inputs Required ($62.15/ac | Typ. 75 ac = $4,661.54)",
        criteria: "Mechanically pumped seasonal water on sites with high beaver activity or control adjustments.",
        om: "Install visible depth gauge; log depth 2x/week during pumping; execute planned drawdown."
      },
      "res_6": {
        type: "result",
        scenarioId: "646_4",
        title: "Scenario 6 — Pump Water, Low Labor Inputs Required ($45.48/ac | Typ. 75 ac = $3,410.90)",
        criteria: "Mechanically pumped seasonal water on sites with low maintenance needs.",
        om: "Install visible depth gauge; log depth 2x/week during pumping; execute planned drawdown."
      },
      "res_7": {
        type: "result",
        scenarioId: "646_5",
        title: "Scenario 7 — Pump Water on Cropland for Fish, Continual Flow ($118.26/ac | Typ. 125 ac = $14,782.19)",
        criteria: "Continuous pumped water flow, levee maintenance, and fish passage on rice/cropland.",
        om: "Monitor water temperature and dissolved oxygen (DO) regularly; maintain screens and levees."
      }
    }
  },
  "647": {
    code: "647",
    name: "Early Successional Habitat Development-Management",
    category: "Wildlife / Habitat",
    source: "CPS 647 (Nov 2022), FY27 CAPP & FY26 Scenarios",
    rcSummary: "Terrestrial & Aquatic Wildlife Habitat (Early Successional Food, Nesting, Brood-Rearing, Escape Cover)",
    supportingPractices: {
    "Disturbance & Invasive Control": ["338 Prescribed Burning", "394 Firebreak", "314 Brush Mgmt", "315 Herbaceous Weed Treatment", "384 Woody Residue Treatment"],
    "Erosion & Livestock Management": ["528 Prescribed Grazing", "382 Fence", "472 Access Control", "342 Critical Area Planting"],
    "Artificial Seeding or Timber Stand Alternatives": ["420 Wildlife Habitat Planting", "327 Conservation Cover", "550 Range Planting", "666 Forest Stand Improvement"]
    },
    startNode: "gate1",
    nodes: {
      "gate1": {
        type: "gate",
        shape: "black-diamond",
        title: "Pre-Condition 1: Native Seed Bank / Rootstock Check",
        text: "Is the desirable native seed bank or rootstock depleted such that artificial seeding is required after disturbance?",
        options: [
          { label: "Yes — Native Seed Bank Depleted (Seeding Required)", next: "stop_seed" },
          { label: "No — Native Seed Bank / Rootstock Will Regenerate", next: "gate2" }
        ]
      },
      "stop_seed": {
        type: "stop",
        shape: "red-hexagon",
        title: "SEEDING REQUIRED FIRST (DO NOT USE 647 ALONE)",
        text: "Code 647 relies on natural regeneration from existing seed banks or rootstock.",
        action: "Establish native cover first using Wildlife Habitat Planting (420), Conservation Cover (327), or Range Planting (550)."
      },
      "gate2": {
        type: "gate",
        shape: "black-diamond",
        title: "Pre-Condition 2: Scope Exclusion Check",
        text: "Is the primary objective commercial timber production or noxious/invasive weed eradication alone?",
        options: [
          { label: "Yes — Primary Goal Is Timber Production or Weed Eradication Alone", next: "stop_scope" },
          { label: "No — Primary Goal Is Early Successional Wildlife Habitat", next: "capp_select" }
        ]
      },
      "stop_scope": {
        type: "stop",
        shape: "red-hexagon",
        title: "OUT OF SCOPE FOR CODE 647",
        text: "Code 647 applies only where creating or maintaining early successional wildlife habitat is the primary purpose.",
        action: "Use Forest Stand Improvement (666), Brush Management (314), or Herbaceous Weed Treatment (315)."
      },
      "capp_select": {
        type: "question",
        shape: "yellow-diamond",
        title: "FY27 CAPP Narrative Code", text: "Select the applicable FY27 CAPP Narrative objective:",
options: [
{ label: "00N-CRP-R — CRP Re-enrollment (Rotational disturbance <= 1/3 per year)", next: "res_crp" },
{ label: "00N — Early Successional Habitat Development / Management", next: "q_cover" }
]
},
"res_crp": {
type: "result",
shape: "blue-om",
scenarioId: "647_CRP",
title: "00N-CRP-R — CRP Re-enrollment (Standalone O&M)",
criteria: "Maintain early successional habitat on enrolled CRP acreage.",
om: "Apply rotational disturbance (<= 1/3 per year) per CRP contract outside primary nesting/brood-rearing season."
},
"q_cover": {
type: "question",
shape: "yellow-diamond",
title: "Existing Vegetative Cover & Landscape Setting (00N)",
text: "Select the existing vegetation structure and site condition:",
options: [
{ label: "1. Open Herbaceous / Pasture / Field Edge / Pivot Corner", next: "q_herb_goal" },
{ label: "2. Abrupt Forest-to-Field Transition ('Hard Edge')", next: "res_49" },
{ label: "3. Overgrown / Closed-Canopy Scrub-Shrub Stand", next: "res_70" },
{ label: "4. Closed-Canopy or Degraded Forest Stand (Creating Opening)", next: "q_forest_method" }
]
},
"q_herb_goal": {
type: "question",
shape: "yellow-diamond",
title: "Primary Disturbance Goal (Open Herbaceous)",
text: "Select the vegetation disturbance method needed:",
options: [
{ label: "Mowing — Increase height diversity & set back woody encroachment", next: "res_1" },
{ label: "Disking — Expose bare ground for annual forbs & brood habitat", next: "res_2" }
]
},
"q_forest_method": {
type: "question",
shape: "yellow-diamond",
title: "Tree Removal Method (Closed-Canopy Forest Opening)",
text: "Select the equipment and treatment method:",
options: [
{ label: "Hand Tools — Chainsaws & herbicide stump treatment", next: "res_91" },
{ label: "Machinery — Heavy equipment (e.g., dozer / feller-buncher)", next: "res_112" }
]
},
"res_1": {
type: "result",
scenarioId: "647_1",
title: "Scenario 1 — Mowing ($327.33/ac | Typ. 2 ac = $654.65)",
criteria: "Rotational mowing of woody plants and dense grass to create structural diversity.",
om: "Rotate treatments across adjacent blocks every 2-5 yrs; mow outside primary nesting season."
},
"res_2": {
type: "result",
scenarioId: "647_2",
title: "Scenario 2 — Disking ($204.93/ac | Typ. 2 ac = $409.86)",
criteria: "Light strip/block disking at field edges or odd areas to stimulate native annual forbs.",
om: "Rotate strips every 2-5 yrs; follow contour on sloping ground; disk outside nesting season."
},
"res_49": {
type: "result",
scenarioId: "647_3",
title: "Scenario 49 — Edge Feathering ($808.55/ac | Typ. 1 ac = $808.55)",
criteria: "Felling/hinging trees along a 30-50 ft wide forest-to-field transition zone.",
om: "Maintain soft shrub/herbaceous edge via periodic selective cutting every 3-5 yrs outside nesting season."
},
"res_70": {
type: "result",
scenarioId: "647_4",
title: "Scenario 70 — Creating Early Successional Habitat in Overgrown Scrub-Shrub ($1,490.52/ac | Typ. 2 ac = $2,981.03)",
criteria: "Mechanical mulching or brush cutting to rejuvenate overgrown scrub-shrub stands.",
om: "Rotate block treatments every 3-5 yrs before canopy closure; avoid nesting periods."
},
"res_91": {
type: "result",
scenarioId: "647_5",
title: "Scenario 91 — Forest Opening with Hand Tools ($1,862.80/ac | Typ. 2 ac = $3,725.60)",
criteria: "Creating forest openings using chainsaws and targeted stump herbicide treatment.",
om: "Control invasive sprouts; re-treat openings on a 3-5 yr rotation outside nesting season."
},
"res_112": {
type: "result",
scenarioId: "647_6",
title: "Scenario 112 — Forest Opening with Machinery ($2,006.66/ac | Typ. 2 ac = $4,013.31)",
criteria: "Creating forest openings using heavy machinery (dozer/brush cutter).",
om: "Stabilize disturbed soil if needed; maintain early successional stage every 3-5 yrs."
}
}
},
"649": {
code: "649",
name: "Structures for Wildlife",
category: "Wildlife / Habitat",
source: "CPS 649 (Sep 2014), FY27 CAPP & FY26 Scenarios",
rcSummary: "Inadequate Terrestrial & Aquatic Wildlife Habitat (Nesting, Perching, Cover, Escape, Passage)",
supportingPractices: {
  "Habitat & Food/Cover Establishment": ["420 Wildlife Habitat Planting", "645 Wildlife Habitat Management", "647 Early Successional Habitat"],
  "Fencing, Watering & Livestock Mgmt": ["382 Fence", "472 Access Control", "614 Watering Facility", "528 Prescribed Grazing"],
  "Riparian & Aquatic Enhancement": ["390 Riparian Herbaceous Cover", "391 Riparian Forest Buffer", "395 Stream Habitat Imp."],
  "Livestock, Human Access, or Erosion Alternatives": ["382 Fence (Livestock Containment)", "575 Trails and Walkways", "410 Grade Stabilization Structure"]
},
startNode: "gate1",
nodes: {
"gate1": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 1: Primary Structural Purpose Check",
text: "Is the structure needed primarily for livestock containment, human access, or gully/erosion control rather than wildlife habitat?",
options: [
{ label: "Yes — Livestock Containment, Human Access, or Erosion Control", next: "stop_scope" },
{ label: "No — Structure Replaces Missing Natural Wildlife Habitat Feature", next: "q_cat" }
]
},
"stop_scope": {
type: "stop",
shape: "red-hexagon",
title: "OUT OF SCOPE FOR CODE 649",
text: "Code 649 applies only to structures installed or retrofitted specifically for wildlife habitat or passage.",
action: "Use Fence (382), Trails and Walkways (575), or Grade Stabilization Structure (410)."
},
"q_cat": {
type: "question",
shape: "yellow-diamond",
title: "Wildlife Structure Category (FY27 CAPP: 00N)",
text: "Select the type of wildlife structure needed:",
options: [
{ label: "1. Nesting, Perching & Roosting Structures (Boxes, Poles, Platforms, Snags)", next: "q_nest" },
{ label: "2. Cover, Loafing, Basking & Hibernacula Structures (Brush Piles, Logs, Fish/Basking)", next: "q_cover" },
{ label: "3. Fence Retrofits, Markers & Wildlife Passage / Escape", next: "q_passage" },
{ label: "4. Carnivore Deterrence (12-Foot Electric Mat)", next: "res_76" }
]
},
"q_nest": {
type: "question",
shape: "yellow-diamond",
title: "Nesting, Perching & Roosting Structure Type",
text: "Select the specific nesting or perching structure:",
options: [
{ label: "Small Nesting Box — Without Pole (Tree/building mounted)", next: "res_79" },
{ label: "Small Nesting Box — With Wood Pole (No predator guard)", next: "res_2" },
{ label: "Large Nesting Box — Tree/building mounted (Waterfowl, bats, barn owls)", next: "res_55" },
{ label: "Nesting Box / Raptor Perch w/ Steel Pole + Predator Guard OR Underground Burrow", next: "res_4" },
{ label: "Artificial Raptor Perch or Platform (Utility pole)", next: "res_56" },
{ label: "Tree Structure for Raptors or Owls (Crown cut & reshaped)", next: "res_63" },
{ label: "Snag Creation and Single Hinge Cut", next: "res_62" }
]
},
"q_cover": {
type: "question",
shape: "yellow-diamond",
title: "Cover, Basking & Hibernacula Structure Type",
text: "Select the specific ground or aquatic cover structure:",
options: [
{ label: "Brush Pile and Hinge Cut — Small (10x20 ft; 2-3 trees < 12 in. dia.)", next: "res_7" },
{ label: "Brush Pile and Hinge Cut — Large (30x50 ft; 5-10 trees >= 12 in. dia.)", next: "res_77" },
{ label: "Downed Habitat Log (Large woody material for basking/shelter)", next: "res_57" },
{ label: "Hibernacula or Rock Structure (Excavated or above-ground)", next: "res_61" },
{ label: "Floating Basking Structure (Deepwater reptile/waterfowl resting)", next: "res_60" },
{ label: "Fish Habitat Structure (Deepwater cover/spawning)", next: "res_59" }
]
},
"q_passage": {
type: "question",
shape: "yellow-diamond",
title: "Fence Retrofit, Marker & Escape Structure Type",
text: "Select the wildlife passage or collision-prevention structure:",
options: [
{ label: "Escape Ramp (Retrofit for livestock watering troughs/tanks)", next: "res_5" },
{ label: "Fence Markers, Vinyl Undersill (Collision visibility)", next: "res_6" },
{ label: "Fence Retrofit for Wildlife (Smooth wire / spacing modification)", next: "res_58" },
{ label: "Gate for Safe Movement of Ungulates", next: "res_78" }
]
},
"res_79": { type: "result", scenarioId: "649_1", title: "Scenario 79 — Nesting Box, Small, without Pole ($55.46/each)", criteria: "Small cavity-nester box mounted on existing tree or structure.", om: "Clean out and inspect annually outside nesting season." },
"res_2": { type: "result", scenarioId: "649_2", title: "Scenario 2 — Nesting Box, Small, with Wood Pole ($86.55/each)", criteria: "Small nesting box mounted on wood pole without predator guard.", om: "Clean out and inspect pole stability annually outside nesting season." },
"res_55": { type: "result", scenarioId: "649_3", title: "Scenario 55 — Nesting Box, Large ($144.06/each)", criteria: "Large box mounted to tree/building for wood ducks, owls, or bats.", om: "Clean out, replenish shavings, and inspect hardware annually outside nesting season." },
"res_4": { type: "result", scenarioId: "649_4", title: "Scenario 4 — Nesting Box/Raptor Perch w/ Pole, or Underground Structure ($333.03/each)", criteria: "Steel pole with predator guard or underground burrowing owl structure.", om: "Inspect predator guard, pole/tunnel integrity, and clean outside nesting season." },
"res_56": { type: "result", scenarioId: "649_5", title: "Scenario 56 — Artificial Raptor Perch or Platform ($1,183.02/each)", criteria: "Utility pole installed with raptor perch or osprey/eagle nesting platform.", om: "Inspect pole stability and platform hardware annually outside breeding season." },
"res_63": { type: "result", scenarioId: "649_6", title: "Scenario 63 — Tree Structure for Raptors or Owls ($1,437.12/each)", criteria: "Live or dead tree crown cut and reshaped into a raptor/owl nest platform.", om: "Monitor structural soundness and wildlife use annually." },
"res_62": { type: "result", scenarioId: "649_7", title: "Scenario 62 — Snag Creation and Single Hinge Cut ($16.64/each)", criteria: "Girdling or hinge-cutting a single tree to create standing deadwood cavity habitat.", om: "Avoid locations near trails, fences, or buildings where falling limbs pose hazards." },
"res_7": { type: "result", scenarioId: "649_8", title: "Scenario 7 — Brush Pile and Hinge Cut, Small ($45.41/each)", criteria: "10x20 ft brush pile built from 2-3 trees (< 12 in. diameter).", om: "Replenish brush as material settles; keep clear of firebreaks." },
"res_77": { type: "result", scenarioId: "649_9", title: "Scenario 77 — Brush Pile and Hinge Cut, Large ($196.02/each)", criteria: "30x50 ft brush pile built from 5-10 trees (>= 12 in. diameter).", om: "Replenish brush as material settles; keep clear of firebreaks." },
"res_57": { type: "result", scenarioId: "649_10", title: "Scenario 57 — Downed Habitat Log ($167.77/each)", criteria: "Large woody log placed for reptile/amphibian basking and small mammal cover.", om: "Verify anchoring in floodplain/riparian areas so logs do not obstruct culverts." },
"res_61": { type: "result", scenarioId: "649_11", title: "Scenario 61 — Hibernacula or Rock Structure ($1,839.95/each)", criteria: "Excavated or above-ground rock/woody hibernaculum for reptiles/amphibians.", om: "Keep access openings clear of dense woody encroachment and sediment." },
"res_60": { type: "result", scenarioId: "649_12", title: "Scenario 60 — Floating Basking Structure ($267.57/each)", criteria: "Anchored floating raft/log for turtles and waterfowl.", om: "Check anchor lines and flotation seasonally; remove before ice damage if applicable." },
"res_59": { type: "result", scenarioId: "649_13", title: "Scenario 59 — Fish Habitat Structure ($920.11/each)", criteria: "Submerged woody or engineered structure providing deepwater fish cover/spawning.", om: "Verify anchoring and ensure structures do not interfere with water control outlets." },
"res_5": { type: "result", scenarioId: "649_14", title: "Scenario 5 — Escape Ramp ($94.16/each)", criteria: "Wildlife escape ramp installed inside livestock watering troughs or tanks.", om: "Inspect ramp attachment and keep surface free of heavy algae buildup." },
"res_6": { type: "result", scenarioId: "649_15", title: "Scenario 6 — Fence Markers, Vinyl Undersill ($0.24/ft | Typ. 1,320 ft = $321.99)", criteria: "High-visibility vinyl markers clipped to top fence wires to prevent bird collisions.", om: "Replace missing or UV-damaged markers during annual fence checks." },
"res_58": { type: "result", scenarioId: "649_16", title: "Scenario 58 — Fence Retrofit for Wildlife ($1.92/lin ft | Typ. 1,320 ft = $2,530.31)", criteria: "Modifying existing barbed/woven wire to wildlife-friendly height and smooth bottom wire.", om: "Maintain proper wire height and tension during seasonal livestock checks." },
"res_78": { type: "result", scenarioId: "649_17", title: "Scenario 78 — Gate for Safe Movement of Ungulates ($1,535.75/each)", criteria: "Specialized wildlife-passable gate installed along migration/movement corridors.", om: "Keep gate latch/swing operational and clear of brush or snow buildup." },
"res_76": { type: "result", scenarioId: "649_18", title: "Scenario 76 — 12 Foot Electric Mat, Large, Carnivore Deterrent ($4,659.24/each)", criteria: "Electrified ground mat installed across access openings to deter large carnivores.", om: "Maintain energizer voltage and keep mat surface free of weeds, mud, and debris." }
}
},
"657": {
code: "657",
name: "Wetland Restoration",
category: "Water Quality / Hydrology",
source: "CPS 657 (Nov 2024), FY27 CAPP & FY26 Scenarios",
rcSummary: "Loss of Wetland/Floodplain Functions, Terrestrial & Aquatic Wildlife Habitat, Water Quality & Flood Storage",
supportingPractices: {
  "Hydraulic & Structural Practices": ["587 Structure for Water Control", "356 Dike and Levee", "410 Grade Stabilization Structure", "362 Diversion", "606 Subsurface Drain"],
  "Vegetative & Pest Management": ["645 Wildlife Habitat Management", "612 Tree/Shrub Establishment", "327 Conservation Cover", "315 Herbaceous Weed Treatment", "314 Brush Mgmt"],
  "Upland Buffers & Livestock Protection": ["393 Filter Strip", "390 Riparian Herbaceous Cover", "382 Fence", "472 Access Control", "528 Prescribed Grazing"],
  "Creation, Enhancement, or Management Alternatives": ["658 Wetland Creation", "659 Wetland Enhancement", "656 Constructed Wetland", "646 Seasonal Water Mgmt for Wildlife"]
},
startNode: "gate1",
nodes: {
"gate1": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 1: Historic Wetland Verification",
text: "Was the site historically a natural wetland (verified by hydric soils and geomorphology) that is currently degraded or drained?",
options: [
{ label: "No — Site Was Historically a Non-Wetland", next: "stop_nonwetland" },
{ label: "Yes — Verified Degraded / Drained Historic Wetland", next: "gate2" }
]
},
"stop_nonwetland": {
type: "stop",
shape: "red-hexagon",
title: "DO NOT USE CODE 657",
text: "Code 657 applies only to restoring degraded or drained historic wetlands.",
action: "Use Wetland Creation (658) on historically non-wetland sites, Wetland Enhancement (659), or Constructed Wetland (656) for wastewater."
},
"gate2": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 2: Abiotic Restoration Necessity",
text: "Is ONLY annual water level manipulation or vegetation management needed (no earthwork or tile disabling required)?",
options: [
{ label: "Yes — Only Annual Water or Vegetation Mgmt Needed", next: "stop_mgmt" },
{ label: "No — Earthwork or Subsurface Tile Disabling Required", next: "capp_select" }
]
},
"stop_mgmt": {
type: "stop",
shape: "red-hexagon",
title: "NO ABIOTIC RESTORATION NEEDED (DO NOT USE 657)",
text: "Code 657 is not used where wetland hydrology already exists and only ongoing management is required.",
action: "Use Seasonal Water Management for Wildlife (646) or Wetland Wildlife Habitat Management (644)."
},
"capp_select": {
type: "question",
shape: "yellow-diamond",
title: "FY27 CAPP Narrative Code",
text: "Select the applicable FY27 CAPP Narrative objective:",
options: [
{ label: "00N-CRP-R — CRP Re-enrollment (Maintain restored wetland hydrology & buffers)", next: "res_crp" },
{ label: "00N — Standard Wetland Restoration (Mineral soils / general wetland)", next: "q_mech" },
{ label: "01N — Organic Soil Wetland Restoration (Histosols / subsidence reversal)", next: "q_mech" }
]
},
"res_crp": {
type: "result",
shape: "blue-om",
scenarioId: "657_CRP",
title: "00N-CRP-R — CRP Re-enrollment (Standalone O&M)",
criteria: "Maintain restored wetland hydrology, embankments, and buffers per CRP contract.",
om: "Inspect dikes, ditch plugs, and water control structures after major storms; control invasive wetland species."
},
"q_mech": {
type: "question",
shape: "yellow-diamond",
title: "Primary Hydrologic Restoration Mechanism",
text: "Select the primary physical restoration method:",
options: [
{ label: "Disable Subsurface Tile Drain System (Tile break & concrete cap)", next: "res_4" },
{ label: "Earthwork — Dry Soil Conditions (Standard dozer / excavator)", next: "q_dry_haul" },
{ label: "Earthwork — Saturated / Wet Soils or Histosols (Low-ground-pressure gear)", next: "q_wet_haul" }
]
},
"q_dry_haul": {
type: "question",
shape: "yellow-diamond",
title: "Spoil / Borrow Hauling Requirement (Dry Soils)",
text: "Is earthwork balanced onsite or does fill/spoil require offsite hauling?",
options: [
{ label: "Onsite Cut/Fill (Fill dugouts/ditches or build ditch plugs onsite)", next: "res_2" },
{ label: "Offsite Haul (Haul excess levee spoil offsite or haul fill in)", next: "res_1" }
]
},
"q_wet_haul": {
type: "question",
shape: "yellow-diamond",
title: "Spoil / Borrow Hauling Requirement (Saturated / Wet Soils)",
text: "Is saturated earthwork balanced onsite or does spoil/fill require offsite hauling?",
options: [
{ label: "Onsite Cut/Fill (Low-ground-pressure equipment onsite)", next: "res_3" },
{ label: "Offsite Haul (Low-ground-pressure equipment + offsite hauling)", next: "res_5" }
]
},
"res_4": {
type: "result",
scenarioId: "657_4",
title: "Scenario 4 — Tile Break ($4.79/cu yd | Typ. 400 cu yd = $1,917.39)",
criteria: "Remove subsurface drainage tile (~3 lin ft per 2 cu yd at 3 ft depth) and cap ends with concrete.",
om: "Inspect tile break locations for sinkholes or blowouts after heavy rain; control invasive plants."
},
"res_2": {
type: "result",
scenarioId: "657_2",
title: "Scenario 2 — Sediment Removal/Ditch Plugs/Fill, Dry Soil ($5.63/cu yd | Typ. 2,016 cu yd = $11,348.90)",
criteria: "Onsite earthwork in dry conditions to fill ditches/dugouts or construct ditch plugs.",
om: "Inspect ditch plugs and embankments after major storms; maintain upland buffers."
},
"res_1": {
type: "result",
scenarioId: "657_1",
title: "Scenario 1 — Dry Sediment Removal, Offsite ($7.86/cu yd | Typ. 3,000 cu yd = $23,571.58)",
criteria: "Dry earthwork requiring offsite hauling of levee spoil or imported fill.",
om: "Inspect restored basin and embankments after major storms; control invasive species."
},
"res_3": {
type: "result",
scenarioId: "657_3",
title: "Scenario 3 — Sediment Removal/Ditch Plugs/Fill, Saturated Soils ($6.04/cu yd | Typ. 2,420 cu yd = $14,620.61)",
criteria: "Onsite earthwork in saturated soils/histosols using specialized low-ground-pressure equipment.",
om: "Inspect ditch plugs and water levels post-storm; monitor wetland plant establishment."
},
"res_5": {
type: "result",
scenarioId: "657_5",
title: "Scenario 5 — Wet Sediment Removal, Offsite ($9.41/cu yd | Typ. 2,000 cu yd = $18,828.01)",
criteria: "Wet/saturated earthwork with offsite hauling using specialized equipment.",
om: "Inspect restored basin and outlets post-storm; control invasive wetland plants."
}
}
},
"658": {
code: "658",
name: "Wetland Creation",
category: "Water Quality / Hydrology",
source: "CPS 658 (2026 - NHCP Notice 179), FY27 CAPP & FY26 Scenarios",
rcSummary: "Terrestrial & Aquatic Wildlife Habitat, Water Quality & Flood Storage, Wetland Functions on Non-Wetlands",
supportingPractices: {
  "Water Control & Embankment Practices": ["356 Dike and Levee", "587 Structure for Water Control", "362 Diversion", "520/521 Pond Sealing or Lining", "410 Grade Stabilization Structure"],
  "Vegetative & Habitat Management": ["645 Wildlife Habitat Management", "420 Wildlife Habitat Planting", "612 Tree/Shrub Establishment", "342 Critical Area Planting", "327 Conservation Cover"],
  "Upland Buffers, Pest & Livestock Control": ["393 Filter Strip", "315 Herbaceous Weed Treatment", "314 Brush Mgmt", "382 Fence", "472 Access Control"],
  "Restoration, Wastewater, or Pond Alternatives": ["657 Wetland Restoration", "659 Wetland Enhancement", "656 Constructed Wetland", "378 Pond"]
},
startNode: "gate1",
nodes: {
"gate1": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 1: Historic Non-Wetland Verification",
text: "Was the site historically a natural or degraded wetland?",
options: [
{ label: "Yes — Site Was Historically a Wetland", next: "stop_wetland" },
{ label: "No — Verified Historically Non-Wetland with Adequate Water Supply", next: "gate2" }
]
},
"stop_wetland": {
type: "stop",
shape: "red-hexagon",
title: "DO NOT USE CODE 658",
text: "Code 658 applies only to creating wetlands on sites that were historically non-wetlands.",
action: "Use Wetland Restoration (657) on former/drained wetlands or Wetland Enhancement (659) on existing wetlands."
},
"gate2": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 2: Scope Exclusion Check",
text: "Is the primary purpose agricultural wastewater treatment or deep-water livestock/irrigation storage?",
options: [
{ label: "Yes — Wastewater Treatment or Deep-Water Storage", next: "stop_scope" },
{ label: "No — Ecological Wetland Functions & Wildlife Habitat", next: "capp_select" }
]
},
"stop_scope": {
type: "stop",
shape: "red-hexagon",
title: "OUT OF SCOPE FOR CODE 658",
text: "Code 658 is not intended for wastewater treatment or deep-water storage ponds.",
action: "Use Constructed Wetland (656) for agricultural wastewater or Pond (378) for deep-water storage."
},
"capp_select": {
type: "question",
shape: "yellow-diamond",
title: "FY27 CAPP Narrative Code",
text: "Select the applicable FY27 CAPP Narrative objective:",
options: [
{ label: "00N-CRP-R — CRP Re-enrollment (Maintain existing created wetland)", next: "res_crp" },
{ label: "00N — Creation (Establish wetland hydrology & hydrophytic vegetation)", next: "q_basin" }
]
},
"res_crp": {
type: "result",
shape: "blue-om",
scenarioId: "658_CRP",
title: "00N-CRP-R — CRP Re-enrollment (Standalone O&M)",
criteria: "Maintain and manage existing created wetland(s) to meet planned CRP objectives.",
om: "Maintain created wetland embankments, liners, and vegetative buffers per CRP contract."
},
"q_basin": {
type: "question",
shape: "yellow-diamond",
title: "Basin Depth & Soil Water-Holding Capacity (00N)",
text: "Select the basin geometry and soil permeability condition:",
options: [
{ label: "Shallow Vernal Pool (< 2 ft deep) on permeable soil requiring liner or compaction", next: "res_1" },
{ label: "Seasonal Wetland Excavation where natural soil holds seasonal hydrology", next: "res_3" }
]
},
"res_1": {
type: "result",
scenarioId: "658_1",
title: "Scenario 1 — Vernal Pool Creation with Liner ($15.34/cu yd | Typ. 200 cu yd = $3,068.03)",
criteria: "Excavate shallow vernal pool (< 2 ft deep; ~15 sq ft/cu yd), install liner or compact, and replace topsoil.",
om: "Prevent deep tillage or hoof/equipment puncture of clay/synthetic liners; inspect outlets post-storm."
},
"res_3": {
type: "result",
scenarioId: "658_2",
title: "Scenario 3 — Wetland Excavation for Wildlife ($5.64/cu yd | Typ. 1,000 cu yd = $5,637.73)",
criteria: "Excavate seasonal wetland basin in upland area and spread spoil on adjacent uplands.",
om: "Inspect embankments and outlets after major storms; control invasive weeds; maintain upland buffers."
}
}
},
"659": {
code: "659",
name: "Wetland Enhancement",
category: "Water Quality / Hydrology",
source: "CPS 659 (Nov 2022), FY27 CAPP & FY26 Scenarios",
rcSummary: "Loss of Wetland/Floodplain Functions, Terrestrial & Aquatic Wildlife Habitat, Water Quality & Flood Attenuation",
supportingPractices: {
  "Hydraulic & Structural Practices": ["587 Structure for Water Control", "356 Dike and Levee", "410 Grade Stabilization Structure", "362 Diversion", "606 Subsurface Drain"],
  "Vegetative & Habitat Management": ["645 Wildlife Habitat Management", "420 Wildlife Habitat Planting", "612 Tree/Shrub Establishment", "342 Critical Area Planting", "327 Conservation Cover"],
  "Buffers, Pest & Livestock Protection": ["393 Filter Strip", "315 Herbaceous Weed Treatment", "314 Brush Mgmt", "382 Fence", "472 Access Control"],
  "Restoration, Creation, or Management Alternatives": ["657 Wetland Restoration", "658 Wetland Creation", "656 Constructed Wetland", "646 Seasonal Water Mgmt for Wildlife"]
},
startNode: "gate1",
nodes: {
"gate1": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 1: Existing Wetland & Purpose Check",
text: "Is the site historically a non-wetland OR intended for agricultural wastewater treatment?",
options: [
{ label: "Yes — Historically Non-Wetland or Wastewater Treatment", next: "stop_nonwetland" },
{ label: "No — Existing Wetland Being Augmented Beyond Natural Conditions", next: "gate2" }
]
},
"stop_nonwetland": {
type: "stop",
shape: "red-hexagon",
title: "DO NOT USE CODE 659",
text: "Code 659 applies only to enhancing existing wetlands beyond original natural conditions.",
action: "Use Wetland Creation (658) on historically non-wetland sites or Constructed Wetland (656) for agricultural wastewater."
},
"gate2": {
type: "gate",
shape: "black-diamond",
title: "Pre-Condition 2: Restoration vs. Enhancement Check",
text: "Is the goal ONLY restoring historic natural conditions OR performing annual water/vegetation management?",
options: [
{ label: "Yes — Only Restoring Historic Condition or Annual Management", next: "stop_restore" },
{ label: "No — Augmenting Specific Wetland Functions Beyond Natural Conditions", next: "q_mech" }
]
},
"stop_restore": {
type: "stop",
shape: "red-hexagon",
title: "USE RESTORATION OR MANAGEMENT INSTEAD (DO NOT USE 659)",
text: "Use Code 657 to return a degraded wetland to its historic condition, or 646/644 for ongoing management.",
action: "Use Wetland Restoration (657), Seasonal Water Management (646), or Wetland Wildlife Habitat Management (644)."
},
"q_mech": {
type: "question",
shape: "yellow-diamond",
title: "Primary Hydrologic / Topographic Enhancement Mechanism (FY27 CAPP: 00N)",
text: "Select the physical enhancement method (verify functional trade-offs before augmenting):",
options: [
{ label: "Daylight Tile Lines — Remove existing tile lines & create surface outlets", next: "res_1" },
{ label: "Earthwork — Dry Soil Conditions (Standard dozer / excavator)", next: "q_dry_haul" },
{ label: "Earthwork — Wet Soil Conditions (Low-ground-pressure gear)", next: "q_wet_haul" }
]
},
"q_dry_haul": {
type: "question",
shape: "yellow-diamond",
title: "Spoil / Borrow Hauling Requirement (Dry Soil Earthwork)",
text: "Is earthwork balanced onsite or does soil require offsite hauling?",
options: [
{ label: "Onsite Cut/Fill (Spread spoil on adjacent uplands or fill ditches)", next: "res_2" },
{ label: "Offsite Haul (Haul excess soil offsite or haul fill in)", next: "res_4" }
]
},
"q_wet_haul": {
type: "question",
shape: "yellow-diamond",
title: "Spoil / Borrow Hauling Requirement (Wet Soil Earthwork)",
text: "Is wet-soil earthwork balanced onsite or does soil require offsite hauling?",
options: [
{ label: "Onsite Cut/Fill (Low-ground-pressure equipment onsite)", next: "res_3" },
{ label: "Offsite Haul (Low-ground-pressure equipment + offsite hauling)", next: "res_5" }
]
},
"res_1": {
type: "result",
scenarioId: "659_1",
title: "Scenario 1 — Daylight Tile Lines ($4.45/cu yd | Typ. 200 cu yd = $889.89)",
criteria: "Remove subsurface tile lines (~3 lin ft/cu yd at 3 ft depth) and create surface outlets.",
om: "Inspect daylighted surface outlets for erosion/headcutting after storms; maintain upland buffers."
},
"res_2": {
type: "result",
scenarioId: "659_2",
title: "Scenario 2 — Earthwork, Dry Soil Conditions ($5.63/cu yd | Typ. 2,016 cu yd = $11,348.90)",
criteria: "Dry-soil earthwork to enlarge wetland footprint, add topographic complexity, or fill ditches onsite.",
om: "Inspect embankments, outlets, and water control structures after storms; control invasive species."
},
"res_3": {
type: "result",
scenarioId: "659_3",
title: "Scenario 3 — Earthwork, Wet Soil Conditions ($6.04/cu yd | Typ. 2,420 cu yd = $14,620.61)",
criteria: "Wet-soil earthwork using specialized low-ground-pressure equipment onsite.",
om: "Inspect embankments and outlets post-storm; monitor wetland plant establishment."
},
"res_4": {
type: "result",
scenarioId: "659_4",
title: "Scenario 4 — Earthwork Dry Soil, Offsite ($7.86/cu yd | Typ. 3,000 cu yd = $23,571.58)",
criteria: "Dry-soil earthwork with offsite soil hauling to enhance wetland capacity/topography.",
om: "Inspect embankments and outlets after storms; maintain upland vegetative buffers."
},
"res_5": {
type: "result",
scenarioId: "659_5",
title: "Scenario 5 — Earthwork Wet Soil, Offsite ($8.89/cu yd | Typ. 2,000 cu yd = $17,780.72)",
criteria: "Wet-soil earthwork with offsite soil hauling using specialized low-ground-pressure equipment.",
om: "Inspect embankments and outlets post-storm; control invasive wetland plants."
}
}
}
};

