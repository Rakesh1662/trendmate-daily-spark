import InfoCard from "./InfoCard";
import { Bitcoin, TrendingUp, TrendingDown } from "lucide-react";

const mockCrypto = [
  { symbol: "BTC", name: "Bitcoin", price: 43250.67, change: +1250.33, changePercent: +2.98 },
  { symbol: "ETH", name: "Ethereum", price: 2341.89, change: +89.45, changePercent: +3.97 },
  { symbol: "ADA", name: "Cardano", price: 0.4567, change: -0.0123, changePercent: -2.62 },
  { symbol: "SOL", name: "Solana", price: 98.34, change: +4.21, changePercent: +4.47 }
];

const CryptoUpdates = () => {
  const cryptoContent = (
    <div className="space-y-2">
      {mockCrypto.map((crypto, index) => (
        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-smooth">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
              <Bitcoin className="w-4 h-4 text-warning" />
            </div>
            <div>
              <p className="font-medium text-sm">{crypto.symbol}</p>
              <p className="text-xs text-muted-foreground">{crypto.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-sm">${crypto.price.toLocaleString()}</p>
            <div className={`flex items-center gap-1 text-xs ${
              crypto.change >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {crypto.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{crypto.change >= 0 ? '+' : ''}${crypto.change} ({crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent}%)</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <InfoCard
      title="Crypto Market"
      icon={Bitcoin}
      content={cryptoContent}
      badge={{ text: "Live", variant: "default" }}
      action={{
        text: "View Gemini Rates",
        onClick: () => console.log("View Gemini rates")
      }}
    />
  );
};

export default CryptoUpdates;