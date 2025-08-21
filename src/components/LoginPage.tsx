import React, { useState } from 'react';
import { Scissors, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Cookies from 'js-cookie';
// import supabase from '../utils/supabase'; // Importa o cliente Supabase se necessário
import supabase from '@utils/supabase'; // Importa o cliente Supabase

interface LoginPageProps {
  onLogin: (userData: any) => void;
}

const SB_URL = import.meta.env.VITE_SUPABASE_URL;
const SB_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

// nomes dos cookies (podes ajustar)
const ACCESS_COOKIE = 'sb-access-token';
const REFRESH_COOKIE = 'sb-refresh-token';

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@barza.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // 1) LOGIN (REST Auth)
      const resp = await fetch(`${SB_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SB_ANON,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const authData = await resp.json();
      if (!resp.ok) {
        // Supabase pode devolver error_description / msg
        const msg =
          authData?.error_description ||
          authData?.msg ||
          'Credenciais inválidas.';
        throw new Error(msg);
      }

      const {
        access_token,
        refresh_token,
        user,           // <- tem o id do utilizador
        expires_in,
        expires_at,
      } = authData;

      if (!access_token || !user?.id) {
        throw new Error('Resposta de autenticação incompleta.');
      }

      // 2) Guardar tokens em cookies (frontend)
      // Em produção ideal é HTTP-only (via backend). Aqui é frontal para cumprir o teu requisito.
      const secure = window.location.protocol === 'https:';
      const maxAgeDays = 7; // ajusta conforme queiras

      Cookies.set(ACCESS_COOKIE, access_token, {
        expires: maxAgeDays,
        sameSite: 'lax',
        secure,
        path: '/',
      });

      if (refresh_token) {
        Cookies.set(REFRESH_COOKIE, refresh_token, {
          expires: maxAgeDays,
          sameSite: 'lax',
          secure,
          path: '/',
        });
      }

      // (Opcional) 2.1 Sincronizar o supabase-js com a sessão actual
      try {
        await supabase.auth.setSession({ access_token, refresh_token });
      } catch {
        // não é crítico se falhar
      }

      // 3) Buscar PROFILE (REST)
      const profileResp = await fetch(
        `${SB_URL}/rest/v1/profiles?id=eq.${user.id}`,
        {
          method: 'GET',
          headers: {
            'apikey': SB_ANON,
            'Authorization': `Bearer ${access_token}`,
            'Accept': 'application/json',
          },
        }
      );

      if (!profileResp.ok) {
        // limpar cookies em caso de erro
        Cookies.remove(ACCESS_COOKIE, { path: '/' });
        Cookies.remove(REFRESH_COOKIE, { path: '/' });
        throw new Error('Não foi possível carregar o perfil.');
      }

      const profileList = await profileResp.json();
      const profile = Array.isArray(profileList) ? profileList[0] : profileList;

      if (!profile) {
        Cookies.remove(ACCESS_COOKIE, { path: '/' });
        Cookies.remove(REFRESH_COOKIE, { path: '/' });
        throw new Error('Perfil não encontrado.');
      }

      // 4) Verificar role
      if (profile.role_profile !== 'admin') {
        Cookies.remove(ACCESS_COOKIE, { path: '/' });
        Cookies.remove(REFRESH_COOKIE, { path: '/' });
        throw new Error('Acesso negado. Apenas administradores podem entrar.');
      }

      // 5) Login OK → entregar dados ao app
      onLogin({
        id: profile.id,
        name: profile.full_name || 'Administrador',
        email: profile.email || email,
        role: profile.role_profile,
        token: access_token,
        expires_in,
        expires_at,
        avatar_url: profile.avatar_url ?? null,
      });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Erro inesperado no login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Scissors className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Barza Admin</h1>
            <p className="text-gray-600">Acesse o painel administrativo</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="seu.email@barza.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
