import axios from "axios";
import type { Article } from "@/typings/app/models/article";
import type { Response } from "@/typings/external/services/news/response";

const URL = 'https://newsapi.org/v2/everything?q=MESSI&from=2023-09-20&sortBy=publishedAt&apiKey=a4c1ea306eca429c8aa2c28b1884cd45';

export const fetchNews = async(): Promise<Article[]> => {
    try {
        const res = await axios.get<Response>(URL);
        return res.data.articles;
    } catch (ex) {
        console.error('Error fetching news:', ex);
        throw ex;
    }
}