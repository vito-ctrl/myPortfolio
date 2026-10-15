import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ArchitectureExplorer } from '@/components/architecture/ArchitectureExplorer';
import { myCityLifeArchitecture } from '@/content/architecture/my-city-life';
import { sprintlyArchitecture } from '@/content/architecture/sprintly';

describe('ArchitectureExplorer Component', () => {
  it('renders initial node and detail panel for My-City-Life', () => {
    render(<ArchitectureExplorer diagram={myCityLifeArchitecture} />);

    expect(screen.getByTestId('architecture-explorer')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /My-City-Life Architecture Overview/i }),
    ).toBeInTheDocument();

    const detailPanel = screen.getByTestId('node-detail-panel');
    expect(detailPanel).toHaveAttribute('aria-live', 'polite');
    expect(detailPanel).toHaveTextContent('React SPA Client');
    expect(detailPanel).toHaveTextContent('Laravel Echo');
  });

  it('updates selection and detail panel on node button click', () => {
    render(<ArchitectureExplorer diagram={myCityLifeArchitecture} />);

    // Click on Laravel REST API node (use getAllByRole to get desktop/mobile button)
    const apiButtons = screen.getAllByRole('button', { name: /Laravel REST API/i });
    expect(apiButtons.length).toBeGreaterThan(0);

    fireEvent.click(apiButtons[0]);

    // Button should be active (aria-pressed true)
    expect(apiButtons[0]).toHaveAttribute('aria-pressed', 'true');

    // Detail panel should update
    const detailPanel = screen.getByTestId('node-detail-panel');
    expect(detailPanel).toHaveTextContent('Laravel 13');
    expect(detailPanel).toHaveTextContent('PHP 8.3');
    expect(detailPanel).toHaveTextContent('JWT Auth');
  });

  it('supports keyboard navigation via Enter key on node button', () => {
    render(<ArchitectureExplorer diagram={myCityLifeArchitecture} />);

    const stripeButtons = screen.getAllByRole('button', { name: /Stripe Payments/i });
    expect(stripeButtons.length).toBeGreaterThan(0);

    fireEvent.click(stripeButtons[0]);

    const detailPanel = screen.getByTestId('node-detail-panel');
    expect(detailPanel).toHaveTextContent('PaymentIntents API');
  });

  it('allows jumping between connected nodes via detail panel connection buttons', () => {
    render(<ArchitectureExplorer diagram={myCityLifeArchitecture} />);

    // Select Laravel REST API
    const apiButtons = screen.getAllByRole('button', { name: /Laravel REST API/i });
    fireEvent.click(apiButtons[0]);

    // Detail panel shows outgoing link to MySQL Database
    const mysqlLinkBtn = screen.getByRole('button', { name: /→ MySQL Database/i });
    expect(mysqlLinkBtn).toBeInTheDocument();

    fireEvent.click(mysqlLinkBtn);

    const detailPanel = screen.getByTestId('node-detail-panel');
    expect(detailPanel).toHaveTextContent('MySQL Database');
    expect(detailPanel).toHaveTextContent('NODE ID: mysql-db');
  });

  it('renders Sprintly architecture with ring-algorithm node and security middleware', () => {
    render(<ArchitectureExplorer diagram={sprintlyArchitecture} />);

    expect(
      screen.getByRole('heading', { name: /Sprintly Architecture Overview/i }),
    ).toBeInTheDocument();

    const ringButtons = screen.getAllByRole('button', { name: /Evaluation-Ring Algorithm/i });
    expect(ringButtons.length).toBeGreaterThan(0);

    fireEvent.click(ringButtons[0]);

    const detailPanel = screen.getByTestId('node-detail-panel');
    expect(detailPanel).toHaveTextContent('Crypto RNG');
    expect(detailPanel).toHaveTextContent('Graph Ring Partitioning');
  });
});
