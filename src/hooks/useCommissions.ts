import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const SB_URL = import.meta.env.VITE_SUPABASE_URL;
const SB_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;
const ACCESS_COOKIE = "sb-access-token";

const supabase = createClient(SB_URL, SB_ANON);

export type Commission = {
  commission_id: string;
  amount: number;
  status: string;
  commission_created_at: string;
  booking_id: string;
  professional_space?: { space_name: string };
  comprovative?: string;
  adminComments?: string;
};

export const useCommissions = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCommissions = useCallback(async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${ACCESS_COOKIE}=`))
        ?.split('=')[1];

      if (!token) throw new Error('Token de acesso não encontrado');

      const { data, error } = await supabase.rpc('get_commissions_with_space', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (error) throw error;
      setCommissions(data || []);
    } catch (err) {
      console.error('Erro ao carregar comissões:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommissions();
  }, [fetchCommissions]);

  return { commissions, loading, refetch: fetchCommissions };
};
