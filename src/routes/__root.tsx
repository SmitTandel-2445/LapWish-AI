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
import { Header } from "../component/site/Header";
import { Footer } from "../component/site/Footer";
import { BackToTop } from "../component/site/BackToTop";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass rounded-3xl p-10">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has drifted into the void.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">Go home</Link>
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
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass rounded-3xl p-10">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something glitched. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-glass">Go home</a>
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
      { title: "LapWise AI" },
      { name: "author", content: "LapWise AI" },
      { property: "og:site_name", content: "LapWise AI" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/121053c9-c2d8-41f9-948e-1d4b36737a59/id-preview-5a2f35d4--2bc8be87-8491-40f1-a365-fc9f4180726b.lovable.app-1780982009855.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/121053c9-c2d8-41f9-948e-1d4b36737a59/id-preview-5a2f35d4--2bc8be87-8491-40f1-a365-fc9f4180726b.lovable.app-1780982009855.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "LapWise AI",
          url: "https://lapwise-ai.lovable.app",
          description: "AI-powered personalized laptop recommendations and comparison tools.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "LapWise AI",
          url: "https://lapwise-ai.lovable.app",
        }),
      },
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
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (document.getElementById("noupe-chatbot-embed")) return;
    const s = document.createElement("script");
    s.id = "noupe-chatbot-embed";
    s.src = "https://www.noupe.com/s/umd/41a3378805f/for-embedded-agent.js";
    s.async = true;
    s.onload = () => {
      // @ts-expect-error external global
      window.AgentInitializer?.init({
        agentRenderURL:
          "https://www.noupe.com/agent/019ea7c5d17773f3a2393262211bcdfb3970",
        rootId: "JotformAgent-019ea7c5d17773f3a2393262211bcdfb3970",
        formID: "019ea7c5d17773f3a2393262211bcdfb3970",
        contextID: "019eaaa5b35f7220b627bd2d51a22ae4669a",
        initialContext: "",
        queryParams: [
          "skipWelcome=1",
          "maximizable=1",
          "isNoupeAgent=1",
          "isNoupeLogo=1",
          "noupeSelectedColor=%2300E5FF",
        ],
        domain: "https://www.noupe.com",
        isDraggable: false,
        background: "linear-gradient(135deg, #00E5FF 0%, #8B5CF6 100%)",
        chatBackgroundColor: "#0B0B12",
        buttonBackgroundColor: "#8B5CF6",
        buttonIconColor: "#FFFFFF",
        inputTextColor: "#E5E7EB",
        variant: false,
        customizations: {
          greeting: "Yes",
          greetingMessage: "Hi — I'm LapWise AI. Ask me about any laptop, budget, or use case.",
          openByDefault: "No",
          pulse: "Yes",
          position: "right",
          autoOpenChatIn: "0",
          layout: "square",
        },
        isVoice: false,
        isVoiceWebCallEnabled: false,
      });
    };
    document.head.appendChild(s);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24">
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </QueryClientProvider>
  );
}
