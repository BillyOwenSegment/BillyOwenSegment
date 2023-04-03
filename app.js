function generatePayload(methodName, eventName, eventProperties) {
    let payload = {
        type: methodName,
        name: eventName,
        properties: eventProperties
    };

    return JSON.stringify(payload, null, 2);
}

document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.getElementById("event-form");
    const previewButton = document.getElementById("preview-event");
    const eventPreview = document.getElementById("event-preview");

    eventForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const writeKey = document.getElementById("write-key").value;
        const methodName = document.getElementById("method").value;
        const eventName = document.getElementById("event-name").value;
        const eventPropertiesRaw = document.getElementById("event-properties").value;
        
        let eventProperties = {};
        if (eventPropertiesRaw) {
            try {
                eventProperties = JSON.parse(eventPropertiesRaw);
            } catch (error) {
                alert("Invalid JSON for event properties.");
                return;
            }
        }

        // Initialize the analytics.js library with the provided write key
        analytics.load(writeKey);

        // Call the selected Segment method
        switch (methodName) {
            case "page":
                analytics.page(eventName, eventProperties);
                break;
            case "track":
                analytics.track(eventName, eventProperties);
                break;
            case "identify":
                analytics.identify(eventName, eventProperties);
                break;
            case "alias":
                analytics.alias(eventName);
                break;
            case "reset":
                analytics.reset();
                break;
            default:
                alert("Invalid method selected.");
                return;
        }

        alert("Event sent successfully!");
    });

    previewButton.addEventListener("click", () => {
        const methodName = document.getElementById("method").value;
        const eventName = document.getElementById("event-name").value;
        const eventPropertiesRaw = document.getElementById("event-properties").value;
        
        let eventProperties = {};
        if (eventPropertiesRaw) {
            try {
                eventProperties = JSON.parse(eventPropertiesRaw);
            } catch (error) {
                alert("Invalid JSON for event properties.");
                return;
            }
        }

        const payload = generatePayload(methodName, eventName, eventProperties);
        eventPreview.innerHTML = `<pre>${payload}</pre>`;
    });
});
