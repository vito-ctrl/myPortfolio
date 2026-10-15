import { ArchitectureDiagram } from '../types';

export const myCityLifeArchitecture: ArchitectureDiagram = {
  projectSlug: 'my-city-life',
  title: 'My-City-Life Architecture Overview',
  description:
    'Decoupled client-server architecture with real-time WebSocket broadcasting, third-party payment integration, social OAuth, and role-based moderation.',
  nodes: [
    {
      id: 'react-spa',
      label: 'React SPA Client',
      kind: 'client',
      description:
        'Frontend application rendering interactive UI, checkout elements with Stripe, and receiving live push notifications.',
      tech: ['React 19', 'Vite', 'Tailwind CSS 4', 'Stripe Elements', 'Laravel Echo'],
      linksTo: ['laravel-api'],
    },
    {
      id: 'laravel-api',
      label: 'Laravel REST API',
      kind: 'api',
      description:
        'Core backend API handling business logic, JWT authentication, CRUD endpoints, and webhook processing.',
      tech: ['Laravel 13', 'PHP 8.3', 'JWT Auth'],
      linksTo: [
        'mysql-db',
        'stripe-gateway',
        'oauth-providers',
        'laravel-reverb',
        'moderation-roles',
      ],
    },
    {
      id: 'mysql-db',
      label: 'MySQL Database',
      kind: 'database',
      description:
        'Relational persistence for users, activities, businesses, bookings, favorites, comments, and permissions.',
      tech: ['MySQL'],
      linksTo: [],
    },
    {
      id: 'stripe-gateway',
      label: 'Stripe Payments',
      kind: 'service',
      description:
        'Payment processing via PaymentIntents. Signed webhooks verify payment and update bookings and reservations to paid status.',
      tech: ['Stripe Elements', 'Stripe Webhooks', 'PaymentIntents API'],
      linksTo: ['laravel-api'],
    },
    {
      id: 'oauth-providers',
      label: 'OAuth Social Login',
      kind: 'auth',
      description:
        'Federated authentication for Google and Facebook login via Laravel Socialite alongside standard credentials.',
      tech: ['Laravel Socialite', 'Google OAuth', 'Facebook Login'],
      linksTo: ['laravel-api'],
    },
    {
      id: 'laravel-reverb',
      label: 'Laravel Reverb (WebSockets)',
      kind: 'service',
      description:
        'First-party WebSocket server delivering real-time notification events to the frontend via Laravel Echo.',
      tech: ['Laravel Reverb', 'WebSockets', 'Laravel Echo'],
      linksTo: ['react-spa'],
    },
    {
      id: 'moderation-roles',
      label: 'Roles & Moderation Layer',
      kind: 'security',
      description:
        'Role-based access control (user, organizer, admin) via Spatie permissions. Admin moderation workflow for activities/businesses and ban middleware.',
      tech: ['Spatie Permissions', 'Custom Middleware', 'RBAC'],
      linksTo: ['mysql-db'],
    },
  ],
};
