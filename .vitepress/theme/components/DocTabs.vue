<script setup>
import { ref } from 'vue'

const props = defineProps({
  /** 标签文案，与具名插槽 tab-0、tab-1… 一一对应 */
  tabs: {
    type: Array,
    required: true,
  },
})

const active = ref(0)

function onKey(e, i) {
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    active.value = (i + 1) % props.tabs.length
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    active.value = (i - 1 + props.tabs.length) % props.tabs.length
  }
}
</script>

<template>
  <div class="doc-tabs">
    <div class="doc-tabs__nav" role="tablist">
      <button
        v-for="(label, i) in tabs"
        :key="label"
        type="button"
        role="tab"
        class="doc-tabs__tab"
        :class="{ 'is-active': active === i }"
        :aria-selected="active === i"
        :tabindex="active === i ? 0 : -1"
        @click="active = i"
        @keydown="onKey($event, i)"
      >
        {{ label }}
      </button>
    </div>
    <div
      v-for="(label, i) in tabs"
      :key="`panel-${label}`"
      class="doc-tabs__panel"
      role="tabpanel"
      v-show="active === i"
    >
      <slot :name="`tab-${i}`" />
    </div>
  </div>
</template>

<style scoped>
/* 药丸按钮样式在 custom.css 与 changelog-switch 共用 */
.doc-tabs {
  margin: 1.25rem 0 1.75rem;
}

.doc-tabs__nav {
  margin-bottom: 1rem;
}

.doc-tabs__panel > :first-child {
  margin-top: 0;
}

.doc-tabs__panel > :last-child {
  margin-bottom: 0;
}
</style>
