

const ProductIcons = (() => {
  const INK = "#14161d";
  const STEEL = "#e7e9f5";
  const SIGNAL = "#4a3aff";
  const VOLT = "#b4ff39";

  const SHAPES = {
    monitor: () => `
      <rect x="30" y="34" width="180" height="112" rx="6" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <rect x="42" y="46" width="156" height="88" rx="2" fill="${STEEL}" stroke="${INK}" stroke-width="2"/>
      <line x1="120" y1="146" x2="120" y2="168" stroke="${INK}" stroke-width="3"/>
      <path d="M90,168 L150,168 L158,180 L82,180 Z" fill="#fff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="120" cy="90" r="3" fill="${SIGNAL}"/>
    `,

    ultrawide: () => `
      <rect x="14" y="52" width="212" height="80" rx="8" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <rect x="26" y="62" width="188" height="60" rx="3" fill="${STEEL}" stroke="${INK}" stroke-width="2"/>
      <line x1="120" y1="132" x2="120" y2="156" stroke="${INK}" stroke-width="3"/>
      <path d="M92,156 L148,156 L156,170 L84,170 Z" fill="#fff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="120" cy="92" r="3" fill="${SIGNAL}"/>
    `,

    laptop: () => `
      <rect x="52" y="40" width="136" height="92" rx="5" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <rect x="62" y="50" width="116" height="72" rx="2" fill="${STEEL}" stroke="${INK}" stroke-width="2"/>
      <path d="M30,132 L210,132 L222,158 C223,162 220,165 216,165 L24,165 C20,165 17,162 18,158 Z"
            fill="#fff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <line x1="95" y1="149" x2="145" y2="149" stroke="${INK}" stroke-width="2" opacity="0.35"/>
      <circle cx="185" cy="45" r="2.6" fill="${SIGNAL}"/>
    `,

    "laptop-slim": () => `
      <rect x="58" y="46" width="124" height="82" rx="5" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <rect x="67" y="55" width="106" height="64" rx="2" fill="${STEEL}" stroke="${INK}" stroke-width="2"/>
      <path d="M38,128 L202,128 L212,150 C213,153 210,156 207,156 L33,156 C30,156 27,153 28,150 Z"
            fill="#fff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <line x1="98" y1="142" x2="142" y2="142" stroke="${INK}" stroke-width="2" opacity="0.35"/>
      <circle cx="178" cy="51" r="2.4" fill="${SIGNAL}"/>
    `,

    "pc-tower": () => `
      <rect x="78" y="24" width="84" height="152" rx="6" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <rect x="90" y="36" width="60" height="70" rx="2" fill="${STEEL}" stroke="${INK}" stroke-width="2"/>
      <circle cx="120" cy="71" r="20" fill="none" stroke="${SIGNAL}" stroke-width="2"/>
      <circle cx="120" cy="71" r="3" fill="${SIGNAL}"/>
      <line x1="90" y1="118" x2="150" y2="118" stroke="${INK}" stroke-width="2" opacity="0.4"/>
      <line x1="90" y1="128" x2="150" y2="128" stroke="${INK}" stroke-width="2" opacity="0.4"/>
      <line x1="90" y1="138" x2="150" y2="138" stroke="${INK}" stroke-width="2" opacity="0.4"/>
      <circle cx="97" cy="155" r="4" fill="${INK}"/>
    `,

    "pc-sff": () => `
      <rect x="60" y="56" width="120" height="88" rx="6" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <rect x="72" y="68" width="50" height="64" rx="2" fill="${STEEL}" stroke="${INK}" stroke-width="2"/>
      <circle cx="97" cy="100" r="16" fill="none" stroke="${SIGNAL}" stroke-width="2"/>
      <line x1="134" y1="70" x2="168" y2="70" stroke="${INK}" stroke-width="2" opacity="0.4"/>
      <line x1="134" y1="80" x2="168" y2="80" stroke="${INK}" stroke-width="2" opacity="0.4"/>
      <line x1="134" y1="90" x2="168" y2="90" stroke="${INK}" stroke-width="2" opacity="0.4"/>
      <circle cx="145" cy="122" r="4" fill="${INK}"/>
    `,

    mouse: () => `
      <path d="M120,48 C152,48 172,72 172,107 C172,142 154,164 120,164 C86,164 68,142 68,107 C68,72 88,48 120,48 Z"
            fill="#fff" stroke="${INK}" stroke-width="3"/>
      <line x1="120" y1="48" x2="120" y2="96" stroke="${INK}" stroke-width="2.5"/>
      <line x1="104" y1="61" x2="104" y2="91" stroke="${INK}" stroke-width="1.5" opacity="0.35"/>
      <line x1="136" y1="61" x2="136" y2="91" stroke="${INK}" stroke-width="1.5" opacity="0.35"/>
      <rect x="113" y="70" width="14" height="20" rx="4" fill="${SIGNAL}"/>
    `,

    keyboard: () => `
      <rect x="26" y="68" width="188" height="68" rx="8" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <g fill="${STEEL}" stroke="${INK}" stroke-width="1.4">
        <rect x="36" y="79" width="15" height="12" rx="2"/><rect x="55" y="79" width="15" height="12" rx="2"/><rect x="74" y="79" width="15" height="12" rx="2"/><rect x="93" y="79" width="15" height="12" rx="2"/><rect x="112" y="79" width="15" height="12" rx="2"/><rect x="131" y="79" width="15" height="12" rx="2"/><rect x="150" y="79" width="15" height="12" rx="2"/><rect x="169" y="79" width="15" height="12" rx="2"/><rect x="188" y="79" width="15" height="12" rx="2"/>
        <rect x="36" y="96" width="15" height="12" rx="2"/><rect x="55" y="96" width="15" height="12" rx="2"/><rect x="74" y="96" width="15" height="12" rx="2"/><rect x="93" y="96" width="15" height="12" rx="2"/><rect x="112" y="96" width="15" height="12" rx="2"/><rect x="131" y="96" width="15" height="12" rx="2"/><rect x="150" y="96" width="15" height="12" rx="2"/><rect x="169" y="96" width="15" height="12" rx="2"/><rect x="188" y="96" width="15" height="12" rx="2"/>
        <rect x="55" y="113" width="90" height="12" rx="2"/>
      </g>
      <rect x="36" y="79" width="15" height="12" rx="2" fill="${VOLT}" stroke="${INK}" stroke-width="1.4"/>
    `,

    headset: () => `
      <path d="M60,112 C60,72 87,46 120,46 C153,46 180,72 180,112" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
      <rect x="44" y="102" width="27" height="48" rx="13" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <rect x="169" y="102" width="27" height="48" rx="13" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <circle cx="57.5" cy="126" r="6" fill="${STEEL}"/>
      <circle cx="182.5" cy="126" r="6" fill="${SIGNAL}"/>
      <path d="M183,146 C183,161 173,169 158,170" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="157" cy="170" r="3.5" fill="${INK}"/>
    `,

    "monitor-arm": () => `
      <rect x="18" y="150" width="48" height="11" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <rect x="37" y="64" width="8" height="90" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <line x1="41" y1="80" x2="120" y2="64" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <line x1="120" y1="64" x2="154" y2="90" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="41" cy="80" r="5.5" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <circle cx="120" cy="64" r="5.5" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <rect x="154" y="66" width="68" height="48" rx="4" fill="${STEEL}" stroke="${INK}" stroke-width="3"/>
      <circle cx="188" cy="90" r="2.6" fill="${SIGNAL}"/>
    `,

    "mic-arm": () => `
      <rect x="28" y="150" width="42" height="10" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <rect x="45" y="88" width="7" height="64" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <line x1="48" y1="97" x2="132" y2="68" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <line x1="132" y1="68" x2="175" y2="97" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="48" cy="97" r="4.8" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <circle cx="132" cy="68" r="4.8" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
      <rect x="167" y="90" width="17" height="36" rx="8.5" fill="${STEEL}" stroke="${INK}" stroke-width="3"/>
      <path d="M171,97 a4.5,11 0 0 0 9,0" fill="none" stroke="${INK}" stroke-width="1.5" opacity="0.5"/>
      <circle cx="175.5" cy="118" r="2.4" fill="${SIGNAL}"/>
    `,
  };


  function getBundleIllustration() {
    return `
      <svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bundle illustration">
        <rect x="20" y="18" width="112" height="72" rx="5" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
        <rect x="27" y="25" width="98" height="54" rx="2" fill="${STEEL}" stroke="${INK}" stroke-width="1.4"/>
        <line x1="76" y1="90" x2="76" y2="102" stroke="${INK}" stroke-width="2.4"/>
        <path d="M58,102 L94,102 L99,111 L53,111 Z" fill="#fff" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>

        <rect x="158" y="34" width="52" height="94" rx="5" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
        <rect x="165" y="42" width="38" height="42" rx="2" fill="${STEEL}" stroke="${INK}" stroke-width="1.4"/>
        <circle cx="184" cy="63" r="12" fill="none" stroke="${SIGNAL}" stroke-width="1.4"/>

        <rect x="16" y="106" width="82" height="30" rx="6" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
        <rect x="24" y="113" width="12" height="8" rx="2" fill="${STEEL}"/>
        <rect x="40" y="113" width="12" height="8" rx="2" fill="${STEEL}"/>
        <rect x="56" y="113" width="12" height="8" rx="2" fill="${STEEL}"/>
        <rect x="72" y="113" width="12" height="8" rx="2" fill="${VOLT}"/>

        <path d="M112,80 C112,64 124,53 139,53 C154,53 166,64 166,80" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
        <rect x="105" y="76" width="13" height="24" rx="6" fill="#fff" stroke="${INK}" stroke-width="1.8"/>
        <rect x="160" y="76" width="13" height="24" rx="6" fill="#fff" stroke="${INK}" stroke-width="1.8"/>
      </svg>
    `;
  }


  function getIllustration(product, opts = {}) {
    const drawer = SHAPES[product.shape] || SHAPES.monitor;
    const inner = drawer();
    return `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${product.name} illustration">${inner}</svg>`;
  }

  return { getIllustration, getBundleIllustration };
})();
