export type Article = {
    source:      Source;
    author:      null | string;
    title:       null | string;
    description: string;
    url:         string;
    urlToImage:  string;
    publishedAt: Date;
    content:     string;
}

export type Source = {
    id:   null | string;
    name: string;
}
