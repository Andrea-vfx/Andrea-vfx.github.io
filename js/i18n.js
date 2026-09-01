// ============================================================
// Andrea Guerrero Aviña — Portfolio
// Language toggle (English / Español). Elements carry
// data-i18n="key"; the English markup already baked into the HTML
// is captured live on first run (never duplicated by hand here) and
// Spanish comes from the ES dictionary below. Preference persists
// across every page via localStorage.
//
// data-i18n-attr="attrName:key" translates an attribute instead of
// the element's content (e.g. aria-label). Multiple attrs on the
// same element: "aria-label:key1|title:key2".
// ============================================================

(() => {
  'use strict';

  const STORAGE_KEY = 'ag-portfolio-lang';

  /* ---------------------------------------------------------
     Shared across every page: nav crumb/dropdown labels, the
     "Portfolio Menu" control, back-to-top, the language button
     itself, and other repeated small UI strings.
  --------------------------------------------------------- */
  const shared = {
    'shared.nav.about': 'CV · Sobre mí',
    'shared.nav.work': 'Trabajo',
    'shared.nav.contact': 'Contacto',
    'shared.dropdown.vfx': 'VFX, Compositing e Iluminación',
    'shared.dropdown.motion': 'Edición de Video y Motion Graphics',
    'shared.dropdown.illustration': 'Ilustración',
    'shared.dropdown.design': 'Diseño y UX/UI',
    'shared.crumb.portfolio': 'Portafolio',
    'shared.crumb.vfx': 'VFX, Compositing e Iluminación',
    'shared.crumb.motion': 'Motion y Edición',
    'shared.crumb.illustration': 'Ilustración',
    'shared.crumb.design': 'Diseño y UX/UI',
    'shared.menuLabel': 'Menú del portafolio',
    'shared.menuAria': 'Abrir navegación',
    'shared.backToTopAria': 'Volver arriba',
    'shared.availPill': 'Disponible para trabajar',
    'shared.langToggleAriaToEs': 'Cambiar el portafolio a español',
    'shared.langToggleAriaToEn': 'Switch the portfolio to English',

    'shared.drawer.navigate': 'Navegar',
    'shared.drawer.portfolioHome': 'Inicio del Portafolio',
    'shared.drawer.closeAria': 'Cerrar navegación',

    'shared.footerNav.backToPortfolio': 'Volver al Portafolio',
    'shared.footerNav.nextSection': 'Siguiente sección',

    'shared.also.title': 'Más de mi trabajo',
    'shared.also.youMayAlsoLike': 'También te puede interesar',
    'shared.section.01': 'Sección 01',
    'shared.section.02': 'Sección 02',
    'shared.section.03': 'Sección 03',
    'shared.section.04': 'Sección 04',
    'shared.section.05': 'Sección 05',

    'shared.credit.artist': 'Artista',
    'shared.credit.specialty': 'Especialidad',
    'shared.credit.studios': 'Estudios',
    'shared.chip.acesPipeline': 'Pipeline ACES',
    'shared.letsWork': '¡Trabajemos juntos!',
    'shared.contactMe': '↓ Contáctame',
    'shared.viewOnVimeo': 'Ver en Vimeo ↗',
    'shared.fromReel': 'Del reel',
    'shared.credits': 'Créditos',
  };

  /* ---------------------------------------------------------
     HOMEPAGE
  --------------------------------------------------------- */
  const home = {
    'home.title': 'Andrea Guerrero Aviña — Portafolio',
    'home.meta.description': 'Artista de Compositing e Iluminación — Portafolio de VFX, 3D, Motion, Ilustración y UX/UI.',

    'home.about.eyebrow': 'Sobre mí',
    'home.about.downloadCv': 'Descargar CV',

    'home.ticker.vfx': 'VFX Compositing ✦',
    'home.ticker.lookdev': '3D Lookdev ✦',
    'home.ticker.motion': 'Motion Graphics ✦',
    'home.ticker.illustration': 'Ilustración ✦',
    'home.ticker.filmTv': 'Cine y TV ✦',
    'home.ticker.software': 'Nuke · After Effects ✦',
    'home.ticker.cusma': 'Elegible para el T-MEC ✦',

    'home.col.about': 'Sobre mí',
    'home.about.bio': 'Artista con experiencia en Cine y TV, con dominio sólido de los principios fundamentales de la cinematografía. Trabajo para ubicar cada elemento visual con intención, logrando escenas y composiciones que capturan la mirada y las emociones de quien las ve.',
    'home.about.bioStar': '✦ ...como estrellas en el espacio. ✦',

    'home.col.skills': 'Habilidades',
    'home.skills.comp.cat': 'Compositing y VFX',
    'home.skills.3d.cat': '3D e Iluminación',
    'home.skills.motion.cat': 'Motion y Edición',
    'home.skills.design.cat': 'Diseño y Herramientas',
    'home.skills.design.tools': 'Figma · Illustrator · UX/UI',
    'home.skills.pipeline.cat': 'Pipeline y Desarrollo',
    'home.skills.pipeline.tools': 'Ftrack · ShotGrid · Python · Slack',

    'home.col.experience': 'Experiencia',
    'home.exp1.role': 'Artista de Compositing VFX ·',
    'home.exp1.date': 'FEB 2026–PRESENTE',
    'home.exp1.company': 'Taller Chucho, Guillermo del Toro',
    'home.exp1.desc': 'Eliminación de rigs, tracking 2D/3D y matte painting para "Muñstro" (2027); el pipeline del equipo corre en After Effects. Colaboré como voluntaria mentoreando al equipo en los fundamentos de Nuke y los principios base de compositing.',
    'home.exp1.chip.mentoring': 'Mentoría',

    'home.exp2.role': 'Artista de Compositing VFX',
    'home.exp2.date': 'OCT 2022–MAR 2025',
    'home.exp2.company': 'Welab Animation &amp; Post-Production',
    'home.exp2.desc': 'Desarrollé el look del amanecer para "La Guadalupana" (cortometraje en stop motion, 2024) junto con el departamento de arte, desde el concept art hasta los fondos. Tipline Mysteries (Hallmark, 2024): compositing de CG desde Unreal en Nuke. Pipeline ACES, gizmos en Python.',
    'home.exp2.chip.aces': 'Pipeline ACES',

    'home.exp3.role': 'Compositing · 3D · Ilustración',
    'home.exp3.date': '2020–PRESENTE',
    'home.exp3.desc': '"Teatro Secreto" (Taller Chucho): limpieza de sombras y mejora de luces en Nuke (Inpaint); selección oficial en Annecy 2024. Lookdev 3D para FEBRA. Streampack e ilustración para @DRE_ow.',
    'home.exp3.chip.illustration': 'Ilustración',

    'home.exp4.role': 'Gerente de Contenido y Proyectos',
    'home.exp4.date': 'ENE 2021–FEB 2022',
    'home.exp4.desc': 'Gestión de contenido para @PrepatecGDL y @BorregosGDL. Edición de video y motion graphics para IG, TikTok y YouTube.',
    'home.exp4.chip.social': 'Redes Sociales',

    'home.col.education': 'Educación',
    'home.edu1.title': 'Licenciatura en Animación y Arte Digital',
    'home.edu1.subtitle': 'Desarrollo Visual y Compositing VFX',
    'home.edu2.title': 'Taller de Efectos Visuales',

    'home.col.languages': 'Idiomas',
    'home.lang.es': 'Español',
    'home.lang.esLevel': 'Nativo',
    'home.lang.en': 'Inglés',
    'home.lang.enLevel': 'B2, Cambridge',
    'home.lang.fr': 'Francés',

    'home.cusma.title': 'Elegible para el T-MEC / USMCA',
    'home.cusma.desc': 'Disponible para trabajo remoto y reubicación',

    'home.work.eyebrow': 'Categoría',
    'home.work.title': 'Trabajo',
    'home.card1.tag.comp': '2D/3D Comp',
    'home.card1.tag.shots': '50+ tomas',
    'home.card1.title': 'VFX, Compositing e Iluminación<br>3D y Lookdev',
    'home.card2.tag.shots': '50+ tomas',
    'home.card2.tag.cgcomp': 'Comp CG',
    'home.card2.title': 'Edición de Video y Motion Graphics',
    'home.card3.tag.shots': '50+ tomas',
    'home.card3.tag.cgcomp': 'Comp CG',
    'home.card3.title': 'Ilustración<br>Desarrollo Visual',
    'home.card4.tag.shots': '50+ tomas',
    'home.card4.tag.cgcomp': 'Comp CG',
    'home.card4.title': 'Diseño<br>y UX/UI',

    'home.social.findMe': 'Encuéntrame en',
    'home.footer.title': '¡Creemos<br>ARTE juntos!',
    'home.contact.email': 'Correo',
    'home.contact.portfolio': 'Portafolio',
  };

  /* ---------------------------------------------------------
     VFX & COMPOSITING PAGE
  --------------------------------------------------------- */
  const vfx = {
    'vfx.title': 'VFX, Compositing e Iluminación · Andrea Guerrero Aviña',
    'vfx.meta.description': 'Reel de compositing, iluminación y lookdev 3D. Nuke, pipeline ACES, Maya y Arnold.',

    'vfx.reel1.eyebrow': 'Reel 2026 · Cine y TV',
    'vfx.reel1.title': 'VFX y<br>Compositing',
    'vfx.reel1.stat1': 'tomas compuestas',
    'vfx.reel1.stat2': 'producciones de estudio',
    'vfx.reel1.stat3': 'años de experiencia',
    'vfx.info1.desc': 'Un reel de compositing que abarca producciones de acción en vivo, stop motion y CG. Desde construir el lookdev del amanecer en La Guadalupana hasta integrar CG de Unreal Engine en un especial de Hallmark, cada toma está hecha con intención, precisión técnica y el conocimiento de pipeline que la respalda.',
    'vfx.chip.3dLighting': 'Iluminación 3D',
    'vfx.chip.2d3dTracking': 'Tracking 2D/3D',
    'vfx.chip.colorGrading': 'Corrección de Color',
    'vfx.chip.rigCleaning': 'Limpieza de Rigs',
    'vfx.chip.stopMotionComp': 'Compositing Stop Motion',
    'vfx.chip.pythonScripting': 'Scripting en Python',
    'vfx.chip.lookDevelopment': 'Desarrollo de Look',
    'vfx.credit1.specialty.value': 'Compositing e Iluminación · Integración CG · Python',

    'vfx.reel2.eyebrow': 'Reel 2026 · 3D y Lookdev',
    'vfx.reel2.title': 'Iluminación &amp; 3D',
    'vfx.reel2.stat1a': 'Aditivo',
    'vfx.reel2.stat1b': 'método de compositing',
    'vfx.reel2.stat2b': 'passes y AOVs',
    'vfx.info2.desc': 'Un reel de iluminación y lookdev que abarca producciones en stop motion, animación 3D y CG. Desde construir el lenguaje visual de una escena exterior Día/Noche en Camper hasta la fibra óptica de FEBRA, pasando por VFX y previs, todo hecho con una base sólida en cinematografía y luz.',
    'vfx.chip.2d3dIntegration': 'Integración 2D y 3D',
    'vfx.credit2.specialty.value': 'Iluminación · Lookdev · Previs · Modelado 3D',

    'vfx.poster.eyebrow': 'Créditos',
    'vfx.poster.title': 'Producciones en las que he trabajado',
    'vfx.poster1.meta': 'Artista de Compositing · 2024',
    'vfx.poster2.meta': 'Compositor CG · 2024',
    'vfx.poster3.meta': 'Limpieza · Mejora de Luces · 2024',
    'vfx.poster4.meta': 'Artista de Compositing · 2027',
    'vfx.poster5.meta': 'Desarrollo Visual · 2025',
    'vfx.poster9.meta': 'Limpieza y Compositing',
    'vfx.poster9.studio': 'Cortometraje Independiente',
    'vfx.posterMore': 'Más<br>próximamente',

    'vfx.also1.tags': 'Concept Art · Desarrollo Visual · Photoshop',
    'vfx.also2.tags': 'Reel de Iluminación · Lookdev · Maya · Arnold',
    'vfx.also2.sub': 'Lookdev Día/Noche · CG · Método aditivo',

    'vfx.footerNav.viewFullReel': 'Ver reel completo en Vimeo ↗',
    'vfx.drawer.compositingReel': 'Reel de Compositing',
    'vfx.drawer.lightingReel': 'Reel de Iluminación',
  };

  /* ---------------------------------------------------------
     MOTION / VIDEO EDITING PAGE
  --------------------------------------------------------- */
  const motion = {
    'motion.title': 'Edición de Video y Motion Graphics · Andrea Guerrero Aviña',
    'motion.meta.description': 'Ediciones verticales cortas y video de marca de formato largo. Premiere Pro, After Effects, CapCut.',

    'motion.titleBand.heading': 'Edición de Video y Motion',
    'motion.label01': '01 · Formato corto · Vertical 9:16',
    'motion.video.desc': 'Contenido de moda diseñado para detener el scroll. Transiciones de vestuario sincronizadas con el ritmo de la música, con etalonaje cálido y editorial.',
    'motion.chip.transitions': 'Transiciones',

    'motion.label02': '02 · Formato largo · Horizontal 16:9',
    'motion.campaign.title': 'Campaña de Video',
    'motion.campaign.subtitle': 'Video de marca, campaña, educativo',
    'motion.campaign.desc': 'Edición de video para la campaña de Jalisco de Segunda Oportunidad: contenido educativo para redes sociales que destaca a las mujeres emprendedoras que apoya el programa.',
    'motion.campaign.cta': "Ver el rebranding de Marina ↗",

    'motion.pomo.subtitle': 'Campaña Publicitaria · Video de Marca · Motion Graphics',
    'motion.pomo.desc': 'Campaña publicitaria de delivery desarrollada de principio a fin, desde el concepto hasta la exportación final. Etalonaje cálido pensado para abrir el apetito, con motion graphics cinético sincronizado al ritmo de la música. Diseñada para redes sociales en formato 9:16 y 16:9.',
    'motion.chip.brandingVideo': 'Video de Marca',
    'motion.chip.maskot': 'Mascota',
    'motion.software': 'Software',
    'motion.caption.maskot': 'Mascota "pomo dog"',
    'motion.caption.transitionElements': 'Elementos de transición',
    'motion.caption.cleanupProcess': 'Proceso de limpieza',

    'motion.mg.label': '03 · Motion',
    'motion.mg.badge': 'Reproduciendo automáticamente',

    'motion.also1.title': 'VFX y Compositing',
    'motion.also1.tags': 'Reel de compositing · Cine y TV · Nuke',

    'motion.footerNav.nextIllustration': 'Ilustración →',
    'motion.drawer.videoCampaign': 'Campaña de Video',
  };

  /* ---------------------------------------------------------
     ILLUSTRATION PAGE
  --------------------------------------------------------- */
  const illustration = {
    'illustration.title': 'Ilustración · Andrea Guerrero Aviña',
    'illustration.meta.description': 'Diseño de personajes, exploración de fondos y concept art para animación y videojuegos.',

    'illustration.intro.eyebrow': 'Hola, soy Andrea',
    'illustration.intro.heading': 'Donde todo comienza...',
    'illustration.intro.body': 'Soy artista de VFX que también construye mundos a través de la ilustración: diseño de personajes, exploración de fondos y concept art para animación y videojuegos, junto con piezas narrativas personales. Coloco cada elemento con la intención de atrapar la mirada de quien lo ve, como estrellas en el cielo.',

    'illustration.featured.title': 'Proyectos Destacados',
    'illustration.featured.sub': '9 proyectos · Concept art, ilustración y desarrollo visual',
    'illustration.featured.cta': 'Ver proyecto completo en ArtStation ↗',
    'illustration.clickGallery': 'Haz clic para ver la galería →',
    'illustration.moreArtstation': 'Más en ArtStation',
    'illustration.fullProfile': 'Perfil completo con todos los proyectos ↗',

    'illustration.proj1.eyebrow': '01 · Proyecto Destacado',
    'illustration.proj1.title': 'Desarrollo de Personaje e Ilustración de Props: LUMA',
    'illustration.proj1.cat': 'Diseño de Personajes · Props de Entorno · Colaboración de Estudio',
    'illustration.proj1.desc': 'Desarrollé el giro de 360° del personaje y las hojas de expresiones, estableciendo proporciones consistentes y considerando cómo el diseño se traduciría al estilo y modelo de animación. Diseñé props de entorno y fondo que apoyaban la historia y comunicaban la perspectiva del personaje.',

    'illustration.proj2.eyebrow': '02 · Proyecto Destacado',
    'illustration.proj2.title': 'Iluminación y Compositing LookDev Día/Noche',
    'illustration.proj2.cat': 'Iluminación 3D · Lookdev · Compositing',
    'illustration.proj2.desc': 'Exploración de iluminación y lookdev 3D para una escena de camper día/noche, construyendo la atmósfera a través de texturizado, iluminación y configuración de render multipasada.',

    'illustration.proj3.eyebrow': '03 · Proyecto Destacado',
    'illustration.proj3.cat': 'Ilustración Narrativa · Concept Art',
    'illustration.proj3.desc': 'Un dios solitario espera en la entrada de su templo, rodeado del silencio de quienes nunca lograron llegar. Cuando un camello solitario llega sin su jinete, en lugar de ver otra alma perdida, recibe al animal con ternura.',

    'illustration.proj4.eyebrow': '04 · Proyecto Destacado',
    'illustration.proj4.title': 'Charlie the Wonder Dog: Fan Art de Stickers',
    'illustration.proj4.cat': 'Fan Art · Ilustración de Personajes · Stickers',
    'illustration.proj4.desc': 'Stickers de fan art para Charlie the Wonder Dog. Los bocetos conceptuales exploraron una dirección más estilizada y realista, manteniéndose cerca del estilo visual de la película.',

    'illustration.proj5.eyebrow': '05 · Proyecto Destacado',
    'illustration.proj5.title': 'Exploración de Fondos y Desarrollo Visual: "GLOOM-IES"',
    'illustration.proj5.cat': 'Diseño de Fondos · Desarrollo Visual · Cortometraje',
    'illustration.proj5.desc': 'Exploración de fondos y desarrollo visual para un cortometraje animado: definí la habitación, el espacio de trabajo y la entrada del protagonista, además de apoyo en limpieza de animación y compositing en varias tomas.',

    'illustration.proj6.eyebrow': '06 · Proyecto Destacado',
    'illustration.proj6.title': 'Streampack para @DRE_ow',
    'illustration.proj6.cat': 'Branding · Ilustración · Estilo Valorant · Freelance 2024',
    'illustration.proj6.desc': 'Ilustración estilo Valorant para @DRE_ow, junto con StreamPack y diseño de logo inspirados en el agente principal del cliente dentro del juego, Sova.',

    'illustration.proj7.eyebrow': '07 · Proyecto Destacado',
    'illustration.proj7.title': 'Libro Infantil AVIQ',
    'illustration.proj7.cat': 'Libro Infantil · Layout · Storyboard',
    'illustration.proj7.desc': 'Layouts de página y bocetos de composición en blanco y negro para un libro infantil, definiendo la estructura visual y el flujo de cada doble página, además de limpieza y renderizado a color en páginas seleccionadas.',

    'illustration.proj8.eyebrow': '08 · Proyecto Destacado',
    'illustration.proj8.title': 'Ryan Gosling: DRIVE',
    'illustration.proj8.cat': 'Estudio Personal · Práctica de Color',
    'illustration.proj8.desc': 'Pieza de práctica de color sobre Ryan Gosling en Drive, subida en memoria de Kavinsky.',

    'illustration.proj9.eyebrow': '09 · Proyecto Destacado',
    'illustration.proj9.title': 'Exploraciones de Personajes Steampunk',
    'illustration.proj9.cat': 'Diseño de Personajes · Concept Art para Videojuego',
    'illustration.proj9.desc': 'Desarrollo visual temprano del protagonista y antagonista para un videojuego 3D de ritmo con temática steampunk: siluetas fuertes, personalidades reconocibles y diseños funcionales para el gameplay.',

    'illustration.process.title': 'Proceso y Bocetos',
    'illustration.process.sub': 'Un vistazo detrás de las piezas finales: iteración de layout, estudios de valor y exploración conceptual.',
    'illustration.process.gloomiesProj': '"GLOOM-IES" Cortometraje',
    'illustration.process.gloomiesCap': 'Estudio de valor, antes del color',
    'illustration.process.aviqCap': 'Storyboard completo con notas de revisión',
    'illustration.process.steampunkProj': 'Personaje Steampunk',
    'illustration.process.steampunkCap': 'Exploración de siluetas y estilo',

    'illustration.omega.sub': 'Webcómic · Ilustración · Acción',
    'illustration.omega.cta': 'Ver proyecto completo en Behance ↗',
    'illustration.omega.readCta': 'Leer el webcómic en Webtoons ↗',
    'illustration.omega.lightboxDesc': 'Webcómic de acción — arte de personajes, portada y páginas publicadas. Serie en curso en Webtoons.',

    'illustration.also1.tags': 'After Effects · Cine y TV · Gráficos',

    'illustration.footerNav.viewProfile': 'Ver perfil completo en ArtStation ↗',

    'shared.lightbox.closeAria': 'Cerrar galería',
  };

  /* ---------------------------------------------------------
     DESIGN & UX/UI PAGE
  --------------------------------------------------------- */
  const design = {
    'design.title': 'Diseño y UX/UI · Andrea Guerrero Aviña',
    'design.meta.description': 'Diseño de producto, UI de e-commerce y trabajo de branding. Figma, Shopify, HTML/CSS.',

    'design.brand.title': 'AG. Identidad de Marca Conceptual',
    'design.brand.sub': 'Logo mascota, sistema de color y aplicaciones, diseñados para mi propia identidad de marca.',

    'design.rebrand.title': 'Rebranding con causa social',
    'design.rebrand.sub': 'Trabajo de rebranding para pequeños negocios liderados por mujeres, parte de un programa de servicio social que apoya el emprendimiento en la organización Segunda Oportunidad.',

    'design.ui.meta': '3 proyectos · Diseño de producto · E-commerce · B2B',
    'design.ui.lead': 'Cada proyecto enlaza a su página en vivo.',
    'design.viewProject': 'Ver proyecto ↗',
    'design.viewFigma': 'Ver en Figma ⤢',
    'design.viewLive': 'Ver proyecto en vivo ↗',

    'design.bys.cat': 'Caso de Estudio · E-commerce',
    'design.bys.desc': 'Rediseño de la página de producto de Kiss Drip Lip Oil, con una dirección visual suave y femenina.',
    'design.bys.tag.productPage': 'Página de Producto',
    'design.bys.lightboxDesc': 'Rediseño de la página de producto de Kiss Drip Lip Oil, con una dirección visual suave y femenina, jerarquía optimizada para conversión y un caso de estudio completamente documentado.',
    'design.bys.lightboxTags': 'Página de Producto · E-commerce',

    'design.sonnet.cat': 'Producto · Página de Colección · Skincare',
    'design.sonnet.title': 'Sonnet — Bare Earth',
    'design.sonnet.desc': 'Página de producto y landing para una línea de skincare (escritorio y móvil), con un sistema de diseño documentado.',
    'design.sonnet.tag.designSystem': 'Sistema de Diseño',
    'design.sonnet.tag.skincare': 'Cuidado de la Piel',
    'design.sonnet.lightboxDesc': 'Página de producto y colección para una línea de skincare (escritorio y móvil), con un sistema de diseño documentado. Incluye como extra el diseño de una campaña de email en Klaviyo.',
    'design.sonnet.lightboxTags': 'Sistema de Diseño · Cuidado de la Piel',
    'design.sonnet.viewReflection': 'Nota de reflexión',
    'design.sonnet.viewKlaviyo': 'Ver campaña de email (Klaviyo)',

    'design.lazarus.cat': 'Catálogo · Fibra Óptica · B2B',
    'design.lazarus.desc': 'Catálogo de producto para un cliente real (distribuidor de fibra óptica), con lista de cotización acumulable.',
    'design.lazarus.tag.realClient': 'Cliente Real',
    'design.lazarus.lightboxDesc': 'Catálogo de producto para un distribuidor de fibra óptica, un proyecto con cliente real. Incluye lista de cotización acumulable, sistema de diseño documentado y catálogo descargable en PDF.',
    'design.lazarus.lightboxTags': 'Cliente Real · B2B',
    'design.lazarus.viewDesignSystem': 'Sistema de diseño',
    'design.lazarus.viewPdf': 'Catálogo (PDF)',

    'design.streampack.lightboxDesc': 'Ilustración estilo Valorant para @DRE_ow, junto con StreamPack y diseño de logo inspirados en el agente principal del cliente dentro del juego, Sova. Set completo de entregables: marca, paneles, pantallas y overlays animados.',

    'design.footerNav.fullPortfolio': 'Portafolio completo',
    'design.drawer.brandIdentity': 'AG. Identidad de Marca',
    'design.drawer.rebranding': 'Rebranding con Causa Social',
  };

  const translations = Object.assign({}, shared, home, vfx, motion, illustration, design);

  /* ---------------------------------------------------------
     APPLY
  --------------------------------------------------------- */
  function safeGet() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function safeSet(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* ignore */ }
  }

  function currentLang() {
    return safeGet() === 'es' ? 'es' : 'en';
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      if (el.dataset.i18nOrig === undefined) el.dataset.i18nOrig = el.innerHTML;
      const key = el.dataset.i18n;
      el.innerHTML = (lang === 'es' && translations[key] !== undefined)
        ? translations[key]
        : el.dataset.i18nOrig;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split('|').forEach((pair) => {
        const [attr, key] = pair.split(':');
        if (!attr || !key) return;
        // dataset keys can't contain a raw hyphen (e.g. "aria-label"),
        // so the original value is tracked via a plain data-* attribute
        // instead of the dataset property shortcut used above.
        const origAttr = `data-i18n-orig-${attr}`;
        if (!el.hasAttribute(origAttr)) el.setAttribute(origAttr, el.getAttribute(attr) || '');
        el.setAttribute(attr, (lang === 'es' && translations[key] !== undefined)
          ? translations[key]
          : el.getAttribute(origAttr));
      });
    });

    const btn = document.querySelector('.lang-toggle');
    if (btn) {
      btn.textContent = lang === 'en' ? 'ES' : 'EN';
      btn.setAttribute('aria-label', translations[
        lang === 'en' ? 'shared.langToggleAriaToEs' : 'shared.langToggleAriaToEn'
      ]);
    }
  }

  function toggleLang() {
    const next = currentLang() === 'en' ? 'es' : 'en';
    safeSet(next);
    applyLang(next);
  }

  function init() {
    applyLang(currentLang());
    document.querySelector('.lang-toggle')?.addEventListener('click', toggleLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
