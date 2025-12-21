import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, FileText, Sparkles, Settings, Save, Loader2, Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Linkedin, Youtube, Globe, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type Profile = {
  id: string;
  role: string;
  name: string | null;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
};

type SiteSettings = {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  website: string;
  chatbot_enabled: string;
  chatbot_greeting: string;
};

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    phone: '',
    email: '',
    address: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    website: '',
    chatbot_enabled: 'true',
    chatbot_greeting: 'Olá! Como posso ajudar você hoje?'
  });
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    category: '',
    tags: '',
    published: false
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/login');
      return;
    }

    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('id, role, name')
      .eq('user_id', user.id)
      .single();

    if (error || !profileData || profileData.role !== 'admin') {
      toast({
        title: 'Acesso negado',
        description: 'Você não tem permissão para acessar esta área.',
        variant: 'destructive'
      });
      navigate('/');
      return;
    }

    setProfile(profileData);
    fetchPosts();
    fetchSiteSettings();
    setLoading(false);
  };

  const fetchSiteSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (!error && data) {
      const settings: SiteSettings = {
        phone: '',
        email: '',
        address: '',
        whatsapp: '',
        instagram: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        website: '',
        chatbot_enabled: 'true',
        chatbot_greeting: 'Olá! Como posso ajudar você hoje?'
      };
      data.forEach((item) => {
        if (item.key in settings) {
          settings[item.key as keyof SiteSettings] = item.value || '';
        }
      });
      setSiteSettings(settings);
    }
  };

  const saveSiteSettings = async () => {
    setSavingSettings(true);
    
    const keys: (keyof SiteSettings)[] = ['phone', 'email', 'address', 'whatsapp', 'instagram', 'facebook', 'linkedin', 'youtube', 'website', 'chatbot_enabled', 'chatbot_greeting'];
    
    for (const key of keys) {
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', key)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('site_settings')
          .update({ value: siteSettings[key], updated_at: new Date().toISOString() })
          .eq('key', key);
      } else {
        await supabase
          .from('site_settings')
          .insert({ key, value: siteSettings[key] });
      }
    }
    
    setSavingSettings(false);
    toast({ title: 'Configurações salvas!' });
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: editingPost ? prev.slug : generateSlug(title)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) return;

    const postData = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt || null,
      content: formData.content,
      cover_image: formData.cover_image || null,
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      published: formData.published,
      published_at: formData.published ? new Date().toISOString() : null,
      author_id: profile.id
    };

    if (editingPost) {
      const { error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', editingPost.id);

      if (error) {
        toast({ title: 'Erro ao atualizar', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Artigo atualizado!' });
    } else {
      const { error } = await supabase
        .from('blog_posts')
        .insert(postData);

      if (error) {
        toast({ title: 'Erro ao criar', description: error.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Artigo criado!' });
    }

    resetForm();
    fetchPosts();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image: '',
      category: '',
      tags: '',
      published: false
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const editPost = (post: BlogPost) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      cover_image: post.cover_image || '',
      category: post.category,
      tags: post.tags.join(', '),
      published: post.published
    });
    setEditingPost(post);
    setShowForm(true);
  };

  const togglePublish = async (post: BlogPost) => {
    const { error } = await supabase
      .from('blog_posts')
      .update({ 
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : null
      })
      .eq('id', post.id);

    if (!error) {
      toast({ title: post.published ? 'Artigo despublicado' : 'Artigo publicado!' });
      fetchPosts();
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este artigo?')) return;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (!error) {
      toast({ title: 'Artigo excluído' });
      fetchPosts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-secondary/30 sticky top-0 z-50">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-primary" size={24} />
            <h1 className="text-xl font-bold">Painel Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/campaigns">
              <Button variant="outline" size="sm" className="gap-2">
                <Sparkles size={14} />
                Campanhas
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground">
              Olá, {profile?.name || 'Admin'}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="blog" className="gap-2">
              <FileText size={16} />
              Blog
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings size={16} />
              Configurações do Site
            </TabsTrigger>
          </TabsList>

          {/* Blog Tab */}
          <TabsContent value="blog">
            {/* Actions */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold">Artigos do Blog</h2>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus size={16} />
                Novo Artigo
              </Button>
            </div>

            {/* Form */}
            {showForm && (
              <div className="glass-card p-6 rounded-2xl mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  {editingPost ? 'Editar Artigo' : 'Novo Artigo'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Título</label>
                      <Input
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder="Título do artigo"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Slug</label>
                      <Input
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="url-do-artigo"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Categoria</label>
                      <Input
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="Ex: Desenvolvimento Web"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tags (separadas por vírgula)</label>
                      <Input
                        value={formData.tags}
                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="react, javascript, web"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">URL da Imagem de Capa</label>
                    <Input
                      value={formData.cover_image}
                      onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Resumo</label>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Um breve resumo do artigo..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Conteúdo (HTML permitido)</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="<p>Conteúdo do artigo...</p>"
                      rows={10}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                      className="rounded"
                    />
                    <label htmlFor="published" className="text-sm">Publicar imediatamente</label>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">
                      {editingPost ? 'Atualizar' : 'Criar'} Artigo
                    </Button>
                    <Button type="button" variant="ghost" onClick={resetForm}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Posts List */}
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Nenhum artigo ainda. Crie o primeiro!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="glass-card p-4 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{post.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {post.published ? 'Publicado' : 'Rascunho'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        /{post.slug} • {post.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePublish(post)}
                        title={post.published ? 'Despublicar' : 'Publicar'}
                      >
                        {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editPost(post)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePost(post.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold mb-6">Configurações do Site</h2>
              
              <div className="glass-card p-6 rounded-2xl space-y-6">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Phone size={16} className="text-primary" />
                    Telefone
                  </label>
                  <Input
                    value={siteSettings.phone}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <MessageCircle size={16} className="text-primary" />
                    WhatsApp
                  </label>
                  <Input
                    value={siteSettings.whatsapp}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                    placeholder="5511999999999"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Formato: código do país + DDD + número (sem espaços)</p>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Mail size={16} className="text-primary" />
                    Email
                  </label>
                  <Input
                    value={siteSettings.email}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contato@seusite.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-primary" />
                    Endereço
                  </label>
                  <Textarea
                    value={siteSettings.address}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Rua Exemplo, 123 - Bairro - Cidade/UF"
                    rows={2}
                  />
                </div>

                {/* Separator */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Globe size={18} className="text-primary" />
                    Redes Sociais
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Instagram size={16} className="text-pink-500" />
                      Instagram
                    </label>
                    <Input
                      value={siteSettings.instagram}
                      onChange={(e) => setSiteSettings(prev => ({ ...prev, instagram: e.target.value }))}
                      placeholder="https://instagram.com/seuusuario"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Facebook size={16} className="text-blue-600" />
                      Facebook
                    </label>
                    <Input
                      value={siteSettings.facebook}
                      onChange={(e) => setSiteSettings(prev => ({ ...prev, facebook: e.target.value }))}
                      placeholder="https://facebook.com/suapagina"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Linkedin size={16} className="text-blue-700" />
                      LinkedIn
                    </label>
                    <Input
                      value={siteSettings.linkedin}
                      onChange={(e) => setSiteSettings(prev => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/company/suaempresa"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Youtube size={16} className="text-red-600" />
                      YouTube
                    </label>
                    <Input
                      value={siteSettings.youtube}
                      onChange={(e) => setSiteSettings(prev => ({ ...prev, youtube: e.target.value }))}
                      placeholder="https://youtube.com/@seucanal"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Globe size={16} className="text-primary" />
                    Website / Portfólio
                  </label>
                  <Input
                    value={siteSettings.website}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://seusite.com"
                  />
                </div>

                {/* AI Settings */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Bot size={18} className="text-primary" />
                    Chatbot IA
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="chatbot_enabled"
                    checked={siteSettings.chatbot_enabled === 'true'}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, chatbot_enabled: e.target.checked ? 'true' : 'false' }))}
                    className="rounded"
                  />
                  <label htmlFor="chatbot_enabled" className="text-sm font-medium">
                    Ativar Chatbot no site
                  </label>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-2">
                    Mensagem de boas-vindas do Chatbot
                  </label>
                  <Textarea
                    value={siteSettings.chatbot_greeting}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, chatbot_greeting: e.target.value }))}
                    placeholder="Olá! Como posso ajudar você hoje?"
                    rows={2}
                  />
                </div>

                <Button onClick={saveSiteSettings} disabled={savingSettings} className="gap-2">
                  {savingSettings ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  Salvar Configurações
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
