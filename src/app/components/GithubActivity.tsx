"use client";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import {
    ActivityCalendar,
    type Activity,
    type ColorScheme,
    type ThemeInput,
} from 'react-activity-calendar'
import 'react-activity-calendar/tooltips.css';
import { AnimatePresence, motion } from 'motion/react';

/* ------------------------------------------------------------------ data ---- */

const DEFAULT_AVAILABLE_YEARS = [ 2026, 2025, 2024, 2023, 2022, 2021 ];

/** Original GitHub-green scale — the default, so `/` keeps rendering as before. */
const DEFAULT_THEME: ThemeInput = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

/** `--ease-out-expo` from the site's motion tokens. */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ------------------------------------------------------------------- props ---- */

export type YearSelectorProps = {
    /** Years to offer, newest first. */
    years: number[];
    /** Currently selected year. */
    selectedYear: number;
    /** Pick a year (keeps controlled/uncontrolled state in sync). */
    selectYear: (year: number) => void;
};

export type GithubActivityProps = {
    /**
     * Calendar heat scale (5 levels per scheme). Defaults to the original
     * GitHub-green theme so existing usages are unchanged.
     */
    theme?: ThemeInput;
    /** Defaults to `"dark"` — the original behaviour. */
    colorScheme?: ColorScheme;
    /** Year tabs, newest first. Defaults to `[2026 … 2021]`. */
    availableYears?: number[];
    /** Controlled year. Omit to keep internal state (starts at the current year). */
    year?: number;
    /** Fired whenever a year is picked, controlled or not. */
    onYearChange?: (year: number) => void;
    /**
     * Replace the default blue/gray year buttons with a site-styled selector
     * (pill/tablist look, motion `layoutId` indicator, …).
     */
    renderSelector?: (selector: YearSelectorProps) => ReactNode;
    /**
     * Crossfade/slide the calendar (and its total-count footer) when the year
     * changes. Off by default so existing usages render exactly as before.
     */
    animateYearChange?: boolean;
    /** Extra class for the root wrapper (e.g. to lay out selector + calendar). */
    className?: string;
};

/**
 * Hydration-safe mount flag: the calendar's loading state renders on the
 * server but bails to `null` on the first client pass (the library assumes
 * reduced motion server-side), which is a hydration mismatch. Gating the
 * calendar on this flag keeps server HTML and the hydration pass identical.
 */
function useHasMounted(): boolean {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
}

/**
 * Local reduced-motion preference. Deliberately not motion's `useReducedMotion`
 * hook — that one logs a console warning whenever it observes the preference,
 * which would surface on the `/` route (where no motion runs at all).
 */
function subscribeReduced(callback: () => void): () => void {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    query.addEventListener('change', callback);
    return () => query.removeEventListener('change', callback);
}

function readReduced(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function usePrefersReducedMotion(): boolean {
    return useSyncExternalStore(subscribeReduced, readReduced, () => false);
}

/* -------------------------------------------------------------- component ---- */

function GithubActivity({
    theme = DEFAULT_THEME,
    colorScheme = 'dark',
    availableYears = DEFAULT_AVAILABLE_YEARS,
    year,
    onYearChange,
    renderSelector,
    animateYearChange = false,
    className,
}: GithubActivityProps) {
    const [internalYear, setInternalYear] = useState(new Date().getFullYear());
    const selectedYear = year ?? internalYear;

    const [data, setData] = useState<Activity[]>([]);
    /** Year `data` belongs to — the calendar only swaps once its year is ready. */
    const [loadedYear, setLoadedYear] = useState<number | null>(null);
    const hasMounted = useHasMounted();
    const prefersReduced = usePrefersReducedMotion();

    useEffect(() => {
        let cancelled = false;
        fetch(`https://github-contributions-api.jogruber.de/v4/bucel-sebastian?y=${selectedYear}`)
            .then(response => response.json())
            .then(response => {
                if (cancelled) return;
                setData(response.contributions);
                setLoadedYear(selectedYear);
            });
        return () => {
            cancelled = true;
        };
    }, [selectedYear]);

    function selectYear(next: number) {
        setInternalYear(next);
        onYearChange?.(next);
    }

    const selector = renderSelector
        ? renderSelector({ years: availableYears, selectedYear, selectYear })
        : (
            <div className="flex justify-center mb-4">
                {availableYears.map(yearOption => (
                    <button
                        key={yearOption}
                        onClick={() => selectYear(yearOption)}
                        className={`px-4 py-2 mx-1 rounded ${selectedYear === yearOption ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {yearOption}
                    </button>
                ))}
            </div>
        );

    const calendar = hasMounted ? (
        <ActivityCalendar
            colorScheme={colorScheme}
            data={data}
            loading={data?.length === 0}
            theme={theme}
            tooltips={{
                activity: {
                    text: ({ count }) =>
                        `${count} ${count === 1 ? 'contribution' : 'contributions'}`,
                    withArrow: true,
                },
            }}
        />
    ) : null;

    // Old year stays visible (dimmed) while its replacement loads, then the
    // keyed swap runs — no empty-state flash. Structure depends only on the
    // `animateYearChange` prop so server and client markup always match;
    // reduced motion just makes every step instant (dim off, no slide).
    const isLoadingYear = loadedYear !== null && loadedYear !== selectedYear;
    const calendarNode = animateYearChange ? (
        <motion.div
            animate={{ opacity: isLoadingYear && !prefersReduced ? 0.45 : 1 }}
            transition={{ duration: prefersReduced ? 0 : 0.3, ease: EASE_OUT_EXPO }}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={loadedYear ?? selectedYear}
                    initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                        prefersReduced
                            ? { opacity: 1, transition: { duration: 0 } }
                            : { opacity: 0, y: -8, transition: { duration: 0.18, ease: EASE_OUT_EXPO } }
                    }
                    transition={{ duration: prefersReduced ? 0 : 0.3, ease: EASE_OUT_EXPO }}
                >
                    {calendar}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    ) : calendar;

    return (
        <div className={className}>
            {selector}
            {calendarNode}
        </div>
    );
}

export default GithubActivity
