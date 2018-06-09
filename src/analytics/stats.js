import React, { Component } from "react";
import GoogleAnalytics from "react-ga";
import { productionEnvironment } from "../utils/environmentUtils";

initializeGoogleAnalytics();
function initializeGoogleAnalytics() {
  if (!productionEnvironment()) {
    return;
  }
  GoogleAnalytics.initialize(
    process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_NUMBER
  );
}

export class StatEvent {
  constructor(category, action, label, value) {
    this.category = category;
    this.action = action;
    this.label = label;
    this.value = value;
  }
}

export function trackEvent(event) {
  if (!productionEnvironment()) {
    return;
  }
  GoogleAnalytics.event({
    category: event.category,
    action: event.action,
    label: event.label,
    value: event.value
  });
}

export const withTracker = WrappedComponent => {
  const trackPage = page => {
    if (!productionEnvironment()) {
      return;
    }
    GoogleAnalytics.set({
      page
    });
    GoogleAnalytics.pageview(page);
  };

  const HOC = class StatsWrapperComponent extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};
