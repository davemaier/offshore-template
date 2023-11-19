// wrapper.tsx
import { ReactNode, useEffect, useState } from "react";
import { insecureAuthToken } from "electric-sql/auth";
import { ElectricProvider } from "../hooks/useElectric";
import { ElectricDatabase, electrify } from "electric-sql/wa-sqlite";
import { Electric, schema } from "../generated/client";

export const ElectricWrapper = ({ children }: { children: ReactNode }) => {
  const [electric, setElectric] = useState<Electric>();

  useEffect(() => {
    const init = async () => {
      const config = {
        auth: {
          token: insecureAuthToken({ user_id: "dummy" }),
        },
        url: "ws://localhost:5133",
        debug: true,
      };
      const conn = await ElectricDatabase.init("electric.db", "");
      const electric = await electrify(conn, schema, config);

      setElectric(electric);
    };

    init();
  }, []);

  if (electric === undefined) {
    return null;
  }

  return <ElectricProvider db={electric}>{children}</ElectricProvider>;
};
