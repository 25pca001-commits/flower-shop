// A flower drawn with SVG: petals are rotated ellipses around a centre disc.
export default function Bloom({ petals, color, center, size = 160 }) {
  const angles = Array.from({ length: petals }, (_, i) => (360 / petals) * i);
  const long = petals > 12;
  const rx = long ? 7 : 16;
  const ry = long ? 34 : 30;

  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} aria-hidden="true" focusable="false">
      <g>
        {angles.map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy={-ry * 0.62}
            rx={rx}
            ry={ry * 0.62}
            fill={color}
            stroke="rgba(31,42,36,0.18)"
            strokeWidth="0.8"
            transform={`rotate(${deg})`}
          />
        ))}
      </g>
      <circle r={long ? 13 : 9} fill={center} stroke="rgba(31,42,36,0.25)" strokeWidth="0.8" />
    </svg>
  );
}
