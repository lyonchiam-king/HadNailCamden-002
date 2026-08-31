import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INSTAGRAM_POSTS, SALON_DETAILS } from '../data/salonData';
import { InstagramPost } from '../types';
import { Heart, Instagram, X, Calendar, ExternalLink, Sparkles } from 'lucide-react';

interface InstagramFeedProps {
  onBookStyle: (styleName: string, serviceName: string) => void;
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ onBookStyle }) => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, { liked: boolean; count: number }>>(() => {
    const initial: Record<string, { liked: boolean; count: number }> = {};
    INSTAGRAM_POSTS.forEach(post => {
      initial[post.id] = { liked: false, count: post.likes };
    });
    return initial;
  });

  const handleToggleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => {
      const current = prev[postId];
      if (!current) return prev;
      return {
        ...prev,
        [postId]: {
          liked: !current.liked,
          count: current.liked ? current.count - 1 : current.count + 1
        }
      };
    });
  };

  return (
    <section id="instagram-feed" className="py-12 bg-[#121212] border-b border-[#D400FF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="p-4 border-b border-[#D400FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Instagram className="w-5 h-5 text-[#D400FF]" />
            <h2 className="text-sm sm:text-lg font-black uppercase tracking-[0.2em] text-white italic">
              Fresh Art From Camden
            </h2>
            <span className="text-[10px] text-[#D400FF] font-bold uppercase tracking-widest px-2 py-0.5 border border-[#D400FF] hidden sm:inline">
              @had_nails
            </span>
          </div>

          <a
            href={SALON_DETAILS.instagramUrls[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-4 py-2 bg-[#1E1E1E] text-white border border-[#D400FF]/40 hover:border-[#D400FF] hover:text-[#D400FF] transition-all shadow-[2px_2px_0px_0px_#D400FF]"
          >
            <span>Follow @had_nails</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D400FF]" />
          </a>
        </div>

        {/* Masonry Grid of Instagram Photos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 border-t border-l border-[#D400FF]/20 p-2">
          {INSTAGRAM_POSTS.map((post, idx) => {
            const likeState = likedPosts[post.id] || { liked: false, count: post.likes };
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                onClick={() => setSelectedPost(post)}
                className="group relative cursor-pointer bg-[#1E1E1E] border border-[#D400FF]/20 hover:border-[#D400FF] transition-all focus-visible:ring-1 focus-visible:ring-[#D400FF]"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPost(post); }}
              >
                {/* Image */}
                <div className="aspect-square w-full overflow-hidden bg-[#181818] relative">
                  <img
                    src={post.imageUrl}
                    alt={post.styleName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#D400FF] text-black uppercase tracking-wider">
                        {post.tags[0]}
                      </span>
                      
                      <button
                        onClick={(e) => handleToggleLike(post.id, e)}
                        className="flex items-center gap-1 text-xs font-bold p-1 bg-black/60 border border-white/20 hover:border-[#D400FF]"
                      >
                        <Heart className={`w-3.5 h-3.5 ${likeState.liked ? 'fill-[#D400FF] text-[#D400FF]' : 'text-white'}`} />
                        <span>{likeState.count}</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider line-clamp-2 text-zinc-200">
                        {post.caption}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookStyle(post.styleName, post.serviceRecommended);
                        }}
                        className="w-full bg-[#D400FF] text-black font-black uppercase tracking-tight py-2 text-xs hover:bg-white transition-colors shadow-[2px_2px_0px_0px_#FFFFFF]"
                      >
                        Book This Style
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer caption tag on mobile */}
                <div className="p-2.5 bg-[#1E1E1E] border-t border-[#D400FF]/20 flex items-center justify-between text-[11px] text-[#A0A0A0]">
                  <span className="font-bold text-white uppercase italic truncate max-w-[140px]">{post.styleName}</span>
                  <div className="flex items-center gap-1 text-[#D400FF] font-bold">
                    <Heart className={`w-3 h-3 ${likeState.liked ? 'fill-[#D400FF]' : ''}`} />
                    <span>{likeState.count}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#1E1E1E] border-2 border-[#D400FF] shadow-[8px_8px_0px_0px_rgba(212,0,255,0.4)] p-6 sm:p-8 space-y-6"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 text-[#A0A0A0] hover:text-white bg-[#121212] border border-[#D400FF]/40"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative overflow-hidden bg-[#121212] border border-[#D400FF]/40 aspect-square">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.styleName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {selectedPost.tags.map((t, idx) => (
                      <span key={idx} className="text-[9px] font-bold px-1.5 py-0.5 bg-white text-black uppercase tracking-wider">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#D400FF]/20 pb-3 mb-3">
                      <span className="text-xs font-black text-[#D400FF] uppercase tracking-widest flex items-center gap-1 italic">
                        <Instagram className="w-4 h-4" /> @had_nails
                      </span>
                      
                      <button
                        onClick={(e) => handleToggleLike(selectedPost.id, e)}
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#121212] border border-[#D400FF]/40 text-xs font-bold text-white hover:border-[#D400FF]"
                      >
                        <Heart className={`w-4 h-4 ${likedPosts[selectedPost.id]?.liked ? 'fill-[#D400FF] text-[#D400FF]' : 'text-[#A0A0A0]'}`} />
                        <span>{likedPosts[selectedPost.id]?.count || selectedPost.likes}</span>
                      </button>
                    </div>

                    <h3 className="font-black text-xl text-white italic uppercase">
                      {selectedPost.styleName}
                    </h3>

                    <p className="text-xs text-[#A0A0A0] mt-2 leading-relaxed">
                      "{selectedPost.caption}"
                    </p>
                  </div>

                  <div className="p-3 bg-[#121212] border border-[#D400FF]/20 space-y-1">
                    <span className="text-[10px] text-[#A0A0A0] uppercase font-bold tracking-widest">Recommended Service:</span>
                    <p className="text-xs font-black text-white uppercase italic">{selectedPost.serviceRecommended}</p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const styleName = selectedPost.styleName;
                        const svcName = selectedPost.serviceRecommended;
                        setSelectedPost(null);
                        onBookStyle(styleName, svcName);
                      }}
                      className="w-full bg-[#D400FF] text-black font-black py-3 text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#FFFFFF] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book This Style Now</span>
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
