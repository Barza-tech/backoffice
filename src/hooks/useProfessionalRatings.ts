import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const SB_URL = import.meta.env.VITE_SUPABASE_URL;
const SB_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;
const ACCESS_COOKIE = "sb-access-token";

const supabase = createClient(SB_URL, SB_ANON);

export type ProfessionalSpaceRating = {
  id: string;
  space_id: string;
  client_id: string;
  stars: number;
  comment: string | null;
  created_at: string;
  space_name?: string;
  client_full_name?: string;
};

export const useProfessionalSpaceRatings = () => {
  const [ratings, setRatings] = useState<ProfessionalSpaceRating[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRatings = useCallback(async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${ACCESS_COOKIE}=`))
        ?.split('=')[1];

      if (!token) throw new Error('Token de acesso não encontrado');

      // Select com relacionamento
      const { data, error } = await supabase
        .from('professional_space_ratings')
        .select(`
          *,
          space:professional_space(space_name),
          client:profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map para incluir as propriedades no objeto principal
      const mappedData = (data || []).map((item: any) => ({
        ...item,
        space_name: item.space?.space_name,
        client_full_name: item.client?.full_name,
      }));

      setRatings(mappedData);
    } catch (err) {
      console.error('Erro ao carregar avaliações:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  return { ratings, loading, refetch: fetchRatings };
};
