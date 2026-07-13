import { useEffect } from 'react'

export interface DetailData {
  name: string
  detail?: string
  specs?: readonly string[]
  includes?: readonly string[]
  compat?: string
  notes?: readonly string[]
  sourceUrl?: string
  images?: readonly string[]
}

interface Props {
  data: DetailData | null
  onClose: () => void
}

export function DetailModal({ data, onClose }: Props) {
  useEffect(() => {
    if (!data) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [data, onClose])

  if (!data) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="關閉">
          ×
        </button>
        <h2 style={{ paddingRight: 40 }}>{data.name}</h2>

        {data.images && data.images.length > 0 ? (
          <img
            src={data.images[0]}
            alt={data.name}
            style={{ width: '100%', borderRadius: 4, marginBottom: 12 }}
          />
        ) : (
          <div className="img-ph" style={{ marginBottom: 12 }}>
            官方產品圖（待上載）<br />
            暫不引用來源不明圖片
          </div>
        )}

        {data.detail && <p className="muted">{data.detail}</p>}

        {data.includes && data.includes.length > 0 && (
          <>
            <div className="section-label">套裝內容</div>
            <ul className="spec-list">
              {data.includes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </>
        )}

        {data.specs && data.specs.length > 0 && (
          <>
            <div className="section-label">重要規格</div>
            <ul className="spec-list">
              {data.specs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </>
        )}

        {data.compat && (
          <div className="notice" style={{ margin: '12px 0' }}>
            相容提示：{data.compat}
          </div>
        )}

        {data.notes && data.notes.length > 0 && (
          <ul className="spec-list">
            {data.notes.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}

        {data.sourceUrl && (
          <p style={{ marginTop: 14 }}>
            <a href={data.sourceUrl} target="_blank" rel="noreferrer noopener">
              查看官方產品資料 ↗
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
