<!-- This page contains the nav bar & instantiate the different section components -->
<template>
  <div>
    <header
      class="fixed top-0 right-0 left-0 z-40 items-center sm:top-8 sm:grid sm:grid-flow-col sm:grid-cols-5 sm:justify-items-center sm:px-6 xl:px-0"
    >
      <div
        class="group hidden cursor-pointer items-center sm:flex"
        @click.prevent="navigateTo('#hero')"
      >
        <img
          src="~/assets/img/logo-transparent.png"
          alt="company-logo"
          class="mr-1 size-8 md:size-10"
        />
        <a
          href="#hero"
          class="decoration-primary rounded text-lg font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,1)] transition-colors group-hover:text-gray-400 focus:underline focus:underline-offset-2 focus:outline-none md:text-xl"
        >
          frites.dev
        </a>
      </div>
      <div
        class="via-primary squircle-nav-bar bg-gradient-to-r from-gray-700 to-red-400 pb-[1px] sm:col-start-3 sm:rounded-xl sm:bg-gradient-to-br sm:p-[1px]"
      >
        <nav
          class="squircle-nav-bar flex items-center justify-evenly bg-gray-800 px-1 py-2 text-gray-100 sm:justify-between sm:gap-x-5 sm:rounded-xl sm:px-5 sm:py-1"
        >
          <div
            class="group flex cursor-pointer items-center sm:hidden"
            @click.prevent="navigateTo('#hero')"
          >
            <img src="~/assets/img/logo-transparent.png" alt="company-logo" class="mr-1 size-6" />
            <a
              href="#hero"
              class="decoration-primary font-bold transition-colors group-hover:text-gray-400 focus:underline focus:underline-offset-2 focus:outline-none sm:text-lg"
            >
              frites.dev
            </a>
          </div>
          <a
            v-for="section in SECTIONS"
            :key="section.id"
            :href="`#${section.id}`"
            :class="{
              'text-primary': currentSection === section.id,
              hidden: section.id === 'hero',
            }"
            class="decoration-primary text-sm transition-colors hover:text-gray-400 focus:underline focus:underline-offset-2 focus:outline-none sm:text-base"
          >
            {{ section.title }}
          </a>
        </nav>
      </div>
      <UToggle
        v-model="isStarsEnabled"
        name="toggleStarBackground"
        size="lg"
        off-icon="i-tdesign-animation-1"
        on-icon="i-tdesign-animation-1"
        class="hidden sm:col-start-5 sm:inline-flex"
      />
    </header>
    <main class="overflow-x-hidden">
      <component
        :is="section.component"
        v-for="section in SECTIONS"
        :id="section.id"
        :key="section.id"
        v-intersection-observer="[onIntersectionObserver, { threshold: 0.5 }]"
        :is-active="currentSection === section.id"
      />
    </main>
    <SectionFooter />
    <div
      class="fixed right-0 bottom-6 left-0 z-30 hidden items-center sm:grid sm:grid-flow-col sm:grid-cols-5 sm:justify-items-center sm:px-6 xl:px-0"
    >
      <UButton
        id="back-to-top-button"
        class="col-start-5 text-nowrap"
        icon="i-heroicons-arrow-small-up"
        color="gray"
        variant="ghost"
        @click="scrollToTop"
      >
        Back to top
      </UButton>
    </div>
    <div
      id="back-to-top-fab"
      class="fixed right-4 bottom-16 z-30 flex size-8 cursor-pointer items-center justify-center rounded-full bg-gray-700 shadow shadow-gray-600/50 active:shadow-none sm:hidden"
      @click="scrollToTop"
    >
      <UIcon name="i-heroicons-arrow-small-up" color="gray" class="size-5" />
    </div>
    <div
      id="star-toggle-fab"
      class="fixed right-3 bottom-3 z-30 flex size-10 cursor-pointer items-center justify-center rounded-full shadow shadow-gray-600/50 transition-colors active:shadow-none sm:hidden"
      :class="{ 'bg-primary-400': isStarsEnabled, 'bg-gray-800': !isStarsEnabled }"
      @click="toggleStars"
    >
      <UIcon
        name="i-tdesign-animation-1"
        class="size-5 transition-colors"
        :class="{ 'bg-primary-400': !isStarsEnabled, 'bg-gray-800': isStarsEnabled }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Hero from "../components/Section/Hero.vue"
import Profile from "../components/Section/Profile.vue"
import Skills from "../components/Section/Skills.vue"
import Contact from "../components/Section/Contact.vue"
import { vIntersectionObserver } from "@vueuse/components"

// SEO config

defineOgImageComponent("FriteCustom")

// Variables & Constants

const SECTIONS = [
  { id: "hero", title: "Home", component: Hero },
  { id: "profile", title: "Profile", component: Profile },
  { id: "skills", title: "Skills", component: Skills },
  { id: "contact", title: "Contact", component: Contact },
]

const currentSection = ref<string>("")
const isStarsEnabled = useCookie("is-stars-enabled", { default: () => true })

// Methods

const toggleStars = () => {
  isStarsEnabled.value = !isStarsEnabled.value
}

const onIntersectionObserver = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      currentSection.value = entry.target.id
    }
  })
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}
</script>
<style scoped>
.squircle-nav-bar {
  corner-shape: squircle;
}
</style>
