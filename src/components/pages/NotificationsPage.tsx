import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase"

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  metadata?: any;
  is_read: boolean;
  created_at: string;
};

export default function Notifications({ onCountChange }: { onCountChange?: (count: number) => void }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 5;

  useEffect(() => {
    fetchNotifications(0, true);

    // subscrição em tempo real
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications((prev) => {
            const updated = [newNotification, ...prev];
            const count = updated.filter((n) => !n.is_read).length;
            setUnreadCount(count);
            onCountChange?.(count);
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async (page: number, reset = false) => {
    const from = page * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error && data) {
      if (reset) {
        setNotifications(data);
      } else {
        setNotifications((prev) => [...prev, ...data]);
      }

      // controla se ainda há mais
      if (data.length < limit) {
        setHasMore(false);
      }

      const count = (reset ? data : [...notifications, ...data]).filter((n) => !n.is_read).length;
      setUnreadCount(count);
      onCountChange?.(count);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNotifications(nextPage);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Notificações</h2>

        {unreadCount > 0 && (
          <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto pr-2">
        {notifications.length === 0 ? (
          <p className="text-gray-500">Sem notificações</p>
        ) : (
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="p-3 rounded-lg shadow bg-white border flex flex-col"
              >
                <span className="font-semibold">{n.title}</span>
                <span className="text-gray-700">{n.message}</span>
                <span className="text-xs text-gray-400 mt-1">
                  {new Date(n.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasMore && notifications.length > 0 && (
        <button
          onClick={loadMore}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold py-2 rounded-lg"
        >
          Ver mais
        </button>
      )}
    </div>
  );
}

