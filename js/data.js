

const CATEGORIES = [
  { id: "monitors", label: "Monitors" },
  { id: "laptops", label: "Laptops" },
  { id: "pcs", label: "Desktop PCs" },
  { id: "accessories", label: "Accessories" },
];

const PRODUCTS = [

  {
    id: "vector-27-165",
    name: "Vector 27\" QHD 165Hz",
    shape: "monitor",
    category: "monitors",
    price: 14000,
    statLabel: "165Hz",
    image: "images/compumarts-monitor.jpg",
    specs: { "Panel": "27\" QHD IPS", "Refresh rate": "165Hz", "Response time": "1ms GtG", "Ports": "DP 1.4, HDMI 2.1 x2" },
    sku: "LO-MN-VEC27",
    description: "The one most people should buy first. Fast enough for competitive play, sharp enough for everything else, and priced so the rest of your budget can go toward the GPU.",
  },
  {
    id: "apex-25-360",
    name: "Apex 25\" FHD 360Hz",
    shape: "monitor",
    category: "monitors",
    price: 49562,
    statLabel: "360Hz",
    image: "images/compumarts-monitor2.jpg",
    specs: { "Panel": "24.5\" FHD TN", "Refresh rate": "360Hz", "Response time": "0.5ms GtG", "Ports": "DP 1.4, HDMI 2.0" },
    sku: "LO-MN-APX25",
    description: "Built for the frame-rate chasers. Every setting on this panel is tuned for one job: getting the image off the GPU and in front of your eyes as fast as physically possible.",
  },
  {
    id: "horizon-34-uw",
    name: "Horizon 34\" Ultrawide",
    shape: "ultrawide",
    category: "monitors",
    price: 32000,
    statLabel: "21:9",
    image: "images/compumarts-monitor3.jpg",
    specs: { "Panel": "34\" QHD VA, curved 1800R", "Refresh rate": "144Hz", "Response time": "1ms GtG", "Ports": "DP 1.4, HDMI 2.1, USB-C 90W" },
    sku: "LO-MN-HZ34",
    description: "Wide enough to replace a two-monitor setup outright. The curve keeps the edges from stretching out of your field of view, which matters more than the spec sheet makes it sound.",
  },
  {
    id: "monolith-32-4k",
    name: "Monolith 32\" 4K",
    shape: "monitor",
    category: "monitors",
    price: 7500,
    statLabel: "4K/144",
    image: "images/compumarts-monitor.jpg",
    specs: { "Panel": "32\" 4K IPS", "Refresh rate": "144Hz", "Response time": "1ms GtG", "Ports": "DP 1.4, HDMI 2.1 x2, USB-C 65W" },
    sku: "LO-MN-MLT32",
    description: "For a rig with the GPU to actually drive it. Doubles as a legitimately good monitor for editing and work — the panel doesn't know the difference between a game and a spreadsheet.",
  },
  {
    id: "scout-24-fhd",
    name: "Scout 24\" FHD 180Hz",
    shape: "monitor",
    category: "monitors",
    price: 9400,
    statLabel: "180Hz",
    image: "images/compumarts-monitor2.jpg",
    specs: { "Panel": "23.8\" FHD IPS", "Refresh rate": "180Hz", "Response time": "1ms GtG", "Ports": "DP 1.2, HDMI 2.0 x2" },
    sku: "LO-MN-SCT24",
    description: "The budget pick that doesn't feel like one. If this is your first high-refresh monitor, the jump from 60Hz will matter a lot more than the jump from here to a pricier panel.",
  },


  {
    id: "voyager-15",
    name: "MSI Vector 17 HX ",
    shape: "laptop",
    category: "laptops",
    price: 188888,
    statLabel: "RTX 5090",
    image: "images/compumarts-laptop.webp",
    specs: { "GPU": "RTX 5090 32GB", "CPU": "Core Ultra 9 , 4.8GHz boost", "RAM": "32GB DDR5", "Display": "15.6\" QHD 165Hz" },
    sku: "LO-LP-VOY15",
    description: "The middle-of-the-road pick that isn't a compromise. Enough GPU for 1440p at high settings, a chassis that doesn't sound like a hair dryer under load.",
  },
  {
    id: "titan-17",
    name: "Gigabyte-AORUS-MASTER-18",
    shape: "laptop",
    category: "laptops",
    price: 244444,
    statLabel: "RTX 5090",
    image: "images/Gigabyte-AORUS-MASTER-18-BZH-Gaming-Laptop_01_18c317a4-c725-4f71-af5e-5f334920b4ce.webp",
    specs: { "GPU": "RTX 5090 24GB", "CPU": "core ultra 9, 5.4GHz boost", "RAM": "64GB DDR5", "Display": "18\" QHD 240Hz" },
    sku: "LO-LP-TTN17",
    description: "For people who've decided a desk is optional but a desktop-class frame rate isn't. Heavy, loud under load, and unapologetic about both.",
  },
  {
    id: "slate-14",
    name: "Lenovo-Legion-Pro-7i",
    shape: "laptop-slim",
    category: "laptops",
    price: 210000,
    statLabel: "RTX 5090",
    image: "images/Lenovo-Legion-Pro-7i-16IAX10H_04.webp",
    specs: { "GPU": "RTX 5090 24GB", "CPU": "Core Ultra 9 , 4.7GHz boost", "RAM": "64GB DDR5", "Display": "14\" QHD+ 120Hz" },
    sku: "LO-LP-SLT14",
    description: "Built for a backpack, not a battlestation. You give up some GPU headroom for a machine that's actually pleasant to carry to class or a coffee shop.",
  },
  {
    id: "forge-16-creator",
    name: "ASUS-TUF-Gaming-F16",
    shape: "laptop",
    category: "laptops",
    price: 80000,
    statLabel: "32GB RAM",
    image: "images/ASUS-TUF-Gaming-F16-_TUF608JPR-RV084__01.webp",
    specs: { "GPU": "RTX 4070 8GB", "CPU": "14-core, 5.2GHz boost", "RAM": "32GB DDR5", "Display": "16\" 4K 120Hz, 100% DCI-P3" },
    sku: "LO-LP-FRG16",
    description: "Color-accurate enough for render work during the day, fast enough to not feel like a downgrade after hours. The RAM headroom is the point here, not the GPU.",
  },

  {
    id: "ignition-entry",
    name: "Ignition Entry Build",
    shape: "pc-tower",
    category: "pcs",
    price: 45000,
    statLabel: "RTX 4060",
    image: "images/CPC-BUNDLE-ANTEC_01_jpg.webp",
    specs: { "GPU": "RTX 4060 8GB", "CPU": "6-core, 4.5GHz boost", "RAM": "16GB DDR5", "Storage": "1TB NVMe SSD" },
    sku: "LO-PC-IGN01",
    description: "The build we point first-timers toward. 1080p high-refresh without hesitation, 1440p if you're willing to touch a settings menu.",
  },
  {
    id: "vanguard-mid",
    name: "Vanguard Mid-Tower",
    shape: "pc-tower",
    category: "pcs",
    price: 80000,
    statLabel: "RTX 4070 Ti",
    image: "images/1BCC4E13-CC37-4273-A1E7-ED89B25FA1A4.webp",
    specs: { "GPU": "RTX 4070 Ti 12GB", "CPU": "12-core, 5.1GHz boost", "RAM": "32GB DDR5", "Storage": "2TB NVMe SSD" },
    sku: "LO-PC-VGD01",
    description: "The one most of our regulars end up with. Tempered-glass panel, three fans on the intake, and enough headroom that you won't be shopping again next year.",
  },
  {
    id: "apex-liquid",
    name: "Apex Liquid-Cooled Flagship",
    shape: "pc-tower",
    category: "pcs",
    price: 64000,
    statLabel: "RTX 4090",
    image: "images/Ryzen-5-4500_01_jpg.webp",
    specs: { "GPU": "RTX 4090 24GB", "CPU": "24-core, 5.8GHz boost", "RAM": "64GB DDR5", "Storage": "4TB NVMe SSD" },
    sku: "LO-PC-APX01",
    description: "No compromises, and priced like it. 360mm AIO on the CPU, a case designed around airflow rather than window space, built to run flat-out for years.",
  },
  {
    id: "compact-sff",
    name: "Compact SFF Build",
    shape: "pc-sff",
    category: "pcs",
    price: 58000,
    statLabel: "12L case",
    image: "images/compumarts-pccase.jpg",
    specs: { "GPU": "RTX 4070 12GB", "CPU": "10-core, 5.0GHz boost", "RAM": "32GB DDR5", "Storage": "1TB NVMe SSD" },
    sku: "LO-PC-SFF01",
    description: "Full-size performance in a case that fits on a shelf. Every component in here was picked partly for how well it fits, not just how fast it is.",
  },
  {
    id: "broadcast-streamer",
    name: "Broadcast Streaming Rig",
    shape: "pc-tower",
    category: "pcs",
    price: 85000,
    statLabel: "16-core CPU",
    image: "images/compumarts-pc.png",
    specs: { "GPU": "RTX 4070 Ti 12GB", "CPU": "16-core, 5.3GHz boost", "RAM": "64GB DDR5", "Storage": "2TB NVMe SSD" },
    sku: "LO-PC-BST01",
    description: "Extra cores for the encode, extra RAM for the browser tabs, chat overlay, and game running at once. Built for a machine that has to do two jobs at the same time.",
  },

  {
    id: "glide-wireless",
    name: "Glide Wireless Mouse",
    shape: "mouse",
    category: "accessories",
    price: 10331,
    statLabel: "26K DPI",
    image: "images/compumarts-mouse.jpg",
    specs: { "Sensor": "26,000 DPI optical", "Weight": "58g", "Battery": "70hr wireless", "Switches": "Optical, 80M clicks" },
    sku: "LO-AC-GLD01",
    description: "Light enough to forget it's wireless. The battery number is real-world, not a best-case marketing figure — we tested it with RGB on.",
  },
  {
    id: "precision-wired",
    name: "Precision Wired Mouse",
    shape: "mouse",
    category: "accessories",
    price: 49,
    statLabel: "1ms poll",
    image: "images/compumarts-mouse.jpg",
    specs: { "Sensor": "18,000 DPI optical", "Weight": "63g", "Cable": "Paracord, 1.8m", "Switches": "Mechanical, 50M clicks" },
    sku: "LO-AC-PRC01",
    description: "No battery, no charging cable, no latency argument. For the segment of players who'd rather not have that debate at all.",
  },
  {
    id: "cadence-tkl",
    name: "Cadence TKL Mechanical",
    shape: "keyboard",
    category: "accessories",
    price: 16869,
    statLabel: "Hot-swap",
    image: "images/compumarts-keyboard.jpg",
    specs: { "Layout": "Tenkeyless (87-key)", "Switches": "Hot-swappable linear", "Connection": "USB-C, detachable", "Keycaps": "PBT double-shot" },
    sku: "LO-AC-CAD01",
    description: "Swap switches without a soldering iron. Comes set up with linears, but the hot-swap sockets mean that's a starting point, not a commitment.",
  },
  {
    id: "cadence-full",
    name: "Cadence Full-Size Mechanical",
    shape: "keyboard",
    category: "accessories",
    price: 149,
    statLabel: "Hot-swap",
    image: "images/compumarts-keyboard.jpg",
    specs: { "Layout": "Full-size (104-key)", "Switches": "Hot-swappable linear", "Connection": "USB-C, detachable", "Keycaps": "PBT double-shot" },
    sku: "LO-AC-CAD02",
    description: "Same board as the Cadence TKL with the numpad left on, for anyone who still does spreadsheet work between matches.",
  },
  {
    id: "relay-headset",
    name: "Relay Wireless Headset",
    shape: "headset",
    category: "accessories",
    price: 1200,
    statLabel: "24hr batt",
    image: "images/compumarts-headset.jpg",
    specs: { "Drivers": "50mm neodymium", "Connection": "2.4GHz wireless + Bluetooth", "Battery": "24hr", "Mic": "Detachable cardioid" },
    sku: "LO-AC-RLY01",
    description: "Two connections means it pairs to your phone without dropping the low-latency link to your PC. The mic detaches clean for anyone who won't wear it outside.",
  },
  {
    id: "signal-wired-headset",
    name: "Signal Wired Headset",
    shape: "headset",
    category: "accessories",
    price: 11638,
    statLabel: "7.1 surr",
    image: "images/compumarts-headset.jpg",
    specs: { "Drivers": "50mm neodymium", "Connection": "USB, 2m cable", "Surround": "Virtual 7.1", "Mic": "Boom, flip-to-mute" },
    sku: "LO-AC-SIG01",
    description: "Software 7.1 that's genuinely useful for footstep positioning, on a headset that doesn't need charging mid-session.",
  },
  {
    id: "pivot-monitor-arm",
    name: "Pivot Monitor Arm",
    shape: "monitor-arm",
    category: "accessories",
    price: 450,
    statLabel: "Gas-spring",
    image: "images/compumarts-monitor-arm.jpg",
    specs: { "Mount": "Desk clamp + grommet", "Weight range": "4.4–19.8 lb", "Movement": "Full tilt, swivel, rotate", "VESA": "75x75 / 100x100" },
    sku: "LO-AC-PVT01",
    description: "The single upgrade that changes a desk's whole feel. Gets the monitor off the stand, off the desk surface, and exactly where your neck wants it.",
  },
  {
    id: "boom-mic-arm",
    name: "Boom Mic Arm",
    shape: "mic-arm",
    category: "accessories",
    price: 350,
    statLabel: "Cable route",
    image: "images/compumarts-mic-arm.jpg",
    specs: { "Mount": "Desk clamp", "Reach": "32\" extended", "Cable routing": "Internal, spring-tensioned", "Compatible": "XLR + USB mics" },
    sku: "LO-AC-BOM01",
    description: "Internal cable routing means no XLR cord swinging into frame. Spring tension holds position without the slow droop cheaper arms get after a month.",
  },
];

const BUNDLES = [
  {
    id: "starter-setup",
    name: "Starter Setup",
    tagline: "Everything to go from nothing to playing tonight.",
    badge: "Best for first builds",
    image: "images/bundle-ryzen-5600.png",
    productIds: ["ignition-entry", "scout-24-fhd", "precision-wired", "cadence-tkl"],
    bundlePrice: 40000,
  },
  {
    id: "competitive-loadout",
    name: "Competitive Loadout",
    tagline: "Tuned for frame rate and reaction time, nothing else.",
    badge: "Esports-ready",
    image: "images/bundle-gaming-pc.jpg",
    productIds: ["apex-25-360", "glide-wireless", "cadence-tkl", "signal-wired-headset"],
    bundlePrice: 84000,
  },
  {
    id: "streamer-battlestation",
    name: "Streamer Battlestation",
    tagline: "Broadcast-ready, with the desk to match.",
    badge: "Content creator pick",
    image: "images/bundle-horus.jpg",
    productIds: ["broadcast-streamer", "monolith-32-4k", "relay-headset", "pivot-monitor-arm", "boom-mic-arm"],
    bundlePrice: 75000,
  },
  {
    id: "creator-powerhouse",
    name: "Creator Powerhouse",
    tagline: "Render, stream, and play on the same machine.",
    badge: "Most GPU per dollar",
    image: "images/bundle-lofi-red.jpg",
    productIds: ["apex-liquid", "monolith-32-4k", "cadence-full", "relay-headset"],
    bundlePrice: 65000,
  },
  {
    id: "portable-pro",
    name: "Portable Pro",
    tagline: "A full loadout that folds shut and fits in a bag.",
    badge: "Grab-and-go",
    image: "images/bundle-lofi-blue.jpg",
    productIds: ["voyager-15", "glide-wireless", "signal-wired-headset"],
    bundlePrice: 170000,
  },
];


function getCategoryLabel(categoryId) {
  const match = CATEGORIES.find((cat) => cat.id === categoryId);
  return match ? match.label : categoryId;
}

function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id) || null;
}

function getBundleById(id) {
  return BUNDLES.find((bundle) => bundle.id === id) || null;
}

function getBundleProducts(bundle) {
  return bundle.productIds.map(getProductById).filter(Boolean);
}

function getBundleListTotal(bundle) {
  return getBundleProducts(bundle).reduce((sum, p) => sum + p.price, 0);
}

function getBundleSavings(bundle) {
  return Math.max(0, getBundleListTotal(bundle) - bundle.bundlePrice);
}

function getBundleSavingsPercent(bundle) {
  const listTotal = getBundleListTotal(bundle);
  if (listTotal <= 0) return 0;
  return Math.round((getBundleSavings(bundle) / listTotal) * 100);
}
