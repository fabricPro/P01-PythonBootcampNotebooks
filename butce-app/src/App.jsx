import { useState } from 'react';
import { Home, Wallet, Repeat, CreditCard, LineChart, Target } from 'lucide-react';
import { useAppData } from './store/useAppData.js';
import { ToastProvider } from './components/ui/Toast.jsx';
import HomeScreen from './screens/HomeScreen.jsx';

const TABS = [
  { id: 'home',     label: 'Ana',      icon: Home },
];

export default function App() {
  const data = useAppData();
  const [tab, setTab] = useState('home');

  if (!data.ready) {
    return (
      <div className="app-shell">
        <div style={{
          minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-3)', fontSize: 13,
        }}>
          Yükleniyor…
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="app-shell">
        {tab === 'home' && <HomeScreen data={data} />}

        <nav className="tabbar">
          {TABS.map(t => {
            const Icn = t.icon;
            return (
              <button
                key={t.id}
                className={`tabbar-item ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <Icn size={20} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </ToastProvider>
  );
}
