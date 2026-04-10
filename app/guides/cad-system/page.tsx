import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Setting Up a CAD System | Unity Vault Guides",
  description: "How to set up a Computer-Aided Dispatch system that supports organized, realistic ERLC operations.",
};

export default function CadSystemPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="computer" className="text-xl" />
          </div>
          <h1 className="section-heading">Setting Up a CAD System</h1>
          <p className="mt-3 text-muted-foreground">
            A Computer-Aided Dispatch (CAD) system adds structure and realism to ERLC operations. This guide covers how to select, configure, and integrate a CAD system into your department's workflow.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Understand What a CAD System Does">
            <p>A CAD system is a web-based tool that simulates the dispatch and records systems used by real emergency services:</p>
            <ul>
              <li><strong>Dispatch management:</strong> Logs active calls, assigns units, and tracks their status.</li>
              <li><strong>Records management:</strong> Stores civilian profiles, vehicle records, warrants, and incident reports.</li>
              <li><strong>Communication support:</strong> Gives dispatchers and officers a shared real-time view of active operations.</li>
            </ul>
            <p>CAD systems are optional but significantly improve the realism and organization of departments that run structured patrols and events.</p>
          </Section>

          <Section title="2. Choose a CAD Platform">
            <p>Several CAD systems are designed specifically for ERLC and FiveM-style communities:</p>
            <ul>
              <li><strong>Sonoran CAD:</strong> The most widely used. Offers a free tier with paid plans for advanced features. Supports custom departments, unit management, and API integrations.</li>
              <li><strong>Centralized CAD:</strong> A community-developed option with active support and ERLC-focused features.</li>
              <li><strong>Custom CAD:</strong> Some larger servers build internal tools. Only practical if you have development resources available.</li>
            </ul>
            <p>For most ERLC communities, Sonoran CAD's free tier is sufficient to begin. Evaluate paid features only after your team is actively using the system.</p>
          </Section>

          <Section title="3. Configure Your Department Structure">
            <p>Once your CAD is set up, configure it to match your actual department:</p>
            <ul>
              <li>Create departments that match your Discord server structure — police, fire, EMS, civilian.</li>
              <li>Add all active members with their correct ranks and call signs.</li>
              <li>Set up unit identifiers (unit numbers or call signs) that match what members use on radio.</li>
              <li>Configure penal codes or municipal codes relevant to your server's legal framework.</li>
            </ul>
          </Section>

          <Section title="4. Integrate CAD Into Operations">
            <p>A CAD system only adds value if members actually use it during operations:</p>
            <ul>
              <li>Require all members to log into CAD before going on duty during official patrols.</li>
              <li>Designate a dispatcher to manage the CAD board during events — do not expect officers to manage it while responding to calls.</li>
              <li>Set a standard procedure: unit receives call → accepts in CAD → reports on scene → closes call after resolution.</li>
              <li>Include CAD usage in your training program so all new members know how to use it before their first patrol.</li>
            </ul>
          </Section>

          <Section title="5. Use CAD Data for Operational Review">
            <p>CAD systems generate data that can improve your department's operations:</p>
            <ul>
              <li>Review call volume and response times after each patrol to identify bottlenecks.</li>
              <li>Check for units consistently operating without signing in — address the behavior directly.</li>
              <li>Use incident reports to identify recurring in-game locations or situations that need operational guidance.</li>
            </ul>
          </Section>

          <Section title="6. Maintain Your CAD Regularly">
            <p>CAD systems fall out of sync with your server's actual structure if not maintained:</p>
            <ul>
              <li>Update member records when members join, change rank, or leave.</li>
              <li>Archive old records rather than deleting them — historical data can be useful for pattern review.</li>
              <li>Assign a CAD administrator whose responsibility is keeping the system current. This should be a staff or command role, not a general member task.</li>
            </ul>
          </Section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/community-guides" className="btn-secondary">
            <Icon name="arrow-right" className="rotate-180 text-base" />
            All Guides
          </Link>
          <Link href="/resources" className="btn-ghost">
            <Icon name="book" className="text-base" />
            Resource Vault
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card/85 p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed [&_ul]:mt-2 [&_ul]:space-y-1.5 [&_ul]:pl-4 [&_ul]:list-disc [&_strong]:text-foreground/80 [&_strong]:font-medium">
        {children}
      </div>
    </div>
  );
}
