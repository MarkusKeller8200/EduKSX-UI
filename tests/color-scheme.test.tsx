import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { COLOR_SCHEME_STORAGE_KEY, ColorSchemeToggle, useColorScheme, type ColorScheme } from '../src';

function Demo({ initial = 'system' as ColorScheme }) {
    const [v, setV] = useState<ColorScheme>(initial);
    return <ColorSchemeToggle value={v} onChange={setV} />;
}

describe('ColorSchemeToggle (#17)', () => {
    afterEach(() => {
        window.localStorage.clear();
        document.documentElement.classList.remove('dark');
    });

    it('hat drei benannte Symbol-Knöpfe in einer Gruppe, der gewählte ist gedrückt', async () => {
        const user = userEvent.setup();
        render(<Demo />);
        const group = screen.getByRole('group', { name: 'Farbschema' });
        expect(group).toBeInTheDocument();
        const [hell, dunkel, system] = ['Hell', 'Dunkel', 'Wie System'].map((name) => screen.getByRole('button', { name }));
        expect(system).toHaveAttribute('aria-pressed', 'true');
        expect(hell).toHaveAttribute('aria-pressed', 'false');
        dunkel.focus();
        await user.keyboard('{Enter}');
        expect(dunkel).toHaveAttribute('aria-pressed', 'true');
        expect(system).toHaveAttribute('aria-pressed', 'false');
    });

    it('useColorScheme speichert die Wahl und setzt .dark', () => {
        const { result } = renderHook(() => useColorScheme());
        expect(result.current[0]).toBe('system');
        act(() => result.current[1]('dark'));
        expect(window.localStorage.getItem(COLOR_SCHEME_STORAGE_KEY)).toBe('dark');
        expect(document.documentElement).toHaveClass('dark');
        act(() => result.current[1]('light'));
        expect(document.documentElement).not.toHaveClass('dark');
    });

    it('liest eine gespeicherte Wahl und ignoriert ungültige Werte', () => {
        window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, 'dark');
        expect(renderHook(() => useColorScheme()).result.current[0]).toBe('dark');
        window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, 'lila');
        expect(renderHook(() => useColorScheme()).result.current[0]).toBe('system');
    });
});
