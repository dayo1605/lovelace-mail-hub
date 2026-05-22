import { createFileRoute } from "@tanstack/react-router";
import webmailImg from "@/assets/webmail.jpg";
import controlPanelImg from "@/assets/controlpanel.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "deewhy.ng — Business Email Hosting in Nigeria" },
      {
        name: "description",
        content:
          "Branded business email hosting (you@yourcompany.com) with a self-serve control panel and Roundcube webmail. Built for Nigerian companies.",
      },
      { property: "og:title", content: "deewhy.ng — Business Email Hosting in Nigeria" },
      {
        property: "og:description",
        content:
          "Reliable corporate email hosting with admin control panel and Roundcube webmail.",
      },
    ],
  }),
  component: Index,
});

function Logo() {
  return (
    <a href="/" className="text-lg font-semibold tracking-tight text-foreground">
      deewhy<span className="text-primary">.ng</span>
    </a>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden gap-6 sm:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Infrastructure
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Pricing
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Contact
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://webmail.deewhy.ng"
            className="hidden text-sm font-medium text-muted-foreground px-3 sm:inline"
          >
            Webmail Login
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-1 ring-primary transition-transform hover:bg-primary-light active:scale-[0.98]"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Business email hosting for Nigerian enterprise.
            </h1>
            <p className="mt-6 text-pretty text-base text-muted-foreground sm:text-lg max-w-[56ch]">
              Professional, branded communication with local reliability. Secure your corporate
              identity with you@yourcompany.com, managed through a high-performance control panel
              with Roundcube webmail built in.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center rounded-md bg-primary py-2 pr-4 pl-3 text-sm font-medium text-primary-foreground ring-1 ring-primary transition-transform hover:bg-primary-light active:scale-[0.98]"
              >
                <div className="mr-2 size-4 shrink-0 rounded-full border border-white/20 bg-white/10" />
                Claim your domain
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center rounded-md bg-surface py-2 px-4 text-sm font-medium text-foreground ring-1 ring-border transition-transform hover:bg-surface-muted active:scale-[0.98]"
              >
                See how it works
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <img
                src={webmailImg}
                alt="Roundcube webmail interface preview"
                width={1200}
                height={896}
                className="aspect-[4/3] w-full rounded-xl object-cover bg-surface-muted outline-1 -outline-offset-1 outline-black/5 ring-1 ring-black/5"
              />
              <div className="absolute -bottom-6 -left-6 hidden w-48 rounded-lg border border-border bg-surface p-4 ring-1 ring-black/5 lg:block">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" />
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Server Status
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-foreground">99.9% Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      title: "Admin Control Panel",
      body: "Full visibility over your mail server. Create users, reset passwords, manage aliases and quotas from a single dashboard.",
      shape: "rounded-sm",
    },
    {
      title: "Roundcube Webmail",
      body: "Access your email from any browser with a clean, standard-compliant interface designed for business productivity.",
      shape: "rounded-full",
    },
    {
      title: "Anti-Spam & Security",
      body: "Multi-layer anti-spam and antivirus filtering with SPF, DKIM and DMARC so your inbox stays focused on business.",
      shape: "border-b-2",
    },
    {
      title: "Branded Domain Email",
      body: "Send and receive from you@yourcompany.com. Set up unlimited aliases like sales@, info@ or support@.",
      shape: "rounded-sm",
    },
    {
      title: "Generous Storage",
      body: "Scalable per-mailbox storage so important attachments and history stay where your team can find them.",
      shape: "rounded-full",
    },
    {
      title: "Seamless Migration",
      body: "Our team handles the move from Gmail, Outlook or legacy hosts so your business never misses a message.",
      shape: "border-b-2",
    },
  ];
  return (
    <section id="features" className="bg-surface-muted py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Infrastructure & Tools
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground max-w-[48ch]">
            Reliable communication services built on industry-standard protocols and localized
            server architecture.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-border bg-surface p-8 ring-1 ring-black/5"
            >
              <div className="size-8 rounded-lg bg-accent flex items-center justify-center text-primary mb-6">
                <div className={`size-4 shrink-0 border-2 border-current ${it.shape}`} />
              </div>
              <h3 className="text-lg font-medium text-foreground">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Provision Domain",
      body: "Connect your existing .ng or .com domain, or register a new identity through our gateway.",
    },
    {
      title: "Configure Mailboxes",
      body: "Create departmental addresses like sales@ or info@ with custom storage quotas per user.",
    },
    {
      title: "Full Migration Support",
      body: "Our team handles the transition from legacy providers to ensure zero downtime for your team.",
    },
  ];
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
          <div>
            <img
              src={controlPanelImg}
              alt="Email hosting admin control panel"
              loading="lazy"
              width={1024}
              height={800}
              className="aspect-[5/4] w-full rounded-xl object-cover bg-surface-muted outline-1 -outline-offset-1 outline-black/5 ring-1 ring-black/5"
            />
          </div>
          <div className="lg:pl-8">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Localized Governance
            </h2>
            <div className="mt-10 space-y-10">
              {steps.map((s, i) => (
                <div key={s.title} className="flex gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-[13px] font-medium text-background">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-foreground">{s.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground text-pretty max-w-[40ch]">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="bg-surface-muted py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Simple, predictable billing
          </h2>
          <p className="mx-auto mt-4 text-muted-foreground max-w-[48ch]">
            Local pricing tailored for Nigerian growth, with no hidden currency fluctuation risks.
          </p>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <PricingCard
            tier="Starter"
            price="₦2,500"
            features={["Up to 5 Mailboxes", "10GB Total Storage", "Standard Control Panel", "Roundcube Webmail"]}
          />
          <PricingCard
            tier="Professional"
            price="₦7,500"
            highlighted
            features={[
              "Up to 25 Mailboxes",
              "100GB Total Storage",
              "Advanced SPAM Protection",
              "Priority Nigerian Support",
            ]}
          />
          <PricingCard
            tier="Enterprise"
            price="Contact Us"
            features={["Unlimited Mailboxes", "Custom Storage Limits", "Dedicated Mail Infrastructure", "SLA & onboarding"]}
            cta="Talk to Sales"
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  price,
  features,
  highlighted,
  cta,
}: {
  tier: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  cta?: string;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl p-8 ring-1 ${
        highlighted
          ? "border border-primary/20 bg-surface ring-primary/10 shadow-sm"
          : "border border-border bg-surface ring-black/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`text-sm font-semibold uppercase tracking-wider ${
            highlighted ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {tier}
        </h3>
        {highlighted && (
          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-primary">
            POPULAR
          </span>
        )}
      </div>
      <p className="mt-4 text-4xl font-medium tracking-tight text-foreground">
        {price}
        {price.startsWith("₦") && <span className="text-lg text-muted-foreground">/mo</span>}
      </p>
      <ul className="mt-8 space-y-4 border-t border-border pt-8">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="size-1 rounded-full bg-primary" /> {f}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className={`mt-8 w-full text-center rounded-md py-2 text-sm font-medium transition-colors ${
          highlighted
            ? "bg-primary text-primary-foreground ring-1 ring-primary hover:bg-primary-light"
            : "text-foreground ring-1 ring-border hover:bg-surface-muted"
        }`}
      >
        {cta ?? (highlighted ? "Get Started" : `Choose ${tier}`)}
      </a>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Ready to claim your company email?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Tell us your domain and team size — we'll provision your mailboxes and walk you through
          the control panel.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:hello@deewhy.ng"
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground ring-1 ring-primary hover:bg-primary-light"
          >
            hello@deewhy.ng
          </a>
          <a
            href="https://wa.me/2348000000000"
            className="inline-flex items-center rounded-md bg-surface px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-border hover:bg-surface-muted"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Reliable corporate email hosting infrastructure built for the Nigerian market.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Platform
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                <li>
                  <a href="https://webmail.deewhy.ng">Webmail</a>
                </li>
                <li>
                  <a href="https://panel.deewhy.ng">Control Panel</a>
                </li>
                <li>
                  <a href="#features">Features</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Company
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl bg-surface-muted p-6">
            <h4 className="text-sm font-medium text-foreground">Need assistance?</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Our local support team is available Monday to Friday, 8am – 5pm WAT.
            </p>
            <a
              href="mailto:support@deewhy.ng"
              className="mt-4 block text-sm font-medium text-primary"
            >
              support@deewhy.ng
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} deewhy.ng. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
