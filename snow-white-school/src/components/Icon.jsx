const paths = {
  book: "M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z",
  user: "M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM5 21v-2a5 5 0 0 1 14 0v2",
  people: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20v-1a6 6 0 0 1 12 0v1M17 5a3 3 0 0 1 0 6M21 20v-1a6 6 0 0 0-4-5",
  cap: "M2 9l10-5 10 5-10 5zM6 11v5c3 3 9 3 12 0v-5",
  star: "M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.3l1-6.2L3 9.7l6.2-.9z",
  shield: "M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5",
  heart: "M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z",
  up: "M3 17l6-6 4 4 8-8M15 7h6v6",
};

export default function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
