'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ImageCarouselProps {
  images: Array<{
    id: string
    image_url: string
    alt_text?: string
    caption?: string
    is_featured?: boolean
  }>
  className?: string
  showThumbnails?: boolean
  showFullscreen?: boolean
}

export function ImageCarousel({ 
  images, 
  className = '', 
  showThumbnails = true, 
  showFullscreen = true 
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className={`aspect-video bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  // If only one image, show it without carousel controls
  if (images.length === 1) {
    return (
      <div className={`relative ${className}`}>
        <div className="aspect-video overflow-hidden rounded-lg">
          <img 
            src={images[0].image_url} 
            alt={images[0].alt_text || 'Event image'}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => showFullscreen && setIsFullscreen(true)}
          />
          {images[0].is_featured && (
            <Badge className="absolute top-4 left-4 bg-accent text-white">
              Featured
            </Badge>
          )}
        </div>
        {images[0].caption && (
          <p className="text-sm text-gray-600 mt-2 text-center">{images[0].caption}</p>
        )}
        
        {/* Fullscreen Modal */}
        {showFullscreen && (
          <FullscreenModal 
            image={images[0]} 
            isOpen={isFullscreen} 
            onClose={() => setIsFullscreen(false)} 
          />
        )}
      </div>
    )
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const currentImage = images[currentIndex]

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Display */}
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={currentImage.image_url}
            alt={currentImage.alt_text || `Event image ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => showFullscreen && setIsFullscreen(true)}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Featured Badge */}
        {currentImage.is_featured && (
          <Badge className="absolute top-4 left-4 bg-accent text-white">
            Featured
          </Badge>
        )}

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
          onClick={prevImage}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
          onClick={nextImage}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <p className="text-sm text-gray-600 mt-2 text-center">{currentImage.caption}</p>
      )}

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? 'border-accent shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img 
                src={image.image_url} 
                alt={image.alt_text || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {image.is_featured && (
                <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <FullscreenModal 
          image={currentImage} 
          isOpen={isFullscreen} 
          onClose={() => setIsFullscreen(false)} 
        />
      )}
    </div>
  )
}

// Fullscreen Modal Component
function FullscreenModal({ 
  image, 
  isOpen, 
  onClose 
}: { 
  image: any
  isOpen: boolean
  onClose: () => void 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="relative max-w-7xl max-h-full">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white border-0"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
        
        <img 
          src={image.image_url} 
          alt={image.alt_text || 'Event image'}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
        
        {image.caption && (
          <p className="text-white text-center mt-4 px-4">{image.caption}</p>
        )}
      </div>
    </div>
  )
}
