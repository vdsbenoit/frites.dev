const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const

export type SectionId = (typeof SECTIONS)[number]["id"]

export interface Section {
  id: SectionId
  label: string
  number: string
}

export const sections: Section[] = SECTIONS.map((section, index) => ({
  ...section,
  number: String(index + 1).padStart(2, "0"),
}))

export const sectionNumber = (id: SectionId) =>
  sections.find((section) => section.id === id)?.number ?? ""
