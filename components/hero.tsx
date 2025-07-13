"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Only animate if GSAP is properly loaded and elements exist
    if (titleRef.current && subtitleRef.current && buttonsRef.current && typeof gsap !== 'undefined') {
      setIsAnimating(true)
      
      // Set initial states
      gsap.set(titleRef.current, { opacity: 0, y: 100, scale: 0.8 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 50 })
      gsap.set(buttonsRef.current, { opacity: 0, y: 30 })

      // Fallback: ensure elements are visible after a delay
      const fallbackTimer = setTimeout(() => {
        gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], { opacity: 1, y: 0, scale: 1 })
        setIsAnimating(false)
      }, 2000)

      const tl = gsap.timeline({ delay: 0.5 })

      tl.to(titleRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .call(() => {
          clearTimeout(fallbackTimer)
          setIsAnimating(false)
        })

      // Floating animation for the hero section
      gsap.to(heroRef.current, {
        y: -20,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      })

      return () => {
        clearTimeout(fallbackTimer)
        setIsAnimating(false)
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-7xl mx-auto text-center">
        <div ref={heroRef} className="space-y-8">
          <h1 
            ref={titleRef} 
            className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight ${!isAnimating ? 'opacity-100' : ''}`}
          >
            Creative
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Frontend
            </span>
            Developer
          </h1>

          <p 
            ref={subtitleRef} 
            className={`text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed ${!isAnimating ? 'opacity-100' : ''}`}
          >
            Crafting beautiful, interactive web experiences with modern technologies. Specializing in React, TypeScript,
            and cutting-edge animations.
          </p>

          <div 
            ref={buttonsRef} 
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${!isAnimating ? 'opacity-100' : ''}`}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none px-8 py-3 text-lg group"
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 text-lg group bg-transparent"
            >
              <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Download CV
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full opacity-20 blur-xl animate-pulse delay-2000"></div>
    </section>
  )
}
