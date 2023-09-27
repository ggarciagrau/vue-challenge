import { ref, watch, type UnwrapRef, type Ref } from 'vue'
import { showToastError } from '@/services/toast.service'
import axios, { type AxiosRequestConfig } from 'axios'

export const useQuery = <Response = unknown>(
  url: string,
  reactiveConfig: Ref<AxiosRequestConfig>,
  isEnabled: boolean = true
) => {
  const data = ref<Response | undefined>(undefined)
  const reactiveIsEnabled = ref<boolean>(isEnabled)
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);

  const makeQuery = async (): Promise<{ data: Response } | undefined> => {
    try {
      isLoading.value = true; 
      const res = await axios.get<Response>(url, reactiveConfig.value)
      isError.value = false;
      return { data: res.data }
    } catch (ex) {
      if (ex instanceof Error) {
        showToastError(ex.message)
      } else {
        showToastError('An error ocurred')
      }
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  watch(
    [() => reactiveConfig.value.params, reactiveIsEnabled],
    async () => {
      if (!reactiveIsEnabled.value) return
      const res = await makeQuery()

      if (!res) return
      data.value = res.data as UnwrapRef<Response | undefined>
    },
    { immediate: true }
  )

  return {
    data,
    isLoading,
    isError
  }
}
