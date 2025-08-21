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

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // 1️⃣ Buscar notificações iniciais
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setNotifications(data);
      }
    };

    fetchNotifications();

    // 2️⃣ Subscrição em tempo real
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications((prev) => [newNotification, ...prev]);
        }
      )
      .subscribe();

    // 3️⃣ Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Notificações</h2>
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
  );
}
