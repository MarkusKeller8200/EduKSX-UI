import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { VIEW_WIDTH_STORAGE_KEY, ViewWidthToggle, useViewWidth, type ViewWidth } from '../src';

function Demo() {
    const [v, setV] = useState<ViewWidth>('optimized');
    return <ViewWidthToggle value={v} onChange={setV} />;
}

describe('ViewWidthToggle (#19)', () => {
    afterEach(() => window.localStorage.clear());

    it('hat vier benannte Ansichten, Vorgabe darstellungsoptimiert', async () => {
        const user = userEvent.setup();
        render(<Demo />);
        expect(screen.getByRole('group', { name: 'Ansicht' })).toBeInTheDocument();
        const breit = screen.getByRole('button', { name: 'Breit' });
        expect(screen.getByRole('button', { name: 'Darstellungsoptimiert' })).toHaveAttribute('aria-pressed', 'true');
        await user.click(breit);
        expect(breit).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getAllByRole('button', { pressed: true })).toHaveLength(1);
        for (const name of ['Mobil', 'Voll (ganze Breite)']) expect(screen.getByRole('button', { name })).toBeInTheDocument();
    });

    it('useViewWidth speichert die Wahl und ignoriert ungültige Werte', () => {
        const { result } = renderHook(() => useViewWidth());
        expect(result.current[0]).toBe('optimized');
        act(() => result.current[1]('full'));
        expect(window.localStorage.getItem(VIEW_WIDTH_STORAGE_KEY)).toBe('full');
        window.localStorage.setItem(VIEW_WIDTH_STORAGE_KEY, 'riesig');
        expect(renderHook(() => useViewWidth()).result.current[0]).toBe('optimized');
    });
});
