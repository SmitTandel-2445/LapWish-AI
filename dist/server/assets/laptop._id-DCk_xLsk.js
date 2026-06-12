import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", { className: "text-center py-32", children: [
  /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold", children: "Laptop not found" }),
  /* @__PURE__ */ jsx(Link, { to: "/catalog", className: "btn-primary mt-6", children: "Browse catalog" })
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
