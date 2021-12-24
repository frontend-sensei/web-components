export function showFile(response, type = 'application/pdf') {
  const url = window.URL.createObjectURL(new Blob([response.data], { type }))
  window.open(url)
}
