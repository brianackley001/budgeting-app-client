import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const APPLICATIONINSIGHTS_CONNECTION_STRING  = import.meta.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "app-insights-conn-string";
const APPINSIGHTS_INSTRUMENTATIONKEY = import.meta.env.VITE_APPINSIGHTS_INSTRUMENTATIONKEY || "app-insights-instrumentation-key";

const appInsights = new ApplicationInsights({ config: {
  connectionString: APPLICATIONINSIGHTS_CONNECTION_STRING ,
  instrumentationKey: APPINSIGHTS_INSTRUMENTATIONKEY,
  /* ...Other Configuration Options... */
} });
appInsights.loadAppInsights();

const logError = (error: Error) => {
  appInsights.trackException({ exception: error });
};

const logEvent = (name: string, properties?: { [key: string]: string }) => {
  appInsights.trackEvent({ name, properties });
};

const logMetric = (name: string, value: number) => {
  appInsights.trackMetric({ name, average: value });
};

const logTrace = (message: string, properties?: { [key: string]: string }) => {
  appInsights.trackTrace({ message, properties });
};


export { logError, logEvent, logMetric, logTrace };