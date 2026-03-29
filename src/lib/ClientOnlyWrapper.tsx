import { useEffect, useState } from "react";

export default function ClientOnlyWrapper({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (isMounted) return <>{children}</>;
  else return null;
}
