<template>
  <section class="flex min-h-screen items-start justify-center pb-24 md:pb-0 lg:items-center">
    <div class="mt-2 max-w-screen-lg px-3 sm:mt-0 sm:px-6 xl:px-2">
      <div class="flex gap-x-8">
        <!-- left panel -->
        <!-- visible only over the sm breakpoint -->
        <div class="hidden flex-shrink-0 flex-col items-center gap-y-2 sm:flex">
          <div
            class="via-primary max-h-48 max-w-48 rounded-full bg-gradient-to-r from-gray-900 to-red-400 p-0.5"
          >
            <img src="~/assets/img/avatar.jpg" alt="Avatar" class="rounded-full" />
          </div>
          <p class="hidden font-mono sm:block">@vdsbenoit</p>
          <SocialLinks class="hidden justify-center gap-x-5 sm:flex" />
          <UButton
            class="mt-4 hidden font-semibold transition ease-in motion-safe:hover:scale-110 sm:block"
            size="md"
            color="primary"
            variant="solid"
            to="#skills"
            >My skills</UButton
          >
        </div>

        <!-- right panel -->
        <div class="flex flex-grow flex-col gap-y-4">
          <!-- 1st block : Greeting (+ avatar below sm breakpoint) -->
          <div class="flex items-center gap-x-4">
            <div
              class="via-primary block h-20 w-20 rounded-full bg-gradient-to-r from-gray-900 to-red-400 p-0.5 sm:hidden"
            >
              <img src="~/assets/img/avatar.jpg" alt="Avatar" class="rounded-full" />
            </div>
            <div class="leading-none sm:leading-tight">
              <span class="font-bold">Hi, I am</span><br />
              <h2 class="leading-none tracking-tight">Benoit</h2>
            </div>
          </div>

          <!-- 2nd block : short description -->

          <p class="lg:pr-6">
            I am a freelance
            <span class="decoration-primary underline underline-offset-2">software engineer</span>.
            I find solutions to business issues using technology. I have
            <span class="decoration-primary underline underline-offset-2">
              {{ workTimeYears }} years of experience
            </span>
            in software development, testing, automation and DevOps. I have worked in
            <span class="decoration-primary underline underline-offset-2">various industries</span>
            such as health, entertainment and new technologies.
          </p>

          <SocialLinks class="flex justify-center gap-x-11 sm:hidden" />

          <!-- Services -->
          <div class="lg:pr-6">
            <p>I provide the following services:</p>
            <ul class="list-inside list-disc px-1 py-2 sm:px-2">
              <li>📱 cross-platform mobile app development</li>
              <li>☁ cloud and on-premises SaaS implementation</li>
              <li>🛠️ micro-services development & deployment</li>
              <li>🤖 software automation / scripting</li>
            </ul>
          </div>

          <!-- 3rd block : work experiences -->

          <WorkExperiences />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Props

const props = defineProps<{
  isActive: boolean
}>()

const workTime = new Date().getTime() - new Date(2016, 8).getTime()
const workTimeYears = Math.floor(workTime / (1000 * 60 * 60 * 24 * 365.25))
</script>

<style scoped></style>
