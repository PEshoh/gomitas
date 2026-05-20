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
function addHeroProductToCart(e) {
  const data = productData[currentVariant];
  if (typeof addToCart === 'function') {
    addToCart(currentVariant, data.fullName, 28.00, data.flavor, 'one-time', null, e ? e.currentTarget : null);
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
  
  // 2. Play cohesive typography transition using GSAP timeline (Dynamic Split Text)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Helper to split text into spans dynamically
  function splitIntoSpans(element, type = 'words') {
    if (!element) return [];
    const text = element.textContent;
    element.innerHTML = '';
    
    if (type === 'chars') {
      return text.split('').map(char => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.whiteSpace = char === ' ' ? 'pre' : 'normal';
        span.textContent = char;
        element.appendChild(span);
        return span;
      });
    } else {
      return text.split(' ').map((word, i, arr) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.textContent = word;
        element.appendChild(span);
        if (i < arr.length - 1) {
          const space = document.createTextNode(' ');
          element.appendChild(space);
        }
        return span;
      });
    }
  }

  if (window.gsap && !prefersReduced) {
    // Split the current text so we can animate it OUT
    const currentAccentSpans = splitIntoSpans(heroTitleAccent, 'chars');
    const currentTaglineSpans = splitIntoSpans(heroTagline, 'words');

    const textTimeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    // Out animation
    textTimeline.to(currentAccentSpans, {
      autoAlpha: 0,
      y: -8,
      stagger: { each: 0.015, from: "start" },
      duration: 0.2
    }, 0);

    textTimeline.to(currentTaglineSpans, {
      autoAlpha: 0,
      y: -6,
      stagger: 0.008,
      duration: 0.2
    }, 0);

    textTimeline.to('#hero-cta-btn', {
      autoAlpha: 0,
      y: -5,
      duration: 0.15
    }, 0);

    // Swap content and animate IN
    textTimeline.add(() => {
      if (heroTitleAccent) heroTitleAccent.textContent = data.titleAccent;
      if (heroTagline) heroTagline.textContent = data.tagline;
      if (heroCtaBtn) heroCtaBtn.textContent = data.btnText;

      // Split the new text
      const newAccentSpans = splitIntoSpans(heroTitleAccent, 'chars');
      const newTaglineSpans = splitIntoSpans(heroTagline, 'words');

      // Set initial state
      gsap.set(newAccentSpans, { autoAlpha: 0, y: 12 });
      gsap.set(newTaglineSpans, { autoAlpha: 0, y: 8 });
      gsap.set('#hero-cta-btn', { autoAlpha: 0, y: 10 });

      // In animation
      gsap.to(newAccentSpans, {
        autoAlpha: 1,
        y: 0,
        stagger: { each: 0.02, from: "start" },
        duration: 0.45,
        ease: "power4.out"
      });

      gsap.to(newTaglineSpans, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.012,
        duration: 0.45,
        ease: "power3.out"
      });

      gsap.to('#hero-cta-btn', {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out"
      });
    });
  } else {
    // Fallback if GSAP fails to load or reduced motion is preferred
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
  const navIndicator = document.querySelector('.nav-indicator-item'); // the absolute-positioned wrapper li
  const navIndicatorPill = document.getElementById('nav-indicator-pill'); // the visual pill inside

  function getNavLinkByHref(href) {
    return document.querySelector(`.nav-link-item[href="${href}"]`);
  }

  function positionIndicator(link, immediate = false) {
    if (!link || !navIndicator || !navLinksUl) return;
    
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      if (window.gsap) {
        gsap.to(navIndicatorPill, { autoAlpha: 0, duration: 0.2 });
      } else {
        if (navIndicatorPill) navIndicatorPill.style.opacity = '0';
      }
      return;
    }

    // getBoundingClientRect gives accurate positions regardless of flex/grid layout
    const ulRect = navLinksUl.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    
    const targetLeft = linkRect.left - ulRect.left;
    const targetWidth = linkRect.width;
    const targetTop = linkRect.top - ulRect.top;
    const targetHeight = linkRect.height;
    
    // Scale factors relative to 100px x 40px base dimension
    const scaleXVal = targetWidth / 100;
    const scaleYVal = targetHeight / 40;

    if (immediate) {
      if (window.gsap) {
        gsap.set(navIndicator, {
          x: targetLeft,
          scaleX: scaleXVal,
          y: targetTop,
          scaleY: scaleYVal
        });
        gsap.set(navIndicatorPill, { autoAlpha: 1 });
      } else {
        navIndicator.style.transform = `translate(${targetLeft}px, ${targetTop}px) scale(${scaleXVal}, ${scaleYVal})`;
        if (navIndicatorPill) navIndicatorPill.style.opacity = '1';
      }
    } else {
      if (window.gsap) {
        gsap.killTweensOf([navIndicator, navIndicatorPill]);
        
        // Check reduced motion preference
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
          gsap.set(navIndicator, {
            x: targetLeft,
            scaleX: scaleXVal,
            y: targetTop,
            scaleY: scaleYVal
          });
          gsap.to(navIndicatorPill, { autoAlpha: 1, duration: 0.15 });
        } else {
          gsap.to(navIndicator, {
            x: targetLeft,
            scaleX: scaleXVal,
            y: targetTop,
            scaleY: scaleYVal,
            duration: 0.38,
            ease: "elastic.out(1, 0.4)"
          });
          gsap.to(navIndicatorPill, { autoAlpha: 1, duration: 0.15 });
        }
      } else {
        navIndicator.style.transform = `translate(${targetLeft}px, ${targetTop}px) scale(${scaleXVal}, ${scaleYVal})`;
        if (navIndicatorPill) navIndicatorPill.style.opacity = '1';
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
        if (window.gsap) {
          gsap.to(navIndicatorPill, { autoAlpha: 0, duration: 0.25, ease: "power1.out" });
        } else {
          if (navIndicatorPill) navIndicatorPill.style.opacity = '0';
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
    // If a hash exists on load, force that link to be active
    if (window.location.hash) {
      const correspondingLink = getNavLinkByHref(window.location.hash);
      if (correspondingLink) {
        navLinkItems.forEach(link => link.classList.remove('active'));
        correspondingLink.classList.add('active');
      }
    }
    
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

  // 5. Science Section Orbital Nodes Circular Orbits with Hover Pausing
  if (window.gsap) {
    const scienceVisual = document.querySelector('.science-visual');
    const ring = document.querySelector('.science-ring');
    const nodes = document.querySelectorAll('.science-ring-node');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (ring) {
      // Disable static CSS rotation to let GSAP control it smoothly
      ring.style.animation = 'none';
    }
    
    if (!prefersReduced && nodes.length) {
      // Center the nodes in the middle of the ring
      gsap.set(nodes, {
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        position: 'absolute',
        autoAlpha: 1
      });
      
      // Node details
      let speedObj = { value: 1.0 }; // Speed multiplier that can be tweened
      let angleOffset = 0;
      const radiusX = 190; // Half of 380px ring width
      const radiusY = 190; // Circular orbit matching the dashed ring
      
      // Stagger node pulse scales to look organic and active
      nodes.forEach((node, index) => {
        gsap.to(node, {
          scale: 1.15,
          boxShadow: '0 0 12px rgba(var(--theme-primary-rgb), 0.45)',
          duration: 2.2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
      
      // Update coordinates in the ticker for 60fps compositor smoothness
      const tickHandler = (time, deltaTime) => {
        const dt = (deltaTime / 1000) || 0.0166;
        // 0.2 radians/sec gives a peaceful ~31s full rotation at normal speed
        const deltaSpeed = 0.2 * speedObj.value * dt;
        angleOffset += deltaSpeed;
        
        // Rotate the dashed ring slowly
        if (ring) {
          gsap.set(ring, { rotation: (angleOffset * 180) / Math.PI * 0.15 });
        }
        
        // Move each node around the circular path
        nodes.forEach((node, index) => {
          // Spread 4 nodes evenly: 0, 90, 180, 270 degrees
          const baseAngle = (index * Math.PI) / 2;
          const angle = baseAngle + angleOffset;
          
          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY;
          
          gsap.set(node, { x: x, y: y });
        });
      };
      
      gsap.ticker.add(tickHandler);
      
      // Hover listeners to slow down the orbit smoothly
      if (scienceVisual) {
        scienceVisual.addEventListener('mouseenter', () => {
          gsap.to(speedObj, {
            value: 0.15, // Slow down to an elegant crawl
            duration: 1.8,
            ease: "power2.out"
          });
          if (ring) {
            gsap.to(ring, { scale: 1.03, duration: 0.8, ease: "power2.out" });
          }
        });
        
        scienceVisual.addEventListener('mouseleave', () => {
          gsap.to(speedObj, {
            value: 1.0, // Accelerate back to normal speed
            duration: 1.5,
            ease: "power2.out"
          });
          if (ring) {
            gsap.to(ring, { scale: 1.0, duration: 0.8, ease: "power2.out" });
          }
        });
      }
    } else {
      // Fallback for reduced motion: standard static placement or basic animation
      if (ring) {
        ring.style.animation = 'rotateRing 40s linear infinite';
      }
    }
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
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReduced) {
      bentoCards.forEach(card => {
        card.style.transformStyle = "preserve-3d";
        card.style.perspective = "1000px";
        
        // Define quickTo tweeners for butter-smooth animation
        const rotateXTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power2.out" });
        const rotateYTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power2.out" });
        const scaleTo = gsap.quickTo(card, "scale", { duration: 0.4, ease: "power2.out" });
        
        // Spotlight gradient position tweeners using custom CSS variables
        const mouseXTo = gsap.quickTo(card, "--mouse-x", { duration: 0.3, ease: "power1.out" });
        const mouseYTo = gsap.quickTo(card, "--mouse-y", { duration: 0.3, ease: "power1.out" });
        
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const xc = rect.width / 2;
          const yc = rect.height / 2;
          
          // Max 8 degrees of rotation for subtle premium tilt
          const rotateY = ((x - xc) / xc) * 8;
          const rotateX = ((yc - y) / yc) * 8;
          
          rotateYTo(rotateY);
          rotateXTo(rotateX);
          scaleTo(1.03); // Slightly scale up for premium hover depth
          
          // Animate CSS variables for spotlight center in pixels
          mouseXTo(`${x}px`);
          mouseYTo(`${y}px`);
        });
        
        card.addEventListener('mouseleave', () => {
          rotateXTo(0);
          rotateYTo(0);
          scaleTo(1);
          mouseXTo("50%");
          mouseYTo("50%");
        });
      });
    }
  }

  // ==========================================================================
  // Testimonials Infinite Seamless Loop (GSAP utils.wrap + Drag)
  // ==========================================================================
  const track = document.querySelector('.reviews-track');
  if (track) {
    const cards = gsap.utils.toArray('.review-card');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (cards.length && !prefersReduced) {
      // Get gap and card widths dynamically to support fluid layout responsive metrics
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 32;
      const cardWidth = cards[0].offsetWidth || 380;
      const singleWidth = cardWidth + gap;
      const totalWidth = singleWidth * cards.length;
      
      // Clone all cards and append them to create a seamless double-row
      cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
      
      // Auto scroll speed in pixels per second
      let defaultSpeed = 45;
      let speed = defaultSpeed;
      let xOffset = 0;
      let isDragging = false;
      let dragStartX = 0;
      let dragStartOffset = 0;
      
      // Ticker loop: translate the entire track as a unit
      const tickerHandler = (time, deltaTime) => {
        if (isDragging) return;
        
        const dt = (deltaTime / 1000) || 0.0166;
        xOffset -= speed * dt;
        
        // Reset when the first set has scrolled completely off
        if (xOffset <= -totalWidth) {
          xOffset += totalWidth;
        }
        if (xOffset > 0) {
          xOffset -= totalWidth;
        }
        
        gsap.set(track, { x: xOffset });
      };
      
      gsap.ticker.add(tickerHandler);
      
      // Smooth deceleration and acceleration on hover
      const sliderContainer = document.querySelector('.reviews-slider-container');
      if (sliderContainer) {
        let speedTween = null;
        
        sliderContainer.addEventListener('mouseenter', () => {
          if (speedTween) speedTween.kill();
          speedTween = gsap.to({ val: speed }, {
            val: 0, // Slow down to complete stop
            duration: 1.0,
            ease: "power2.out",
            onUpdate: function() {
              speed = this.targets()[0].val;
            }
          });
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
          if (speedTween) speedTween.kill();
          speedTween = gsap.to({ val: speed }, {
            val: defaultSpeed, // Speed back up
            duration: 1.0,
            ease: "power2.out",
            onUpdate: function() {
              speed = this.targets()[0].val;
            }
          });
        });
      }
      
      // Drag interactions using GSAP Draggable
      if (window.Draggable) {
        Draggable.create(track, {
          type: "x",
          trigger: ".reviews-slider-container",
          onPress: function() {
            isDragging = true;
            dragStartX = this.x;
            dragStartOffset = xOffset;
          },
          onDrag: function() {
            // Update offset based on drag delta
            xOffset = dragStartOffset + (this.x - dragStartX);
            
            // Keep it wrapped
            if (xOffset <= -totalWidth) xOffset += totalWidth;
            if (xOffset > 0) xOffset -= totalWidth;
            
            gsap.set(track, { x: xOffset });
          },
          onDragEnd: function() {
            isDragging = false;
            // Clear Draggable's own transform (we manage x manually)
            gsap.set(track, { x: xOffset });
            this.update();
            
            // Smooth resume back to auto-scrolling speed
            speed = 0;
            gsap.to({ val: 0 }, {
              val: defaultSpeed,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: function() {
                speed = this.targets()[0].val;
              }
            });
          }
        });
      }
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
          addToCart(variant, data.fullName, 28.00, data.flavor, 'one-time', null, buyBtn);
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
