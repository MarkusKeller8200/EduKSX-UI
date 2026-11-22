import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    Columns2,
    Expand,
    Laptop,
    Maximize2,
    Menu,
    Moon,
    MoveHorizontal,
    RectangleHorizontal,
    RectangleVertical,
    Smartphone,
    Sun,
    SunMoon,
    Tablet,
    X,
} from 'lucide-react';
import pkg from '../../package.json';
import { BrandWordmark } from '../../src/components/brand-wordmark';
import { cn } from '../../src/lib/cn';
import { deviceFrame } from './devices';
import { ENTRIES, GROUPS, type Entry } from './registry';
import { EMBEDDED, setSetting, useApplyScheme, useRoute, useSettings, type Ansicht, type Ausrichtung, type Schema, type Theme } from './settings';
import { BUILTIN_THEMES } from '../../src/generated/tokens';
import { docUrl, IssueLinks, REPO, StatusBadge } from './ui';
import { Uebersicht } from './sections/uebersicht';
import { EntryContext } from './entry-context';

const START = 'uebersicht';

function PreviewBar() {
    const s = useSettings();
    const device = s.ansicht === 'handy' || s.ansicht === 'tablet';
    return (
        <div className="sticky top-0 z-40 border-b border-border bg-sidebar text-sidebar-foreground">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2">
                <a href="#/uebersicht" className="mr-auto flex items-baseline gap-2 rounded-md">
                    <BrandWordmark suffix="UI" className="text-lg" />
                    <span className="text-sm text-muted-foreground">Testseite · {pkg.version}</span>
                </a>
                <div role="toolbar" aria-label="Vorschau" className="flex flex-wrap items-center gap-2">
                    <ToggleGroupBar
                        label="Farbschema"
                        value={s.schema}
                        onChange={(v) => setSetting('schema', v as Schema)}
                        options={[
                            { value: 'hell', label: 'Hell', icon: Sun },
                            { value: 'dunkel', label: 'Dunkel', icon: Moon },
                            { value: 'system', label: 'Wie System', icon: SunMoon },
                        ]}
                    />
                    <label className="inline-flex items-center gap-1.5 text-sm">
                        <span className="sr-only desk:not-sr-only">Theme</span>
                        <select
                            value={s.theme}
                            onChange={(e) => setSetting('theme', e.target.value as Theme)}
                            className="min-h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
                        >
                            <option value="eduksx">EduKSX</option>
                            {BUILTIN_THEMES.map((t) => (
                                <option key={t.key} value={t.key}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button
                        type="button"
                        aria-pressed={s.vergleich}
                        title="Beispiele hell und dunkel nebeneinander"
                        aria-label="Beispiele hell und dunkel nebeneinander"
                        onClick={() => setSetting('vergleich', !s.vergleich)}
                        className={cn(
                            'inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-border transition-colors',
                            s.vergleich ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent',
                        )}
                    >
                        <Columns2 className="size-4" aria-hidden="true" />
                    </button>
                    <ToggleGroupBar
                        label="Ansicht"
                        value={s.ansicht}
                        onChange={(v) => setSetting('ansicht', v as Ansicht)}
                        options={[
                            { value: 'handy', label: 'Handy', icon: Smartphone },
                            { value: 'tablet', label: 'Tablet', icon: Tablet },
                            { value: 'optimiert', label: 'Darstellungsoptimiert', icon: Laptop },
                            { value: 'breit', label: 'Breit', icon: MoveHorizontal },
                            { value: 'voll', label: 'Voll', icon: Maximize2 },
                        ]}
                    />
                    {device ? (
                        <ToggleGroupBar
                            label="Ausrichtung"
                            value={s.ausrichtung}
                            onChange={(v) => setSetting('ausrichtung', v as Ausrichtung)}
                            options={[
                                { value: 'hoch', label: 'Hochformat', icon: RectangleVertical },
                                { value: 'quer', label: 'Querformat', icon: RectangleHorizontal },
                            ]}
                        />
                    ) : (
                        <button
                            type="button"
                            title="Vollbild (Escape beendet)"
                            aria-label="Vollbild"
                            onClick={() => document.documentElement.requestFullscreen?.()}
                            className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-border bg-background transition-colors hover:bg-accent"
                        >
                            <Expand className="size-4" aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>
            {s.vergleich && (
                <p className="border-t border-border px-4 py-1 text-xs text-muted-foreground">
                    Vergleich: Die Seite bleibt hell, jedes Beispiel erscheint hell und dunkel nebeneinander.
                </p>
            )}
        </div>
    );
}

type Opt = { value: string; label: string; icon: typeof Sun };
function ToggleGroupBar({ label, value, options, onChange }: { label: string; value: string; options: Opt[]; onChange: (v: string) => void }) {
    return (
        <div role="group" aria-label={label} className="inline-flex rounded-md border border-border bg-background p-0.5">
            {options.map((o) => {
                const Icon = o.icon;
                const active = o.value === value;
                return (
                    <button
                        key={o.value}
                        type="button"
                        aria-pressed={active}
                        aria-label={o.label}
                        title={`${label}: ${o.label}`}
                        onClick={() => onChange(o.value)}
                        className={cn(
                            'inline-flex min-h-8 min-w-8 items-center justify-center rounded-sm transition-colors',
                            active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent hover:text-accent-foreground',
                        )}
                    >
                        <Icon className="size-4" aria-hidden="true" />
                    </button>
                );
            })}
        </div>
    );
}

function Nav({ route, onPick }: { route: string; onPick?: () => void }) {
    return (
        <nav aria-label="Inhalt" className="space-y-5 text-sm">
            <a
                href="#/uebersicht"
                onClick={onPick}
                aria-current={route === START ? 'page' : undefined}
                className={cn('block rounded-md px-2 py-1.5 hover:bg-sidebar-accent', route === START && 'bg-sidebar-accent font-semibold')}
            >
                Übersicht
            </a>
            {GROUPS.map((g) => (
                <div key={g} className="space-y-1">
                    <p className="px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{g}</p>
                    <ul className="space-y-0.5">
                        {ENTRIES.filter((e) => e.group === g).map((e) => (
                            <li key={e.id}>
                                <a
                                    href={`#/${e.id}`}
                                    onClick={onPick}
                                    aria-current={route === e.id ? 'page' : undefined}
                                    className={cn('block rounded-md px-2 py-1.5 hover:bg-sidebar-accent', route === e.id && 'bg-sidebar-accent font-semibold')}
                                >
                                    {e.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
}

function conceptHref(path: string) {
    return path.startsWith('http') ? path : docUrl(path);
}

function PageHead({ entry }: { entry: Entry }) {
    return (
        <header className="space-y-3 border-b border-border pb-6">
            <p className="text-sm text-muted-foreground">{entry.group}</p>
            <h1 className="typo-h1">{entry.title}</h1>
            <p className="typo-lead max-w-prose text-muted-foreground">{entry.summary}</p>
            <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <dt className="sr-only">Status</dt>
                    <dd>
                        <StatusBadge status={entry.status} />
                    </dd>
                </div>
                <div className="flex items-center gap-2">
                    <dt className="text-muted-foreground">Konzept</dt>
                    <dd>
                        <a href={conceptHref(entry.concept.path)} className="text-link underline-offset-2 hover:underline">
                            {entry.concept.label}
                        </a>
                    </dd>
                </div>
                {entry.issues.length > 0 && (
                    <div className="flex items-center gap-2">
                        <dt className="text-muted-foreground">Issues</dt>
                        <dd>
                            <IssueLinks issues={entry.issues} />
                        </dd>
                    </div>
                )}
            </dl>
        </header>
    );
}

function Content() {
    const [route] = useRoute(START);
    const { ansicht } = useSettings();
    const [menuOpen, setMenuOpen] = useState(false);
    const entry = ENTRIES.find((e) => e.id === route);
    const main = useRef<HTMLElement>(null);

    // Neue Seite: nach oben, Fokus auf den Inhalt (Tastatur und Bildschirmleser).
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${entry?.title ?? 'Übersicht'} – EduKSX-UI Testseite`;
        if (EMBEDDED && window.parent !== window) {
            try {
                window.parent.history.replaceState(null, '', `#/${route}`);
            } catch {
                /* anderer Ursprung */
            }
        }
    }, [route, entry]);

    const width = EMBEDDED ? 'max-w-none' : ansicht === 'breit' ? 'max-w-page-wide' : ansicht === 'voll' ? 'max-w-none' : 'max-w-page-optimized';

    return (
        <div className={cn('mx-auto w-full', width)}>
            <div className="flex items-center gap-2 border-b border-border px-4 py-2 lg:hidden">
                <button
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="testseite-nav"
                    onClick={() => setMenuOpen((o) => !o)}
                    className="inline-flex min-h-9 items-center gap-2 rounded-md border border-border px-3 text-sm hover:bg-accent"
                >
                    {menuOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
                    Inhalt
                </button>
                <span className="truncate text-sm text-muted-foreground">{entry?.title ?? 'Übersicht'}</span>
            </div>
            {menuOpen && (
                <div id="testseite-nav" className="border-b border-border bg-sidebar p-4 lg:hidden">
                    <Nav route={route} onPick={() => setMenuOpen(false)} />
                </div>
            )}
            <div className="lg:grid lg:grid-cols-[15rem_1fr]">
                <aside className="hidden border-r border-border bg-sidebar p-4 lg:block">
                    <div className={EMBEDDED ? "sticky top-4" : "sticky top-20"}>
                        <Nav route={route} />
                    </div>
                </aside>
                <main ref={main} id="inhalt" tabIndex={-1} className="min-w-0 outline-none space-y-8 p-4 sm:p-6 lg:p-8">
                    {entry ? (
                        <>
                            <PageHead entry={entry} />
                            <EntryContext.Provider value={entry}>
                                <entry.Page />
                            </EntryContext.Provider>
                        </>
                    ) : (
                        <Uebersicht />
                    )}
                    <footer className="border-t border-border pt-4 text-xs text-muted-foreground">
                        <a href={REPO} className="underline-offset-2 hover:underline">
                            @eduksx/ui {pkg.version}
                        </a>{' '}
                        · Developed by <BrandWordmark brand="developer" />
                    </footer>
                </main>
            </div>
        </div>
    );
}

/** Geräte-Ansicht: dieselbe Seite im iframe in Gerätegrösse, verkleinert, wenn der Platz nicht reicht. */
function DeviceFrame({ w, h }: { w: number; h: number }) {
    const s = useSettings();
    const box = useRef<HTMLDivElement>(null);
    const frame = useRef<HTMLIFrameElement>(null);
    const [scale, setScale] = useState(1);
    const [route] = useRoute(START);
    const [src] = useState(() => `${window.location.pathname}?embed=1#/${route}`);

    useLayoutEffect(() => {
        const el = box.current;
        if (!el) return;
        const fit = () => setScale(Math.min(1, (el.clientWidth - 32) / (w + 16), (window.innerHeight - el.getBoundingClientRect().top - 48) / (h + 16)));
        fit();
        const ro = new ResizeObserver(fit);
        ro.observe(el);
        window.addEventListener('resize', fit);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', fit);
        };
    }, [w, h]);

    // Navigation in der Vorschau-Leiste (Hash) an die eingebettete Seite weitergeben.
    useEffect(() => {
        const win = frame.current?.contentWindow;
        if (win && win.location.hash !== `#/${route}`) win.location.hash = `/${route}`;
    }, [route]);

    const label = `${s.ansicht === 'handy' ? 'Handy' : 'Tablet'} ${s.ausrichtung === 'hoch' ? 'hoch' : 'quer'} · ${w} × ${h} px${scale < 1 ? ` · verkleinert auf ${Math.round(scale * 100)} %` : ''}`;
    return (
        <div ref={box} className="flex flex-col items-center gap-2 px-4 py-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <div style={{ width: (w + 16) * scale, height: (h + 16) * scale }}>
                <iframe
                    ref={frame}
                    src={src}
                    title={`Vorschau ${label}`}
                    width={w}
                    height={h}
                    className="origin-top-left rounded-[1.25rem] border-8 border-foreground bg-background shadow-lg"
                    style={{ transform: `scale(${scale})`, width: w + 16, height: h + 16 }}
                />
            </div>
        </div>
    );
}

export function App() {
    useApplyScheme();
    const s = useSettings();
    if (EMBEDDED) return <Content />;
    const size = deviceFrame(s.ansicht, s.ausrichtung);
    return (
        <>
            <button
                type="button"
                onClick={() => document.getElementById('inhalt')?.focus()}
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:p-2"
            >
                Zum Inhalt
            </button>
            <PreviewBar />
            {size ? <DeviceFrame w={size.w} h={size.h} /> : <Content />}
        </>
    );
}
