import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  ClipboardCheck,
  Factory,
  GraduationCap,
  HardHat,
  LineChart,
  ShieldCheck,
  Users
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/quienes-somos", label: "Quienes Somos" },
  { href: "/cursos", label: "Cursos" },
  { href: "/contenido-gratuito", label: "Contenido Gratuito" },
  { href: "/empresas", label: "Empresas" },
  { href: "/contacto", label: "Contacto" }
];

export const trainingAreas = [
  {
    title: "Mineria e Industria",
    description: "Programas tecnicos para operaciones, seguridad, mantenimiento y mejora continua.",
    icon: HardHat
  },
  {
    title: "Liderazgo Operacional",
    description: "Competencias para jefaturas, supervisores y equipos de alto desempeno.",
    icon: Users
  },
  {
    title: "Gestion del Talento",
    description: "Rutas formativas, evaluacion de brechas y acompanamiento del aprendizaje.",
    icon: BriefcaseBusiness
  },
  {
    title: "Capacitacion Digital",
    description: "Experiencias online, clases en vivo y contenido on demand para equipos distribuidos.",
    icon: GraduationCap
  }
];

export const benefits = [
  "Diseno instruccional orientado a resultados medibles.",
  "Modalidades flexibles para trabajadores, supervisores y equipos corporativos.",
  "Enfoque practico para mineria, industria, liderazgo y seguridad.",
  "Base tecnologica preparada para login, cursos, certificados y reporteria."
];

export const courses = [
  {
    title: "Liderazgo Confiable para Supervisores",
    category: "Liderazgo",
    modality: "Clases en vivo",
    duration: "16 horas",
    description: "Herramientas para liderar equipos operativos con comunicacion clara, seguridad y foco en resultados."
  },
  {
    title: "Induccion Tecnica para Operaciones Mineras",
    category: "Mineria",
    modality: "Online",
    duration: "12 horas",
    description: "Fundamentos operacionales, cultura preventiva y criterios tecnicos para incorporacion a faena."
  },
  {
    title: "Gestion de Riesgos y Seguridad Conductual",
    category: "Seguridad",
    modality: "Corporativo",
    duration: "20 horas",
    description: "Programa aplicado para fortalecer conductas seguras, liderazgo visible y control de riesgos criticos."
  },
  {
    title: "Excel y Analitica para Control de Gestion",
    category: "Tecnica",
    modality: "On Demand",
    duration: "10 horas",
    description: "Tableros, indicadores y analisis practico para equipos administrativos y operacionales."
  },
  {
    title: "Comunicacion Efectiva en Terreno",
    category: "Liderazgo",
    modality: "Presencial",
    duration: "8 horas",
    description: "Tecnicas de coordinacion, feedback y reuniones breves para entornos industriales."
  },
  {
    title: "Formacion de Instructores Internos",
    category: "Educacion",
    modality: "Corporativo",
    duration: "24 horas",
    description: "Metodologia para que expertos internos transformen conocimiento tecnico en aprendizaje transferible."
  }
];

export const freeContent = [
  { title: "Capsulas educativas", description: "Microcontenidos para reforzar seguridad, liderazgo y aprendizaje continuo.", icon: BookOpen },
  { title: "Videos", description: "Piezas breves para equipos operativos, jefaturas y areas de talento.", icon: ClipboardCheck },
  { title: "Documentos", description: "Guias, checklists y material descargable para aplicar en terreno.", icon: Award },
  { title: "Webinars", description: "Charlas online con foco en industria, tecnologia y gestion de personas.", icon: LineChart },
  { title: "Blog", description: "Articulos sobre capacitacion corporativa, confiabilidad y desempeno.", icon: Factory }
];

export const dashboardCourses = [
  "Liderazgo Confiable para Supervisores",
  "Gestion de Riesgos y Seguridad Conductual",
  "Excel y Analitica para Control de Gestion"
];

export const trustStats = [
  { value: "+12", label: "areas formativas" },
  { value: "5", label: "modalidades" },
  { value: "24/7", label: "base digital escalable" },
  { value: "B2B", label: "enfoque empresas" }
];
