'use client';

export function SkillsSection() {
  const skills = [
    { name: 'Python', level: 95 },
    { name: 'PyTorch', level: 90 },
    { name: 'TensorFlow', level: 85 },
    { name: 'Transformers', level: 88 },
    { name: 'Computer Vision', level: 87 },
    { name: 'NLP', level: 85 },
    { name: 'LangChain', level: 82 },
    { name: 'Docker', level: 85 },
    { name: 'AWS', level: 80 },
    { name: 'TypeScript', level: 85 },
    { name: 'Next.js', level: 83 },
    { name: 'MLOps', level: 82 },
  ];

  const tools = [
    'Scikit-learn',
    'OpenAI',
    'Hugging Face',
    'Jupyter',
    'FastAPI',
    'PostgreSQL',
    'MongoDB',
    'Git',
    'Pandas',
    'NumPy',
  ];

  return (
    <section id="skills" className="py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Skills
              </span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${skill.level}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tools & Technologies */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-default"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
