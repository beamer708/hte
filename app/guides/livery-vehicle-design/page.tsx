import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Livery and Vehicle Design Basics | Unity Guides",
  description: "How to design liveries and vehicle assets that are visually consistent and recognizable across your ERLC server.",
};

export default function LiveryVehicleDesignPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="wrench" className="text-xl" />
          </div>
          <h1 className="section-heading">Livery and Vehicle Design Basics</h1>
          <p className="mt-3 text-muted-foreground">
            Liveries are one of the most visible expressions of your ERLC department's brand. This guide covers how to design liveries that are visually consistent, practical to implement, and identifiable in-game.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Understand the Constraints of ERLC Liveries">
            <p>ERLC livery design operates within specific technical limitations that affect your design decisions:</p>
            <ul>
              <li>Liveries are applied as image overlays on in-game vehicle models. The underlying vehicle shape and color affect how your design appears.</li>
              <li>Small text and fine detail often become illegible at in-game scale. Design for visibility from a distance, not for close inspection.</li>
              <li>ERLC uses specific UV templates for each vehicle. Your design must be built to fit the template, or it will not align correctly on the vehicle.</li>
            </ul>
            <p>Download the correct UV template for each vehicle you intend to design before starting. Working without a template produces misaligned results.</p>
          </Section>

          <Section title="2. Establish a Design System Before Designing Individual Liveries">
            <p>Each livery in your department should share a common visual language. Define the following before designing:</p>
            <ul>
              <li><strong>Color palette:</strong> Typically your server's primary and secondary colors plus white or black for contrast.</li>
              <li><strong>Logo placement:</strong> Where your department seal or logo appears on every vehicle — most commonly on the door panels.</li>
              <li><strong>Unit number format:</strong> Where unit numbers appear, what font, and how large.</li>
              <li><strong>Pattern or stripe system:</strong> A consistent graphic element — a stripe, a band, a geometric shape — that ties all vehicles together.</li>
            </ul>
          </Section>

          <Section title="3. Design for Legibility, Not Complexity">
            <p>The most effective ERLC liveries are simple. Complexity is a design risk, not a feature:</p>
            <ul>
              <li>Use high contrast between your base color and graphic elements. Low-contrast designs disappear in-game lighting.</li>
              <li>Limit your design to three to four distinct elements: base color, stripe or accent, logo, unit number.</li>
              <li>Avoid gradients on large surfaces — they often appear muddy or compressed after export.</li>
              <li>Test your design at reduced scale before finalizing. If it is not readable at thumbnail size, it will not be readable in-game.</li>
            </ul>
          </Section>

          <Section title="4. Choose the Right Design Tool">
            <p>Several tools are used for ERLC livery creation:</p>
            <ul>
              <li><strong>Photopea:</strong> Free, browser-based Photoshop alternative. Supports PSD files and UV template layers. The most accessible option for beginners.</li>
              <li><strong>Adobe Photoshop:</strong> Industry standard. Offers the most control but requires a paid subscription.</li>
              <li><strong>GIMP:</strong> Free and open-source. Capable but has a steeper learning curve than Photopea.</li>
            </ul>
            <p>For most ERLC server needs, Photopea is sufficient and has no cost barrier.</p>
          </Section>

          <Section title="5. Maintain Consistency Across Your Vehicle Fleet">
            <p>Visual consistency across all department vehicles is what makes a livery system look professional:</p>
            <ul>
              <li>Build a master template document that contains all shared elements — logo, color swatches, stripe patterns — and use it as the base for every new vehicle design.</li>
              <li>When you update the logo or color palette, rebuild all existing liveries from the updated master. Partial updates create fleet inconsistency.</li>
              <li>Document which livery file corresponds to which in-game vehicle. Livery files without documentation become impossible to manage after a few months.</li>
            </ul>
          </Section>

          <Section title="6. Distribute and Enforce Livery Standards">
            <p>Liveries are only effective if members use them correctly:</p>
            <ul>
              <li>Post finalized livery files in a pinned, member-accessible channel. Include a brief installation guide.</li>
              <li>Specify exactly which vehicles each livery applies to. Do not leave members to guess.</li>
              <li>Include livery compliance in your uniform or conduct standards. Members operating with incorrect or personal liveries should be corrected during patrol debrief.</li>
            </ul>
          </Section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/community-guides" className="btn-secondary">
            <Icon name="arrow-right" className="rotate-180 text-base" />
            All Guides
          </Link>
          <Link href="/guides/server-branding" className="btn-ghost">
            <Icon name="palette" className="text-base" />
            Server Branding Guide
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
