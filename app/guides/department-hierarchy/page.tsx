import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Department Hierarchy | @howtoerlc Guides",
  description: "How to structure your ERLC department hierarchy for clarity, accountability, and scalable growth.",
};

export default function DepartmentHierarchyPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="layers" className="text-xl" />
          </div>
          <h1 className="section-heading">How to Structure Your ERLC Department Hierarchy</h1>
          <p className="mt-3 text-muted-foreground">
            A clear department hierarchy defines authority, accountability, and reporting lines within your ERLC community. This guide covers how to design one that scales without creating confusion.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Define Your Department Model">
            <p>Decide how many departments your server needs before assigning any ranks. Common ERLC department models include:</p>
            <ul>
              <li><strong>Single-department:</strong> One unified law enforcement or emergency services group. Best for smaller servers (under 50 active members).</li>
              <li><strong>Multi-department:</strong> Separate divisions for police, fire, EMS, civilian, and government. Requires more coordination but enables specialization.</li>
              <li><strong>Hybrid:</strong> A core department with sub-units. For example, a police department with a separate detective division.</li>
            </ul>
            <p>Start smaller than you think you need. Merging departments is easier than splitting them later.</p>
          </Section>

          <Section title="2. Establish Rank Tiers">
            <p>Every department needs a vertical rank structure. Organize ranks into three clear tiers:</p>
            <ul>
              <li><strong>Enlisted ranks:</strong> Entry-level members with limited authority. Examples: Cadet, Recruit, Probationary Officer.</li>
              <li><strong>Officer ranks:</strong> Active members who handle day-to-day operations and can direct enlisted members. Examples: Officer, Corporal, Sergeant.</li>
              <li><strong>Command ranks:</strong> Leadership responsible for policy, training, and department direction. Examples: Lieutenant, Captain, Chief.</li>
            </ul>
            <p>Limit rank tiers to what you can realistically fill. Five to seven ranks is sufficient for most servers.</p>
          </Section>

          <Section title="3. Assign Authority and Responsibilities">
            <p>Each rank tier must have defined authority — what they can and cannot do. Document this clearly:</p>
            <ul>
              <li>Enlisted members follow orders, do not issue directives to peers.</li>
              <li>Officer ranks can direct enlisted, approve minor decisions, and lead patrols.</li>
              <li>Command ranks set policy, approve promotions, and handle appeals.</li>
            </ul>
            <p>Avoid rank authority gaps — situations where no one has authority to make a decision. Assign a default decision-maker for each scenario.</p>
          </Section>

          <Section title="4. Map Department Interdependencies">
            <p>If you have multiple departments, define how they interact:</p>
            <ul>
              <li>Which departments can issue cross-department orders, and in what circumstances?</li>
              <li>Who coordinates multi-department responses during events?</li>
              <li>How are disputes between departments escalated?</li>
            </ul>
            <p>Create a simple chain of command document. A text-based org chart shared in your Discord is more effective than a complex graphic.</p>
          </Section>

          <Section title="5. Plan for Growth and Change">
            <p>A hierarchy that cannot adapt will create structural problems as your server grows:</p>
            <ul>
              <li>Build in promotion review intervals — monthly or bi-weekly evaluations prevent stagnation.</li>
              <li>Reserve command roles until you have members qualified to fill them. An empty rank creates confusion.</li>
              <li>Document every structural change with a dated announcement. Members need to understand why the hierarchy changed, not just that it did.</li>
            </ul>
          </Section>

          <Section title="6. Communicate the Structure to Members">
            <p>A hierarchy only functions if members understand it:</p>
            <ul>
              <li>Publish a rank guide in a pinned Discord channel — rank name, role color, responsibilities.</li>
              <li>Include hierarchy structure in your onboarding material for new members.</li>
              <li>Revisit and update documentation after any structural change.</li>
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
