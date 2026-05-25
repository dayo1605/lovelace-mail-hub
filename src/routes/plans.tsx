import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Choose your plan — deewhy.ng" },
      { name: "description", content: "Pick a business email hosting plan and set up your domain." },
    ],
  }),
  component: PlansPage,
});

type Plan = { id: string; tier: string; price: string; mailboxes: number; features: string[]; highlighted?: boolean };

const PLANS: Plan[] = [
  { id: "starter", tier: "Starter", price: "₦2,500", mailboxes: 5, features: ["Up to 5 mailboxes", "10GB total storage", "Standard control panel", "Roundcube webmail"] },
  { id: "professional", tier: "Professional", price: "₦7,500", mailboxes: 25, highlighted: true, features: ["Up to 25 mailboxes", "100GB total storage", "Advanced spam protection", "Priority Nigerian support"] },
  { id: "enterprise", tier: "Enterprise", price: "Contact", mailboxes: 100, features: ["Unlimited mailboxes", "Custom storage", "Dedicated infrastructure", "SLA & onboarding"] },
];

function PlansPage() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [domain, setDomain] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/login" });
        return;
      }
      setAuthChecked(true);
    });
  }, [navigate]);

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPlan) return;
    setSubmitting(true);
    setError(null);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setSubmitting(false);
      navigate({ to: "/login" });
      return;
    }
    const { error } = await supabase.from("hostings").insert({
      user_id: userData.user.id,
      plan: selectedPlan.tier,
      domain: domain.trim().toLowerCase(),
      mailbox_count: selectedPlan.mailboxes,
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/dashboard" });
  }

  if (!authChecked) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            deewhy<span className="text-primary">.ng</span>
          </Link>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
            My dashboard
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight">Pick a plan to get started</h1>
          <p className="mt-3 text-muted-foreground">Choose the package that fits your team. You'll confirm your domain on the next step, then proceed to payment.</p>
        </div>

        {!selectedPlan ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.id}
                className={`flex flex-col rounded-2xl border p-8 ring-1 ${
                  p.highlighted ? "border-primary/20 bg-surface ring-primary/10" : "border-border bg-surface ring-black/5"
                }`}
              >
                <h3 className={`text-sm font-semibold uppercase tracking-wider ${p.highlighted ? "text-primary" : "text-muted-foreground"}`}>
                  {p.tier}
                </h3>
                <p className="mt-4 text-4xl font-medium tracking-tight">
                  {p.price}
                  {p.price.startsWith("₦") && <span className="text-lg text-muted-foreground">/mo</span>}
                </p>
                <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="size-1 rounded-full bg-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(p)}
                  className={`mt-8 rounded-md py-2.5 text-sm font-medium transition-colors ${
                    p.highlighted
                      ? "bg-primary text-primary-foreground ring-1 ring-primary hover:bg-primary-light"
                      : "ring-1 ring-border hover:bg-surface-muted"
                  }`}
                >
                  Choose {p.tier}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="max-w-lg rounded-2xl border border-border bg-surface p-8 ring-1 ring-black/5">
            <h2 className="text-xl font-semibold">Confirm {selectedPlan.tier}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{selectedPlan.price}{selectedPlan.price.startsWith("₦") && "/mo"} · {selectedPlan.mailboxes} mailboxes</p>
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Your domain</span>
                <input
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="yourcompany.com"
                  className="auth-input"
                />
              </label>
              {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 rounded-md py-2.5 text-sm font-medium ring-1 ring-border hover:bg-surface-muted"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground ring-1 ring-primary hover:bg-primary-light disabled:opacity-50"
                >
                  {submitting ? "Saving…" : "Continue to payment"}
                </button>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Payment processing will be enabled in the next step.
              </p>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
