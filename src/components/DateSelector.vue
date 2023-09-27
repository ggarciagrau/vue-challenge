<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from 'vue'

const { label, inputValue } = defineProps<{ label: string, inputValue: string }>();

const localValue = ref<string>(inputValue);

const emit = defineEmits(['update:inputValue']);

watch(localValue, newValue =>
  emit('update:inputValue', newValue));

</script>

<template>
  <q-input filled v-model="localValue" mask="date" :rules="['date']" :label="label">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="localValue" mask="YYYY-MM-DD">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>