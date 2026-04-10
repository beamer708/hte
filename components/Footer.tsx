export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "0.5px solid rgba(240,236,224,0.08)",
        backgroundColor: "#0a0a09",
      }}
    >
      <div className="page-container" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Dot */}
          <span
            style={{
              flexShrink: 0,
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: "var(--foreground)",
              opacity: 0.4,
              display: "inline-block",
            }}
            aria-hidden
          />
          {/* Disclaimer */}
          <p
            style={{
              fontSize: "11px",
              fontWeight: 300,
              letterSpacing: "0.06em",
              color: "var(--muted-foreground)",
              lineHeight: 1.5,
            }}
          >
            Unity is free, independent, and not affiliated with Roblox or the ERLC development team.
          </p>
        </div>
      </div>
    </footer>
  );
}
