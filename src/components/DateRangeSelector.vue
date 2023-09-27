<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from 'vue'
import type { DateRange } from '@/typings/app/partials/DateRange'

const { label, inputValue } = defineProps<{ label: string, inputValue: DateRange }>();

const localValue = ref<DateRange>(inputValue);
const isOpen = ref<boolean>(false);

const emit = defineEmits(['update:dateRange']);

watch(localValue, newValue => {
    emit('update:dateRange', newValue)
    isOpen.value = true
})
</script>

<template>
    <q-input filled :model-value="`${localValue.from} - ${localValue.to}`" :label="label">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale" @hide="isOpen = false">
                    <q-date v-model="localValue" range v-close-popup="isOpen">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>