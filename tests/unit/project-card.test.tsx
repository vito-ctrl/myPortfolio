import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getProjectBySlug } from '@/content';

describe('ProjectCard Component', () => {
  it('renders My-City-Life with repo link but without live demo link', () => {
    const project = getProjectBySlug('my-city-life');
    expect(project).toBeDefined();
    render(<ProjectCard project={project!} />);

    expect(screen.getByRole('heading', { name: 'My-City-Life' })).toBeInTheDocument();
    expect(screen.getByText('FINISHED')).toBeInTheDocument();

    // Source link should be present
    const sourceLink = screen.getByRole('link', { name: /Source/i });
    expect(sourceLink).toHaveAttribute('href', 'https://github.com/vito-ctrl/My-City-Life');

    // Live demo should NOT be present
    expect(screen.queryByRole('link', { name: /Live Demo/i })).not.toBeInTheDocument();
  });

  it('renders Sprintly gracefully with NO repo link and NO live demo link', () => {
    const project = getProjectBySlug('sprintly');
    expect(project).toBeDefined();
    render(<ProjectCard project={project!} />);

    expect(screen.getByRole('heading', { name: 'Sprintly' })).toBeInTheDocument();
    // Neither repo nor demo link should be rendered
    expect(screen.queryByRole('link', { name: /Source/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Repo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Live Demo/i })).not.toBeInTheDocument();
  });

  it('renders SubTrack with plain in-memory limitation notice and NO repo link', () => {
    const project = getProjectBySlug('subtrack');
    expect(project).toBeDefined();
    render(<ProjectCard project={project!} />);

    expect(screen.getByRole('heading', { name: 'SubTrack' })).toBeInTheDocument();
    expect(
      screen.getByText(/Data is stored in memory only, so it is not persisted between runs\./i),
    ).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Source/i })).not.toBeInTheDocument();
  });

  it('renders DevCollab with paused badge and foundation note', () => {
    const project = getProjectBySlug('devcollab');
    expect(project).toBeDefined();
    render(<ProjectCard project={project!} />);

    expect(screen.getByText('ONGOING / PAUSED')).toBeInTheDocument();
    expect(
      screen.getByText(/\[NOTE: Foundation built, development paused\.\]/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Source/i })).toHaveAttribute(
      'href',
      'https://github.com/vito-ctrl/student-project-platform',
    );
  });

  it('renders chance-to-freedom with BOTH demo and source links', () => {
    const project = getProjectBySlug('chance-to-freedom');
    expect(project).toBeDefined();
    render(<ProjectCard project={project!} />);

    const demoLink = screen.getByRole('link', { name: /Live Demo/i });
    expect(demoLink).toHaveAttribute('href', 'https://vito-ctrl.github.io/chance-to-freedom/');

    const sourceLink = screen.getByRole('link', { name: /Source/i });
    expect(sourceLink).toHaveAttribute('href', 'https://github.com/vito-ctrl/chance-to-freedom');
  });

  it('renders File-Organizer-Tool as compact card with repo link', () => {
    const project = getProjectBySlug('file-organizer-tool');
    expect(project).toBeDefined();
    render(<ProjectCard project={project!} />);

    expect(screen.getByRole('heading', { name: 'File-Organizer-Tool' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Repo ↗/i })).toHaveAttribute(
      'href',
      'https://github.com/vito-ctrl/File-Organizer-Tool',
    );
  });
});
