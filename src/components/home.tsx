import { useLiveQuery } from "electric-sql/react";
import { useElectric } from "../hooks/useElectric";
import { useEffect } from "react";

export function Home() {
  const { db } = useElectric()!;
  const result = useLiveQuery(db.items.liveMany());

  useEffect(() => {
    const syncItems = async () => {
      // Resolves when the shape subscription has been established.
      const shape = await db.items.sync();

      console.log("Syncing items...");

      // Resolves when the data has been synced into the local database.
      await shape.synced;
      console.log("Synced items!");
    };

    syncItems();
  }, []);

  return <div className="home">{JSON.stringify(result)}</div>;
}
