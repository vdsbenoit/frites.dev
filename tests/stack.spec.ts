import { describe, expect, it } from 'vitest'
import { stack } from '~/data/stack'

describe('stack', () => {
  const skills = stack.flatMap(group => group.items)

  it('has no duplicate skill titles', () => {
    const titles = skills.map(skill => skill.title)
    const duplicates = titles.filter((title, index) => titles.indexOf(title) !== index)
    expect(duplicates).toStrictEqual([])
  })

  it('rates every skill between 1 and 3', () => {
    const outOfRange = skills.filter(skill => skill.level < 1 || skill.level > 3)
    expect(outOfRange).toStrictEqual([])
  })
})
