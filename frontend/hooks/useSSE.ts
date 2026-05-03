"use client";

import { useEffect, useRef, useState } from "react";

export function useSSE(url: string | null) {
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const retryRef = useRef<number>(1000);

  useEffect(() => {
    if (!url) return;

    let source: EventSource | null = null;
    let cancelled = false;

    const connect = () => {
      if (cancelled) return;
      source = new EventSource(url);

      source.onopen = () => {
        setConnected(true);
        retryRef.current = 1000;
      };

      source.onmessage = (event) => {
        setMessages((prev) => [...prev, event.data]);
      };

      source.onerror = () => {
        setConnected(false);
        source?.close();
        const delay = Math.min(retryRef.current, 10000);
        retryRef.current *= 2;
        window.setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      cancelled = true;
      source?.close();
    };
  }, [url]);

  return { messages, connected };
}
