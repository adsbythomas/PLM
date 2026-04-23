// Contenido del área contable.
export const accounting = {
  slug: 'contable',
  eyebrow: 'Área Contable',
  hero: {
    titleLine1: 'Contabilidad e impuestos,',
    titleLine2: '20 años de oficio.',
    lead:
      'Área contable del estudio, integrada al equipo legal. Liquidación de impuestos, estados contables, auditoría, planificación fiscal y sueldos — en Argentina y en operaciones internacionales.',
    ctaPrimary: 'Solicitar consulta',
  },
  counters: {
    label: 'En cifras',
    title: 'El área contable en números',
    sub: 'Dos décadas acompañando empresas con números que se sostienen.',
    items: [
      { num: '20', suffix: '+',  label: 'Años de trayectoria',    desc: 'Dos décadas de asesoramiento contable e impositivo a empresas y grupos familiares.', icon: 'clock' },
      { num: '6',  suffix: '',   label: 'Servicios centrales',    desc: 'Impuestos, estados contables, auditoría, planificación, sueldos y contabilidad internacional.', icon: 'book' },
      { num: '3',  suffix: '',   label: 'Jurisdicciones activas', desc: 'Argentina, Estados Unidos y Uruguay, con corresponsales para operaciones transfronterizas.', icon: 'globe' },
      { num: '100',suffix: '%',  label: 'Integración legal',      desc: 'Coordinación permanente con el equipo jurídico — soluciones contables y legales bajo el mismo mandato.', icon: 'link' },
    ],
  },
  practice: {
    label: 'Servicios contables',
    title: 'Servicios',
    sub: 'Cobertura completa de las necesidades contables e impositivas de la empresa.',
    items: [
      { key: 'impuestos',     name: 'Liquidación de Impuestos',  desc: 'Liquidación mensual y anual de IVA, Ganancias, Ingresos Brutos, Bienes Personales, retenciones y percepciones.' },
      { key: 'estados',       name: 'Estados Contables',         desc: 'Preparación de estados contables anuales e intermedios bajo NIIF y normas profesionales argentinas.' },
      { key: 'auditoria',     name: 'Auditoría Contable',        desc: 'Auditoría de estados financieros, revisiones limitadas, procedimientos acordados y due diligence contable.' },
      { key: 'planificacion', name: 'Planificación Impositiva',  desc: 'Estructuración fiscal, análisis de carga tributaria, reorganizaciones empresariales y precios de transferencia.' },
      { key: 'sueldos',       name: 'Liquidación de Sueldos',    desc: 'Liquidación de haberes, cargas sociales, aportes y contribuciones. Presentación de DJ ante AFIP.' },
      { key: 'internacional', name: 'Contabilidad Internacional',desc: 'Asesoramiento para empresas con operaciones en el exterior. Consolidación NIIF y conversión de moneda.' },
    ],
  },
  team: {
    label: 'Equipo contable',
    title: 'Contadores públicos matriculados.',
    sub: 'Cada cliente tiene un contador responsable que conoce la operación en detalle, en coordinación permanente con el área legal.',
    members: [
      { initials: 'CP', name: 'Contador Público', role: 'Responsable del Área',    spec: 'Impuestos · Auditoría · Estados Contables' },
      { initials: 'CP', name: 'Especialista',     role: 'Especialista Impositivo', spec: 'Planificación Fiscal · Precios de Transferencia' },
    ],
    ctaText: 'Equipo completo de contadores y auxiliares especializados por sector — en coordinación permanente con el área legal.',
  },
  timeline: {
    label: 'Trayectoria',
    title: 'Trayectoria',
    items: [
      { year: '2004', title: 'Fundación del estudio', desc: 'Se constituye Pantarotto Lértora Bardagí & Asocs.' },
      { year: '2010', title: 'Red internacional',     desc: 'Apertura de corresponsales contables en Estados Unidos y Uruguay.' },
      { year: '2015', title: 'Servicios aduaneros',   desc: 'Incorporación de liquidación aduanera, reintegros y devolución de IVA.' },
      { year: '2020', title: 'División autónoma',     desc: 'Consolidación del área contable como práctica propia.' },
      { year: '2024', title: '20 años',               desc: 'Dos décadas de asesoramiento impositivo y contable.' },
    ],
  },
  contact: {
    label: 'Contacto',
    title: 'Hablemos de',
    titleAccent: 'su situación',
    desc: 'Nuestro equipo contable le brinda una consulta inicial para evaluar sus necesidades y proponer el servicio más adecuado.',
    formAreas: ['Liquidación de Impuestos', 'Estados Contables', 'Auditoría', 'Planificación Impositiva', 'Sueldos', 'Contabilidad Internacional', 'Otro'],
  },
};
