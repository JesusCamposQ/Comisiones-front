export function formatDate(dateString: string): string {
  // Convierte formato dd/mm/yyyy a yyyy-mm-dd para API
  const parts = dateString.split("/")
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`
  }
  return dateString
}

export function parseDate(dateString: string): Date {
  // Convierte formato yyyy-mm-dd a Date
  return new Date(dateString)
}
