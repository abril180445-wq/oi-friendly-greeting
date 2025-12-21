import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, User, ArrowLeft, Tag, Clock, Share2, 
  Facebook, Twitter, Linkedin, Copy, Check,
  ChevronRight, BookOpen, ArrowRight
} from 'lucide-react';
import Header from '@/components/mobi/Header';
import Footer from '@/components/mobi/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type BlogPostData = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('article-content');
      if (!article) return;
      
      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = rect.height;
      const scrolled = window.scrollY - articleTop + window.innerHeight * 0.3;
      const progress = Math.min(Math.max((scrolled / articleHeight) * 100, 0), 100);
      setReadProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          content,
          excerpt,
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
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (!error && data) {
        const postData = {
          ...data,
          author: (data as any).profiles
        };
        setPost(postData);
        
        // Fetch related posts
        const { data: related } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            slug,
            excerpt,
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
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(3);

        if (related) {
          setRelatedPosts(related.map((p: any) => ({ ...p, author: p.profiles })));
        }
      }
      setLoading(false);
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || '')}`, '_blank');
  };

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post?.title || '')}`, '_blank');
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: 'Link copiado!' });
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom max-w-4xl">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-secondary/50 rounded w-1/3" />
              <div className="h-12 bg-secondary/50 rounded w-full" />
              <div className="h-64 bg-secondary/50 rounded" />
              <div className="space-y-3">
                <div className="h-4 bg-secondary/50 rounded w-full" />
                <div className="h-4 bg-secondary/50 rounded w-5/6" />
                <div className="h-4 bg-secondary/50 rounded w-4/6" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom max-w-4xl text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
            <p className="text-muted-foreground mb-8">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Link to="/blog">
              <Button className="gap-2">
                <ArrowLeft size={16} />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const readTime = calculateReadTime(post.content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-secondary/30">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <Header />
      
      <main className="pt-32 pb-20">
        <article className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 max-w-4xl mx-auto">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4 flex-wrap">
                <Link 
                  to={`/blog?category=${post.category}`}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {post.category}
                </Link>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(post.published_at || post.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {readTime} min de leitura
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Share */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    {post.author?.avatar_url ? (
                      <img 
                        src={post.author.avatar_url} 
                        alt={post.author.name || 'Autor'} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{post.author?.name || 'Mobi Creative'}</p>
                    <p className="text-sm text-muted-foreground">Autor</p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2 flex items-center gap-1">
                    <Share2 size={14} />
                    Compartilhar:
                  </span>
                  <button
                    onClick={shareOnFacebook}
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                    title="Compartilhar no Facebook"
                  >
                    <Facebook size={16} />
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-black hover:text-white flex items-center justify-center transition-all"
                    title="Compartilhar no Twitter"
                  >
                    <Twitter size={16} />
                  </button>
                  <button
                    onClick={shareOnLinkedin}
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all"
                    title="Compartilhar no LinkedIn"
                  >
                    <Linkedin size={16} />
                  </button>
                  <button
                    onClick={copyLink}
                    className="w-9 h-9 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all"
                    title="Copiar link"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {post.cover_image && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div 
              id="article-content"
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag size={18} className="text-muted-foreground" />
                  {post.tags.map((tag, idx) => (
                    <Link
                      key={idx}
                      to={`/blog?tag=${tag}`}
                      className="px-4 py-1.5 rounded-full bg-secondary hover:bg-primary/20 hover:text-primary text-sm transition-all"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 p-6 md:p-8 glass-card rounded-2xl">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  {post.author?.avatar_url ? (
                    <img 
                      src={post.author.avatar_url} 
                      alt={post.author.name || 'Autor'} 
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <User size={32} className="text-primary-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Escrito por</p>
                  <h3 className="text-xl font-bold mb-2">{post.author?.name || 'Mobi Creative'}</h3>
                  <p className="text-muted-foreground">
                    Especialista em desenvolvimento web e mobile. Apaixonado por criar soluções 
                    digitais que transformam negócios e melhoram a vida das pessoas.
                  </p>
                </div>
              </div>
            </div>

            {/* Share CTA */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
              <h3 className="text-xl font-bold mb-2">Gostou do artigo?</h3>
              <p className="text-muted-foreground mb-4">
                Compartilhe com seus amigos e colegas!
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={shareOnFacebook}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={18} />
                  Facebook
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="px-4 py-2 rounded-lg bg-black text-white flex items-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  <Twitter size={18} />
                  Twitter
                </button>
                <button
                  onClick={shareOnLinkedin}
                  className="px-4 py-2 rounded-lg bg-blue-700 text-white flex items-center gap-2 hover:bg-blue-800 transition-colors"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Artigos Relacionados</h2>
                <Link to="/blog" className="text-primary hover:underline flex items-center gap-1">
                  Ver todos <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group glass-card rounded-2xl overflow-hidden hover-lift"
                  >
                    <div className="aspect-video overflow-hidden bg-secondary">
                      {relatedPost.cover_image ? (
                        <img
                          src={relatedPost.cover_image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary">
                          <Tag className="w-10 h-10 text-primary/50" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-primary mb-2 block">{relatedPost.category}</span>
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-16 text-center">
            <Link to="/blog">
              <Button variant="outline" size="lg" className="gap-2">
                <ArrowLeft size={18} />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
