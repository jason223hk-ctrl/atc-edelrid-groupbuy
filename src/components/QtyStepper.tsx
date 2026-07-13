interface Props {
  value: number
  onChange: (delta: number) => void
  min?: number
}

export function QtyStepper({ value, onChange, min = 0 }: Props) {
  return (
    <div className="qty" role="group" aria-label="數量">
      <button
        type="button"
        aria-label="減少"
        disabled={value <= min}
        onClick={() => onChange(-1)}
      >
        −
      </button>
      <span className="n" aria-live="polite">
        {value}
      </span>
      <button type="button" aria-label="增加" onClick={() => onChange(1)}>
        +
      </button>
    </div>
  )
}
