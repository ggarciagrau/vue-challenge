import type { Article } from "@/typings/app/models/Article"

export type Response = {
    articles: Article[],
    status: string,
    totalResults: number
}