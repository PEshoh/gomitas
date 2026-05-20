# Clario — Gomitas Funcionales

Landing page y PDP para **Clario**, gomitas funcionales con fórmulas nootrópicas, adaptogénicas y de energía limpia.

## Stack

- HTML5 semántico + CSS variables
- GSAP 3.12.5 (ScrollTrigger, Draggable, matchMedia)
- JavaScript vanilla (sin frameworks)
- Docker + Nginx Alpine para producción

## Estructura

```
├── index.html       # Landing page principal
├── product.html     # Product Detail Page (PDP)
├── style.css        # Estilos globales + design tokens
├── product.css      # Estilos específicos del PDP
├── app.js           # Lógica de la landing + GSAP
├── product.js       # Lógica del PDP + variantes
├── shared.js        # Carrito, toasts, utilidades compartidas
├── Dockerfile       # Imagen nginx:alpine lista para producción
└── nginx.conf       # Configuración Nginx con cabeceras de seguridad
```

## Desarrollo local

Abre `index.html` directamente en el navegador o usa Live Server.

## Producción (Docker / Easypanel)

```bash
docker build -t clario-web .
docker run -p 80:80 clario-web
```

En Easypanel, apunta el repo a este repositorio con el `Dockerfile` en la raíz. El contenedor expone el **puerto 80**.
