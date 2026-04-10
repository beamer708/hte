import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Designing Server Branding | Unity Guides",
  description: "How to design cohesive server branding — logo, colors, and uniform guide — for your ERLC community.",
};

export default function ServerBrandingPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="palette" className="text-xl" />
          </div>
          <h1 className="section-heading">Designing Server Branding</h1>
          <p className="mt-3 text-muted-foreground">
            Consistent branding — logo, color palette, and uniform guide — signals that your ERLC server is organized and professional. This guide covers how to build a visual identity that holds together across every touchpoint.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Define Your Brand Before Designing Anything">
            <p>Effective branding starts with decisions, not design tools. Answer these questions before opening any software:</p>
            <ul>
              <li>What does your server specialize in — law enforcement, fire and EMS, civilian operations, or a mix?</li>
              <li>What tone does your server have — highly realistic and formal, or approachable with room for personality?</li>
              <li>What city or regional identity, if any, does your server use?</li>
            </ul>
            <p>These answers determine your color direction, typeface, and logo style. A serious, realism-focused department should not use a playful brand. An approachable civilian server should not use intimidating, heavy design.</p>
          </Section>

          <Section title="2. Build a Limited Color Palette">
            <p>Most ERLC departments use institutional color references — law enforcement blues, fire reds, EMS oranges and whites. Work within those conventions, then differentiate through execution:</p>
            <ul>
              <li>Choose a primary color (the dominant brand color), one secondary color, and one neutral (usually white, black, or dark gray).</li>
              <li>Test your palette against dark Discord backgrounds — colors that look good on white may disappear or clash on dark mode.</li>
              <li>Store your exact hex codes in a document and share them with anyone creating assets for your server.</li>
            </ul>
          </Section>

          <Section title="3. Design a Functional Logo">
            <p>Your logo will appear in small sizes — Discord icons, channel emojis, livery details. Design for legibility at small scale:</p>
            <ul>
              <li>Use a simple shape — a badge, shield, or geometric mark. Complex details disappear at small sizes.</li>
              <li>Limit your logo to two colors maximum. Multi-color logos are harder to apply consistently across different backgrounds.</li>
              <li>Include a text version (wordmark) and a symbol-only version for different use cases.</li>
              <li>Export in PNG (with transparent background) and SVG formats. Never use JPG for logos.</li>
            </ul>
          </Section>

          <Section title="4. Create a Uniform Guide">
            <p>A uniform guide defines exactly what members wear in-game, eliminating ambiguity and enforcing visual consistency:</p>
            <ul>
              <li>Specify clothing items by exact in-game name and color for each rank tier.</li>
              <li>Include screenshots or reference images wherever possible.</li>
              <li>Define what variations are permitted — for example, whether a long-sleeve variant is acceptable in cold weather scenarios.</li>
              <li>State what is not permitted as clearly as what is. Members will test boundaries.</li>
            </ul>
          </Section>

          <Section title="5. Establish a Brand Usage Policy">
            <p>When members create their own content using your branding, you need standards in place:</p>
            <ul>
              <li>Define what modifications to the logo are allowed — recoloring for sub-units, adding text, etc.</li>
              <li>State that the logo may not be used in unofficial or external contexts without permission.</li>
              <li>Provide approved asset files in a public or member-accessible channel so members do not create their own approximate versions.</li>
            </ul>
          </Section>

          <Section title="6. Maintain Consistency Over Time">
            <p>Branding erodes when new assets are created without referencing existing standards:</p>
            <ul>
              <li>Keep all approved assets in a single, well-organized channel or shared drive.</li>
              <li>When you need a new asset — a banner, announcement graphic, or livery — build it from the existing palette and logo system.</li>
              <li>Do a visual audit every few months. If assets have drifted from the standard, correct them before the inconsistency becomes the new default.</li>
            </ul>
          </Section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/community-guides" className="btn-secondary">
            <Icon name="arrow-right" className="rotate-180 text-base" />
            All Guides
          </Link>
          <Link href="/guides/logo-design" className="btn-ghost">
            <Icon name="palette" className="text-base" />
            Logo Design Guide
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
