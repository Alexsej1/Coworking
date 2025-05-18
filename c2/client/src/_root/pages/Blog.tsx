import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: number;
  title: string;
  short_description: string;
  full_text: string;
  image: string;
  created_at: string;
}

const Blog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Получаем данные блога с сервера
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8800/blog");
        setBlogPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки постов блога:", err);
        setError("Произошла ошибка при загрузке статей блога");
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const openModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const closeModal = () => {
    setIsDialogOpen(false);
    setSelectedPost(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      {/* Заголовок блога */}
      <section className="relative bg-black text-white py-24 md:py-32 overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black-60 to-black-95 z-0"></div>
        <div className="w-full px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6"
            >
              Наш Блог
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 max-w-xl mx-auto"
            >
              Самые свежие новости о коворкингах, советы для фрилансеров и
              многое другое.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Секция с постами блога */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              Последние Статьи
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Узнайте больше о коворкингах и продуктивной работе.
            </p>
          </motion.div>

          {/* Индикатор загрузки */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Сообщение об ошибке */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mb-8"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}

          {/* Карточки статей блога */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-500 text-xs mb-2">
                      {formatDate(post.created_at)}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      {post.short_description}
                    </p>
                    <Button variant="link" onClick={() => openModal(post)}>
                      Читать далее
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Сообщение, если нет постов */}
          {!loading && !error && blogPosts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">Статьи блога пока отсутствуют</p>
            </div>
          )}
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={closeModal}>
        {selectedPost && (
          <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-screen flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl">
                {selectedPost.title}
              </DialogTitle>
              <p className="text-gray-500 text-xs mt-1">
                {formatDate(selectedPost.created_at)}
              </p>
            </DialogHeader>

            <div className="relative mb-4">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-40 md:h-48 object-cover rounded-md"
              />
            </div>

            <div
              className="overflow-y-auto flex-grow pr-2"
              style={{ maxHeight: "calc(80vh - 200px)" }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: selectedPost.full_text }}
                className="prose prose-sm md:prose-base max-w-none"
              />
            </div>

            <DialogFooter className="mt-4 pt-2 border-t border-gray-200">
              <Button onClick={closeModal}>Закрыть</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Blog;
