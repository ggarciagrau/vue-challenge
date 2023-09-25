import { toast } from "vue3-toastify"

export const showErrorToast = (message: string) => {
  toast.error(message)
}
