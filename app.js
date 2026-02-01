(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  // ---------- Names (random generator) ----------
  const NAME_PART_A = ["Black", "Row", "Storm", "Iron", "Ash", "Dusk", "Sun", "Tide", "Root", "Ember", "Wolf", "Gale", "Hollow", "Stone", "Scarlet"];
  const NAME_PART_B = ["Wardens", "Blades", "Hearth", "Covenant", "Sails", "Crown", "Thorn", "Circle", "Company", "Pack", "Vanguard", "Oath", "Knights", "Kindred", "Sentinels"];
  const NAME_PART_C = ["of Nightwood", "of the Veinwood", "of Telluria", "of Aurush", "of Pelagos", "of the First Sun", "of the Ironbow", "of the Scarlet Isles", "of the Salt Coast", "of the Rootbound"];

  function randomName(){
    const a = pick(NAME_PART_A);
    const b = pick(NAME_PART_B);
    const c = Math.random() < 0.55 ? ` ${pick(NAME_PART_C)}` : "";
    return `${a}${b}${c}`;
  }

  // ---------- Data ----------
  const SHIELDS = [
    { id:"heater",  name:"Heater (classic)", path: shieldPathHeater },
    { id:"round",   name:"Round",            path: shieldPathRound },
    { id:"kite",    name:"Kite",             path: shieldPathKite },
    { id:"spanish", name:"Spanish",          path: shieldPathSpanish },
    { id:"gothic",  name:"Gothic",           path: shieldPathGothic },
    { id:"badge",   name:"Badge (oval)",     path: shieldPathOval },
  ];

  const BORDERS = [
    { id:"plain", name:"Plain" },
    { id:"double", name:"Double line" },
    { id:"notched", name:"Notched" },
    { id:"rope", name:"Rope" },
    { id:"beaded", name:"Beaded" },
  ];

  const PATTERNS = [
    { id:"solid", name:"Solid" },
    { id:"perFess", name:"Per fess (horizontal split)" },
    { id:"perPale", name:"Per pale (vertical split)" },
    { id:"perBend", name:"Per bend (diagonal)" },
    { id:"quarterly", name:"Quarterly" },
    { id:"chevron", name:"Chevron" },
    { id:"stripes", name:"Stripes" },
    { id:"cross", name:"Cross" },
  ];

  const TEXTURES = [
    { id:"none", name:"None" },
    { id:"grain", name:"Grain" },
    { id:"speckle", name:"Speckle" },
    { id:"etch", name:"Etched" },
  ];

  const PALETTES = [
    { id:"scarletGold", name:"Scarlet & Gold", a:"#7a1111", b:"#d8b25b", c:"#151010", ink:"#0b0a0a" },
    { id:"midnightGold", name:"Midnight & Gold", a:"#0d1b2a", b:"#d8b25b", c:"#0b0a0a", ink:"#0b0a0a" },
    { id:"forestGold", name:"Forest & Gold", a:"#12311e", b:"#d8b25b", c:"#0b0a0a", ink:"#0b0a0a" },
    { id:"seaSilver", name:"Sea & Silver", a:"#0f3a52", b:"#d6dce2", c:"#081018", ink:"#071017" },
    { id:"emberAsh", name:"Ember & Ash", a:"#5a130a", b:"#f07c3a", c:"#1a0f0b", ink:"#120907" },
    { id:"royal", name:"Royal", a:"#1a2a6a", b:"#f2e0b5", c:"#1a0f18", ink:"#0c0a0f" },
    { id:"stone", name:"Stone", a:"#2a2a2a", b:"#bdb5a6", c:"#0f0f0f", ink:"#0b0b0b" },
    { id:"sunset", name:"Sunset", a:"#4a0f2c", b:"#f2a33a", c:"#0f0a0d", ink:"#0b0a0a" },
    { id:"verdant", name:"Verdant", a:"#0c3b2e", b:"#f6d88a", c:"#0b0a0a", ink:"#0b0a0a" },
    { id:"ice", name:"Ice", a:"#0f2540", b:"#bfe2ff", c:"#07121f", ink:"#05101a" },
    { id:"bloodBone", name:"Blood & Bone", a:"#5d0b0b", b:"#efe3cf", c:"#1a0c0c", ink:"#0b0a0a" },
    { id:"dawn", name:"Dawn", a:"#2b1b4f", b:"#ffcf7a", c:"#140b20", ink:"#0b0a0a" },
  ];

  const SIGILS = [
    { id:"sword", name:"Sword", draw: sigilSword },
    { id:"twinSwords", name:"Twin Swords", draw: sigilTwinSwords },
    { id:"crown", name:"Crown", draw: sigilCrown },
    { id:"tree", name:"Tree", draw: sigilTree },
    { id:"wave", name:"Wave", draw: sigilWave },
    { id:"mountain", name:"Mountain", draw: sigilMountain },
    { id:"moon", name:"Moon", draw: sigilMoon },
    { id:"sun", name:"Sun", draw: sigilSun },
    { id:"eye", name:"All-seeing Eye", draw: sigilEye },
    { id:"anchor", name:"Anchor", draw: sigilAnchor },
    { id:"book", name:"Tome", draw: sigilBook },
    { id:"rune", name:"Runic Knot", draw: sigilRuneKnot },
    { id:"stag", name:"Stag", draw: sigilStagSimple },
    { id:"flame", name:"Flame", draw: sigilFlame },
    { id:"shield", name:"Mini Shield", draw: sigilMiniShield },
    { id:"compass", name:"Compass Rose", draw: sigilCompass },
  ];

  const BANNERS = [
    { id:"none", name:"None" },
    { id:"ribbon", name:"Ribbon" },
    { id:"plaque", name:"Plaque" },
    { id:"scroll", name:"Scroll" },
  ];

  // ---------- State ----------
  const state = {
    clanName: "Blackstone Wardens",
    shieldShape: "heater",
    borderStyle: "double",
    borderWidth: 12,
    patternType: "quarterly",
    palette: "scarletGold",
    texture: "grain",
    sigilType: "stag",
    sigilScale: 105,
    sigilFillMode: "twoTone",
    bannerStyle: "ribbon",
    bannerText: "",
  };

  // ---------- Elements ----------
  const elClanName = $("clanName");
  const elBtnRandomName = $("btnRandomName");
  const elBtnRandomAll = $("btnRandomAll");
  const elBtnReset = $("btnReset");
  const elBtnDownload = $("btnDownload");
  const elSvgHost = $("svgHost");
  const elFileNameHint = $("fileNameHint");

  const elShieldShape = $("shieldShape");
  const elBorderStyle = $("borderStyle");
  const elBorderWidth = $("borderWidth");
  const elPatternType = $("patternType");
  const elPalette = $("palette");
  const elTexture = $("texture");
  const elSigilType = $("sigilType");
  const elSigilScale = $("sigilScale");
  const elSigilFillMode = $("sigilFillMode");
  const elBannerStyle = $("bannerStyle");
  const elBannerText = $("bannerText");

  // ---------- Init UI ----------
  fillSelect(elShieldShape, SHIELDS);
  fillSelect(elBorderStyle, BORDERS);
  fillSelect(elPatternType, PATTERNS);
  fillSelect(elPalette, PALETTES);
  fillSelect(elTexture, TEXTURES);
  fillSelect(elSigilType, SIGILS);
  fillSelect(elBannerStyle, BANNERS);

  // Default values into UI
  elClanName.value = state.clanName;
  elShieldShape.value = state.shieldShape;
  elBorderStyle.value = state.borderStyle;
  elBorderWidth.value = String(state.borderWidth);
  elPatternType.value = state.patternType;
  elPalette.value = state.palette;
  elTexture.value = state.texture;
  elSigilType.value = state.sigilType;
  elSigilScale.value = String(state.sigilScale);
  elSigilFillMode.value = state.sigilFillMode;
  elBannerStyle.value = state.bannerStyle;
  elBannerText.value = state.bannerText;

  // Wire events
  elClanName.addEventListener("input", () => { state.clanName = elClanName.value; updateFileHint(); draw(); });
  elBtnRandomName.addEventListener("click", () => { state.clanName = randomName(); elClanName.value = state.clanName; updateFileHint(); draw(); });

  for (const [el, key, cast] of [
    [elShieldShape, "shieldShape", String],
    [elBorderStyle, "borderStyle", String],
    [elPatternType, "patternType", String],
    [elPalette, "palette", String],
    [elTexture, "texture", String],
    [elSigilType, "sigilType", String],
    [elSigilFillMode, "sigilFillMode", String],
    [elBannerStyle, "bannerStyle", String],
  ]) {
    el.addEventListener("change", () => { state[key] = cast(el.value); draw(); });
  }

  elBorderWidth.addEventListener("input", () => { state.borderWidth = clampInt(elBorderWidth.value, 4, 22); draw(); });
  elSigilScale.addEventListener("input", () => { state.sigilScale = clampInt(elSigilScale.value, 50, 140); draw(); });
  elBannerText.addEventListener("input", () => { state.bannerText = elBannerText.value; draw(); });

  elBtnRandomAll.addEventListener("click", () => {
    randomizeAll();
    syncUI();
    draw();
  });

  elBtnReset.addEventListener("click", () => {
    Object.assign(state, {
      clanName: "Blackstone Wardens",
      shieldShape: "heater",
      borderStyle: "double",
      borderWidth: 12,
      patternType: "quarterly",
      palette: "scarletGold",
      texture: "grain",
      sigilType: "stag",
      sigilScale: 105,
      sigilFillMode: "twoTone",
      bannerStyle: "ribbon",
      bannerText: "",
    });
    syncUI();
    draw();
  });

  elBtnDownload.addEventListener("click", async () => {
    try {
      const svgEl = elSvgHost.querySelector("svg");
      if (!svgEl) return;

      const fileBase = safeFileName(state.clanName || "Clan_Crest");
      const pngName = `${fileBase}.png`;

      await downloadSvgAsPng(svgEl, pngName, 2048);
    } catch (err) {
      console.error(err);
      alert("Download failed. Open console for details.");
    }
  });

  // First render
  updateFileHint();
  draw();

  // ---------- Helpers ----------
  function fillSelect(selectEl, arr){
    selectEl.innerHTML = arr.map(o => `<option value="${escapeAttr(o.id)}">${escapeHtml(o.name)}</option>`).join("");
  }

  function syncUI(){
    elClanName.value = state.clanName;
    elShieldShape.value = state.shieldShape;
    elBorderStyle.value = state.borderStyle;
    elBorderWidth.value = String(state.borderWidth);
    elPatternType.value = state.patternType;
    elPalette.value = state.palette;
    elTexture.value = state.texture;
    elSigilType.value = state.sigilType;
    elSigilScale.value = String(state.sigilScale);
    elSigilFillMode.value = state.sigilFillMode;
    elBannerStyle.value = state.bannerStyle;
    elBannerText.value = state.bannerText;
    updateFileHint();
  }

  function updateFileHint(){
    const fileBase = safeFileName(state.clanName || "Clan_Crest");
    elFileNameHint.textContent = `${fileBase}.png`;
  }

  function randomizeAll(){
    state.clanName = randomName();
    state.shieldShape = pick(SHIELDS).id;
    state.borderStyle = pick(BORDERS).id;
    state.borderWidth = randInt(7, 18);
    state.patternType = pick(PATTERNS).id;
    state.palette = pick(PALETTES).id;
    state.texture = pick(TEXTURES).id;
    state.sigilType = pick(SIGILS).id;
    state.sigilScale = randInt(80, 130);
    state.sigilFillMode = pick([{id:"solid"},{id:"outline"},{id:"twoTone"}]).id;
    state.bannerStyle = pick(BANNERS).id;
    state.bannerText = Math.random() < 0.35 ? pick(["Hold Fast", "Steel & Salt", "By Root and Oath", "In Scarlet We Stand", "No Quarter", "The Isles Endure"]) : "";
  }

  function pick(arr){ return arr[Math.floor(Math.random() * arr.length)]; }
  function randInt(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
  function clampInt(v, a, b){
    const n = Math.round(Number(v) || 0);
    return Math.max(a, Math.min(b, n));
  }

  function escapeHtml(s){
    return String(s ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }
  function escapeAttr(s){ return escapeHtml(s).replaceAll('"',"&quot;"); }

  function safeFileName(name){
    const cleaned = String(name || "Clan_Crest")
      .trim()
      .replace(/[\/\\:*?"<>|]+/g, "")
      .replace(/\s+/g, "_")
      .slice(0, 40);
    return cleaned || "Clan_Crest";
  }

  // ---------- SVG render ----------
  function draw(){
    const palette = PALETTES.find(p => p.id === state.palette) || PALETTES[0];
    const shield = SHIELDS.find(s => s.id === state.shieldShape) || SHIELDS[0];

    const W = 1024, H = 1024;
    const shieldD = shield.path(180, 110, 664, 790);

    const borderW = state.borderWidth;
    const clipId = "clipShield";
    const patId = "patBg";
    const texId = "tex";
    const gradId = "gradGloss";

    const bg = renderPattern(state.patternType, palette, shieldD);
    const texture = renderTexture(state.texture, texId);
    const border = renderBorder(state.borderStyle, palette, shieldD, borderW);
    const gloss = `
      <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="rgba(255,255,255,0.30)"/>
        <stop offset="0.35" stop-color="rgba(255,255,255,0.06)"/>
        <stop offset="1" stop-color="rgba(0,0,0,0.25)"/>
      </linearGradient>
    `;

    const sigil = renderSigil(state, palette);
    const banner = renderBanner(state, palette);

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${W} ${H}" role="img" aria-label="Clan crest">
  <defs>
    <clipPath id="${clipId}">
      <path d="${shieldD}"></path>
    </clipPath>
    ${bg.defs || ""}
    ${texture.defs || ""}
    ${gloss}
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="22" stdDeviation="20" flood-color="rgba(0,0,0,0.55)"/>
    </filter>
  </defs>

  <!-- Crest group only: transparent outside -->
  <g filter="url(#shadow)">
    <!-- Shield base -->
    <path d="${shieldD}" fill="${palette.c}"></path>

    <!-- Pattern clipped inside shield -->
    <g clip-path="url(#${clipId})">
      ${bg.body || ""}
      ${texture.body || ""}
      <!-- subtle vignette -->
      <rect x="0" y="0" width="${W}" height="${H}" fill="rgba(0,0,0,0.10)"></rect>
      <path d="${shieldD}" fill="url(#${gradId})" opacity="0.55"></path>
    </g>

    ${border}

    <!-- Sigil -->
    ${sigil}

    <!-- Banner -->
    ${banner}
  </g>
</svg>`;

    elSvgHost.innerHTML = svg;
    updateFileHint();
  }

  // ---------- Patterns ----------
  function renderPattern(patternId, palette, shieldD){
    const defs = [];
    let body = "";

    // Helper rects clipped to shield
    const full = `<rect x="0" y="0" width="1024" height="1024" fill="${palette.a}"></rect>`;
    const halfTop = `<rect x="0" y="0" width="1024" height="512" fill="${palette.a}"></rect><rect x="0" y="512" width="1024" height="512" fill="${palette.b}"></rect>`;
    const halfLeft = `<rect x="0" y="0" width="512" height="1024" fill="${palette.a}"></rect><rect x="512" y="0" width="512" height="1024" fill="${palette.b}"></rect>`;

    switch(patternId){
      case "solid":
        body = `<rect x="0" y="0" width="1024" height="1024" fill="${palette.a}"></rect>`;
        break;
      case "perFess":
        body = halfTop;
        break;
      case "perPale":
        body = halfLeft;
        break;
      case "perBend":
        body = `
          <polygon points="0,0 1024,0 0,1024" fill="${palette.a}"></polygon>
          <polygon points="1024,0 1024,1024 0,1024" fill="${palette.b}"></polygon>
        `;
        break;
      case "quarterly":
        body = `
          <rect x="0" y="0" width="512" height="512" fill="${palette.a}"></rect>
          <rect x="512" y="0" width="512" height="512" fill="${palette.b}"></rect>
          <rect x="0" y="512" width="512" height="512" fill="${palette.b}"></rect>
          <rect x="512" y="512" width="512" height="512" fill="${palette.a}"></rect>
        `;
        break;
      case "chevron":
        body = `
          ${full}
          <polygon points="140,620 512,320 884,620 884,760 512,460 140,760" fill="${palette.b}" opacity="0.95"></polygon>
        `;
        break;
      case "stripes": {
        const stripe = `
          <pattern id="stripePat" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
            <rect width="80" height="80" fill="${palette.a}"/>
            <rect x="0" y="0" width="38" height="80" fill="${palette.b}" opacity="0.95"/>
          </pattern>`;
        defs.push(stripe);
        body = `<rect x="0" y="0" width="1024" height="1024" fill="url(#stripePat)"></rect>`;
        break;
      }
      case "cross":
        body = `
          ${full}
          <rect x="440" y="0" width="144" height="1024" fill="${palette.b}" opacity="0.96"></rect>
          <rect x="0" y="440" width="1024" height="144" fill="${palette.b}" opacity="0.96"></rect>
        `;
        break;
      default:
        body = full;
    }

    return { defs: defs.join("\n"), body };
  }

  // ---------- Textures ----------
  function renderTexture(textureId, texId){
    if(textureId === "none") return { defs:"", body:"" };

    const defs = [];
    let body = "";

    if(textureId === "grain"){
      defs.push(`
        <filter id="${texId}">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 .22 0" />
        </filter>
      `);
      body = `<rect x="0" y="0" width="1024" height="1024" filter="url(#${texId})" opacity="0.55"></rect>`;
    }

    if(textureId === "speckle"){
      defs.push(`
        <filter id="${texId}">
          <feTurbulence type="turbulence" baseFrequency="0.75" numOctaves="3" seed="8" />
          <feColorMatrix type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 .18 0" />
        </filter>
      `);
      body = `<rect x="0" y="0" width="1024" height="1024" filter="url(#${texId})" opacity="0.55"></rect>`;
    }

    if(textureId === "etch"){
      defs.push(`
        <filter id="${texId}">
          <feTurbulence type="fractalNoise" baseFrequency="0.18" numOctaves="4" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="10" />
        </filter>
      `);
      body = `<rect x="0" y="0" width="1024" height="1024" filter="url(#${texId})" opacity="0.25"></rect>`;
    }

    return { defs: defs.join("\n"), body };
  }

  // ---------- Borders ----------
  function renderBorder(borderId, palette, shieldD, w){
    const stroke = palette.b;
    const stroke2 = "rgba(0,0,0,0.35)";
    const inner = w * 0.55;

    if(borderId === "plain"){
      return `<path d="${shieldD}" fill="none" stroke="${stroke}" stroke-width="${w}" />`;
    }

    if(borderId === "double"){
      return `
        <path d="${shieldD}" fill="none" stroke="${stroke}" stroke-width="${w}" />
        <path d="${shieldD}" fill="none" stroke="${stroke2}" stroke-width="${inner}" opacity="0.7"/>
      `;
    }

    if(borderId === "notched"){
      // Fake notches by dashed stroke
      return `
        <path d="${shieldD}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="10 16"/>
        <path d="${shieldD}" fill="none" stroke="${stroke2}" stroke-width="${inner}" opacity="0.55"/>
      `;
    }

    if(borderId === "rope"){
      return `
        <path d="${shieldD}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="3 9"/>
        <path d="${shieldD}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="${inner}" opacity="0.65"/>
      `;
    }

    if(borderId === "beaded"){
      return `
        <path d="${shieldD}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="1 18"/>
        <path d="${shieldD}" fill="none" stroke="${stroke2}" stroke-width="${inner}" opacity="0.55"/>
      `;
    }

    return `<path d="${shieldD}" fill="none" stroke="${stroke}" stroke-width="${w}" />`;
  }

  // ---------- Sigil ----------
  function renderSigil(st, palette){
    const sig = SIGILS.find(s => s.id === st.sigilType) || SIGILS[0];
    const size = st.sigilScale;

    const cx = 512, cy = 520;
    const fillA = palette.b;
    const fillB = palette.a;
    const stroke = "rgba(0,0,0,0.55)";
    const outline = "rgba(255,255,255,0.18)";

    const mode = st.sigilFillMode;

    const parts = sig.draw({ cx, cy, size, palette });

    if(mode === "solid"){
      return `
        <g>
          <g fill="${fillA}" stroke="${stroke}" stroke-width="6" stroke-linejoin="round">
            ${parts.solid || parts.base || ""}
          </g>
        </g>
      `;
    }

    if(mode === "outline"){
      return `
        <g>
          <g fill="none" stroke="${fillA}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
            ${parts.outline || parts.base || ""}
          </g>
          <g fill="none" stroke="${outline}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.8">
            ${parts.outline || parts.base || ""}
          </g>
        </g>
      `;
    }

    // twoTone
    return `
      <g>
        <g fill="${fillA}" stroke="${stroke}" stroke-width="6" stroke-linejoin="round">
          ${parts.solid || parts.base || ""}
        </g>
        <g fill="${fillB}" opacity="0.70" stroke="rgba(0,0,0,0.35)" stroke-width="3" stroke-linejoin="round">
          ${parts.accent || ""}
        </g>
      </g>
    `;
  }

  // ---------- Banner ----------
  function renderBanner(st, palette){
    const style = st.bannerStyle;
    const text = (st.bannerText || "").trim();
    if(style === "none" || !text) return "";

    const fill = "rgba(10,8,8,0.65)";
    const stroke = palette.b;
    const x = 280, y = 820, w = 464, h = 120;

    const safe = escapeHtml(text.toUpperCase());

    if(style === "ribbon"){
      return `
        <g>
          <path d="M ${x} ${y+40} Q 512 ${y-10} ${x+w} ${y+40} L ${x+w-40} ${y+92} Q 512 ${y+60} ${x+40} ${y+92} Z"
                fill="${fill}" stroke="${stroke}" stroke-width="6" />
          <text x="512" y="${y+72}" text-anchor="middle"
                font-size="34" font-weight="800" fill="${palette.b}"
                style="letter-spacing:0.08em;">
            ${safe}
          </text>
        </g>
      `;
    }

    if(style === "plaque"){
      return `
        <g>
          <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18"
                fill="${fill}" stroke="${stroke}" stroke-width="6"/>
          <text x="512" y="${y+74}" text-anchor="middle"
                font-size="34" font-weight="900" fill="${palette.b}"
                style="letter-spacing:0.08em;">
            ${safe}
          </text>
        </g>
      `;
    }

    // scroll
    return `
      <g>
        <path d="M ${x+20} ${y+22} Q ${x} ${y+60} ${x+22} ${y+98} Q ${x+80} ${y+120} ${x+98} ${y+86} Q ${x+112} ${y+58} ${x+90} ${y+34"
              fill="rgba(255,255,255,0.10)" stroke="${stroke}" stroke-width="6"/>
        <path d="M ${x+w-20} ${y+22} Q ${x+w} ${y+60} ${x+w-22} ${y+98} Q ${x+w-80} ${y+120} ${x+w-98} ${y+86} Q ${x+w-112} ${y+58} ${x+w-90} ${y+34"
              fill="rgba(255,255,255,0.10)" stroke="${stroke}" stroke-width="6"/>
        <rect x="${x+55}" y="${y+20}" width="${w-110}" height="${h-40}" rx="16"
              fill="${fill}" stroke="${stroke}" stroke-width="6"/>
        <text x="512" y="${y+74}" text-anchor="middle"
              font-size="34" font-weight="900" fill="${palette.b}"
              style="letter-spacing:0.08em;">
          ${safe}
        </text>
      </g>
    `;
  }

  // ---------- Download (SVG → PNG transparent) ----------
  async function downloadSvgAsPng(svgEl, filename, sizePx){
    // Clone SVG and force explicit size for consistent export
    const svgClone = svgEl.cloneNode(true);
    svgClone.setAttribute("width", String(sizePx));
    svgClone.setAttribute("height", String(sizePx));

    const svgText = new XMLSerializer().serializeToString(svgClone);

    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.decoding = "async";

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = sizePx;
    canvas.height = sizePx;
    const ctx = canvas.getContext("2d");
    // IMPORTANT: no background fill => transparent
    ctx.clearRect(0, 0, sizePx, sizePx);
    ctx.drawImage(img, 0, 0, sizePx, sizePx);

    URL.revokeObjectURL(url);

    const pngUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // ---------- Shield paths (simple + reliable) ----------
  function shieldPathHeater(x,y,w,h){
    const top = y;
    const left = x, right = x+w;
    const bottom = y+h;
    const mid = x + w/2;

    const neck = y + h*0.22;
    const curve = y + h*0.62;

    return [
      `M ${left+80} ${top+30}`,
      `Q ${mid} ${top-20} ${right-80} ${top+30}`,
      `Q ${right+20} ${neck} ${right-40} ${curve}`,
      `Q ${mid} ${bottom+10} ${left+40} ${curve}`,
      `Q ${left-20} ${neck} ${left+80} ${top+30}`,
      `Z`
    ].join(" ");
  }

  function shieldPathRound(x,y,w,h){
    const cx = x+w/2, cy = y+h*0.48;
    const r = Math.min(w,h)*0.44;
    return `M ${cx} ${y+40}
      A ${r} ${r} 0 1 1 ${cx-0.01} ${y+40}
      Q ${cx} ${y+h+10} ${cx} ${y+h-40}
      Z`.replace(/\s+/g," ");
  }

  function shieldPathKite(x,y,w,h){
    const mid = x+w/2;
    return [
      `M ${x+90} ${y+40}`,
      `Q ${mid} ${y-10} ${x+w-90} ${y+40}`,
      `L ${x+w-40} ${y+h*0.58}`,
      `Q ${mid} ${y+h+20} ${x+40} ${y+h*0.58}`,
      `Z`
    ].join(" ");
  }

  function shieldPathSpanish(x,y,w,h){
    const mid = x+w/2;
    const bottom = y+h;
    return [
      `M ${x+90} ${y+40}`,
      `Q ${mid} ${y-10} ${x+w-90} ${y+40}`,
      `L ${x+w-60} ${y+h*0.70}`,
      `Q ${mid} ${bottom+10} ${x+60} ${y+h*0.70}`,
      `Z`
    ].join(" ");
  }

  function shieldPathGothic(x,y,w,h){
    const mid = x+w/2;
    return [
      `M ${x+110} ${y+70}`,
      `Q ${mid} ${y-40} ${x+w-110} ${y+70}`,
      `Q ${x+w+10} ${y+h*0.30} ${x+w-70} ${y+h*0.72}`,
      `Q ${mid} ${y+h+22} ${x+70} ${y+h*0.72}`,
      `Q ${x-10} ${y+h*0.30} ${x+110} ${y+70}`,
      `Z`
    ].join(" ");
  }

  function shieldPathOval(x,y,w,h){
    const rx = w*0.40, ry = h*0.44;
    const cx = x+w/2, cy = y+h*0.50;
    return `M ${cx} ${cy-ry}
      A ${rx} ${ry} 0 1 1 ${cx-0.01} ${cy-ry}
      Z`.replace(/\s+/g," ");
  }

  // ---------- Sigil drawing (procedural SVG) ----------
  function sigilSword({cx,cy,size}){
    const s = size;
    return {
      base: `
        <path d="M ${cx} ${cy-s*0.72} L ${cx+s*0.06} ${cy-s*0.15} L ${cx-s*0.06} ${cy-s*0.15} Z"></path>
        <rect x="${cx-s*0.06}" y="${cy-s*0.15}" width="${s*0.12}" height="${s*0.62}" rx="${s*0.04}"></rect>
        <rect x="${cx-s*0.28}" y="${cy+s*0.20}" width="${s*0.56}" height="${s*0.10}" rx="${s*0.05}"></rect>
        <rect x="${cx-s*0.07}" y="${cy+s*0.24}" width="${s*0.14}" height="${s*0.22}" rx="${s*0.06}"></rect>
        <circle cx="${cx}" cy="${cy+s*0.50}" r="${s*0.08}"></circle>
      `,
      solid: `
        <path d="M ${cx} ${cy-s*0.72} L ${cx+s*0.06} ${cy-s*0.15} L ${cx-s*0.06} ${cy-s*0.15} Z"></path>
        <rect x="${cx-s*0.06}" y="${cy-s*0.15}" width="${s*0.12}" height="${s*0.62}" rx="${s*0.04}"></rect>
        <rect x="${cx-s*0.28}" y="${cy+s*0.20}" width="${s*0.56}" height="${s*0.10}" rx="${s*0.05}"></rect>
        <rect x="${cx-s*0.07}" y="${cy+s*0.24}" width="${s*0.14}" height="${s*0.22}" rx="${s*0.06}"></rect>
        <circle cx="${cx}" cy="${cy+s*0.50}" r="${s*0.08}"></circle>
      `,
      outline: `
        <path d="M ${cx} ${cy-s*0.72} L ${cx+s*0.06} ${cy-s*0.15} L ${cx-s*0.06} ${cy-s*0.15} Z"></path>
        <path d="M ${cx} ${cy-s*0.15} L ${cx} ${cy+s*0.48}"></path>
        <path d="M ${cx-s*0.28} ${cy+s*0.25} L ${cx+s*0.28} ${cy+s*0.25}"></path>
      `,
      accent: `
        <rect x="${cx-s*0.02}" y="${cy-s*0.10}" width="${s*0.04}" height="${s*0.46}" rx="${s*0.02}"></rect>
      `
    };
  }

  function sigilTwinSwords({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <g transform="rotate(-25 ${cx} ${cy})">${sigilSword({cx,cy,size:s}).solid}</g>
        <g transform="rotate(25 ${cx} ${cy})">${sigilSword({cx,cy,size:s}).solid}</g>
      `,
      outline: `
        <g transform="rotate(-25 ${cx} ${cy})">${sigilSword({cx,cy,size:s}).outline}</g>
        <g transform="rotate(25 ${cx} ${cy})">${sigilSword({cx,cy,size:s}).outline}</g>
      `,
      accent: `
        <circle cx="${cx}" cy="${cy+s*0.45}" r="${s*0.10}"></circle>
      `
    };
  }

  function sigilCrown({cx,cy,size}){
    const s = size;
    const y = cy - s*0.10;
    return {
      solid: `
        <path d="M ${cx-s*0.55} ${y+s*0.30}
                 L ${cx-s*0.40} ${y-s*0.10}
                 L ${cx-s*0.15} ${y+s*0.10}
                 L ${cx} ${y-s*0.22}
                 L ${cx+s*0.15} ${y+s*0.10}
                 L ${cx+s*0.40} ${y-s*0.10}
                 L ${cx+s*0.55} ${y+s*0.30}
                 Z"></path>
        <rect x="${cx-s*0.58}" y="${y+s*0.30}" width="${s*1.16}" height="${s*0.22}" rx="${s*0.08}"></rect>
        <circle cx="${cx-s*0.40}" cy="${y-s*0.10}" r="${s*0.08}"></circle>
        <circle cx="${cx}" cy="${y-s*0.22}" r="${s*0.09}"></circle>
        <circle cx="${cx+s*0.40}" cy="${y-s*0.10}" r="${s*0.08}"></circle>
      `,
      outline: `
        <path d="M ${cx-s*0.55} ${y+s*0.30}
                 L ${cx-s*0.40} ${y-s*0.10}
                 L ${cx-s*0.15} ${y+s*0.10}
                 L ${cx} ${y-s*0.22}
                 L ${cx+s*0.15} ${y+s*0.10}
                 L ${cx+s*0.40} ${y-s*0.10}
                 L ${cx+s*0.55} ${y+s*0.30}
                 Z"></path>
        <path d="M ${cx-s*0.58} ${y+s*0.41} L ${cx+s*0.58} ${y+s*0.41}"></path>
      `,
      accent: `
        <rect x="${cx-s*0.45}" y="${y+s*0.36}" width="${s*0.90}" height="${s*0.10}" rx="${s*0.05}"></rect>
      `
    };
  }

  function sigilTree({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <path d="M ${cx} ${cy-s*0.60}
                 C ${cx+s*0.35} ${cy-s*0.55} ${cx+s*0.40} ${cy-s*0.10} ${cx+s*0.10} ${cy-s*0.02}
                 C ${cx+s*0.30} ${cy+s*0.15} ${cx+s*0.10} ${cy+s*0.42} ${cx} ${cy+s*0.35}
                 C ${cx-s*0.10} ${cy+s*0.42} ${cx-s*0.30} ${cy+s*0.15} ${cx-s*0.10} ${cy-s*0.02}
                 C ${cx-s*0.40} ${cy-s*0.10} ${cx-s*0.35} ${cy-s*0.55} ${cx} ${cy-s*0.60}
                 Z"></path>
        <rect x="${cx-s*0.10}" y="${cy+s*0.20}" width="${s*0.20}" height="${s*0.45}" rx="${s*0.08}"></rect>
      `,
      outline: `
        <path d="M ${cx} ${cy-s*0.60}
                 C ${cx+s*0.35} ${cy-s*0.55} ${cx+s*0.40} ${cy-s*0.10} ${cx+s*0.10} ${cy-s*0.02}
                 C ${cx+s*0.30} ${cy+s*0.15} ${cx+s*0.10} ${cy+s*0.42} ${cx} ${cy+s*0.35}
                 C ${cx-s*0.10} ${cy+s*0.42} ${cx-s*0.30} ${cy+s*0.15} ${cx-s*0.10} ${cy-s*0.02}
                 C ${cx-s*0.40} ${cy-s*0.10} ${cx-s*0.35} ${cy-s*0.55} ${cx} ${cy-s*0.60}
                 Z"></path>
        <path d="M ${cx} ${cy+s*0.20} L ${cx} ${cy+s*0.62}"></path>
      `,
      accent: `
        <circle cx="${cx}" cy="${cy-s*0.18}" r="${s*0.10}"></circle>
        <circle cx="${cx-s*0.18}" cy="${cy-s*0.05}" r="${s*0.07}"></circle>
        <circle cx="${cx+s*0.18}" cy="${cy-s*0.05}" r="${s*0.07}"></circle>
      `
    };
  }

  function sigilWave({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <path d="M ${cx-s*0.60} ${cy+s*0.05}
                 C ${cx-s*0.35} ${cy-s*0.20} ${cx-s*0.10} ${cy-s*0.20} ${cx+s*0.10} ${cy+s*0.05}
                 C ${cx+s*0.30} ${cy+s*0.25} ${cx+s*0.55} ${cy+s*0.25} ${cx+s*0.60} ${cy+s*0.05}
                 L ${cx+s*0.60} ${cy+s*0.42}
                 C ${cx+s*0.35} ${cy+s*0.62} ${cx-s*0.35} ${cy+s*0.62} ${cx-s*0.60} ${cy+s*0.42}
                 Z"></path>
        <circle cx="${cx+s*0.45}" cy="${cy-s*0.02}" r="${s*0.10}"></circle>
      `,
      outline: `
        <path d="M ${cx-s*0.60} ${cy+s*0.05}
                 C ${cx-s*0.35} ${cy-s*0.20} ${cx-s*0.10} ${cy-s*0.20} ${cx+s*0.10} ${cy+s*0.05}
                 C ${cx+s*0.30} ${cy+s*0.25} ${cx+s*0.55} ${cy+s*0.25} ${cx+s*0.60} ${cy+s*0.05}"></path>
        <path d="M ${cx-s*0.60} ${cy+s*0.32}
                 C ${cx-s*0.20} ${cy+s*0.55} ${cx+s*0.20} ${cy+s*0.55} ${cx+s*0.60} ${cy+s*0.32}"></path>
      `,
      accent: `
        <path d="M ${cx-s*0.35} ${cy+s*0.18}
                 C ${cx-s*0.10} ${cy+s*0.02} ${cx+s*0.10} ${cy+s*0.02} ${cx+s*0.35} ${cy+s*0.18}"></path>
      `
    };
  }

  function sigilMountain({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <polygon points="${cx-s*0.62},${cy+s*0.45} ${cx-s*0.10},${cy-s*0.30} ${cx+s*0.18},${cy+s*0.10} ${cx+s*0.48},${cy-s*0.10} ${cx+s*0.72},${cy+s*0.45}"></polygon>
      `,
      outline: `
        <polyline points="${cx-s*0.62},${cy+s*0.45} ${cx-s*0.10},${cy-s*0.30} ${cx+s*0.18},${cy+s*0.10} ${cx+s*0.48},${cy-s*0.10} ${cx+s*0.72},${cy+s*0.45}"></polyline>
      `,
      accent: `
        <polygon points="${cx-s*0.10},${cy-s*0.30} ${cx+s*0.02},${cy-s*0.12} ${cx-s*0.18},${cy-s*0.05}"></polygon>
        <polygon points="${cx+s*0.48},${cy-s*0.10} ${cx+s*0.58},${cy+s*0.02} ${cx+s*0.38},${cy+s*0.06}"></polygon>
      `
    };
  }

  function sigilMoon({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <path d="M ${cx+s*0.20} ${cy-s*0.45}
                 A ${s*0.46} ${s*0.46} 0 1 0 ${cx+s*0.20} ${cy+s*0.45}
                 A ${s*0.34} ${s*0.34} 0 1 1 ${cx+s*0.20} ${cy-s*0.45}
                 Z"></path>
      `,
      outline: `
        <path d="M ${cx+s*0.20} ${cy-s*0.45}
                 A ${s*0.46} ${s*0.46} 0 1 0 ${cx+s*0.20} ${cy+s*0.45}"></path>
        <path d="M ${cx+s*0.20} ${cy-s*0.45}
                 A ${s*0.34} ${s*0.34} 0 1 1 ${cx+s*0.20} ${cy+s*0.45}"></path>
      `,
      accent: `
        <circle cx="${cx-s*0.12}" cy="${cy-s*0.08}" r="${s*0.06}"></circle>
        <circle cx="${cx+s*0.10}" cy="${cy+s*0.12}" r="${s*0.04}"></circle>
      `
    };
  }

  function sigilSun({cx,cy,size}){
    const s = size;
    let rays = "";
    for(let i=0;i<12;i++){
      const a = (Math.PI*2*i)/12;
      const x1 = cx + Math.cos(a)*s*0.36;
      const y1 = cy + Math.sin(a)*s*0.36;
      const x2 = cx + Math.cos(a)*s*0.56;
      const y2 = cy + Math.sin(a)*s*0.56;
      rays += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`;
    }
    return {
      solid: `
        <circle cx="${cx}" cy="${cy}" r="${s*0.30}"></circle>
        <g stroke="rgba(0,0,0,0.55)" stroke-width="8" stroke-linecap="round" fill="none">${rays}</g>
      `,
      outline: `
        <circle cx="${cx}" cy="${cy}" r="${s*0.30}"></circle>
        <g>${rays}</g>
      `,
      accent: `
        <circle cx="${cx}" cy="${cy}" r="${s*0.14}"></circle>
      `
    };
  }

  function sigilEye({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <path d="M ${cx-s*0.62} ${cy}
                 Q ${cx} ${cy-s*0.45} ${cx+s*0.62} ${cy}
                 Q ${cx} ${cy+s*0.45} ${cx-s*0.62} ${cy}
                 Z"></path>
        <circle cx="${cx}" cy="${cy}" r="${s*0.16}"></circle>
      `,
      outline: `
        <path d="M ${cx-s*0.62} ${cy}
                 Q ${cx} ${cy-s*0.45} ${cx+s*0.62} ${cy}
                 Q ${cx} ${cy+s*0.45} ${cx-s*0.62} ${cy}"></path>
        <circle cx="${cx}" cy="${cy}" r="${s*0.16}"></circle>
      `,
      accent: `<circle cx="${cx}" cy="${cy}" r="${s*0.07}"></circle>`
    };
  }

  function sigilAnchor({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <circle cx="${cx}" cy="${cy-s*0.42}" r="${s*0.10}"></circle>
        <rect x="${cx-s*0.05}" y="${cy-s*0.32}" width="${s*0.10}" height="${s*0.70}" rx="${s*0.05}"></rect>
        <path d="M ${cx-s*0.42} ${cy+s*0.05}
                 Q ${cx} ${cy+s*0.42} ${cx+s*0.42} ${cy+s*0.05}
                 L ${cx+s*0.34} ${cy+s*0.00}
                 Q ${cx} ${cy+s*0.30} ${cx-s*0.34} ${cy+s*0.00}
                 Z"></path>
        <rect x="${cx-s*0.35}" y="${cy-s*0.10}" width="${s*0.70}" height="${s*0.10}" rx="${s*0.05}"></rect>
      `,
      outline: `
        <circle cx="${cx}" cy="${cy-s*0.42}" r="${s*0.10}"></circle>
        <path d="M ${cx} ${cy-s*0.32} L ${cx} ${cy+s*0.40}"></path>
        <path d="M ${cx-s*0.42} ${cy+s*0.05}
                 Q ${cx} ${cy+s*0.42} ${cx+s*0.42} ${cy+s*0.05}"></path>
        <path d="M ${cx-s*0.35} ${cy-s*0.05} L ${cx+s*0.35} ${cy-s*0.05}"></path>
      `,
      accent: `<circle cx="${cx}" cy="${cy+s*0.18}" r="${s*0.07}"></circle>`
    };
  }

  function sigilBook({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <path d="M ${cx-s*0.50} ${cy-s*0.35}
                 Q ${cx-s*0.15} ${cy-s*0.45} ${cx} ${cy-s*0.28}
                 Q ${cx+s*0.15} ${cy-s*0.45} ${cx+s*0.50} ${cy-s*0.35}
                 L ${cx+s*0.50} ${cy+s*0.38}
                 Q ${cx+s*0.15} ${cy+s*0.28} ${cx} ${cy+s*0.45}
                 Q ${cx-s*0.15} ${cy+s*0.28} ${cx-s*0.50} ${cy+s*0.38}
                 Z"></path>
        <rect x="${cx-s*0.03}" y="${cy-s*0.30}" width="${s*0.06}" height="${s*0.70}" rx="${s*0.03}"></rect>
      `,
      outline: `
        <path d="M ${cx-s*0.50} ${cy-s*0.35}
                 Q ${cx-s*0.15} ${cy-s*0.45} ${cx} ${cy-s*0.28}
                 Q ${cx+s*0.15} ${cy-s*0.45} ${cx+s*0.50} ${cy-s*0.35}
                 L ${cx+s*0.50} ${cy+s*0.38}
                 Q ${cx+s*0.15} ${cy+s*0.28} ${cx} ${cy+s*0.45}
                 Q ${cx-s*0.15} ${cy+s*0.28} ${cx-s*0.50} ${cy+s*0.38}
                 Z"></path>
        <path d="M ${cx} ${cy-s*0.28} L ${cx} ${cy+s*0.45}"></path>
      `,
      accent: `
        <rect x="${cx-s*0.40}" y="${cy-s*0.18}" width="${s*0.18}" height="${s*0.06}" rx="${s*0.03}"></rect>
        <rect x="${cx+s*0.22}" y="${cy-s*0.18}" width="${s*0.18}" height="${s*0.06}" rx="${s*0.03}"></rect>
      `
    };
  }

  function sigilRuneKnot({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <path d="M ${cx} ${cy-s*0.55}
                 C ${cx+s*0.35} ${cy-s*0.55} ${cx+s*0.55} ${cy-s*0.35} ${cx+s*0.55} ${cy}
                 C ${cx+s*0.55} ${cy+s*0.35} ${cx+s*0.35} ${cy+s*0.55} ${cx} ${cy+s*0.55}
                 C ${cx-s*0.35} ${cy+s*0.55} ${cx-s*0.55} ${cy+s*0.35} ${cx-s*0.55} ${cy}
                 C ${cx-s*0.55} ${cy-s*0.35} ${cx-s*0.35} ${cy-s*0.55} ${cx} ${cy-s*0.55}
                 Z"></path>
        <path d="M ${cx} ${cy-s*0.30}
                 C ${cx+s*0.18} ${cy-s*0.30} ${cx+s*0.30} ${cy-s*0.18} ${cx+s*0.30} ${cy}
                 C ${cx+s*0.30} ${cy+s*0.18} ${cx+s*0.18} ${cy+s*0.30} ${cx} ${cy+s*0.30}
                 C ${cx-s*0.18} ${cy+s*0.30} ${cx-s*0.30} ${cy+s*0.18} ${cx-s*0.30} ${cy}
                 C ${cx-s*0.30} ${cy-s*0.18} ${cx-s*0.18} ${cy-s*0.30} ${cx} ${cy-s*0.30}
                 Z" opacity="0.55"></path>
      `,
      outline: `
        <path d="M ${cx} ${cy-s*0.55}
                 C ${cx+s*0.35} ${cy-s*0.55} ${cx+s*0.55} ${cy-s*0.35} ${cx+s*0.55} ${cy}
                 C ${cx+s*0.55} ${cy+s*0.35} ${cx+s*0.35} ${cy+s*0.55} ${cx} ${cy+s*0.55}
                 C ${cx-s*0.35} ${cy+s*0.55} ${cx-s*0.55} ${cy+s*0.35} ${cx-s*0.55} ${cy}
                 C ${cx-s*0.55} ${cy-s*0.35} ${cx-s*0.35} ${cy-s*0.55} ${cx} ${cy-s*0.55}"></path>
      `,
      accent: `
        <circle cx="${cx}" cy="${cy}" r="${s*0.10}"></circle>
      `
    };
  }

  function sigilStagSimple({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <path d="M ${cx} ${cy+s*0.45}
                 Q ${cx-s*0.18} ${cy+s*0.20} ${cx-s*0.10} ${cy-s*0.05}
                 Q ${cx-s*0.06} ${cy-s*0.30} ${cx} ${cy-s*0.38}
                 Q ${cx+s*0.06} ${cy-s*0.30} ${cx+s*0.10} ${cy-s*0.05}
                 Q ${cx+s*0.18} ${cy+s*0.20} ${cx} ${cy+s*0.45}
                 Z"></path>
        <path d="M ${cx-s*0.06} ${cy-s*0.34}
                 Q ${cx-s*0.28} ${cy-s*0.44} ${cx-s*0.34} ${cy-s*0.62}
                 Q ${cx-s*0.22} ${cy-s*0.56} ${cx-s*0.16} ${cy-s*0.50}
                 Q ${cx-s*0.20} ${cy-s*0.68} ${cx-s*0.34} ${cy-s*0.78}
                 Q ${cx-s*0.12} ${cy-s*0.76} ${cx-s*0.02} ${cy-s*0.62}
                 Q ${cx-s*0.04} ${cy-s*0.52} ${cx-s*0.06} ${cy-s*0.44}
                 Z"></path>
        <path d="M ${cx+s*0.06} ${cy-s*0.34}
                 Q ${cx+s*0.28} ${cy-s*0.44} ${cx+s*0.34} ${cy-s*0.62}
                 Q ${cx+s*0.22} ${cy-s*0.56} ${cx+s*0.16} ${cy-s*0.50}
                 Q ${cx+s*0.20} ${cy-s*0.68} ${cx+s*0.34} ${cy-s*0.78}
                 Q ${cx+s*0.12} ${cy-s*0.76} ${cx+s*0.02} ${cy-s*0.62}
                 Q ${cx+s*0.04} ${cy-s*0.52} ${cx+s*0.06} ${cy-s*0.44}
                 Z"></path>
      `,
      outline: `
        <path d="M ${cx} ${cy+s*0.45}
                 Q ${cx-s*0.18} ${cy+s*0.20} ${cx-s*0.10} ${cy-s*0.05}
                 Q ${cx-s*0.06} ${cy-s*0.30} ${cx} ${cy-s*0.38}
                 Q ${cx+s*0.06} ${cy-s*0.30} ${cx+s*0.10} ${cy-s*0.05}
                 Q ${cx+s*0.18} ${cy+s*0.20} ${cx} ${cy+s*0.45}"></path>
        <path d="M ${cx-s*0.06} ${cy-s*0.34}
                 Q ${cx-s*0.28} ${cy-s*0.44} ${cx-s*0.34} ${cy-s*0.62}
                 Q ${cx-s*0.20} ${cy-s*0.68} ${cx-s*0.34} ${cy-s*0.78}"></path>
        <path d="M ${cx+s*0.06} ${cy-s*0.34}
                 Q ${cx+s*0.28} ${cy-s*0.44} ${cx+s*0.34} ${cy-s*0.62}
                 Q ${cx+s*0.20} ${cy-s*0.68} ${cx+s*0.34} ${cy-s*0.78}"></path>
      `,
      accent: `
        <circle cx="${cx}" cy="${cy-s*0.08}" r="${s*0.05}"></circle>
      `
    };
  }

  function sigilFlame({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <path d="M ${cx} ${cy-s*0.60}
                 C ${cx+s*0.20} ${cy-s*0.40} ${cx+s*0.32} ${cy-s*0.18} ${cx+s*0.20} ${cy+s*0.05}
                 C ${cx+s*0.10} ${cy+s*0.30} ${cx-s*0.10} ${cy+s*0.45} ${cx} ${cy+s*0.55}
                 C ${cx-s*0.10} ${cy+s*0.45} ${cx-s*0.32} ${cy+s*0.30} ${cx-s*0.20} ${cy+s*0.05}
                 C ${cx-s*0.05} ${cy-s*0.10} ${cx+s*0.05} ${cy-s*0.22} ${cx} ${cy-s*0.60}
                 Z"></path>
      `,
      outline: `
        <path d="M ${cx} ${cy-s*0.60}
                 C ${cx+s*0.20} ${cy-s*0.40} ${cx+s*0.32} ${cy-s*0.18} ${cx+s*0.20} ${cy+s*0.05}
                 C ${cx+s*0.10} ${cy+s*0.30} ${cx-s*0.10} ${cy+s*0.45} ${cx} ${cy+s*0.55}
                 C ${cx-s*0.10} ${cy+s*0.45} ${cx-s*0.32} ${cy+s*0.30} ${cx-s*0.20} ${cy+s*0.05}
                 C ${cx-s*0.05} ${cy-s*0.10} ${cx+s*0.05} ${cy-s*0.22} ${cx} ${cy-s*0.60}"></path>
      `,
      accent: `
        <path d="M ${cx} ${cy-s*0.25}
                 C ${cx+s*0.10} ${cy-s*0.12} ${cx+s*0.12} ${cy+s*0.05} ${cx} ${cy+s*0.15}
                 C ${cx-s*0.12} ${cy+s*0.05} ${cx-s*0.10} ${cy-s*0.12} ${cx} ${cy-s*0.25}
                 Z"></path>
      `
    };
  }

  function sigilMiniShield({cx,cy,size}){
    const s = size;
    const d = shieldPathHeater(cx - s*0.45, cy - s*0.48, s*0.90, s*0.95);
    return {
      solid: `<path d="${d}"></path>`,
      outline: `<path d="${d}"></path>`,
      accent: `<path d="${d}" opacity="0.35"></path>`
    };
  }

  function sigilCompass({cx,cy,size}){
    const s = size;
    return {
      solid: `
        <circle cx="${cx}" cy="${cy}" r="${s*0.34}"></circle>
        <polygon points="${cx},${cy-s*0.58} ${cx+s*0.10},${cy-s*0.08} ${cx},${cy+s*0.10} ${cx-s*0.10},${cy-s*0.08}"></polygon>
        <polygon points="${cx},${cy+s*0.58} ${cx+s*0.10},${cy+s*0.08} ${cx},${cy-s*0.10} ${cx-s*0.10},${cy+s*0.08}" opacity="0.65"></polygon>
      `,
      outline: `
        <circle cx="${cx}" cy="${cy}" r="${s*0.34}"></circle>
        <line x1="${cx}" y1="${cy-s*0.58}" x2="${cx}" y2="${cy+s*0.58}"></line>
        <line x1="${cx-s*0.58}" y1="${cy}" x2="${cx+s*0.58}" y2="${cy}"></line>
      `,
      accent: `<circle cx="${cx}" cy="${cy}" r="${s*0.12}"></circle>`
    };
  }
})();
