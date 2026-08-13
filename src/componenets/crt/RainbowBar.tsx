type RainbowBarProps = {
  height?: "thin" | "thick";
  className?: string;
};

const HEIGHT_CLASS: Record<NonNullable<RainbowBarProps["height"]>, string> = {
  thin: "h-0.5",
  thick: "h-1",
};

// The mandated 6-stripe order: red, orange, yellow, green, cyan, blue.
const STRIPE_COLORS = [
  "bg-bar-red",
  "bg-bar-orange",
  "bg-bar-yellow",
  "bg-bar-green",
  "bg-bar-cyan",
  "bg-bar-blue",
] as const;

/** Decorative 6-stripe rainbow divider. */
export const RainbowBar = ({
  height = "thin",
  className = "",
}: RainbowBarProps) => (
  <div
    className={`flex ${HEIGHT_CLASS[height]} ${className}`}
    aria-hidden="true"
  >
    {STRIPE_COLORS.map((color) => (
      <span key={color} className={`flex-1 ${color}`} />
    ))}
  </div>
);
