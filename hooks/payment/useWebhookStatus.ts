import { useEffect, useState } from "react";

export function useWebhookStatus() {
  const [webhookStatus, setWebhookStatus] = useState(false);

  useEffect(() => {
    const checkWebhookStatus = async () => {
      try {
        const response = await fetch("/api/webhook");
        const data = await response.json();
        setWebhookStatus(data.status === "running");
      } catch (error) {
        console.error("Error checking webhook status:", error);
        setWebhookStatus(false);
      }
    };
    checkWebhookStatus();
    const interval = setInterval(checkWebhookStatus, 1200000);
    return () => clearInterval(interval);
  }, []);
  return webhookStatus;
}
