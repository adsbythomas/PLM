# Estudio — Sitio institucional

Sitio institucional del estudio **Pantarotto Lértora Bardagí & Asociados**.

> **Nota:** este directorio se sincroniza automáticamente al repo
> [`adsbythomas/Estudio`](https://github.com/adsbythomas/Estudio) mediante
> un GitHub Action en PLM (`.github/workflows/sync-estudio.yml`). Los cambios
> acá disparan el deploy a GitHub Pages del otro repo.

Dos áreas, un mismo estudio:

- **Legal** (home, `/`) — paleta **azul** · derecho empresarial.
- **Contable** (`/contable`) — paleta **terracota / cobre** · contabilidad, auditoría e impuestos.

Cada página tiene acceso directo a la otra desde el nav (botón destacado) y desde una sección de cross‑link al pie.

## Stack

- **Astro 4** (sitio 100 % estático, sin runtime JS pesado)
- **TypeScript** en todo el contenido y props
- **Tailwind CSS** con tokens de marca por área
- **Cormorant Garamond + Inter** (tipografías editoriales)
- Animaciones ligeras con `IntersectionObserver` y `prefers-reduced-motion` friendly
- SEO: meta Open Graph/Twitter, JSON‑LD `LegalService` / `AccountingService`, sitemap automático

## Desarrollo local

Requiere **Node 20+**.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # Genera dist/
npm run preview    # Sirve el build
```

## Estructura

```
estudio/
├── src/
│   ├── lib/
│   │   ├── site.ts         · Datos globales (dirección, horarios, redes)
│   │   ├── legal.ts        · Contenido del área legal (hero, áreas, equipo, timeline, sectores)
│   │   └── accounting.ts   · Contenido del área contable
│   ├── components/
│   │   ├── Nav.astro       · Nav con botón de switch al otro área
│   │   ├── Footer.astro
│   │   ├── Hero.astro      · Hero con cartela lateral y switch al otro área
│   │   ├── About.astro     · "El estudio" + destacados
│   │   ├── Areas.astro     · Grid de prácticas/servicios (6 cards)
│   │   ├── Sectors.astro   · Industrias/clientes atendidos
│   │   ├── Team.astro      · Equipo en grilla
│   │   ├── Timeline.astro  · Línea de tiempo
│   │   ├── CrossLink.astro · Banner de cross-link al otro área
│   │   ├── Contact.astro   · Datos + mapa + formulario
│   │   └── Icon.astro      · Íconos lineales por clave
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro     · /           (área legal)
│   │   └── contable.astro  · /contable   (área contable)
│   └── styles/
│       └── global.css
├── public/
│   ├── robots.txt
│   └── .nojekyll
└── astro.config.mjs        · Setea `base` automáticamente para GitHub Pages
```

## Edición de contenido

Toda la información editorial vive en `src/lib/`:

- **Datos de contacto** → `src/lib/site.ts` (dirección, horarios, LinkedIn, embed del mapa).
- **Contenido del área legal** → `src/lib/legal.ts` (hero, áreas de práctica, equipo, timeline, sectores).
- **Contenido del área contable** → `src/lib/accounting.ts` (mismo formato).

Modificar estos archivos es suficiente: los componentes los consumen sin cambios.

## Paletas

Cada `<html>` recibe una clase (`theme-legal` o `theme-accounting`) que define las variables CSS `--brand-*`. Todos los componentes consumen esas variables, así que podés ajustar el tono en `tailwind.config.mjs`:

- Legal — `colors.legal.*` (azul profundo, 50 → 950)
- Contable — `colors.ledger.*` (terracota / cobre, 50 → 950)

## Deploy

### Opción A · GitHub Pages automático (recomendado)

1. Crear el repo en GitHub (nombre sugerido: **Estudio** bajo `adsbythomas`).
2. Copiar el contenido de esta carpeta a la raíz del repo nuevo (ver "Migrar al repo nuevo" abajo).
3. `git push` a `main`.
4. En el repo, `Settings → Pages → Source: GitHub Actions`.
5. El workflow en `.github/workflows/deploy.yml` compila y publica en cada push a `main`.

La URL pública queda: `https://adsbythomas.github.io/Estudio/`

> El workflow inyecta `BASE_PATH=/<repo-name>` automáticamente, así que todos los links respetan la subruta.

### Opción B · Vercel / Netlify

- Vercel: importar el repo → detecta Astro → deploy automático.
- Variables de entorno: dejar `SITE_URL` con el dominio final y `BASE_PATH=/`.

### Opción C · Dominio propio (pl-abogados.com)

1. Setear `SITE_URL=https://pl-abogados.com` y `BASE_PATH=/` en el build.
2. En `Settings → Pages → Custom domain`: `pl-abogados.com`.
3. Crear el archivo `public/CNAME` con el dominio en una sola línea.
4. Configurar DNS (CNAME apuntando a `adsbythomas.github.io`).

## Migrar al repo nuevo `adsbythomas/Estudio`

Este código vive temporalmente dentro del repo `adsbythomas/PLM` en la carpeta `estudio/` y la rama `claude/new-lawyers-website-fwDhl`.

Para moverlo a un repo nuevo:

```bash
# Desde la raíz de PLM, con la rama claude/new-lawyers-website-fwDhl
cd estudio

# Inicializar como repo independiente
git init
git add -A
git commit -m "feat: sitio inicial de Estudio (legal + contable)"
git branch -M main
git remote add origin git@github.com:adsbythomas/Estudio.git
git push -u origin main
```

Después, en GitHub: `Settings → Pages → Source: GitHub Actions` y el workflow ya incluido hace el resto.

## Formulario de contacto

El formulario actualmente muestra confirmación en cliente (sin backend). Para conectarlo a un servicio real, reemplazar el handler `data-contact` en `src/layouts/BaseLayout.astro` por una llamada a:

- **Formspree** (`https://formspree.io/f/xxx`) — más simple
- **Basin / Web3Forms / Getform** — alternativas
- Endpoint propio (AWS SES, Resend, etc.)

## Accesibilidad

- Skip‑link al contenido principal.
- Contraste WCAG AA en ambas paletas.
- Íconos decorativos con `aria-hidden`.
- Navegación por teclado en nav y formulario.
- `prefers-reduced-motion` respetado por las animaciones `reveal`.

## Licencia

Código privado del estudio. Contenido institucional protegido por derechos de autor.
