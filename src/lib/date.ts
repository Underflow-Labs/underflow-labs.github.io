const articleDateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDateLabel(value: string) {
  const normalized = value.length === 10 ? `${value}T12:00:00Z` : value;
  return articleDateFormatter.format(new Date(normalized));
}
