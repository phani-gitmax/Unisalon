/**
 * Unisalon lead sheet — paste into Extensions → Apps Script of your Google Sheet.
 * Setup steps are in AUTOMATION.md.
 *
 * 1. doPost: the website sends every booking here; it is saved as a new row.
 * 2. monthlyReport: emails last month's lead summary (total, by branch, by service, top days).
 *    Run setupMonthlyReport() once to schedule it for the 1st of every month.
 */

const REPORT_TO = "info@unisalon.in"; // TODO: who receives the monthly report (comma-separate several)
const HEADERS = ["receivedAt", "name", "phone", "branch", "service", "date", "time", "message", "page", "source"];

function sheet_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function doPost(e) {
  const lead = JSON.parse(e.postData.contents);
  const sh = sheet_();
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  sh.appendRow(headers.map((h) => lead[h] ?? ""));
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
  const leads = rows.map((r) => ({ at: new Date(r[col("receivedAt")]), branch: r[col("branch")] || "—", service: r[col("service")] || "Not specified" }));

  const month = leads.filter((l) => l.at >= start && l.at < end);
  const prev = leads.filter((l) => l.at >= prevStart && l.at < start);

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
    `Total booking requests: ${month.length}` + (change === null ? "" : ` (${change >= 0 ? "+" : ""}${change}% vs previous month: ${prev.length})`),
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

  MailApp.sendEmail(REPORT_TO, `Unisalon leads — ${label}: ${month.length} bookings`, body);
}

function setupMonthlyReport() {
  ScriptApp.getProjectTriggers().filter((t) => t.getHandlerFunction() === "monthlyReport").forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("monthlyReport").timeBased().onMonthDay(1).atHour(9).inTimezone("Asia/Kolkata").create();
}
