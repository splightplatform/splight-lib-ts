import { get } from '../../rest/BaseMethods.js';
import { Headers } from '../../types.js';
import { Path } from '../../Urls.js';

export interface CurrentWeather {
  icon_code: number;
  temperature: number;
  phrase: string;
  wind_speed: number;
  wind_direction: number;
  day_or_night: string;
  sunset_time?: string;
  sunrise_time?: string;
}

export interface DailyForecast {
  day_of_week: string;
  min_temperature: number;
  max_temperature: number;
  sunrise_time: string;
  sunset_time: string;
  narrative: string;
  icon_code?: number;
}

export interface HourlyForecast {
  temperature?: number;
  icon_code?: number;
  time?: string;
}

export const WeatherClient = (headers: Headers) => {
  const basePath = Path('v2/plugin/weather/');

  return {
    currentWeather: (latitude: number, longitude: number) =>
      get<CurrentWeather>(
        basePath
          .slash('current')
          .slash(latitude.toString())
          .slash(longitude.toString()).url,
        headers
      ),
    dailyForecast: (latitude: number, longitude: number) =>
      get<DailyForecast[]>(
        basePath
          .slash('forecast')
          .slash('daily')
          .slash(latitude.toString())
          .slash(longitude.toString()).url,
        headers
      ),
    twoDayHourlyForecast: (latitude: number, longitude: number) =>
      get<HourlyForecast[]>(
        basePath
          .slash('forecast')
          .slash('hourly')
          .slash('2day')
          .slash(latitude.toString())
          .slash(longitude.toString()).url,
        headers
      ),
    fifteenDayHourlyForecast: (latitude: number, longitude: number) =>
      get<HourlyForecast[]>(
        basePath
          .slash('forecast')
          .slash('hourly')
          .slash('15day')
          .slash(latitude.toString())
          .slash(longitude.toString()).url,
        headers
      ),
  };
};
