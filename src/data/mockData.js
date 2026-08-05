export const MOCK_STATS = {
  totalPotholes: 42890,
  trafficDensity: "94.6%",
  monitoredRoadsKm: 1280,
  resolvedCases: 38450,
  activeCameras: 412,
  avgRepairHours: 18.4,
  accuracyRate: "99.8%"
};

export const MAP_MARKERS = [
  {
    id: "POT-8091",
    title: "Critical Pothole - Main St Expressway",
    type: "pothole",
    severity: "critical",
    severityScore: 9.4,
    depthCm: 11.2,
    diameterCm: 48.0,
    district: "Downtown",
    lat: 37.7749,
    lng: -122.4194,
    address: "742 Main St Expressway, Sector 4",
    reportedAt: "10 mins ago",
    status: "pending",
    assignedTeam: "Alpha Repair Unit",
    confidence: "98.9%",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "POT-8092",
    title: "Moderate Surface Fracture",
    type: "pothole",
    severity: "moderate",
    severityScore: 6.2,
    depthCm: 5.8,
    diameterCm: 28.5,
    district: "North Sector",
    lat: 37.7833,
    lng: -122.4167,
    address: "128 North Boulevard, Block B",
    reportedAt: "45 mins ago",
    status: "in-repair",
    assignedTeam: "Metro Road Ops #3",
    confidence: "95.4%",
    image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "POT-8093",
    title: "Severe Road Edge Collapse",
    type: "pothole",
    severity: "critical",
    severityScore: 8.9,
    depthCm: 9.6,
    diameterCm: 62.0,
    district: "West Hub",
    lat: 37.7651,
    lng: -122.4401,
    address: "Terminal Way & 9th Ave",
    reportedAt: "2 hours ago",
    status: "pending",
    assignedTeam: "Unassigned",
    confidence: "99.1%",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TRF-4011",
    title: "Heavy Traffic Congestion",
    type: "traffic",
    severity: "high",
    severityScore: 8.1,
    vehiclesPerMin: 142,
    avgSpeedKmh: 14,
    district: "Downtown",
    lat: 37.7710,
    lng: -122.4280,
    address: "Financial Center Flyover",
    reportedAt: "Live",
    status: "active",
    confidence: "97.8%",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TRF-4012",
    title: "Moderate Traffic Delay",
    type: "traffic",
    severity: "moderate",
    severityScore: 5.5,
    vehiclesPerMin: 88,
    avgSpeedKmh: 32,
    district: "Industrial Zone",
    lat: 37.7580,
    lng: -122.4090,
    address: "Cargo Way Interchange",
    reportedAt: "Live",
    status: "active",
    confidence: "96.2%",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "SAFE-101",
    title: "Resurfaced Safe Segment A4",
    type: "safe",
    severity: "low",
    severityScore: 1.0,
    smoothnessIndex: "98/100",
    district: "North Sector",
    lat: 37.7890,
    lng: -122.4320,
    address: "Grand Avenue Corridor",
    reportedAt: "Verified Today",
    status: "resolved",
    confidence: "99.9%",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "SAFE-102",
    title: "Smooth Flow Expressway",
    type: "safe",
    severity: "low",
    severityScore: 0.8,
    smoothnessIndex: "99/100",
    district: "West Hub",
    lat: 37.7610,
    lng: -122.4550,
    address: "Sunset Highway Section 3",
    reportedAt: "Verified 1h ago",
    status: "resolved",
    confidence: "99.7%",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
  }
];

export const CCTV_FEEDS = [
  {
    id: "CAM-01",
    name: "Downtown Flyover 4K AI",
    district: "Downtown",
    fps: 60,
    resolution: "3840x2160",
    activeVehicles: 34,
    potholesInView: 2,
    congestion: "High (78%)",
    streamUrl: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80",
    boxes: [
      { id: "b1", label: "Pothole #402", conf: "98.7%", type: "pothole", x: 35, y: 55, w: 18, h: 14, severity: "Critical" },
      { id: "b2", label: "Tesla Model Y", conf: "99.1%", type: "vehicle", x: 60, y: 30, w: 22, h: 25, speed: "42 km/h" },
      { id: "b3", label: "Delivery Truck", conf: "96.4%", type: "vehicle", x: 12, y: 40, w: 25, h: 30, speed: "38 km/h" }
    ]
  },
  {
    id: "CAM-02",
    name: "North Highway Junction",
    district: "North Sector",
    fps: 59,
    resolution: "3840x2160",
    activeVehicles: 18,
    potholesInView: 1,
    congestion: "Normal (32%)",
    streamUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    boxes: [
      { id: "b4", label: "Crack Defect #109", conf: "94.2%", type: "pothole", x: 48, y: 65, w: 14, h: 10, severity: "Moderate" },
      { id: "b5", label: "Sedan B8", conf: "98.0%", type: "vehicle", x: 25, y: 25, w: 20, h: 20, speed: "65 km/h" }
    ]
  },
  {
    id: "CAM-03",
    name: "Industrial Sector Terminal",
    district: "Industrial Zone",
    fps: 60,
    resolution: "1920x1080",
    activeVehicles: 42,
    potholesInView: 3,
    congestion: "Severe (91%)",
    streamUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    boxes: [
      { id: "b6", label: "Deep Pit #882", conf: "99.4%", type: "pothole", x: 22, y: 60, w: 20, h: 18, severity: "Critical" },
      { id: "b7", label: "Heavy Rig", conf: "97.1%", type: "vehicle", x: 50, y: 20, w: 35, h: 40, speed: "18 km/h" }
    ]
  }
];

export const MONTHLY_DETECTION_DATA = [
  { month: "Jan", potholes: 3200, resolved: 3100, trafficDelay: 42 },
  { month: "Feb", potholes: 4100, resolved: 3850, trafficDelay: 38 },
  { month: "Mar", potholes: 5400, resolved: 5120, trafficDelay: 45 },
  { month: "Apr", potholes: 4800, resolved: 4600, trafficDelay: 32 },
  { month: "May", potholes: 6200, resolved: 5980, trafficDelay: 28 },
  { month: "Jun", potholes: 7900, resolved: 7600, trafficDelay: 22 },
  { month: "Jul", potholes: 8500, resolved: 8200, trafficDelay: 19 }
];

export const DISTRICT_REPAIR_DATA = [
  { district: "Downtown", pending: 18, inProgress: 14, completed: 1420 },
  { district: "North Sector", pending: 8, inProgress: 9, completed: 980 },
  { district: "West Hub", pending: 12, inProgress: 6, completed: 860 },
  { district: "Industrial", pending: 4, inProgress: 5, completed: 590 }
];

export const SEVERITY_DISTRIBUTION = [
  { name: "Critical (>8cm)", value: 24, color: "#EF4444" },
  { name: "High (5-8cm)", value: 38, color: "#F97316" },
  { name: "Moderate (3-5cm)", value: 26, color: "#EAB308" },
  { name: "Minor Surface Crack", value: 12, color: "#10B981" }
];

export const TRAFFIC_HOURLY_DATA = [
  { time: "06:00", density: 25, speed: 68 },
  { time: "08:00", density: 88, speed: 22 },
  { time: "10:00", density: 64, speed: 45 },
  { time: "12:00", density: 55, speed: 52 },
  { time: "14:00", density: 60, speed: 48 },
  { time: "17:00", density: 95, speed: 18 },
  { time: "19:00", density: 72, speed: 38 },
  { time: "22:00", density: 30, speed: 65 }
];

export const RECENT_ALERTS = [
  {
    id: "ALT-901",
    time: "2 mins ago",
    title: "Critical Pothole Flagged",
    location: "Main St Expressway #742",
    severity: "Critical",
    aiConfidence: "99.1%",
    type: "pothole"
  },
  {
    id: "ALT-902",
    time: "12 mins ago",
    title: "Traffic Congestion Spiked",
    location: "Financial Center Flyover",
    severity: "High",
    aiConfidence: "97.4%",
    type: "traffic"
  },
  {
    id: "ALT-903",
    time: "28 mins ago",
    title: "Maintenance Unit Dispatched",
    location: "North Boulevard Block B",
    severity: "Info",
    aiConfidence: "Verified",
    type: "dispatch"
  },
  {
    id: "ALT-904",
    time: "45 mins ago",
    title: "Pothole Repair Verified",
    location: "Grand Avenue Corridor",
    severity: "Resolved",
    aiConfidence: "99.9%",
    type: "resolved"
  }
];

export const SAMPLE_ROAD_IMAGES = [
  {
    id: "sample-1",
    name: "Deep Asphalt Pit (Critical)",
    url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    confidence: "98.9%",
    depth: "11.4 cm",
    dangerScore: "9.6 / 10",
    priority: "P1 - Emergency Repair",
    crackType: "Severe Sub-base Structural Crater",
    estCost: "$1,450"
  },
  {
    id: "sample-2",
    name: "Subsurface Alligator Cracking",
    url: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80",
    confidence: "96.2%",
    depth: "4.8 cm",
    dangerScore: "6.4 / 10",
    priority: "P2 - Urgent Resurfacing",
    crackType: "Fatigue Alligator Pattern",
    estCost: "$780"
  },
  {
    id: "sample-3",
    name: "Road Edge Failure",
    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    confidence: "97.8%",
    depth: "8.2 cm",
    dangerScore: "8.1 / 10",
    priority: "P1 - Priority Dispatch",
    crackType: "Shoulder Edge Shear",
    estCost: "$1,120"
  }
];
