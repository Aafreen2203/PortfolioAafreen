"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with React, Next.js, and Stripe integration",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Dashboard Analytics",
    description: "Real-time analytics dashboard with interactive charts and data visualization",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Mobile App Landing",
    description: "Responsive landing page for mobile app with smooth animations",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "GSAP", "Framer Motion", "CSS"],
    gradient: "from-pink-500 to-orange-500",
  },
]

export default function ProjectsPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const projects = projectsRef.current

    // Wait a bit to ensure GSAP is fully loaded
    const animationTimer = setTimeout(() => {
      // Only animate if GSAP is properly loaded and elements exist
      if (projects.length > 0 && typeof gsap !== 'undefined') {
        setIsAnimating(true)
        
        // Set initial state
        gsap.set(projects, { opacity: 0, y: 80, rotationX: 45 })

        // Fallback: ensure elements are visible after a delay
        const fallbackTimer = setTimeout(() => {
          gsap.set(projects, { opacity: 1, y: 0, rotationX: 0 })
          setIsAnimating(false)
        }, 3000)

        gsap.to(projects, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
            clearTimeout(fallbackTimer)
            setIsAnimating(false)
          },
        })

        return () => {
          clearTimeout(fallbackTimer)
          setIsAnimating(false)
        }
      }
    }, 100) // Small delay to ensure GSAP is ready

    return () => {
      clearTimeout(animationTimer)
      setIsAnimating(false)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Projects</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A showcase of my recent work and creative solutions
          </p>
          <Link href="/projects">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => {
                if (el) projectsRef.current[index] = el
              }}
              className="group relative"
              style={{ opacity: isAnimating ? undefined : 1 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                  ></div>

                  {/* Overlay buttons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <Button
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-none"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-none"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
