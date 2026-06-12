import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { X, Menu, ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { streamText, convertToModelMessages } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
const appCss = "/assets/styles-BbiAc0tj.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const links = [
  { to: "/", label: "Home" },
  { to: "/wizard", label: "Recommend" },
  { to: "/catalog", label: "Catalog" },
  { to: "/compare", label: "Compare" },
  { to: "/insights", label: "Insights" }
];
function Header() {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsx("header", { className: "fixed top-0 inset-x-0 z-40", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 mt-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ jsx("div", { className: "relative h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--cyan-accent)] to-[var(--violet-accent)] grid place-items-center glow-cyan", children: /* @__PURE__ */ jsx("span", { className: "text-background font-bold text-sm", children: "L" }) }),
        /* @__PURE__ */ jsxs("span", { className: "font-semibold tracking-tight", children: [
          "LapWise",
          /* @__PURE__ */ jsx("span", { className: "text-[var(--cyan-accent)]", children: " AI" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-1", children: links.map((l) => /* @__PURE__ */ jsx(
        Link,
        {
          to: l.to,
          className: "px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5",
          activeProps: { className: "text-foreground bg-white/5" },
          activeOptions: { exact: l.to === "/" },
          children: l.label
        },
        l.to
      )) }),
      /* @__PURE__ */ jsx(Link, { to: "/wizard", className: "hidden md:inline-flex btn-primary text-sm", children: "Get Started" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden p-2 rounded-lg hover:bg-white/5",
          onClick: () => setOpen((v) => !v),
          "aria-label": "Toggle menu",
          children: open ? /* @__PURE__ */ jsx(X, { size: 20 }) : /* @__PURE__ */ jsx(Menu, { size: 20 })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsx("div", { className: "md:hidden mt-2 glass-strong rounded-2xl p-3 animate-fade-up", children: links.map((l) => /* @__PURE__ */ jsx(
      Link,
      {
        to: l.to,
        onClick: () => setOpen(false),
        className: "block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5",
        children: l.label
      },
      l.to
    )) })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "border-t border-white/5 mt-32", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "h-7 w-7 rounded-lg bg-gradient-to-br from-[var(--cyan-accent)] to-[var(--violet-accent)] grid place-items-center", children: /* @__PURE__ */ jsx("span", { className: "text-background font-bold text-xs", children: "L" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "LapWise AI" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Personalized laptop recommendations powered by AI." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-foreground font-medium mb-3", children: "Product" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/wizard", className: "hover:text-foreground", children: "Recommendation Wizard" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/catalog", className: "hover:text-foreground", children: "Catalog" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/compare", className: "hover:text-foreground", children: "Compare" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-foreground font-medium mb-3", children: "Insights" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-muted-foreground", children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/insights", className: "hover:text-foreground", children: "Analytics" }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-foreground font-medium mb-3", children: "Stay sharp" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Curated picks, weekly." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-white/5 py-6 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " LapWise AI. Crafted with intention."
    ] })
  ] });
}
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: show && /* @__PURE__ */ jsx(
    motion.button,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      className: "fixed bottom-6 left-6 z-30 h-11 w-11 rounded-full glass-strong grid place-items-center hover:glow-cyan transition-shadow",
      "aria-label": "Back to top",
      children: /* @__PURE__ */ jsx(ArrowUp, { size: 18 })
    }
  ) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center glass rounded-3xl p-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-gradient", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for has drifted into the void." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "btn-primary", children: "Go home" }) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center glass rounded-3xl p-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something glitched. Try again or head home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "btn-primary",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx("a", { href: "/", className: "btn-glass", children: "Go home" })
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
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
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/121053c9-c2d8-41f9-948e-1d4b36737a59/id-preview-5a2f35d4--2bc8be87-8491-40f1-a365-fc9f4180726b.lovable.app-1780982009855.png" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "LapWise AI",
          url: "https://lapwise-ai.lovable.app",
          description: "AI-powered personalized laptop recommendations and comparison tools."
        })
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "LapWise AI",
          url: "https://lapwise-ai.lovable.app"
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  useEffect(() => {
    if (document.getElementById("noupe-chatbot-embed")) return;
    const s = document.createElement("script");
    s.id = "noupe-chatbot-embed";
    s.src = "https://www.noupe.com/s/umd/41a3378805f/for-embedded-agent.js";
    s.async = true;
    s.onload = () => {
      window.AgentInitializer?.init({
        agentRenderURL: "https://www.noupe.com/agent/019ea7c5d17773f3a2393262211bcdfb3970",
        rootId: "JotformAgent-019ea7c5d17773f3a2393262211bcdfb3970",
        formID: "019ea7c5d17773f3a2393262211bcdfb3970",
        contextID: "019eaaa5b35f7220b627bd2d51a22ae4669a",
        initialContext: "",
        queryParams: [
          "skipWelcome=1",
          "maximizable=1",
          "isNoupeAgent=1",
          "isNoupeLogo=1",
          "noupeSelectedColor=%2300E5FF"
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
          layout: "square"
        },
        isVoice: false,
        isVoiceWebCallEnabled: false
      });
    };
    document.head.appendChild(s);
  }, []);
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 pt-24", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(BackToTop, {})
  ] }) });
}
const $$splitComponentImporter$5 = () => import("./wizard-BeWJkPgc.js");
const Route$7 = createFileRoute("/wizard")({
  head: () => ({
    meta: [{
      title: "AI Recommendation Wizard — LapWise AI"
    }, {
      name: "description",
      content: "Answer a few questions and get a personalized shortlist of laptops scored to your needs."
    }, {
      property: "og:title",
      content: "AI Recommendation Wizard — LapWise AI"
    }, {
      property: "og:description",
      content: "Three quick questions, a curated shortlist scored to your needs."
    }, {
      property: "og:url",
      content: "https://lapwise-ai.lovable.app/wizard"
    }],
    links: [{
      rel: "canonical",
      href: "https://lapwise-ai.lovable.app/wizard"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const asusRogG14 = "/assets/asus-rog-g14-C8TDJlIC.jpg";
const asusVivobook15 = "/assets/asus-vivobook-15-BHjBz0Hl.jpg";
const dellXps15 = "/assets/dell-xps-15-OI5Ujig4.jpg";
const lenovoLegion5Pro = "/assets/lenovo-legion-5-pro-dYZoKn1N.jpg";
const img = (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=80`;
const LAPTOPS = [
  {
    id: "macbook-air-m3",
    name: 'MacBook Air 13" M3',
    brand: "Apple",
    price: 114900,
    cpu: "Apple M3 (8-core)",
    gpu: "10-core GPU",
    ram: "16 GB",
    storage: "512 GB SSD",
    display: '13.6" Liquid Retina',
    refreshRate: "60 Hz",
    battery: "18 hrs",
    weight: "1.24 kg",
    ports: ["2× Thunderbolt", "MagSafe", "3.5mm"],
    usage: ["Coding", "Business", "College Work", "Graphic Design"],
    scores: { performance: 88, gaming: 55, battery: 96, productivity: 95, portability: 98 },
    pros: ["Class-leading battery", "Silent fanless design", "Premium build"],
    cons: ["Limited port selection", "Not ideal for AAA gaming"],
    summary: "An effortlessly portable powerhouse for creators and developers who never want to think about charging.",
    badge: "Editor's Pick",
    rating: 4.8,
    image: img("photo-1517336714731-489689fd1ca8")
  },
  {
    id: "asus-rog-zephyrus-g14",
    name: "ASUS ROG Zephyrus G14",
    brand: "ASUS",
    price: 154990,
    cpu: "AMD Ryzen 9 8945HS",
    gpu: "RTX 4060 8GB",
    ram: "16 GB DDR5",
    storage: "1 TB SSD",
    display: '14" OLED 2.8K',
    refreshRate: "120 Hz",
    battery: "10 hrs",
    weight: "1.5 kg",
    ports: ["HDMI 2.1", "USB-C", "USB-A", "microSD"],
    usage: ["Gaming", "Video Editing", "AI/ML Development"],
    scores: { performance: 93, gaming: 90, battery: 70, productivity: 86, portability: 84 },
    pros: ["OLED display is stunning", "Compact for the power", "Great keyboard"],
    cons: ["Runs warm under load", "Premium pricing"],
    summary: "The most travel-friendly RTX gaming laptop—pairs an OLED panel with serious creator chops.",
    badge: "Best for Gaming",
    rating: 4.7,
    image: asusRogG14.url
  },
  {
    id: "dell-xps-15",
    name: "Dell XPS 15 (9530)",
    brand: "Dell",
    price: 169990,
    cpu: "Intel Core i7-13700H",
    gpu: "RTX 4050 6GB",
    ram: "16 GB DDR5",
    storage: "512 GB SSD",
    display: '15.6" OLED 3.5K',
    refreshRate: "60 Hz",
    battery: "11 hrs",
    weight: "1.86 kg",
    ports: ["2× TB4", "USB-C", "SD"],
    usage: ["Video Editing", "Graphic Design", "Business", "Coding"],
    scores: { performance: 90, gaming: 78, battery: 78, productivity: 93, portability: 80 },
    pros: ["Gorgeous OLED display", "Premium aluminum chassis", "Excellent speakers"],
    cons: ["Webcam is mediocre", "Heats under sustained load"],
    summary: "A creator-first flagship that looks at home in a boardroom and a color-grading suite alike.",
    badge: "Popular",
    rating: 4.6,
    image: dellXps15.url
  },
  {
    id: "lenovo-legion-5-pro",
    name: "Lenovo Legion 5 Pro",
    brand: "Lenovo",
    price: 134990,
    cpu: "Intel Core i7-13700HX",
    gpu: "RTX 4060 8GB",
    ram: "16 GB DDR5",
    storage: "1 TB SSD",
    display: '16" IPS 2.5K',
    refreshRate: "240 Hz",
    battery: "8 hrs",
    weight: "2.5 kg",
    ports: ["HDMI 2.1", "USB-C", "3× USB-A", "RJ45"],
    usage: ["Gaming", "AI/ML Development", "Video Editing"],
    scores: { performance: 92, gaming: 92, battery: 60, productivity: 84, portability: 60 },
    pros: ["Excellent value per FPS", "Cool and quiet cooling", "Bright 240Hz panel"],
    cons: ["Heavy to carry daily", "Average battery life"],
    summary: "A no-compromise gaming workhorse that quietly punches above its price tag.",
    badge: "Best Value",
    rating: 4.7,
    image: lenovoLegion5Pro.url
  },
  {
    id: "hp-pavilion-15",
    name: "HP Pavilion 15",
    brand: "HP",
    price: 58990,
    cpu: "Intel Core i5-1335U",
    gpu: "Iris Xe",
    ram: "16 GB DDR4",
    storage: "512 GB SSD",
    display: '15.6" FHD IPS',
    refreshRate: "60 Hz",
    battery: "9 hrs",
    weight: "1.75 kg",
    ports: ["HDMI", "USB-C", "2× USB-A", "SD"],
    usage: ["College Work", "Business", "Coding"],
    scores: { performance: 70, gaming: 35, battery: 80, productivity: 82, portability: 78 },
    pros: ["Great keyboard", "Affordable", "Solid all-rounder"],
    cons: ["Plastic build", "Display could be brighter"],
    summary: "A dependable everyday laptop with the right specs for students and remote workers.",
    badge: "Best for Students",
    rating: 4.3,
    image: img("photo-1496181133206-80ce9b88a853")
  },
  {
    id: "acer-swift-go-14",
    name: "Acer Swift Go 14",
    brand: "Acer",
    price: 74990,
    cpu: "Intel Core Ultra 5 125H",
    gpu: "Intel Arc",
    ram: "16 GB LPDDR5",
    storage: "512 GB SSD",
    display: '14" OLED 2.8K',
    refreshRate: "90 Hz",
    battery: "12 hrs",
    weight: "1.32 kg",
    ports: ["2× TB4", "HDMI", "USB-A"],
    usage: ["Business", "Coding", "Graphic Design", "College Work"],
    scores: { performance: 80, gaming: 50, battery: 88, productivity: 88, portability: 95 },
    pros: ["OLED at this price", "Very light", "Modern AI-ready CPU"],
    cons: ["Speakers are average", "No discrete GPU"],
    summary: "An OLED ultrabook that feels far more premium than its price suggests.",
    rating: 4.5,
    image: img("photo-1531297484001-80022131f5a1")
  },
  {
    id: "macbook-pro-14-m3-pro",
    name: 'MacBook Pro 14" M3 Pro',
    brand: "Apple",
    price: 199900,
    cpu: "Apple M3 Pro (11-core)",
    gpu: "14-core GPU",
    ram: "18 GB",
    storage: "512 GB SSD",
    display: '14.2" Liquid Retina XDR',
    refreshRate: "120 Hz",
    battery: "17 hrs",
    weight: "1.61 kg",
    ports: ["3× TB4", "HDMI", "SDXC", "MagSafe"],
    usage: ["Video Editing", "AI/ML Development", "Coding", "Graphic Design"],
    scores: { performance: 95, gaming: 70, battery: 94, productivity: 97, portability: 90 },
    pros: ["Stellar mini-LED display", "Top-tier battery for a pro laptop", "Quiet under heavy load"],
    cons: ["Expensive", "Storage upgrades are pricey"],
    summary: "The default professional laptop—built for sustained creative workloads without compromise.",
    badge: "Editor's Pick",
    rating: 4.9,
    image: img("photo-1541807084-5c52b6b3adef")
  },
  {
    id: "asus-vivobook-15",
    name: "ASUS VivoBook 15",
    brand: "ASUS",
    price: 42990,
    cpu: "AMD Ryzen 5 7530U",
    gpu: "Radeon Vega",
    ram: "8 GB DDR4",
    storage: "512 GB SSD",
    display: '15.6" FHD',
    refreshRate: "60 Hz",
    battery: "8 hrs",
    weight: "1.7 kg",
    ports: ["HDMI", "USB-C", "2× USB-A"],
    usage: ["College Work", "Business"],
    scores: { performance: 62, gaming: 30, battery: 72, productivity: 75, portability: 76 },
    pros: ["Very affordable", "Lightweight", "Good for everyday use"],
    cons: ["Only 8GB RAM", "Display is basic"],
    summary: "A solid budget pick for students who mostly write, browse, and stream.",
    badge: "Best for Students",
    rating: 4.2,
    image: asusVivobook15.url
  },
  {
    id: "macbook-pro-16-m3-max",
    name: 'MacBook Pro 16" M3 Max',
    brand: "Apple",
    price: 349900,
    cpu: "Apple M3 Max (16-core)",
    gpu: "40-core GPU",
    ram: "48 GB",
    storage: "1 TB SSD",
    display: '16.2" Liquid Retina XDR',
    refreshRate: "120 Hz",
    battery: "22 hrs",
    weight: "2.16 kg",
    ports: ["3× TB4", "HDMI", "SDXC", "MagSafe"],
    usage: ["Video Editing", "AI/ML Development", "Graphic Design"],
    scores: { performance: 99, gaming: 75, battery: 95, productivity: 99, portability: 75 },
    pros: ["Workstation-class CPU/GPU", "Best-in-class display", "Silent thermals"],
    cons: ["Very expensive", 'Heavy for a 16"'],
    summary: "A portable workstation for video pros and ML researchers who refuse to compromise.",
    rating: 4.9,
    image: img("photo-1484788984921-03950022c9ef")
  },
  {
    id: "macbook-air-15-m3",
    name: 'MacBook Air 15" M3',
    brand: "Apple",
    price: 134900,
    cpu: "Apple M3 (8-core)",
    gpu: "10-core GPU",
    ram: "16 GB",
    storage: "512 GB SSD",
    display: '15.3" Liquid Retina',
    refreshRate: "60 Hz",
    battery: "18 hrs",
    weight: "1.51 kg",
    ports: ["2× TB", "MagSafe", "3.5mm"],
    usage: ["Coding", "Business", "Graphic Design", "College Work"],
    scores: { performance: 86, gaming: 50, battery: 95, productivity: 94, portability: 90 },
    pros: ["Big bright screen", "All-day battery", "Fanless silence"],
    cons: ["Only two USB-C ports", "No HDMI"],
    summary: 'All the joy of a MacBook Air with a roomy 15" canvas for spreadsheets and code.',
    rating: 4.7,
    image: img("photo-1611078489935-0cb964de46d6")
  },
  {
    id: "asus-rog-strix-scar-17",
    name: "ASUS ROG Strix Scar 17",
    brand: "ASUS",
    price: 279990,
    cpu: "Intel Core i9-14900HX",
    gpu: "RTX 4080 12GB",
    ram: "32 GB DDR5",
    storage: "2 TB SSD",
    display: '17.3" QHD Mini-LED',
    refreshRate: "240 Hz",
    battery: "6 hrs",
    weight: "3.0 kg",
    ports: ["HDMI 2.1", "2× USB-C", "3× USB-A", "RJ45"],
    usage: ["Gaming", "Video Editing", "AI/ML Development"],
    scores: { performance: 97, gaming: 98, battery: 45, productivity: 88, portability: 40 },
    pros: ["Desktop-replacement performance", "Brilliant Mini-LED panel", "Top-tier cooling"],
    cons: ["Heavy", "Battery life is short"],
    summary: "An uncompromising flagship for esports and creators who want frame rates above all.",
    badge: "Best for Gaming",
    rating: 4.8,
    image: img("photo-1593642632559-0c6d3fc62b89")
  },
  {
    id: "asus-zenbook-14-oled",
    name: "ASUS Zenbook 14 OLED",
    brand: "ASUS",
    price: 89990,
    cpu: "Intel Core Ultra 7 155H",
    gpu: "Intel Arc",
    ram: "16 GB LPDDR5",
    storage: "1 TB SSD",
    display: '14" OLED 2.8K',
    refreshRate: "120 Hz",
    battery: "14 hrs",
    weight: "1.28 kg",
    ports: ["2× TB4", "HDMI", "USB-A"],
    usage: ["Business", "Coding", "Graphic Design", "College Work"],
    scores: { performance: 82, gaming: 50, battery: 90, productivity: 90, portability: 96 },
    pros: ["Stunning OLED panel", "Premium aluminum build", "Great battery"],
    cons: ["Glossy screen reflects", "Modest GPU power"],
    summary: "A featherweight OLED ultrabook ideal for professionals on the move.",
    rating: 4.6,
    image: img("photo-1611186871348-b1ce696e52c9")
  },
  {
    id: "asus-tuf-a15",
    name: "ASUS TUF Gaming A15",
    brand: "ASUS",
    price: 79990,
    cpu: "AMD Ryzen 7 7735HS",
    gpu: "RTX 4060 8GB",
    ram: "16 GB DDR5",
    storage: "512 GB SSD",
    display: '15.6" FHD IPS',
    refreshRate: "144 Hz",
    battery: "7 hrs",
    weight: "2.2 kg",
    ports: ["HDMI 2.1", "USB-C", "3× USB-A", "RJ45"],
    usage: ["Gaming", "Coding", "Video Editing"],
    scores: { performance: 84, gaming: 86, battery: 60, productivity: 78, portability: 60 },
    pros: ["Strong GPU for the price", "Military-grade chassis", "Great value"],
    cons: ["Display is only FHD", "Average speakers"],
    summary: "Budget-friendly RTX 4060 gaming with rugged build quality.",
    badge: "Best Value",
    rating: 4.5,
    image: img("photo-1588872657578-7efd1f1555ed")
  },
  {
    id: "asus-rog-flow-x13",
    name: "ASUS ROG Flow X13",
    brand: "ASUS",
    price: 159990,
    cpu: "AMD Ryzen 9 7940HS",
    gpu: "RTX 4070 8GB",
    ram: "32 GB LPDDR5",
    storage: "1 TB SSD",
    display: '13.4" QHD+ Touch 2-in-1',
    refreshRate: "165 Hz",
    battery: "10 hrs",
    weight: "1.3 kg",
    ports: ["USB-C", "ROG XG", "HDMI", "USB-A"],
    usage: ["Gaming", "Graphic Design", "Video Editing", "Coding"],
    scores: { performance: 90, gaming: 85, battery: 70, productivity: 88, portability: 92 },
    pros: ["Convertible 2-in-1", "Surprisingly powerful GPU", "Pen support"],
    cons: ["Small screen for gaming", "Pricey"],
    summary: "A tablet-thin convertible that doubles as a serious RTX gaming machine.",
    rating: 4.5,
    image: img("photo-1606229365485-93a3b8ee0385")
  },
  {
    id: "dell-xps-13-plus",
    name: "Dell XPS 13 Plus",
    brand: "Dell",
    price: 139990,
    cpu: "Intel Core Ultra 7 155H",
    gpu: "Intel Arc",
    ram: "16 GB LPDDR5",
    storage: "512 GB SSD",
    display: '13.4" OLED 3.5K',
    refreshRate: "60 Hz",
    battery: "12 hrs",
    weight: "1.26 kg",
    ports: ["2× TB4"],
    usage: ["Business", "Coding", "Graphic Design"],
    scores: { performance: 82, gaming: 45, battery: 84, productivity: 90, portability: 96 },
    pros: ["Striking minimalist design", "Gorgeous OLED", "Excellent keyboard"],
    cons: ["Only USB-C ports", "Polarizing capacitive function row"],
    summary: "A bold, minimalist ultrabook for the design-conscious professional.",
    rating: 4.5,
    image: img("photo-1587825140708-dfaf72ae4b04")
  },
  {
    id: "dell-inspiron-14",
    name: "Dell Inspiron 14",
    brand: "Dell",
    price: 64990,
    cpu: "Intel Core i5-1335U",
    gpu: "Iris Xe",
    ram: "16 GB DDR4",
    storage: "512 GB SSD",
    display: '14" FHD+ IPS',
    refreshRate: "60 Hz",
    battery: "10 hrs",
    weight: "1.54 kg",
    ports: ["HDMI", "USB-C", "2× USB-A", "SD"],
    usage: ["College Work", "Business", "Coding"],
    scores: { performance: 70, gaming: 35, battery: 82, productivity: 82, portability: 86 },
    pros: ["Compact and light", "Reliable performance", "Good value"],
    cons: ["Webcam is basic", "No discrete GPU"],
    summary: "A no-nonsense daily-driver for students and home offices.",
    rating: 4.3,
    image: img("photo-1525547719571-a2d4ac8945e2")
  },
  {
    id: "dell-g15-5530",
    name: "Dell G15 5530",
    brand: "Dell",
    price: 84990,
    cpu: "Intel Core i7-13650HX",
    gpu: "RTX 4060 8GB",
    ram: "16 GB DDR5",
    storage: "512 GB SSD",
    display: '15.6" FHD',
    refreshRate: "165 Hz",
    battery: "6 hrs",
    weight: "2.65 kg",
    ports: ["HDMI 2.1", "USB-C", "3× USB-A", "RJ45"],
    usage: ["Gaming", "Coding", "Video Editing"],
    scores: { performance: 85, gaming: 84, battery: 55, productivity: 78, portability: 55 },
    pros: ["Strong RTX 4060 performance", "Easy upgrades", "Good cooling"],
    cons: ["Heavy chassis", "Plastic build"],
    summary: "An aggressively priced RTX 4060 gaming rig with room to grow.",
    rating: 4.4,
    image: img("photo-1593305841991-05c297ba4575")
  },
  {
    id: "lenovo-thinkpad-x1-carbon",
    name: "Lenovo ThinkPad X1 Carbon Gen 12",
    brand: "Lenovo",
    price: 174990,
    cpu: "Intel Core Ultra 7 155U",
    gpu: "Intel Graphics",
    ram: "32 GB LPDDR5",
    storage: "1 TB SSD",
    display: '14" 2.8K OLED',
    refreshRate: "120 Hz",
    battery: "15 hrs",
    weight: "1.09 kg",
    ports: ["2× TB4", "HDMI", "2× USB-A"],
    usage: ["Business", "Coding"],
    scores: { performance: 80, gaming: 35, battery: 92, productivity: 96, portability: 99 },
    pros: ["Iconic business design", "Best-in-class keyboard", "MIL-spec durability"],
    cons: ["Expensive", "No discrete GPU"],
    summary: "The benchmark business ultrabook—light, durable, and built to type all day.",
    rating: 4.8,
    image: img("photo-1603302576837-37561b2e2302")
  },
  {
    id: "lenovo-yoga-9i",
    name: "Lenovo Yoga 9i 2-in-1",
    brand: "Lenovo",
    price: 154990,
    cpu: "Intel Core Ultra 7 155H",
    gpu: "Intel Arc",
    ram: "16 GB LPDDR5",
    storage: "1 TB SSD",
    display: '14" OLED 4K Touch',
    refreshRate: "60 Hz",
    battery: "11 hrs",
    weight: "1.4 kg",
    ports: ["2× TB4", "USB-C", "USB-A", "3.5mm"],
    usage: ["Graphic Design", "Business", "College Work"],
    scores: { performance: 80, gaming: 45, battery: 80, productivity: 88, portability: 90 },
    pros: ["Premium convertible", "Stunning 4K OLED", "Rotating soundbar hinge"],
    cons: ["No discrete GPU", "Premium price"],
    summary: "A luxe convertible for creatives who sketch, present, and stream in equal measure.",
    rating: 4.6,
    image: img("photo-1542751371-adc38448a05e")
  },
  {
    id: "lenovo-ideapad-slim-5",
    name: "Lenovo IdeaPad Slim 5",
    brand: "Lenovo",
    price: 62990,
    cpu: "AMD Ryzen 7 7730U",
    gpu: "Radeon Graphics",
    ram: "16 GB DDR4",
    storage: "512 GB SSD",
    display: '14" 2.2K IPS',
    refreshRate: "60 Hz",
    battery: "11 hrs",
    weight: "1.46 kg",
    ports: ["HDMI", "USB-C", "2× USB-A", "SD"],
    usage: ["College Work", "Business", "Coding"],
    scores: { performance: 74, gaming: 40, battery: 86, productivity: 84, portability: 88 },
    pros: ["Sharp 2.2K display", "Great battery", "Lightweight"],
    cons: ["No Thunderbolt", "Basic webcam"],
    summary: "A balanced student/professional notebook that nails the basics with a sharp panel.",
    badge: "Best for Students",
    rating: 4.4,
    image: img("photo-1542393545-10f5cde2c810")
  },
  {
    id: "lenovo-loq-15",
    name: "Lenovo LOQ 15",
    brand: "Lenovo",
    price: 79990,
    cpu: "Intel Core i7-13620H",
    gpu: "RTX 4060 8GB",
    ram: "16 GB DDR5",
    storage: "512 GB SSD",
    display: '15.6" FHD',
    refreshRate: "144 Hz",
    battery: "7 hrs",
    weight: "2.4 kg",
    ports: ["HDMI", "USB-C", "3× USB-A", "RJ45"],
    usage: ["Gaming", "Coding"],
    scores: { performance: 83, gaming: 84, battery: 60, productivity: 76, portability: 58 },
    pros: ["RTX 4060 at a great price", "Cool thermals", "Solid keyboard"],
    cons: ["Display could be brighter", "Bulky"],
    summary: "A budget gateway into modern RTX gaming without skimping on the essentials.",
    badge: "Best Value",
    rating: 4.4,
    image: img("photo-1629131726692-1accd0c53ce0")
  },
  {
    id: "lenovo-thinkbook-14",
    name: "Lenovo ThinkBook 14 Gen 6",
    brand: "Lenovo",
    price: 72990,
    cpu: "Intel Core Ultra 5 125H",
    gpu: "Intel Arc",
    ram: "16 GB LPDDR5",
    storage: "512 GB SSD",
    display: '14" 2.2K IPS',
    refreshRate: "60 Hz",
    battery: "10 hrs",
    weight: "1.38 kg",
    ports: ["TB4", "HDMI", "2× USB-A", "RJ45"],
    usage: ["Business", "Coding", "College Work"],
    scores: { performance: 78, gaming: 42, battery: 84, productivity: 86, portability: 90 },
    pros: ["Business features", "Sharp display", "Lightweight"],
    cons: ["No fingerprint on some SKUs"],
    summary: "A pragmatic business laptop with modern Core Ultra silicon.",
    rating: 4.4,
    image: img("photo-1603302576837-37561b2e2302")
  },
  {
    id: "hp-spectre-x360-14",
    name: "HP Spectre x360 14",
    brand: "HP",
    price: 159990,
    cpu: "Intel Core Ultra 7 155H",
    gpu: "Intel Arc",
    ram: "16 GB LPDDR5",
    storage: "1 TB SSD",
    display: '14" OLED 2.8K Touch',
    refreshRate: "120 Hz",
    battery: "13 hrs",
    weight: "1.44 kg",
    ports: ["2× TB4", "USB-A", "3.5mm"],
    usage: ["Business", "Graphic Design", "Coding"],
    scores: { performance: 82, gaming: 45, battery: 86, productivity: 90, portability: 92 },
    pros: ["Gem-cut design", "OLED touch panel", "Pen included"],
    cons: ["Expensive", "Glossy screen"],
    summary: "HP's jewel-like convertible that turns heads in any boardroom or café.",
    rating: 4.6,
    image: img("photo-1543966888-7c1dc482a810")
  },
  {
    id: "hp-omen-16",
    name: "HP Omen 16",
    brand: "HP",
    price: 144990,
    cpu: "Intel Core i7-14700HX",
    gpu: "RTX 4070 8GB",
    ram: "16 GB DDR5",
    storage: "1 TB SSD",
    display: '16.1" QHD IPS',
    refreshRate: "240 Hz",
    battery: "7 hrs",
    weight: "2.4 kg",
    ports: ["HDMI 2.1", "USB-C", "3× USB-A", "RJ45"],
    usage: ["Gaming", "Video Editing", "AI/ML Development"],
    scores: { performance: 90, gaming: 90, battery: 60, productivity: 84, portability: 60 },
    pros: ["Excellent 240Hz QHD panel", "Strong thermals", "Per-key RGB"],
    cons: ["Average battery", "Premium price"],
    summary: "A sleek mainstream gaming flagship with a top-shelf display.",
    rating: 4.5,
    image: img("photo-1517059224940-d4af9eec41b7")
  },
  {
    id: "hp-victus-15",
    name: "HP Victus 15",
    brand: "HP",
    price: 69990,
    cpu: "AMD Ryzen 5 7535HS",
    gpu: "RTX 4050 6GB",
    ram: "16 GB DDR5",
    storage: "512 GB SSD",
    display: '15.6" FHD',
    refreshRate: "144 Hz",
    battery: "7 hrs",
    weight: "2.29 kg",
    ports: ["HDMI 2.1", "USB-C", "3× USB-A", "RJ45"],
    usage: ["Gaming", "College Work", "Coding"],
    scores: { performance: 78, gaming: 78, battery: 62, productivity: 76, portability: 62 },
    pros: ["Affordable RTX gaming", "Decent build", "Easy upgrades"],
    cons: ["Display is basic", "Loud fans under load"],
    summary: "An entry-level RTX laptop perfect for first-time gaming buyers.",
    badge: "Best Value",
    rating: 4.3,
    image: img("photo-1593642632559-0c6d3fc62b89")
  },
  {
    id: "hp-envy-x360-15",
    name: "HP Envy x360 15",
    brand: "HP",
    price: 99990,
    cpu: "AMD Ryzen 7 8840HS",
    gpu: "Radeon 780M",
    ram: "16 GB LPDDR5",
    storage: "1 TB SSD",
    display: '15.6" OLED 2.8K Touch',
    refreshRate: "120 Hz",
    battery: "12 hrs",
    weight: "1.8 kg",
    ports: ["USB-C", "HDMI", "2× USB-A"],
    usage: ["Graphic Design", "Business", "College Work"],
    scores: { performance: 82, gaming: 55, battery: 84, productivity: 86, portability: 78 },
    pros: ["Vivid OLED touch", "Convertible 2-in-1", "Strong iGPU"],
    cons: ["No Thunderbolt", "Average speakers"],
    summary: "A versatile OLED convertible that punches well above its weight in creative apps.",
    rating: 4.5,
    image: img("photo-1587825140708-dfaf72ae4b04")
  },
  {
    id: "acer-predator-helios-16",
    name: "Acer Predator Helios 16",
    brand: "Acer",
    price: 189990,
    cpu: "Intel Core i9-14900HX",
    gpu: "RTX 4080 12GB",
    ram: "32 GB DDR5",
    storage: "1 TB SSD",
    display: '16" Mini-LED 2.5K',
    refreshRate: "240 Hz",
    battery: "6 hrs",
    weight: "2.7 kg",
    ports: ["HDMI 2.1", "2× USB-C", "3× USB-A", "RJ45"],
    usage: ["Gaming", "Video Editing", "AI/ML Development"],
    scores: { performance: 95, gaming: 96, battery: 50, productivity: 88, portability: 50 },
    pros: ["Brilliant Mini-LED", "Top-tier GPU", "Excellent cooling"],
    cons: ["Heavy", "Battery is short"],
    summary: "Esports-grade performance and a stunning Mini-LED panel in one premium package.",
    rating: 4.6,
    image: img("photo-1588872657578-7efd1f1555ed")
  },
  {
    id: "acer-aspire-5",
    name: "Acer Aspire 5",
    brand: "Acer",
    price: 46990,
    cpu: "AMD Ryzen 5 7520U",
    gpu: "Radeon Graphics",
    ram: "8 GB LPDDR5",
    storage: "512 GB SSD",
    display: '15.6" FHD IPS',
    refreshRate: "60 Hz",
    battery: "9 hrs",
    weight: "1.78 kg",
    ports: ["HDMI", "USB-C", "2× USB-A"],
    usage: ["College Work", "Business"],
    scores: { performance: 64, gaming: 30, battery: 78, productivity: 76, portability: 76 },
    pros: ["Affordable", "Solid IPS display", "Easy to recommend"],
    cons: ["Only 8GB RAM", "Plastic build"],
    summary: "A dependable budget pick for students and first-time buyers.",
    badge: "Best for Students",
    rating: 4.2,
    image: img("photo-1496181133206-80ce9b88a853")
  },
  {
    id: "acer-nitro-v-15",
    name: "Acer Nitro V 15",
    brand: "Acer",
    price: 66990,
    cpu: "Intel Core i5-13420H",
    gpu: "RTX 4050 6GB",
    ram: "16 GB DDR5",
    storage: "512 GB SSD",
    display: '15.6" FHD IPS',
    refreshRate: "144 Hz",
    battery: "6 hrs",
    weight: "2.1 kg",
    ports: ["HDMI", "USB-C", "3× USB-A", "RJ45"],
    usage: ["Gaming", "Coding", "College Work"],
    scores: { performance: 76, gaming: 76, battery: 60, productivity: 74, portability: 64 },
    pros: ["Great price for RTX 4050", "144Hz panel", "Upgradeable"],
    cons: ["Plain styling", "Average battery"],
    summary: "Affordable RTX gaming that doesn't cut corners on the essentials.",
    rating: 4.3,
    image: img("photo-1606229365485-93a3b8ee0385")
  },
  {
    id: "acer-swift-x-14",
    name: "Acer Swift X 14",
    brand: "Acer",
    price: 119990,
    cpu: "Intel Core Ultra 7 155H",
    gpu: "RTX 4050 6GB",
    ram: "16 GB LPDDR5",
    storage: "1 TB SSD",
    display: '14.5" OLED 2.8K',
    refreshRate: "120 Hz",
    battery: "10 hrs",
    weight: "1.6 kg",
    ports: ["2× TB4", "HDMI", "USB-A"],
    usage: ["Video Editing", "Graphic Design", "AI/ML Development", "Coding"],
    scores: { performance: 86, gaming: 70, battery: 76, productivity: 88, portability: 86 },
    pros: ["OLED + RTX in a thin chassis", "Great for creators", "Quiet under load"],
    cons: ["Modest battery for an ultrabook"],
    summary: "A portable creator laptop that pairs OLED color with real RTX horsepower.",
    rating: 4.5,
    image: img("photo-1531297484001-80022131f5a1")
  },
  {
    id: "msi-stealth-16-ai",
    name: "MSI Stealth 16 AI Studio",
    brand: "MSI",
    price: 269990,
    cpu: "Intel Core Ultra 9 185H",
    gpu: "RTX 4070 8GB",
    ram: "32 GB DDR5",
    storage: "2 TB SSD",
    display: '16" OLED UHD+',
    refreshRate: "120 Hz",
    battery: "9 hrs",
    weight: "1.99 kg",
    ports: ["2× TB4", "HDMI 2.1", "USB-A", "SD"],
    usage: ["Video Editing", "AI/ML Development", "Graphic Design", "Gaming"],
    scores: { performance: 93, gaming: 88, battery: 70, productivity: 92, portability: 78 },
    pros: ["Stunning 4K OLED", 'Slim for a 16"', "AI-accelerated CPU"],
    cons: ["Premium price", "Glossy display"],
    summary: "A slim creator-gamer hybrid with a reference-grade OLED panel.",
    rating: 4.6,
    image: img("photo-1593305841991-05c297ba4575")
  },
  {
    id: "msi-katana-15",
    name: "MSI Katana 15",
    brand: "MSI",
    price: 89990,
    cpu: "Intel Core i7-13620H",
    gpu: "RTX 4060 8GB",
    ram: "16 GB DDR5",
    storage: "1 TB SSD",
    display: '15.6" FHD',
    refreshRate: "144 Hz",
    battery: "6 hrs",
    weight: "2.25 kg",
    ports: ["HDMI 2.1", "USB-C", "3× USB-A", "RJ45"],
    usage: ["Gaming", "Coding", "Video Editing"],
    scores: { performance: 84, gaming: 86, battery: 55, productivity: 78, portability: 60 },
    pros: ["Aggressive pricing for RTX 4060", "Per-key RGB", "Good thermals"],
    cons: ["Plastic build", "Loud fans"],
    summary: "A value-focused RTX 4060 gaming laptop that punches above its weight.",
    badge: "Best Value",
    rating: 4.3,
    image: img("photo-1629131726692-1accd0c53ce0")
  },
  {
    id: "msi-prestige-13-ai",
    name: "MSI Prestige 13 AI Evo",
    brand: "MSI",
    price: 124990,
    cpu: "Intel Core Ultra 7 155H",
    gpu: "Intel Arc",
    ram: "32 GB LPDDR5",
    storage: "1 TB SSD",
    display: '13.3" OLED 2.8K',
    refreshRate: "60 Hz",
    battery: "16 hrs",
    weight: "0.99 kg",
    ports: ["2× TB4", "HDMI", "USB-A"],
    usage: ["Business", "Coding", "Graphic Design"],
    scores: { performance: 82, gaming: 45, battery: 92, productivity: 90, portability: 99 },
    pros: ["Sub-1kg featherweight", "Long battery life", "OLED panel"],
    cons: ["No discrete GPU", "Compact keyboard"],
    summary: 'One of the lightest 13" ultrabooks available—built for frequent flyers.',
    rating: 4.5,
    image: img("photo-1502920917128-1aa500764cbd")
  },
  {
    id: "razer-blade-16",
    name: "Razer Blade 16",
    brand: "Razer",
    price: 339990,
    cpu: "Intel Core i9-14900HX",
    gpu: "RTX 4090 16GB",
    ram: "32 GB DDR5",
    storage: "2 TB SSD",
    display: '16" OLED QHD+',
    refreshRate: "240 Hz",
    battery: "7 hrs",
    weight: "2.45 kg",
    ports: ["HDMI 2.1", "TB4", "3× USB-A", "SD"],
    usage: ["Gaming", "Video Editing", "AI/ML Development", "Graphic Design"],
    scores: { performance: 98, gaming: 99, battery: 55, productivity: 92, portability: 65 },
    pros: ["Top-tier RTX 4090", "Best-in-class OLED", "CNC aluminum chassis"],
    cons: ["Extremely expensive", "Runs hot"],
    summary: "The aspirational gaming laptop—every component is the very best money can buy.",
    badge: "Editor's Pick",
    rating: 4.8,
    image: img("photo-1517059224940-d4af9eec41b7")
  },
  {
    id: "razer-blade-14",
    name: "Razer Blade 14",
    brand: "Razer",
    price: 219990,
    cpu: "AMD Ryzen 9 8945HS",
    gpu: "RTX 4070 8GB",
    ram: "16 GB DDR5",
    storage: "1 TB SSD",
    display: '14" QHD+ IPS',
    refreshRate: "240 Hz",
    battery: "9 hrs",
    weight: "1.84 kg",
    ports: ["HDMI 2.1", "USB-C", "2× USB-A"],
    usage: ["Gaming", "Video Editing", "Coding"],
    scores: { performance: 92, gaming: 92, battery: 68, productivity: 88, portability: 86 },
    pros: ["Compact gaming powerhouse", "Premium build", "Bright 240Hz panel"],
    cons: ['Pricey for 14"', "USB-C charging only at lower power"],
    summary: `Razer's most travel-friendly gaming Blade—RTX 4070 in a sleek 14" chassis.`,
    rating: 4.6,
    image: img("photo-1593642632559-0c6d3fc62b89")
  },
  {
    id: "microsoft-surface-laptop-7",
    name: "Microsoft Surface Laptop 7",
    brand: "Microsoft",
    price: 129990,
    cpu: "Snapdragon X Elite",
    gpu: "Adreno X1",
    ram: "16 GB LPDDR5x",
    storage: "512 GB SSD",
    display: '13.8" PixelSense Touch',
    refreshRate: "120 Hz",
    battery: "20 hrs",
    weight: "1.34 kg",
    ports: ["2× USB-C", "USB-A", "Surface Connect"],
    usage: ["Business", "Coding", "College Work"],
    scores: { performance: 84, gaming: 40, battery: 96, productivity: 90, portability: 94 },
    pros: ["Outstanding battery", "Snappy ARM CPU", "Premium build"],
    cons: ["x86 app compatibility caveats", "Limited ports"],
    summary: "A Copilot+ PC with marathon battery life and a beautiful PixelSense touch display.",
    rating: 4.5,
    image: img("photo-1611078489935-0cb964de46d6")
  },
  {
    id: "microsoft-surface-pro-11",
    name: "Microsoft Surface Pro 11",
    brand: "Microsoft",
    price: 119990,
    cpu: "Snapdragon X Plus",
    gpu: "Adreno X1",
    ram: "16 GB LPDDR5x",
    storage: "256 GB SSD",
    display: '13" PixelSense OLED',
    refreshRate: "120 Hz",
    battery: "14 hrs",
    weight: "0.9 kg",
    ports: ["2× USB-C", "Surface Connect"],
    usage: ["Business", "Graphic Design", "College Work"],
    scores: { performance: 80, gaming: 38, battery: 90, productivity: 86, portability: 99 },
    pros: ["Tablet + laptop versatility", "OLED panel", "Pen support"],
    cons: ["Type Cover sold separately", "ARM app compatibility"],
    summary: "A 2-in-1 OLED tablet that becomes a real laptop with the Type Cover attached.",
    rating: 4.4,
    image: img("photo-1611186871348-b1ce696e52c9")
  },
  {
    id: "samsung-galaxy-book4-pro",
    name: "Samsung Galaxy Book4 Pro",
    brand: "Samsung",
    price: 139990,
    cpu: "Intel Core Ultra 7 155H",
    gpu: "Intel Arc",
    ram: "16 GB LPDDR5x",
    storage: "512 GB SSD",
    display: '14" AMOLED 2.8K',
    refreshRate: "120 Hz",
    battery: "14 hrs",
    weight: "1.23 kg",
    ports: ["TB4", "USB-C", "HDMI", "USB-A"],
    usage: ["Business", "Graphic Design", "Coding"],
    scores: { performance: 82, gaming: 50, battery: 90, productivity: 90, portability: 96 },
    pros: ["Vivid AMOLED", "Lightweight magnesium chassis", "Galaxy ecosystem perks"],
    cons: ["No discrete GPU", "Premium price"],
    summary: "A featherweight AMOLED ultrabook that shines for travelers in the Samsung ecosystem.",
    rating: 4.5,
    image: img("photo-1542751371-adc38448a05e")
  },
  {
    id: "lg-gram-17",
    name: "LG Gram 17",
    brand: "LG",
    price: 159990,
    cpu: "Intel Core Ultra 7 155H",
    gpu: "Intel Arc",
    ram: "16 GB LPDDR5x",
    storage: "1 TB SSD",
    display: '17" WQXGA IPS',
    refreshRate: "60 Hz",
    battery: "16 hrs",
    weight: "1.35 kg",
    ports: ["2× TB4", "USB-A", "HDMI", "microSD"],
    usage: ["Business", "Coding", "Graphic Design"],
    scores: { performance: 80, gaming: 42, battery: 90, productivity: 92, portability: 88 },
    pros: ['Huge 17" screen at sub-1.4kg', "Long battery", "Spacious keyboard"],
    cons: ["Build feels light, not premium", "No OLED option"],
    summary: 'The lightest 17" laptop you can buy—giant productivity canvas without the weight.',
    rating: 4.5,
    image: img("photo-1484788984921-03950022c9ef")
  },
  {
    id: "framework-laptop-13",
    name: "Framework Laptop 13",
    brand: "Framework",
    price: 124990,
    cpu: "AMD Ryzen 7 7840U",
    gpu: "Radeon 780M",
    ram: "32 GB DDR5",
    storage: "1 TB SSD",
    display: '13.5" 2.2K IPS',
    refreshRate: "60 Hz",
    battery: "10 hrs",
    weight: "1.3 kg",
    ports: ["Modular Expansion Cards (4)"],
    usage: ["Coding", "Business", "AI/ML Development"],
    scores: { performance: 82, gaming: 55, battery: 80, productivity: 88, portability: 92 },
    pros: ["Fully repairable & upgradeable", "Choose your own ports", "Linux-friendly"],
    cons: ["Speakers are average", "No discrete GPU"],
    summary: "The modular ultrabook for tinkerers and sustainability-minded developers.",
    rating: 4.6,
    image: img("photo-1542393545-10f5cde2c810")
  },
  {
    id: "gigabyte-aero-16-oled",
    name: "Gigabyte AERO 16 OLED",
    brand: "Gigabyte",
    price: 199990,
    cpu: "Intel Core i7-14700HX",
    gpu: "RTX 4070 8GB",
    ram: "32 GB DDR5",
    storage: "1 TB SSD",
    display: '16" OLED 4K+',
    refreshRate: "60 Hz",
    battery: "8 hrs",
    weight: "2.2 kg",
    ports: ["2× TB4", "HDMI 2.1", "USB-A", "SD"],
    usage: ["Video Editing", "Graphic Design", "AI/ML Development"],
    scores: { performance: 92, gaming: 85, battery: 65, productivity: 92, portability: 72 },
    pros: ["Reference-grade 4K OLED", "Pro creator color", "Strong CPU + GPU"],
    cons: ["Battery is modest", "Heavy"],
    summary: "A no-compromise color-accurate creator laptop with a 4K OLED panel.",
    rating: 4.5,
    image: img("photo-1588872657578-7efd1f1555ed")
  },
  {
    id: "asus-proart-studiobook-16",
    name: "ASUS ProArt Studiobook 16 OLED",
    brand: "ASUS",
    price: 239990,
    cpu: "Intel Core i9-13980HX",
    gpu: "RTX 4070 8GB",
    ram: "32 GB DDR5",
    storage: "2 TB SSD",
    display: '16" OLED 3.2K Touch',
    refreshRate: "120 Hz",
    battery: "8 hrs",
    weight: "2.4 kg",
    ports: ["2× TB4", "HDMI 2.1", "USB-A", "SD Express"],
    usage: ["Video Editing", "Graphic Design", "AI/ML Development"],
    scores: { performance: 93, gaming: 80, battery: 65, productivity: 95, portability: 70 },
    pros: ["Pantone-validated OLED", "ASUS Dial control", "Tons of storage"],
    cons: ["Heavy", "Expensive"],
    summary: "A studio-grade mobile workstation built for color-critical creative pros.",
    rating: 4.7,
    image: img("photo-1541807084-5c52b6b3adef")
  },
  {
    id: "hp-zbook-firefly-14",
    name: "HP ZBook Firefly 14 G11",
    brand: "HP",
    price: 169990,
    cpu: "Intel Core Ultra 7 165H",
    gpu: "RTX A500 4GB",
    ram: "32 GB DDR5",
    storage: "1 TB SSD",
    display: '14" 2.8K OLED',
    refreshRate: "120 Hz",
    battery: "12 hrs",
    weight: "1.39 kg",
    ports: ["2× TB4", "HDMI", "USB-A"],
    usage: ["Graphic Design", "AI/ML Development", "Business"],
    scores: { performance: 86, gaming: 55, battery: 82, productivity: 92, portability: 90 },
    pros: ["ISV-certified workstation", "OLED panel", "Compact for a workstation"],
    cons: ["Discrete GPU is entry-level", "Premium price"],
    summary: "A portable workstation for CAD, 3D, and engineering workflows on the move.",
    rating: 4.5,
    image: img("photo-1603302576837-37561b2e2302")
  },
  {
    id: "asus-chromebook-plus-cx34",
    name: "ASUS Chromebook Plus CX34",
    brand: "ASUS",
    price: 38990,
    cpu: "Intel Core i3-1315U",
    gpu: "Intel UHD",
    ram: "8 GB DDR4",
    storage: "256 GB SSD",
    display: '14" FHD IPS',
    refreshRate: "60 Hz",
    battery: "10 hrs",
    weight: "1.45 kg",
    ports: ["2× USB-C", "USB-A", "HDMI"],
    usage: ["College Work", "Business"],
    scores: { performance: 60, gaming: 25, battery: 84, productivity: 74, portability: 86 },
    pros: ["Very affordable", "Chrome OS is snappy", "Long battery"],
    cons: ["Limited offline workflows", "Basic build"],
    summary: "A breezy Chromebook+ for cloud-first students and second-screen needs.",
    badge: "Best for Students",
    rating: 4.2,
    image: img("photo-1496181133206-80ce9b88a853")
  }
];
const BRANDS = ["Apple", "ASUS", "Lenovo", "HP", "Dell", "Acer", "MSI", "Razer", "Microsoft", "Samsung", "LG", "Framework", "Gigabyte"];
const USAGE_OPTIONS = [
  "Coding",
  "Gaming",
  "Video Editing",
  "Graphic Design",
  "College Work",
  "Business",
  "AI/ML Development"
];
const BUDGET_BUCKETS = [
  { id: "u40", label: "Under ₹40,000", min: 0, max: 4e4 },
  { id: "40-60", label: "₹40,000 – ₹60,000", min: 4e4, max: 6e4 },
  { id: "60-80", label: "₹60,000 – ₹80,000", min: 6e4, max: 8e4 },
  { id: "80-100", label: "₹80,000 – ₹1,00,000", min: 8e4, max: 1e5 },
  { id: "100+", label: "Above ₹1,00,000", min: 1e5, max: Infinity }
];
function formatPrice(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);
}
function scoreLaptop(laptop, opts) {
  let score = 50;
  if (laptop.price <= opts.budgetMax) score += 20;
  else score -= Math.min(30, (laptop.price - opts.budgetMax) / opts.budgetMax * 80);
  const matchedUsage = opts.usage.filter((u) => laptop.usage.includes(u)).length;
  score += matchedUsage * 8;
  if (opts.brand && opts.brand !== "No Preference") {
    score += laptop.brand === opts.brand ? 10 : -6;
  }
  const avgScore = (laptop.scores.performance + laptop.scores.productivity + laptop.scores.battery + laptop.scores.portability) / 4;
  score += (avgScore - 70) / 3;
  return Math.max(0, Math.min(100, Math.round(score)));
}
const BASE_URL = "https://lapwise-ai.lovable.app";
const Route$6 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/wizard", "/catalog", "/compare", "/insights"];
        const laptopPaths = LAPTOPS.map((l) => `/laptop/${l.id}`);
        const urls = [...staticPaths, ...laptopPaths].map(
          (p) => `  <url>
    <loc>${BASE_URL}${p}</loc>
    <changefreq>weekly</changefreq>
  </url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$4 = () => import("./insights-BIdbpQ_d.js");
const Route$5 = createFileRoute("/insights")({
  head: () => ({
    meta: [{
      title: "AI Insights Dashboard — LapWise AI"
    }, {
      name: "description",
      content: "Live analytics: most recommended laptops, popular brands, and budget trends."
    }, {
      property: "og:title",
      content: "AI Insights Dashboard — LapWise AI"
    }, {
      property: "og:description",
      content: "Trending laptop picks, popular brands, and shifting budgets — visualized."
    }, {
      property: "og:url",
      content: "https://lapwise-ai.lovable.app/insights"
    }],
    links: [{
      rel: "canonical",
      href: "https://lapwise-ai.lovable.app/insights"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./compare-CsLbkI_p.js");
const Route$4 = createFileRoute("/compare")({
  head: () => ({
    meta: [{
      title: "Compare Laptops — LapWise AI"
    }, {
      name: "description",
      content: "Compare up to three laptops side-by-side, with a clear winner per category."
    }, {
      property: "og:title",
      content: "Compare Laptops — LapWise AI"
    }, {
      property: "og:description",
      content: "Side-by-side laptop comparison with category-by-category winners."
    }, {
      property: "og:url",
      content: "https://lapwise-ai.lovable.app/compare"
    }],
    links: [{
      rel: "canonical",
      href: "https://lapwise-ai.lovable.app/compare"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./catalog-7UgY1ogK.js");
const Route$3 = createFileRoute("/catalog")({
  head: () => ({
    meta: [{
      title: "Laptop Catalog — LapWise AI"
    }, {
      name: "description",
      content: "Browse our curated laptop catalog. Filter by brand, price, RAM, and usage to find your ideal machine."
    }, {
      property: "og:title",
      content: "Laptop Catalog — LapWise AI"
    }, {
      property: "og:description",
      content: "Browse and filter 40+ curated laptops by brand, price, RAM, and usage."
    }, {
      property: "og:url",
      content: "https://lapwise-ai.lovable.app/catalog"
    }],
    links: [{
      rel: "canonical",
      href: "https://lapwise-ai.lovable.app/catalog"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-gVbK9eY7.js");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "LapWise AI — Find Your Perfect Laptop with AI"
    }, {
      name: "description",
      content: "Get personalized laptop recommendations based on your budget, needs, and preferences. Compare, decide, buy with confidence."
    }, {
      property: "og:title",
      content: "LapWise AI — Find Your Perfect Laptop with AI"
    }, {
      property: "og:description",
      content: "Personalized laptop recommendations based on your budget, needs, and preferences."
    }, {
      property: "og:url",
      content: "https://lapwise-ai.lovable.app/"
    }],
    links: [{
      rel: "canonical",
      href: "https://lapwise-ai.lovable.app/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./laptop._id-CtKmMG8J.js");
const $$splitNotFoundComponentImporter = () => import("./laptop._id-DCk_xLsk.js");
const Route$1 = createFileRoute("/laptop/$id")({
  loader: ({
    params
  }) => {
    const laptop = LAPTOPS.find((l) => l.id === params.id);
    if (!laptop) throw notFound();
    return {
      laptop
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: loaderData ? [{
      title: `${loaderData.laptop.name} — LapWise AI`
    }, {
      name: "description",
      content: loaderData.laptop.summary
    }, {
      property: "og:title",
      content: loaderData.laptop.name
    }, {
      property: "og:description",
      content: loaderData.laptop.summary
    }, {
      property: "og:image",
      content: loaderData.laptop.image
    }, {
      property: "og:type",
      content: "product"
    }, {
      property: "og:url",
      content: `https://lapwise-ai.lovable.app/laptop/${loaderData.laptop.id}`
    }] : [{
      title: "Laptop — LapWise AI"
    }],
    links: loaderData ? [{
      rel: "canonical",
      href: `https://lapwise-ai.lovable.app/laptop/${loaderData.laptop.id}`
    }] : [],
    scripts: loaderData ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: loaderData.laptop.name,
        brand: {
          "@type": "Brand",
          name: loaderData.laptop.brand
        },
        image: loaderData.laptop.image,
        description: loaderData.laptop.summary,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: loaderData.laptop.price,
          availability: "https://schema.org/InStock"
        }
      })
    }] : []
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
function createLovableAiGatewayProvider(lovableApiKey) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": lovableApiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk"
    }
  });
}
const SYSTEM_PROMPT = `You are LapWise AI Assistant, a friendly and concise expert who helps users choose laptops.

Your responsibilities:
- Recommend laptops based on budget, usage, and preferences.
- Explain technical specs in plain language (e.g. i5 vs i7, integrated vs discrete GPU, RAM upgrades).
- Compare laptops side-by-side highlighting clear tradeoffs.
- Give budget guidance (e.g. "Is ₹70,000 enough for gaming?").
- Suggest upgrade paths when relevant.

Style:
- Conversational but direct. Use short paragraphs and bullet points.
- Currency is INR (₹). Don't invent prices outside the catalog you know.
- When recommending, return the top 1-3 picks with one-line reasons.

Here is our current laptop catalog (use these when recommending):
${LAPTOPS.map(
  (l) => `- ${l.name} (${l.brand}) – ${formatPrice(l.price)} | ${l.cpu} | ${l.gpu} | ${l.ram} | ${l.storage} | best for: ${l.usage.join(", ")}`
).join("\n")}

If a user asks about a laptop outside this list, you may still share general knowledge but mention it isn't in the catalog yet.`;
const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = await request.json();
          if (!Array.isArray(messages)) {
            return new Response("messages required", { status: 400 });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });
          const gateway = createLovableAiGatewayProvider(key);
          const model = gateway("google/gemini-3-flash-preview");
          const result = streamText({
            model,
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages)
          });
          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (err) {
          console.error(err);
          return new Response("Chat error", { status: 500 });
        }
      }
    }
  }
});
const WizardRoute = Route$7.update({
  id: "/wizard",
  path: "/wizard",
  getParentRoute: () => Route$8
});
const SitemapDotxmlRoute = Route$6.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$8
});
const InsightsRoute = Route$5.update({
  id: "/insights",
  path: "/insights",
  getParentRoute: () => Route$8
});
const CompareRoute = Route$4.update({
  id: "/compare",
  path: "/compare",
  getParentRoute: () => Route$8
});
const CatalogRoute = Route$3.update({
  id: "/catalog",
  path: "/catalog",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const LaptopIdRoute = Route$1.update({
  id: "/laptop/$id",
  path: "/laptop/$id",
  getParentRoute: () => Route$8
});
const ApiChatRoute = Route.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  CatalogRoute,
  CompareRoute,
  InsightsRoute,
  SitemapDotxmlRoute,
  WizardRoute,
  ApiChatRoute,
  LaptopIdRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  BUDGET_BUCKETS as B,
  LAPTOPS as L,
  Route$1 as R,
  USAGE_OPTIONS as U,
  BRANDS as a,
  formatPrice as f,
  router as r,
  scoreLaptop as s
};
