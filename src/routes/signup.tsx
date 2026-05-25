import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — deewhy.ng" },
      { name: "description", content: "Sign up to claim business email hosting on deewhy.ng." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/plans`,
        data: { full_name: fullName, company_name: companyName },
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/plans" });
  }

  return (
    <AuthShell title="Create your account" subtitle="Start hosting branded company email in minutes.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
        )}
        <Field label="Full name">
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="auth-input"
            autoComplete="name"
          />
        </Field>
        <Field label="Company name">
          <input
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="auth-input"
            autoComplete="organization"
          />
        </Field>
        <Field label="Work email">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            autoComplete="email"
          />
        </Field>
        <Field label="Password">
          <input
            required
            type="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            autoComplete="new-password"
          />
        </Field>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground ring-1 ring-primary hover:bg-primary-light disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary">Sign in</Link>
        </p>
      </form>
    </AuthShell>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            deewhy<span className="text-primary">.ng</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto flex max-w-md flex-col px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
