(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))p(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&p(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function p(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();function T(){if(window.matchMedia("(pointer: coarse)").matches)return;const c=document.createElement("div");c.className="custom-cursor-dot";const a=document.createElement("div");a.className="custom-cursor-ring",document.body.appendChild(c),document.body.appendChild(a);let r=window.innerWidth/2,p=window.innerHeight/2,t=r,n=p,i=!1;window.addEventListener("mousemove",g=>{r=g.clientX,p=g.clientY,c.style.transform=`translate3d(${r}px, ${p}px, 0)`});function o(){t+=(r-t)*.18,n+=(p-n)*.18,a.style.transform=`translate3d(${t}px, ${n}px, 0) scale(${i?1.7:1})`,requestAnimationFrame(o)}requestAnimationFrame(o);const l=()=>{document.querySelectorAll("a, button, [data-cursor-expand], .interactive-hover").forEach(s=>{s.addEventListener("mouseenter",()=>{i=!0,a.classList.add("cursor-expanded")}),s.addEventListener("mouseleave",()=>{i=!1,a.classList.remove("cursor-expanded")})})};l(),new MutationObserver(()=>{l()}).observe(document.body,{childList:!0,subtree:!0})}class B{constructor(){this.ctx=null,this.enabled=!1}init(){if(!this.ctx&&typeof window<"u"){const a=window.AudioContext||window.webkitAudioContext;a&&(this.ctx=new a)}}toggle(){return this.init(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume(),this.enabled=!this.enabled,this.enabled&&this.playTick(600,.04),this.enabled}playTick(a=440,r=.03){if(!(!this.enabled||!this.ctx))try{const p=this.ctx.createOscillator(),t=this.ctx.createGain();p.type="sine",p.frequency.setValueAtTime(a,this.ctx.currentTime),t.gain.setValueAtTime(.04,this.ctx.currentTime),t.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+r),p.connect(t),t.connect(this.ctx.destination),p.start(),p.stop(this.ctx.currentTime+r)}catch{}}playSwoosh(){if(!(!this.enabled||!this.ctx))try{const a=this.ctx.sampleRate*.08,r=this.ctx.createBuffer(1,a,this.ctx.sampleRate),p=r.getChannelData(0);for(let o=0;o<a;o++)p[o]=Math.random()*2-1;const t=this.ctx.createBufferSource();t.buffer=r;const n=this.ctx.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(800,this.ctx.currentTime),n.frequency.exponentialRampToValueAtTime(150,this.ctx.currentTime+.08);const i=this.ctx.createGain();i.gain.setValueAtTime(.02,this.ctx.currentTime),i.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.08),t.connect(n),n.connect(i),i.connect(this.ctx.destination),t.start()}catch{}}}const f=new B;function q(){const c=document.getElementById("main-navbar"),a=document.getElementById("mobile-toggle"),r=document.getElementById("mobile-menu"),p=document.querySelectorAll(".mobile-nav-link"),t=document.getElementById("audio-toggle-btn"),n=()=>{window.scrollY>40?c.classList.add("scrolled"):c.classList.remove("scrolled")};window.addEventListener("scroll",n,{passive:!0}),n();let i=!1;const o=()=>{i=!i,a.classList.toggle("active",i),r.classList.toggle("active",i),document.body.style.overflow=i?"hidden":"",f.playSwoosh()};a&&a.addEventListener("click",o),p.forEach(l=>{l.addEventListener("click",()=>{i&&o()})}),t&&t.addEventListener("click",()=>{const l=f.toggle();t.classList.toggle("active",l);const m=t.querySelector(".icon-audio-on"),g=t.querySelector(".icon-audio-off");m&&g&&(m.style.display=l?"block":"none",g.style.display=l?"none":"block")}),document.querySelectorAll('a[href^="#"]').forEach(l=>{l.addEventListener("click",function(m){const g=this.getAttribute("href");if(g==="#"||!g)return;const s=document.querySelector(g);if(s){m.preventDefault(),f.playTick(480);const e=c.offsetHeight,d=s.getBoundingClientRect().top+window.pageYOffset-e+10;window.scrollTo({top:d,behavior:"smooth"})}})})}function x(){const c=document.getElementById("hero"),a=document.getElementById("hero-bg"),r=document.getElementById("hero-content"),p=document.getElementById("hero-overlay");if(!c)return;window.addEventListener("scroll",()=>{const i=window.scrollY,o=c.offsetHeight;if(i<=o){const l=i/o;a&&(a.style.transform=`scale(${1+l*.18}) translateY(${i*.25}px)`),r&&(r.style.transform=`translateY(-${i*.35}px)`,r.style.opacity=`${1-l*1.1}`),p&&(p.style.opacity=`${.5+l*.45}`)}},{passive:!0});const t=document.getElementById("hero-ambient-canvas");if(t){let g=function(){i.clearRect(0,0,o,l);const s=o*.5+Math.sin(m*8e-4)*(o*.2),e=l*.45+Math.cos(m*6e-4)*(l*.15),d=i.createRadialGradient(s,e,10,s,e,o*.45);d.addColorStop(0,"rgba(212, 175, 55, 0.045)"),d.addColorStop(.5,"rgba(212, 175, 55, 0.015)"),d.addColorStop(1,"rgba(0, 0, 0, 0)"),i.fillStyle=d,i.fillRect(0,0,o,l),m+=1,requestAnimationFrame(g)};var n=g;const i=t.getContext("2d");let o=t.width=window.innerWidth,l=t.height=window.innerHeight;window.addEventListener("resize",()=>{o=t.width=window.innerWidth,l=t.height=window.innerHeight});let m=0;requestAnimationFrame(g)}}const A=[{id:"marble",label:"Calacatta Marble",subtitle:"Deep Corner Fracture & Vein Break",location:"Kitchen Island • Mayfair",beforeImage:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",afterImage:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80",beforeDesc:"35mm shatter spall on 40mm bullnose edge with missing fragments",afterDesc:"Micro-pigment mineral resin rebuild, veining reconstructed, 90GU gloss finish",timeSaved:"Saved 3 weeks replacement lead time & £4,800 slab cost"},{id:"wood",label:"Smoked Oak Parquet",subtitle:"Thermal Scorch & Chair Wheel Gouges",location:"Penthouse Reception • Knightsbridge",beforeImage:"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80",afterImage:"https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1920&q=80",beforeDesc:"Deep charred indentation penetrating polyurethane seal into grain",afterDesc:"Localized fiber reconstitution, grain line re-drawing, ultra-matt lacquer match",timeSaved:"Avoided complete room sanding, dust extraction & floor lifting"},{id:"bath",label:"Enamelled Bath",subtitle:"Cast Iron Chipped Enamel",location:"Boutique Hotel Master Suite • Soho",beforeImage:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80",afterImage:"https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1920&q=80",beforeDesc:"Heavy steel bottle drop caused 20mm chip with exposed rusted substrate",afterDesc:"Anti-corrosion treatment, ceramic bonding enamel, seamless polish blend",timeSaved:"Room returned to booking roster in under 3 hours without plumbing works"},{id:"upvc",label:"Architectural UPVC",subtitle:"Drill Mistake & Scored Casement",location:"New Build Handover • Canary Wharf",beforeImage:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",afterImage:"https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1920&q=80",beforeDesc:"Misaligned blind brackets left 4 visible holes & deep screwdriving scuffs",afterDesc:"Polymer welded, micro-levelled, factory RAL colour-matched sheen spray",timeSaved:"Passed final architectural snagging inspection with zero penalties"}];function k(){const c=document.getElementById("ba-comparison-wrap");if(!c)return;const a=document.getElementById("ba-slider-divider"),r=document.getElementById("ba-split-layer"),p=document.getElementById("ba-img-before"),t=document.getElementById("ba-img-after"),n=document.querySelectorAll(".ba-preset-btn"),i=document.getElementById("ba-before-desc"),o=document.getElementById("ba-after-desc"),l=document.getElementById("ba-time-saved"),m=document.getElementById("ba-surface-title");let g=50,s=!1;const e=u=>{g=Math.max(0,Math.min(100,u)),r.style.width=`${g}%`,a.style.left=`${g}%`},d=u=>{const h=c.getBoundingClientRect(),y=((u.touches?u.touches[0].clientX:u.clientX)-h.left)/h.width*100;e(y)};c.addEventListener("mousedown",u=>{s=!0,d(u)}),window.addEventListener("mouseup",()=>{s=!1}),window.addEventListener("mousemove",u=>{s&&d(u)}),c.addEventListener("mousemove",u=>{if(!s){const h=c.getBoundingClientRect(),v=(u.clientX-h.left)/h.width*100;g+=(v-g)*.15,e(g)}}),c.addEventListener("touchstart",u=>{s=!0,d(u)},{passive:!0}),window.addEventListener("touchend",()=>{s=!1}),window.addEventListener("touchmove",u=>{s&&d(u)},{passive:!0}),n.forEach(u=>{u.addEventListener("click",()=>{const h=u.getAttribute("data-preset"),b=A.find(v=>v.id===h);b&&(f.playTick(520),n.forEach(v=>v.classList.remove("active")),u.classList.add("active"),c.classList.add("transitioning"),setTimeout(()=>{p.src=b.beforeImage,t.src=b.afterImage,m&&(m.textContent=`${b.label} — ${b.subtitle}`),i&&(i.textContent=b.beforeDesc),o&&(o.textContent=b.afterDesc),l&&(l.textContent=b.timeSaved),c.classList.remove("transitioning")},200))})}),e(50)}const I=[{id:"marble",name:"MARBLE",subtitle:"Natural & Engineered Calacatta, Carrara, Nero Marquina",description:"Chips, scratches, cracks and surface damage restored on site with optical grade resin and hand-blended veining.",image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",macroImage:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",specs:[{label:"Cure Time",value:"45 mins"},{label:"Optical Match",value:"99.8%"},{label:"Finish",value:"Honed / Mirror Gloss"},{label:"Structural Bond",value:"3,200 PSI"}],commonRepairs:["Countertop impact chips","Deep vein hairline fractures","Acid etch ring removal","Honed edge reconstruction"]},{id:"wood",name:"WOOD",subtitle:"Hardwoods, Engineered Parquet, Veneers & Solid Oak",description:"Grain-matched localized fills, stain restoration and heat mark eradication preserving original patina.",image:"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80",macroImage:"https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&q=80",specs:[{label:"Cure Time",value:"30 mins"},{label:"Grain Alignment",value:"Micro-pigment hand match"},{label:"Sheen Range",value:"Ultra-Matt to High Gloss"},{label:"Wood Types",value:"Oak, Walnut, Teak, Ash"}],commonRepairs:["Dropped object gouges","Radiator scorch marks","Water ring bleaching","Veneer delamination repair"]},{id:"stone",name:"STONE",subtitle:"Limestone, Sandstone, Slate & Travertine",description:"Micro-aggregate mortars and mineral binders that replicate natural porosity, texture, and geological tones.",image:"https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1920&q=80",macroImage:"https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=1200&q=80",specs:[{label:"Cure Time",value:"60 mins"},{label:"Texture",value:"Porous / Riven / Sawn"},{label:"UV Resistance",value:"100% Grade A"},{label:"Breathability",value:"Vapour Permeable"}],commonRepairs:["Step tread edge spalls","Fireplace mantle cracks","Floor tile corner breakages","Drill hole extractions"]},{id:"upvc",name:"UPVC",subtitle:"Architectural Window Profiles, Doors & Cladding",description:"Specialist polymer weld compounds and factory-matched RAL spray coatings for seamless structural repair.",image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",macroImage:"https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",specs:[{label:"Cure Time",value:"25 mins"},{label:"RAL Matching",value:"Any standard or custom RAL"},{label:"Weatherability",value:"15-Year UV Stable"},{label:"Flexural Strength",value:"High Impact Resistant"}],commonRepairs:["Burglar tool break-in pry marks","Snagging scratches & weld tears","Screw hole plugging","Faded frame respraying"]},{id:"ceramic",name:"CERAMIC",subtitle:"Porcelain, Enamelled Sanitaryware & Glazed Tiles",description:"Glass-hard enamel fills and ceramic resin technology that withstands constant thermal shock and moisture.",image:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80",macroImage:"https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",specs:[{label:"Cure Time",value:"40 mins"},{label:"Waterproof",value:"Submersion Ready"},{label:"Hardness",value:"9H Glass Equivalent"},{label:"Thermal Range",value:"-20°C to +120°C"}],commonRepairs:["Enamel bath chip restoration","Basin hairline crack sealing","Porcelain tile drill repairs","Shower tray spalls"]},{id:"laminate",name:"LAMINATE",subtitle:"Worktops, Cabinetry, Doors & Commercial Surfaces",description:"Pressure-cured resins and micro-printed texture recreations for high-pressure laminates and melamine.",image:"https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1920&q=80",macroImage:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",specs:[{label:"Cure Time",value:"35 mins"},{label:"Scratch Resistance",value:"Heavy Duty Commercial"},{label:"Pattern Blend",value:"Hand-Grained"},{label:"Bond Type",value:"Thermo-chemical"}],commonRepairs:["Worktop edge impact dents","Hot pan burn blisters","Knife cut gouges","Blown joint water ingress"]},{id:"metal",name:"METAL",subtitle:"Stainless Steel, Brass, Bronze & Architectural Aluminium",description:"Micro-abrasive grain realignment and alloy-filling compounds that replicate brushed or mirror metal finishes.",image:"https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1920&q=80",macroImage:"https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",specs:[{label:"Cure Time",value:"50 mins"},{label:"Grain Alignment",value:"Directional Micro-Scuff"},{label:"Corrosion Shield",value:"Marine-grade passivated"},{label:"Alloys Handled",value:"304/316 Steel, Brass, Copper"}],commonRepairs:["Appliance front scratches","Lift door scuffs & dents","Brass handrail pitting","Balustrade weld smoothing"]},{id:"granite",name:"GRANITE",subtitle:"Black Absolute, Kashmir White & Engineered Quartz",description:"Diamond-honing and refractive crystalline resin fills that match the light absorption of volcanic stone.",image:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=80",macroImage:"https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",specs:[{label:"Cure Time",value:"45 mins"},{label:"Quartz & Granite",value:"Natural & Composite"},{label:"Polish Level",value:"Up to 3,000 Grit"},{label:"Food Safe",value:"FDA Certified Cured"}],commonRepairs:["Undermount sink edge chips","Dropped pot fractured corners","Dull ring mark restoration","Joint seam realignment"]}];function R(){if(!(document.getElementById("services")||document.querySelector(".services-section")))return;const a=document.getElementById("services-tabs"),r=document.getElementById("services-bg-image"),p=document.getElementById("service-material-name"),t=document.getElementById("service-material-subtitle"),n=document.getElementById("service-material-desc"),i=document.getElementById("service-specs-grid"),o=document.getElementById("service-repairs-list"),l=document.getElementById("service-cta-btn");let m=0;a.innerHTML=I.map((e,d)=>`
      <button class="material-tab-btn ${d===0?"active":""}" data-index="${d}">
        <span class="tab-number">0${d+1}</span>
        <span class="tab-label">${e.name}</span>
      </button>
    `).join("");const g=a.querySelectorAll(".material-tab-btn"),s=e=>{if(e===m&&r.dataset.loaded)return;m=e;const d=I[e];f.playTick(600),g.forEach((u,h)=>{u.classList.toggle("active",h===e)}),p.classList.add("fade-out"),n.classList.add("fade-out"),i.classList.add("fade-out"),setTimeout(()=>{r.style.opacity="0.15",setTimeout(()=>{r.src=d.image,r.dataset.loaded="true",r.style.opacity="0.35"},150),p.textContent=d.name,t.textContent=d.subtitle,n.textContent=d.description,i.innerHTML=d.specs.map(u=>`
          <div class="service-spec-item">
            <span class="spec-label">${u.label}</span>
            <span class="spec-value">${u.value}</span>
          </div>
        `).join(""),o.innerHTML=d.commonRepairs.map(u=>`
          <li class="service-repair-pill">
            <span class="pill-dot"></span>
            <span>${u}</span>
          </li>
        `).join(""),l&&(l.setAttribute("data-surface",d.id),l.innerHTML=`
          <span>REQUEST ${d.name} REPAIR</span>
          <span class="animated-arrow">→</span>
        `),p.classList.remove("fade-out"),n.classList.remove("fade-out"),i.classList.remove("fade-out")},180)};g.forEach((e,d)=>{e.addEventListener("mouseenter",()=>s(d)),e.addEventListener("click",()=>s(d))}),s(0)}const S=[{id:"chips",title:"CHIPS",summary:"Impact fractures on fragile granite edges, marble counters, tile corners, and enamelled baths.",severity:"High Impact",timeToRepair:"45–90 mins",repairability:"100% On-Site",image:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",method:"Multi-layer composite stone fill with color-blended matrix and progressive diamond grit polishing."},{id:"scratches",title:"SCRATCHES",summary:"Abrasive scoring on stainless steel splashbacks, polished marble, lacquered timber, and glass.",severity:"Surface Defect",timeToRepair:"30–60 mins",repairability:"100% Invisible",image:"https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",method:"Micro-abrasive mechanical flattening, optical grain realignment, and refractive clear-coat sealing."},{id:"dents",title:"DENTS",summary:"Depressions on aluminium frames, timber doors, UPVC sills, and commercial elevator panels.",severity:"Structural Deformation",timeToRepair:"40–75 mins",repairability:"100% Level",image:"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",method:"Hydraulic micro-pulling, flexible polymer leveling putty, and precision stipple texturing."},{id:"burns",title:"BURNS",summary:"Hot pan scorches on laminate worktops, cigarette burns on vanities, and iron scorches on wood.",severity:"Thermal Carbonisation",timeToRepair:"60–120 mins",repairability:"100% Restored",image:"https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80",method:"Excision of carbonized substrate, sterile thermal barrier fill, and hand-drawn grain reproduction."},{id:"holes",title:"HOLES",summary:"Drill holes from removed fixtures, cable entry points, misdrilled tiles, and door hardware changes.",severity:"Void Penetration",timeToRepair:"45–90 mins",repairability:"100% Seamless",image:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",method:"Structural core reinforcement, color-matched surface cap, and texture replication to match adjacent field."},{id:"cracks",title:"CRACKS",summary:"Stress fractures across ceramic basins, stone vanity tops, acrylic shower trays, and tiles.",severity:"Fissure Risk",timeToRepair:"60–90 mins",repairability:"Stabilised & Hidden",image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",method:"Sub-surface resin stitch injection to prevent crack propagation, followed by optical surface match."},{id:"scuffs",title:"SCUFFS",summary:"Rubber heel marks, tool scrapes on powder-coated window frames, and heavy transit scuffs on doors.",severity:"Aesthetic Friction",timeToRepair:"20–40 mins",repairability:"100% Flawless",image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",method:"Chemical contaminant decontamination followed by sheen-matched micro-atomised lacquer mist."},{id:"colour-damage",title:"COLOUR DAMAGE",summary:"Chemical bleaching, UV sunlight fading, water stains, and acid etching on natural limestone.",severity:"Pigment Degradation",timeToRepair:"45–80 mins",repairability:"100% Tint Matched",image:"https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",method:"Spectrophotometric chromatic formulation, layered stain infusion, and UV-inhibitor clear coat."}];function M(){const c=document.getElementById("damages-grid");if(!c)return;c.innerHTML=S.map((e,d)=>`
      <div class="damage-grid-item" data-damage-id="${e.id}" data-index="${d}">
        <div class="damage-item-inner">
          <div class="damage-num">0${d+1}</div>
          <div class="damage-main-content">
            <h3 class="damage-title">${e.title}</h3>
            <p class="damage-summary">${e.summary}</p>
          </div>
          <div class="damage-meta-row">
            <span class="damage-badge">${e.repairability}</span>
            <span class="damage-time">${e.timeToRepair}</span>
            <div class="damage-arrow-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `).join("");let a=document.getElementById("floating-damage-preview");a||(a=document.createElement("div"),a.id="floating-damage-preview",a.className="floating-damage-preview",a.innerHTML=`
      <img id="floating-preview-img" src="" alt="Damage Preview" />
      <div class="floating-preview-overlay">
        <span id="floating-preview-title" class="preview-title"></span>
        <span id="floating-preview-method" class="preview-method"></span>
      </div>
    `,document.body.appendChild(a));const r=document.getElementById("floating-preview-img"),p=document.getElementById("floating-preview-title"),t=document.getElementById("floating-preview-method");let n=0,i=0,o=0,l=0,m=!1;window.addEventListener("mousemove",e=>{n=e.clientX,i=e.clientY});function g(){m&&(o+=(n-o)*.14,l+=(i-l)*.14,a.style.transform=`translate3d(${o+24}px, ${l-140}px, 0)`),requestAnimationFrame(g)}requestAnimationFrame(g),c.querySelectorAll(".damage-grid-item").forEach(e=>{const d=e.getAttribute("data-damage-id"),u=S.find(h=>h.id===d);e.addEventListener("mouseenter",()=>{u&&(m=!0,f.playTick(580),r.src=u.image,p.textContent=`${u.title} RESTORATION`,t.textContent=u.method,a.classList.add("visible"))}),e.addEventListener("mouseleave",()=>{m=!1,a.classList.remove("visible")}),e.addEventListener("click",()=>{window.openQuoteModal&&window.openQuoteModal()})})}const w=[{step:"01",title:"SEND PHOTOS",description:"Send us photos of the damaged surface.",detail:"Use our online photo upload, WhatsApp, or email. Submit 1 close-up of the damage and 1 wide shot showing the surrounding environment.",visual:{type:"photo-intake",image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",badge:"Step 01 • Instant Diagnostic",stat:"30 Min Response Time"}},{step:"02",title:"ASSESS",description:"We identify the damage and repair requirements.",detail:"Our master restorers analyze the substrate chemistry, grain porosity, and lighting refraction to prepare a bespoke repair compound formula.",visual:{type:"diagnostic",image:"https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",badge:"Step 02 • Substrate Analysis",stat:"Fixed Price Guarantee"}},{step:"03",title:"REPAIR",description:"Our technician restores the surface on site.",detail:"Equipped with mobile extraction units and curing lasers, our technician reconstitutes missing mass, color-matches pigments, and hand-grains.",visual:{type:"craftsmanship",image:"https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",badge:"Step 03 • In-Situ Restoration",stat:"Zero Dust & Fume Extraction"}},{step:"04",title:"DISAPPEAR",description:"The repair blends into the original surface.",detail:"Polished with progressive diamond abrasives to identical spec (honed, satin, or mirror). The damage is visually and tactilely indistinguishable.",visual:{type:"perfection",image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",badge:"Step 04 • Flawless Handover",stat:"99.8% Optical Invisibility"}}];function D(){if(!(document.getElementById("process")||document.querySelector(".process-section")))return;const a=document.getElementById("process-steps-list"),r=document.getElementById("process-visual-img"),p=document.getElementById("process-visual-badge"),t=document.getElementById("process-visual-stat"),n=document.getElementById("process-progress-bar"),i=document.getElementById("process-current-num");a.innerHTML=w.map((s,e)=>`
      <div class="process-step-item ${e===0?"active":""}" data-step-idx="${e}">
        <div class="step-num-col">
          <span class="step-number">${s.step}</span>
          <div class="step-indicator-line"></div>
        </div>
        <div class="step-content-col">
          <h3 class="step-title">${s.title}</h3>
          <p class="step-desc-lead">${s.description}</p>
          <p class="step-desc-detail">${s.detail}</p>
        </div>
      </div>
    `).join("");const o=a.querySelectorAll(".process-step-item");let l=0;const m=s=>{if(s===l&&r.dataset.loaded)return;l=s;const e=w[s];f.playTick(500+s*40),o.forEach((d,u)=>{d.classList.toggle("active",u===s)}),n&&(n.style.height=`${(s+1)/w.length*100}%`),i&&(i.textContent=e.step),r.style.opacity="0.3",r.style.transform="scale(1.05)",setTimeout(()=>{r.src=e.visual.image,r.dataset.loaded="true",p.textContent=e.visual.badge,t.textContent=e.visual.stat,r.style.opacity="1",r.style.transform="scale(1)"},150)};o.forEach((s,e)=>{s.addEventListener("click",()=>m(e))});const g=new IntersectionObserver(s=>{s.forEach(e=>{if(e.isIntersecting){const d=parseInt(e.target.getAttribute("data-step-idx"),10);isNaN(d)||m(d)}})},{threshold:.6});o.forEach(s=>g.observe(s)),m(0)}const E=[{id:"gal-1",category:"bath",title:"Chipped Cast Iron Enamel Freestanding Bath",location:"Cheyne Walk, Chelsea",damage:"Heavy dropped bronze perfume bottle impact created a 25mm deep enamel chip exposing rusted iron base.",technique:"De-rust treatment, ceramic enamel filler, airbrushed colour-matched gloss glaze, polished flush.",time:"2 hours 15 mins",span:"tall",beforeImage:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",afterImage:"https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",badge:"Cast Iron Enamel"},{id:"gal-2",category:"floor",title:"Gouged European Herringbone Oak Flooring",location:"Holland Park, Kensington",damage:"Heavy piano caster drag left two 1.2m deep indentations through the timber grain into raw substrate.",technique:"Steam grain reactivation, colour-matched polymer timber resin, hand-rendered medullary rays, matt lacquer.",time:"3 hours",span:"wide",beforeImage:"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",afterImage:"https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1200&q=80",badge:"Herringbone Oak"},{id:"gal-3",category:"basin",title:"Hairline Thermal Crack in Carrara Vanity Basin",location:"Eaton Square, Belgravia",damage:"Thermal shock fracture running 180mm from drain hole up through polished Italian marble basin rim.",technique:"Capillary resin vacuum injection, pigment veining realignment, 3000-grit wet diamond buffing.",time:"1 hour 45 mins",span:"standard",beforeImage:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",afterImage:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",badge:"Carrara Marble"},{id:"gal-4",category:"door",title:"Burnt Quarter-Cut Walnut Fire Door",location:"Canary Wharf Executive Suite",damage:"Overheated halogen lamp left a 60mm charred black burn on executive boardroom veneer entry door.",technique:"Surgical excision of charred fibres, grain-structure rebuilding, layered aniline dyes and semi-matt lacquer.",time:"2 hours 30 mins",span:"standard",beforeImage:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",afterImage:"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",badge:"Quarter-Cut Walnut"},{id:"gal-5",category:"window",title:"Scratched Anthracite Grey (RAL 7016) UPVC Frame",location:"Richmond Riverside Penthouse",damage:"Scaffolding pipe collision during balcony works gouged deep white plastic furrows across frame face.",technique:"Structural plastic welding, fine contoured reprofiling, factory electrostatic RAL 7016 satin spray.",time:"1 hour 30 mins",span:"wide",beforeImage:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",afterImage:"https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",badge:"Powder-Coated UPVC"},{id:"gal-6",category:"tile",title:"Misdrilled Porcelanosa Large Format Porcelain Tiles",location:"Bishops Avenue, Hampstead",damage:"Redundant 12mm expansion bolt holes in newly installed luxury bathroom feature wall.",technique:"High-density mineral plug, micro-aggregate porcelain filler, printed surface matrix texture match.",time:"1 hour 15 mins",span:"standard",beforeImage:"https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1200&q=80",afterImage:"https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",badge:"Porcelain Tile"},{id:"gal-7",category:"furniture",title:"Chipped Calacatta Viola Marble Dining Table",location:"Mount Street, Mayfair",damage:"Heavy candelabra drop fractured a 40mm triangular chunk from the bevelled table perimeter.",technique:"Two-part optical stone resin, violet and charcoal pigment blending, polished to original 85GU gloss.",time:"2 hours",span:"tall",beforeImage:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",afterImage:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",badge:"Calacatta Viola"},{id:"gal-8",category:"shower-tray",title:"Cracked Stone-Resin Walk-In Shower Tray",location:"Nine Elms, Battersea",damage:"Heavy tile adhesive trowel dropped during snagging cracked the matte slate shower tray corner.",technique:"Structural underside resin bond, slate micro-texture recreation, waterproof slip-resistant coating.",time:"2 hours 10 mins",span:"standard",beforeImage:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",afterImage:"https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",badge:"Slate Stone-Resin"},{id:"gal-9",category:"panel",title:"Scratched Brushed Stainless Steel Lift Car Panels",location:"The Shard, London Bridge",damage:"Luggage trolley scraping scored deep transverse scratches across grain of No. 4 brushed metal panels.",technique:"Micro-abrasive grain realignment, localized chemical passivation, uniform lustre match.",time:"3 hours 30 mins",span:"wide",beforeImage:"https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",afterImage:"https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",badge:"Brushed Steel"}],H=[{id:"all",label:"ALL"},{id:"bath",label:"BATH"},{id:"basin",label:"BASIN"},{id:"door",label:"DOOR"},{id:"floor",label:"FLOOR"},{id:"furniture",label:"FURNITURE"},{id:"window",label:"WINDOW"},{id:"tile",label:"TILE"},{id:"panel",label:"PANEL"},{id:"shower-tray",label:"SHOWER TRAY"}];function O(){if(!(document.getElementById("work")||document.querySelector(".gallery-section")))return;const a=document.getElementById("gallery-filters"),r=document.getElementById("gallery-grid");let p="all";a.innerHTML=H.map(i=>`
      <button class="gallery-filter-pill ${i.id==="all"?"active":""}" data-category="${i.id}">
        ${i.label}
      </button>
    `).join("");const t=i=>{const o=i==="all"?E:E.filter(m=>m.category===i);r.innerHTML=o.map(m=>`
        <div class="gallery-card span-${m.span}" data-id="${m.id}" data-cursor-expand="true">
          <div class="gallery-card-inner">
            <div class="gallery-img-layer">
              <img src="${m.afterImage}" alt="${m.title}" class="gallery-img-primary" loading="lazy" />
              <img src="${m.beforeImage}" alt="${m.title} before" class="gallery-img-hover" loading="lazy" />
            </div>

            <div class="gallery-card-overlay">
              <div class="gallery-card-top">
                <span class="gallery-card-badge">${m.badge}</span>
                <span class="gallery-ba-pill">HOVER: BEFORE • CLICK: FULL INSPECT</span>
              </div>
              <div class="gallery-card-bottom">
                <span class="gallery-card-location">${m.location}</span>
                <h3 class="gallery-card-title">${m.title}</h3>
                <div class="gallery-card-inspect">
                  <span>Open Full Restoration View</span>
                  <span class="arrow">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join(""),r.querySelectorAll(".gallery-card").forEach(m=>{m.addEventListener("click",()=>{const g=m.getAttribute("data-id"),s=E.find(e=>e.id===g);s&&window.openLightbox&&window.openLightbox(s)})})},n=a.querySelectorAll(".gallery-filter-pill");n.forEach(i=>{i.addEventListener("click",()=>{const o=i.getAttribute("data-category");o!==p&&(p=o,f.playTick(560),n.forEach(l=>l.classList.remove("active")),i.classList.add("active"),r.classList.add("fade-switch"),setTimeout(()=>{t(o),r.classList.remove("fade-switch")},160))})}),t("all")}const L=[{surface:"Marble Kitchen Island",replaceCost:"£4,850",replaceTime:"3–5 Weeks",replaceDisruption:"Demolition, dust contamination, template re-measure & plumbing unhook",replaceWaste:"320kg natural stone to landfill",repairCost:"£285",repairTime:"2 Hours (Same Day)",repairDisruption:"Clean, localized, zero plumbing uncoupling, ready for dinner party tonight",repairWaste:"0kg waste • 100% original stone preserved",savingsPercent:"94%"},{surface:"Engineered Oak Parquet",replaceCost:"£3,400",replaceTime:"7–10 Days",replaceDisruption:"Furniture removal into storage, skirting board removal, subfloor prep",replaceWaste:"180kg timber skipped",repairCost:"£240",repairTime:"1.5 Hours",repairDisruption:"Zero furniture decanting, localized grain restoration, odourless finish",repairWaste:"0kg waste • Original patina saved",savingsPercent:"93%"},{surface:"Freestanding Enamel Bath",replaceCost:"£1,950",replaceTime:"4–6 Days",replaceDisruption:"Tile destruction, plumber callout, tight staircase extraction risk",replaceWaste:"85kg cast iron/acrylic waste",repairCost:"£210",repairTime:"2 Hours",repairDisruption:"Repaired in-situ, zero silicone breaking, waterproof cured in 4 hours",repairWaste:"0kg waste • No plumbing disturbance",savingsPercent:"89%"},{surface:"Anthracite UPVC Bi-fold Doors",replaceCost:"£2,800",replaceTime:"3–4 Weeks",replaceDisruption:"Lintel structural checks, weatherproofing removal, re-rendering",replaceWaste:"70kg aluminium/UPVC profiles",repairCost:"£195",repairTime:"1 Hour 15 Mins",repairDisruption:"Repaired in frame, factory RAL spray finish, full weather seal intact",repairWaste:"0kg waste • Zero draft disruption",savingsPercent:"93%"}];function P(){const c=document.getElementById("why-repair")||document.querySelector(".why-repair-section");if(!c)return;const a=document.getElementById("why-calc-selectors"),r=document.getElementById("why-replace-cost"),p=document.getElementById("why-replace-time"),t=document.getElementById("why-replace-disrupt"),n=document.getElementById("why-replace-waste"),i=document.getElementById("why-repair-cost"),o=document.getElementById("why-repair-time"),l=document.getElementById("why-repair-disrupt"),m=document.getElementById("why-repair-waste"),g=document.getElementById("why-savings-badge");a.innerHTML=L.map((u,h)=>`
      <button class="why-scenario-btn ${h===0?"active":""}" data-idx="${h}">
        ${u.surface}
      </button>
    `).join("");const s=a.querySelectorAll(".why-scenario-btn"),e=u=>{const h=L[u];f.playTick(530),s.forEach((y,C)=>y.classList.toggle("active",C===u));const b=document.getElementById("why-col-replace"),v=document.getElementById("why-col-repair");b.classList.add("updating"),v.classList.add("updating"),setTimeout(()=>{r.textContent=h.replaceCost,p.textContent=h.replaceTime,t.textContent=h.replaceDisruption,n.textContent=h.replaceWaste,i.textContent=h.repairCost,o.textContent=h.repairTime,l.textContent=h.repairDisruption,m.textContent=h.repairWaste,g&&(g.textContent=`SAVE ${h.savingsPercent}`),b.classList.remove("updating"),v.classList.remove("updating")},140)};s.forEach((u,h)=>{u.addEventListener("click",()=>e(h))}),new IntersectionObserver(u=>{u.forEach(h=>{h.isIntersecting&&h.target.classList.add("in-view")})},{threshold:.25}).observe(c),e(0)}const $=[{id:"residential",title:"RESIDENTIAL",tagline:"Private Residences & Luxury Penthouses",description:"Bespoke on-site repairs for high-net-worth homeowners, prime interior designers, and estate managers across London.",image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",typicalRepairs:["Marble kitchen islands","Engineered hardwood floors","Enamelled freestanding baths","Architectural stone fireplaces"]},{id:"construction",title:"CONSTRUCTION",tagline:"Tier-1 Contractors & Handover Snagging",description:"Rapid on-site damage mitigation preventing expensive handover penalties, handover delays, and fixture replacements.",image:"https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80",typicalRepairs:["Pre-handover snagging","Scaffolding impact dents","Subcontractor trade damage","Window frame scratch remediation"]},{id:"commercial",title:"COMMERCIAL",tagline:"Corporate HQs & Public Landmarks",description:"Preserving prestigious corporate brand environments without public disruption or messy facility shutdowns.",image:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",typicalRepairs:["Atrium granite floors","Reception desk stone facias","Revolving glass door headers","Boardroom timber panelling"]},{id:"hotels",title:"HOTELS",tagline:"Boutique & 5-Star Hospitality Suites",description:"Zero-room-out-of-order restoration. Odourless, rapid-cure repairs executed between guest check-out and check-in.",image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",typicalRepairs:["Luggage gouges on doors","Vanity top acid ring etches","Chipped shower enclosures","Polished brass fittings"]},{id:"offices",title:"OFFICES",tagline:"Grade-A Working Environments",description:"Out-of-hours weekend and overnight repairs ensuring high-traffic modern workplaces remain immaculate.",image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",typicalRepairs:["Lift lobby stainless steel","Meeting room conference tables","Acoustic wall panel gouges","Tea-point laminate counters"]},{id:"retail",title:"RETAIL",tagline:"Flagship Stores & Bond Street Boutiques",description:"Maintaining pristine luxury retail environments where surface flaws directly affect luxury brand perception.",image:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",typicalRepairs:["High-traffic terrazzo floors","Display plinths and vitrines","Dressing room mirrors and doors","Cash desk quartz tops"]},{id:"marine",title:"MARINE",tagline:"Superyachts & Marine Vessels",description:"Marine-grade UV and salt-resistant restoration compounds engineered for custom marine cabinetry and deck fittings.",image:"https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=1200&q=80",typicalRepairs:["High-gloss piano lacquer finishes","Teak deck gouges","Gelcoat gel repair","Passivated marine hardware"]},{id:"refurbishment",title:"REFURBISHMENT",tagline:"Listed Buildings & Heritage Retrofits",description:"Specialist conservation repairs that preserve original historical material where replacement is legally prohibited.",image:"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",typicalRepairs:["Victorian encaustic tiles","Historic marble chimneypieces","Antique timber architraves","Cast bronze door fixtures"]}];function N(){const c=document.getElementById("sectors-track"),a=document.getElementById("sectors-prev"),r=document.getElementById("sectors-next");if(!c)return;c.innerHTML=$.map((o,l)=>`
      <div class="sector-slide" data-idx="${l}">
        <div class="sector-slide-inner">
          <div class="sector-image-wrap">
            <img src="${o.image}" alt="${o.title}" loading="lazy" />
            <div class="sector-image-gradient"></div>
            <span class="sector-num">0${l+1}</span>
          </div>
          <div class="sector-content">
            <span class="sector-tagline">${o.tagline}</span>
            <h3 class="sector-title">${o.title}</h3>
            <p class="sector-desc">${o.description}</p>
            <div class="sector-repairs">
              <span class="sector-repairs-label">TYPICAL SCOPE:</span>
              <ul class="sector-pills">
                ${o.typicalRepairs.map(m=>`<li>${m}</li>`).join("")}
              </ul>
            </div>
            <button type="button" class="sector-cta-link" data-open-quote data-surface="${o.id}">
              <span>Consult Our ${o.title} Specialist</span>
              <span class="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    `).join("");const p=480;a&&a.addEventListener("click",()=>{f.playTick(500),c.scrollBy({left:-p,behavior:"smooth"})}),r&&r.addEventListener("click",()=>{f.playTick(500),c.scrollBy({left:p,behavior:"smooth"})});let t=!1,n,i;c.addEventListener("mousedown",o=>{t=!0,c.classList.add("grabbing"),n=o.pageX-c.offsetLeft,i=c.scrollLeft}),window.addEventListener("mouseup",()=>{t=!1,c.classList.remove("grabbing")}),c.addEventListener("mousemove",o=>{if(!t)return;o.preventDefault();const m=(o.pageX-c.offsetLeft-n)*1.5;c.scrollLeft=i-m})}function F(){const c=document.getElementById("trust")||document.querySelector(".trust-section");if(!c)return;const a=[{num:"24/7",label:"Availability",sub:"Rapid dispatch response & out-of-hours commercial restoration across Greater London."},{num:"ON-SITE",label:"Repairs",sub:"100% restored in-situ without removal, plumbing disconnection, or dust creation."},{num:"NATIONWIDE",label:"Coverage",sub:"Mobile technical restoration units serving private homes and major UK developments."}],r=document.getElementById("trust-stats-grid");r&&(r.innerHTML=a.map(t=>`
        <div class="trust-stat-card">
          <div class="stat-number-wrap">
            <span class="stat-number">${t.num}</span>
          </div>
          <h3 class="stat-label">${t.label}</h3>
          <p class="stat-sub">${t.sub}</p>
        </div>
      `).join("")),new IntersectionObserver(t=>{t.forEach(n=>{n.isIntersecting&&n.target.classList.add("trust-revealed")})},{threshold:.3}).observe(c)}function W(){document.body.insertAdjacentHTML("beforeend",`
    <div id="quote-modal" class="modal-backdrop" aria-hidden="true">
      <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button class="modal-close" id="close-quote-modal" aria-label="Close quote modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="modal-header">
          <div class="modal-badge">RAPID ASSESSMENT • 30 MIN DISPATCH QUOTE</div>
          <h2 id="modal-title" class="modal-title">REQUEST A SURFACE REPAIR QUOTE</h2>
          <p class="modal-subtitle">Upload damage photos for our senior restoration technicians to evaluate within 30 minutes.</p>
        </div>

        <form id="quote-form" class="modal-form">
          <!-- Step 1: Surface & Damage Type -->
          <div class="form-row">
            <div class="form-group">
              <label for="quote-surface">SURFACE MATERIAL</label>
              <select id="quote-surface" class="form-input" required>
                <option value="marble">Marble / Onyx / Quartz</option>
                <option value="wood">Wood / Engineered Oak / Parquet</option>
                <option value="granite">Granite / Worktop</option>
                <option value="upvc">UPVC / Window Frame / Door</option>
                <option value="ceramic">Ceramic / Porcelain Tile / Basin</option>
                <option value="bath">Bath / Enamelled Acrylic</option>
                <option value="metal">Stainless Steel / Brass / Bronze</option>
                <option value="laminate">Laminate / Veneer / Cladding</option>
              </select>
            </div>

            <div class="form-group">
              <label for="quote-damage-type">DAMAGE TYPE</label>
              <select id="quote-damage-type" class="form-input" required>
                <option value="chip">Deep Chip / Impact Break</option>
                <option value="scratch">Scratch / Scoring Marks</option>
                <option value="burn">Thermal Burn / Scorch Mark</option>
                <option value="crack">Hairline Stress Crack</option>
                <option value="dent">Dent / Surface Depression</option>
                <option value="hole">Drill Hole / Fixture Removal</option>
                <option value="scuff">Transit Scuff / Abrasion</option>
                <option value="stain">Etching / Chemical Bleach</option>
              </select>
            </div>
          </div>

          <!-- Step 2: Photo Upload Area -->
          <div class="form-group">
            <label>DAMAGE PHOTO(S)</label>
            <div id="dropzone" class="dropzone-area">
              <input type="file" id="photo-upload" class="dropzone-file-input" accept="image/*" multiple />
              <div class="dropzone-content" id="dropzone-content">
                <div class="dropzone-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <div class="dropzone-title">Click to upload or drag & drop damaged surface photos</div>
                <div class="dropzone-hint">Include 1 close-up of the damage & 1 wider context photo (JPEG, PNG, HEIC up to 25MB)</div>
                <button type="button" class="btn-sample-photo" id="btn-load-sample">
                  <span>Use Sample Damaged Marble Photo</span>
                </button>
              </div>
              <div id="photo-preview-grid" class="photo-preview-grid"></div>
            </div>
          </div>

          <!-- Step 3: Location & Contact -->
          <div class="form-row">
            <div class="form-group">
              <label for="quote-postcode">LONDON / UK POSTCODE</label>
              <input type="text" id="quote-postcode" class="form-input" placeholder="e.g. SW1X 7LY or NW3" required />
            </div>

            <div class="form-group">
              <label for="quote-timing">URGENCY</label>
              <select id="quote-timing" class="form-input">
                <option value="emergency">Emergency (Within 2-4 Hours)</option>
                <option value="next-day" selected>Next Day / Handover Snag</option>
                <option value="scheduled">Within 3-5 Working Days</option>
                <option value="quote-only">Budget Estimate Only</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="quote-name">FULL NAME / COMPANY</label>
              <input type="text" id="quote-name" class="form-input" placeholder="e.g. Alexander Vance" required />
            </div>
            <div class="form-group">
              <label for="quote-phone">PHONE NUMBER</label>
              <input type="tel" id="quote-phone" class="form-input" placeholder="07... or 020..." required />
            </div>
          </div>

          <div class="form-group">
            <label for="quote-email">EMAIL ADDRESS</label>
            <input type="email" id="quote-email" class="form-input" placeholder="name@domain.co.uk" required />
          </div>

          <div class="form-group">
            <label for="quote-notes">DAMAGE DETAILS (OPTIONAL)</label>
            <textarea id="quote-notes" class="form-textarea" rows="2" placeholder="e.g. Dropped heavy pan on marble island, approximately 20mm triangular chip on front bevelled edge..."></textarea>
          </div>

          <div class="modal-footer">
            <button type="submit" class="btn-primary btn-submit-quote" id="btn-submit-quote">
              <span class="btn-text">SUBMIT FOR 30-MIN ESTIMATE</span>
              <span class="btn-icon">→</span>
            </button>
            <div class="modal-guarantee">
              <span class="guarantee-dot"></span>
              <span>100% In-Situ Restoration Guarantee • No Obligation Free Quote</span>
            </div>
          </div>
        </form>

        <!-- Success View -->
        <div id="quote-success" class="quote-success hidden">
          <div class="success-icon-wrap">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 class="success-title">ASSESSMENT REQUEST RECEIVED</h3>
          <p class="success-desc">Our senior repair specialist has been assigned to your reference <strong id="quote-ref-number" class="text-gold">#LSR-9842</strong>. You will receive a fixed-price restoration proposal within 30 minutes.</p>
          
          <div class="success-estimate-card">
            <div class="estimate-row">
              <span class="estimate-label">Selected Surface:</span>
              <span class="estimate-value" id="res-surface">Carrara Marble</span>
            </div>
            <div class="estimate-row">
              <span class="estimate-label">Damage Classification:</span>
              <span class="estimate-value" id="res-damage">Impact Fracture Chip</span>
            </div>
            <div class="estimate-row">
              <span class="estimate-label">Estimated Restoration Time:</span>
              <span class="estimate-value text-gold">1.5 – 2 Hours (On-Site)</span>
            </div>
            <div class="estimate-row">
              <span class="estimate-label">Replacement Sparing Savings:</span>
              <span class="estimate-value text-gold">~ 82% vs Full Slab Replacement</span>
            </div>
          </div>

          <div class="success-actions">
            <a href="tel:01708536206" class="btn-secondary">
              <span>CALL 01708 536206 NOW</span>
            </a>
            <button type="button" class="btn-primary" id="btn-close-success">
              <span>CLOSE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `);const a=document.getElementById("quote-modal"),r=document.getElementById("close-quote-modal"),p=document.getElementById("quote-form"),t=document.getElementById("quote-success"),n=document.getElementById("dropzone"),i=document.getElementById("photo-upload"),o=document.getElementById("photo-preview-grid"),l=document.getElementById("btn-load-sample"),m=document.getElementById("btn-close-success");window.openQuoteModal=(s="")=>{if(f.playSwoosh(),a.classList.add("active"),a.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden",s){const e=document.getElementById("quote-surface");e&&(e.value=s)}};const g=()=>{a.classList.remove("active"),a.setAttribute("aria-hidden","true"),document.body.style.overflow=""};r.addEventListener("click",g),m.addEventListener("click",()=>{g(),setTimeout(()=>{p.classList.remove("hidden"),t.classList.add("hidden"),p.reset(),o.innerHTML=""},400)}),a.addEventListener("click",s=>{s.target===a&&g()}),document.addEventListener("keydown",s=>{s.key==="Escape"&&a.classList.contains("active")&&g()}),l.addEventListener("click",s=>{s.stopPropagation(),f.playTick(650),o.innerHTML=`
      <div class="photo-preview-card">
        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80" alt="Sample Damaged Marble" />
        <span class="preview-badge">Sample: Fractured Edge</span>
        <button type="button" class="btn-remove-preview" onclick="this.parentElement.remove()">×</button>
      </div>
    `}),n.addEventListener("click",()=>i.click()),i.addEventListener("change",s=>{const e=s.target.files;e.length&&(f.playTick(550),o.innerHTML="",Array.from(e).forEach((d,u)=>{const h=new FileReader;h.onload=b=>{const v=document.createElement("div");v.className="photo-preview-card",v.innerHTML=`
          <img src="${b.target.result}" alt="Uploaded damage ${u+1}" />
          <span class="preview-badge">${d.name.substring(0,16)}...</span>
        `,o.appendChild(v)},h.readAsDataURL(d)}))}),p.addEventListener("submit",s=>{s.preventDefault(),f.playTick(880,.08);const e=document.getElementById("btn-submit-quote");e.disabled=!0,e.innerHTML="<span>ANALYSING DAMAGE SPECIFICATIONS...</span>",setTimeout(()=>{const d=document.getElementById("quote-surface"),u=document.getElementById("quote-damage-type"),h="LSR-"+Math.floor(1e3+Math.random()*9e3);document.getElementById("quote-ref-number").textContent=`#${h}`,document.getElementById("res-surface").textContent=d.options[d.selectedIndex].text,document.getElementById("res-damage").textContent=u.options[u.selectedIndex].text,p.classList.add("hidden"),t.classList.remove("hidden"),e.disabled=!1,e.innerHTML=`
        <span class="btn-text">SUBMIT FOR 30-MIN ESTIMATE</span>
        <span class="btn-icon">→</span>
      `},900)}),document.addEventListener("click",s=>{const e=s.target.closest("[data-open-quote]");if(e){s.preventDefault();const d=e.getAttribute("data-surface")||"";window.openQuoteModal(d)}})}function U(){document.body.insertAdjacentHTML("beforeend",`
    <div id="gallery-lightbox" class="lightbox-backdrop" aria-hidden="true">
      <div class="lightbox-dialog" role="dialog" aria-modal="true">
        <button class="lightbox-close" id="lightbox-close-btn" aria-label="Close image viewer">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="lightbox-content">
          <div class="lightbox-viewer-col">
            <div class="lightbox-image-container" id="lb-image-container">
              <img id="lb-image-after" class="lb-img lb-img-after" src="" alt="Repaired Surface" />
              <div class="lb-split-layer" id="lb-split-layer">
                <img id="lb-image-before" class="lb-img lb-img-before" src="" alt="Damaged Surface" />
                <span class="lb-state-badge badge-before">BEFORE DAMAGE</span>
              </div>
              <span class="lb-state-badge badge-after">AFTER REPAIR</span>
              
              <!-- Draggable slider divider in lightbox -->
              <div class="lb-slider-divider" id="lb-slider-divider">
                <div class="lb-slider-knob">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div class="lb-viewer-instructions">
              <span>← Drag divider to inspect restoration precision →</span>
            </div>
          </div>

          <div class="lightbox-details-col">
            <div class="lb-badge" id="lb-badge">MARBLE RESTORATION</div>
            <h3 class="lb-title" id="lb-title">Chipped Calacatta Viola Marble Dining Table</h3>
            <div class="lb-location" id="lb-location">Mount Street, Mayfair</div>

            <div class="lb-meta-grid">
              <div class="lb-meta-item">
                <span class="lb-meta-lbl">TIME ON-SITE</span>
                <span class="lb-meta-val" id="lb-time">2 hours</span>
              </div>
              <div class="lb-meta-item">
                <span class="lb-meta-lbl">REPAIR TYPE</span>
                <span class="lb-meta-val" id="lb-category">Furniture</span>
              </div>
            </div>

            <div class="lb-section-block">
              <h4 class="lb-subheading">DAMAGE DIAGNOSIS</h4>
              <p class="lb-desc" id="lb-damage"></p>
            </div>

            <div class="lb-section-block">
              <h4 class="lb-subheading">RESTORATION METHOD</h4>
              <p class="lb-desc" id="lb-technique"></p>
            </div>

            <div class="lb-actions">
              <button type="button" class="btn-primary" id="lb-cta-quote">
                <span>REQUEST REPAIR LIKE THIS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `);const a=document.getElementById("gallery-lightbox"),r=document.getElementById("lightbox-close-btn"),p=document.getElementById("lb-slider-divider"),t=document.getElementById("lb-split-layer"),n=document.getElementById("lb-image-container"),i=document.getElementById("lb-cta-quote");let o=null,l=!1;const m=e=>{const d=Math.max(0,Math.min(100,e));t.style.width=`${d}%`,p.style.left=`${d}%`},g=e=>{const d=n.getBoundingClientRect(),b=((e.touches?e.touches[0].clientX:e.clientX)-d.left)/d.width*100;m(b)};n.addEventListener("mousedown",()=>{l=!0}),window.addEventListener("mouseup",()=>{l=!1}),window.addEventListener("mousemove",e=>{l&&g(e)}),n.addEventListener("touchstart",e=>{l=!0,g(e)},{passive:!0}),window.addEventListener("touchend",()=>{l=!1}),window.addEventListener("touchmove",e=>{l&&g(e)},{passive:!0}),window.openLightbox=e=>{o=e,f.playSwoosh(),document.getElementById("lb-title").textContent=e.title,document.getElementById("lb-badge").textContent=e.badge||e.category.toUpperCase(),document.getElementById("lb-location").textContent=e.location,document.getElementById("lb-time").textContent=e.time,document.getElementById("lb-category").textContent=e.category.toUpperCase(),document.getElementById("lb-damage").textContent=e.damage,document.getElementById("lb-technique").textContent=e.technique,document.getElementById("lb-image-after").src=e.afterImage,document.getElementById("lb-image-before").src=e.beforeImage,m(50),a.classList.add("active"),a.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"};const s=()=>{a.classList.remove("active"),a.setAttribute("aria-hidden","true"),document.body.style.overflow=""};r.addEventListener("click",s),a.addEventListener("click",e=>{e.target===a&&s()}),i.addEventListener("click",()=>{s(),window.openQuoteModal&&o&&window.openQuoteModal(o.category)}),document.addEventListener("keydown",e=>{e.key==="Escape"&&a.classList.contains("active")&&s()})}document.addEventListener("DOMContentLoaded",()=>{T(),q(),x(),k(),R(),M(),D(),O(),P(),N(),F(),W(),U();const c=document.getElementById("theme-toggle-btn"),a=document.getElementById("theme-toggle-label");let r=!0;c&&c.addEventListener("click",()=>{r=!r,f.playTick(620);const t=document.getElementById("main-navbar"),n=document.getElementById("hero"),i=document.getElementById("the-difference"),o=document.getElementById("services"),l=document.getElementById("process");t==null||t.classList.toggle("botanical-nav",r),n==null||n.classList.toggle("botanical-hero",r),i==null||i.classList.toggle("botanical-difference",r),o==null||o.classList.toggle("botanical-services",r),l==null||l.classList.toggle("botanical-process",r),a&&(a.textContent=r?"🌿 Botanical Style":"🏛️ Dark Luxury")});const p=document.getElementById("quick-assessment-form");p&&p.addEventListener("submit",t=>{var i;t.preventDefault(),f.playTick(720);const n=((i=document.getElementById("qa-surface"))==null?void 0:i.value)||"marble";window.openQuoteModal&&window.openQuoteModal(n)}),document.querySelectorAll("[data-scroll-to]").forEach(t=>{t.addEventListener("click",n=>{var l;n.preventDefault();const i=t.getAttribute("data-scroll-to"),o=document.querySelector(i);if(o){f.playTick(450);const m=((l=document.getElementById("main-navbar"))==null?void 0:l.offsetHeight)||80,g=o.getBoundingClientRect().top+window.pageYOffset-m+10;window.scrollTo({top:g,behavior:"smooth"})}})}),console.log("London Surface Repairs prototype initialized successfully.")});
//# sourceMappingURL=index-DH_SPIyM.js.map
