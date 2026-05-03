export function BarMini({ values }: { values: number[] }) {
  return (
    <div className="flex h-20 items-end gap-1">
      {values.map((v, idx) => (
        <div key={idx} className="w-full rounded-t bg-slate-900/70" style={{ height: `${v}%` }} />
      ))}
    </div>
  );
}
