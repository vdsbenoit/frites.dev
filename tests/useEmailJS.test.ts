import { describe, expect, it } from 'vitest'
import nuxtConfig from '../nuxt.config'

describe('useEmailJS', () => {
  it('emailjsUserPubKey emailjsServiceId emailjsTemplateId are set in the nuxt config ', () => {
    const publicConfig = nuxtConfig.runtimeConfig?.public
    expect(publicConfig?.emailjsUserPubKey).toBeDefined()
    expect(publicConfig?.emailjsServiceId).toBeDefined()
    expect(publicConfig?.emailjsTemplateId).toBeDefined()
    expect(publicConfig?.emailjsUserPubKey).not.toBeNull()
    expect(publicConfig?.emailjsServiceId).not.toBeNull()
    expect(publicConfig?.emailjsTemplateId).not.toBeNull()
  })
})
