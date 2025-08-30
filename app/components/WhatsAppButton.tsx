"use client"

import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"

const WhatsAppButton = () => {
  const [hideButton, setHideButton] = useState(false)

  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => setHideButton(entry.isIntersecting),
      {
        threshold: 0.1,
      }
    )

    observer.observe(footer)
    return () => footer && observer.unobserve(footer)
  }, [])

  if (hideButton) return null

  const whatsappNumber = "923184017664"

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank")
  }

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <div className="absolute inline-flex h-14 w-14 rounded-full"></div>
      <button
        onClick={handleClick}
        className="relative inline-flex items-center justify-center w-11 h-11 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-1000"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  )
}

export default WhatsAppButton
