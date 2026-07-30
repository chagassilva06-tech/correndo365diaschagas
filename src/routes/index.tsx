import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glow Nav — Animated Bottom Navigation" },
      {
        name: "description",
        content:
          "A modern animated bottom navigation bar with a sliding cutout indicator, gradient pill, and fading labels.",
      },
      { property: "og:title", content: "Glow Nav — Animated Bottom Navigation" },
      {
        property: "og:description",
        content:
          "A modern animated bottom navigation bar with a sliding cutout indicator, gradient pill, and fading labels.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNav fullWidth />
      </div>
      <main className="flex min-h-screen flex-col items-center justify-center gap-16 bg-[#00021b] px-4 pb-24">
        <div className="text-center" />
      </main>

    </>
  );
}


