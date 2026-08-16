import React, { useState } from 'react';
import { mockFAQs } from '../../services/mockData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openId, setOpenId] = useState<string>(mockFAQs[0]?.id || '');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 bg-[#F6F7F9] text-[#111111]">
      
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-[#6D5EF6] font-display">Client Support</span>
        <h1 className="font-display text-4xl font-extrabold text-[#111111]">Frequently Asked Questions</h1>
        <p className="text-xs text-[#6B7280]">Everything you need to know about EarCraft Crafted Series, Unisex Series, battery life, ANC, and warranty.</p>
      </div>

      <div className="space-y-4">
        {mockFAQs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden luxury-shadow">
            <button
              onClick={() => setOpenId(openId === faq.id ? '' : faq.id)}
              className="w-full p-6 text-left flex justify-between items-center text-[#111111] hover:text-[#6D5EF6] transition-colors"
            >
              <span className="font-display text-base font-bold flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#6D5EF6] shrink-0" />
                {faq.question}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openId === faq.id ? 'rotate-180 text-[#6D5EF6]' : 'text-[#6B7280]'}`} />
            </button>
            {openId === faq.id && (
              <div className="px-6 pb-6 text-xs text-[#6B7280] leading-relaxed border-t border-[#E5E7EB] pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
