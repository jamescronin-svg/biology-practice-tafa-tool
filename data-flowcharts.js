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
      "390_s39": { type: "result", tag: "CPS 390 · Scenario 39", q: "Scenario 39: Riparian Herbaceous Cover — Grass ($1,026.38/ac)", note: "No-till or range drill adapted stiff-stemmed grasses for sediment trapping and filter strip performance." },
      "390_s40": { type: "result", tag: "CPS 390 · Scenario 40", q: "Scenario 40: Riparian Herbaceous Cover — Native Grass and Forbs ($1,026.38/ac)", note: "Diverse native grass and forb mix with overlapping bloom periods for pollinators and wildlife." },
      "390_s41": { type: "result", tag: "CPS 390 · Scenario 41", q: "Scenario 41: Riparian Herbaceous Cover — Specialized Seed ($1,443.13/ac)", note: "High-cost specialized native seed mix tailored to target Ecological Site Descriptions (ESDs)." },
      "390_s44": { type: "result", tag: "CPS 390 · Scenario 44", q: "Scenario 44: Riparian Herbaceous Cover — Plugging and Seeding ($7,038.68/ac)", note: "Combined native seeding and live sprigging/plugging for high-velocity scour zones." }
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
        q: "Does terrain slope or rockiness allow mechanical planting or require hand planting?",
        options: [
          { label: "Flat / accessible terrain (Mechanical planter — Low Labor)", next: "422_s31" },
          { label: "Steep / rugged terrain (Hand planting — High Labor)", next: "422_s30" }
        ]
      },
  "643": {
    code: "643",
    name: "Restoration of Rare or Declining Natural Communities",
    source: "CPS 643 & FY 2026 Scenarios",
    rcSummary: "Rare/Imperiled Plant & Wildlife Communities (Prairie, Savanna, Vernal Pool, Incised Riparian, Subtidal Oyster Reef)",
    om: "Control invasive species; inspect structural integrity (BDAs, rock structures) post-high flows; conduct mandatory Yr 1–3 monitoring on subtidal oyster reefs.",
    supporting: "Herbaceous Weed Treatment (315), Prescribed Burning (338), Grade Stabilization Structure (410), Streambank Protection (580), Stream Habitat Improvement (395).",
    start: "643_q1",
    nodes: {
      "643_q1": {
        tag: "CPS 643 · Step 1",
        q: "What ecosystem type is being restored?",
        options: [
          { label: "Upland / Wetland Micro-Topography (Prairie, Savanna, Vernal Pool)", next: "643_q2" },
          { label: "Incised Stream / Intermittent Channel (Process-Based Structures)", next: "643_q3" },
          { label: "Estuarine / Subtidal Oyster Reef Habitat", next: "643_q4" }
        ]
      },
      "643_q2": {
        tag: "CPS 643 · Step 2 (Micro-Topography)",
        q: "What excavation depth and equipment are needed?",
        options: [
          { label: "Shallow micro-topography (2–6 in) using normal farm equipment", next: "643_s5" },
          { label: "Deep micro-topography (6–12 in) using heavy dozer", next: "643_s6" }
        ]
      },
      "643_q3": {
        tag: "CPS 643 · Step 2 (Channel Structures)",
        q: "Which low-tech process-based structure fits the channel?",
        options: [
          { label: "Woody Beaver Dam Analogues (BDAs) or Post-Assisted Log Structures (PALS)", next: "643_s221" },
          { label: "Rock Structures (Zuni Bowls or One-Rock Dams for head-cuts)", next: "643_s226" }
        ]
      },
      "643_q4": {
        tag: "CPS 643 · Step 2 (Oyster Reef)",
        q: "Select the oyster reef construction method (Note: pair with Yr 1–3 monitoring):",
        options: [
          { label: "Spat on Shell Only (No heavy cultch barge)", next: "643_s310" },
          { label: "Bagged Dredging with Spat on Shell", next: "643_s247" },
          { label: "Barge Crane Reef Placement (~100 tons shell/ac)", next: "643_s289" },
          { label: "Post-Construction Subtidal Monitoring (Yr 1, 2, or 3)", next: "643_mon" }
        ]
      },
      "643_s5": { type: "result", tag: "CPS 643 · Scenario 5", q: "Scenario 5: Shallow Micro-Topography — Farm Equipment ($680.00/ac)", note: "Shallow 2-6 in depressions and mounds using normal farm equipment." },
      "643_s6": { type: "result", tag: "CPS 643 · Scenario 6", q: "Scenario 6: Deep Micro-Topography — Heavy Dozer ($1,450.00/ac)", note: "Heavy dozer excavation (6-12 in) creating vernal depressions for rare wetland/savanna/prairie." },
      "643_s221": { type: "result", tag: "CPS 643 · Scenario 221", q: "Scenario 221: Beaver Dam Analogues (BDAs) / PALS ($4,120.00/ac)", note: "Low-tech process-based restoration structures to aggrade incised channels and reconnect floodplains." },
      "643_s226": { type: "result", tag: "CPS 643 · Scenario 226", q: "Scenario 226: Rock Structure — Zuni Bowls / One-Rock Dams ($2,890.00/ea)", note: "Hand- or machine-placed rock structures to arrest head-cuts in intermittent channels." },
      "643_s310": { type: "result", tag: "CPS 643 · Scenario 310", q: "Scenario 310: Oyster Restoration Spat on Shell Only ($9,800.00/ac)", note: "Subtidal oyster restoration using spat on shell; pair with Yr 1-3 monitoring scenarios." },
      "643_s247": { type: "result", tag: "CPS 643 · Scenario 247", q: "Scenario 247: Oyster Reef Bagged Dredging, Spat on Shell ($12,400.00/ac)", note: "Bagged cultch shell with spat on shell; pair with Scen. 373 (Yr 1), 394 (Yr 2), 415 (Yr 3)." },
      "643_s289": { type: "result", tag: "CPS 643 · Scenario 289", q: "Scenario 289: Oyster Reef Barge Crane (~100 tons shell) ($18,500.00/ac)", note: "Heavy barge crane oyster reef placement; pair with monitoring Scen. 373, 394, 415." },
      "643_mon": { type: "result", tag: "CPS 643 · Monitoring", q: "Oyster Reef Subtidal Monitoring: Scen. 373 (Yr 1), 394 (Yr 2), 415 (Yr 3)", note: "Annual biological and structural monitoring required after oyster reef installation." }
    }
  },
  "644": {
    code: "644",
    name: "Wetland Wildlife Habitat Management",
    source: "CPS 644 & FY 2026 Scenarios",
    rcSummary: "Wetland Wildlife Habitat (Waterfowl, Shorebirds, Amphibians, Wading Birds)",
    om: "Adjust water levels gradually per seasonal drawdown schedule; control invasive wetland plants; maintain moist-soil food plants.",
    supporting: "Seasonal Water Management for Wildlife (646), Structure for Water Control (587), Herbaceous Weed Treatment (315), Wetland Restoration (657).",
    start: "644_q1",
    nodes: {
      "644_q1": {
        tag: "CPS 644 · Step 1",
        q: "Does the site have active water control structures for moist-soil management, or is management focused on vegetation/hydrology?",
        options: [
          { label: "Active water control structures (Moist-soil drawdown & flood management)", next: "644_s1" },
          { label: "Vegetation disturbance / mechanical or chemical invasive suppression", next: "644_s2" },
          { label: "Natural / passive wetland habitat protection & grazing exclusion", next: "644_s3" }
        ]
      },
      "644_s1": { type: "result", tag: "CPS 644 · Scenario 1", q: "Scenario 1: Wetland Wildlife Habitat Management — Water Level & Moist-Soil Mgmt ($64.50/ac)", note: "Timed seasonal drawdowns and re-flooding to produce native moist-soil seeds and invertebrates." },
      "644_s2": { type: "result", tag: "CPS 644 · Scenario 2", q: "Scenario 2: Wetland Wildlife Habitat Management — Vegetation Manipulation ($92.15/ac)", note: "Disking, mowing, or targeted herbicide treatment to maintain hemi-marsh open water/cover ratio." },
      "644_s3": { type: "result", tag: "CPS 644 · Scenario 3", q: "Scenario 3: Wetland Wildlife Habitat Management — Natural Wetland Mgmt ($38.40/ac)", note: "Management of natural/unimpounded wetlands to preserve native hydroperiod and wildlife cover." }
    }
  },
  "645": {
    code: "645",
    name: "Upland Wildlife Habitat Management",
    source: "CPS 645 & FY 2026 Scenarios",
    rcSummary: "Terrestrial Habitat for Upland Wildlife, Grassland Birds, Pollinators & Small Game",
    om: "Apply disturbance (prescribed burn, strip disking, haying/grazing) outside primary nesting/brood-rearing season on a 3-to-5 year rotation.",
    supporting: "Prescribed Burning (338), Prescribed Grazing (528A), Herbaceous Weed Treatment (315), Brush Management (314), Wildlife Habitat Planting (420).",
    start: "645_q1",
    nodes: {
      "645_q1": {
        tag: "CPS 645 · Step 1",
        q: "What level of management intensity is required to meet the target species Habitat Evaluation (WHEG) score?",
        options: [
          { label: "Standard Upland Management (Rotational mowing, strip disking, or grazing deferral)", next: "645_s1" },
          { label: "Intensive Upland Management (Multi-practice disturbance, interseeding, or high-precision WHEG)", next: "645_s2" },
          { label: "Cropland / Residue Winter Foraging Management (Un-harvested strips or stubble retention)", next: "645_s3" }
        ]
      },
      "645_s1": { type: "result", tag: "CPS 645 · Scenario 1", q: "Scenario 1: Upland Wildlife Habitat Management — Standard ($32.80/ac)", note: "Routine rotational habitat disturbance and cover management outside nesting season." },
      "645_s2": { type: "result", tag: "CPS 645 · Scenario 2", q: "Scenario 2: Upland Wildlife Habitat Management — Intensive ($68.40/ac)", note: "Intensive multi-stage habitat manipulation and interseeding for target species recovery." },
      "645_s3": { type: "result", tag: "CPS 645 · Scenario 3", q: "Scenario 3: Upland Wildlife Habitat Management — Cropland Winter Cover/Food ($49.10/ac)", note: "Retention of standing crop residue or unharvested wildlife food strips through winter." }
    }
  },
  "646": {
    code: "646",
    name: "Seasonal Water Management for Wildlife",
    source: "CPS 646 & FY 2026 Scenarios",
    rcSummary: "Seasonal Wetland / Agricultural Field Inundation for Migratory Waterfowl & Shorebirds",
    om: "Install stoplogs/boards on schedule; monitor water depth (typically 4–18 in); dewater gradually in spring.",
    supporting: "Structure for Water Control (587), Wetland Wildlife Habitat Management (644), Pumping Plant (533), Conservation Crop Rotation (328).",
    start: "646_q1",
    nodes: {
      "646_q1": {
        tag: "CPS 646 · Step 1",
        q: "How is water supplied to flood the field or impoundment?",
        options: [
          { label: "Gravity-fed / Rainfall capture (Stoplog boards or flashboard risers)", next: "646_q2" },
          { label: "Mechanically pumped water (Well or surface pump)", next: "646_q3" }
        ]
      },
      "646_q2": {
        tag: "CPS 646 · Step 2 (Gravity / Rainfall)",
        q: "What level of water-level monitoring and labor is required?",
        options: [
          { label: "Low labor inputs (Single seasonal board installation & spring drawdown)", next: "646_s1" },
          { label: "Medium labor inputs (Periodic board adjustments for staggered depths)", next: "646_s2" },
          { label: "High labor inputs (Frequent multi-basin manipulation & monitoring)", next: "646_s3" }
        ]
      },
      "646_q3": {
        tag: "CPS 646 · Step 2 (Pumped Water)",
        q: "What level of pumping operation and labor is required?",
        options: [
          { label: "Low labor inputs (Automated or routine single-fill pumping)", next: "646_s6" },
          { label: "Medium labor inputs (Periodic re-pumping to offset evaporation/seepage)", next: "646_s4" },
          { label: "High labor inputs (Continuous multi-stage pumping & depth management)", next: "646_s5" }
          ]
      },
              "646_s1": { type: "result", tag: "CPS 646 · Scenario 1", q: "Scenario 1: Gravity/Rainfall, Low Labor Inputs Required ($18.45/ac)", note: "Passive rainfall capture and stoplog retention with minimal seasonal adjustments." },
      "646_s2": { type: "result", tag: "CPS 646 · Scenario 2", q: "Scenario 2: Gravity/Rainfall, Medium Labor Inputs Required ($28.90/ac)", note: "Periodic stoplog adjustments to provide progressive water depths for shorebirds and waterfowl." },
      "646_s3": { type: "result", tag: "CPS 646 · Scenario 3", q: "Scenario 3: Gravity/Rainfall, High Labor Inputs Required ($42.10/ac)", note: "Intensive multi-basin gravity water manipulation and frequent depth monitoring." },
      "646_s4": { type: "result", tag: "CPS 646 · Scenario 4", q: "Scenario 4: Pump Water, Medium Labor Inputs Required ($54.20/ac)", note: "Mechanically pumped seasonal flooding with periodic re-pumping to maintain target depth." },
      "646_s5": { type: "result", tag: "CPS 646 · Scenario 5", q: "Scenario 5: Pump Water, High Labor Inputs Required ($76.80/ac)", note: "High-intensity mechanical pumping and frequent multi-stage water depth manipulation." },
      "646_s6": { type: "result", tag: "CPS 646 · Scenario 6", q: "Scenario 6: Pump Water, Low Labor Inputs Required ($39.63/ac)", note: "Mechanically pumped seasonal water flooding with automated or routine low-labor level management." }
    }
  },
  "647": {
    code: "647",
    name: "Early Successional Habitat Development-Management",
    source: "CPS 647 & FY 2026 Scenarios",
    rcSummary: "Terrestrial Habitat for Early Successional / Shrub-Scrub / Grassland Wildlife & Pollinators",
    om: "Manage 1/3 to 1/5 of area annually on rotation; control noxious/invasive weeds; protect from wildfire and unmanaged livestock.",
    supporting: "Prescribed Burning (338), Brush Management (314), Herbaceous Weed Treatment (315), Wildlife Habitat Planting (420), Fence (382).",
    start: "647_q1",
    nodes: {
      "647_q1": {
        tag: "CPS 647 · Step 1",
        q: "What disturbance method is best suited to set back succession on this site?",
        options: [
          { label: "Light mechanical disturbance (Strip disking, light harrowing, or rotational mowing)", next: "647_s1" },
          { label: "Chemical / selective herbicide suppression of sod-forming grasses", next: "647_s2" },
          { label: "Heavy woody setback / brush cutting (Forest opening or shrub-scrub regeneration)", next: "647_s3" }
        ]
      },
      "647_s1": { type: "result", tag: "CPS 647 · Scenario 1", q: "Scenario 1: Early Successional Habitat — Mechanical / Strip Disking ($58.40/ac)", note: "Rotational strip disking or mechanical soil disturbance to stimulate native annuals and forbs." },
      "647_s2": { type: "result", tag: "CPS 647 · Scenario 2", q: "Scenario 2: Early Successional Habitat — Chemical Setback ($74.20/ac)", note: "Selective herbicide application to suppress sod-bound tall fescue/bermudagrass and release native seedbank." },
      "647_s3": { type: "result", tag: "CPS 647 · Scenario 3", q: "Scenario 3: Early Successional Habitat — Woody / Brush Setback ($245.00/ac)", note: "Heavy mechanical mulching or cutting of encroaching woody stems to restore shrub-scrub habitat." }
    }
  },
  "649": {
    code: "649",
    name: "Structures for Wildlife",
    source: "CPS 649 (Mar 2024) & FY 2026 Scenarios",
    rcSummary: "Terrestrial/Aquatic Shelter, Nesting Structures, Escarpment/Bat/Fish Habitat Structures",
    om: "Inspect annually prior to breeding/nesting season; clean out nest boxes/platforms; repair or replace weathered structures.",
    supporting: "Wildlife Habitat Planting (420), Wildlife Habitat Management (645), Fence (382), Streambank Protection (580).",
    start: "649_q1",
    nodes: {
      "649_q1": {
        tag: "CPS 649 · Step 1",
        q: "What type of wildlife structure is needed to address the limiting habitat factor?",
        options: [
          { label: "Cavity Nest Box or Perch Pole (Bluebird, Wood Duck, Kestrel, Raptor)", next: "649_s1" },
          { label: "Large Nesting Platform or Bat House (Osprey, Barn Owl, Colonial Bat Box)", next: "649_s2" },
          { label: "Brush Pile, Downed Woody Structure, or Rock Hibernaculum", next: "649_s3" },
          { label: "Wildlife Escape Ramp (Livestock watering tank/trough safety)", next: "649_s4" }
        ]
      },
      "649_s1": { type: "result", tag: "CPS 649 · Scenario 1", q: "Scenario 1: Structures for Wildlife — Nest Box / Perch Pole ($88.50/ea)", note: "Standard wooden/composite cavity nest boxes with predator guards or raptor hunting perches." },
      "649_s2": { type: "result", tag: "CPS 649 · Scenario 2", q: "Scenario 2: Structures for Wildlife — Elevated Platform / Bat Roost ($340.00/ea)", note: "Heavy-duty pole-mounted osprey/owl platform or multi-chambered solar-oriented bat house." },
      "649_s3": { type: "result", tag: "CPS 649 · Scenario 3", q: "Scenario 3: Structures for Wildlife — Brush Pile / Rock Hibernaculum ($195.00/ea)", note: "Engineered brush pile or subterranean rock shelter for small mammals, quail, and herpetofauna." },
      "649_s4": { type: "result", tag: "CPS 649 · Scenario 4", q: "Scenario 4: Structures for Wildlife — Wildlife Escape Ramp ($62.00/ea)", note: "Expanded metal or textured ramp installed in livestock troughs to prevent bird/bat drowning." }
    }
  },
  "657": {
    code: "657",
    name: "Wetland Restoration",
    source: "CPS 657 & FY 2026 Scenarios",
    rcSummary: "Permanent or Long-Term Hydroperiod & Hydric Soil Function Restoration",
    om: "Monitor levee/plug integrity, control invasive woody species, maintain water control structures and native emergent plant cover.",
    supporting: "Wetland Wildlife Mgmt (644), Seasonal Water Mgmt (646), Structure for Water Control (587), Dike (356), Tree/Shrub Planting (612/420).",
    start: "657_q1",
    nodes: {
      "657_q1": {
        tag: "CPS 657 · Step 1",
        q: "What primary hydrologic alteration drained or degraded the historic hydric soil site?",
        options: [
          { label: "Subsurface drainage tile (Tile break / block restoration)", next: "657_s1" },
          { label: "Surface drainage ditch (Ditch plug / fill restoration)", next: "657_s2" },
          { label: "Complex floodplain / embankment & water control structure restoration", next: "657_s3" }
        ]
      },
      "657_s1": { type: "result", tag: "CPS 657 · Scenario 1", q: "Scenario 1: Wetland Restoration — Tile Break / Subsurface Block ($1,180.00/ac)", note: "Locating, excavating, and disabling subsurface drainage tile lines to restore natural saturation." },
      "657_s2": { type: "result", tag: "CPS 657 · Scenario 2", q: "Scenario 2: Wetland Restoration — Ditch Plug / Surface Fill ($1,890.00/ac)", note: "Constructing compacted earthen ditch plugs and re-contouring surface drainage channels." },
      "657_s3": { type: "result", tag: "CPS 657 · Scenario 3", q: "Scenario 3: Wetland Restoration — Embankment & Macro-Topography ($3,450.00/ac)", note: "Full hydrologic restoration involving low-head embankments, spillways, and native hydrophytic seeding." }
    }
  },
  "658": {
    code: "658",
    name: "Wetland Creation",
    source: "CPS 658 & FY 2026 Scenarios",
    rcSummary: "Creating New Wetlands on Non-Hydric / Upland Sites",
    om: "Monitor inflow/outflow stability, control invasive weeds during root establishment, inspect embankment and spillway integrity.",
    supporting: "Wetland Restoration (657), Structure for Water Control (587), Wetland Wildlife Mgmt (644), Grassed Waterway (412).",
    start: "658_q1",
    nodes: {
      "658_q1": {
        tag: "CPS 658 · Step 1",
        q: "Does the non-hydric site require an imported clay/bentonite liner to hold water, or are native subsoils sufficiently impermeable?",
        options: [
          { label: "Native subsoils hold water (Excavation & embankment only)", next: "658_s1" },
          { label: "Permeable subsoils (Requires compacted clay/soil liner)", next: "658_s2" }
        ]
      },
      "658_s1": { type: "result", tag: "CPS 658 · Scenario 1", q: "Scenario 1: Wetland Creation — Standard Excavation & Embankment ($3,920.00/ac)", note: "Creating shallow wetland basin (< 3 ft max depth) on non-hydric soils with impermeable subsoil." },
      "658_s2": { type: "result", tag: "CPS 658 · Scenario 2", q: "Scenario 2: Wetland Creation — With Compacted Soil Liner ($6,450.00/ac)", note: "Wetland creation including imported/compacted clay blanket liner to prevent excessive seepage." }
    }
  },
  "659": {
    code: "659",
    name: "Wetland Enhancement",
    source: "CPS 659 & FY 2026 Scenarios",
    rcSummary: "Enhancing Existing Function & Biotic/Hydrologic Diversity of Functioning Wetlands",
    om: "Inspect water control structures, adjust seasonal inundation schedules, manage emergent/submerged vegetation structure.",
    supporting: "Seasonal Water Management (646), Structure for Water Control (587), Wetland Wildlife Management (644), Herbaceous Weed Treatment (315).",
    start: "659_q1",
    nodes: {
      "659_q1": {
        tag: "CPS 659 · Step 1",
        q: "What enhancement action is needed on this existing wetland?",
        options: [
          { label: "Hydrologic enhancement (Adding/upgrading water control structure or berm)", next: "659_s1" },
          { label: "Topographic & vegetative enhancement (Pothole excavation & native hydrophytic planting)", next: "659_s2" }
        ]
      },
      "659_s1": { type: "result", tag: "CPS 659 · Scenario 1", q: "Scenario 1: Wetland Enhancement — Hydrologic Control Upgrade ($1,640.00/ac)", note: "Modifying existing wetland hydrology to improve seasonal water depth diversity and flood duration." },
            "659_s2": { type: "result", tag: "CPS 659 · Scenario 2", q: "Scenario 2: Wetland Enhancement — Topographic & Plant Diversity ($2,780.00/ac)", note: "Creating open-water potholes/islands in monotypic stands and establishing diverse native emergents." }
         }
    }
  }
};
