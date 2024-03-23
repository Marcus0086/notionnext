type Action = "create_site" | "update_site" | "delete_site" | "publish_site";

interface Details<T> {
  data: T;
}

export interface Activity {
  action: Action;
  details: Details<Record<string, string>>;
  timestamp: Date;
}

class ActivityLogger {
  static logActivity(action: Action, details: Details<Record<string, string>>) {
    const localHistory = localStorage.getItem("userHistory");
    const currentHistory: any[] = localHistory ? JSON.parse(localHistory) : [];
    const activity: Activity = {
      action,
      details,
      timestamp: new Date(),
    };
    currentHistory.push(activity);
    localStorage.setItem("userHistory", JSON.stringify(currentHistory));
  }

  static createSite(details: Details<Record<string, string>>) {
    ActivityLogger.logActivity("create_site", details);
  }

  static deleteSite(details: Details<Record<string, string>>) {
    ActivityLogger.logActivity("delete_site", details);
  }

  static updateSite(details: Details<Record<string, string>>) {
    ActivityLogger.logActivity("update_site", details);
  }

  static publishSite(details: Details<Record<string, string>>) {
    ActivityLogger.logActivity("publish_site", details);
  }

  static getHistory(localStorage: Storage) {
    const localHistory = localStorage.getItem("userHistory");
    return localHistory ? (JSON.parse(localHistory) as Activity[]) : [];
  }
}

export default ActivityLogger;
