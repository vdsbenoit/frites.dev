import { useEventListener } from '@vueuse/core'

export function useAnalytics() {
  const { proxy } = useScriptUmamiAnalytics()

  function trackEvent(name: string, data: Record<string, string>) {
    proxy.track(name, data)
  }

  /**
   * Sends a `link-click` event when a visitor clicks an email link or a link to another site.
   * The `target` is `email` or the hostname of the site.
   */
  function trackLinkClicks() {
    useEventListener('click', (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!(link instanceof HTMLAnchorElement))
        return
      if (link.protocol === 'mailto:')
        trackEvent('link-click', { target: 'email' })
      else if (link.hostname !== window.location.hostname)
        trackEvent('link-click', { target: link.hostname.replace(/^www\./, '') })
    })
  }

  return { trackEvent, trackLinkClicks }
}
