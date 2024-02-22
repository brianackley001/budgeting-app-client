import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const APPLICATIONINSIGHTS_CONNECTION_STRING  = import.meta.env.VITE_APPLICATIONINSIGHTS_CONNECTION_STRING || "InstrumentationKey=43faffa4-fce5-45b9-a015-26836d09e42c;IngestionEndpoint=https://westus2-2.in.applicationinsights.azure.com/;LiveEndpoint=https://westus2.livediagnostics.monitor.azure.com/";
const APPINSIGHTS_INSTRUMENTATIONKEY = import.meta.env.VITE_APPINSIGHTS_INSTRUMENTATIONKEY || "43faffa4-fce5-45b9-a015-26836d09e42c";

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