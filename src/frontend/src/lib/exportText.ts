export function exportAsText(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  downloadBlob(blob, filename);
}

export function exportAsMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/markdown' });
  downloadBlob(blob, filename);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
