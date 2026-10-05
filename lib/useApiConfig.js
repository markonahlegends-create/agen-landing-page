'use client';

import { useEffect, useState } from 'react';

export default function useApiConfig() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then(setConfig)
      .catch(() => setConfig({ demoMode: true }));
  }, []);

  return config;
}
