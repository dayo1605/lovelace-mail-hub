import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell } from "./signup";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — deewhy.ng" },
      { name: "description", content: "Sign in to your deewhy.ng account to manage your hosted email." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage your mail hostings.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
        )}
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</span>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" autoComplete="email" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Password</span>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" autoComplete="current-password" />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground ring-1 ring-primary hover:bg-primary-light disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          New to deewhy.ng?{" "}
          <Link to="/signup" className="font-medium text-primary">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  );
}
