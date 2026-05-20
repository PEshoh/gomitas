/* ==========================================================================
   Clario Functional Gummies - Landing Page Logical Engine
   ========================================================================== */

// --- Global Application State ---
let currentVariant = 'focus'; // Default variant: Smooth Focus

// Product definitions for dynamic swapping in the Hero Section
const productData = {
  focus: {
    titleAccent: 'foco y concentración.',
    tagline: 'Fórmulas nootrópicas orgánicas infundidas con hongo Melena de León y Vitaminas B. Despeja la niebla mental y mantente enfocado en tus tareas diarias.',
    badgeTitle: 'Melena de León',
    badgeDesc: 'Foco cognitivo & claridad',
    badgeIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    btnText: 'Añadir al Carrito — $28.00',
    flavor: 'Manzana Verde',
    fullName: 'Smooth focus'
  },
  calm: {
    titleAccent: 'paz y calma.',
    tagline: 'Fórmulas adaptogénicas relajantes infundidas con extracto de L-Teanina purificada y Ashwagandha KSM-66. Sosega tu sistema nervioso y favorece un descanso profundo.',
    badgeTitle: 'L-Teanina pura',
    badgeDesc: 'Relajación & tranquilidad',
    badgeIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    btnText: 'Añadir al Carrito — $28.00',
    flavor: 'Mora',
    fullName: 'Calm & Clarity'
  },
  energy: {
    titleAccent: 'energía activa.',
    tagline: 'Vitalidad natural y limpia potenciada por Coenzima Q10 y Ginseng Coreano. Incrementa tu resistencia diaria de forma equilibrada, sin nerviosismo ni colapsos.',
    badgeTitle: 'Coenzima Q10',
    badgeDesc: 'Energía celular sostenida',
    badgeIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 2-2 10h9L11 22l2-10H4Z"/></svg>`,
    btnText: 'Añadir al Carrito — $28.00',
    flavor: 'Mandarina',
    fullName: 'Energy & Flow'
  }
};

// --- DOM Element References ---
const htmlElement = document.documentElement;
const heroTitleAccent = document.getElementById('hero-title-accent');
const heroTagline = document.getElementById('hero-tagline');
const heroCtaBtn = document.getElementById('hero-cta-btn');
const badgeIconWrap = document.getElementById('badge-icon-wrap');
const badgeTitle = document.getElementById('badge-title');
const badgeDesc = document.getElementById('badge-desc');
const variantPills = document.querySelectorAll('.variant-pill');

// Helper to add the active hero product using the global shared addToCart
function addHeroProductToCart() {
  const data = productData[currentVariant];
  if (typeof addToCart === 'function') {
    addToCart(currentVariant, data.fullName, 28.00, data.flavor);
  }
}

// ==========================================================================
// Interactive Variant Swapping with GSAP Timelines
// ==========================================================================
function switchVariant(variant) {
  if (variant === currentVariant) return;
  
  currentVariant = variant;
  const data = productData[variant];
  
  // 1. Update HTML theme class for CSS variables morphing
  htmlElement.classList.remove('theme-focus', 'theme-calm', 'theme-energy');
  htmlElement.classList.add(`theme-${variant}`);
  
  // 2. Play cohesive typography transition using GSAP timeline
  const textTargets = ['#hero-title-accent', '#hero-tagline', '#hero-cta-btn'];

  if (window.gsap) {
    const textTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    textTimeline.to(textTargets, {
      autoAlpha: 0,
      y: -10,
      duration: 0.15,
      onComplete: () => {
        if (heroTitleAccent) heroTitleAccent.textContent = data.titleAccent;
        if (heroTagline) heroTagline.textContent = data.tagline;
        if (heroCtaBtn) heroCtaBtn.textContent = data.btnText;
      }
    }).to(textTargets, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.25
    });
  } else {
    // Fallback if GSAP fails to load
    if (heroTitleAccent) heroTitleAccent.textContent = data.titleAccent;
    if (heroTagline) heroTagline.textContent = data.tagline;
    if (heroCtaBtn) heroCtaBtn.textContent = data.btnText;
  }

  // 3. Update floating badge with a physics-like pop
  const floatingBadge = document.getElementById('showcase-floating-badge');
  if (floatingBadge) {
    if (window.gsap) {
      gsap.to(floatingBadge, {
        y: 15,
        scale: 0.95,
        autoAlpha: 0.4,
        duration: 0.12,
        ease: "power1.in",
        onComplete: () => {
          if (badgeIconWrap) badgeIconWrap.innerHTML = data.badgeIcon;
          if (badgeTitle) badgeTitle.textContent = data.badgeTitle;
          if (badgeDesc) badgeDesc.textContent = data.badgeDesc;
          
          gsap.fromTo(floatingBadge,
            { y: 15, scale: 0.95, autoAlpha: 0.4 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" }
          );
        }
      });
    } else {
      if (badgeIconWrap) badgeIconWrap.innerHTML = data.badgeIcon;
      if (badgeTitle) badgeTitle.textContent = data.badgeTitle;
      if (badgeDesc) badgeDesc.textContent = data.badgeDesc;
    }
  }
  
  // 4. Update Variant Selector Pills classes
  variantPills.forEach(pill => {
    if (pill.getAttribute('data-variant') === variant) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
  
  // 5. Fade images in Hero Showcase with rotation animation
  const showcaseImgs = document.querySelectorAll('.showcase-img');
  showcaseImgs.forEach(img => {
    if (img.id === `img-${variant}`) {
      img.classList.add('active');
      if (window.gsap) {
        gsap.fromTo(img,
          { scale: 0.95, rotation: -4, autoAlpha: 0.5 },
          { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.65, ease: "elastic.out(1, 0.4)" }
        );
      }
    } else {
      img.classList.remove('active');
    }
  });
}

// Attach Event Listeners to Hero selectors
variantPills.forEach(pill => {
  pill.addEventListener('click', () => {
    const variant = pill.getAttribute('data-variant');
    switchVariant(variant);
  });
});

// ==========================================================================
// Intersection Observers & Scroll Reveal Animations
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger & Draggable plugins
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger, Draggable);
  }

  // 1. Initial Page Load Animation Staggering
  if (window.gsap) {
    const loadTimeline = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

    loadTimeline.fromTo('.header-nav',
      { y: -30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, delay: 0.2 }
    ).fromTo(
      ['.badge', '.hero-headline', '.hero-tagline', '.hero-buttons', '.variant-selector-container'],
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.1 },
      '-=0.6'
    ).fromTo('.hero-showcase',
      { scale: 0.96, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 1, ease: "elastic.out(1, 0.4)" },
      '-=0.7'
    );
  }

  // 2. IntersectionObserver for reveal elements
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

  // 3. Liquid Glass Menu Sliding Indicator & Scroll Spy
  const sectionIds = ['productos', 'ciencia', 'testimonios', 'about'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(el => el !== null);
  const navLinkItems = document.querySelectorAll('.nav-link-item');
  const navLinksUl = document.querySelector('.nav-links');
  const navIndicator = document.querySelector('.nav-indicator-item');

  function getNavLinkByHref(href) {
    return document.querySelector(`.nav-link-item[href="${href}"]`);
  }

  function positionIndicator(link, immediate = false) {
    if (!link || !navIndicator || !navLinksUl) return;
    
    // Disable active sliding animations on mobile viewport (nav hidden)
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const pill = navIndicator.querySelector('.nav-indicator-pill');
      if (pill) pill.style.opacity = '0';
      return;
    }

    const targetLeft = link.offsetLeft;
    const targetWidth = link.offsetWidth;
    const targetHeight = link.offsetHeight;
    const targetTop = link.offsetTop;
    
    const pill = navIndicator.querySelector('.nav-indicator-pill');
    
    if (immediate) {
      navIndicator.style.left = `${targetLeft}px`;
      navIndicator.style.width = `${targetWidth}px`;
      navIndicator.style.top = `${targetTop}px`;
      navIndicator.style.height = `${targetHeight}px`;
      if (pill) pill.style.opacity = '1';
    } else {
      if (window.gsap) {
        gsap.killTweensOf(navIndicator); // Halt running animations to prevent overlaps
        if (pill) gsap.to(pill, { opacity: 1, duration: 0.2 });
        gsap.to(navIndicator, {
          left: targetLeft,
          width: targetWidth,
          top: targetTop,
          height: targetHeight,
          duration: 0.38,
          ease: "elastic.out(1, 0.4)" // Fluid magnetic stretch
        });
      } else {
        navIndicator.style.left = `${targetLeft}px`;
        navIndicator.style.width = `${targetWidth}px`;
        navIndicator.style.top = `${targetTop}px`;
        navIndicator.style.height = `${targetHeight}px`;
        if (pill) pill.style.opacity = '1';
      }
    }
  }

  // Hover transitions
  navLinkItems.forEach(link => {
    link.addEventListener('mouseenter', () => {
      positionIndicator(link);
    });
    
    // Force active state on click
    link.addEventListener('click', () => {
      navLinkItems.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
      positionIndicator(link);
    });
  });

  // When mouse leaves the entire nav UL, snap back to active section link
  if (navLinksUl) {
    navLinksUl.addEventListener('mouseleave', () => {
      const activeLink = document.querySelector('.nav-link-item.active');
      if (activeLink) {
        positionIndicator(activeLink);
      } else {
        const pill = navIndicator ? navIndicator.querySelector('.nav-indicator-pill') : null;
        if (window.gsap && pill) {
          gsap.to(pill, {
            opacity: 0,
            duration: 0.25,
            ease: "power1.out"
          });
        } else if (pill) {
          pill.style.opacity = '0';
        }
      }
    });
  }

  // Scroll spy IntersectionObserver to track user scroll position
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const correspondingLink = getNavLinkByHref(`#${id}`);
        
        if (correspondingLink) {
          navLinkItems.forEach(link => link.classList.remove('active'));
          correspondingLink.classList.add('active');
          
          // Avoid jumping indicator if user is manually hovering nav links
          const isHovered = navLinksUl && navLinksUl.matches(':hover');
          if (!isHovered) {
            positionIndicator(correspondingLink);
          }
        }
      }
    });
  }, {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section sits in top half of screen
    threshold: 0
  });

  sections.forEach(sec => spyObserver.observe(sec));

  // Align indicator after page initial animations complete
  setTimeout(() => {
    const activeLink = document.querySelector('.nav-link-item.active');
    if (activeLink) {
      positionIndicator(activeLink, true);
    }
  }, 1200);

  // Sync positions on window resize
  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-link-item.active');
    if (activeLink) {
      positionIndicator(activeLink, true);
    }
  });

  // 4. Hero Showcase Mouse Parallax (micro-interaction)
  const heroSection = document.querySelector('.hero-section');
  const showcaseInner = document.querySelector('.showcase-inner');
  const heroBgGlow = document.getElementById('hero-bg-glow');
  
  if (heroSection && showcaseInner) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      // Max 4 degrees tilt for 3D depth effect
      const tiltX = (y / (rect.height / 2)) * -4;
      const tiltY = (x / (rect.width / 2)) * 4;
      
      // Subtly shift background glow in opposite direction
      const shiftX = (x / (rect.width / 2)) * 12;
      const shiftY = (y / (rect.height / 2)) * 12;
      
      showcaseInner.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      if (heroBgGlow) {
        heroBgGlow.style.transform = `translate(${shiftX * -0.5}px, ${shiftY * -0.5}px)`;
      }
    });
    
    heroSection.addEventListener('mouseleave', () => {
      if (window.gsap) {
        gsap.to(showcaseInner, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)"
        });
        if (heroBgGlow) {
          gsap.to(heroBgGlow, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)"
          });
        }
      } else {
        showcaseInner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        if (heroBgGlow) {
          heroBgGlow.style.transform = 'translate(0, 0)';
        }
      }
    });
  }

  // 5. Science Section Orbital Nodes Stagger Pulse Animation
  if (window.gsap) {
    // Set initial state for nodes before animating
    gsap.set('.science-ring-node', { scale: 1, autoAlpha: 0.7 });

    gsap.to('.science-ring-node', {
      scale: 1.4,
      autoAlpha: 1,
      stagger: 0.2,
      duration: 0.9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // ==========================================================================
  // ScrollTrigger & GSAP MediaMatch (Responsive & Reduced Motion)
  // ==========================================================================
  if (window.gsap) {
    const mm = gsap.matchMedia();
    
    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      let { reduceMotion } = context.conditions;
      
      if (!reduceMotion && window.ScrollTrigger) {
        // Header shrink ScrollTrigger
        ScrollTrigger.create({
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => {
            const header = document.querySelector('.header-nav');
            if (!header) return;
            if (self.scroll() > 100) {
              header.classList.add('header-compact');
            } else {
              header.classList.remove('header-compact');
            }
          }
        });

        // Bento cards staggered reveal
        gsap.set('.bento-card', { autoAlpha: 0, y: 40 });
        ScrollTrigger.batch('.bento-card', {
          start: 'top 85%',
          onEnter: (elements) => {
            gsap.to(elements, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true
            });
          }
        });

        // Science section parallax
        const scienceVisual = document.querySelector('.science-visual');
        if (scienceVisual) {
          gsap.to('.science-orb', {
            y: 30,
            scrollTrigger: {
              trigger: '.science-visual',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          });

          gsap.to('.science-ring', {
            rotation: 15,
            scrollTrigger: {
              trigger: '.science-visual',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          });
        }
      } else {
        // Fallback or static state if reduced motion
        gsap.set('.bento-card', { autoAlpha: 1, y: 0 });
      }
    });
  }

  // ==========================================================================
  // Bento Cards 3D Tilt Micro-Interactions (gsap.quickSetter)
  // ==========================================================================
  if (window.gsap) {
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
      const setX = gsap.quickSetter(card, "rotateY", "deg");
      const setY = gsap.quickSetter(card, "rotateX", "deg");
      const setScale = gsap.quickSetter(card, "scale");
      
      card.style.transformStyle = "preserve-3d";
      card.style.perspective = "1000px";
      
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        const rotateY = ((x - xc) / xc) * 6;
        const rotateX = ((yc - y) / yc) * 6;
        
        setX(rotateY);
        setY(rotateX);
        setScale(1.02);
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    });
  }

  // ==========================================================================
  // Testimonials Infinite Seamless Loop (GSAP + Drag)
  // ==========================================================================
  const track = document.getElementById('reviews-track');
  if (track) {
    // Clone original cards to fill the viewport seamlessly
    const cards = Array.from(track.children);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });

    const trackWidth = track.scrollWidth;
    const loopWidth = trackWidth / 2;

    const loop = gsap.to(track, {
      x: -loopWidth,
      duration: 35,
      ease: "none",
      repeat: -1
    });

    // Pause on hover
    track.addEventListener('mouseenter', () => loop.pause());
    track.addEventListener('mouseleave', () => loop.play());

    // Drag interactions using GSAP Draggable
    if (window.Draggable) {
      Draggable.create(track, {
        type: "x",
        trigger: ".reviews-slider-container",
        bounds: { minX: -loopWidth, maxX: 0 },
        onPress: function() {
          loop.pause();
        },
        onDrag: function() {
          let x = this.x;
          if (x < -loopWidth) {
            x += loopWidth;
            gsap.set(track, { x: x });
            this.update();
          } else if (x > 0) {
            x -= loopWidth;
            gsap.set(track, { x: x });
            this.update();
          }
        },
        onDragEnd: function() {
          loop.play();
          gsap.to(loop, { timeScale: 1, duration: 0.5 });
        }
      });
    }
  }

  // ==========================================================================
  // Programmatic Button Binding & Event Delegation
  // ==========================================================================
  // 1. Hero CTA buy button
  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', addHeroProductToCart);
  }

  // 2. Bento cards buy buttons delegation
  const bentoGrid = document.querySelector('.bento-grid');
  if (bentoGrid) {
    bentoGrid.addEventListener('click', (e) => {
      const buyBtn = e.target.closest('.bento-buy-btn');
      if (buyBtn) {
        e.preventDefault();
        const variant = buyBtn.getAttribute('data-variant');
        const data = productData[variant];
        if (data && typeof addToCart === 'function') {
          addToCart(variant, data.fullName, 28.00, data.flavor);
        }
      }
    });
  }

  // 3. Footer variant links binding
  const footerLinks = document.querySelectorAll('.footer-variant-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const variant = link.getAttribute('data-variant');
      if (variant) {
        switchVariant(variant);
        const productsSec = document.getElementById('productos');
        if (productsSec) {
          productsSec.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
