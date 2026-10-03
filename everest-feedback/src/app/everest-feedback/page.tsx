import type { Metadata } from "next";
import FeedbackAccessGate from "@/components/FeedbackAccessGate";

export const metadata: Metadata = {
  title: "Private Client Feedback | Everest Air Conditioning Company",
  description: "Private client review drafting tool for genuine Everest HVAC customers.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function EverestFeedbackRoute() {
  return <FeedbackAccessGate currentPath="/everest-feedback" />;
}

