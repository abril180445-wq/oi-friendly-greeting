import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, FileText, Sparkles, Send, Wand2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
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
    setLoading(false);
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
      </main>
    </div>
  );
};

export default Admin;
