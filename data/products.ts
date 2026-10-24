export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  longDescription: string;
  features: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  image: string;
  featured: boolean;
  badge?: "Bestseller" | "New" | "Sale" | "Staff Pick";
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimalist Wooden Desk Lamp",
    slug: "minimalist-wooden-desk-lamp",
    price: 45,
    originalPrice: 60,
    category: "Lighting & Lamps",
    description: "Sleek, touch-controlled warm LED lighting with solid beechwood base.",
    longDescription: "Crafted from sustainable beechwood and brushed matte aluminum, this minimalist desk lamp provides flicker-free, warm-to-cool adjustable light suitable for late-night coding and deep focus sessions. Features infinite dimmer touch controls and a built-in 10W wireless charging cradle.",
    features: ["Stepless touch brightness control", "3 color temperature modes (3000K-5500K)", "Solid beechwood base", "Qi 10W wireless phone charging base"],
    stock: 18,
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "Bestseller"
  },
  {
    id: "2",
    name: "Pro Mechanical Ergonomic Keyboard",
    slug: "pro-mechanical-ergonomic-keyboard",
    price: 139,
    originalPrice: 169,
    category: "Keyboards & Typing",
    description: "Hot-swappable custom mechanical keyboard with tactile brown switches.",
    longDescription: "Engineered for writers and developers, this 75% mechanical keyboard features a custom gasket mount design, pre-lubed switches, sound-dampening foam layers, and customizable RGB backlighting. Connect seamlessly via Bluetooth 5.1, 2.4GHz wireless dongle, or USB-C.",
    features: ["Hot-swappable switch sockets", "Gasket-mounted acoustic dampening", "Bluetooth 5.1 & 2.4Ghz multi-device pairing", "PBT dye-sublimated keycaps"],
    stock: 7,
    rating: 4.9,
    reviewsCount: 289,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "Bestseller"
  },
  {
    id: "3",
    name: "Precision Wireless Ergonomic Mouse",
    slug: "precision-wireless-ergonomic-mouse",
    price: 59,
    originalPrice: 75,
    category: "Mice & Pointers",
    description: "Ergonomic 57-degree natural handshake angle with hyper-fast scroll.",
    longDescription: "Designed with human factors engineers, the Precision Wireless Mouse relieves forearm strain and wrist pressure throughout long work days. Equipped with an optical 4000 DPI sensor that tracks on glass and whisper-quiet tactile switches.",
    features: ["Natural 57-degree ergonomic vertical angle", "Hyper-scroll magnetic wheel", "Whisper-quiet switches (90% noise reduction)", "Up to 70 days battery life per USB-C charge"],
    stock: 24,
    rating: 4.7,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "Staff Pick"
  },
  {
    id: "4",
    name: "Solid Oak Desk Organizer Tray",
    slug: "solid-oak-desk-organizer-tray",
    price: 34,
    category: "Desk Accessories",
    description: "Hand-finished European white oak tray for pens, keys, and cables.",
    longDescription: "Declutter your workspace aesthetic with this precision-milled solid oak valet tray. Lined with natural grey wool felt in the recessed wells to cushion your premium pens, airpods, and everyday carry essentials without scratching.",
    features: ["100% sustainably harvested oak", "100% natural wool felt lining", "Precision milled pen grooves", "Anti-slip cork feet pads"],
    stock: 14,
    rating: 4.6,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "5",
    name: "Active Noise-Cancelling Studio Headphones",
    slug: "active-noise-cancelling-studio-headphones",
    price: 189,
    originalPrice: 229,
    category: "Audio & Sound",
    description: "Immersive studio-grade acoustic clarity with hybrid active noise cancellation.",
    longDescription: "Tune out background office chatter and coffee shop noise with custom 40mm beryllium drivers delivering deep, resonant bass and crystal highs. Memory foam protein leather earcups ensure all-day comfort during marathon focus sessions.",
    features: ["Hybrid Active Noise Cancellation (-38dB)", "40-hour battery life with fast charge", "Custom 40mm bio-cellulose drivers", "Multipoint Bluetooth connection"],
    stock: 9,
    rating: 4.9,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "Bestseller"
  },
  {
    id: "6",
    name: "Aluminum Curved Monitor Screenbar",
    slug: "aluminum-curved-monitor-screenbar",
    price: 68,
    category: "Lighting & Lamps",
    description: "Asymmetric glare-free monitor lightbar with wireless desktop dial.",
    longDescription: "Illuminates your desk workspace without bouncing light or glare off your computer monitor. Features asymmetric optical design, high Ra95 color rendering index for accurate photo and code viewing, and an intuitive wireless rotary desktop controller.",
    features: ["Zero screen glare asymmetric projection", "Ra95 high color rendering index", "Wireless 2.4G desk rotary dial controller", "Universal mount fits curved & flat monitors"],
    stock: 15,
    rating: 4.7,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "New"
  },
  {
    id: "7",
    name: "Wool Felt Large Desk Mat (90x40cm)",
    slug: "wool-felt-large-desk-mat",
    price: 29,
    originalPrice: 38,
    category: "Desk Accessories",
    description: "Extra large Merino wool blend felt pad with anti-slip silicone backing.",
    longDescription: "Provides an instantly cozy, elevated tactile feel under your keyboard and mouse while protecting your desk surface. Laser-cut edges ensure no fraying, and water-repellent coating makes accidental coffee spills wipe right off.",
    features: ["Extra-large 900 x 400 mm dimensions", "Spill-resistant hydro-phobic treatment", "Silicone honeycomb non-slip base", "Thermal insulation against cold surfaces"],
    stock: 35,
    rating: 4.6,
    reviewsCount: 167,
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80",
    featured: false,
    badge: "Sale"
  },
  {
    id: "8",
    name: "Solid Walnut Laptop Riser Stand",
    slug: "solid-walnut-laptop-riser-stand",
    price: 49,
    category: "Workspaces & Desks",
    description: "Brings your screen to ergonomic eye level with passive cooling airflow.",
    longDescription: "Precision crafted from American Black Walnut and aircraft-grade matte aluminum. Elevates your MacBook or laptop 6 inches to promote optimal spinal posture and prevent neck fatigue during long workdays.",
    features: ["Solid American Walnut with natural wax oil finish", "Ergonomic 15-degree angle elevation", "Optimized open air cooling channel", "Supports laptops up to 17 inches"],
    stock: 11,
    rating: 4.8,
    reviewsCount: 79,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "Staff Pick"
  },
  {
    id: "9",
    name: "Hi-Fi Desktop Bookshelf Speakers (Pair)",
    slug: "hi-fi-desktop-bookshelf-speakers",
    price: 159,
    originalPrice: 199,
    category: "Audio & Sound",
    description: "Acoustic wooden cabinet powered speakers with Bluetooth 5.0 and optical DAC.",
    longDescription: "Crisp highs, lush midtones, and punchy bass that fill your room without distortion. Built with 1-inch silk dome tweeters and 4-inch Kevlar woofers encased in resonant-free dense MDF wood enclosures.",
    features: ["60W RMS total continuous power", "Built-in optical DAC and sub-out port", "Silk dome tweeters + Kevlar mid-drivers", "Side-panel treble, bass, and volume dials"],
    stock: 6,
    rating: 4.9,
    reviewsCount: 118,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "Sale"
  },
  {
    id: "10",
    name: "Retro Custom Aviator Coiled USB-C Cable",
    slug: "retro-custom-aviator-coiled-cable",
    price: 24,
    category: "Keyboards & Typing",
    description: "Double-sleeved braided cable with GX16 4-pin detachable aviator connector.",
    longDescription: "The crown jewel of any mechanical keyboard setup. Features tight inner nylon sleeving wrapped with tough PET outer mesh and a hefty zinc-alloy aviator connector for ultra-durable, quick-disconnect power delivery.",
    features: ["GX16 4-pin metal aviator quick-release", "Reverse-coiled tight retention spiral", "Gold-plated USB-C to USB-A connectors", "Supports up to 5V/2A power"],
    stock: 22,
    rating: 4.5,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "11",
    name: "Anodized Aluminum Vertical Laptop Stand",
    slug: "anodized-aluminum-vertical-laptop-stand",
    price: 32,
    category: "Desk Accessories",
    description: "Space-saving dual slot vertical dock for closed clamshell monitor setups.",
    longDescription: "Free up valuable desk space when running your laptop connected to external monitors. Heavy base with silicone pads prevents tipping and protects your device chassis from micro-scratches.",
    features: ["Dual adjustable slot width (0.55 to 1.65 inches)", "Weighted gravity-stable anti-tip base", "Non-scratch silicone interior cushions", "CNC-machined sandblasted aluminum finish"],
    stock: 19,
    rating: 4.7,
    reviewsCount: 43,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "12",
    name: "Studio USB-C Cardioid Condenser Microphone",
    slug: "studio-usb-c-cardioid-microphone",
    price: 95,
    originalPrice: 119,
    category: "Audio & Sound",
    description: "Broadcast-quality voice clarity for calls, podcasting, and streaming.",
    longDescription: "Ditch muddy headset audio with a 24-bit/96kHz high-resolution condenser capsule tuned for rich vocal presence. Includes a tap-to-mute sensor with LED indicator and built-in pop filter and vibration shockmount.",
    features: ["24-bit / 96kHz recording studio resolution", "Cardioid directional vocal pattern", "Zero-latency 3.5mm headphone monitor port", "Quick tap-to-mute capacitive button with LED"],
    stock: 13,
    rating: 4.8,
    reviewsCount: 174,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    featured: false,
    badge: "New"
  },
  {
    id: "13",
    name: "Dual Monitor Solid Wood Desk Shelf",
    slug: "dual-monitor-solid-wood-desk-shelf",
    price: 115,
    category: "Workspaces & Desks",
    description: "Multi-tiered solid hardwood riser with integrated aluminum accessories drawer.",
    longDescription: "Transforms your entire desk organization. Spans 46 inches to accommodate two 27-inch monitors or an ultra-wide display, providing a sheltered shelf underneath for keyboard storage when not typing.",
    features: ["Supports up to 80 lbs (dual monitor setups)", "Integrated powder-coated aluminum drawer", "Hand-oiled finish with smooth beveled edges", "Under-shelf storage clearance (8cm)"],
    stock: 5,
    rating: 4.9,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "Bestseller"
  },
  {
    id: "14",
    name: "Smart Ambient RGB LED Corner Bar",
    slug: "smart-ambient-rgb-led-corner-bar",
    price: 79,
    category: "Lighting & Lamps",
    description: "Minimalist floor corner lamp with 16 million colors and music sync mode.",
    longDescription: "Tucks neatly into any corner to bathe your room walls in soft, indirect atmospheric color washes. Controlled via smartphone app, voice assistants (Alexa/Google), or included wireless remote.",
    features: ["16 million RGB colors + warm daylight whites", "Dynamic music rhythm reactive sensor", "Smartphone app and Alexa/Google control", "Ultra-thin 1.2m powder-coated steel profile"],
    stock: 16,
    rating: 4.6,
    reviewsCount: 104,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "15",
    name: "Magnetic 3-in-1 Fast Wireless Charging Station",
    slug: "magnetic-3-in-1-fast-wireless-charging-station",
    price: 64,
    originalPrice: 85,
    category: "Desk Accessories",
    description: "Simultaneously fast-charges iPhone, Apple Watch, and AirPods on one sleek stand.",
    longDescription: "Eliminate cable clutter on your nightstand or desk. Strong neodymium magnets snap your phone in portrait or landscape for FaceTime and StandBy mode while delivering optimal 15W Qi-certified rapid charging.",
    features: ["15W MagSafe-compatible magnetic snap mount", "Apple Watch magnetic fast charge module", "AirPods wireless charging base recess", "Overheat and foreign object protection"],
    stock: 21,
    rating: 4.7,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "Sale"
  },
  {
    id: "16",
    name: "Ultra-Lightweight Honeycomb Gaming Mouse",
    slug: "ultra-lightweight-honeycomb-gaming-mouse",
    price: 49,
    category: "Mice & Pointers",
    description: "Featherlight 58g chassis with 16,000 DPI PixArt optical sensor.",
    longDescription: "Engineered for lightning-fast cursor flicks and pinpoint accuracy with zero hand fatigue. Equipped with pure Virgin PTFE skates for butter-smooth gliding across any surface.",
    features: ["Ultra-lightweight 58-gram honeycomb shell", "16,000 DPI PixArt 3389 optical sensor", "Virgin grade 100% PTFE mouse skates", "Paracord flexible drag-free cable"],
    stock: 17,
    rating: 4.5,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "17",
    name: "Memory Foam Contoured Keyboard Wrist Rest",
    slug: "memory-foam-contoured-keyboard-wrist-rest",
    price: 22,
    category: "Keyboards & Typing",
    description: "Ergonomic cooling-gel infused cushion for standard and tenkeyless keyboards.",
    longDescription: "Prevents carpal tunnel syndrome and wrist soreness. Infused with cooling gel beads beneath breathable Lycra fabric to keep wrists cool, dry, and comfortably aligned at keyboard height.",
    features: ["Cooling gel infused memory foam core", "Breathable antimicrobial Lycra fabric", "Heavy non-slip rubber base", "Precision anti-fray stitched perimeter"],
    stock: 30,
    rating: 4.8,
    reviewsCount: 133,
    image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "18",
    name: "Under-Desk Steel Cable Management Channel",
    slug: "under-desk-steel-cable-management-channel",
    price: 28,
    category: "Workspaces & Desks",
    description: "Heavy-duty powder-coated steel tray hides power strips, bricks, and wires.",
    longDescription: "The secret to the clean, wire-free desk setups you see on social media. Installs in minutes under any wood desk without drill damage or mounts securely with provided hardware.",
    features: ["16-gauge powder-coated structural steel", "Open mesh ventilation prevents brick heat buildup", "Accommodates wide surge protectors and adapters", "Includes 10 reusable velcro cable straps"],
    stock: 25,
    rating: 4.7,
    reviewsCount: 68,
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "19",
    name: "Ceramic Temperature Controlled Smart Mug",
    slug: "ceramic-temperature-controlled-smart-mug",
    price: 98,
    originalPrice: 125,
    category: "Desk Accessories",
    description: "Maintains your coffee or tea at your precise drinking temperature for hours.",
    longDescription: "Never sip lukewarm coffee again. Set your favorite temperature (120F - 145F) through the smartphone app or directly on the coaster, keeping your beverage piping hot from first sip to last drop.",
    features: ["Precision temperature regulation (120F - 145F)", "All-day heating with charging saucer", "Scratch-resistant ceramic coating", "Auto-sleep sensor detects when mug is empty"],
    stock: 8,
    rating: 4.9,
    reviewsCount: 156,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "Staff Pick"
  },
  {
    id: "20",
    name: "Low-Profile Custom Keycap Set (Retro Chalk)",
    slug: "low-profile-custom-keycap-set-retro-chalk",
    price: 42,
    category: "Keyboards & Typing",
    description: "Thick PBT dye-sublimated keycaps with vintage typewriter aesthetic.",
    longDescription: "Give your mechanical keyboard an unmistakable retro chic flair. 142-key set supports ANSI and ISO layouts across 60%, 65%, 75%, TKL, and full-size boards. Textured finish resists finger oils.",
    features: ["1.5mm thick durable PBT material", "Dye-sublimation will never fade or wear off", "Wide layout compatibility (142 keys included)", "Cherry profile for comfortable typing angle"],
    stock: 12,
    rating: 4.6,
    reviewsCount: 47,
    image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "21",
    name: "4K Ultra-HD Auto-Focus Web Camera with Shutter",
    slug: "4k-ultra-hd-auto-focus-web-camera",
    price: 112,
    originalPrice: 140,
    category: "Audio & Sound",
    description: "Sony Starvis sensor with AI face tracking and physical privacy shutter.",
    longDescription: "Look professional on Zoom calls, client presentations, and streams. Features HDR image processing to balance harsh window backlighting and dual noise-filtering beamforming microphones.",
    features: ["4K UHD 30FPS / 1080P 60FPS Sony sensor", "AI auto-framing and facial auto-exposure", "Physical slide-to-close privacy cover", "Dual omnidirectional noise-cancelling mics"],
    stock: 14,
    rating: 4.8,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
    featured: false,
    badge: "New"
  },
  {
    id: "22",
    name: "Adjustable Height Pneumatic Standing Desk Converter",
    slug: "adjustable-height-pneumatic-standing-desk-converter",
    price: 149,
    originalPrice: 189,
    category: "Workspaces & Desks",
    description: "Effortlessly transition between sitting and standing with gas-spring lift.",
    longDescription: "Instantly transform any existing regular desk into an ergonomic sit-stand workstation. Smooth pneumatic gas spring mechanism lifts dual monitors and laptop smoothly with a gentle squeeze of the hand lever.",
    features: ["Pneumatic gas spring assist mechanism", "Spacious 35-inch two-tier surface", "Stepless height adjustment from 4.7 to 19.7 inches", "Removable full-width keyboard tray"],
    stock: 4,
    rating: 4.7,
    reviewsCount: 81,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "Sale"
  },
  {
    id: "23",
    name: "Precision CNC Aluminum Headphone Stand",
    slug: "precision-cnc-aluminum-headphone-stand",
    price: 36,
    category: "Audio & Sound",
    description: "Sculpted cradle preserves headphone headband shape and cushions.",
    longDescription: "A dedicated sanctuary for your prized headphones. Features a curved silicone headrest matched to headphone headband arches to distribute weight evenly and prevent indentation marks.",
    features: ["Aviation-grade bead-blasted aluminum pillar", "Curved TPU silicone cradle matches headphone arcs", "Solid weighted steel anti-wobble base", "Cable management wrap groove at rear"],
    stock: 20,
    rating: 4.8,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "24",
    name: "Ergonomic Sculpted Trackball Mouse",
    slug: "ergonomic-sculpted-trackball-mouse",
    price: 74,
    category: "Mice & Pointers",
    description: "Thumb-controlled optical trackball eliminates arm and shoulder movement.",
    longDescription: "Ideal for tight desks and CAD/design workflows. Your hand rests at an anatomically comfortable 20-degree tilt while smooth 34mm steel-bearing trackball lets you traverse multiple monitors with zero arm motion.",
    features: ["20-degree adjustable ergonomic hinge angle", "Smooth high-precision 34mm trackball", "Dual connectivity (USB unifying + Bluetooth)", "Customizable thumb shortcut buttons"],
    stock: 10,
    rating: 4.6,
    reviewsCount: 57,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "25",
    name: "Wireless Charging Mouse Pad with Fast Qi Coil",
    slug: "wireless-charging-mouse-pad",
    price: 38,
    originalPrice: 48,
    category: "Mice & Pointers",
    description: "Micro-textured speed surface with built-in 15W Qi phone charging zone.",
    longDescription: "Charge your smartphone effortlessly while you work or game. Features a low-friction micro-textured tracking zone on the right and an integrated Qi wireless charging pad on the left.",
    features: ["Integrated 15W fast Qi induction coil", "Micro-textured low friction tracking surface", "LED charging indicator light", "Waterproof and easy to clean"],
    stock: 19,
    rating: 4.5,
    reviewsCount: 39,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "26",
    name: "Edison Filament Warm Desk Accent Lantern",
    slug: "edison-filament-warm-desk-lantern",
    price: 48,
    category: "Lighting & Lamps",
    description: "Vintage amber spiral filament enclosed in hand-blown smoked borosilicate glass.",
    longDescription: "Brings cozy loft vibes and relaxing mood lighting to any workspace. Features a tactile brass rotary dimmer switch on the braided fabric cord that dims from a soft candle-like flicker to radiant golden glow.",
    features: ["Smoked borosilicate hand-blown glass globe", "Solid brass rotary dimmer control switch", "2200K ultra-warm amber vintage glow", "Reinforced houndstooth braided cable"],
    stock: 15,
    rating: 4.9,
    reviewsCount: 84,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80",
    featured: true,
    badge: "Bestseller"
  }
];

export const CATEGORIES = [
  "All Categories",
  "Workspaces & Desks",
  "Keyboards & Typing",
  "Mice & Pointers",
  "Audio & Sound",
  "Lighting & Lamps",
  "Desk Accessories"
] as const;

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}
