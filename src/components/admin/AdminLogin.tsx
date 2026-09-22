import { useState } from 'react';
import { X, Lock, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { setAdminLoggedIn } from '../../services/storageService';
import { BrandLogo } from '../BrandLogo';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function AdminLogin({ onSuccess, onCancel }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Credentials strictly requested by user: admin / admin@321
      if (username.trim() === 'admin' && password === 'admin@321') {
        setAdminLoggedIn(true);
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        setError('Galat Username ya Password! Baraye meherbani sahi credentials enter karein.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Yellow Glow */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Close/Back to Store button */}
      <button
        onClick={onCancel}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-yellow-400 transition-all text-xs font-bold cursor-pointer"
      >
        <X className="w-4 h-4" />
        <span>Back to Store</span>
      </button>

      <div className="w-full max-w-md bg-neutral-900 border-2 border-yellow-400/70 rounded-3xl p-8 shadow-2xl relative z-10">
        
        {/* Header with Logo */}
        <div className="text-center space-y-3 mb-8">
          <div className="flex justify-center">
            <div className="p-3 bg-white rounded-2xl shadow-md border border-neutral-700">
              <BrandLogo showText={false} imageClassName="h-10 w-auto" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black text-white font-display tracking-tight flex items-center justify-center gap-2">
              <Lock className="w-5 h-5 text-yellow-400" />
              <span>Admin Portal</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              ilovetshirts.store • Management Console
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/80 border border-red-500 text-red-300 text-xs flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-neutral-950 border border-neutral-700 focus:border-yellow-400 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
              autoFocus
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-yellow-400 hover:underline cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-neutral-950 border border-neutral-700 focus:border-yellow-400 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
            />
          </div>

          {/* Quick Credential Hint for convenience */}
          <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
            <div className="flex items-center justify-between">
              <span>Username:</span>
              <code className="text-yellow-400 font-mono font-bold">admin</code>
            </div>
            <div className="flex items-center justify-between">
              <span>Password:</span>
              <code className="text-yellow-400 font-mono font-bold">admin@321</code>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-extrabold text-sm tracking-wider flex items-center justify-center gap-2 border-2 border-yellow-500 shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>LOGIN TO DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security badge */}
        <div className="mt-6 pt-4 border-t border-neutral-800 text-center flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secure Session • Store Administration</span>
        </div>

      </div>
    </div>
  );
}
