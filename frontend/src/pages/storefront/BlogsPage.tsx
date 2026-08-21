import React from 'react';
import { Link } from 'react-router-dom';
import { mockBlogs } from '../../services/mockData';
import { ArrowRight, Clock, User } from 'lucide-react';

export const BlogsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#F6F7F9] text-[#111111]">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">Audio Science & Design</span>
        <h1 className="font-display text-4xl font-extrabold text-[#111111]">EarCraft Acoustic Journal</h1>
        <p className="text-xs text-[#6B7280]">Insights into graphene drivers, LDAC lossless codecs, and product design.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockBlogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] luxury-shadow-hover group">
            <div className="h-64 overflow-hidden relative">
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-display">
                {blog.category}
              </span>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#6D5EF6]" /> {blog.author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#6D5EF6]" /> {blog.read_time_minutes} min read</span>
              </div>
              <h2 className="font-display text-xl font-bold text-[#111111] group-hover:text-[#6D5EF6] transition-colors">
                {blog.title}
              </h2>
              <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">{blog.excerpt}</p>
              <Link
                to={`/blogs/${blog.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6D5EF6] hover:underline pt-2 font-display"
              >
                Read Full Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
