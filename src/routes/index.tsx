import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { TopHeader } from "@/components/TopHeader";

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
      <TopHeader />
      <main className="flex min-h-screen flex-col items-center justify-center gap-16 bg-[#00021b] px-4 pt-44">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Animated bottom navigation
          </h1>
          <p className="mt-3 text-sm text-white/50">
            Tap an item to slide the cutout indicator.
          </p>
        </div>
      </main>
    </>
  );
}
