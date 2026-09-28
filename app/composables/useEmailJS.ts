import emailjs from "@emailjs/browser"

export const useEmailJS = () => {
  const config = useRuntimeConfig()
  const isInitialized = ref(false)

  const initEmailJS = () => {
    if (!isInitialized.value) {
      const options = {
        publicKey: config.public.emailjsUserPubKey as string,
        blockHeadless: true,
      }
      emailjs.init(options)
      isInitialized.value = true
    }
  }

  // Initialize EmailJS when the composable is first used
  initEmailJS()

  const send = async (templateParams: Record<string, unknown>) => {
    if (!isInitialized.value) {
      throw new Error("EmailJS initialization failed")
    }

    const serviceId = config.public.emailjsServiceId as string
    const templateId = config.public.emailjsTemplateId as string

    try {
      const response = await emailjs.send(serviceId, templateId, templateParams)
      console.log("EmailJS response:", response)
      return { success: true, response }
    } catch (error) {
      console.error("EmailJS error:", error)
      return { success: false, error }
    }
  }

  return {
    send,
    isInitialized,
  }
}
