import { ReviewStyle } from "../types/feedback";

// STEP 1: SERVICE / PROJECT TYPE
export interface ServiceCardOption {
  id: string;
  label: string;
  description: string;
  iconName?: string;
}

export const SERVICE_CARD_OPTIONS: ServiceCardOption[] = [
  {
    id: "hvac-installation",
    label: "HVAC Installation",
    description: "New turnkey commercial air conditioning system installation & commissioning",
  },
  {
    id: "hvac-amc",
    label: "HVAC AMC / Maintenance",
    description: "Comprehensive annual maintenance, preventative servicing & emergency support",
  },
  {
    id: "chiller-project",
    label: "Chiller Project",
    description: "Central air-cooled or water-cooled chiller plants, pumps & hydronic piping",
  },
  {
    id: "vrf-vrv-system",
    label: "VRF / VRV System",
    description: "Variable refrigerant flow multi-zone zoning for offices & commercial facilities",
  },
  {
    id: "commercial-ac",
    label: "Commercial Air Conditioning",
    description: "Packaged units, ducted systems & precision environmental conditioning",
  },
  {
    id: "industrial-hvac",
    label: "Industrial HVAC",
    description: "Heavy-duty factory air washers, process cooling & ventilation systems",
  },
  {
    id: "ducting-ventilation",
    label: "Ducting & Ventilation",
    description: "GI/PI sheet duct fabrication, fresh air intake, kitchen & basement exhaust",
  },
  {
    id: "hvac-retrofitting",
    label: "HVAC Retrofitting",
    description: "Energy efficiency upgrades, compressor overhauls & modern refrigerant retrofits",
  },
  {
    id: "other",
    label: "Other",
    description: "Custom thermal engineering, consulting, or specialized HVAC scope",
  },
];

// STEP 2: PROJECT CONTEXT
export const FACILITY_TYPE_OPTIONS = [
  "Office",
  "Hospital",
  "Hotel",
  "Factory",
  "Commercial Building",
  "Educational Institution",
  "Residential / Villa",
  "Other",
];

export const SERVICE_YEAR_OPTIONS = [
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020 or earlier",
  "Ongoing AMC Relationship",
];

// STEP 3: EXPERIENCE (What aspects of our service did you appreciate?)
export const APPRECIATED_ASPECT_OPTIONS = [
  "Technical expertise",
  "Installation quality",
  "Workmanship",
  "Project execution",
  "Timely completion",
  "Professional team",
  "Communication",
  "Responsiveness",
  "Maintenance support",
  "Problem solving",
  "Coordination",
  "Overall experience",
  "Other",
];

// STEP 5: REVIEW STYLE
export interface ReviewStyleOption {
  id: ReviewStyle;
  label: string;
  tagline: string;
  description: string;
}

export const REVIEW_STYLE_OPTIONS: ReviewStyleOption[] = [
  {
    id: "short-professional",
    label: "Short & Professional",
    tagline: "Concise & executive",
    description: "Direct summary highlighting project scope, reliability, and business satisfaction.",
  },
  {
    id: "natural-conversational",
    label: "Natural & Conversational",
    tagline: "Warm & authentic",
    description: "Friendly, personal narrative focusing on team communication and seamless delivery.",
  },
  {
    id: "detailed",
    label: "Detailed",
    tagline: "Comprehensive overview",
    description: "In-depth review covering project execution, site coordination, and finished results.",
  },
  {
    id: "technical",
    label: "Technical",
    tagline: "Engineering focus",
    description: "Emphasizes equipment performance, installation workmanship, and technical precision.",
  },
  {
    id: "simple",
    label: "Simple",
    tagline: "Clear & quick",
    description: "Straightforward recommendation that is easy to read at a glance.",
  },
];

export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL?.trim() || "";
