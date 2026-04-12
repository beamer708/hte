import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Creating a Partnerships Program | @howtoerlc Guides",
  description: "How to build a partnerships program that grows your network with aligned, well-managed community agreements.",
};

export default function PartnershipsProgramPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="users-alt" className="text-xl" />
          </div>
          <h1 className="section-heading">Creating a Partnerships Program</h1>
          <p className="mt-3 text-muted-foreground">
            A partnerships program connects your ERLC community with other servers for mutual benefit. This guide covers how to build partnerships that add real value without creating administrative overhead.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Define What You Want from Partnerships">
            <p>Partnerships that exist only for vanity metrics (a long list of partners) do not benefit your community. Before accepting or seeking partners, define your goals:</p>
            <ul>
              <li><strong>Collaborative operations:</strong> Joint patrols, cross-department events, shared training exercises.</li>
              <li><strong>Member growth:</strong> Mutual server advertising to aligned audiences.</li>
              <li><strong>Resource sharing:</strong> Sharing design assets, guides, or operational frameworks with compatible communities.</li>
            </ul>
            <p>Your partnership criteria should follow from your goals. If you want collaborative operations, you need partners who are operational — not just large.</p>
          </Section>

          <Section title="2. Set Partnership Criteria">
            <p>Define minimum requirements before reviewing any partnership application:</p>
            <ul>
              <li>Minimum active membership count — not total members, but members who participate regularly.</li>
              <li>Operational compatibility — do they run similar department types or operate in a way that makes joint events viable?</li>
              <li>Conduct standards — do their rules and enforcement match your community's values?</li>
              <li>Stability — has the community been running for at least 30 to 60 days without significant leadership turnover?</li>
            </ul>
          </Section>

          <Section title="3. Create a Partnership Agreement">
            <p>Every partnership should have a documented agreement that both parties acknowledge:</p>
            <ul>
              <li>What each server is expected to provide — advertising posts, joint event participation, etc.</li>
              <li>How long the partnership lasts before review — typically 30, 60, or 90 days.</li>
              <li>What constitutes a violation of the agreement.</li>
              <li>How the partnership is dissolved if either party wants to end it.</li>
            </ul>
            <p>An agreement does not need to be a formal document — a written summary in a channel or DM thread is sufficient. The point is that both parties understand what they agreed to.</p>
          </Section>

          <Section title="4. Build a Partnership Application Process">
            <p>Manage inbound partnership requests through a structured process:</p>
            <ul>
              <li>Create a partnership application form or a standard set of questions for requests received via DM.</li>
              <li>Assign a staff member responsible for reviewing applications — do not let them pile up without review.</li>
              <li>Set a response timeline — acknowledge applications within 48 hours, even if the decision is still pending.</li>
              <li>Keep a log of all applications, accepted or denied, so you have a reference if the same server applies again.</li>
            </ul>
          </Section>

          <Section title="5. Maintain Partnerships Actively">
            <p>Partnerships that are accepted and then ignored waste the opportunity:</p>
            <ul>
              <li>Schedule at least one joint activity per partnership period — a shared patrol, a cross-server event, or a collaborative session.</li>
              <li>Conduct a brief review at the end of each partnership period. Did the partner fulfill their commitments? Did the partnership add measurable value?</li>
              <li>Do not renew partnerships that are inactive on both sides. Ending a partnership is not a conflict — it is operational maintenance.</li>
            </ul>
          </Section>

          <Section title="6. Dissolve Partnerships Professionally">
            <p>Partnerships end. Handle the process with the same professionalism you applied when establishing it:</p>
            <ul>
              <li>Notify the partner leadership directly and privately before removing partnership perks or announcements.</li>
              <li>Give a brief, factual reason for the dissolution — inactivity, change in direction, criteria no longer met.</li>
              <li>Remove partnership roles, channels, and advertisements promptly after dissolution.</li>
              <li>Do not post public commentary about why a partnership ended. Handle it internally.</li>
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
