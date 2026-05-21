import Icon from '../ui/Icon.jsx';
import { getCategory } from '../../data/categories.js';
import { fmtAmount } from '../../lib/format.js';
import { formatShortDate } from '../../lib/date.js';
import { Trash2 } from 'lucide-react';

export default function TransactionRow({ tx, account, onDelete }) {
  const cat = getCategory(tx.category);
  const sign = tx.type === 'gelir' ? '+' : '−';
  const tone = tx.type === 'gelir' ? 'var(--positive)' : 'var(--text-1)';

  return (
    <div className="row">
      <div className="row-icon" style={{ background: 'var(--bg-elev-2)', color: cat.color }}>
        <Icon name={cat.icon} size={18} />
      </div>
      <div className="row-main">
        <div className="row-title">
          {cat.label}
          {tx.source === 'recurring' && (
            <span className="badge badge-recurring" style={{ marginLeft: 6 }}>↻</span>
          )}
        </div>
        <div className="row-sub">
          {formatShortDate(tx.date)}
          {tx.note && <> · {tx.note}</>}
          {account && tx.currency !== 'TRY' && <> · {account.name}</>}
        </div>
      </div>
      <div className="row-amount" style={{ color: tone, textAlign: 'right' }}>
        <div>{sign}{fmtAmount(tx.amount, tx.currency).replace(/^[+−]/, '')}</div>
        {tx.currency !== 'TRY' && (
          <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 400 }}>
            ≈ {sign}{fmtAmount(tx.amountTRY, 'TRY').replace(/^[+−]/, '')}
          </div>
        )}
      </div>
      <button
        type="button"
        className="btn-icon"
        onClick={onDelete}
        style={{ width: 32, height: 32, background: 'transparent', color: 'var(--text-muted)' }}
        aria-label="Sil"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
