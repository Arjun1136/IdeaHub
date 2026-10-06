export const initialProfile = {
  name: "Studio Fellow",
  handle: "@ideahub_fellow",
  memberNumber: "№ 0482",
  memberSince: "Jan 2026",
  role: "Independent Systems Researcher",
  bio: "Investigating decentralized peer-to-peer energy routing protocols, experimental spatial typography variation axes, and open-source hardware instrumentation for transient environmental observation.",
  skills: [
    "React / TypeScript",
    "WebGL / GLSL",
    "Distributed Protocols",
    "Node.js",
    "PyTorch / Embeddings",
    "LoRaWAN",
    "Interface Design"
  ],
  stats: {
    reviews: 18,
    ideasAuthored: 2,
    collaborations: 4
  }
};

export const getProfile = () => {
  try {
    const saved = localStorage.getItem('ideahub_profile');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // fallback
  }
  return initialProfile;
};

export const saveProfile = (updatedProfile) => {
  try {
    localStorage.setItem('ideahub_profile', JSON.stringify(updatedProfile));
  } catch (e) {
    // fallback
  }
  return updatedProfile;
};
