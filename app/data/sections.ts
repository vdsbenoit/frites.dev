import { testimonials } from "./testimonials"

const SECTIONS = [
  { id: "work", label: "Work", isVisible: true },
  { id: "clients", label: "Clients", isVisible: testimonials.length > 0 },
  { id: "about", label: "About", isVisible: true },
  { id: "stack", label: "Stack", isVisible: true },
  { id: "contact", label: "Contact", isVisible: true },
] as const

export type SectionId = (typeof SECTIONS)[number]["id"]

export interface Section {
  id: SectionId
  label: string
  number: string
}

export const sections: Section[] = SECTIONS.filter((section) => section.isVisible).map(
  (section, index) => ({
    id: section.id,
    label: section.label,
    number: String(index + 1).padStart(2, "0"),
  }),
)

export const hasSection = (id: SectionId) => sections.some((section) => section.id === id)

export const sectionNumber = (id: SectionId) =>
  sections.find((section) => section.id === id)?.number ?? ""
