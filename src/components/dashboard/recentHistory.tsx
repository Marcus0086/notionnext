"use client";

import { useEffect, useState } from "react";

import ActivityLogger, { Activity } from "@/lib/logger";
import { IconsFactory } from "@/lib/factories/icon";

import { Icons } from "@/types";

const Actions = {
  create_site: "create",
  delete_site: "delete",
  update_site: "update",
  publish_site: "publish",
};

const HistoryCard = ({ activity }: { activity: Activity }) => {
  const action = Actions[activity.action] as Icons;
  const Icon = IconsFactory.getIcon(action);
  return (
    <li className="text-white rounded-xl drop-shadow-xl">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2 justify-center">
          <Icon className="w-6 h-6 mr-2" />
          <div>
            <p className="text-sm">{activity.details.data.log}</p>
            <p className="text-xs text-gray-400">
              {activity.timestamp.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

const RecentHistory = () => {
  const [activityHistory, setActivityHistory] = useState<Activity[]>([]);
  const [loggedHistory, setLoggedHistory] = useState<Activity[]>([]);
  const [page, setPage] = useState(0);
  const pageSize = 6;

  useEffect(() => {
    if (document) {
      const history = [...ActivityLogger.getHistory(localStorage)].reverse();
      setLoggedHistory(history);
      const newHistory = history.slice(0, pageSize);
      setActivityHistory(newHistory);
    }
  }, []);

  const handlePageChange = (page: number) => {
    if (page < 0) {
      return;
    }
    if (page * pageSize > loggedHistory.length) {
      return;
    }
    if (document) {
      const newHistory = loggedHistory.slice(
        page * pageSize,
        page * pageSize + pageSize
      );
      setActivityHistory(newHistory);
      setPage(page);
    }
  };
  return (
    <div className="px-16 py-4 bg-navy-900 dark:bg-navy-800 rounded-3xl drop-shadow-xl min-h-[600px]">
      <div className="antialiased mx-auto">
        <div className="text-center text-white text-xl">Recent History</div>
        <ul className="flex items-start justify-between flex-col mt-4 gap-4">
          {activityHistory.length > 0 ? (
            activityHistory.map((activity, index) => (
              <HistoryCard key={index} activity={activity} />
            ))
          ) : (
            <p className="text-white text-center text-3xl">
              No recent activity
            </p>
          )}
        </ul>
      </div>
      {loggedHistory.length > pageSize &&
      page * pageSize < loggedHistory.length ? (
        <div className="flex justify-center items-center mt-4 gap-12">
          <button
            disabled={page === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default RecentHistory;
