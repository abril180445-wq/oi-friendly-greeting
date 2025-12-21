import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import Header from '@/components/mobi/Header';
import Footer from '@/components/mobi/Footer';
import { supabase } from '@/integrations/supabase/client';

type BlogPostData = {
  id: string;
  title: string;
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
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
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
        setPost({
          ...data,
          author: (data as any).profiles
        });
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
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
            <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
            <p className="text-muted-foreground mb-8">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Link to="/blog" className="btn-premium">
              <ArrowLeft size={16} />
              Voltar ao Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-32 pb-20">
        <article className="container-custom max-w-4xl">
          {/* Back Link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Voltar ao Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(post.published_at || post.created_at)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-muted-foreground">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                {post.author?.avatar_url ? (
                  <img 
                    src={post.author.avatar_url} 
                    alt={post.author.name || 'Autor'} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={18} className="text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium">{post.author?.name || 'Mobi Creative'}</p>
                <p className="text-sm text-muted-foreground">Autor</p>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-10">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={16} className="text-muted-foreground" />
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
