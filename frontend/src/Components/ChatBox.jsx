import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const BotpressWidget = () => {
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  useEffect(() => {
    // Inject external Botpress scripts when the component mounts
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v2/inject.js';
    injectScript.async = true;
    document.body.appendChild(injectScript);

    const configScript = document.createElement('script');
    configScript.src = 'https://mediafiles.botpress.cloud/26a83f89-ace1-4045-92ba-95b836f75669/webchat/v2/config.js';
    configScript.async = true;
    document.body.appendChild(configScript);

    // Cleanup scripts on component unmount
    return () => {
      document.body.removeChild(injectScript);
      document.body.removeChild(configScript);
    };
  }, []);

  return (
    // <div>
    //   {/* Button to toggle visibility */}
    //   <button
    //     className="btn btn-secondary mb-2"
    //     onClick={() => setIsVisible(!isVisible)}
    //   >
    //     {isVisible ? 'Hide Widget' : 'Show Widget'}
    //   </button>

    //   {/* Conditionally render the widget based on isVisible */}
    //   {isVisible && (
    //     <div className="d-flex gap-2 fixed-bottom m-3">
    //       <button className="btn btn-primary" onClick={() => botpress.open()}>
    //         Open
    //       </button>
    //       <button className="btn btn-primary" onClick={() => botpress.close()}>
    //         Close
    //       </button>
    //       <button className="btn btn-primary" onClick={() => botpress.toggle()}>
    //         Toggle
    //       </button>
    //       <button
    //         className="btn btn-primary"
    //         onClick={() =>
    //           botpress.config({
    //             configuration: {
    //               botName: 'New Webchat Title',
    //               botDescription: 'Updated description',
    //             },
    //           })
    //         }
    //       >
    //         Configure
    //       </button>
    //       <button
    //         className="btn btn-primary"
    //         onClick={() =>
    //           botpress.sendEvent({
    //             type: 'event-sent', // This is an arbitrary event type
    //           })
    //         }
    //       >
    //         Send Event
    //       </button>
    //       <button className="btn btn-primary" onClick={() => botpress.sendMessage('Hi! My name is John.')}>
    //         Send Message
    //       </button>
    //     </div>
    //   )}
    // </div>
    <div></div>
  );
};

export default BotpressWidget;
