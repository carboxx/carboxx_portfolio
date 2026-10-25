'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';

const SkillsGraph3DClient = dynamic(
  () => import('./SkillsGraph3DClient').then((mod) => ({ default: mod.SkillsGraph3DClient })),
  {
    ssr: false,
  }
);

const categoryColors = {
  ml: '#8B5CF6',
  backend: '#3B82F6',
  frontend: '#10B981',
  devops: '#F59E0B',
  tools: '#EC4899',
};

export function SkillsGraph3D() {
  return (
    <section id="skills-3d" className="py-32 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950/20 to-gray-950" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                3D Skills Universe
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Explore my technical expertise in an interactive 3D knowledge graph
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Drag to rotate • Scroll to zoom • Hover to highlight
            </p>
          </div>

          <ErrorBoundary>
            <Suspense fallback={
              <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-purple-500/20 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading 3D Skills Graph...</p>
                </div>
              </div>
            }>
              <SkillsGraph3DClient />
            </Suspense>
          </ErrorBoundary>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-gray-300 text-sm capitalize">{category === 'ml' ? 'ML/AI' : category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
