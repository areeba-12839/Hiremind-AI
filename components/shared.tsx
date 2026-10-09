import React from 'react';

// ─── Status Badge ───────────────────────────────────────────────────────────
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Qualified': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Review Required': 'bg-amber-50 text-amber-700 border-amber-200',
    'Not Qualified': 'bg-red-50 text-red-700 border-red-200',
    'Interview Pending': 'bg-blue-50 text-blue-700 border-blue-200',
    'Active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Closed': 'bg-gray-100 text-gray-600 border-gray-200',
    'Draft': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Completed': 'bg-purple-50 text-purple-700 border-purple-200',
  };
  const cls = map[status] || 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {status}
    </span>
  );
}

// ─── Score Bar ───────────────────────────────────────────────────────────────
export function ScoreBar({ label, value, color = 'bg-indigo-500' }: { label: string; value: number; color?: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-gray-800">{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
export function StatCard({
  label, value, sub, icon, color = 'bg-indigo-50', iconColor = 'text-indigo-600',
}: {
  label: string; value: string | number; sub?: string;
  icon: React.ReactNode; color?: string; iconColor?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-start gap-4">
      <div className={`${color} ${iconColor} p-3 rounded-lg`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────
export function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h2>
      {action}
    </div>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// ─── Primary Button ──────────────────────────────────────────────────────────
export function PrimaryBtn({
  children, onClick, className = '', disabled = false, type = 'button', size = 'md',
}: {
  children: React.ReactNode; onClick?: () => void; className?: string;
  disabled?: boolean; type?: 'button' | 'submit'; size?: 'sm' | 'md' | 'lg';
}) {
  const sz = size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${sz} font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Secondary Button ────────────────────────────────────────────────────────
export function SecondaryBtn({
  children, onClick, className = '', size = 'md',
}: {
  children: React.ReactNode; onClick?: () => void; className?: string; size?: 'sm' | 'md' | 'lg';
}) {
  const sz = size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm';
  return (
    <button
      onClick={onClick}
      className={`${sz} font-semibold text-indigo-600 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Input ───────────────────────────────────────────────────────────────────
export function Input({
  label, placeholder, type = 'text', value, onChange, required,
}: {
  label?: string; placeholder?: string; type?: string;
  value?: string; onChange?: (v: string) => void; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-gray-700">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white placeholder:text-gray-400 transition"
      />
    </div>
  );
}

// ─── Select ──────────────────────────────────────────────────────────────────
export function Select({
  label, options, value, onChange,
}: {
  label?: string; options: string[]; value?: string; onChange?: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <select
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none transition"
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Toggle ──────────────────────────────────────────────────────────────────
export function Toggle({ label, checked, onChange, description }: {
  label: string; checked: boolean; onChange: (v: boolean) => void; description?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

// ─── Progress Steps ──────────────────────────────────────────────────────────
export function ProgressSteps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0 overflow-x-auto pb-2">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              i < current ? 'bg-indigo-600 text-white' : i === current ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-gray-100 text-gray-400'
            }`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`mt-1.5 text-xs font-medium whitespace-nowrap ${i <= current ? 'text-indigo-600' : 'text-gray-400'}`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 min-w-[24px] mx-1 mb-5 ${i < current ? 'bg-indigo-600' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Avatar ──────────────────────────────────────────────────────────────────
export function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['bg-indigo-100 text-indigo-700', 'bg-purple-100 text-purple-700', 'bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700'];
  const color = colors[name.charCodeAt(0) % colors.length];
  const sz = size === 'sm' ? 'w-7 h-7 text-xs' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-9 h-9 text-sm';
  return (
    <div className={`${sz} ${color} rounded-full flex items-center justify-center font-semibold flex-shrink-0`}>
      {initials}
    </div>
  );
}
