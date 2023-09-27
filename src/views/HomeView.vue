<script setup lang="ts">
import { ref, computed } from 'vue';
import { DateTime } from 'luxon'
import type { DateRange } from '@/typings/app/partials/DateRange'
import BaseSearcher from '../components/BaseSearcher.vue'
import DateRangeSelector from '../components/DateRangeSelector.vue'
import { useFetchArticles } from '@/composables/useFetchArticles';

const searchTerm = ref<string>("Messi");

const updateSearchTerm = (newValue: string) => {
  searchTerm.value = newValue;
}

const dateRange = ref<DateRange>({
  from: DateTime.local().minus({ days: 3 }).toFormat('yyyy/MM/dd'),
  to: DateTime.local().toFormat('yyyy/MM/dd')
});

const updateDateRange = (newValue: DateRange) =>
  dateRange.value = newValue;

const { articles, isLoading, isError } = useFetchArticles(searchTerm, dateRange, ref(true));

// Pagination
const currentPage = ref<number>(1);
const articlesByPage = 10;

const totalPages = computed(() => {
  return Math.ceil(articles.value.length / articlesByPage);
});

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * articlesByPage;
  const end = start + articlesByPage;
  return articles.value.slice(start, end);
});


</script>

<template>
  <main>
    <v-container fluid>
      <v-row>
        <v-col>
          <BaseSearcher label="Search term" :inputValue="searchTerm" @update:inputValue="updateSearchTerm" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <DateRangeSelector label="Date range" :inputValue="dateRange" @update:dateRange="updateDateRange" />
        </v-col>
      </v-row>

      <v-row>
        <v-col v-if="isLoading" class="flex flex-center">
          <q-circular-progress reverse indeterminate :value="50" size="50px" color="light-blue" class="q-ma-md" />
        </v-col>
        <v-col v-else-if="isError">
          <q-banner inline-actions class="text-white bg-red">
            An error has occurred. Try again.
            <template v-slot:action>
              <q-btn flat color="white" />
            </template>
          </q-banner>
        </v-col>
        <v-col v-else v-for="({ title, author, content, publishedAt }, index) in paginatedArticles" :key="index" cols="12"
          md="6" xl="4">
          <v-card variant="tonal">
            <v-card-item>
              <v-card-title>{{ title }}</v-card-title>
              <v-card-subtitle>{{ author }} - {{ DateTime.fromISO(publishedAt).setZone('utc').toFormat('yyyy/MM/dd')
              }}</v-card-subtitle>
              <v-card-text>{{ content }}</v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <q-pagination class="flex-center" v-if="articles.length > articlesByPage" v-model="currentPage"
            :max="totalPages" :input="true" color="black" />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
