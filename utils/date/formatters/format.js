export function formatDate (date, format = 'en-US') {
    return date ? new Date(date).toLocaleDateString(format, { year: 'numeric', month: '2-digit', day: '2-digit' }) : null
}
