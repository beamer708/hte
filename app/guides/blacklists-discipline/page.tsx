import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Blacklists and Disciplinary Action | Unity Guides",
  description: "How to handle blacklists and disciplinary action with consistency, documentation, and fairness.",
};

export default function BlacklistsDisciplinePage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="vault" className="text-xl" />
          </div>
          <h1 className="section-heading">Handling Blacklists and Disciplinary Action</h1>
          <p className="mt-3 text-muted-foreground">
            Disciplinary processes protect your community's quality and safety. This guide covers how to handle blacklists and disciplinary action in a way that is consistent, documented, and defensible.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Define Your Disciplinary Framework">
            <p>Before applying any discipline, you need a written framework that defines every level of action:</p>
            <ul>
              <li><strong>Verbal warning:</strong> Informal, not documented in the official log. Used for minor first-time violations.</li>
              <li><strong>Formal warning:</strong> Documented in the moderation log. Carries forward if the member reoffends.</li>
              <li><strong>Temporary suspension:</strong> Member is removed from operational roles or Discord for a defined period.</li>
              <li><strong>Demotion:</strong> Member loses rank. Used when a conduct issue is tied to rank-specific behavior.</li>
              <li><strong>Server ban:</strong> Member is removed from the Discord server entirely.</li>
              <li><strong>Blacklist:</strong> Member is permanently prohibited from rejoining. Applied for serious violations or repeated offenses.</li>
            </ul>
          </Section>

          <Section title="2. Document Every Action">
            <p>Undocumented discipline creates fairness disputes and inconsistency over time:</p>
            <ul>
              <li>Log every action above a verbal warning: member name, member ID, staff member who issued the action, date, rule violated, and action taken.</li>
              <li>Store logs in a private staff channel where all staff can view them. Do not keep discipline records only in one person's notes.</li>
              <li>If a member is banned or blacklisted, retain their record indefinitely. Members sometimes return under a different username.</li>
            </ul>
          </Section>

          <Section title="3. Apply Discipline Proportionally">
            <p>The discipline level should match the severity of the violation. Common calibration errors to avoid:</p>
            <ul>
              <li><strong>Over-disciplining:</strong> Banning a member for a first-time minor infraction destroys trust in your leadership.</li>
              <li><strong>Under-disciplining:</strong> Issuing informal warnings repeatedly for serious or escalating behavior signals that your rules are not enforced.</li>
              <li><strong>Inconsistency:</strong> Applying different discipline to different members for the same violation is the most damaging failure. It implies favoritism.</li>
            </ul>
            <p>When in doubt, check your log for how similar violations were handled previously and match the precedent.</p>
          </Section>

          <Section title="4. Manage Blacklists Carefully">
            <p>A blacklist is a permanent operational decision. It should not be issued impulsively:</p>
            <ul>
              <li>Define clearly which violations result in immediate blacklist — typically: doxxing, exploitation, severe harassment, credible threats.</li>
              <li>All other blacklists should follow a pattern of escalating discipline. A member who is blacklisted after a single formal warning will dispute the decision.</li>
              <li>Blacklists should require approval from at minimum two command members, not be issued unilaterally by a single moderator.</li>
              <li>Keep blacklisted member IDs in a permanent log. Discord usernames change; IDs do not.</li>
            </ul>
          </Section>

          <Section title="5. Build a Fair Appeals Process">
            <p>An appeals process protects both your community and the member being disciplined:</p>
            <ul>
              <li>Define clearly who can appeal: typically anyone who has received a formal warning, suspension, or ban.</li>
              <li>Set a waiting period before an appeal can be submitted — typically 48 to 72 hours after the decision.</li>
              <li>Assign a specific command member or appeals panel to review each appeal. The person who issued the original discipline should not be the sole reviewer.</li>
              <li>Communicate the outcome of every appeal to the member directly, regardless of the decision.</li>
            </ul>
          </Section>

          <Section title="6. Communicate Discipline Appropriately">
            <p>Discipline is not a public event:</p>
            <ul>
              <li>Never announce specific disciplinary actions in public channels. Naming a member and their violation publicly is humiliating, not corrective.</li>
              <li>If a high-profile member is removed, a brief neutral announcement is acceptable — "Member X is no longer part of the team" — without details.</li>
              <li>Respond to community speculation about discipline with a standard phrase and nothing more: "Disciplinary matters are handled privately."</li>
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
