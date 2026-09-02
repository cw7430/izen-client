import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import type { Route } from './+types/root';
import './app.css';
import { DialogModal } from './shared/components/ui/modal';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Izen' },
    { name: 'description', content: 'Izen 사내 관리 시스템' },
  ];
}

export default function App() {
  return (
    <>
      <DialogModal />
      <Outlet />
    </>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <Card
        style={{ width: '100%', maxWidth: '500px' }}
        className="text-center shadow-lg"
      >
        <Alert variant="danger">
          <Alert.Heading>{message}</Alert.Heading>
          <p>{details}</p>
        </Alert>
        <p>{details}</p>
        {stack && (
          <pre>
            <code>{stack}</code>
          </pre>
        )}
      </Card>
    </main>
  );
}
