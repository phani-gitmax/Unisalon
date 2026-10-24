/**
 * Unisalon lead sheet — paste into Extensions → Apps Script of your Google Sheet.
 * Setup steps are in AUTOMATION.md.
 *
 * 1. doPost: the website sends every lead here; it is saved as a new row. `type` is
 *    booking (booking page), callback ("call me back" box) or subscribe (WhatsApp offers list).
 *    Call-back requests are also emailed straight away so someone can phone them.
 * 2. monthlyReport: emails last month's lead summary (total, by branch, by service, top days).
 *    Run setupMonthlyReport() once to schedule it for the 1st of every month.
 */

const REPORT_TO = "info@unisalon.in"; // TODO: who receives the monthly report (comma-separate several)
const HEADERS = ["receivedAt", "type", "name", "phone", "branch", "service", "date", "time", "message", "page", "source"];

function sheet_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function doPost(e) {
  const lead = JSON.parse(e.postData.contents);
  const sh = sheet_();
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  if (!headers.includes("type")) {
    // Sheets created before lead types existed: add the column at the end.
    sh.getRange(1, headers.length + 1).setValue("type");
    headers.push("type");
  }
  sh.appendRow(headers.map((h) => lead[h] ?? ""));
  if (lead.type === "callback") {
    MailApp.sendEmail(
      REPORT_TO,
      `Call back: ${lead.name} ${lead.phone}`,
      `${lead.name} asked for a call back from the website.\n\nPhone: ${lead.phone}\nService: ${lead.service || "not sure"}\nTime: ${lead.receivedAt}`
    );
  }
  return ContentService.createTextOutput("ok");
}

function monthlyReport() {
  const tz = "Asia/Kolkata";
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevStart = new Date(now.getFullYear(), now.getMonth() - 2, 1);

  const rows = sheet_().getDataRange().getValues();
  const headers = rows.shift();
  const col = (name) => headers.indexOf(name);
  const leads = rows.map((r) => ({
    at: new Date(r[col("receivedAt")]),
    type: (col("type") >= 0 && r[col("type")]) || "booking",
    branch: r[col("branch")] || "—",
    service: r[col("service")] || "Not specified",
  }));

  const all = leads.filter((l) => l.at >= start && l.at < end);
  const subscribers = all.filter((l) => l.type === "subscribe").length;
  // Bookings + call-backs are the leads; WhatsApp sign-ups are reported separately.
  const month = all.filter((l) => l.type !== "subscribe");
  const prev = leads.filter((l) => l.at >= prevStart && l.at < start && l.type !== "subscribe");

  const tally = (list, key) =>
    Object.entries(list.reduce((acc, l) => ((acc[l[key]] = (acc[l[key]] || 0) + 1), acc), {}))
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `  • ${k}: ${v}`)
      .join("\n") || "  • none";

  const days = month.map((l) => Utilities.formatDate(l.at, tz, "EEEE"));
  const busiest = days.length ? Object.entries(days.reduce((a, d) => ((a[d] = (a[d] || 0) + 1), a), {})).sort((a, b) => b[1] - a[1])[0][0] : "—";
  const change = prev.length ? Math.round(((month.length - prev.length) / prev.length) * 100) : null;
  const label = Utilities.formatDate(start, tz, "MMMM yyyy");

  const body = [
    `Unisalon website leads — ${label}`,
    "",
    `Total leads: ${month.length}` + (change === null ? "" : ` (${change >= 0 ? "+" : ""}${change}% vs previous month: ${prev.length})`),
    "By type:",
    tally(month, "type"),
    `New WhatsApp offer sign-ups: ${subscribers}`,
    `Busiest day for bookings: ${busiest}`,
    "",
    "By branch:",
    tally(month, "branch"),
    "",
    "Top services requested:",
    tally(month, "service").split("\n").slice(0, 10).join("\n"),
    "",
    `Full list: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
  ].join("\n");

  MailApp.sendEmail(REPORT_TO, `Unisalon leads — ${label}: ${month.length} leads`, body);
}

function setupMonthlyReport() {
  ScriptApp.getProjectTriggers().filter((t) => t.getHandlerFunction() === "monthlyReport").forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("monthlyReport").timeBased().onMonthDay(1).atHour(9).inTimezone("Asia/Kolkata").create();
}
