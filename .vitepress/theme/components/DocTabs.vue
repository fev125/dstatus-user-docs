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
.doc-tabs {
  margin: 1.25rem 0 1.75rem;
}

.doc-tabs__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.25rem;
  margin-bottom: 1rem;
  border-radius: 9999px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  width: fit-content;
  max-width: 100%;
}

.doc-tabs__tab {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--vp-c-text-2);
  font: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  padding: 0.4rem 0.95rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;
}

.doc-tabs__tab:hover {
  color: var(--vp-c-text-1);
}

.doc-tabs__tab.is-active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.doc-tabs__panel > :first-child {
  margin-top: 0;
}

.doc-tabs__panel > :last-child {
  margin-bottom: 0;
}
</style>
