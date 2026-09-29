export const useCookieConsent = () => {
  const isPromptShown = useCookie("cookie-consent-prompt", { default: () => true })
  const isConsentGiven = useCookie("cookie-consent", { default: () => false })
  return { isPromptShown, isConsentGiven }
}
