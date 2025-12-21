import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag, ArrowLeft, Home } from 'lucide-react';
import Header from '@/components/mobi/Header';
import Footer from '@/components/mobi/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
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

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          {/* Back to Site */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Voltar ao Site
          </Link>

          {/* Hero */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Artigos sobre <span className="text-gradient">Tecnologia</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Dicas, tutoriais e novidades sobre desenvolvimento web, mobile e as últimas tendências do mercado digital.
            </p>
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <Home size={16} />
                Ir para o Site Principal
              </Button>
            </Link>
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group glass-card rounded-2xl overflow-hidden hover-lift"
                >
                  <div className="aspect-video overflow-hidden bg-secondary">
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
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
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
                        <User size={12} />
                        <span>{post.author?.name || 'Mobi Creative'}</span>
                      </div>
                      <span className="text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Ler mais <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                <Tag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Nenhum artigo ainda</h2>
              <p className="text-muted-foreground">
                Em breve publicaremos conteúdos incríveis sobre tecnologia.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
