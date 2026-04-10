import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Rank and Promotion System | Unity Vault Guides",
  description: "How to build a rank and promotion system that is transparent, merit-based, and easy to maintain.",
};

export default function RankPromotionPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="arrow-trend-up" className="text-xl" />
          </div>
          <h1 className="section-heading">Building a Rank and Promotion System</h1>
          <p className="mt-3 text-muted-foreground">
            A promotion system gives members a clear path forward and gives leadership a structured way to recognize performance. This guide covers how to build one that is merit-based, transparent, and sustainable.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Define What Promotion Means in Your Server">
            <p>Before setting up a system, decide what promotion represents in your community:</p>
            <ul>
              <li><strong>Performance-based:</strong> Members earn promotions through demonstrated skill, reliability, and conduct.</li>
              <li><strong>Time-based:</strong> Members advance after meeting minimum time requirements at each rank. Often combined with performance criteria.</li>
              <li><strong>Activity-based:</strong> Promotions tied to participation in events, patrols, and server activities.</li>
            </ul>
            <p>Pure time-based systems reward longevity over contribution. Hybrid systems — combining time requirements with performance criteria — tend to produce the most balanced outcomes.</p>
          </Section>

          <Section title="2. Document Criteria for Every Rank">
            <p>Every rank in your hierarchy should have written promotion criteria. For each rank, define:</p>
            <ul>
              <li>Minimum time at current rank before eligibility.</li>
              <li>Activity requirements — patrol hours, event attendance, or similar.</li>
              <li>Conduct requirements — clean disciplinary record for a defined period.</li>
              <li>Skill or knowledge requirements — passing a test, completing training, or demonstrating a specific competency.</li>
              <li>Discretionary factors — leadership potential, peer feedback, team contribution.</li>
            </ul>
          </Section>

          <Section title="3. Establish a Promotion Review Cycle">
            <p>Promotions handled ad-hoc create favoritism perceptions. Schedule regular reviews:</p>
            <ul>
              <li>Monthly or bi-weekly promotion reviews work for most servers.</li>
              <li>Command members submit nominations before the review date.</li>
              <li>Review the full list of eligible members, not just those nominated.</li>
              <li>Document decisions — who was considered, who was promoted, and why.</li>
            </ul>
            <p>Members should never need to ask a command member to promote them. If the system is functioning, eligible members are identified automatically.</p>
          </Section>

          <Section title="4. Make the System Visible">
            <p>A promotion system that members cannot see will not motivate them:</p>
            <ul>
              <li>Publish promotion criteria in a dedicated channel or documentation page.</li>
              <li>List each rank with its requirements and what comes next.</li>
              <li>Announce promotions in a public channel — name, old rank, new rank. No lengthy narratives needed.</li>
              <li>If a member was eligible but not promoted, they should receive a brief private explanation.</li>
            </ul>
          </Section>

          <Section title="5. Handle Rank Demotions Consistently">
            <p>Demotions are necessary when members no longer meet the standards of their rank. Handle them with clarity:</p>
            <ul>
              <li>Define what triggers a demotion — inactivity, disciplinary action, conduct standards, or performance.</li>
              <li>Notify the member privately before the demotion is applied, unless the circumstances require immediate action.</li>
              <li>Document every demotion in the same log you use for promotions.</li>
              <li>Do not demote members publicly or in front of their peers — this is not a moderation action, it is an operational adjustment.</li>
            </ul>
          </Section>

          <Section title="6. Prevent Rank Stagnation">
            <p>When senior ranks stay filled indefinitely, promotion pathways close and members disengage:</p>
            <ul>
              <li>Build activity requirements into senior ranks — holding rank requires continued participation.</li>
              <li>Create a retirement or reserve status for long-term members who are less active, so senior positions remain accessible.</li>
              <li>Review rank distribution quarterly — if most active members are concentrated at the bottom tiers, your criteria may be too restrictive.</li>
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
