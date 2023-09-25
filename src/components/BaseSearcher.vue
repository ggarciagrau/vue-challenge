<script setup lang="ts">
import type { InputEventWithTarget } from '@/typings/app/events/InputEventWithTarget';
import { ref, defineProps, defineEmits, watch } from 'vue';

const { inputValue } = defineProps<{ label: string, inputValue: string }>();

const localValue = ref<string>(inputValue);

const emit = defineEmits(['update:inputValue']);

let debounceTimer: number | null;

watch(localValue, newValue => {
    if (debounceTimer) clearTimeout(debounceTimer);
    
    debounceTimer = setTimeout(() => {
        emit('update:inputValue', newValue)
    }, 1500);
});
</script>

<template>
    <v-text-field :label="label" hide-details="auto" :model-value="localValue"
    @input="(ev: InputEventWithTarget) => localValue = ev.target.value"></v-text-field>
</template>