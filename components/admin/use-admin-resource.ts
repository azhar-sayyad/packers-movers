"use client";

import { useCallback, useEffect, useState } from "react";

interface UseAdminResourceOptions<T> {
  apiPath: string;
  extract?: (data: Record<string, unknown>) => T[];
}

export function useAdminResource<T>({ apiPath, extract }: UseAdminResourceOptions<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiPath);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = (await res.json()) as Record<string, unknown>;
      const list = extract ? extract(data) : ((data.items as T[] | undefined) ?? []);
      setItems(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load records.");
    } finally {
      setLoading(false);
    }
  }, [apiPath, extract]);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  return { items, setItems, loading, error, reload: load };
}
