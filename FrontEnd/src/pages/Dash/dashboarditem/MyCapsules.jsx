import { useEffect, useState } from "react";
import Filter from "../../components/myCapsules/Filter";
import useData, { userData } from "../../context/useData";

import { getPrivateCapsules } from "../../backend/privateFns";
import { getUser } from "../../backend/userFns";

import StatusBox from "../../components/myCapsules/StatusBox";
import { format, addDays, isPast, isFuture } from "date-fns";

import SingleCapsule from "../../components/myCapsules/SingleCapsule";
import { isPrimaryPointer } from "framer-motion";

function MyCapsules() {
  const [filter, setFilter] = useState("all");
  const [locked, setLocked] = useState([]);
  const [unlocked, setUnlocked] = useState([]);
  const [privateCap, setPrivateCap] = useState([]);

  const fetchPrivate = async () => {
    const res = await getUser();
    const r = await getPrivateCapsules(String(res.id));
    setLocked(r.locked_capsule);
    setUnlocked(r.unlocked_capsule);

    console.log(r);
  };
  useEffect(() => {
    fetchPrivate();
  }, []);

  const filterTypes = [
    {
      id: "all",
      label: "All",
      count: Number(locked?.length) + Number(unlocked?.length) || 0,
    },
    {
      id: "locked",
      label: "Locked",
      count: locked?.length || 0,
    },
    {
      id: "unlocked",
      label: "Unlocked",
      count: unlocked?.length || 0,
    },
  ];
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "Invalid Date";
    }
  };

  const getFileCount = (capsule) => {
    const imageCount = capsule.image?.length || 0;
    const hasMessage = capsule.message ? 1 : 0;
    const total = imageCount + hasMessage;
    return total === 0 ? "Empty" : total === 1 ? "1 item" : `${total} items`;
  };

  return (
    <>
      <main className="w-full  h-200">
        <div className="flex flex-col">
          <div className="w-full">
            <Filter
              filter={filter}
              setFilter={setFilter}
              filterTypes={filterTypes}
            />
          </div>
          <div className="flex flex-col-reverse xl:flex-row mt-5 px-5 gap-5 text-center items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full h-fit">
              2
              {locked.map((capsule) => {
                const canOpen =
                  capsule.opening_date && isPast(capsule.opening_date);
                return (
                  <SingleCapsule
                    capsule={capsule}
                    canOpen={canOpen}
                    formatDate={formatDate}
                  />
                );
              })}
              {unlocked.map((capsule) => {
                const canOpen =
                  capsule.opening_date && isPast(capsule.opening_date);
                return (
                  <SingleCapsule
                    capsule={capsule}
                    canOpen={canOpen}
                    formatDate={formatDate}
                  />
                );
              })}
            </div>

            <StatusBox locked={locked} unlocked={unlocked} />
          </div>
        </div>
      </main>
    </>
  );
}

export default MyCapsules;
