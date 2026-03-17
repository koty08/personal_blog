export function highlightNumbers(text: string): React.ReactNode[] {
  const regex = /(\d[\d,]*(?:\s*만\s*명|\s*천\s*명|\s*명|\s*%|\s*배|\s*ms|\s*초)?)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <span key={match.index} className="text-primary font-semibold">
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
