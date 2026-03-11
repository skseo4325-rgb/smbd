import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Settings, LogOut, Plus, Trash2, Edit2, 
  LayoutDashboard, FileText, Package, Image as ImageIcon, Globe,
  Instagram, Facebook, Youtube, Phone, Mail, MapPin, Check
} from 'lucide-react';
import { SiteSettings, Post, User } from './types';

// --- Components ---

const Navbar = ({ settings, onAdminClick }: { settings: SiteSettings, onAdminClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt={settings.site_name} className="h-10 object-contain" referrerPolicy="no-referrer" />
          ) : (
            <>
              <div className="w-8 h-8 bg-primary rounded-sm rotate-45 flex items-center justify-center">
                <span className="text-white font-black -rotate-45">S</span>
              </div>
              {settings.site_name}
            </>
          )}
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#home" className="hover:text-primary transition-colors">홈</a>
          <a href="#services" className="hover:text-primary transition-colors">서비스</a>
          <a href="#portfolio" className="hover:text-primary transition-colors">포트폴리오</a>
          <a href="#contact" className="hover:text-primary transition-colors">문의하기</a>
          <button onClick={onAdminClick} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Settings size={18} />
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass-panel absolute top-full left-0 w-full p-6 flex flex-col gap-4"
          >
            <a href="#home" onClick={() => setIsOpen(false)}>홈</a>
            <a href="#services" onClick={() => setIsOpen(false)}>서비스</a>
            <a href="#portfolio" onClick={() => setIsOpen(false)}>포트폴리오</a>
            <a href="#contact" onClick={() => setIsOpen(false)}>문의하기</a>
            <button onClick={() => { onAdminClick(); setIsOpen(false); }} className="flex items-center gap-2">
              <Settings size={18} /> 관리자
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ settings }: { settings: SiteSettings }) => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden luxury-gradient">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" 
        alt="Industrial" 
        className="w-full h-full object-cover opacity-30"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-primary font-semibold tracking-[0.3em] uppercase mb-4 block">Premium Bending Solutions</span>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
          {settings.hero_title}
        </h1>
        <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
          {settings.hero_subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="bg-primary hover:opacity-90 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105">
            상담 신청하기
          </a>
          <a href="#portfolio" className="border border-white/20 hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold transition-all">
            포트폴리오 보기
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Services = ({ settings }: { settings: SiteSettings }) => {
  const services = [
    { title: settings.service1_title, desc: settings.service1_desc, img: settings.service1_img },
    { title: settings.service2_title, desc: settings.service2_desc, img: settings.service2_img },
    { title: settings.service3_title, desc: settings.service3_desc, img: settings.service3_img }
  ];

  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-primary font-mono text-sm mb-2 block">01 / OUR SERVICES</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">전문적인 기술 서비스</h2>
          </div>
          <p className="text-white/50 max-w-md">
            수십 년간의 노하우를 바탕으로 가장 까다로운 산업 요구사항을 충족하는 정밀 벤딩 솔루션을 제공합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5"
            >
              <div className="aspect-[4/5] overflow-hidden bg-zinc-900">
                <img 
                  src={s.img} 
                  alt={s.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${s.title}/800/1000`;
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ posts }: { posts: Post[] }) => {
  const portfolioItems = posts.filter(p => p.type === 'portfolio');
  
  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-primary font-mono text-sm mb-2 block">02 / PORTFOLIO</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">작업 결과물</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.length > 0 ? (
            portfolioItems.map((item) => (
              <div key={item.id} className="relative aspect-square overflow-hidden group rounded-lg bg-zinc-900">
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/800/800`;
                  }}
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm line-clamp-3">{item.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-white/30 border border-dashed border-white/10 rounded-xl">
              등록된 포트폴리오가 없습니다. 관리자 페이지에서 추가해주세요.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ settings }: { settings: SiteSettings }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('https://formspree.io/f/xreanknz', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <span className="text-primary font-mono text-sm mb-2 block">03 / CONTACT</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">프로젝트 문의</h2>
          <p className="text-white/60 mb-12">
            기술적인 상담이나 견적 문의가 필요하신가요? 아래 연락처로 문의해 주시면 전문가가 친절히 답변해 드립니다.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase font-bold">Phone</p>
                <p className="text-lg">{settings.company_phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase font-bold">Email</p>
                <p className="text-lg">{settings.company_email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase font-bold">Address</p>
                <p className="text-lg">{settings.company_address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white/60">성함</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none transition-colors" 
                  placeholder="홍길동" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white/60">연락처</label>
                <input 
                  type="text" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none transition-colors" 
                  placeholder="010-0000-0000" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-white/60">문의 내용</label>
              <textarea 
                rows={4} 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary outline-none transition-colors" 
                placeholder="문의하실 내용을 입력해주세요."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full py-4 rounded-lg font-bold transition-all ${
                status === 'submitting' ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:opacity-90'
              }`}
            >
              {status === 'submitting' ? '전송 중...' : '문의 보내기'}
            </button>

            {status === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-500 text-center font-medium">
                문의가 성공적으로 전송되었습니다. 곧 연락드리겠습니다!
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-center font-medium">
                전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ settings }: { settings: SiteSettings }) => (
  <footer className="py-12 border-t border-white/10 bg-black">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-xl font-bold tracking-tighter">{settings.site_name}</div>
      <div className="text-sm text-white/40">© 2026 {settings.site_name}. All rights reserved.</div>
      <div className="flex gap-6">
        <a href={settings.instagram_url || '#'} target="_blank" rel="noopener noreferrer">
          <Instagram className={`transition-colors ${settings.instagram_url ? 'text-white/40 hover:text-pink-500' : 'text-white/10 cursor-not-allowed'}`} size={20} />
        </a>
        <a href={settings.facebook_url || '#'} target="_blank" rel="noopener noreferrer">
          <Facebook className={`transition-colors ${settings.facebook_url ? 'text-white/40 hover:text-blue-500' : 'text-white/10 cursor-not-allowed'}`} size={20} />
        </a>
        <a href={settings.youtube_url || '#'} target="_blank" rel="noopener noreferrer">
          <Youtube className={`transition-colors ${settings.youtube_url ? 'text-white/40 hover:text-red-500' : 'text-white/10 cursor-not-allowed'}`} size={20} />
        </a>
      </div>
    </div>
  </footer>
);

// --- Admin Panel ---

const AdminLogin = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          onLogin(data.user);
          return;
        }
      }
      
      // If API fails or returns error, try client-side fallback for static sites (Netlify)
      if (username === 'sm4798' && password === '1806322') {
        console.warn("API login failed, using client-side fallback (Static Mode)");
        onLogin({ username: 'sm4798' });
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      // Network error (likely no backend)
      if (username === 'sm4798' && password === '1806322') {
        onLogin({ username: 'sm4798' });
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-panel p-10 rounded-3xl"
      >
        <h2 className="text-3xl font-bold mb-2">관리자 로그인</h2>
        <p className="text-white/40 mb-8">승민산업벤딩 관리 시스템에 접속합니다.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-white/60">아이디</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary" 
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-white/60">비밀번호</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary" 
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full bg-primary py-4 rounded-lg font-bold hover:opacity-90 transition-all">로그인</button>
        </form>
      </motion.div>
    </div>
  );
};

const AdminDashboard = ({ 
  settings, 
  posts, 
  onClose, 
  onLogout, 
  onUpdateSettings,
  onUpdatePosts 
}: { 
  settings: SiteSettings, 
  posts: Post[], 
  onClose: () => void, 
  onLogout: () => void,
  onUpdateSettings: (s: SiteSettings) => void,
  onUpdatePosts: () => void
}) => {
  const [activeTab, setActiveTab] = useState<'cms' | 'settings' | 'seo'>('cms');
  const [editingSettings, setEditingSettings] = useState(settings);
  const [newPost, setNewPost] = useState({ type: 'notice', title: '', content: '', image_url: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isStaticMode, setIsStaticMode] = useState(false);

  useEffect(() => {
    // Check if API is available
    fetch('/api/settings').catch(() => setIsStaticMode(true));
  }, []);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    // Always save to LocalStorage for immediate persistence and static mode support
    localStorage.setItem('site_settings', JSON.stringify(editingSettings));
    
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: editingSettings })
      });
      
      if (res.ok) {
        onUpdateSettings(editingSettings);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        // Even if API fails, we've saved to LocalStorage
        onUpdateSettings(editingSettings);
        if (isStaticMode) {
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
          console.log('Saved to LocalStorage (Static Mode)');
        } else {
          alert('서버 저장 중 오류가 발생했습니다. (브라우저에는 임시 저장됨)');
        }
      }
    } catch (error) {
      onUpdateSettings(editingSettings);
      if (isStaticMode) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert('서버와 통신할 수 없습니다. (브라우저에는 임시 저장됨)');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddPost = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      if (res.ok) {
        setNewPost({ type: 'notice', title: '', content: '', image_url: '' });
        onUpdatePosts();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        if (isStaticMode) {
          alert('현재 정적 페이지(Netlify) 모드입니다. 서버가 없어 직접 저장이 불가능합니다.');
        } else {
          alert('게시글 등록 중 오류가 발생했습니다.');
        }
      }
    } catch (error) {
      if (isStaticMode) {
        alert('현재 정적 페이지(Netlify) 모드입니다. 서버가 없어 직접 저장이 불가능합니다.');
      } else {
        alert('게시글 등록 중 오류가 발생했습니다.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      onUpdatePosts();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col">
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-lg">Admin Dashboard</h1>
          {isStaticMode && (
            <span className="text-amber-500 text-xs font-medium bg-amber-500/10 px-2 py-0.5 rounded flex items-center gap-1">
              ⚠️ 정적 페이지 모드 (저장 불가)
            </span>
          )}
          <div className="flex gap-2 ml-8">
            <button 
              onClick={() => setActiveTab('cms')}
              className={`px-4 py-1 rounded-full text-sm transition-colors ${activeTab === 'cms' ? 'bg-blue-600' : 'hover:bg-white/10'}`}
            >
              콘텐츠 관리
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-1 rounded-full text-sm transition-colors ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-white/10'}`}
            >
              사이트 설정
            </button>
            <button 
              onClick={() => setActiveTab('seo')}
              className={`px-4 py-1 rounded-full text-sm transition-colors ${activeTab === 'seo' ? 'bg-blue-600' : 'hover:bg-white/10'}`}
            >
              SEO 도구
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="text-sm hover:text-blue-500">사이트 보기</button>
          <button onClick={onLogout} className="p-2 hover:bg-white/10 rounded-full text-red-500"><LogOut size={20} /></button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'cms' && (
            <div className="space-y-12">
              <section className="glass-panel p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus size={20} /> 새 게시글 작성</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <select 
                    className="bg-zinc-900 border border-white/10 rounded-lg p-3"
                    value={newPost.type}
                    onChange={(e) => setNewPost({...newPost, type: e.target.value as any})}
                  >
                    <option value="notice">공지사항</option>
                    <option value="product">제품 소개</option>
                    <option value="portfolio">포트폴리오</option>
                  </select>
                  <input 
                    type="text" placeholder="제목" className="bg-zinc-900 border border-white/10 rounded-lg p-3"
                    value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  />
                </div>
                <input 
                  type="text" placeholder="이미지 URL" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 mb-4"
                  value={newPost.image_url} onChange={(e) => setNewPost({...newPost, image_url: e.target.value})}
                />
                <textarea 
                  placeholder="내용" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 mb-4" rows={4}
                  value={newPost.content} onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                ></textarea>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleAddPost} 
                    disabled={isSaving}
                    className={`bg-blue-600 px-8 py-3 rounded-lg font-bold transition-all ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                  >
                    {isSaving ? '등록 중...' : '등록하기'}
                  </button>
                  {saveSuccess && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      className="text-emerald-500 font-bold flex items-center gap-2"
                    >
                      <Check size={18} /> 등록 완료! (GitHub 동기화됨)
                    </motion.span>
                  )}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-6">게시글 목록</h3>
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="glass-panel p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-zinc-800 overflow-hidden border border-white/10">
                          {post.image_url && (
                            <img 
                              src={post.image_url} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer" 
                              onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/111/fff?text=Error'}
                            />
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-blue-500">{post.type}</span>
                          <h4 className="font-bold">{post.title}</h4>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg"><Edit2 size={16} /></button>
                        <button onClick={() => handleDeletePost(post.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-panel p-8 rounded-2xl space-y-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings size={20} /> 사이트 전반 설정</h3>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/40 uppercase">사이트 이름</label>
                  <input 
                    type="text" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3"
                    value={editingSettings.site_name} onChange={(e) => setEditingSettings({...editingSettings, site_name: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/40 uppercase">로고 URL</label>
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
                      <img 
                        src={editingSettings.logo_url} 
                        className="max-w-full max-h-full object-contain" 
                        referrerPolicy="no-referrer"
                        onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/111/fff?text=Logo'}
                      />
                    </div>
                    <input 
                      type="text" className="flex-1 bg-zinc-900 border border-white/10 rounded-lg p-3"
                      value={editingSettings.logo_url} onChange={(e) => setEditingSettings({...editingSettings, logo_url: e.target.value})}
                      placeholder="이미지 URL을 입력하세요"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/40 uppercase">회사 전화번호</label>
                  <input 
                    type="text" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3"
                    value={editingSettings.company_phone} onChange={(e) => setEditingSettings({...editingSettings, company_phone: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/40 uppercase">회사 이메일</label>
                  <input 
                    type="text" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3"
                    value={editingSettings.company_email} onChange={(e) => setEditingSettings({...editingSettings, company_email: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/40 uppercase">회사 주소</label>
                  <input 
                    type="text" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3"
                    value={editingSettings.company_address} onChange={(e) => setEditingSettings({...editingSettings, company_address: e.target.value})}
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h4 className="font-bold mb-4">서비스 카테고리 설정</h4>
                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3].map(num => (
                    <div key={num} className="space-y-4 p-4 bg-white/5 rounded-xl">
                      <p className="text-sm font-bold">서비스 {num}</p>
                      <div className="aspect-video rounded-lg overflow-hidden bg-black mb-2">
                        <img 
                          src={editingSettings[`service${num}_img`]} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                          onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/400x225/111/fff?text=No+Image'}
                        />
                      </div>
                      <input 
                        type="text" placeholder="제목" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-sm"
                        value={editingSettings[`service${num}_title`]} onChange={(e) => setEditingSettings({...editingSettings, [`service${num}_title`]: e.target.value})}
                      />
                      <textarea 
                        placeholder="설명" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-sm" rows={2}
                        value={editingSettings[`service${num}_desc`]} onChange={(e) => setEditingSettings({...editingSettings, [`service${num}_desc`]: e.target.value})}
                      ></textarea>
                      <input 
                        type="text" placeholder="이미지 URL" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-sm"
                        value={editingSettings[`service${num}_img`]} onChange={(e) => setEditingSettings({...editingSettings, [`service${num}_img`]: e.target.value})}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/40 uppercase">인스타그램 URL</label>
                  <input 
                    type="text" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm"
                    value={editingSettings.instagram_url} onChange={(e) => setEditingSettings({...editingSettings, instagram_url: e.target.value})}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/40 uppercase">페이스북 URL</label>
                  <input 
                    type="text" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm"
                    value={editingSettings.facebook_url} onChange={(e) => setEditingSettings({...editingSettings, facebook_url: e.target.value})}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/40 uppercase">유튜브 URL</label>
                  <input 
                    type="text" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm"
                    value={editingSettings.youtube_url} onChange={(e) => setEditingSettings({...editingSettings, youtube_url: e.target.value})}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/40 uppercase">포인트 컬러 (Primary)</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" className="h-12 w-12 bg-transparent border-none cursor-pointer"
                      value={editingSettings.primary_color || '#3b82f6'} onChange={(e) => setEditingSettings({...editingSettings, primary_color: e.target.value})}
                    />
                    <input 
                      type="text" className="flex-1 bg-zinc-900 border border-white/10 rounded-lg p-3"
                      value={editingSettings.primary_color || '#3b82f6'} onChange={(e) => setEditingSettings({...editingSettings, primary_color: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-white/40 uppercase">배경 컬러 (Background)</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" className="h-12 w-12 bg-transparent border-none cursor-pointer"
                      value={editingSettings.bg_color || '#000000'} onChange={(e) => setEditingSettings({...editingSettings, bg_color: e.target.value})}
                    />
                    <input 
                      type="text" className="flex-1 bg-zinc-900 border border-white/10 rounded-lg p-3"
                      value={editingSettings.bg_color || '#000000'} onChange={(e) => setEditingSettings({...editingSettings, bg_color: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-white/40 uppercase">히어로 타이틀</label>
                <input 
                  type="text" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3"
                  value={editingSettings.hero_title} onChange={(e) => setEditingSettings({...editingSettings, hero_title: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-white/40 uppercase">히어로 서브타이틀</label>
                <textarea 
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3" rows={3}
                  value={editingSettings.hero_subtitle} onChange={(e) => setEditingSettings({...editingSettings, hero_subtitle: e.target.value})}
                ></textarea>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleSaveSettings} 
                  disabled={isSaving}
                  className={`bg-blue-600 px-8 py-3 rounded-lg font-bold transition-all ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {isSaving ? '저장 중...' : '설정 저장'}
                </button>
                {saveSuccess && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className="text-emerald-500 font-bold flex items-center gap-2"
                  >
                    <Check size={18} /> 저장 완료! (GitHub 동기화됨)
                  </motion.span>
                )}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="glass-panel p-8 rounded-2xl space-y-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Globe size={20} /> SEO 최적화 도구</h3>
              <div className="space-y-4">
                <label className="text-xs font-bold text-white/40 uppercase">메타 타이틀 (SEO Title)</label>
                <input 
                  type="text" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3"
                  value={editingSettings.seo_title} onChange={(e) => setEditingSettings({...editingSettings, seo_title: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-white/40 uppercase">메타 설명 (SEO Description)</label>
                <textarea 
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3" rows={4}
                  value={editingSettings.seo_description} onChange={(e) => setEditingSettings({...editingSettings, seo_description: e.target.value})}
                ></textarea>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleSaveSettings} 
                  disabled={isSaving}
                  className={`bg-blue-600 px-8 py-3 rounded-lg font-bold transition-all ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {isSaving ? '저장 중...' : 'SEO 설정 저장'}
                </button>
                {saveSuccess && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className="text-emerald-500 font-bold flex items-center gap-2"
                  >
                    <Check size={18} /> 저장 완료! (GitHub 동기화됨)
                  </motion.span>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    // 1. Try LocalStorage first for instant user-specific persistence
    const localSettings = localStorage.getItem('site_settings');
    if (localSettings) {
      try {
        setSettings(JSON.parse(localSettings));
      } catch (e) {
        console.error("Error parsing local settings", e);
      }
    }

    try {
      const [sRes, pRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/posts')
      ]);
      
      if (!sRes.ok || !pRes.ok) {
        throw new Error('API request failed');
      }

      const serverSettings = await sRes.json();
      setSettings(serverSettings);
      // Sync local storage with server if server is available
      localStorage.setItem('site_settings', JSON.stringify(serverSettings));
      setPosts(await pRes.json());
    } catch (err) {
      console.warn("API failed, falling back to static JSON files:", err);
      try {
        const [sRes, pRes] = await Promise.all([
          fetch('/settings.json'),
          fetch('/posts.json')
        ]);
        
        if (sRes.ok) {
          const staticSettings = await sRes.json();
          // Only use static if we don't already have local settings
          if (!localStorage.getItem('site_settings')) {
            setSettings(staticSettings);
          }
        } else {
          throw new Error('Static settings not found');
        }
        if (pRes.ok) setPosts(await pRes.json());
      } catch (fallbackErr) {
        console.error("Static fallback failed:", fallbackErr);
        if (!settings) {
          setError("데이터를 불러오는 데 실패했습니다. 네트워크 연결을 확인해 주세요.");
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Dynamic Styling & SEO Persistence
  useEffect(() => {
    if (settings) {
      // Apply dynamic colors to CSS variables
      const root = document.documentElement;
      root.style.setProperty('--primary-color', settings.primary_color || '#3b82f6');
      root.style.setProperty('--bg-color', settings.bg_color || '#000000');
      
      // Update SEO
      document.title = settings.seo_title || '승민산업벤딩';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', settings.seo_description || '');
      }
    }
  }, [settings]);

  if (error) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-black text-white">
      <p className="text-xl font-bold text-red-500">{error}</p>
      <button onClick={() => window.location.reload()} className="bg-blue-600 px-6 py-2 rounded-full">다시 시도</button>
    </div>
  );

  if (!settings) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-black text-white">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white/60 animate-pulse">데이터를 불러오는 중입니다...</p>
    </div>
  );

  return (
    <div className="min-h-screen font-sans">
      <Navbar settings={settings} onAdminClick={() => setIsAdminOpen(true)} />
      
      <main>
        <Hero settings={settings} />
        <Services settings={settings} />
        <Portfolio posts={posts} />
        <Contact settings={settings} />
      </main>

      <Footer settings={settings} />

      <AnimatePresence>
        {isAdminOpen && (
          <>
            {!user ? (
              <AdminLogin onLogin={(u) => setUser(u)} />
            ) : (
              <AdminDashboard 
                settings={settings} 
                posts={posts} 
                onClose={() => setIsAdminOpen(false)}
                onLogout={() => setUser(null)}
                onUpdateSettings={(s) => setSettings(s)}
                onUpdatePosts={fetchData}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
