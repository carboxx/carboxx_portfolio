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
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Background color adapts to theme - light gray for light mode, dark for dark mode
    const isDark = document.documentElement.classList.contains('dark');
    const bgColor = isDark ? 0x030712 : 0xf9fafb;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.Fog(bgColor, 8, 20);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
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

    skills.forEach((skill) => {
      // Node sphere - ridotto a 16 segmenti per performance
      const geometry = new THREE.SphereGeometry(0.4, 16, 16);
      const material = new THREE.MeshStandardMaterial({
        color: categoryColors[skill.category],
        emissive: categoryColors[skill.category],
        emissiveIntensity: 0.4,
        metalness: 0.8,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...skill.position);
      mesh.userData = { skill, originalColor: categoryColors[skill.category] };
      scene.add(mesh);
      nodes.push(mesh);

      // Glow effect - meno dettagliato
      const glowGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: categoryColors[skill.category],
        transparent: true,
        opacity: 0.15,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.set(...skill.position);
      scene.add(glow);

      // Text sprite per il nome
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = 512;
      canvas.height = 128;

      context.fillStyle = 'rgba(0, 0, 0, 0)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.font = 'bold 48px Inter, system-ui, sans-serif';
      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(skill.name, 256, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(skill.position[0], skill.position[1] + 0.8, skill.position[2]);
      sprite.scale.set(2, 0.5, 1);
      scene.add(sprite);
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

    // Add particles - ridotte per performance
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 50;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x8B5CF6,
      size: 0.08,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let hoveredNode: THREE.Mesh | null = null;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
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
          (hoveredNode.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.0;
          hoveredNode.scale.set(1.3, 1.3, 1.3);
          document.body.style.cursor = 'pointer';
          setHoveredSkill(hoveredNode.userData.skill.name);
        }
      } else {
        if (hoveredNode) {
          (hoveredNode.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4;
          hoveredNode.scale.set(1, 1, 1);
          hoveredNode = null;
          document.body.style.cursor = 'default';
          setHoveredSkill(null);
        }
      }
    };

    container.addEventListener('mousemove', onMouseMove);

    // Drag to rotate
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationY = 0;
    let rotationX = 0.2;
    let autoRotate = true;
    let autoRotateOffset = 0; // Offset per continuare dalla posizione corrente
    let lastInteractionTime = 0;
    let cameraZ = 12; // Posizione Z della camera per zoom

    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      autoRotate = false;
      lastInteractionTime = Date.now();
      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
      document.body.style.cursor = 'grabbing';
    };

    const onMouseMoveRotate = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - previousMouseX;
      const deltaY = event.clientY - previousMouseY;

      rotationY += deltaX * 0.005;
      rotationX += deltaY * 0.005;

      // Limita rotazione X per non andare troppo sopra/sotto
      rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationX));

      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
      lastInteractionTime = Date.now();
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.style.cursor = 'default';
      lastInteractionTime = Date.now();
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      // Zoom in/out basato sullo scroll
      const zoomSpeed = 0.001;
      cameraZ += event.deltaY * zoomSpeed;

      // Limita lo zoom (min 6, max 20)
      cameraZ = Math.max(6, Math.min(20, cameraZ));

      lastInteractionTime = Date.now();
      autoRotate = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('mousemove', onMouseMoveRotate);
    window.addEventListener('mouseup', onMouseUp);

    // Animation loop - ottimizzato
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Controlla se riattivare auto-rotate dopo 3 secondi di inattività
      const timeSinceLastInteraction = Date.now() - lastInteractionTime;
      if (!isDragging && timeSinceLastInteraction > 3000 && !autoRotate) {
        autoRotate = true;
        autoRotateOffset = rotationY - (elapsed * 0.08); // Salva l'offset per continuare da qui
      }

      // Auto-rotate or manual drag rotation
      if (autoRotate && !isDragging) {
        rotationY = elapsed * 0.08 + autoRotateOffset;
        rotationX = Math.sin(elapsed * 0.03) * 0.15 + 0.2;
      }

      scene.rotation.y = rotationY;
      scene.rotation.x = rotationX;

      // Aggiorna zoom della camera con smooth transition
      camera.position.z += (cameraZ - camera.position.z) * 0.1;

      // Animate particles - più lento
      particles.rotation.y = elapsed * 0.03;

      // Pulse nodes - solo ogni 2 frame per performance
      if (Math.floor(elapsed * 60) % 2 === 0) {
        nodes.forEach((node, i) => {
          const scale = 1 + Math.sin(elapsed * 1.5 + i * 0.5) * 0.08;
          if (node !== hoveredNode) {
            node.scale.set(scale, scale, scale);
          }
        });
      }

      renderer.render(scene, camera);
    };

    sceneRef.current = scene;
    cameraRef.current = camera;
    animate();

    // Piccolo delay prima di mostrare per evitare flash
    setTimeout(() => setIsLoaded(true), 100);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('mousemove', onMouseMoveRotate);
      window.removeEventListener('mouseup', onMouseUp);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
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
                Grafo delle Competenze 3D
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Esplora la mia expertise tecnica in un grafo di conoscenze interattivo
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Clicca e Trascina per ruotare • Scroll per zoom • Hover per evidenziare
            </p>
          </div>

          <div
            ref={containerRef}
            className="w-full h-[600px] rounded-2xl overflow-hidden border border-purple-500/20 bg-gray-900/50 backdrop-blur-sm cursor-grab active:cursor-grabbing"
            style={{ position: 'relative' }}
          >
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Caricamento Grafo 3D...</p>
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

          {hoveredSkill && (
            <div className="mt-6 text-center">
              <div className="inline-block bg-purple-500/20 border border-purple-500/40 rounded-lg px-6 py-3">
                <p className="text-purple-300 text-sm font-medium">Stai guardando:</p>
                <p className="text-white text-xl font-bold">{hoveredSkill}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
