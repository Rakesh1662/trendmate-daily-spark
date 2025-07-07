import InfoCard from "./InfoCard";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const mockStocks = [
  { symbol: "AAPL", name: "Apple", price: 175.32, change: +2.45, changePercent: +1.42 },
  { symbol: "TSLA", name: "Tesla", price: 242.18, change: +8.76, changePercent: +3.75 },
  { symbol: "NVDA", name: "NVIDIA", price: 421.90, change: -5.23, changePercent: -1.22 },
  { symbol: "MSFT", name: "Microsoft", price: 338.54, change: +1.87, changePercent: +0.56 }
];

const StockUpdates = () => {
  const stockContent = (
    <div className="space-y-2">
      {mockStocks.map((stock, index) => (
        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-smooth">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{stock.symbol}</p>
              <p className="text-xs text-muted-foreground">{stock.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-sm">${stock.price}</p>
            <div className={`flex items-center gap-1 text-xs ${
              stock.change >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {stock.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <InfoCard
      title="Stock Updates"
      icon={TrendingUp}
      content={stockContent}
      badge={{ text: "Real-time", variant: "secondary" }}
      action={{
        text: "View Portfolio",
        onClick: () => console.log("View portfolio")
      }}
    />
  );
};

export default StockUpdates;