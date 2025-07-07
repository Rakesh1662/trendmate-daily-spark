import InfoCard from "./InfoCard";
import { Newspaper, ExternalLink } from "lucide-react";

const mockNews = [
  {
    title: "AI Breakthrough in Healthcare",
    summary: "New AI model shows 95% accuracy in early disease detection",
    source: "TechNews",
    time: "2 hours ago"
  },
  {
    title: "Market Surge Continues",
    summary: "Global markets see positive momentum amid economic recovery",
    source: "Financial Times",
    time: "4 hours ago"
  },
  {
    title: "Climate Summit Updates",
    summary: "World leaders announce new renewable energy commitments",
    source: "Global Today",
    time: "6 hours ago"
  }
];

const TrendingNews = () => {
  const newsContent = (
    <div className="space-y-3">
      {mockNews.map((article, index) => (
        <div key={index} className="border-l-2 border-primary/30 pl-3 py-2 hover:border-primary transition-smooth">
          <h4 className="font-medium text-sm mb-1">{article.title}</h4>
          <p className="text-xs text-muted-foreground mb-2">{article.summary}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{article.source}</span>
            <span>{article.time}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <InfoCard
      title="Trending News"
      icon={Newspaper}
      content={newsContent}
      badge={{ text: "Live", variant: "default" }}
      action={{
        text: "View All News",
        onClick: () => console.log("View all news")
      }}
    />
  );
};

export default TrendingNews;