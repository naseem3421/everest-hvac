export type ReviewStyle =
  | "short-professional"
  | "natural-conversational"
  | "detailed"
  | "technical"
  | "simple";

export interface FeedbackFormData {
  // Step 1: Service / Project Type (allows one or multiple selections)
  services: string[];
  otherServiceText?: string;

  // Step 2: Project Context (optional fields)
  facilityType?: string;
  otherFacilityText?: string;
  location?: string;
  projectCapacity?: string;
  yearOfService?: string;

  // Step 3: Experience (multiple selections)
  appreciatedAspects: string[];
  otherAspectText?: string;

  // Step 4: Customer's Own Words
  customerWords: string;

  // Step 5: Review Style & Rating
  reviewStyle: ReviewStyle;
  rating: number;

  // Step 6: Consent (mandatory checkbox before generation)
  consentGiven: boolean;
}

export interface GeneratedReviewOption {
  id: string;
  title: string;
  subtitle: string;
  style: ReviewStyle;
  content: string;
  characterCount: number;
}
