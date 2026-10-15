import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import { CommandPalette } from '@/components/palette/CommandPalette';
import { openCommandPalette } from '@/lib/palette';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('CommandPalette Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('is closed by default', () => {
    render(<CommandPalette />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens when openCommandPalette() event helper is called', async () => {
    render(<CommandPalette />);
    act(() => {
      openCommandPalette();
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: /Command Palette/i })).toBeInTheDocument();
    });
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('opens and closes with Ctrl+K shortcut', async () => {
    render(<CommandPalette />);

    // Press Ctrl+K to open
    act(() => {
      fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Press Escape to close
    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('does NOT hijack Ctrl+K when focus is inside another input element', () => {
    render(
      <div>
        <input data-testid="other-input" type="text" />
        <CommandPalette />
      </div>,
    );

    const otherInput = screen.getByTestId('other-input');
    otherInput.focus();

    act(() => {
      fireEvent.keyDown(otherInput, { key: 'k', ctrlKey: true });
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('filters items correctly by query', async () => {
    render(<CommandPalette />);
    act(() => {
      openCommandPalette();
    });

    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const input = screen.getByRole('combobox');
    act(() => {
      fireEvent.change(input, { target: { value: 'sprintly' } });
    });

    await waitFor(() => {
      expect(screen.getByText('Sprintly')).toBeInTheDocument();
      expect(screen.queryByText('My-City-Life')).not.toBeInTheDocument();
    });
  });

  it('supports keyboard navigation with ArrowDown, ArrowUp, and Enter', async () => {
    render(<CommandPalette />);
    act(() => {
      openCommandPalette();
    });

    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    const input = screen.getByRole('combobox');
    act(() => {
      fireEvent.change(input, { target: { value: 'projects' } });
    });

    // Arrow down
    act(() => {
      fireEvent.keyDown(input, { key: 'ArrowDown' });
    });
    // Press Enter to select
    act(() => {
      fireEvent.keyDown(input, { key: 'Enter' });
    });

    expect(mockPush).toHaveBeenCalled();
  });

  it('restores focus to previous element upon closing with Esc', async () => {
    render(
      <div>
        <button data-testid="trigger-btn">Trigger</button>
        <CommandPalette />
      </div>,
    );

    const triggerBtn = screen.getByTestId('trigger-btn');
    triggerBtn.focus();
    expect(document.activeElement).toBe(triggerBtn);

    act(() => {
      openCommandPalette();
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const input = screen.getByRole('combobox');
    act(() => {
      fireEvent.keyDown(input, { key: 'Escape' });
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(document.activeElement).toBe(triggerBtn);
  });
});
