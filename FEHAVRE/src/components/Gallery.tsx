import { useState } from 'react';
import { galleryImages } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface Comment {
  text: string;
  date: string;
}

interface GalleryProps {
  masonry?: boolean;
}

export default function Gallery({ masonry = false }: GalleryProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentText, setCommentText] = useState('');

  const handleOpen = (img: string) => setSelected(img);
  const handleClose = () => setSelected(null);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !commentText.trim()) return;
    setComments(prev => ({
      ...prev,
      [selected]: [
        { text: commentText, date: new Date().toLocaleString() },
        ...(prev[selected] || []),
      ],
    }));
    setCommentText('');
  };

  // For masonry, randomize image heights and column spans
  const getMasonryClass = (idx: number) => {
    const mod = idx % 8;
    if (mod === 0) return 'row-span-2 col-span-2';
    if (mod === 1) return 'row-span-1 col-span-1';
    if (mod === 2) return 'row-span-2 col-span-1';
    if (mod === 3) return 'row-span-1 col-span-2';
    if (mod === 4) return 'row-span-1 col-span-1';
    if (mod === 5) return 'row-span-2 col-span-1';
    if (mod === 6) return 'row-span-1 col-span-2';
    return 'row-span-1 col-span-1';
  };

  return (
    <section className="py-16">
      <div className="container-responsive mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-black text-center mb-10 text-amber-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Bakery Gallery
        </motion.h2>
        <motion.div
          className={masonry
            ? "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-5 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px]"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img}
              className={
                "rounded-xl overflow-hidden shadow-lg cursor-pointer group relative transition-all duration-300 " +
                (masonry ? getMasonryClass(idx) : "")
              }
              whileHover={{ scale: 1.06, zIndex: 2 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              onClick={() => handleOpen(img)}
              style={masonry ? { boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' } : {}}
            >
              <img
                src={img}
                alt={`Bakery Gallery ${idx + 1}`}
                className={masonry
                  ? "w-full h-full object-cover object-center group-hover:brightness-90 transition duration-300 min-h-[120px] max-h-[320px]"
                  : "w-full h-40 sm:h-48 md:h-56 object-cover object-center group-hover:brightness-90 transition duration-300"}
                loading="lazy"
                style={masonry ? { aspectRatio: '1/1', height: '100%' } : {}}
              />
              <div className="absolute bottom-2 right-2 bg-white/80 text-xs px-2 py-1 rounded-full shadow font-semibold text-amber-900 opacity-0 group-hover:opacity-100 transition">Comment</div>
            </motion.div>
          ))}
        </motion.div>
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative"
                initial={{ scale: 0.9, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 40 }}
                transition={{ type: 'spring', duration: 0.4 }}
              >
                <Button size="icon" variant="ghost" className="absolute top-3 right-3" onClick={handleClose}>
                  <X className="w-6 h-6" />
                </Button>
                <img src={selected} alt="Large view" className="w-full h-64 object-cover rounded-xl mb-4" />
                <h3 className="text-lg font-bold mb-2 text-amber-900">Comments</h3>
                <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    className="flex-1 border rounded-full px-4 py-2 focus:ring-2 focus:ring-amber-400"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                  />
                  <Button type="submit" className="bg-amber-600 text-white rounded-full px-6">Post</Button>
                </form>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {(comments[selected] || []).length === 0 ? (
                    <div className="text-gray-400 text-sm">No comments yet.</div>
                  ) : (
                    comments[selected].map((c, i) => (
                      <motion.div
                        key={i}
                        className="bg-amber-50 rounded-lg px-3 py-2 text-sm text-amber-900 shadow"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <div>{c.text}</div>
                        <div className="text-xs text-gray-400 mt-1">{c.date}</div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 