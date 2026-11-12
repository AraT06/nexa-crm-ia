import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight, BarChart3, Bell, Bot, CalendarDays, Check, ChevronDown,
  CircleHelp, Clock3, LayoutDashboard, LogOut, Menu, MessageSquare,
  MoreHorizontal, Plus, Search, Settings, Sparkles, Target, Users, X
} from 'lucide-react';
import './styles.css';

const clients = [
  { initials: 'MS', name: 'María Salazar', company: 'Lumen Studio', status: 'Caliente', value: '$12,400', date: 'Hoy, 10:30', color: 'pink' },
  { initials: 'JR', name: 'Jorge Rojas', company: 'Andes Logistics', status: 'En negociación', value: '$8,750', date: 'Ayer, 16:20', color: 'blue' },
  { initials: 'AP', name: 'Ana Pérez', company: 'Punto Norte', status: 'Nuevo', value: '$4,200', date: '12 Jun, 09:15', color: 'orange' },
  { initials: 'CM', name: 'Carlos Méndez', company: 'Grupo Vértice', status: 'Ganado', value: '$18,900', date: '11 Jun, 14:45', color: 'green' }
];

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    if (!email || !password) return setError('Completa tu correo y contraseña.');
    if (!email.includes('@')) return setError('Ingresa un correo válido.');
    onLogin(email);
  }

  return <main className="login-shell">
    <section className="login-art">
      <div className="brand light"><span className="brand-mark"><Sparkles size={16} /></span> nexa</div>
      <div className="art-copy">
        <p className="eyebrow">CRM impulsado por IA</p>
        <h1>Convierte cada relación en una oportunidad.</h1>
        <p>Todo lo que tu equipo necesita para entender, conectar y crecer.</p>
      </div>
      <div className="floating-card card-a"><div className="mini-icon purple"><Target size={16} /></div><div><strong>+28.4%</strong><span>Conversión mensual</span></div><ArrowUpRight size={18} /></div>
      <div className="floating-card card-b"><div className="avatar avatar-pink">MS</div><div><strong>María Salazar</strong><span>Nuevo mensaje recibido</span></div><span className="online-dot" /></div>
      <div className="art-orb orb-one" /><div className="art-orb orb-two" />
    </section>
    <section className="login-panel">
      <div className="mobile-brand brand"><span className="brand-mark"><Sparkles size={16} /></span> nexa</div>
      <div className="login-form-wrap">
        <span className="welcome-tag">BIENVENIDO DE VUELTA</span>
        <h2>Inicia sesión</h2>
        <p className="muted">Accede a tu espacio de crecimiento.</p>
        <form onSubmit={submit}>
          <label>Correo electrónico<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@empresa.com" autoComplete="email" /></label>
          <label>Contraseña<div className="password-field"><input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" autoComplete="current-password" /><button type="button" className="show-password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Ocultar' : 'Mostrar'}</button></div></label>
          <div className="form-row"><label className="remember"><input type="checkbox" /> <span>Recordarme</span></label><button type="button" className="link-button">¿Olvidaste tu contraseña?</button></div>
          {error && <p className="error-message">{error}</p>}
          <button className="primary-button login-button" type="submit">Entrar a mi espacio <ArrowUpRight size={17} /></button>
        </form>
        <p className="signup-line">¿Aún no tienes una cuenta? <button className="link-button">Solicita una demo</button></p>
      </div>
      <span className="legal">Al continuar, aceptas nuestros términos y política de privacidad.</span>
    </section>
  </main>;
}

function Sidebar({ active, setActive, onLogout }) {
  const links = [[LayoutDashboard, 'Resumen'], [Users, 'Contactos'], [BarChart3, 'Oportunidades'], [CalendarDays, 'Actividades']];
  return <aside className="sidebar"><div className="brand"><span className="brand-mark"><Sparkles size={16} /></span> nexa</div><div className="workspace"><div className="workspace-avatar">N</div><div><strong>Nexa Studio</strong><span>Equipo principal</span></div><ChevronDown size={15} /></div><nav>{links.map(([Icon, label]) => <button className={active === label ? 'nav-active' : ''} onClick={() => setActive(label)} key={label}><Icon size={18} />{label}</button>)}</nav><div className="sidebar-bottom"><button onClick={() => setActive('Configuración')}><Settings size={18} />Configuración</button><button onClick={() => setActive('Ayuda')}><CircleHelp size={18} />Centro de ayuda</button><div className="user-mini"><div className="avatar avatar-violet">AC</div><div><strong>Alexis Cruz</strong><span>Administrador</span></div><button className="icon-button" onClick={onLogout}><LogOut size={16} /></button></div></div></aside>;
}

function StatCard({ title, value, change, icon: Icon, tone }) { return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={18} /></div><div className="stat-title">{title}<MoreHorizontal size={16} /></div><strong className="stat-value">{value}</strong><span className="stat-change"><ArrowUpRight size={13} /> {change} <em>vs. mes anterior</em></span></div>; }

function Dashboard({ onLogout }) {
  const [active, setActive] = useState('Resumen');
  const [showAdd, setShowAdd] = useState(false);
  const [query, setQuery] = useState('');
  const filteredClients = clients.filter(c => `${c.name} ${c.company}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="app-shell"><Sidebar active={active} setActive={setActive} onLogout={onLogout} /><main className="dashboard"><header className="topbar"><button className="mobile-menu"><Menu size={20} /></button><div className="crumb">Workspace <span>/</span> <strong>{active}</strong></div><div className="top-actions"><button className="icon-button notification"><Bell size={19} /><i /></button><div className="top-avatar avatar-violet">AC</div><ChevronDown size={15} /></div></header><div className="content"><div className="welcome-row"><div><p className="eyebrow">MIÉRCOLES, 19 DE JUNIO DE 2024</p><h1>Buenos días, Alexis <span>✦</span></h1><p className="muted">Este es el pulso de tu negocio hoy.</p></div><button className="primary-button" onClick={() => setShowAdd(true)}><Plus size={17} /> Nuevo contacto</button></div><div className="stats-grid"><StatCard title="Ingresos generados" value="$84,250" change="12.8%" icon={BarChart3} tone="purple" /><StatCard title="Nuevos contactos" value="1,284" change="8.2%" icon={Users} tone="orange" /><StatCard title="Tasa de conversión" value="24.6%" change="4.1%" icon={Target} tone="green" /><StatCard title="Tiempo de respuesta" value="2h 14m" change="18.5%" icon={Clock3} tone="blue" /></div><div className="main-grid"><section className="panel pipeline-panel"><div className="panel-heading"><div><h3>Pipeline de ventas</h3><p className="muted">Rendimiento de oportunidades por etapa</p></div><button className="filter-button">Este mes <ChevronDown size={14} /></button></div><div className="pipeline-chart"><div className="chart-y"><span>$100k</span><span>$75k</span><span>$50k</span><span>$25k</span><span>$0</span></div><div className="bars">{[['Prospectos', 45, 'bar-purple'], ['Contacto', 64, 'bar-blue'], ['Propuesta', 53, 'bar-orange'], ['Negociación', 78, 'bar-dark'], ['Ganado', 91, 'bar-green']].map(([label, height, color]) => <div className="bar-group" key={label}><div className="bar-track"><div className={`bar ${color}`} style={{ height: `${height}%` }}><span>{height === 91 ? '$32k' : height === 78 ? '$26k' : ''}</span></div></div><small>{label}</small></div>)}</div></div><div className="chart-footer"><span><i className="legend-dot dot-purple" />Este mes</span><span><i className="legend-dot dot-gray" />Mes anterior</span><strong>$128,450 <small>valor total</small></strong></div></section><section className="panel ai-panel"><div className="ai-heading"><div className="ai-badge"><Bot size={18} /></div><div><h3>Asistente Nexa IA</h3><p>Recomendaciones para ti</p></div><span className="live-dot">En vivo</span></div><div className="ai-insight"><Sparkles size={17} /><div><strong>Oportunidad detectada</strong><p>María Salazar ha abierto tu propuesta 3 veces hoy. Es un buen momento para contactarla.</p><button className="text-button">Ver contacto <ArrowUpRight size={14} /></button></div></div><div className="ai-insight"><MessageSquare size={17} /><div><strong>Seguimiento pendiente</strong><p>Hay 8 contactos sin actividad en los últimos 7 días.</p><button className="text-button">Revisar lista <ArrowUpRight size={14} /></button></div></div><button className="ai-footer">Preguntar a Nexa IA <ArrowUpRight size={15} /></button></section></div><section className="panel clients-panel"><div className="panel-heading"><div><h3>Contactos recientes</h3><p className="muted">Las últimas interacciones de tu equipo</p></div><div className="panel-actions"><div className="search-box"><Search size={15} /><input placeholder="Buscar contacto..." value={query} onChange={e => setQuery(e.target.value)} /></div><button className="view-all">Ver todos <ArrowUpRight size={14} /></button></div></div><div className="table-wrap"><table><thead><tr><th>CONTACTO</th><th>ESTADO</th><th>VALOR</th><th>ÚLTIMA ACTIVIDAD</th><th /></tr></thead><tbody>{filteredClients.map(client => <tr key={client.name}><td><div className="contact-cell"><div className={`avatar avatar-${client.color}`}>{client.initials}</div><div><strong>{client.name}</strong><span>{client.company}</span></div></div></td><td><span className={`status status-${client.status.replace(' ', '-').toLowerCase()}`}><i />{client.status}</span></td><td><strong>{client.value}</strong></td><td className="muted">{client.date}</td><td><button className="icon-button"><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div></section></div></main>{showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><div className="modal" onClick={e => e.stopPropagation()}><div className="modal-head"><div><span className="welcome-tag">NUEVO REGISTRO</span><h2>Añadir contacto</h2></div><button className="icon-button" onClick={() => setShowAdd(false)}><X size={18} /></button></div><label>Nombre completo<input placeholder="Ej. Laura Gómez" /></label><label>Correo electrónico<input type="email" placeholder="laura@empresa.com" /></label><label>Empresa<input placeholder="Nombre de la empresa" /></label><div className="modal-actions"><button className="secondary-button" onClick={() => setShowAdd(false)}>Cancelar</button><button className="primary-button" onClick={() => setShowAdd(false)}><Check size={16} /> Guardar contacto</button></div></div></div>}</div>;
}

function App() { const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('nexa-session') === 'true'); function login() { localStorage.setItem('nexa-session', 'true'); setLoggedIn(true); } function logout() { localStorage.removeItem('nexa-session'); setLoggedIn(false); } return loggedIn ? <Dashboard onLogout={logout} /> : <Login onLogin={login} />; }
createRoot(document.getElementById('root')).render(<App />);
