import { useEffect } from "react";

const GoogleAnalytics = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-CR3KVLL4P3";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-CR3KVLL4P3");
      };
    }
  }, []);

  return null;
};

export default GoogleAnalytics;
