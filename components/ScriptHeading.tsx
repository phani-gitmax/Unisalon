// The signature look from the original Unisalon theme: a gold script word over a bold caps heading.
export function ScriptHeading({
  script,
  title,
  sub,
  as: Tag = "h2",
  align = "left",
}: {
  script: string;
  title: string;
  sub?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
}) {
  return (
    <div className={`script-heading ${align}`}>
      <span className="script" aria-hidden="true">{script}</span>
      <Tag>{title}</Tag>
      {sub && <p className="kicker">{sub}</p>}
    </div>
  );
}
