// ==========================================================================
// Clario - Shared Core Engine (Cart, Toasts, Magnetic Physics)
// ==========================================================================

// Security Helpers
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Global State
let cart = [];

// DOM References (initialized on DOMContentLoaded)
let openCartBtn, closeCartBtn, cartBackdrop, cartDrawer;
let cartItemsList, cartEmptyState, cartTotalPrice, cartBadgeCount;

// Variant specific image mapping for Cart
const variantImages = {
  'focus': 'referencias/WhatsApp Image 2026-05-19 at 2.27.50 PM (2).jpeg',
  'calm': 'referencias/WhatsApp Image 2026-05-19 at 2.27.50 PM.jpeg',
  'energy': 'referencias/WhatsApp Image 2026-05-19 at 2.27.50 PM (1).jpeg'
};

// Map variant names to human readable flavors
const variantFlavors = {
  'focus': 'Manzana Verde',
  'calm': 'Mora',
  'energy': 'Naranja Citrus'
};

// ==========================================================================
// LocalStorage Sync
// ==========================================================================
function loadCart() {
  const savedCart = localStorage.getItem('clario_cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }
}

function saveCart() {
  localStorage.setItem('clario_cart', JSON.stringify(cart));
}

// ==========================================================================
// Toast Notification System
// ==========================================================================
function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast-notification glass-panel';
  toast.innerHTML = `
    <span class="toast-message">${escapeHTML(message)}</span>
    <button class="toast-close" aria-label="Close notification">&times;</button>
  `;
  
  toast.querySelector('.toast-close').addEventListener('click', () => {
    if (window.gsap) {
      gsap.to(toast, {
        autoAlpha: 0,
        y: -20,
        duration: 0.3,
        ease: 'power1.in',
        onComplete: () => toast.remove()
      });
    } else {
      toast.remove();
    }
  });
  
  toastContainer.appendChild(toast);
  
  // Trigger animation using GSAP if loaded
  if (window.gsap) {
    gsap.fromTo(toast, {
      autoAlpha: 0,
      y: 20,
      scale: 0.95
    }, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.7)'
    });
  }
  
  // Auto-dismiss after 4 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      if (window.gsap) {
        gsap.to(toast, {
          autoAlpha: 0,
          y: -20,
          duration: 0.35,
          ease: 'power1.in',
          onComplete: () => toast.remove()
        });
      } else {
        toast.remove();
      }
    }
  }, 4000);
}

// ==========================================================================
// Shopping Cart Operations
// ==========================================================================
function openCart() {
  if (cartDrawer && cartBackdrop) {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock scrolling
    
    if (window.gsap) {
      cartDrawer.style.transform = '';
      gsap.fromTo('.cart-item', {
        autoAlpha: 0,
        y: 15
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.25,
        ease: 'power1.out',
        stagger: 0.04,
        delay: 0.1
      });
      gsap.fromTo('.cart-drawer-backdrop', {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        duration: 0.15,
        ease: 'none'
      });
    }
  }
}

function closeCart() {
  if (cartDrawer && cartBackdrop) {
    cartDrawer.classList.remove('open');
    document.body.style.overflow = 'auto'; // Unlock scrolling
    
    if (window.gsap) {
      cartDrawer.style.transform = '';
      gsap.to('.cart-drawer-backdrop', {
        autoAlpha: 0,
        duration: 0.15,
        ease: 'none',
        onComplete: () => {
          cartBackdrop.classList.remove('open');
        }
      });
    } else {
      cartBackdrop.classList.remove('open');
    }
  }
}

// Flying Gummy Particle Animation on Add to Cart
function runAddToCartAnimation(clickedBtn, id) {
  if (!clickedBtn || !window.gsap) {
    openCart();
    return;
  }
  
  const cartBtn = document.getElementById('open-cart-btn');
  if (!cartBtn) {
    openCart();
    return;
  }
  
  // Create flying particle representing a glassy gummy bubble
  const particle = document.createElement('div');
  particle.className = `cart-fly-particle gummy-${id || 'generic'}`;
  
  // Color palette matching current theme variants
  let color = '#7BB684'; // focus green
  if (id === 'calm') {
    color = '#9C82CD'; // calm purple
  } else if (id === 'energy') {
    color = '#FCAE3B'; // energy orange
  }
  
  particle.style.position = 'fixed';
  particle.style.zIndex = '99999';
  particle.style.width = '24px';
  particle.style.height = '24px';
  particle.style.borderRadius = '50%';
  particle.style.background = `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0%, ${color} 70%, rgba(0,0,0,0.3) 100%)`;
  particle.style.boxShadow = `0 4px 15px ${color}80, inset 0 -2px 4px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.6)`;
  particle.style.pointerEvents = 'none';
  particle.style.transform = 'translate(0, 0) scale(1)';
  
  const btnRect = clickedBtn.getBoundingClientRect();
  const cartRect = cartBtn.getBoundingClientRect();
  
  // Center of clicked button
  const startX = btnRect.left + btnRect.width / 2 - 12;
  const startY = btnRect.top + btnRect.height / 2 - 12;
  
  // Center of cart button
  const endX = cartRect.left + cartRect.width / 2 - 12;
  const endY = cartRect.top + cartRect.height / 2 - 12;
  
  particle.style.left = `${startX}px`;
  particle.style.top = `${startY}px`;
  
  document.body.appendChild(particle);
  
  const dx = endX - startX;
  const dy = endY - startY;
  
  const tl = gsap.timeline({
    onComplete: () => {
      particle.remove();
      
      // Impact bounce on the cart bag icon
      gsap.timeline()
        .to(cartBtn, {
          scale: 1.3,
          y: -5,
          duration: 0.12,
          ease: 'power2.out'
        })
        .to(cartBtn, {
          scale: 0.85,
          y: 2,
          duration: 0.08,
          ease: 'power2.inOut'
        })
        .to(cartBtn, {
          scale: 1.05,
          y: -1,
          duration: 0.08,
          ease: 'power2.inOut'
        })
        .to(cartBtn, {
          scale: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
          onComplete: () => {
            openCart();
          }
        });
    }
  });
  
  // Animate X (horizontal)
  tl.to(particle, {
    x: dx,
    duration: 0.75,
    ease: "power2.out"
  }, 0);
  
  // Animate Y (vertical parabolic arc)
  const peakY = Math.min(startY, endY) - 120;
  const timeToPeak = 0.3;
  
  tl.to(particle, {
    y: peakY - startY,
    duration: timeToPeak,
    ease: "power1.out"
  }, 0);
  
  tl.to(particle, {
    y: dy,
    duration: 0.75 - timeToPeak,
    ease: "power2.in"
  }, timeToPeak);
  
  // Scale down and rotate particle during flight
  tl.to(particle, {
    scale: 0.5,
    rotation: 360,
    opacity: 0.8,
    duration: 0.75,
    ease: "power1.inOut"
  }, 0);
}

// Main Add to Cart Logic
function addToCart(id, name, price, flavor, type = 'one-time', frequency = null, clickedBtn = null) {
  // Generate a unique item key based on variant, size/pack, and purchase type
  // This allows having one-time and subscriptions separate in the cart!
  const itemKey = `${id}-${type}-${frequency || 'single'}`;
  const existingItem = cart.find(item => item.itemKey === itemKey);
  
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      itemKey,
      id,
      name,
      price: parseFloat(price),
      flavor: flavor || variantFlavors[id] || 'Mora',
      qty: 1,
      type,
      frequency
    });
  }
  
  saveCart();
  renderCart();
  
  if (clickedBtn && window.gsap) {
    runAddToCartAnimation(clickedBtn, id);
  } else {
    openCart();
  }
}

function updateQuantity(itemKey, change) {
  const item = cart.find(item => item.itemKey === itemKey);
  if (!item) return;
  
  item.qty += change;
  
  if (item.qty <= 0) {
    removeItem(itemKey);
  } else {
    saveCart();
    renderCart();
  }
}

function removeItem(itemKey) {
  cart = cart.filter(item => item.itemKey !== itemKey);
  saveCart();
  renderCart();
}

function renderCart() {
  if (!cartItemsList) return;
  
  cartItemsList.innerHTML = '';
  
  if (cart.length === 0) {
    if (cartEmptyState) cartItemsList.appendChild(cartEmptyState);
    if (cartBadgeCount) cartBadgeCount.textContent = '0';
    if (cartTotalPrice) cartTotalPrice.textContent = '$0.00';
    return;
  }
  
  let subtotal = 0;
  let totalQty = 0;
  
  cart.forEach(item => {
    subtotal += item.price * item.qty;
    totalQty += item.qty;
    
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = `cart-item cart-item-${item.id}`;
    
    // Choose specific pack image or fallback
    const imgUrl = variantImages[item.id] || 'referencias/Generated Image January 21, 2026 - 10_12PM.jpeg';
    const typeLabel = item.type === 'subscription' ? `Suscripción (cada ${item.frequency || '30'} días)` : 'Compra única';
    
    cartItemDiv.innerHTML = `
      <div class="cart-item-img-container">
        <img src="${imgUrl}" alt="${escapeHTML(item.name)}" class="cart-item-img">
      </div>
      <div class="cart-item-info">
        <h4 class="cart-item-name">${escapeHTML(item.name)}</h4>
        <p class="cart-item-details">${escapeHTML(typeLabel)} | Sabor ${escapeHTML(item.flavor)}</p>
        <div class="cart-item-actions">
          <div class="quantity-controller">
            <button class="quantity-btn quantity-dec" data-key="${item.itemKey}" aria-label="Decrease quantity">-</button>
            <span class="quantity-display">${item.qty}</span>
            <button class="quantity-btn quantity-inc" data-key="${item.itemKey}" aria-label="Increase quantity">+</button>
          </div>
          <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
        </div>
      </div>
      <button class="cart-item-remove-btn" data-key="${item.itemKey}" aria-label="Remove item">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
      </button>
    `;
    
    cartItemsList.appendChild(cartItemDiv);
  });
  
  if (cartTotalPrice) cartTotalPrice.textContent = `$${subtotal.toFixed(2)}`;
  if (cartBadgeCount) {
    cartBadgeCount.textContent = totalQty;
    
    if (window.gsap) {
      gsap.fromTo('#cart-badge-count', {
        scale: 1
      }, {
        scale: 1.3,
        duration: 0.15,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
    }
  }
}

function simulateCheckout() {
  if (cart.length === 0) {
    showToast("Tu carrito está vacío. Elige tu estado mental primero.");
    return;
  }
  
  showToast("🎉 ¡Gracias por tu compra! Redirigiendo a pasarela de pago seguro Clario...");
  cart = [];
  saveCart();
  renderCart();
  closeCart();
}

// ==========================================================================
// Global Layout-Read-Free Spring Physics Engine (Magnetic Buttons) - DISABLED
// ==========================================================================
function initMagneticButtons() {
  // Magnetism disabled as requested
}

function cacheDimensions() {
  // No-op
}

function wakeUpLoop() {
  // No-op
}

function updateSprings() {
  // No-op
}

// Set up DOM references and global listeners
document.addEventListener('DOMContentLoaded', () => {
  // Query UI components
  openCartBtn = document.getElementById('open-cart-btn');
  closeCartBtn = document.getElementById('close-cart-btn');
  cartBackdrop = document.getElementById('cart-backdrop');
  cartDrawer = document.getElementById('cart-drawer');
  cartItemsList = document.getElementById('cart-items-list');
  cartEmptyState = document.getElementById('cart-empty-state');
  cartTotalPrice = document.getElementById('cart-total-price');
  cartBadgeCount = document.getElementById('cart-badge-count');
  
  // Set up cart drawer interactions
  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);
  
  // Delegated event listener for cart items (quantity, remove)
  if (cartItemsList) {
    cartItemsList.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (!button) return;
      
      const itemKey = button.getAttribute('data-key');
      if (!itemKey) return;
      
      if (button.classList.contains('quantity-dec')) {
        updateQuantity(itemKey, -1);
      } else if (button.classList.contains('quantity-inc')) {
        updateQuantity(itemKey, 1);
      } else if (button.classList.contains('cart-item-remove-btn') || button.closest('.cart-item-remove-btn')) {
        const key = button.getAttribute('data-key') || button.closest('.cart-item-remove-btn').getAttribute('data-key');
        removeItem(key);
      }
    });
  }
  
  // Programmatic checkout handler
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', simulateCheckout);
  }
  
  // Load and Render Cart
  loadCart();
  renderCart();
  
  // Initialize Magnetic hover effects (no-op)
  initMagneticButtons();
  
  window.addEventListener('resize', cacheDimensions);
  
  // Listen for custom elements that might load dynamically
  setTimeout(initMagneticButtons, 500);
});
