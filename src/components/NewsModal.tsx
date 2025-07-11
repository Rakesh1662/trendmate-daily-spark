import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Newspaper, ExternalLink, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NewsArticle {
  title: string;
  summary: string;
  source: string;
  time: string;
  url?: string;
}

interface NewsModalProps {
  trigger: React.ReactNode;
}

const NewsModal = ({ trigger }: NewsModalProps) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchMoreNews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-news');
      if (error) throw error;
      setNews(data.articles || []);
    } catch (error) {
      console.error('Error fetching more news:', error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchMoreNews();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Newspaper className="w-5 h-5" />
            Latest News
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading latest news...</p>
            </div>
          ) : news.length > 0 ? (
            <div className="grid gap-4">
              {news.map((article, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 leading-tight">{article.title}</h3>
                      <p className="text-muted-foreground mb-3 line-clamp-3">{article.summary}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-medium">{article.source}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.time}</span>
                        </div>
                      </div>
                    </div>
                    {article.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(article.url, '_blank')}
                        className="shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No news articles available at the moment.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;