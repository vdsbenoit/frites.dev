export interface SkillItem {
  title: string
  id: string
  icon?: string
  color?: string
  description: string
  opinion?: string
  level?: number
}

export interface SkillGroup {
  title: string
  id: string
  items: SkillItem[]
}

export interface SkillSection {
  title: string
  id: string
  groups: SkillGroup[]
}
