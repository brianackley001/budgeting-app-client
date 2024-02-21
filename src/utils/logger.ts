import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const APP_INSIGHTS_CONN_STRING = import.meta.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

const appInsights = new ApplicationInsights({ config: {
  connectionString: APP_INSIGHTS_CONN_STRING,
  instrumentationKey: import.meta.env.VITE_APPINSIGHTS_INSTRUMENTATIONKEY,
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