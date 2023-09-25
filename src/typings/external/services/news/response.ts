import type { Article } from "@/typings/app/models/article"

export type Response = {
    articles: Article[],
    status: string,
    totalResults: number
}