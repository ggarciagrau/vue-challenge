import axios from "axios";

const URL = 'https://newsapi.org/v2/everything?q=MESSI&from=2023-09-20&sortBy=publishedAt&apiKey=a4c1ea306eca429c8aa2c28b1884cd45';

export const fetchNews = async () => {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (ex) {
        console.error('Error fetching news:', ex);
        throw ex;
    }
}