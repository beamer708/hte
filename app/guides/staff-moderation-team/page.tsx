import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Staff and Moderation Team | @howtoerlc Guides",
  description: "How to set up a staff and moderation team that is structured, consistent, and operationally sound.",
};

export default function StaffModerationTeamPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="users" className="text-xl" />
          </div>
          <h1 className="section-heading">Setting Up a Staff and Moderation Team</h1>
          <p className="mt-3 text-muted-foreground">
            A functioning staff team is the operational backbone of any ERLC community. This guide covers how to build one that enforces rules fairly, stays coordinated, and does not burn out.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Define Staff Roles Before Hiring">
            <p>Identify which roles your server actually needs before opening applications. Common staff positions in ERLC communities:</p>
            <ul>
              <li><strong>Moderator:</strong> Handles rule enforcement, member reports, and in-game incidents.</li>
              <li><strong>Administrator:</strong> Manages server settings, bot configurations, and escalated issues.</li>
              <li><strong>Event Coordinator:</strong> Plans and runs patrols, roleplay scenarios, and community events.</li>
              <li><strong>Community Manager:</strong> Oversees staff team health, onboarding, and member relations.</li>
            </ul>
            <p>Avoid creating roles that exist only for the title. Each position should have a defined workload and purpose.</p>
          </Section>

          <Section title="2. Set Clear Expectations Before Onboarding">
            <p>Every staff member should know what is expected of them before they begin. Create a staff handbook that covers:</p>
            <ul>
              <li>Activity requirements — minimum hours per week or minimum visible actions.</li>
              <li>Response time expectations for reports and tickets.</li>
              <li>Behavior standards — how staff are expected to communicate with members.</li>
              <li>Scope of authority — what decisions each role can make independently.</li>
            </ul>
            <p>Do not assume staff will infer expectations. Write them down.</p>
          </Section>

          <Section title="3. Establish a Private Staff Channel Structure">
            <p>Your staff communication channels should be organized and purposeful:</p>
            <ul>
              <li><strong>#staff-general:</strong> Coordination, announcements, and general discussion.</li>
              <li><strong>#mod-log:</strong> A running log of moderation actions taken. Each entry should include: member, action, reason, staff member.</li>
              <li><strong>#reports:</strong> Active member reports assigned to specific moderators.</li>
              <li><strong>#staff-applications:</strong> Incoming applications for review.</li>
            </ul>
            <p>Keep channels functional, not decorative. Remove unused channels rather than leaving them empty.</p>
          </Section>

          <Section title="4. Build a Consistent Moderation Process">
            <p>Inconsistent enforcement is the most common cause of staff credibility issues. Standardize your moderation actions:</p>
            <ul>
              <li>Define your warning system — verbal warning, formal warning, temp ban, permanent ban.</li>
              <li>Set thresholds: after X warnings, what happens automatically?</li>
              <li>Require staff to log every action, including warnings that did not escalate.</li>
              <li>Set a review process for ban appeals — who reviews them, and how long does the member wait?</li>
            </ul>
          </Section>

          <Section title="5. Prevent Staff Burnout">
            <p>Staff burnout is a structural problem, not a personal one. Address it at the system level:</p>
            <ul>
              <li>Rotate high-stress tasks — do not assign the same moderator to handle all difficult cases.</li>
              <li>Allow activity breaks without requiring permission. Staff should not have to justify rest.</li>
              <li>Conduct brief monthly check-ins with each staff member. Ask directly if they have what they need.</li>
              <li>Remove staff who are no longer active with no blame attached. Inactivity is not a failure.</li>
            </ul>
          </Section>

          <Section title="6. Promote from Within When Possible">
            <p>Promoting existing members to staff reduces onboarding time and builds loyalty:</p>
            <ul>
              <li>Identify members who are active, calm in conflict, and respected by peers.</li>
              <li>Do not promote based on enthusiasm or rank in-game. Moderation requires judgment, not seniority.</li>
              <li>Run a brief trial period for new staff before granting full permissions.</li>
              <li>Make the promotion criteria visible — members should know what gets someone onto the team.</li>
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
