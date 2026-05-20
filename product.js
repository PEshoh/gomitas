/* ==========================================================================
   Clario Functional Gummies - Product Detail Page Controller
   ========================================================================== */

// --- Dynamic Variant Data Definitions ---
const pdpVariants = {
  focus: {
    title: 'Smooth focus',
    quote: '"Focus without the mental noise."',
    tagline: 'Claridad mental & foco agudo sostenido.',
    description: 'Despeja la niebla mental de tus tareas más pesadas. Formulada con nootrópicos puros y adaptógenos orgánicos para mantenerte agudo, concentrado y en un estado de flujo productivo por más tiempo, libre de la cafeína sintética y los temblores.',
    flavor: 'Manzana Verde',
    badgeTitle: 'Melena de León',
    badgeDesc: 'Foco cognitivo & claridad',
    badgeIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    images: {
      primary: 'referencias/WhatsApp Image 2026-05-19 at 2.27.50 PM (2).jpeg',
      texture: 'referencias/WhatsApp Image 2026-05-19 at 2.27.51 PM.jpeg'
    },
    science: {
      activeTitle: 'Melena de León Orgánico (Hericium erinaceus)',
      activeText: 'Nuestra Melena de León se extrae del cuerpo fructífero del hongo mediante doble extracción para asegurar un contenido mínimo del 30% en polisacáridos activos. Estimula directamente la síntesis del Factor de Crecimiento Nervioso (NGF), promoviendo la neurogénesis, la plasticidad cerebral, la velocidad de procesamiento cognitivo y la memoria espacial.',
      stat1Val: '500mg',
      stat1Lbl: 'Dosis por porción',
      stat2Val: '30%',
      stat2Lbl: 'Polisacáridos activos',
      stat3Val: 'Doble',
      stat3Lbl: 'Método extracción',
      accordionUse: 'Recomendamos consumir 2 gomitas al día, preferiblemente por la mañana junto con tu rutina diaria o 30 minutos antes de comenzar tareas de alta demanda mental.'
    },
    nutrition: [
      { name: 'Extracto de Melena de León (cuerpo fructífero, 10:1)', amount: '500 mg', pct: '**' },
      { name: 'L-Teanina purificada (extracto de Té Verde)', amount: '150 mg', pct: '**' },
      { name: 'Vitamina B12 (como Metilcobalamina activa)', amount: '12 mcg', pct: '500%' },
      { name: 'Vitamina B6 (como Piridoxal-5-Fosfato)', amount: '3.4 mg', pct: '200%' }
    ]
  },
  calm: {
    title: 'Calm & Clarity',
    quote: '"Soft calm for busy minds."',
    tagline: 'Descompresión neuronal & paz interna.',
    description: 'Calma tu sistema de alerta y disipa la tensión diaria acumulada. Formulada con Ashwagandha KSM-66 y L-Teanina para relajar el tono muscular y silenciar los pensamientos rumiantes, promoviendo un estado de tranquilidad consciente y descanso nocturno reparador.',
    flavor: 'Mora',
    badgeTitle: 'L-Teanina pura',
    badgeDesc: 'Relajación & tranquilidad',
    badgeIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    images: {
      primary: 'referencias/WhatsApp Image 2026-05-19 at 2.27.50 PM.jpeg',
      texture: 'referencias/WhatsApp Image 2026-05-19 at 2.27.51 PM.jpeg'
    },
    science: {
      activeTitle: 'Extracto Premium de Ashwagandha KSM-66®',
      activeText: 'La Ashwagandha KSM-66® es el extracto de raíz con mayor concentración biológica del mercado. Ayuda a regular de manera óptima el eje hipotalámico-hipofisiario-adrenal (HHA), disminuyendo significativamente el cortisol circulante (la hormona del estrés), calmando el sistema nervioso central e incrementando la resiliencia mental sin generar aletargamiento.',
      stat1Val: '300mg',
      stat1Lbl: 'Dosis por porción',
      stat2Val: '5%',
      stat2Lbl: 'Withanólidos activos',
      stat3Val: 'Orgánica',
      stat3Lbl: 'Certificación raíz',
      accordionUse: 'Toma 2 gomitas al final de la tarde o antes de dormir. Ayuda a apagar el ruido mental rumiante del día y relaja el cuerpo de forma profunda.'
    },
    nutrition: [
      { name: 'Extracto de Ashwagandha KSM-66® (raíz)', amount: '300 mg', pct: '**' },
      { name: 'L-Teanina purificada (extracto de Té Verde)', amount: '200 mg', pct: '**' },
      { name: 'Citrato de Magnesio quelado activo', amount: '100 mg', pct: '24%' },
      { name: 'Extracto natural de Manzanilla silvestre', amount: '50 mg', pct: '**' }
    ]
  },
  energy: {
    title: 'Energy & Flow',
    quote: '"Stay bright, stay balanced."',
    tagline: 'Energía mitocondrial limpia sin picos.',
    description: 'Incrementa tus niveles de energía diarios de forma limpia y equilibrada. Formulada con Coenzima Q10 y Ginseng Coreano Rojo para optimizar la producción de ATP en las células, proporcionando una sensación de vitalidad natural y resistencia sostenida sin temblores ni colapsos.',
    flavor: 'Mandarina',
    badgeTitle: 'Coenzima Q10',
    badgeDesc: 'Energía celular sostenida',
    badgeIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 2-2 10h9L11 22l2-10H4Z"/></svg>`,
    images: {
      primary: 'referencias/WhatsApp Image 2026-05-19 at 2.27.50 PM (1).jpeg',
      texture: 'referencias/WhatsApp Image 2026-05-19 at 2.27.51 PM.jpeg'
    },
    science: {
      activeTitle: 'Coenzima Q10 Coenzimática de Alta Pureza',
      activeText: 'La Coenzima Q10 (CoQ10) es un catalizador bioquímico vital en la cadena de transporte de electrones de las mitocondrias, el motor donde se produce el 95% de la energía de nuestro cuerpo (ATP). Su sinergia con el Ginseng Coreano Rojo optimiza el metabolismo celular de carbohidratos, incrementando la resistencia física y combatiendo el cansancio sin sobreestimular.',
      stat1Val: '100mg',
      stat1Lbl: 'Dosis por porción',
      stat2Val: '99%',
      stat2Lbl: 'Pureza cristalina',
      stat3Val: 'ATP',
      stat3Lbl: 'Foco de acción',
      accordionUse: 'Consume 2 gomitas por la mañana antes de empezar tu día o 20 minutos antes de hacer ejercicio físico. Se desaconseja tomarlas de noche para no retrasar el sueño natural.'
    },
    nutrition: [
      { name: 'Coenzima Q10 (Ubiquinona pura)', amount: '100 mg', pct: '**' },
      { name: 'Extracto de Ginseng Coreano Rojo (raíz, 10:1)', amount: '200 mg', pct: '**' },
      { name: 'Vitamina B12 (como Metilcobalamina activa)', amount: '24 mcg', pct: '1000%' },
      { name: 'Vitamina B6 (como Piridoxina HCl)', amount: '1.7 mg', pct: '100%' },
      { name: 'Vitamina C (como Ácido Ascórbico orgánico)', amount: '90 mg', pct: '100%' }
    ]
  }
};

// State Variables for PDP logic
let currentVariant = 'focus';
let selectedSize = 'standard';
let selectedOption = 'subscription';

// --- Price Calculation Table ---
const BASE_SINGLE_PRICE = 28.00;
const SIZE_CONFIGS = {
  standard: { multiplier: 1.0, titleSuffix: 'Estándar', quantityText: '30 Gomitas (1 mes)', basePrice: 28.00 },
  double: { multiplier: 1.8, titleSuffix: 'Pack Duplo', quantityText: '60 Gomitas (2 meses)', basePrice: 50.40 }, // 10% saving built in
  refill: { multiplier: 0.95, titleSuffix: 'Recarga Eco', quantityText: '30 Gomitas (Eco-pack)', basePrice: 26.60 } // 5% saving built in
};
const SUBSCRIPTION_DISCOUNT = 0.8; // 20% off

// Dynamic updates of prices
function calculatePrices() {
  const config = SIZE_CONFIGS[selectedSize];
  const originalPrice = config.basePrice;
  const subPrice = originalPrice * SUBSCRIPTION_DISCOUNT;
  
  // Update elements in buy box
  const priceSubDisplay = document.getElementById('price-sub-display');
  const priceSubOriginal = document.getElementById('price-sub-original');
  const priceOnetimeDisplay = document.getElementById('price-onetime-display');
  const buyBtn = document.getElementById('pdp-buy-btn');

  if (priceSubDisplay) priceSubDisplay.textContent = `$${subPrice.toFixed(2)}`;
  if (priceSubOriginal) priceSubOriginal.textContent = `$${originalPrice.toFixed(2)}`;
  if (priceOnetimeDisplay) priceOnetimeDisplay.textContent = `$${originalPrice.toFixed(2)}`;

  // Update central Buy Button text
  if (buyBtn) {
    const finalPrice = selectedOption === 'subscription' ? subPrice : originalPrice;
    const prefixText = selectedOption === 'subscription' ? 'Añadir a la Suscripción' : 'Añadir al Carrito';
    buyBtn.textContent = `${prefixText} — $${finalPrice.toFixed(2)}`;
  }
}

// --- Dynamic Content Injector ---
function loadVariantPDP(variant) {
  if (!pdpVariants[variant]) variant = 'focus';
  currentVariant = variant;
  
  const data = pdpVariants[variant];

  // 1. Update HTML theme classes dynamically
  document.documentElement.classList.remove('theme-focus', 'theme-calm', 'theme-energy');
  document.documentElement.classList.add(`theme-${variant}`);

  // 2. Metadata: document titles, breadcrumbs
  document.title = `Clario | ${data.title} — Gomitas Funcionales`;
  const breadcrumbCurrent = document.getElementById('breadcrumb-current-product');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = data.title;

  // 3. Update Text Content
  const pTitle = document.getElementById('pdp-product-title');
  const pQuote = document.getElementById('pdp-product-quote');
  const pDesc = document.getElementById('pdp-product-desc');
  const pFlavorText = document.getElementById('pdp-flavor-text');
  
  if (pTitle) pTitle.textContent = data.title;
  if (pQuote) pQuote.textContent = data.quote;
  if (pDesc) pDesc.textContent = data.description;
  if (pFlavorText) pFlavorText.textContent = `Sabor ${data.flavor}`;

  // 4. Update Badge overlays
  const badgeTitle = document.getElementById('pdp-badge-title');
  const badgeDesc = document.getElementById('pdp-badge-desc');
  const badgeIcon = document.getElementById('pdp-badge-icon');
  
  if (badgeTitle) badgeTitle.textContent = data.badgeTitle;
  if (badgeDesc) badgeDesc.textContent = data.badgeDesc;
  if (badgeIcon) badgeIcon.innerHTML = data.badgeIcon;

  // 5. Update Images (Main and thumbnails)
  const mainImage = document.getElementById('pdp-main-image');
  const thumb0 = document.getElementById('thumb-img-0');
  const thumb1 = document.getElementById('thumb-img-1');
  
  if (mainImage) mainImage.src = data.images.primary;
  if (thumb0) thumb0.src = data.images.primary;
  if (thumb1) thumb1.src = data.images.texture;

  // 6. Update Science section elements
  const scienceTitle = document.getElementById('science-active-title');
  const scienceText = document.getElementById('science-active-text');
  const scienceStat1 = document.getElementById('science-stat-1-val');
  const scienceStat2 = document.getElementById('science-stat-2-val');
  const scienceStat3 = document.getElementById('science-stat-3-val');
  const accordionUse = document.getElementById('accordion-use-text');
  
  if (scienceTitle) scienceTitle.textContent = data.science.activeTitle;
  if (scienceText) scienceText.textContent = data.science.activeText;
  if (scienceStat1) scienceStat1.textContent = data.science.stat1Val;
  if (scienceStat2) scienceStat2.textContent = data.science.stat2Val;
  if (scienceStat3) scienceStat3.textContent = data.science.stat3Val;
  if (accordionUse) accordionUse.textContent = data.science.accordionUse;

  // 7. Update Nutritional Table
  const nutritionName = document.getElementById('nutrition-product-name');
  const tableBody = document.getElementById('nutrition-table-body');
  
  if (nutritionName) nutritionName.textContent = data.title;
  if (tableBody) {
    tableBody.innerHTML = '';
    data.nutrition.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${safeHTML(item.name)}</strong></td>
        <td>${safeHTML(item.amount)}</td>
        <td>${safeHTML(item.pct)}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // 8. Re-evaluate prices for new configuration
  calculatePrices();

  // 9. Build dynamic cross-sells
  renderCrossSells();

  // 10. Re-trigger animations
  animatePDPArrival();

  // 11. Re-trigger science stats counter on variant change
  animateScienceStats();
}

// --- Helper to escape HTML safely ---
const safeHTML = (str) => typeof escapeHTML === 'function' ? escapeHTML(str) : str;

// --- Recommendations Card Builder (Cross-Sell) ---
function renderCrossSells() {
  const crossSellContainer = document.getElementById('crosssell-container');
  if (!crossSellContainer) return;

  crossSellContainer.innerHTML = '';
  
  // Render cards for the other 2 variants
  Object.keys(pdpVariants).forEach(variantKey => {
    if (variantKey === currentVariant) return; // Skip active variant

    const data = pdpVariants[variantKey];
    
    // Create card wrapper
    const card = document.createElement('div');
    card.className = `crosssell-card glass-panel reveal-slow active`;

    const badgeColorMap = {
      focus: 'background-color: #EBF8F2; color: #2D5B37; border: 1px solid rgba(123, 182, 132, 0.2);',
      calm: 'background-color: #F6F2FC; color: #62439D; border: 1px solid rgba(156, 130, 205, 0.2);',
      energy: 'background-color: #FEF9EE; color: #B05B17; border: 1px solid rgba(252, 174, 59, 0.2);'
    };
    
    card.innerHTML = `
      <div class="crosssell-card-content">
        <div>
          <span class="badge crosssell-tag" style="${badgeColorMap[variantKey] || ''}">${safeHTML(data.badgeTitle)}</span>
          <h3 class="crosssell-title">
            <a href="product.html?variant=${variantKey}" class="crosssell-card-link">${safeHTML(data.title)}</a>
          </h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Sabor ${safeHTML(data.flavor)}</p>
        </div>
        
        <div class="crosssell-image-wrap">
          <img src="${safeHTML(data.images.primary)}" alt="${safeHTML(data.title)}">
        </div>
        
        <div class="crosssell-footer">
          <span class="crosssell-price">$28.00</span>
          <button class="btn-primary crosssell-buy-btn" data-variant="${variantKey}" style="padding: 0.5rem 1.2rem; font-size: 0.8rem; z-index: 2; position: relative;">
            Añadir
          </button>
        </div>
      </div>
    `;

    crossSellContainer.appendChild(card);
  });

  // Cross-sell cards entrance animation
  if (window.gsap) {
    const cards = crossSellContainer.querySelectorAll('.crosssell-card');
    if (cards.length) {
      gsap.fromTo(cards,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15 }
      );
    }
  }
}

// --- Live Shipping Countdown Timer ---
function runDispatchTimer() {
  function updateTimer() {
    const now = new Date();
    
    // Target dispatch time is 17:00 (5:00 PM) today
    let target = new Date();
    target.setHours(17, 0, 0, 0);
    
    // If it's already past 17:00, count down to 17:00 tomorrow
    if (now > target) {
      target.setDate(target.getDate() + 1);
    }
    
    const diff = target - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    const formatted = `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
    
    const timerEl = document.getElementById('pdp-dispatch-countdown');
    if (timerEl) {
      // Find what day the shipment is dispatched
      let dayText = 'hoy mismo';
      const day = target.getDay();
      
      if (day === 6) { // Saturday, dispatch moves to Monday
        dayText = 'este lunes';
      } else if (day === 0) { // Sunday, dispatch moves to Monday
        dayText = 'este lunes';
      } else if (now.getHours() >= 17) {
        dayText = 'mañana';
      }
      
      timerEl.innerHTML = `${formatted} para envío <strong>${dayText}</strong>`;
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// --- Inventory Scarcity Simulation ---
function runInventoryFluctuator() {
  const stockEl = document.getElementById('pdp-stock-count');
  const barEl = document.getElementById('pdp-stock-progressbar');
  if (!stockEl || !barEl) return;

  let currentStock = 9;
  
  setInterval(() => {
    // Fluctuate between 4 and 11
    const rand = Math.random();
    if (rand < 0.25 && currentStock > 4) {
      currentStock--; // Sim purchase
    } else if (rand > 0.85 && currentStock < 11) {
      currentStock++; // Lote incremented
    }
    
    stockEl.textContent = currentStock;
    // Map to progress fill width (e.g. 15 max)
    const fillPercent = Math.min(Math.max((currentStock / 12) * 100, 30), 96);
    barEl.style.width = `${fillPercent}%`;
  }, 25000); // Trigger every 25 seconds
}

// --- Interactive Animations timeline ---
function animatePDPArrival() {
  if (window.gsap) {
    const imgSel = '.pdp-main-image';
    const textSel = '.pdp-title, .pdp-tagline-quote, .pdp-description, .pdp-meta-grid, .pdp-control-group, .fomo-banner-box, .pdp-cta-wrap';

    gsap.killTweensOf(imgSel);
    gsap.killTweensOf(textSel);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(imgSel, { autoAlpha: 1, scale: 1, y: 0 });
      gsap.set(textSel, { autoAlpha: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(imgSel,
      { autoAlpha: 0, scale: 0.93, y: 20 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' },
      0
    );

    tl.fromTo(textSel,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06 },
      0.15
    );
  }
}

// --- Science Stats Counter Animation with ScrollTrigger ---
function animateScienceStats() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const ids = ['science-stat-1-val', 'science-stat-2-val', 'science-stat-3-val'];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    const raw = el.textContent.trim();
    // Parse numeric value and suffix, e.g. '500mg' → { num: 500, suffix: 'mg' }
    const match = raw.match(/^([\d.]+)(.*)$/);
    if (!match) return; // non-numeric stat like 'Doble' — skip counter

    const targetNum = parseFloat(match[1]);
    const suffix = match[2];
    const isInteger = Number.isInteger(targetNum);

    const obj = { val: 0 };

    gsap.to(obj, {
      val: targetNum,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = (isInteger ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
      },
      scrollTrigger: {
        trigger: '.pdp-science-section',
        start: 'top 80%',
        once: true
      }
    });
  });
}

// Initialize listeners on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP ScrollTrigger plugin
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Get Variant from URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const variantParam = urlParams.get('variant') || 'focus';
  loadVariantPDP(variantParam);

  // 2. Navigation Slide pill indicator configuration
  const navLinkItems = document.querySelectorAll('.nav-link-item');
  const navIndicator = document.getElementById('nav-indicator-pill');
  if (navIndicator) navIndicator.style.opacity = '0'; // Hide indicator on details page, breadcrumbs do the job

  // 3. Media Gallery switching
  const mainImage = document.getElementById('pdp-main-image');
  const thumbs = document.querySelectorAll('.pdp-thumbnail');
  
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      // Ignore if index 2 (which opens modal)
      const index = parseInt(thumb.getAttribute('data-index'));
      if (index === 2) {
        // Open Nutritional modal
        const modal = document.getElementById('nutrition-modal');
        const backdrop = document.getElementById('nutrition-backdrop');
        if (modal && backdrop) {
          modal.classList.add('open');
          backdrop.classList.add('open');
          document.body.style.overflow = 'hidden';
          if (window.gsap) {
            gsap.fromTo('#nutrition-modal',
              { y: '-60%', autoAlpha: 0, scale: 0.96 },
              { y: '-50%', autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(1.7)' }
            );
          }
        }
        return;
      }
      
      // Update active thumbnail
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      
      const newSrc = thumb.querySelector('img').src;
      if (mainImage) {
        if (window.gsap) {
          gsap.to(mainImage, {
            autoAlpha: 0.2,
            scale: 0.95,
            duration: 0.15,
            ease: 'power1.in',
            onComplete: () => {
              mainImage.src = newSrc;
              gsap.fromTo(mainImage,
                { autoAlpha: 0.2, scale: 0.95 },
                { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' }
              );
            }
          });
        } else {
          mainImage.src = newSrc;
        }
      }
    });
  });

  // Modal close handlers
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBackdrop = document.getElementById('nutrition-backdrop');
  
  function closeModal() {
    const modal = document.getElementById('nutrition-modal');
    const backdrop = document.getElementById('nutrition-backdrop');
    if (modal && backdrop) {
      document.body.style.overflow = '';
      if (window.gsap) {
        gsap.to('#nutrition-modal', {
          y: '-40%',
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.3,
          ease: 'power1.in',
          onComplete: () => {
            modal.classList.remove('open');
            backdrop.classList.remove('open');
          }
        });
      } else {
        modal.classList.remove('open');
        backdrop.classList.remove('open');
      }
    }
  }
  
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // 4. Size Selector Cards Click Listeners
  const sizeCards = document.querySelectorAll('.pdp-size-card');
  sizeCards.forEach(card => {
    card.addEventListener('click', () => {
      sizeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedSize = card.getAttribute('data-size');
      
      calculatePrices();
      
      if (window.gsap) {
        gsap.fromTo(card,
          { scale: 1 },
          { scale: 1.03, duration: 0.15, ease: 'power1.out', yoyo: true, repeat: 1 }
        );
      }
    });
  });

  // 5. Purchase Option Cards Click and Radio toggle
  const optionSubscribe = document.getElementById('option-subscribe');
  const optionOnetime = document.getElementById('option-onetime');
  const radioInputs = document.querySelectorAll('input[name="purchase_type"]');

  function selectOption(optionVal) {
    selectedOption = optionVal;
    
    if (optionVal === 'subscription') {
      if (optionSubscribe) optionSubscribe.classList.add('active');
      if (optionOnetime) optionOnetime.classList.remove('active');
      
      const radio = document.querySelector('input[value="subscription"]');
      if (radio) radio.checked = true;
    } else {
      if (optionOnetime) optionOnetime.classList.add('active');
      if (optionSubscribe) optionSubscribe.classList.remove('active');
      
      const radio = document.querySelector('input[value="one-time"]');
      if (radio) radio.checked = true;
    }
    calculatePrices();
  }

  if (optionSubscribe) {
    optionSubscribe.addEventListener('click', (e) => {
      // Avoid loops if clicking inside selectors or dropdowns
      if (e.target.tagName !== 'SELECT' && e.target.tagName !== 'OPTION') {
        selectOption('subscription');
      }
    });
  }
  if (optionOnetime) {
    optionOnetime.addEventListener('click', () => {
      selectOption('one-time');
    });
  }

  radioInputs.forEach(radio => {
    radio.addEventListener('change', () => {
      selectOption(radio.value);
    });
  });

  // 6. Science Accordion Interactions
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other items
      document.querySelectorAll('.accordion-item').forEach(i => {
        if (i !== item) {
          i.classList.remove('active');
          const content = i.querySelector('.accordion-content');
          if (content) {
            if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              gsap.to(content, { height: 0, duration: 0.3, ease: 'power2.out', clearProps: 'height' });
            } else {
              content.style.maxHeight = null;
            }
          }
          i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        }
      });

      if (!isActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        const content = item.querySelector('.accordion-content');
        if (content) {
          if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.fromTo(content,
              { height: 0 },
              { height: 'auto', duration: 0.35, ease: 'power2.out' }
            );
          } else {
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        }
      } else {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        const content = item.querySelector('.accordion-content');
        if (content) {
          if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.to(content, { height: 0, duration: 0.3, ease: 'power2.out', clearProps: 'height' });
          } else {
            content.style.maxHeight = null;
          }
        }
      }
    });
  });

  // 7. Shipping Live Countdown Clock
  runDispatchTimer();

  // 8. Inventory Scarcity fluctuator
  runInventoryFluctuator();

  // 9. Main PDP Buy CTA Button Click Handler
  const pdpBuyBtn = document.getElementById('pdp-buy-btn');
  if (pdpBuyBtn) {
    pdpBuyBtn.addEventListener('click', () => {
      const variantData = pdpVariants[currentVariant];
      const sizeConfig = SIZE_CONFIGS[selectedSize];
      
      const basePrice = sizeConfig.basePrice;
      const finalPrice = selectedOption === 'subscription' ? (basePrice * SUBSCRIPTION_DISCOUNT) : basePrice;

      const sizeText = sizeConfig.titleSuffix;
      const name = `${variantData.title} (${sizeText})`;
      
      const type = selectedOption;
      let frequency = null;
      if (type === 'subscription') {
        const freqSelect = document.getElementById('subscription-frequency');
        frequency = freqSelect ? freqSelect.value : '30';
      }

      if (typeof addToCart === 'function') {
        addToCart(currentVariant, name, finalPrice, variantData.flavor, type, frequency);
      }
    });
  }

  // 10. Cross Sell dynamic click listener delegation
  const crossSellContainer = document.getElementById('crosssell-container');
  if (crossSellContainer) {
    crossSellContainer.addEventListener('click', (e) => {
      const buyBtn = e.target.closest('.crosssell-buy-btn');
      if (buyBtn) {
        e.preventDefault();
        e.stopPropagation();
        const variantKey = buyBtn.getAttribute('data-variant');
        const data = pdpVariants[variantKey];
        if (data && typeof addToCart === 'function') {
          addToCart(variantKey, data.title, 28.00, data.flavor);
        }
      }
    });
  }

  // 11. Scroll Reveal Animations IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  });
  
  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
});

