import InfoCard from "./InfoCard";
import { Cloud, Sun, CloudRain, Wind, Thermometer } from "lucide-react";

const mockWeather = {
  location: "San Francisco, CA",
  current: {
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8
  },
  forecast: [
    { day: "Today", high: 75, low: 62, icon: "cloud" },
    { day: "Tomorrow", high: 78, low: 65, icon: "sun" },
    { day: "Friday", high: 71, low: 59, icon: "rain" }
  ]
};

const WeatherIcon = ({ type, className = "w-4 h-4" }: { type: string; className?: string }) => {
  switch (type) {
    case "sun": return <Sun className={className} />;
    case "rain": return <CloudRain className={className} />;
    default: return <Cloud className={className} />;
  }
};

const WeatherWidget = () => {
  const weatherContent = (
    <div className="space-y-4">
      {/* Current Weather */}
      <div className="text-center p-4 bg-gradient-card rounded-lg">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Cloud className="w-6 h-6 text-primary" />
          <span className="text-2xl font-bold">{mockWeather.current.temperature}°F</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{mockWeather.current.condition}</p>
        <p className="text-xs font-medium">{mockWeather.location}</p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Thermometer className="w-3 h-3 text-muted-foreground" />
          <span>Humidity: {mockWeather.current.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-3 h-3 text-muted-foreground" />
          <span>Wind: {mockWeather.current.windSpeed} mph</span>
        </div>
      </div>

      {/* Forecast */}
      <div className="space-y-2">
        {mockWeather.forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="font-medium">{day.day}</span>
            <div className="flex items-center gap-2">
              <WeatherIcon type={day.icon} />
              <span className="text-muted-foreground">{day.high}°/{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <InfoCard
      title="Weather Forecast"
      icon={Cloud}
      content={weatherContent}
      badge={{ text: "Updated", variant: "outline" }}
      action={{
        text: "7-Day Forecast",
        onClick: () => console.log("View 7-day forecast")
      }}
    />
  );
};

export default WeatherWidget;