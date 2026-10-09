import type { MaybeComputedElementRef } from '@vueuse/core'
import { useDocumentVisibility, useIntersectionObserver } from '@vueuse/core'

const MIN_READ_MS = 2000
const THRESHOLDS = Array.from({ length: 21 }, (_, index) => index / 20)

function durationBucket(readMs: number) {
  const seconds = readMs / 1000
  if (seconds < 10)
    return '2-10s'
  if (seconds < 30)
    return '10-30s'
  if (seconds < 60)
    return '30-60s'
  return '60s+'
}

/**
 * Sends a `section-read` event each time a section stays in view for at least 2 seconds.
 * A section is in view when it covers half of the viewport, or half of itself when it is
 * shorter than the viewport. Hiding the tab ends the read, since the visitor may not come back.
 */
export function useSectionReadTracking(target: MaybeComputedElementRef, sectionId: string) {
  const { trackEvent } = useAnalytics()
  const visibility = useDocumentVisibility()
  const isInView = shallowRef(false)
  const isReading = computed(() => isInView.value && visibility.value === 'visible')
  let readingSince = 0

  useIntersectionObserver(
    target,
    ([entry]) => {
      if (!entry)
        return
      const viewportHeight = entry.rootBounds?.height ?? window.innerHeight
      const minVisibleHeight = Math.min(entry.boundingClientRect.height, viewportHeight) / 2
      isInView.value = entry.isIntersecting && entry.intersectionRect.height >= minVisibleHeight
    },
    { threshold: THRESHOLDS },
  )

  function endRead() {
    const readMs = performance.now() - readingSince
    if (readMs >= MIN_READ_MS)
      trackEvent('section-read', { section: sectionId, duration: durationBucket(readMs) })
  }

  watch(isReading, (reading) => {
    if (reading)
      readingSince = performance.now()
    else
      endRead()
  })

  onBeforeUnmount(() => {
    if (isReading.value)
      endRead()
  })
}
