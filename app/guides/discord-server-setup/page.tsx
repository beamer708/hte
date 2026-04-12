import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Setting Up a Discord Server | @howtoerlc Guides",
  description: "How to set up a Discord server for your ERLC community — channels, roles, permissions, and structure.",
};

export default function DiscordServerSetupPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="discord" className="text-xl" />
          </div>
          <h1 className="section-heading">Setting Up a Discord Server for Your ERLC Community</h1>
          <p className="mt-3 text-muted-foreground">
            Your Discord server is the operational center of your ERLC community. This guide covers how to structure it for clarity, efficiency, and scalable growth.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Plan Your Channel Architecture Before Creating Anything">
            <p>The most common Discord setup mistake is creating channels without a plan. Define your channel categories first:</p>
            <ul>
              <li><strong>Information channels:</strong> Read-only channels where leadership posts announcements, rules, and reference documents.</li>
              <li><strong>Community channels:</strong> General conversation, off-topic, and member-to-member interaction.</li>
              <li><strong>Operations channels:</strong> Channels tied to specific department functions — patrol discussion, dispatch, radio logs.</li>
              <li><strong>Staff channels:</strong> Private channels visible only to staff for coordination and moderation.</li>
              <li><strong>Application and ticket channels:</strong> Where members submit applications, appeals, or support requests.</li>
            </ul>
          </Section>

          <Section title="2. Build Your Role Structure">
            <p>Roles control access and represent identity. Design your role structure to serve both functions:</p>
            <ul>
              <li>Create roles that map directly to your rank hierarchy — every rank gets a role.</li>
              <li>Create department roles that give access to department-specific channels without duplicating rank roles.</li>
              <li>Use a guest or member role for new joiners that grants limited access until they verify or are processed.</li>
              <li>Assign role colors intentionally — colors should signal rank tier, not be assigned arbitrarily.</li>
            </ul>
          </Section>

          <Section title="3. Configure Channel Permissions Precisely">
            <p>Overly permissive servers are harder to moderate. Set permissions at the category level to reduce duplication:</p>
            <ul>
              <li>Apply base permissions at the category level so all channels in a category inherit the same access rules.</li>
              <li>Override at the channel level only when a specific channel needs different access from the rest of its category.</li>
              <li>Revoke @everyone's ability to send messages in announcement and rules channels — these should be read-only.</li>
              <li>Restrict voice channel access to members who have been properly onboarded — do not leave it open by default.</li>
            </ul>
          </Section>

          <Section title="4. Set Up Essential Bots">
            <p>A small set of well-configured bots handles most routine moderation and utility tasks:</p>
            <ul>
              <li><strong>Moderation bot:</strong> Handles automatic warning logs, anti-raid protection, and spam filtering. MEE6, Carl-bot, or Dyno are common choices.</li>
              <li><strong>Ticket system:</strong> For member support requests and applications. Ticket Tool or its equivalents are widely used.</li>
              <li><strong>Verification bot:</strong> Prevents bot raids by requiring new members to verify before accessing the server.</li>
            </ul>
            <p>Do not add bots for every function. Each additional bot increases the surface area for permission errors and outages.</p>
          </Section>

          <Section title="5. Create Onboarding for New Members">
            <p>New members should not have to figure out how your server works on their own:</p>
            <ul>
              <li>Create a #start-here channel as the first channel visible to new members. It should explain what the server is, what the member needs to do first, and where to go for help.</li>
              <li>Use a rules-acceptance gate — require members to react to the rules before accessing the full server.</li>
              <li>Keep your welcome message brief. A wall of text is ignored. Three to five sentences is sufficient.</li>
            </ul>
          </Section>

          <Section title="6. Maintain the Server Actively">
            <p>Discord servers accumulate structural debt — unused channels, outdated pins, role bloat:</p>
            <ul>
              <li>Audit your channel list every 60 days. Remove or archive channels that have been inactive for more than 30 days.</li>
              <li>Review role assignments monthly — members who have left may still hold roles.</li>
              <li>Keep pinned messages current. Outdated pinned messages reduce trust in the information that is there.</li>
              <li>Update the server icon and banner when your branding changes. Visual inconsistency signals neglect.</li>
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
