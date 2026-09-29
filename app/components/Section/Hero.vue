<script lang="ts" setup>
import { taglines } from '~/data/taglines'
</script>

<template>
  <section
    id="top"
    class="
      relative overflow-hidden border-b border-neutral-800
      bg-[radial-gradient(ellipse_at_bottom,#262626_0%,#0a0a0a_100%)]
    "
  >
    <FriteBackground />
    <div
      class="
        pointer-events-none absolute inset-0
        bg-[linear-gradient(to_bottom,rgba(10,10,10,0)_55%,rgba(10,10,10,0.85)_88%,#0a0a0a_100%)]
      "
    />

    <!-- The bottom padding is larger on purpose: the panel looks centred on load -->
    <UContainer class="relative flex min-h-svh flex-col justify-center pt-[88px] pb-[200px]">
      <div
        class="
          flex flex-col gap-[clamp(28px,5vw,40px)] rounded-[20px] border border-neutral-100/12
          bg-[rgba(14,14,14,0.45)] p-[clamp(24px,5vw,48px)]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_30px_60px_-30px_rgba(0,0,0,0.8)]
          backdrop-blur-[14px] backdrop-saturate-160
        "
      >
        <h1
          class="
            max-w-[940px] animate-bring-in text-[clamp(38px,7vw,86px)] leading-[1.02] font-bold
            tracking-[-0.03em] text-neutral-100
          "
        >
          <span class="block">Tailored software,</span>
          <span class="block">built to <span class="text-frite-400">last</span>.</span>
        </h1>

        <TypewriterTagline :phrases="taglines" />

        <p
          class="
            max-w-[620px] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-pretty text-neutral-300
          "
        >
          I am Benoit, a freelance software engineer in Brussels. I design and deliver applications,
          manage the infrastructure they run on, and automate the processes around them. You work
          with one senior engineer, accountable from first line of code to production.
        </p>

        <div class="flex flex-wrap gap-3">
          <UButton
            to="/#work"
            label="See the work"
            class="
              rounded-[10px] px-[26px] py-3.5 text-base font-semibold whitespace-nowrap
              shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_14px_30px_-14px_rgba(244,198,31,0.6)]
            "
          />
          <UButton
            to="/#contact"
            label="Email me"
            color="neutral"
            variant="outline"
            class="
              rounded-[10px] bg-neutral-800/60 px-[26px] py-[13px] text-base font-semibold
              whitespace-nowrap text-neutral-100 ring-neutral-700 backdrop-blur-sm
              hover:bg-neutral-800 hover:text-neutral-100 hover:ring-neutral-600
            "
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>
