export const initialIdeas = [
  {
    id: "01",
    index: "01",
    title: "AI STUDY ASSISTANT",
    tagline: "An AI-powered adaptive study platform transforming dense research papers into interactive knowledge graphs and spaced-repetition quizzes.",
    category: "AI / WEB / EDUCATION",
    creator: {
      name: "Marcus Vance",
      handle: "@mvance",
      role: "Lead Researcher"
    },
    publishedAt: "Oct 2026",
    status: "RECRUITING COLLABORATORS",
    problem: `Students and independent researchers spend over 60% of their study time parsing disorganized academic PDFs, extracting citations, and manually producing flashcards. Traditional flashcard tools lack semantic comprehension, leading to cognitive fatigue without deep contextual retention.`,
    solution: `An intelligent knowledge synthesis engine that parses arXiv, PubMed, and local PDFs, computes semantic embeddings across thesis claims, and builds interactive visual argument graphs. Collaborators are matched in real-time to solve complex multi-disciplinary briefs.`,
    description: `The study assistant operates as an offline-first local workstation tool. It exposes an extensible plugin architecture where custom transformer pipelines summarize methodology sections and automatically generate socratic self-quizzes.`,
    techStack: ["React", "TypeScript", "Node.js", "Python", "Local LLM / PyTorch"],
    lookingFor: [
      "Frontend Developer (React / Canvas / WebGL)",
      "ML Developer (Embedding pipelines / Onnx Runtime)"
    ]
  },
  {
    id: "02",
    index: "02",
    title: "DECENTRALIZED ENERGY ROUTING PROTOCOL",
    tagline: "Peer-to-peer renewable micro-grid trading protocol operating over low-frequency mesh radio without central utility mediation.",
    category: "SYSTEMS / ENERGY / IOT",
    creator: {
      name: "Elena Rostova",
      handle: "@erostova",
      role: "Systems Architect"
    },
    publishedAt: "Oct 2026",
    status: "ACTIVE PROTOTYPE",
    problem: `Residential solar and wind installations generate substantial surplus electricity during non-peak hours. Central electrical utilities purchase this surplus at discounted rates while transmission grid losses exceed 14% across regional lines.`,
    solution: `A local physical routing protocol using micro-controllers with solid-state bidirectional relays. Neighbors exchange kilowatt-hours directly via cryptographic bilateral tokens, stabilizing local distribution grids during outages.`,
    description: `Field trials across 12 residential dwellings in Zurich demonstrate an 18% reduction in aggregate utility grid draw. The hardware schematics and firmware are completely open under CERN OHL.`,
    techStack: ["Rust", "Embedded C", "LoRaWAN", "WebAssembly", "Solid-State Relays"],
    lookingFor: [
      "Embedded Systems Engineer (STM32 / ESP32)",
      "Distributed Protocol Architect"
    ]
  },
  {
    id: "03",
    index: "03",
    title: "SPATIAL TYPOGRAPHIC NOTATION ENGINE",
    tagline: "A variable font axis specification dynamically rendering typography based on physical velocity, viewer focal depth, and gaze parallax.",
    category: "TYPOGRAPHY / SPATIAL / INTERFACE",
    creator: {
      name: "Amina Sen",
      handle: "@aminasen",
      role: "Type Technologist"
    },
    publishedAt: "Sep 2026",
    status: "RECRUITING COLLABORATORS",
    problem: `Current spatial headsets project 2D typographic bitmaps into 3D environments, generating optical distortion, chromatic aberration, and severe legibility degradation when viewed at non-orthogonal angles.`,
    solution: `A vector-level font rasterization standard that modulates stroke contrast, counter-space dilation, and optical kerning in direct real-time response to user velocity and spatial angle.`,
    description: `Includes an OpenType experimental variation axis specification and a WebGL 120fps benchmark environment tested on Apple Vision Pro and Meta Quest 3 hardware.`,
    techStack: ["GLSL", "WebGL / Three.js", "C++", "OpenType HarfBuzz", "WebGPU"],
    lookingFor: [
      "Graphics Programmer (GLSL / Shaders)",
      "Typeface Designer"
    ]
  },
  {
    id: "04",
    index: "04",
    title: "BIODEGRADABLE MYCELIUM SENSOR SUBSTRATES",
    tagline: "Compostable single-use sensor boards for transient environmental telemetry that dissolve into organic soil matter within 180 days.",
    category: "HARDWARE / ECOLOGY / BIO-DESIGN",
    creator: {
      name: "Julian Meyer",
      handle: "@jmeyer",
      role: "Bio-Materials Engineer"
    },
    publishedAt: "Sep 2026",
    status: "ACTIVE PROTOTYPE",
    problem: `Agricultural and marine environmental tracking deployments generate thousands of metric tons of toxic electronic circuit waste that persists in ecosystems indefinitely.`,
    solution: `Printed circuit traces made of water-soluble carbon nanotube inks screen-printed onto compressed fungal mycelium substrates. The entire sensor assembly completely composts upon moisture activation.`,
    description: `Lab validation confirms 180-day outdoor mechanical stability with zero trace toxins detected in post-decomposition soil spectroscopy tests.`,
    techStack: ["Mycelium Biomaterials", "Carbon Nanotubes", "Screen Printing", "Spectroscopy"],
    lookingFor: [
      "Bio-Chemist",
      "Sensor Hardware Engineer"
    ]
  }
];

export const getIdeas = () => {
  try {
    const saved = localStorage.getItem('ideahub_ideas');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // fallback
  }
  return initialIdeas;
};

export const saveIdea = (newIdea) => {
  const current = getIdeas();
  const updated = [newIdea, ...current];
  try {
    localStorage.setItem('ideahub_ideas', JSON.stringify(updated));
  } catch (e) {
    // fallback
  }
  return updated;
};

export const getIdeaById = (id) => {
  const ideas = getIdeas();
  return ideas.find(idea => idea.id === id || idea.index === id) || null;
};
