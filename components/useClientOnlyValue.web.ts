import React, { startTransition } from "react";

export function useClientOnlyValue<S, C>(server: S, client: C): S | C {
  const [value, setValue] = React.useState<S | C>(server);
  React.useEffect(() => {
    startTransition(() => {
      setValue(client);
    });
  }, [client]);

  return value;
}
