import { useEffect, useState } from 'react';
import tokens from '../../../tokens/tokens.json';
import { Block, Code, Example } from '../ui';

const DURATIONS = Object.entries(tokens.duration) as [string, { $value: string; $description?: string }][];
const EASINGS = Object.entries(tokens.easing) as [string, { $value: number[]; $description?: string }][];

function useReducedMotion() {
    const q = '(prefers-reduced-motion: reduce)';
    const [on, setOn] = useState(() => typeof window.matchMedia === 'function' && window.matchMedia(q).matches);
    useEffect(() => {
        if (typeof window.matchMedia !== 'function') return;
        const mq = window.matchMedia(q);
        const f = () => setOn(mq.matches);
        mq.addEventListener('change', f);
        return () => mq.removeEventListener('change', f);
    }, []);
    return on;
}

export function Animation() {
    const [moved, setMoved] = useState(false);
    const reduced = useReducedMotion();
    return (
        <div className="space-y-8">
            <p className="max-w-prose">
                Dauern nur über die Tokens angeben (<Code>transition-colors</Code> nimmt <Code>duration.fast</Code>, sonst{' '}
                <Code>duration-(--duration-normal)</Code>). Bei «Bewegung reduzieren» im Betriebssystem setzt{' '}
                <Code>tokens.css</Code> alle Dauern auf 0 ms.
            </p>
            <Example label="Weniger Bewegung">
                <p className="text-sm">
                    Einstellung «Bewegung reduzieren» in diesem Browser:{' '}
                    <strong className="font-semibold">{reduced ? 'ein – alle Dauern 0 ms' : 'aus'}</strong>
                </p>
            </Example>
            <Block title="Dauern und Kurven" note="Knopf drücken: jede Fläche bewegt sich mit ihrer Dauer bzw. Kurve.">
                <Example label="Bewegung" className="space-y-3">
                    <button
                        type="button"
                        onClick={() => setMoved((m) => !m)}
                        aria-pressed={moved}
                        className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                    >
                        Bewegung {moved ? 'zurück' : 'starten'}
                    </button>
                    {[
                        ...DURATIONS.map(([n, d]) => ({ key: `duration-${n}`, label: `duration.${n} · ${d.$value}`, desc: d.$description, dur: `var(--duration-${n})`, ease: 'var(--ease-standard)' })),
                        ...EASINGS.map(([n, e]) => ({ key: `ease-${n}`, label: `easing.${n} · cubic-bezier(${e.$value.join(', ')})`, desc: e.$description, dur: 'var(--duration-slow)', ease: `var(--ease-${n})` })),
                    ].map((r) => (
                        <div key={r.key} className="space-y-1">
                            <p className="text-xs">
                                <span className="font-mono">{r.label}</span> <span className="text-muted-foreground">– {r.desc}</span>
                            </p>
                            <div className="relative h-6 rounded-full bg-muted [container-type:inline-size]">
                                <span
                                    className="absolute top-0 left-0 size-6 rounded-full bg-brand-orange"
                                    style={{ transform: moved ? 'translateX(calc(100cqw - 1.5rem))' : 'none', transitionProperty: 'transform', transitionDuration: r.dur, transitionTimingFunction: r.ease }}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    ))}
                </Example>
            </Block>
        </div>
    );
}
