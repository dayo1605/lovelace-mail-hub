import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — deewhy.ng" },
      { name: "description", content: "Manage your hosted email accounts on deewhy.ng." },
    ],
  }),
  component: DashboardPage,
});

type Hosting = {
  id: string;
  plan: string;
  domain: string;
  mailbox_count: number;
  status: string;
  created_at: string;
};

type Profile = { full_name: string | null; company_name: string | null };

function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [hostings, setHostings] = useState<Hosting[]>([]);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate({ to: "/login" });
        return;
      }
      const userId = sessionData.session.user.id;
      setEmail(sessionData.session.user.email ?? null);

      const [{ data: prof }, { data: hosts }] = await Promise.all([
        supabase.from("profiles").select("full_name, company_name").eq("id", userId).maybeSingle(),
        supabase.from("hostings").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      ]);
      setProfile(prof ?? null);
      setHostings((hosts as Hosting[]) ?? []);
      setLoading(false);
    })();
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            deewhy<span className="text-primary">.ng</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">{email}</span>
            <button
              onClick={handleLogout}
              className="rounded-md px-3 py-1.5 text-sm ring-1 ring-border hover:bg-surface-muted"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}
            </h1>
            {profile?.company_name && (
              <p className="mt-1 text-sm text-muted-foreground">{profile.company_name}</p>
            )}
          </div>
          <Link
            to="/plans"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-1 ring-primary hover:bg-primary-light"
          >
            Add new hosting
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your mail hostings</h2>

          {hostings.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
              <p className="text-sm text-muted-foreground">You haven't set up any hosting yet.</p>
              <Link
                to="/plans"
                className="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-1 ring-primary hover:bg-primary-light"
              >
                Choose a plan
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {hostings.map((h) => (
                <div key={h.id} className="rounded-2xl border border-border bg-surface p-6 ring-1 ring-black/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h.plan}</p>
                      <p className="mt-1 text-lg font-medium">{h.domain}</p>
                    </div>
                    <StatusBadge status={h.status} />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {h.mailbox_count} mailbox{h.mailbox_count === 1 ? "" : "es"}
                  </p>
                  <div className="mt-6 flex gap-2">
                    <a
                      href="https://panel.deewhy.ng"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-md py-2 text-center text-sm font-medium ring-1 ring-border hover:bg-surface-muted"
                    >
                      Admin panel
                    </a>
                    <a
                      href="https://webmail.deewhy.ng"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-md bg-primary py-2 text-center text-sm font-medium text-primary-foreground ring-1 ring-primary hover:bg-primary-light"
                    >
                      Webmail
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "active";
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
        isActive ? "bg-accent text-primary" : "bg-surface-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}
