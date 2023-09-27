import { toast } from "vue3-toastify"

export const showToastError = (message: string) => {
  toast.error(message)
}
