'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Luminous particle field rendered behind the hero copy.
 * All motion runs in the vertex shader (zero per-frame CPU work);
 * the camera eases toward the cursor for gentle 3D parallax.
 * Pauses when off-screen / tab hidden. Skipped for reduced motion.
 */
export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isMobile = window.matchMedia('(pointer: coarse)').matches
    const COUNT = isMobile ? 280 : 850

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.z = 16

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    /* Geometry: random positions + per-particle seeds */
    const positions = new Float32Array(COUNT * 3)
    const seeds = new Float32Array(COUNT)
    const sizes = new Float32Array(COUNT)
    const W = 40, H = 22, D = 18
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * W
      positions[i * 3 + 1] = (Math.random() - 0.5) * H
      positions[i * 3 + 2] = (Math.random() - 0.5) * D
      seeds[i] = Math.random()
      sizes[i] = 0.5 + Math.random() * 1.8
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: /* glsl */ `
        attribute float aSeed;
        attribute float aSize;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vSeed;
        varying float vTwinkle;

        void main() {
          vSeed = aSeed;
          vec3 p = position;

          // slow upward drift, wrapped vertically
          float h = 22.0;
          p.y = mod(p.y + uTime * (0.18 + aSeed * 0.35) + h * 0.5, h) - h * 0.5;
          // gentle sideways sway
          p.x += sin(uTime * 0.22 + aSeed * 6.2831) * 0.9;
          p.z += cos(uTime * 0.16 + aSeed * 6.2831) * 0.7;

          vTwinkle = 0.55 + 0.45 * sin(uTime * (0.6 + aSeed * 1.4) + aSeed * 40.0);

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * uPixelRatio * (26.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vSeed;
        varying float vTwinkle;

        void main() {
          float d = length(gl_PointCoord - 0.5);
          float alpha = smoothstep(0.5, 0.05, d);
          // brand blue → white mix per particle
          vec3 blue = vec3(0.18, 0.49, 0.96);
          vec3 white = vec3(0.85, 0.92, 1.0);
          vec3 col = mix(blue, white, vSeed * 0.7);
          gl_FragColor = vec4(col, alpha * vTwinkle * 0.55);
        }
      `,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    /* Sizing */
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    /* Mouse parallax */
    const target = { x: 0, y: 0 }
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    if (!isMobile) window.addEventListener('pointermove', onPointer, { passive: true })

    /* Render loop — paused when hero is off-screen or tab hidden */
    let visible = true
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0 })
    io.observe(mount)

    const clock = new THREE.Clock()
    let raf: number
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      mat.uniforms.uTime.value = clock.getElapsedTime()
      camera.position.x += (target.x * 1.6 - camera.position.x) * 0.035
      camera.position.y += (-target.y * 1.0 - camera.position.y) * 0.035
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} aria-hidden="true" className="absolute inset-0 pointer-events-none [&>canvas]:w-full [&>canvas]:h-full" />
}
