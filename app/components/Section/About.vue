<script lang="ts" setup>
import { services } from '~/data/services'
import { workValues } from '~/data/workValues'

const CAREER_START = new Date(2016, 8)
const YEAR_MS = 1000 * 60 * 60 * 24 * 365.25

const workTimeYears = Math.floor((Date.now() - CAREER_START.getTime()) / YEAR_MS)

const pad = (value: number) => String(value).padStart(2, '0')
</script>

<template>
  <AppSection id="about" title="About">
    <div
      class="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] items-start gap-10"
    >
      <div class="flex flex-col items-start gap-4">
        <div class="rounded-[4px] bg-linear-to-br from-neutral-800 to-frite-400 p-px">
          <img
            src="~/assets/img/avatar.png"
            alt="Benoit Vander Stappen"
            class="
              block w-full max-w-[240px] rounded-[4px]
              bg-[radial-gradient(circle_at_50%_40%,#454545_0%,#262626_45%,#141414_100%)]
            "
          >
        </div>
        <p class="font-mono text-[13px] text-neutral-400">
          @vdsbenoit
        </p>
        <SocialLinks class="text-neutral-400" with-email />
      </div>

      <div class="flex min-w-0 flex-col gap-7">
        <div>
          <p class="font-mono text-[13px] text-neutral-500">
            Hi, I am
          </p>
          <h3
            class="
              mt-1 text-[clamp(32px,4vw,44px)] leading-[1.2] font-bold tracking-tight
              text-neutral-100
            "
          >
            Benoit
          </h3>
        </div>
        <p class="text-[17px] leading-[1.65] text-pretty text-neutral-300">
          I am a freelance <span class="text-frite-400">software engineer</span>. I find solutions
          to business issues using technology. I have
          <span class="text-frite-400">{{ workTimeYears }} years of experience</span> in software
          development, testing, automation and DevOps, across health, entertainment and new
          technologies. I have worked for both
          <span class="text-frite-400">big tech companies and startups</span>.
        </p>
        <div
          class="
            grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-px overflow-hidden
            rounded-[4px] border border-neutral-800 bg-neutral-800
          "
        >
          <div v-for="(service, index) in services" :key="service.title" class="bg-surface p-5">
            <div class="font-mono text-[11px] text-frite-400">
              {{ pad(index + 1) }}
            </div>
            <div class="mt-2 text-[15px] font-semibold text-neutral-100">
              {{ service.title }}
            </div>
            <div class="mt-1.5 text-sm/normal text-neutral-400">
              {{ service.detail }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-16">
      <h3 class="mb-4 font-mono text-[11px] tracking-[0.08em] text-neutral-500 uppercase">
        How I work
      </h3>
      <div
        class="
          grid grid-cols-[repeat(auto-fit,minmax(min(max(220px,calc((100%-2px)/3)),100%),1fr))]
          gap-px overflow-hidden rounded-[4px] border border-neutral-800 bg-neutral-800
        "
      >
        <div
          v-for="value in workValues"
          :key="value.title"
          class="flex flex-col gap-2.5 bg-neutral-950 px-5 py-[22px]"
        >
          <UIcon :name="value.icon" class="size-[22px] text-frite-400" />
          <div class="text-[15px] font-semibold text-neutral-100">
            {{ value.title }}
          </div>
          <div class="text-sm leading-[1.55] text-pretty text-neutral-400">
            {{ value.detail }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-16">
      <h3 class="mb-2 font-mono text-[11px] tracking-[0.08em] text-neutral-500 uppercase">
        Track record — select a role for detail
      </h3>
      <WorkTimeline />
    </div>
  </AppSection>
</template>
