<script lang="ts" setup>
const props = defineProps<{ phrases: string[] }>()

const START_DELAY = 600
const TYPE_DELAY = 45
const TYPE_JITTER = 40
const HOLD_DELAY = 2600
const DELETE_DELAY = 22
const NEXT_PHRASE_DELAY = 400

const text = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

function shuffle(items: string[]) {
  const list = [...items]
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j]!, list[i]!]
  }
  return list
}

onMounted(() => {
  const phrases = shuffle(props.phrases)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    text.value = phrases[0] ?? ''
    return
  }

  let index = 0
  let position = 0
  let isDeleting = false

  const tick = () => {
    const phrase = phrases[index] ?? ''
    position += isDeleting ? -1 : 1
    text.value = phrase.slice(0, position)

    if (!isDeleting && position === phrase.length) {
      isDeleting = true
      timer = setTimeout(tick, HOLD_DELAY)
    }
    else if (isDeleting && position === 0) {
      isDeleting = false
      index = (index + 1) % phrases.length
      timer = setTimeout(tick, NEXT_PHRASE_DELAY)
    }
    else {
      timer = setTimeout(tick, isDeleting ? DELETE_DELAY : TYPE_DELAY + Math.random() * TYPE_JITTER)
    }
  }

  timer = setTimeout(tick, START_DELAY)
})

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="flex max-w-[940px]">
    <span
      class="
        block min-h-[1.4em] animate-blink-caret border-r-[0.12em] border-transparent pr-0.5
        font-mono text-[clamp(12px,1.9vw,19px)] whitespace-pre text-neutral-400
      "
    >
      {{ text }}
    </span>
  </div>
</template>
