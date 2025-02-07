import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show animation for 2.1 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem("formScriptLoaded");

    if (!alreadyLoaded) {
      sessionStorage.setItem("formScriptLoaded", "true");
      window.location.reload();
    }

    const script = document.createElement("script");
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => console.log("VismeForms script loaded successfully.");
    script.onerror = (e) => console.error("Error loading form script", e);

    return () => {
      sessionStorage.removeItem("formScriptLoaded");
      console.log("Contact page unmounted - formScriptLoaded removed.");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-normal text-gray-700 mb-6 text-center">
            
          </h2>

          {isVisible && (
            <>
              

              <div className="flex justify-center mb-10 mt-20">
                <span className="loader"></span>
              </div>

              <style jsx>{`
                .loader {
                  color: rgb(30, 41, 185);
                  font-size: 45px;
                  text-indent: -9999em;
                  overflow: hidden;
                  width: 1em;
                  height: 1em;
                  border-radius: 50%;
                  position: relative;
                  transform: translateZ(0);
                  animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
                }

                @keyframes mltShdSpin {
                  0% {
                    box-shadow: 0 -0.83em 0 -0.4em,
                      0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
                      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
                  }
                  100% {
                    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em,
                      0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em,
                      0 -0.83em 0 -0.477em;
                  }
                }

                @keyframes round {
                  0% { transform: rotate(0deg) }
                  100% { transform: rotate(360deg) }
                }
              `}</style>
            </>
          )}

          {/* Subtext */}
          <p className="text-center text-lg font-semibold text-blue-600 mt-6">
            Submit your details now and watch something fun...! 🤩
          </p>

          {/* VismeForms Contact Form */}
          <div
            className="visme_d"
            data-title="Contact Us Form"
            data-url="0191j64r-contact-us-form"
            data-domain="forms"
            data-full-page="false"
            data-min-height="500px"
            data-form-id="113047"
          ></div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
