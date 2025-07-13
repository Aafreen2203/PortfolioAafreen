"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with React, Next.js, and Stripe. Features include user authentication, product catalog, shopping cart, and payment processing.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Stripe", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Dashboard Analytics",
    description:
      "Real-time analytics dashboard with interactive charts, data visualization, and responsive design. Built with React and D3.js for dynamic data representation.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "D3.js", "Node.js", "MongoDB", "Socket.io", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Mobile App Landing",
    description:
      "Responsive landing page for a mobile application with smooth animations, modern design, and optimized performance across all devices.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "GSAP", "Framer Motion", "Tailwind", "Responsive"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-pink-500 to-orange-500",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Redux", "Node.js", "Socket.io", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-green-500 to-blue-500",
  },
  {
    title: "Weather App",
    description:
      "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather information with smooth animations.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "API Integration", "Geolocation", "CSS Animations"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio website showcasing projects and skills with modern design, smooth animations, and responsive layout.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "GSAP", "Tailwind", "TypeScript", "Responsive"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-purple-500 to-indigo-500",
  },
]

export default function ProjectsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 },
    )

    // Projects animation
    projectsRef.current.forEach((project, index) => {
      if (project) {
        gsap.fromTo(
          project,
          { opacity: 0, y: 80, rotationX: 45 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div ref={heroRef}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              My
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A collection of my recent work showcasing various technologies, creative solutions, and attention to
              detail in every project.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                ref={(el) => {
                  if (el) projectsRef.current[index] = el
                }}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
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
                          onClick={() => window.open(project.liveUrl, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                        <Button
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-none"
                          onClick={() => window.open(project.githubUrl, "_blank")}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
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

      <Footer />
    </div>
  )
}
