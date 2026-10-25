'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Skill {
  id: string;
  name: string;
  category: 'ml' | 'backend' | 'frontend' | 'devops' | 'tools';
  position: [number, number, number];
}

const categoryColors = {
  ml: 0x8B5CF6,
  backend: 0x3B82F6,
  frontend: 0x10B981,
  devops: 0xF59E0B,
  tools: 0xEC4899,
};

const skills: Skill[] = [
  // ML/AI Core - Center cluster
  { id: 's1', name: 'Python', category: 'ml', position: [0, 0, 0] },
  { id: 's2', name: 'TensorFlow', category: 'ml', position: [-2, 1, -1] },
  { id: 's3', name: 'PyTorch', category: 'ml', position: [2, 1, 1] },
  { id: 's4', name: 'Scikit-learn', category: 'ml', position: [-1, -1, 2] },
  { id: 's5', name: 'Transformers', category: 'ml', position: [1, 2, -2] },
  { id: 's6', name: 'LangChain', category: 'ml', position: [0, -2, -1] },

  // Backend - Right cluster
  { id: 's7', name: 'Node.js', category: 'backend', position: [4, 0, 0] },
  { id: 's8', name: 'FastAPI', category: 'backend', position: [5, 1, -1] },
  { id: 's9', name: 'PostgreSQL', category: 'backend', position: [4, -1, 1] },
  { id: 's10', name: 'MongoDB', category: 'backend', position: [3, 1, 2] },
  { id: 's11', name: 'Redis', category: 'backend', position: [5, -1, -2] },

  // Frontend - Left cluster
  { id: 's12', name: 'React', category: 'frontend', position: [-4, 0, 0] },
  { id: 's13', name: 'Next.js', category: 'frontend', position: [-5, 1, 1] },
  { id: 's14', name: 'TypeScript', category: 'frontend', position: [-4, -1, -1] },
  { id: 's15', name: 'Tailwind', category: 'frontend', position: [-3, 1, -2] },
  { id: 's16', name: 'Three.js', category: 'frontend', position: [-5, -1, 2] },

  // DevOps - Top cluster
  { id: 's17', name: 'Docker', category: 'devops', position: [0, 4, 0] },
  { id: 's18', name: 'AWS', category: 'devops', position: [-1, 5, 1] },
  { id: 's19', name: 'CI/CD', category: 'devops', position: [1, 4, -1] },

  // Tools - Bottom cluster
  { id: 's20', name: 'Git', category: 'tools', position: [0, -4, 0] },
  { id: 's21', name: 'Linux', category: 'tools', position: [-1, -5, -1] },
  { id: 's22', name: 'VSCode', category: 'tools', position: [1, -4, 1] },
];

export function SkillsGraph3DPure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030712);
    scene.fog = new THREE.Fog(0x030712, 8, 20);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x8B5CF6, 2, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3B82F6, 1.5, 20);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Create skill nodes
    const nodes: THREE.Mesh[] = [];
    const labels: HTMLDivElement[] = [];

    skills.forEach((skill) => {
      // Node sphere
      const geometry = new THREE.SphereGeometry(0.4, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: categoryColors[skill.category],
        emissive: categoryColors[skill.category],
        emissiveIntensity: 0.3,
        metalness: 0.8,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...skill.position);
      mesh.userData = { skill, originalColor: categoryColors[skill.category] };
      scene.add(mesh);
      nodes.push(mesh);

      // Glow effect
      const glowGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: categoryColors[skill.category],
        transparent: true,
        opacity: 0.2,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.set(...skill.position);
      scene.add(glow);
    });

    // Create connections between related skills
    const connections: [number, number][] = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], // Python connections
      [6, 7], [6, 8], [7, 8], [8, 9], [8, 10], // Backend connections
      [11, 12], [11, 13], [12, 13], [13, 14], [14, 15], // Frontend connections
      [16, 17], [16, 18], [17, 18], // DevOps connections
      [19, 20], [19, 21], [20, 21], // Tools connections
      [0, 6], [0, 11], [6, 11], // Cross-category connections
    ];

    connections.forEach(([i, j]) => {
      const points = [
        new THREE.Vector3(...skills[i].position),
        new THREE.Vector3(...skills[j].position),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x4B5563,
        transparent: true,
        opacity: 0.2,
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    });

    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x8B5CF6,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let hoveredNode: THREE.Mesh | null = null;

    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes);

      if (intersects.length > 0) {
        const intersected = intersects[0].object as THREE.Mesh;
        if (hoveredNode !== intersected) {
          // Reset previous
          if (hoveredNode) {
            (hoveredNode.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3;
            hoveredNode.scale.set(1, 1, 1);
          }
          // Highlight new
          hoveredNode = intersected;
          (hoveredNode.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8;
          hoveredNode.scale.set(1.5, 1.5, 1.5);
          document.body.style.cursor = 'pointer';
        }
      } else {
        if (hoveredNode) {
          (hoveredNode.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3;
          hoveredNode.scale.set(1, 1, 1);
          hoveredNode = null;
          document.body.style.cursor = 'default';
        }
      }
    };

    containerRef.current.addEventListener('mousemove', onMouseMove);

    // Auto-rotation
    let autoRotate = true;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMoveRotate = (event: MouseEvent) => {
      if (!containerRef.current) return;
      autoRotate = false;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotationY = mouseX * 0.5;
      targetRotationX = mouseY * 0.5;
    };

    const onMouseLeave = () => {
      autoRotate = true;
    };

    containerRef.current.addEventListener('mousemove', onMouseMoveRotate);
    containerRef.current.addEventListener('mouseleave', onMouseLeave);

    // Animation loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Auto-rotate or follow mouse
      if (autoRotate) {
        scene.rotation.y = elapsed * 0.1;
        scene.rotation.x = Math.sin(elapsed * 0.05) * 0.2;
      } else {
        scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.05;
        scene.rotation.x += (targetRotationX - scene.rotation.x) * 0.05;
      }

      // Animate particles
      particles.rotation.y = elapsed * 0.05;

      // Pulse nodes
      nodes.forEach((node, i) => {
        const scale = 1 + Math.sin(elapsed * 2 + i * 0.5) * 0.1;
        if (node !== hoveredNode) {
          node.scale.set(scale, scale, scale);
        }
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeEventListener('mousemove', onMouseMove);
        containerRef.current.removeEventListener('mousemove', onMouseMoveRotate);
        containerRef.current.removeEventListener('mouseleave', onMouseLeave);
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      document.body.style.cursor = 'default';
    };
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      rendererRef.current.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
              Drag to rotate • Hover to highlight • Auto-rotating visualization
            </p>
          </div>

          <div
            ref={containerRef}
            className="w-full h-[600px] rounded-2xl overflow-hidden border border-purple-500/20 bg-gray-900/50 backdrop-blur-sm"
            style={{ position: 'relative' }}
          >
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading 3D Skills Graph...</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: `#${color.toString(16).padStart(6, '0')}` }}
                />
                <span className="text-gray-300 text-sm capitalize">
                  {category === 'ml' ? 'ML/AI' : category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
