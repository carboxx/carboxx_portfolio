'use client';

import { useState } from 'react';

const skills = [
  // ML/AI Core - Center cluster
  { id: 'pytorch', name: 'PyTorch', category: 'ml', x: 50, y: 30, z: 0 },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ml', x: 60, y: 35, z: -20 },
  { id: 'cv', name: 'Computer Vision', category: 'ml', x: 55, y: 25, z: 10 },
  { id: 'nlp', name: 'NLP', category: 'ml', x: 45, y: 35, z: -10 },
  { id: 'transformers', name: 'Transformers', category: 'ml', x: 40, y: 30, z: 15 },
  { id: 'llm', name: 'LLMs', category: 'ml', x: 50, y: 40, z: 20 },

  // Backend - Left side
  { id: 'python', name: 'Python', category: 'backend', x: 25, y: 50, z: -15 },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', x: 20, y: 45, z: 5 },
  { id: 'django', name: 'Django', category: 'backend', x: 30, y: 55, z: -5 },
  { id: 'nodejs', name: 'Node.js', category: 'backend', x: 25, y: 60, z: 10 },

  // Frontend - Right side
  { id: 'react', name: 'React', category: 'frontend', x: 75, y: 50, z: -10 },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', x: 80, y: 45, z: 15 },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', x: 70, y: 55, z: 5 },

  // DevOps - Bottom
  { id: 'docker', name: 'Docker', category: 'devops', x: 50, y: 70, z: -20 },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', x: 55, y: 75, z: 0 },
  { id: 'aws', name: 'AWS', category: 'devops', x: 45, y: 75, z: 10 },

  // Tools - Scattered
  { id: 'git', name: 'Git', category: 'tools', x: 35, y: 65, z: -25 },
  { id: 'postgresql', name: 'PostgreSQL', category: 'tools', x: 65, y: 65, z: 20 },
  { id: 'mongodb', name: 'MongoDB', category: 'tools', x: 70, y: 70, z: -15 },
];

const categoryColors = {
  ml: { bg: 'bg-purple-500', glow: 'shadow-purple-500/50', border: 'border-purple-400' },
  backend: { bg: 'bg-blue-500', glow: 'shadow-blue-500/50', border: 'border-blue-400' },
  frontend: { bg: 'bg-green-500', glow: 'shadow-green-500/50', border: 'border-green-400' },
  devops: { bg: 'bg-orange-500', glow: 'shadow-orange-500/50', border: 'border-orange-400' },
  tools: { bg: 'bg-pink-500', glow: 'shadow-pink-500/50', border: 'border-pink-400' },
};

export function SkillsGraphCSS() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [rotateX, setRotateX] = useState(20);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotY = ((x - centerX) / centerX) * 15;
    const rotX = ((centerY - y) / centerY) * 15 + 20;

    setRotateY(rotY);
    setRotateX(rotX);
  };

  return (
    <section id="skills-3d" className="py-32 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950/20 to-gray-950" />

      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Skills Universe
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Interactive visualization of my technical expertise
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Move your mouse to explore • Hover to highlight
            </p>
          </div>

          {/* 3D Scene Container */}
          <div
            className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-purple-500/20 bg-gray-900/50 backdrop-blur-sm perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setRotateX(20); setRotateY(0); }}
          >
            {/* 3D Space */}
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              }}
            >
              {/* Skills Nodes */}
              {skills.map((skill) => {
                const colors = categoryColors[skill.category];
                const isHovered = hoveredId === skill.id;

                return (
                  <div
                    key={skill.id}
                    className="absolute transition-all duration-300"
                    style={{
                      left: `${skill.x}%`,
                      top: `${skill.y}%`,
                      transform: `translateZ(${skill.z}px) ${isHovered ? 'scale(1.3)' : 'scale(1)'}`,
                      transformStyle: 'preserve-3d',
                    }}
                    onMouseEnter={() => setHoveredId(skill.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Glow effect */}
                    {isHovered && (
                      <div
                        className={`absolute inset-0 ${colors.bg} opacity-50 blur-xl rounded-full animate-pulse`}
                        style={{ transform: 'scale(2)' }}
                      />
                    )}

                    {/* Node */}
                    <div
                      className={`
                        relative w-20 h-20 ${colors.bg} rounded-full
                        flex items-center justify-center
                        border-2 ${colors.border}
                        shadow-lg ${isHovered ? colors.glow + ' shadow-2xl' : ''}
                        cursor-pointer
                        transition-all duration-300
                      `}
                      style={{
                        boxShadow: isHovered ? `0 0 30px ${skill.category === 'ml' ? '#8B5CF6' : skill.category === 'backend' ? '#3B82F6' : skill.category === 'frontend' ? '#10B981' : skill.category === 'devops' ? '#F59E0B' : '#EC4899'}` : '',
                      }}
                    >
                      <div className="text-white font-bold text-xs text-center px-2 leading-tight">
                        {skill.name}
                      </div>
                    </div>

                    {/* Connection lines (simple version) */}
                    {isHovered && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div className={`w-32 h-32 border-2 ${colors.border} rounded-full opacity-30 animate-ping`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Center point indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full" />
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {Object.entries(categoryColors).map(([category, colors]) => (
              <div key={category} className="flex items-center gap-2">
                <div className={`w-4 h-4 ${colors.bg} rounded-full`} />
                <span className="text-gray-300 text-sm capitalize">
                  {category === 'ml' ? 'ML/AI' : category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
