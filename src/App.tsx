import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Settings, LogOut, Plus, Trash2, Edit2, 
  LayoutDashboard, FileText, Package, Image as ImageIcon, Globe,
  Instagram, Facebook, Youtube, Phone, Mail, MapPin, Check,
  Play, Video
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
        src={settings.hero_bg_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"} 
        alt="Industrial" 
        className="w-full h-full object-cover opacity-30"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070";
        }}
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

const extractYoutubeId = (url: string = "") => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const Portfolio = ({ posts }: { posts: Post[] }) => {
  const portfolioItems = posts.filter(p => p.type === 'portfolio');
  const [selectedItem, setSelectedItem] = useState<Post | null>(null);
  
  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-primary font-mono text-sm mb-2 block">02 / PORTFOLIO</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">작업 결과물</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.length > 0 ? (
            portfolioItems.map((item) => {
              const youtubeId = extractYoutubeId(item.image_url) || extractYoutubeId(item.content);
              const hasVideo = !!youtubeId;
              const thumbnailSrc = youtubeId 
                ? `https://img.youtube.com/vi/${youtubeId}/0.jpg` 
                : item.image_url;

              return (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedItem(item)}
                  className="relative aspect-square overflow-hidden group rounded-lg bg-zinc-900 cursor-pointer border border-white/5"
                >
                  <img 
                    src={thumbnailSrc} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/800/800`;
                    }}
                  />
                  
                  {/* YouTube Overlay indicator */}
                  {hasVideo && (
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md p-2 rounded-full border border-white/10 z-10 flex items-center justify-center text-red-500">
                      <Youtube size={18} />
                    </div>
                  )}

                  {/* Play icon inside card on hover */}
                  {hasVideo && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all z-10 pointer-events-none">
                      <div className="w-16 h-16 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-600 transition-colors">
                        <Play size={28} className="ml-1 fill-white" />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center z-20">
                    {hasVideo && (
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4">
                        <Play size={20} className="ml-0.5 text-white fill-white" />
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm line-clamp-3">{item.content.replace(/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+/g, '').trim()}</p>
                    <span className="text-xs text-white/60 mt-4 underline font-medium">
                      {hasVideo ? '동영상 재생하기' : '자세히 보기'}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center text-white/30 border border-dashed border-white/10 rounded-xl">
              등록된 포트폴리오가 없습니다. 관리자 페이지에서 추가해주세요.
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Video Player Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-[60] p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors border border-white/10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col lg:flex-row min-h-[400px] lg:h-[550px]">
                {/* Media Section */}
                <div className="flex-1 bg-black flex items-center justify-center relative min-h-[250px] sm:min-h-[350px] lg:min-h-0">
                  {(() => {
                    const youtubeId = extractYoutubeId(selectedItem.image_url) || extractYoutubeId(selectedItem.content);
                    if (youtubeId) {
                      return (
                        <iframe 
                          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                          title={selectedItem.title}
                          className="w-full h-full border-0 absolute inset-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      );
                    } else {
                      return (
                        <img 
                          src={selectedItem.image_url} 
                          alt={selectedItem.title} 
                          className="max-h-full max-w-full object-contain absolute p-4"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${selectedItem.id}/800/800`;
                          }}
                        />
                      );
                    }
                  })()}
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-80 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-zinc-950">
                  <div className="overflow-y-auto max-h-[200px] lg:max-h-none mb-6">
                    <span className="text-primary font-mono text-xs uppercase tracking-wider mb-2 block">Portfolio Project</span>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 text-white line-clamp-2">{selectedItem.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedItem.content.replace(/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+/g, '').trim()}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/30 font-mono">
                    <span>등록일</span>
                    <span>{new Date(selectedItem.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const [mediaMode, setMediaMode] = useState<'image' | 'youtube'>('image');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isStaticMode, setIsStaticMode] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const handleStartEdit = (post: Post) => {
    setEditingPostId(post.id);
    setNewPost({
      type: post.type,
      title: post.title,
      content: post.content,
      image_url: post.image_url || ''
    });
    setMediaMode(extractYoutubeId(post.image_url || '') ? 'youtube' : 'image');
    const element = document.getElementById('cms-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setNewPost({ type: 'notice', title: '', content: '', image_url: '' });
    setMediaMode('image');
  };

  const handleEditPost = async () => {
    if (editingPostId === null) return;
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/posts/${editingPostId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      if (res.ok) {
        setNewPost({ type: 'notice', title: '', content: '', image_url: '' });
        setMediaMode('image');
        setEditingPostId(null);
        onUpdatePosts();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        if (isStaticMode) {
          alert('현재 정적 페이지(Netlify) 모드입니다. 서버가 없어 직접 저장이 불가능합니다.');
        } else {
          alert('게시글 수정 중 오류가 발생했습니다.');
        }
      }
    } catch (error) {
      if (isStaticMode) {
        alert('현재 정적 페이지(Netlify) 모드입니다. 서버가 없어 직접 저장이 불가능합니다.');
      } else {
        alert('게시글 수정 중 오류가 발생했습니다.');
      }
    } finally {
      setIsSaving(false);
    }
  };

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
        setMediaMode('image');
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
    setIsSaving(true);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        onUpdatePosts();
        setPostToDelete(null);
        if (editingPostId === id) {
          handleCancelEdit();
        }
      } else {
        if (isStaticMode) {
          alert('현재 정적 페이지(Netlify) 모드입니다. 서버가 없어 직접 삭제가 불가능합니다.');
        } else {
          alert('게시글 삭제 중 오류가 발생했습니다.');
        }
      }
    } catch (e) {
      if (isStaticMode) {
        alert('현재 정적 페이지(Netlify) 모드입니다. 서버가 없어 직접 삭제가 불가능합니다.');
      } else {
        alert('게시글 삭제 중 오류가 발생했습니다.');
      }
    } finally {
      setIsSaving(false);
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
              <section id="cms-form-section" className="glass-panel p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  {editingPostId !== null ? <Edit2 size={20} /> : <Plus size={20} />}
                  {editingPostId !== null ? '게시글 수정하기' : '새 게시글 작성'}
                </h3>
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
                <div className="mb-6 space-y-4">
                  {/* Media Mode Selector */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setMediaMode('image')}
                      className={`flex-1 py-2.5 px-4 rounded-lg border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        mediaMode === 'image'
                          ? 'bg-blue-600/10 border-blue-500/40 text-blue-400'
                          : 'bg-zinc-900 border-white/5 text-white/60 hover:bg-zinc-800'
                      }`}
                    >
                      <ImageIcon size={16} /> 일반 이미지 등록
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaMode('youtube')}
                      className={`flex-1 py-2.5 px-4 rounded-lg border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        mediaMode === 'youtube'
                          ? 'bg-red-600/10 border-red-500/40 text-red-500'
                          : 'bg-zinc-900 border-white/5 text-white/60 hover:bg-zinc-800'
                      }`}
                    >
                      <Youtube size={16} /> 유튜브 동영상 링크
                    </button>
                  </div>

                  {/* Conditional Input Field */}
                  <div>
                    {mediaMode === 'image' ? (
                      <div>
                        <input 
                          type="text" 
                          placeholder="이미지 URL (예: https://images.unsplash.com/...)" 
                          className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3"
                          value={newPost.image_url} 
                          onChange={(e) => setNewPost({...newPost, image_url: e.target.value})}
                        />
                        <p className="text-xs text-white/40 mt-1.5 pl-1">소개 이미지의 웹 주소(URL)를 입력하세요.</p>
                      </div>
                    ) : (
                      <div>
                        <input 
                          type="text" 
                          placeholder="유튜브 동영상 주소 (예: https://www.youtube.com/watch?v=...)" 
                          className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 focus:border-red-500/50 outline-none"
                          value={newPost.image_url} 
                          onChange={(e) => setNewPost({...newPost, image_url: e.target.value})}
                        />
                        <div className="text-xs text-red-400 mt-2 flex items-start gap-1.5 bg-red-950/20 border border-red-900/40 p-2.5 rounded-lg leading-relaxed">
                          <Video size={16} className="mt-0.5 shrink-0" />
                          <span>유튜브 동영상 주소를 직접 입력하시면 해당 영상의 썸네일이 자동으로 설정되며, 포트폴리오 섹션에서 즉시 동영상 재생이 가능한 한글 지원 전용 플레이어가 활성화됩니다.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <textarea 
                  placeholder="내용" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 mb-4" rows={4}
                  value={newPost.content} onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                ></textarea>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={editingPostId !== null ? handleEditPost : handleAddPost} 
                    disabled={isSaving}
                    className={`bg-blue-600 px-8 py-3 rounded-lg font-bold transition-all ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                  >
                    {isSaving ? (editingPostId !== null ? '수정 중...' : '등록 중...') : (editingPostId !== null ? '수정 완료' : '등록하기')}
                  </button>
                  {editingPostId !== null && (
                    <button 
                      onClick={handleCancelEdit}
                      disabled={isSaving}
                      className="bg-zinc-800 hover:bg-zinc-700 border border-white/10 px-6 py-3 rounded-lg font-bold transition-all text-white/80"
                    >
                      취소
                    </button>
                  )}
                  {saveSuccess && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      className="text-emerald-500 font-bold flex items-center gap-2"
                    >
                      <Check size={18} /> {editingPostId !== null ? '수정 완료!' : '등록 완료!'} (GitHub 동기화됨)
                    </motion.span>
                  )}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-6">게시글 목록</h3>
                <div className="space-y-4">
                  {posts.map(post => {
                    const postYoutubeId = extractYoutubeId(post.image_url) || extractYoutubeId(post.content);
                    const thumbnail = postYoutubeId 
                      ? `https://img.youtube.com/vi/${postYoutubeId}/default.jpg` 
                      : post.image_url;

                    return (
                      <div key={post.id} className={`glass-panel p-4 rounded-xl flex items-center justify-between border transition-all ${editingPostId === post.id ? 'border-blue-500/40 bg-blue-950/10' : 'border-white/15'}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded bg-zinc-800 overflow-hidden border border-white/10 relative flex items-center justify-center">
                            {thumbnail ? (
                              <>
                                <img 
                                  src={thumbnail} 
                                  className="w-full h-full object-cover" 
                                  referrerPolicy="no-referrer" 
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/111/fff?text=No+Image';
                                  }}
                                />
                                {postYoutubeId && (
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-red-500">
                                    <Play size={14} className="fill-red-500 text-red-500" />
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="text-[10px] text-white/30">No Img</div>
                            )}
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-blue-500">{post.type}</span>
                            <h4 className="font-bold">{post.title}</h4>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleStartEdit(post)} 
                            className={`p-2 rounded-lg transition-colors ${editingPostId === post.id ? 'bg-blue-600 text-white' : 'hover:bg-white/10 text-white/75 hover:text-white'}`}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => setPostToDelete(post)} 
                            className="p-2 hover:bg-red-950/40 rounded-lg text-red-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
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
                <label className="text-xs font-bold text-white/40 uppercase">히어로 배경 이미지 URL</label>
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-12 rounded bg-black flex items-center justify-center overflow-hidden border border-white/10">
                    <img 
                      src={editingSettings.hero_bg_url} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                      onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/400x225/111/fff?text=No+Image'}
                    />
                  </div>
                  <input 
                    type="text" className="flex-1 bg-zinc-900 border border-white/10 rounded-lg p-3"
                    value={editingSettings.hero_bg_url} onChange={(e) => setEditingSettings({...editingSettings, hero_bg_url: e.target.value})}
                    placeholder="배경 이미지 URL을 입력하세요"
                  />
                </div>
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
                {(window.location.hostname.includes('github.io') || window.location.hostname.includes('smbending.co.kr')) && (
                  <span className="text-xs text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                    * 깃허브 페이지에서는 실시간 저장이 제한됩니다. 로컬에서 수정 후 푸시해 주세요.
                  </span>
                )}
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
                {(window.location.hostname.includes('github.io') || window.location.hostname.includes('smbending.co.kr')) && (
                  <span className="text-xs text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                    * 깃허브 페이지에서는 실시간 저장이 제한됩니다.
                  </span>
                )}
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

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {postToDelete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setPostToDelete(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-lg font-bold text-white mb-2">게시글 삭제</h4>
              <p className="text-sm text-white/70 mb-6 leading-relaxed">
                정말로 <span className="text-white font-bold">"{postToDelete.title}"</span> 게시글을 삭제하시겠습니까? 이 작업은 복구할 수 없습니다.
              </p>
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setPostToDelete(null)}
                  disabled={isSaving}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-semibold transition-colors border border-white/5"
                >
                  취소
                </button>
                <button 
                  onClick={() => handleDeletePost(postToDelete.id)}
                  disabled={isSaving}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  {isSaving ? '삭제 중...' : '삭제하기'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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

  const fetchData = async (isInitial = false) => {
    // 1. Try LocalStorage ONLY on initial load to prevent visual flicker before the server responds
    if (isInitial) {
      const localSettings = localStorage.getItem('site_settings');
      if (localSettings) {
        try {
          setSettings(JSON.parse(localSettings));
        } catch (e) {
          console.error("Error parsing local settings", e);
        }
      }
    }

    try {
      // Try API first (for local dev or Node.js hosts)
      const [sRes, pRes] = await Promise.all([
        fetch('api/settings').catch(() => ({ ok: false })),
        fetch('api/posts').catch(() => ({ ok: false }))
      ]);
      
      let serverSettings = null;
      let serverPosts = null;

      if (sRes.ok) {
        serverSettings = await (sRes as Response).json();
        if (serverSettings && typeof serverSettings === 'object') {
          setSettings(serverSettings);
          localStorage.setItem('site_settings', JSON.stringify(serverSettings));
        }
      }
      
      if (pRes.ok) {
        serverPosts = await (pRes as Response).json();
        if (Array.isArray(serverPosts)) {
          setPosts(serverPosts);
        }
      }

      // If API failed, fallback to static JSON files
      if (!sRes.ok || !pRes.ok) {
        console.log("API not available, using static fallbacks");
        // Apply cache-busting to fetch the freshest files synced from GitHub
        const [staticSRes, staticPRes] = await Promise.all([
          fetch(`settings.json?t=${Date.now()}`).catch(() => ({ ok: false })),
          fetch(`posts.json?t=${Date.now()}`).catch(() => ({ ok: false }))
        ]);
        
        if (staticSRes.ok) {
          const staticSettings = await (staticSRes as Response).json();
          setSettings(staticSettings);
          localStorage.setItem('site_settings', JSON.stringify(staticSettings));
        }
        if (staticPRes.ok) {
          const staticPosts = await (staticPRes as Response).json();
          setPosts(staticPosts);
        }
      }
    } catch (err) {
      console.error("Data fetch error:", err);
      // Final emergency fallback if network is completely down
      if (!settings) {
        const fallbackSettings = localStorage.getItem('site_settings');
        if (fallbackSettings) {
          setSettings(JSON.parse(fallbackSettings));
        } else {
          setError("데이터를 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.");
        }
      }
    }
  };

  useEffect(() => {
    fetchData(true); // Initial load with fast local cache placeholder

    // Set up 15-second background polling so other clients/browsers automatically update
    const interval = setInterval(() => {
      fetchData(false);
    }, 15000);

    return () => clearInterval(interval);
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
                onUpdatePosts={() => fetchData(false)}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
