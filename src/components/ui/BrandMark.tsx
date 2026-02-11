export function BrandMark() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border-base bg-bg-elevated p-1">
      <svg width="100%" height="100%" viewBox="0 0 24 24" aria-hidden="true" className="ag-logo-svg">
        <path
          className="ag-logo-line-1"
          d="M3.5 6.5H20.5"
          fill="none"
          stroke="rgba(240,237,232,0.32)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className="ag-logo-line-2"
          d="M3.5 6.5H9.5A2.5 2.5 0 0 1 12 9v5.5A2.5 2.5 0 0 0 14.5 17h6"
          fill="none"
          stroke="#E8FF59"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="ag-logo-dot" cx="12" cy="9" r="1.5" fill="#59B8FF" />
      </svg>
    </span>
  );
}
