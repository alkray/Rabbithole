export interface NewsDataType {
  article_id: string; // Unique identifier for the article
  title: string; // Article title
  link: string; // URL to the article
  description: string; // Short description of the article
  content: string; // Full content of the article
  pubDate: string; // Publication date in ISO format
  publishedAt: string; // Alternate publication date
  image_url: string | null; // URL for the main image (nullable)
  urlToImage: string | null; // Alternative field for image URLs
  video_url: string | null; // Video URL (nullable)
  source: {
    id: string | null; // Source identifier (nullable)
    name: string; // Name of the source
    url: string; // URL to the source
    icon: string; // Icon URL for the source
    priority: number; // Priority ranking for the source
  };
  source_id: string; // Source identifier
  source_name: string; // Source name
  source_url: string; // Source URL
  source_icon: string; // Icon for the source
  keywords: string[]; // Array of keywords
  creator: string | null; // Creator name (nullable)
  language: string; // Language of the article (e.g., 'en')
  country: string[]; // Array of country codes associated with the article
  category: string[]; // Categories associated with the article
  ai_tag: string[]; // AI-generated tags for the article
  ai_region: string[]; // AI-identified regions for the article
  ai_org: string | null; // AI-identified organization (nullable)
  sentiment: string; // Overall sentiment (e.g., 'positive', 'neutral', 'negative')
  sentiment_stats: SentimentStats; // Detailed sentiment analysis
  duplicate: boolean; // Indicates if the article is flagged as a duplicate
}

interface SentimentStats {
  positive: number; // Positive sentiment score
  neutral: number; // Neutral sentiment score
  negative: number; // Negative sentiment score
}
