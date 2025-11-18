/**
 * Returns the object with the calendar date closest to today + signed days difference.
 * Ignores the time part of opening_date completely for pure day-level comparison.
 * @param {Array<Object>} data - array of objects with opening_date: "YYYY-MM-DD HH:MM:SS"
 * @returns {{closest: Object, days: number} | null}
 */
export function findClosestToToday(data) {
  if (!Array.isArray(data) || data.length === 0) return null;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // local midnight today

  let closest = null;
  let closestDays = 0;
  let minAbs = Infinity;

  for (const obj of data) {
    if (!obj?.opening_date) continue;

    // Take only the YYYY-MM-DD part
    const datePart = obj.opening_date.split(" ")[0];
    const [y, m, d] = datePart.split("-").map(Number);

    if (!y || !m || !d) continue;

    const openingDate = new Date(y, m - 1, d); // local midnight of the opening day

    const diffMs = openingDate.getTime() - today.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const absDays = Math.abs(diffDays);

    // Update if strictly closer or same distance but in the future
    if (absDays < minAbs || (absDays === minAbs && diffDays > closestDays)) {
      minAbs = absDays;
      closestDays = diffDays;
      closest = obj;
    }
  }

  if (!closest) return null;

  return {
    closest, // the full object that is closest
    days: Math.round(closestDays), // signed integer days (will always be whole number)
  };
}
/**
 * Orders locked capsules from closest (soonest to open) to furthest (latest to open).
 * Assumes all capsules in the array are currently locked (opening_date in the future).
 * Uses the full date + time for precise sorting, treating the opening_date strings as UTC.
 * @param {Array<Object>} capsules - Array of objects, each with "opening_date": "YYYY-MM-DD HH:MM:SS"
 * @returns {Array<Object>} New sorted array – soonest opening first
 */
export function orderLockedCapsules(capsules) {
  if (!Array.isArray(capsules)) return [];

  return [...capsules].sort((a, b) => {
    // Treat the date strings as UTC to avoid server/browser timezone issues
    const timeA = a?.opening_date
      ? new Date(a.opening_date.replace(" ", "T") + "Z").getTime()
      : Infinity;

    const timeB = b?.opening_date
      ? new Date(b.opening_date.replace(" ", "T") + "Z").getTime()
      : Infinity;

    // Invalid dates go to the end
    return timeA - timeB;
  });
}
export function formatDate(dateString) {
  const date = new Date(dateString.replace(" ", "T"));
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options).replace(/,\s*$/, ""); // removes the trailing comma if present
}

export function daysFromToday(dateString, defaultValue = 999) {
  const target = new Date(dateString);

  // Check for invalid date
  if (isNaN(target.getTime())) {
    return defaultValue;
  }

  const today = new Date();

  // Normalize both to midnight to avoid timezone issues
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = target - today;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}
