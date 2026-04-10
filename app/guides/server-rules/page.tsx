import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Server Rules and Regulations | Unity Vault Guides",
  description: "How to write clear, enforceable server rules and regulations that set consistent expectations.",
};

export default function ServerRulesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="document" className="text-xl" />
          </div>
          <h1 className="section-heading">Writing Server Rules and Regulations</h1>
          <p className="mt-3 text-muted-foreground">
            Server rules are not just a list of prohibitions — they define the culture and expectations of your community. This guide covers how to write rules that are clear, enforceable, and respected.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Start with Principles, Not Just Prohibitions">
            <p>Before listing rules, state what your server stands for. A brief values statement at the top of your rules document establishes the standard members are expected to meet:</p>
            <ul>
              <li>Professionalism in all in-game and out-of-game communications.</li>
              <li>Respect for all community members regardless of rank or role.</li>
              <li>Commitment to realistic, structured ERLC roleplay.</li>
            </ul>
            <p>Rules written without a values context are harder to enforce consistently. When a situation is ambiguous, staff should be able to apply the values, not just check a list.</p>
          </Section>

          <Section title="2. Write Rules That Can Be Enforced">
            <p>Every rule must meet two criteria: it must be specific enough to apply, and it must be observable. Avoid rules that rely on staff to read intent:</p>
            <ul>
              <li><strong>Poor:</strong> "Be respectful at all times."</li>
              <li><strong>Better:</strong> "Do not use offensive language, personal insults, or targeted harassment toward any member."</li>
              <li><strong>Poor:</strong> "Do not ruin the roleplay experience."</li>
              <li><strong>Better:</strong> "Do not intentionally disrupt active scenes, ignore dispatcher instructions, or engage in unprompted aggressive behavior."</li>
            </ul>
          </Section>

          <Section title="3. Organize Rules by Category">
            <p>Group rules into logical sections so members can find relevant rules quickly:</p>
            <ul>
              <li><strong>General conduct:</strong> Behavior standards, communication, and respect requirements.</li>
              <li><strong>In-game rules:</strong> Roleplay standards, vehicle use, uniform compliance, radio conduct.</li>
              <li><strong>Discord conduct:</strong> Channel usage, posting standards, DM behavior.</li>
              <li><strong>Staff and rank rules:</strong> Expectations specific to members in official positions.</li>
              <li><strong>Disciplinary process:</strong> How violations are handled and escalated.</li>
            </ul>
          </Section>

          <Section title="4. Define Your Disciplinary Process Explicitly">
            <p>Members should not discover what happens when they break a rule only after they break it:</p>
            <ul>
              <li>State your warning system in the rules document — what counts as a strike and what triggers each level of action.</li>
              <li>List what each discipline level looks like: verbal warning, formal warning, temporary ban, permanent ban.</li>
              <li>Specify whether certain violations (e.g., exploitation, doxxing) result in immediate permanent bans without warning.</li>
              <li>Include how members can appeal a decision and the timeline for appeals.</li>
            </ul>
          </Section>

          <Section title="5. Keep Rules Current">
            <p>Rules that no longer apply to current server operations create confusion and enforcement inconsistencies:</p>
            <ul>
              <li>Review the full rules document every 60 to 90 days.</li>
              <li>When a rule is changed, announce the change to the community with a reason. Do not silently edit posted rules.</li>
              <li>Remove rules that are no longer enforceable or relevant rather than leaving them in place.</li>
            </ul>
          </Section>

          <Section title="6. Post Rules Where Members Will Read Them">
            <p>Placement and format affect whether members read and retain your rules:</p>
            <ul>
              <li>Use a dedicated #rules channel in Discord pinned at the top of the navigation sidebar.</li>
              <li>Break rules into numbered sections — numbered references make enforcement conversations easier ("Rule 3.2 states...").</li>
              <li>Require new members to react or acknowledge the rules before accessing the full server.</li>
              <li>Keep the rules document readable in under five minutes. Overly long rules are ignored.</li>
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
