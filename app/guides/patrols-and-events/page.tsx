import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Running Patrols and Events | Unity Guides",
  description: "How to plan and run in-game patrols and events that are coordinated, purposeful, and engaging.",
};

export default function PatrolsAndEventsPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-8 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon name="navigation" className="text-xl" />
          </div>
          <h1 className="section-heading">Running In-Game Patrols and Events</h1>
          <p className="mt-3 text-muted-foreground">
            Patrols and events are the operational core of an ERLC department. This guide covers how to plan and run them in a way that is structured, coordinated, and worth your members' time.
          </p>
        </div>

        <div className="space-y-6">
          <Section title="1. Differentiate Between Patrols and Events">
            <p>These two formats have different purposes and require different preparation:</p>
            <ul>
              <li><strong>Patrols:</strong> Regular operational sessions. Members go on duty, respond to calls, and carry out standard department functions. The focus is routine operations and activity maintenance.</li>
              <li><strong>Events:</strong> Planned scenarios or operations with a specific purpose — a pursuit drill, a multi-department response, a civilian interaction scenario. Events typically require advance coordination and a designated coordinator.</li>
            </ul>
            <p>Most departments run weekly or bi-weekly patrols as their standard activity and hold events as supplementary, less frequent sessions.</p>
          </Section>

          <Section title="2. Plan Patrols With a Fixed Schedule">
            <p>Irregular patrols produce irregular attendance. Establish a schedule your members can plan around:</p>
            <ul>
              <li>Set patrol days and times based on when your member base is most active — use Discord's member activity data or a scheduling poll.</li>
              <li>Post the patrol schedule at least 48 hours in advance in a dedicated channel.</li>
              <li>Assign a patrol lead for each session — someone responsible for opening the server, managing CAD, and running debrief.</li>
              <li>Require members to confirm attendance or flag conflicts in advance if your server uses attendance tracking.</li>
            </ul>
          </Section>

          <Section title="3. Run a Structured Patrol Format">
            <p>A patrol should have a defined start, execution, and end. Avoid free-form sessions with no coordination:</p>
            <ul>
              <li><strong>Briefing (5 minutes):</strong> Patrol lead covers current objectives, active calls, and any special operational notes.</li>
              <li><strong>Active patrol:</strong> Units sign into CAD, go on duty, and respond to calls via dispatch. Patrol lead monitors and coordinates.</li>
              <li><strong>Debrief (5–10 minutes):</strong> Brief review of the session — notable calls, conduct observations, and any procedural notes.</li>
            </ul>
          </Section>

          <Section title="4. Plan Events With a Coordinator">
            <p>Events require more preparation than patrols. Assign a coordinator who handles logistics:</p>
            <ul>
              <li>Define the event objective — what is this event designed to accomplish or practice?</li>
              <li>Assign roles in advance — who is handling dispatch, who is on scene, which departments are involved?</li>
              <li>Brief participants before the event starts. Everyone should know what to expect before the scenario begins.</li>
              <li>Run the event at a consistent pace — do not let it drag or end abruptly. The coordinator manages the timeline.</li>
            </ul>
          </Section>

          <Section title="5. Document Attendance and Outcomes">
            <p>Tracking patrols and events produces data that improves future sessions:</p>
            <ul>
              <li>Log attendance for every session — member name, rank, duration on duty.</li>
              <li>Note any significant incidents, conduct issues, or operational highlights in a patrol report.</li>
              <li>Review attendance trends monthly. Members who are consistently absent without notice should be contacted directly.</li>
            </ul>
          </Section>

          <Section title="6. Use Debrief Productively">
            <p>Debrief is not a formality — it is where operational improvement happens:</p>
            <ul>
              <li>Keep debrief factual and brief. Limit to three to five observations per session.</li>
              <li>Separate conduct issues from operational issues. Conduct is addressed privately, not in group debrief.</li>
              <li>Ask for input from participants — what went well, what needs adjustment?</li>
              <li>Follow up on any procedural changes that were identified in debrief. If nothing changes from debrief to debrief, members will stop participating in them.</li>
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
