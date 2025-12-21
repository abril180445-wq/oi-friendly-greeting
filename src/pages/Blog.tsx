import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, User, ArrowRight, Tag, ArrowLeft, Home, 
  Search, Clock, TrendingUp, Bookmark, Filter, X,
  ChevronRight, Mail
} from 'lucide-react';
import Header from '@/components/mobi/Header';
import Footer from '@/components/mobi/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  published_at: string | null;
  created_at: string;
  author: {
    name: string | null;
    avatar_url: string | null;
  };
};

const Blog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          content,
          cover_image,
          category,
          tags,
          published_at,
          created_at,
          profiles:author_id (
            name,
            avatar_url
          )
        `)
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (!error && data) {
        const formatted = data.map((post: any) => ({
          ...post,
          author: post.profiles
        }));
        setPosts(formatted);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get unique categories and tags
  const categories = useMemo(() => {
    const cats = posts.map(p => p.category);
    return [...new Set(cats)];
  }, [posts]);

  const allTags = useMemo(() => {
    const tags = posts.flatMap(p => p.tags || []);
    return [...new Set(tags)];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [posts, searchTerm, selectedCategory, selectedTag]);

  // Featured post (most recent)
  const featuredPost = posts[0];
  const regularPosts = filteredPosts.slice(selectedCategory || selectedTag || searchTerm ? 0 : 1);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min de leitura`;
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribing(true);
    // Simulate subscription (you can integrate with a real service)
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: 'Inscrito com sucesso!', description: 'Você receberá nossas novidades por email.' });
    setEmail('');
    setSubscribing(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedTag;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground">Blog</span>
          </nav>

          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Blog <span className="text-gradient">Tech</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Artigos, tutoriais e insights sobre desenvolvimento web, mobile e as tendências do mercado digital.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-10 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar artigos..."
                className="pl-11 h-12 rounded-xl bg-secondary/50"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filters */}
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <Filter size={16} className="text-muted-foreground" />
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    !selectedCategory 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  Todos
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      selectedCategory === cat 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredPosts.length} resultado{filteredPosts.length !== 1 ? 's' : ''}
                </span>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-secondary/50" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-secondary/50 rounded w-1/3" />
                    <div className="h-6 bg-secondary/50 rounded w-full" />
                    <div className="h-4 bg-secondary/50 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              {/* Featured Post */}
              {featuredPost && !hasActiveFilters && (
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="group block mb-12"
                >
                  <div className="glass-card rounded-3xl overflow-hidden hover-lift">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="aspect-video lg:aspect-auto lg:h-full overflow-hidden bg-secondary">
                        {featuredPost.cover_image ? (
                          <img
                            src={featuredPost.cover_image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary min-h-[300px]">
                            <TrendingUp className="w-16 h-16 text-primary/50" />
                          </div>
                        )}
                      </div>
                      <div className="p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            Destaque
                          </span>
                          <span className="px-3 py-1 rounded-full bg-secondary text-sm">
                            {featuredPost.category}
                          </span>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {featuredPost.title}
                        </h2>
                        {featuredPost.excerpt && (
                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {featuredPost.author?.name || 'Mobi Creative'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(featuredPost.published_at || featuredPost.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {calculateReadTime(featuredPost.content)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group glass-card rounded-2xl overflow-hidden hover-lift"
                  >
                    <div className="aspect-video overflow-hidden bg-secondary relative">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary">
                          <Tag className="w-12 h-12 text-primary/50" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs">
                          {calculateReadTime(post.content)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                            <User size={12} />
                          </div>
                          <span>{post.author?.name || 'Mobi Creative'}</span>
                        </div>
                        <span className="text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Ler <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && hasActiveFilters && (
                <div className="text-center py-16">
                  <Search size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Tente ajustar os filtros ou buscar por outros termos.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Limpar filtros
                  </Button>
                </div>
              )}

              {/* Tags Cloud */}
              {allTags.length > 0 && (
                <div className="mt-16 p-8 glass-card rounded-2xl">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Tag size={18} className="text-primary" />
                    Tags Populares
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          selectedTag === tag 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary hover:bg-primary/20 hover:text-primary'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Section */}
              <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary to-primary/5 border border-primary/20">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Mail size={28} className="text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Receba novidades por email
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Inscreva-se para receber os melhores artigos sobre tecnologia diretamente no seu email.
                  </p>
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="flex-1 h-12 rounded-xl"
                      required
                    />
                    <Button type="submit" disabled={subscribing} className="h-12 px-6 rounded-xl">
                      {subscribing ? 'Inscrevendo...' : 'Inscrever'}
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-4">
                    Sem spam. Cancele quando quiser.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Nenhum artigo publicado</h2>
              <p className="text-muted-foreground mb-6">
                Em breve publicaremos conteúdos incríveis sobre tecnologia.
              </p>
              <Link to="/">
                <Button variant="outline" className="gap-2">
                  <Home size={16} />
                  Voltar ao Site
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
