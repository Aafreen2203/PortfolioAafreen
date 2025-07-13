"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Palette, Zap } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code following best practices and modern standards.",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating beautiful, intuitive interfaces that provide exceptional user experiences across all devices.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing applications for speed, accessibility, and seamless performance on all platforms.",
    gradient: "from-pink-500 to-orange-500",
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const cards = cardsRef.current

    // Wait a bit to ensure GSAP is fully loaded
    const animationTimer = setTimeout(() => {
      // Only animate if GSAP is properly loaded and elements exist
      if (cards.length > 0 && typeof gsap !== 'undefined') {
        setIsAnimating(true)
        
        // Set initial state
        gsap.set(cards, { opacity: 0, y: 100, scale: 0.8 })

        // Fallback: ensure elements are visible after a delay
        const fallbackTimer = setTimeout(() => {
          gsap.set(cards, { opacity: 1, y: 0, scale: 1 })
          setIsAnimating(false)
        }, 3000)

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => {
            clearTimeout(fallbackTimer)
            setIsAnimating(false)
          },
        })

        // Hover animations
        cards.forEach((card, index) => {
          if (card) {
            card.addEventListener("mouseenter", () => {
              gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" })
            })
            card.addEventListener("mouseleave", () => {
              gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" })
            })
          }
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What I Bring to the Table</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Combining technical expertise with creative vision to deliver exceptional web solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="relative group"
              style={{ opacity: isAnimating ? undefined : 1 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>

                <p className="text-gray-300 leading-relaxed">{feature.description}</p>

                {/* Decorative gradient border */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
