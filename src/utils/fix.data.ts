export default function fixData(data: string): string {
  const fixed = data.split('/').reverse().join('-');
  return fixed;       
}