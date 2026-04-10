import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Training Program for New Members | Unity Vault Guides",
  description: "How to set up a training program that onboards new members with consistency and operational clarity.",
};

export default function TrainingProgramPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="book" className="text-xl" />
          </div>
          <h1 className="section-heading">Setting Up a Training Program for New Members</h1>
          <p className="mt-3 text-muted-foreground">
            A structured training program ensures every new member enters your server with the same baseline of knowledge and conduct expectations. This guide covers how to build one that is consistent and repeatable.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Define Training Objectives">
            <p>Before writing training content, list the specific outcomes a new member should achieve by the end of training:</p>
            <ul>
              <li>Understands all server rules and can apply them in common scenarios.</li>
              <li>Knows the rank structure and reporting chain.</li>
              <li>Can communicate correctly on radio (correct codes, call signs, format).</li>
              <li>Can perform basic in-game duties for their role (patrol, dispatch, EMS, etc.).</li>
              <li>Knows when and how to escalate issues to higher rank.</li>
            </ul>
            <p>Each objective should be testable. If you cannot check whether a member has met it, it is too vague.</p>
          </Section>

          <Section title="2. Structure the Training into Phases">
            <p>Break training into sequential phases. Do not attempt to deliver everything in a single session:</p>
            <ul>
              <li><strong>Phase 1 — Orientation:</strong> Rules overview, server expectations, channel navigation. Completed before the first in-game session.</li>
              <li><strong>Phase 2 — Procedural training:</strong> Radio communication, 10-codes, use of department-specific tools. Covered in a guided session with a trainer.</li>
              <li><strong>Phase 3 — Practical evaluation:</strong> One or two supervised in-game scenarios. Trainer observes and provides feedback.</li>
              <li><strong>Phase 4 — Clearance:</strong> If all phases are passed, the member is cleared to operate independently.</li>
            </ul>
          </Section>

          <Section title="3. Create a Trainer Role and Responsibilities">
            <p>Training requires a designated trainer — not any available senior member:</p>
            <ul>
              <li>Trainers should be at officer rank or above and have completed a trainer certification process.</li>
              <li>Define trainer responsibilities: preparing for sessions, submitting training reports, and maintaining consistent delivery.</li>
              <li>Create a trainer log where each completed training session is recorded: trainee, trainer, date, outcome.</li>
              <li>Limit training assignments — one trainer should not run more than two or three concurrent training tracks.</li>
            </ul>
          </Section>

          <Section title="4. Build Standardized Training Materials">
            <p>Training should not rely on a single trainer's memory or interpretation:</p>
            <ul>
              <li>Write a training guide document that outlines each phase, what to cover, and example scripts for key scenarios.</li>
              <li>Create a reference sheet for trainees — radio codes, rank list, key commands, emergency procedures.</li>
              <li>Build a brief multiple-choice knowledge check for Phase 1. This forces retention and gives you a documented baseline.</li>
            </ul>
          </Section>

          <Section title="5. Set a Clear Timeline for Completion">
            <p>Trainees who do not complete training within a set window should be reviewed:</p>
            <ul>
              <li>Set a standard training completion window — typically seven to fourteen days from acceptance.</li>
              <li>If a trainee cannot complete within the window, allow one extension before flagging for review.</li>
              <li>Do not allow trainees to operate in active duty roles until training is fully cleared.</li>
            </ul>
          </Section>

          <Section title="6. Collect Feedback and Improve the Program">
            <p>Training programs deteriorate without active maintenance:</p>
            <ul>
              <li>Ask each trainee to submit a short feedback form after clearing — what was unclear, what was useful, what was missing.</li>
              <li>Review training materials every 60 days. Server rules and procedures change; training materials must reflect current standards.</li>
              <li>Track common failure points — if most trainees struggle with the same scenario, that scenario needs redesigning, not more repetition.</li>
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
