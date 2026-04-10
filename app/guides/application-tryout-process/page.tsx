import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Application and Tryout Process | Unity Vault Guides",
  description: "How to create a structured application and tryout process that filters for quality and commitment.",
};

export default function ApplicationTryoutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="checkbox" className="text-xl" />
          </div>
          <h1 className="section-heading">Creating an Application and Tryout Process</h1>
          <p className="mt-3 text-muted-foreground">
            Your application process is the first filter for who joins your server's ranks. A well-designed process identifies commitment, not just enthusiasm. This guide covers how to build one that scales.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Decide What You Are Selecting For">
            <p>Before designing an application, define what a successful candidate looks like:</p>
            <ul>
              <li><strong>Commitment:</strong> Will they remain active? Look for members who have a track record in other communities.</li>
              <li><strong>Communication:</strong> Can they follow instructions and communicate clearly in text?</li>
              <li><strong>Conduct:</strong> Do they behave appropriately under observation during a tryout?</li>
              <li><strong>Knowledge:</strong> Do they understand the basics of ERLC and your server's standards?</li>
            </ul>
            <p>Design each stage of your application to test one of these factors specifically.</p>
          </Section>

          <Section title="2. Build a Two-Stage Process">
            <p>A two-stage process (application then tryout) is the most reliable filter for most servers:</p>
            <ul>
              <li><strong>Stage 1 — Written application:</strong> Collects basic information and a written response. Filters candidates who cannot commit to a text form.</li>
              <li><strong>Stage 2 — In-game tryout:</strong> Tests practical competency, conduct under pressure, and ability to follow instructions.</li>
            </ul>
            <p>Do not advance every applicant who completes Stage 1. The review between stages is a deliberate filter, not an administrative step.</p>
          </Section>

          <Section title="3. Design the Written Application">
            <p>Keep the application focused. Recommended fields for most ERLC departments:</p>
            <ul>
              <li>Discord username and user ID.</li>
              <li>Age (if relevant to your server's maturity standards).</li>
              <li>Timezone (for scheduling awareness).</li>
              <li>Why they want to join — short paragraph, not an essay prompt.</li>
              <li>Previous ERLC or roleplay community experience.</li>
              <li>Available times for a tryout.</li>
            </ul>
            <p>Long applications with many questions do not produce better candidates — they produce longer applications. Focus on what you can actually use to make a decision.</p>
          </Section>

          <Section title="4. Design the Tryout">
            <p>A tryout should test what the role actually requires. Standard elements for ERLC department tryouts:</p>
            <ul>
              <li><strong>Briefing:</strong> Explain the format, expectations, and how the candidate will be evaluated. Keep this under five minutes.</li>
              <li><strong>Knowledge check:</strong> Ask three to five factual questions about your server rules, radio codes, or department procedures.</li>
              <li><strong>Practical scenario:</strong> Run one or two in-game scenarios — a traffic stop, a dispatch call, or a patrol sequence.</li>
              <li><strong>Debrief:</strong> Give the candidate feedback at the end regardless of outcome.</li>
            </ul>
          </Section>

          <Section title="5. Document and Review Decisions">
            <p>Every application and tryout outcome should be documented:</p>
            <ul>
              <li>Log the applicant's name, ID, tryout date, evaluator, and result.</li>
              <li>If an applicant is denied, record the specific reason — this prevents the same outcome from being decided differently next time.</li>
              <li>Set a re-application waiting period — typically two to four weeks after a denial.</li>
              <li>Review application outcomes quarterly. If you are accepting most applicants, your filter may be too loose. If you are denying most, your criteria may be unclear.</li>
            </ul>
          </Section>

          <Section title="6. Communicate With Applicants Promptly">
            <p>Slow communication signals low organizational quality:</p>
            <ul>
              <li>Acknowledge every application within 48 hours of receipt.</li>
              <li>Notify applicants of their tryout result within 24 hours of the tryout.</li>
              <li>If an application is pending review for longer than expected, send an update.</li>
              <li>Denials should be delivered with a brief explanation — not a generic "we have decided to move on with other candidates."</li>
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
