import { useEffect, useState } from 'react';

interface Props {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  format: (v: number) => string;
  label: string;
}

/** Curseur à deux poignées ; la valeur n'est transmise qu'au relâchement pour éviter de recalculer à chaque pixel. */
export function DualRange({ min, max, step, value, onChange, format, label }: Props) {
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);
  const pct = (v: number) => (max === min ? 0 : ((v - min) / (max - min)) * 100);
  const commit = () => {
    if (local[0] !== value[0] || local[1] !== value[1]) onChange(local);
  };
  return (
    <div>
      <div className="dual-range" onPointerUp={commit} onKeyUp={commit} onBlur={commit}>
        <div className="track" />
        <div className="fill" style={{ left: `${pct(local[0])}%`, right: `${100 - pct(local[1])}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={local[0]}
          aria-label={`${label} minimum`}
          onChange={(e) => setLocal([Math.min(Number(e.target.value), local[1]), local[1]])}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={local[1]}
          aria-label={`${label} maximum`}
          onChange={(e) => setLocal([local[0], Math.max(Number(e.target.value), local[0])])}
        />
      </div>
      <div className="mt-0.5 flex justify-between text-[11px] tabular-nums text-zinc-500">
        <span>{format(local[0])}</span>
        <span>{format(local[1])}</span>
      </div>
    </div>
  );
}
