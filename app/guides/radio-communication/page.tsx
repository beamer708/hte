import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "10-Codes and Radio Communication | Unity Vault Guides",
  description: "How to use 10-codes and radio communication standards for structured, professional in-game operations.",
};

export default function RadioCommunicationPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="message-sms" className="text-xl" />
          </div>
          <h1 className="section-heading">10-Codes and Radio Communication Standards</h1>
          <p className="mt-3 text-muted-foreground">
            Structured radio communication is one of the most visible markers of a professional ERLC department. This guide covers how to implement 10-codes and communication standards that your team can actually use consistently.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Decide on Your Code System">
            <p>ERLC communities typically use one of two code systems. Choose one and standardize it completely:</p>
            <ul>
              <li><strong>APCO 10-codes (traditional):</strong> The most widely used system. Examples: 10-4 (acknowledged), 10-7 (out of service), 10-20 (location). Widely recognized and easier for members with real-world or other community experience.</li>
              <li><strong>Plain language:</strong> Some departments have moved away from 10-codes toward clear text (saying "en route" instead of "10-76"). Reduces miscommunication, especially with newer members.</li>
            </ul>
            <p>A hybrid approach — using a small set of 10-codes for common actions plus plain language for everything else — is often the most practical for ERLC communities.</p>
          </Section>

          <Section title="2. Build a Code Reference Sheet">
            <p>Every member must have access to your server's specific codes. Create a reference document that includes:</p>
            <ul>
              <li>Every code your department uses, with a clear definition.</li>
              <li>Examples of how each code is used in a sentence on radio.</li>
              <li>Codes that are not used (to prevent members importing codes from other communities).</li>
            </ul>
            <p>Post this in a pinned channel and include it in training materials. A code that members cannot easily reference will not be used consistently.</p>
          </Section>

          <Section title="3. Establish Radio Protocols">
            <p>Codes alone are not enough — your department needs a standard communication format:</p>
            <ul>
              <li><strong>Call sign first:</strong> Always begin a transmission by identifying your unit. "Unit 4 to dispatch…"</li>
              <li><strong>State your purpose:</strong> Follow with the reason for the call. "…I have a 10-50 at Pine Street and Maple."</li>
              <li><strong>Wait for acknowledgment:</strong> Do not assume the message was received. Wait for a 10-4 or equivalent before proceeding.</li>
              <li><strong>Keep transmissions brief:</strong> Radio is not a conversation channel. State the information, nothing more.</li>
            </ul>
          </Section>

          <Section title="4. Define Dispatcher Responsibilities">
            <p>If your server uses a dispatcher role, define what they do and do not control:</p>
            <ul>
              <li>Dispatcher assigns units to calls and tracks unit status.</li>
              <li>Dispatcher does not micromanage in-scene decisions — that authority belongs to the on-scene officer.</li>
              <li>All units report their status changes to dispatch: en route, on scene, available, out of service.</li>
              <li>Dispatch maintains a log of active calls and assigned units during operations.</li>
            </ul>
          </Section>

          <Section title="5. Train Communication in Tryouts">
            <p>Radio communication is best tested under realistic conditions, not in a written quiz:</p>
            <ul>
              <li>Include a radio scenario in your tryout process — give the candidate a situation and evaluate their transmission format.</li>
              <li>Assess: correct code usage, proper call sign format, appropriate length, and clarity.</li>
              <li>Run new members through radio communication practice before they operate independently.</li>
            </ul>
          </Section>

          <Section title="6. Enforce Standards Without Interrupting Operations">
            <p>Correcting radio discipline during active operations is disruptive. Handle it outside of active scenes:</p>
            <ul>
              <li>Log communication errors during operations. Address them in a debrief, not over the radio.</li>
              <li>If a member consistently uses incorrect codes or format, address it in a private conversation, not publicly.</li>
              <li>Recognize members who maintain strong radio discipline — positive reinforcement is more effective than constant correction.</li>
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
