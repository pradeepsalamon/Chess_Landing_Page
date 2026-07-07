import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ChessSceneProps {
  scrollProgress: number; // Value from 0.0 to 1.0 representing total page scroll
}

export default function ChessScene({ scrollProgress }: ChessSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const piecesGroupRef = useRef<THREE.Group | null>(null);
  const boardGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  
  const whiteMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const blackMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const gridLinesRef = useRef<THREE.LineSegments | null>(null);

  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2('#030303', 0.04);

    // 2. Setup Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    cameraRef.current = camera;
    camera.position.set(12, 10, 12);
    scene.add(camera);

    // 3. Setup WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // 4. Setup Lighting
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.15);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight('#fff5ea', 1.8);
    dirLight.position.set(15, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    const spotLight = new THREE.SpotLight('#f59e0b', 8, 15, Math.PI / 6, 0.5, 1);
    spotLight.position.set(0, 8, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);
    spotLightRef.current = spotLight;

    const pointLight = new THREE.PointLight('#10b981', 0, 20);
    pointLight.position.set(0, 4, 0);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // 5. Materials
    const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xf4f4f5, roughness: 0.15, metalness: 0.1 });
    whiteMaterialRef.current = whiteMaterial;

    const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x111116, roughness: 0.2, metalness: 0.7 });
    blackMaterialRef.current = blackMaterial;

    const boardLightMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.2 });
    const boardDarkMaterial = new THREE.MeshStandardMaterial({ color: 0x1e1e24, roughness: 0.3, metalness: 0.4 });

    // 6. Procedural Staunton Chess Piece Geometry Creators
    const createPieceGeometry = (type: string) => {
      const group = new THREE.Group();
      const baseGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.12, 16);
      const baseMesh = new THREE.Mesh(baseGeo, new THREE.MeshBasicMaterial());
      baseMesh.position.y = 0.06;
      group.add(baseMesh);

      const ringGeo = new THREE.CylinderGeometry(0.3, 0.4, 0.08, 16);
      const ringMesh = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial());
      ringMesh.position.y = 0.15;
      group.add(ringMesh);

      const stemGeo = new THREE.CylinderGeometry(0.18, 0.28, 0.6, 16);
      const stemMesh = new THREE.Mesh(stemGeo, new THREE.MeshBasicMaterial());
      stemMesh.position.y = 0.45;
      group.add(stemMesh);

      if (type === 'pawn') {
        const headGeo = new THREE.SphereGeometry(0.24, 16, 16);
        const headMesh = new THREE.Mesh(headGeo, new THREE.MeshBasicMaterial());
        headMesh.position.y = 0.85;
        group.add(headMesh);
      } else if (type === 'rook') {
        const headGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.35, 16);
        const headMesh = new THREE.Mesh(headGeo, new THREE.MeshBasicMaterial());
        headMesh.position.y = 0.85;
        group.add(headMesh);
      } else if (type === 'knight') {
        const headGeo = new THREE.BoxGeometry(0.24, 0.45, 0.4);
        const headMesh = new THREE.Mesh(headGeo, new THREE.MeshBasicMaterial());
        headMesh.position.set(0, 0.85, 0.05);
        group.add(headMesh);
      } else if (type === 'bishop') {
        const headGeo = new THREE.SphereGeometry(0.22, 16, 16);
        headGeo.scale(1, 1.4, 1);
        const headMesh = new THREE.Mesh(headGeo, new THREE.MeshBasicMaterial());
        headMesh.position.y = 0.85;
        group.add(headMesh);
      } else if (type === 'queen') {
        const headGeo = new THREE.CylinderGeometry(0.2, 0.3, 0.35, 16);
        const headMesh = new THREE.Mesh(headGeo, new THREE.MeshBasicMaterial());
        headMesh.position.y = 0.85;
        group.add(headMesh);
      } else if (type === 'king') {
        const crownGeo = new THREE.CylinderGeometry(0.3, 0.22, 0.4, 16);
        const crownMesh = new THREE.Mesh(crownGeo, new THREE.MeshBasicMaterial());
        crownMesh.position.y = 1.1;
        group.add(crownMesh);
      }
      return group;
    };

    // 7. Setup Chessboard Group
    const boardGroup = new THREE.Group();
    boardGroupRef.current = boardGroup;
    scene.add(boardGroup);

    const tileSize = 1.5;
    const boardSize = tileSize * 8;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const isLight = (r + c) % 2 === 0;
        const tileMesh = new THREE.Mesh(
          new THREE.BoxGeometry(tileSize, 0.2, tileSize),
          isLight ? boardLightMaterial : boardDarkMaterial
        );
        tileMesh.position.set((c - 3.5) * tileSize, -0.1, (r - 3.5) * tileSize);
        tileMesh.receiveShadow = true;
        boardGroup.add(tileMesh);
      }
    }

    const gridEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(boardSize, 0.01, boardSize));
    const gridLines = new THREE.LineSegments(gridEdges, new THREE.LineBasicMaterial({ color: '#10b981', transparent: true, opacity: 0 }));
    gridLines.position.y = 0.01;
    boardGroup.add(gridLines);
    gridLinesRef.current = gridLines;

    // 8. Populate Pieces Group
    const piecesGroup = new THREE.Group();
    piecesGroupRef.current = piecesGroup;
    scene.add(piecesGroup);

    const layout: ('rook' | 'knight' | 'bishop' | 'queen' | 'king' | 'bishop' | 'knight' | 'rook')[] = [
      'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'
    ];

    const instantiatePiece = (type: string, color: 'white' | 'black', r: number, c: number) => {
      const basePiece = createPieceGeometry(type);
      const mat = color === 'white' ? whiteMaterial : blackMaterial;
      basePiece.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = mat;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      const x = (c - 3.5) * tileSize;
      const z = (r - 3.5) * tileSize;
      basePiece.position.set(x, 0, z);
      if (color === 'black') basePiece.rotation.y = Math.PI;

      basePiece.userData = {
        type, color, row: r, col: c, homeX: x, homeY: 0, homeZ: z,
        explodeOffset: new THREE.Vector3((c - 3.5) * 2, 2 + Math.random() * 6, (r - 3.5) * 2).normalize().multiplyScalar(5 + Math.random() * 10),
        explodeRot: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      };
      piecesGroup.add(basePiece);
    };

    for (let c = 0; c < 8; c++) {
      instantiatePiece(layout[c], 'white', 0, c);
      instantiatePiece(layout[c], 'black', 7, c);
    }
    for (let c = 0; c < 8; c++) {
      instantiatePiece('pawn', 'white', 1, c);
      instantiatePiece('pawn', 'black', 6, c);
    }

    // 9. Floating Atmosphere Particles
    const particleCount = 150;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = Math.random() * 15;
      positions[i + 2] = (Math.random() - 0.5) * 30;
      velocities[i + 1] = Math.random() * 0.01 + 0.005;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: '#f59e0b', size: 0.12, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const particles = new THREE.Points(particleGeo, pMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (boardGroupRef.current) {
        boardGroupRef.current.position.y = Math.sin(time * 0.5) * 0.05;
        boardGroupRef.current.rotation.y = Math.sin(time * 0.1) * 0.01;
      }

      if (particlesRef.current) {
        const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          posAttr.array[idx + 1] += velocities[idx + 1];
          if (posAttr.array[idx + 1] > 12) posAttr.array[idx + 1] = 0;
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      whiteMaterial.dispose();
      blackMaterial.dispose();
      pMaterial.dispose();
    };
  }, []);

  // 10. Scroll Story Keyframing System
  useEffect(() => {
    const camera = cameraRef.current;
    const piecesGroup = piecesGroupRef.current;
    const boardGroup = boardGroupRef.current;
    const whiteMaterial = whiteMaterialRef.current;
    const blackMaterial = blackMaterialRef.current;
    const gridLines = gridLinesRef.current;
    const spotLight = spotLightRef.current;
    const pointLight = pointLightRef.current;
    const dirLight = dirLightRef.current;

    if (!camera || !piecesGroup || !boardGroup || !whiteMaterial || !blackMaterial) return;

    const p = scrollProgress;
    const camPos = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();
    let boardRotX = 0;
    let boardRotY = 0;
    let explosionFactor = 0;
    let digitalGridFactor = 0;
    let spotLightIntensity = 8;
    let pointLightIntensity = 0;
    let dirLightIntensity = 1.8;

    if (p < 0.12) {
      const u = p / 0.12;
      const angle = u * 0.4;
      camPos.set(11 * Math.cos(angle) + 2 * Math.sin(angle), 8 + (1 - u) * 2, 11 * Math.sin(angle) + 2 * Math.cos(angle));
      lookTarget.set(0, 0, 0);
      dirLightIntensity = 1.8;
      spotLightIntensity = 4;
    } else if (p < 0.25) {
      const u = (p - 0.12) / 0.13;
      const startPos = new THREE.Vector3(11 * Math.cos(0.4) + 2 * Math.sin(0.4), 8, 11 * Math.sin(0.4) + 2 * Math.cos(0.4));
      const endPos = new THREE.Vector3(0.5, 1.8, 2.5);
      camPos.lerpVectors(startPos, endPos, u);
      lookTarget.lerpVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.7, 0), u);
      spotLightIntensity = 4 + u * 12;
      dirLightIntensity = 1.8 - u * 1.0;
    } else if (p < 0.38) {
      const u = (p - 0.25) / 0.13;
      const startPos = new THREE.Vector3(0.5, 1.8, 2.5);
      const endPos = new THREE.Vector3(-6, 5, 8);
      camPos.lerpVectors(startPos, endPos, u);
      lookTarget.lerpVectors(new THREE.Vector3(0, 0.7, 0), new THREE.Vector3(0, 0, 0), u);
      spotLightIntensity = 16 - u * 12;
      dirLightIntensity = 0.8 + u * 0.8;
    } else if (p < 0.52) {
      const u = (p - 0.38) / 0.14;
      camPos.lerpVectors(new THREE.Vector3(-6, 5, 8), new THREE.Vector3(0.1, 14, 0.2), u);
      lookTarget.set(0, 0, 0);
      digitalGridFactor = u;
      pointLightIntensity = u * 15;
      dirLightIntensity = 1.6 * (1 - u) + 0.1;
      spotLightIntensity = 2 * (1 - u);
    } else if (p < 0.68) {
      const u = (p - 0.52) / 0.16;
      camPos.lerpVectors(new THREE.Vector3(0.1, 14, 0.2), new THREE.Vector3(9, 7, -9), u);
      lookTarget.lerpVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1.5, 0), u);
      explosionFactor = u;
      digitalGridFactor = 1 - u * 0.4;
      pointLightIntensity = 15 + u * 10;
      dirLightIntensity = 0.1 + u * 1.5;
      boardRotX = u * 0.25;
      boardRotY = u * 0.4;
    } else if (p < 0.82) {
      const u = (p - 0.68) / 0.14;
      camPos.lerpVectors(new THREE.Vector3(9, 7, -9), new THREE.Vector3(-7, 6, -8), u);
      lookTarget.lerpVectors(new THREE.Vector3(0, 1.5, 0), new THREE.Vector3(0, 0.5, 0), u);
      explosionFactor = 1.0 - u * 0.45;
      digitalGridFactor = 0.6 - u * 0.6;
      pointLightIntensity = 25 - u * 20;
      dirLightIntensity = 1.6;
      boardRotX = 0.25 * (1 - u);
      boardRotY = 0.4 - u * 0.2;
    } else if (p < 0.92) {
      const u = (p - 0.82) / 0.10;
      camPos.lerpVectors(new THREE.Vector3(-7, 6, -8), new THREE.Vector3(0, 2.5, 5.5), u);
      lookTarget.lerpVectors(new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(0, 0.6, 0), u);
      explosionFactor = 0.55 * (1 - u);
      dirLightIntensity = 1.6;
      spotLightIntensity = u * 8;
    } else {
      const u = (p - 0.92) / 0.08;
      camPos.lerpVectors(new THREE.Vector3(0, 2.5, 5.5), new THREE.Vector3(0.1, 13, 0.2), u);
      lookTarget.set(0, 0, 0);
      explosionFactor = u * 1.5;
      spotLightIntensity = 8 + u * 20;
      dirLightIntensity = 1.6 * (1 - u);
      pointLightIntensity = u * 30;
    }

    camera.position.copy(camPos);
    camera.lookAt(lookTarget);

    boardGroup.rotation.x = boardRotX;
    boardGroup.rotation.y = boardRotY;

    if (gridLines) {
      const mat = gridLines.material as THREE.LineBasicMaterial;
      mat.opacity = digitalGridFactor * 0.8;
    }

    if (spotLight) spotLight.intensity = spotLightIntensity;
    if (pointLight) pointLight.intensity = pointLightIntensity;
    if (dirLight) dirLight.intensity = dirLightIntensity;

    if (digitalGridFactor > 0.01) {
      whiteMaterial.color.setHSL(0.1 + digitalGridFactor * 0.02, 0.9, 0.5 + digitalGridFactor * 0.1);
      whiteMaterial.emissive.setHex(0xf59e0b);
      whiteMaterial.emissiveIntensity = digitalGridFactor * 1.4;
      whiteMaterial.transparent = true;
      whiteMaterial.opacity = 1.0 - digitalGridFactor * 0.4;
      whiteMaterial.roughness = 0.15 + digitalGridFactor * 0.15;
      whiteMaterial.metalness = 0.1 + digitalGridFactor * 0.6;

      blackMaterial.color.setHSL(0.42, 0.8, 0.1 + digitalGridFactor * 0.2);
      blackMaterial.emissive.setHex(0x10b981);
      blackMaterial.emissiveIntensity = digitalGridFactor * 1.4;
      blackMaterial.transparent = true;
      blackMaterial.opacity = 1.0 - digitalGridFactor * 0.4;
      blackMaterial.roughness = 0.2 + digitalGridFactor * 0.1;
      blackMaterial.metalness = 0.7 - digitalGridFactor * 0.5;
    } else {
      whiteMaterial.color.setHex(0xf4f4f5);
      whiteMaterial.emissive.setHex(0x000000);
      whiteMaterial.emissiveIntensity = 0;
      whiteMaterial.transparent = false;
      whiteMaterial.opacity = 1.0;
      whiteMaterial.roughness = 0.15;
      whiteMaterial.metalness = 0.1;

      blackMaterial.color.setHex(0x111116);
      blackMaterial.emissive.setHex(0x000000);
      blackMaterial.emissiveIntensity = 0;
      blackMaterial.transparent = false;
      blackMaterial.opacity = 1.0;
      blackMaterial.roughness = 0.2;
      blackMaterial.metalness = 0.7;
    }

    piecesGroup.children.forEach((child) => {
      const p = child as THREE.Group;
      const { homeX, homeY, homeZ, explodeOffset, explodeRot, color, type } = p.userData;

      const currentX = homeX;
      const currentY = homeY;
      const currentZ = homeZ;
      const rotX = 0;
      const rotY = color === 'black' ? Math.PI : 0;
      const rotZ = 0;

      if (explosionFactor > 0.001) {
        if (type === 'king' && color === 'white') {
          p.position.set(0, 1.2 + explosionFactor * 2.5, 0);
          p.rotation.set(0, explosionFactor * Math.PI * 4, 0);
        } else {
          const expX = currentX + explodeOffset.x * explosionFactor;
          const expY = currentY + explodeOffset.y * explosionFactor;
          const expZ = currentZ + explodeOffset.z * explosionFactor;
          p.position.set(expX, expY, expZ);

          p.rotation.set(
            rotX + explodeRot.x * explosionFactor,
            rotY + explodeRot.y * explosionFactor,
            rotZ + explodeRot.z * explosionFactor
          );
        }
      } else {
        p.position.set(currentX, currentY, currentZ);
        p.rotation.set(rotX, rotY, rotZ);
      }
    });

  }, [scrollProgress]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 w-full h-full pointer-events-none" 
      style={{ background: 'linear-gradient(to bottom, #030303, #07070c)' }}
    />
  );
}
