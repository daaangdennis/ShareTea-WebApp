import React, { useEffect } from "react";
import "../styles/Navbar.css";

// Declare the google variable to let TypeScript know about it
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    // Define the callback function for Google Translate
    window.googleTranslateElementInit = function () {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    // Check if the script is already loaded
    if (!document.querySelector("#google-translate-script")) {
      // Create the script element
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
