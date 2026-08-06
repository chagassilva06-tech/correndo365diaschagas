import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-black italic tracking-tighter text-foreground uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">404</h1>
        <h2 className="mt-4 text-xl font-black italic tracking-tighter text-foreground uppercase">Página não encontrada</h2>
        <p className="mt-2 text-xs font-medium text-muted-foreground tracking-tight">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--neon-green)] px-6 py-2 text-[10px] font-black uppercase tracking-widest text-black transition-all hover:bg-[var(--neon-green-hover)] shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-black italic tracking-tighter text-foreground uppercase">
          Ops! Algo deu errado
        </h1>
        <p className="mt-2 text-xs font-medium text-muted-foreground tracking-tight">
          Verificamos a estabilidade do sistema. Tente atualizar a página ou volte para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[var(--neon-green)] px-6 py-2 text-[10px] font-black uppercase tracking-widest text-black transition-all hover:bg-[var(--neon-green-hover)] shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-background px-6 py-2 text-[10px] font-black uppercase tracking-widest text-foreground transition-all hover:bg-accent hover:border-[var(--neon-green)]/30"
          >
            Voltar ao Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Correndo todo dia" },
      { name: "description", content: "365 dias. Uma única missão. Transformando disciplina em quilômetros." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Correndo todo dia" },
      { property: "og:description", content: "365 dias. Uma única missão. Transformando disciplina em quilômetros." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Correndo todo dia" },
      { name: "twitter:description", content: "365 dias. Uma única missão. Transformando disciplina em quilômetros." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a5749db7-bf03-459d-998a-ef91a47432af/id-preview-bf0bbccd--34026595-32dc-4c29-bbce-74616470d31c.lovable.app-1785804731789.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a5749db7-bf03-459d-998a-ef91a47432af/id-preview-bf0bbccd--34026595-32dc-4c29-bbce-74616470d31c.lovable.app-1785804731789.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="dark">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
