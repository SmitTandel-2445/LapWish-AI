import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { LAPTOPS, formatPrice } from "@/data/laptops";

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
  (l) =>
    `- ${l.name} (${l.brand}) – ${formatPrice(l.price)} | ${l.cpu} | ${l.gpu} | ${l.ram} | ${l.storage} | best for: ${l.usage.join(", ")}`,
).join("\n")}

If a user asks about a laptop outside this list, you may still share general knowledge but mention it isn't in the catalog yet.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages?: UIMessage[] };
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
            messages: await convertToModelMessages(messages),
          });

          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (err) {
          console.error(err);
          return new Response("Chat error", { status: 500 });
        }
      },
    },
  },
});
