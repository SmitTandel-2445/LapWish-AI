import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-32">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[var(--cyan-accent)] to-[var(--violet-accent)] grid place-items-center">
              <span className="text-background font-bold text-xs">L</span>
            </div>
            <span className="font-semibold">LapWise AI</span>
          </div>
          <p className="text-muted-foreground">
            Personalized laptop recommendations powered by AI.
          </p>
        </div>
        <div>
          <h4 className="text-foreground font-medium mb-3">Product</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/wizard" className="hover:text-foreground">Recommendation Wizard</Link></li>
            <li><Link to="/catalog" className="hover:text-foreground">Catalog</Link></li>
            <li><Link to="/compare" className="hover:text-foreground">Compare</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-foreground font-medium mb-3">Insights</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/insights" className="hover:text-foreground">Analytics</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-foreground font-medium mb-3">Stay sharp</h4>
          <p className="text-muted-foreground">Curated picks, weekly.</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} LapWise AI. Crafted with intention.
      </div>
    </footer>
  );
}
