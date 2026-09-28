interface Window {
  captchaCallback: (response: string) => void
  captchaExpiredCallback: () => void
  captchaErrorCallback: () => void
  grecaptcha: {
    execute: (widgetId?: number) => void
  }
}
