import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white py-16 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Title */}
        <div className="border-b border-[#222222] pb-6">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider uppercase text-white">
            ABOUT EARCRAFT
          </h1>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Philosophy */}
          <div className="bg-[#111111] border border-[#222222] p-8 sm:p-10 rounded-none flex flex-col justify-start space-y-6">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-widest uppercase text-center text-white">
              PHILISOPHY
            </h2>
            <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed text-center font-normal">
              In a world cluttered with utilitarian tech, we believe your audio experience should be as expressive as your outfit. At <span className="font-bold text-white">earcraft</span>, we challenged the status quo: Why should earbuds be hidden in a pocket or treated as mere plastic tools?
            </p>
          </div>

          {/* Card 2: Redefining The Ear */}
          <div className="bg-[#111111] border border-[#222222] p-8 sm:p-10 rounded-none flex flex-col justify-start space-y-6">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-widest uppercase text-center text-white">
              REDEFINING THE EAR
            </h2>
            <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed text-center font-normal">
              Our design process starts where technology ends. Each pair is meticulously engineered to deliver crisp, immersive sound, while our signature decorative attachments ensure they look like pieces of jewelry. Whether you are at a boardroom meeting, a high-fashion event, or a casual coffee date, <span className="font-bold text-white">earcraft</span> ensures your tech complements your look rather than distracting from it.
            </p>
          </div>

          {/* Card 3: Join The Movement */}
          <div className="bg-[#111111] border border-[#222222] p-8 sm:p-10 rounded-none flex flex-col justify-start space-y-6">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-widest uppercase text-center text-white">
              JOIN THE MOVEMENT
            </h2>
            <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed text-center font-normal">
              We are for the trendsetters, the detail-oriented, and the audio enthusiasts who refuse to compromise. We are <span className="font-bold text-white">earcraft</span>—where every beat is a fashion statement.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AboutPage;
