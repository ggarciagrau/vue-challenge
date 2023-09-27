import { ref, watch, type Ref } from 'vue'
import type { AxiosRequestConfig } from 'axios'
import { DateTime } from 'luxon'
import { useQuery } from './useQuery'
import type { Article } from '@/typings/app/models/Article'
import type { Response } from '@/typings/external/services/news/Response'
import type { DateRange } from '@/typings/app/partials/DateRange'

const URL =
  'https://newsapi.org/v2/everything?sortBy=publishedAt&apiKey=a4c1ea306eca429c8aa2c28b1884cd45'

export const useFetchArticles = (
  searchTerm: Ref<string>,
  dateRange: Ref<DateRange>,
  isEnabled: Ref<boolean>
) => {
  const articles = ref<Article[]>([])

  const transformDate = (dateISO: string) =>
    DateTime.fromFormat(dateISO, 'yyyy/MM/dd').toFormat('yyyy-MM-dd')

  const buildParams = () => ({
    q: searchTerm.value,
    from: transformDate(dateRange.value.from),
    to: transformDate(dateRange.value.to)
  })

  const reactiveConfig = ref<AxiosRequestConfig>({
    params: buildParams()
  })

  watch([searchTerm, dateRange], () => {
    reactiveConfig.value.params = buildParams()
  })

  const { data: result, isLoading, isError } = useQuery<Ref<Response>>(URL, reactiveConfig, isEnabled.value)

  watch(result, (newResult) => {
    if (newResult?.articles) {
      articles.value = newResult.articles
    }
  })

  return { articles, isLoading, isError }
}
