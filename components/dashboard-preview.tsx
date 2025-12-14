'use client'

import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useLocale } from 'next-intl'

type CarouselItem = {
  id: string
  title: string
  description: string
  primaryButton?: {
    text: string
    href?: string
    onClick?: () => void
  }
  secondaryButton?: {
    text: string
    href?: string
    onClick?: () => void
  }
  media: {
    type: 'image' | 'video'
    src: string
    alt?: string
    poster?: string
  }
  backgroundImage?: string
}

type DashboardPreviewProps = {
  items?: CarouselItem[]
  className?: string
}

const defaultItems: CarouselItem[] = [
  {
    id: '1',
    title: 'Next Generation Platform',
    description: 'Experience the future of development with cutting-edge tools and seamless integration.',
    primaryButton: {
      text: 'Start Free Trial',
      href: '#',
    },
    secondaryButton: {
      text: 'View Demo',
      href: '#',
    },
    media: {
      type: 'video',
      src: '/vidoe.webm',
      alt: 'Platform Demo',
    },
  },
  {
    id: '2',
    title: 'Gemini Robotics',
    description: 'Powering an era of physical agents to transform how robots actively understand their environments.',
    primaryButton: {
      text: 'Try in Google AI Studio',
      href: '#',
    },
    secondaryButton: {
      text: 'Learn more',
      href: '#',
    },
    media: {
      type: 'video',
      src: '/veo__veo-3__nyc.mp4',
      // poster: '/unnamed.jpg',
      alt: 'Gemini Robotics',
    },
  },


  {
    id: '3',
    title: 'Next Generation Platform',
    description: 'Experience the future of development with cutting-edge tools and seamless integration.',
    primaryButton: {
      text: 'Start Free Trial',
      href: '#',
    },
    secondaryButton: {
      text: 'View Demo',
      href: '#',
    },
    media: {
      type: "image",
      src: '/unnamed.webp',
      alt: 'Platform Demo',
    },
  },
]

export function DashboardPreview({ items = defaultItems, className }: DashboardPreviewProps) {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': {
          slidesToScroll: 1,
        },
      },
      direction: isRtl ? 'rtl' : 'ltr',
    },
    [],
  )
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const videoRefs = React.useRef<Map<string, HTMLVideoElement>>(new Map())
  const [videoStates, setVideoStates] = React.useState<Map<string, { isPlaying: boolean; isMuted: boolean }>>(
    new Map(items.filter(item => item.media.type === 'video').map(item => [item.id, { isPlaying: false, isMuted: true }]))
  )
  const [isAnyVideoPlaying, setIsAnyVideoPlaying] = React.useState(false)

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
    }
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  const onSelect = React.useCallback(() => {
    if (!emblaApi) {
      return
    }
    const newIndex = emblaApi.selectedScrollSnap()
    setSelectedIndex(newIndex)
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
    
    // Stop all videos except the one in the current slide (if it's a video)
    setVideoStates(prev => {
      const newStates = new Map(prev)
      
      items.forEach((item, index) => {
        if (item.media.type === 'video') {
          const video = videoRefs.current.get(item.id)
          if (video) {
            if (index !== newIndex) {
              // Stop videos in all other slides
              if (!video.paused) {
                video.pause()
              }
              const currentState = newStates.get(item.id) || { isPlaying: false, isMuted: true }
              newStates.set(item.id, { ...currentState, isPlaying: false })
            } else {
              // For current slide, update state based on actual video state
              const isPlaying = !video.paused
              const currentState = newStates.get(item.id) || { isPlaying: false, isMuted: true }
              newStates.set(item.id, { ...currentState, isPlaying })
            }
          }
        }
      })
      
      return newStates
    })
    
    // Update isAnyVideoPlaying based on current slide
    const currentItem = items[newIndex]
    if (currentItem?.media.type === 'video') {
      const currentVideo = videoRefs.current.get(currentItem.id)
      setIsAnyVideoPlaying(currentVideo ? !currentVideo.paused : false)
    } else {
      setIsAnyVideoPlaying(false)
    }
  }, [emblaApi, items])

  React.useEffect(() => {
    const videoItems = items.filter(item => item.media.type === 'video')
    setVideoStates(new Map(videoItems.map(item => [item.id, { isPlaying: false, isMuted: true }])))
  }, [items])

  // Set up video event listeners to track play/pause state
  React.useEffect(() => {
    const cleanupFunctions: Array<() => void> = []
    videoRefs.current.forEach((video, itemId) => {
      const handlePlay = () => {
        setIsAnyVideoPlaying(true)
        setVideoStates(prev => {
          const newStates = new Map(prev)
          const currentState = newStates.get(itemId) || { isPlaying: false, isMuted: true }
          newStates.set(itemId, { ...currentState, isPlaying: true })
          return newStates
        })
      }
      const handlePause = () => {
        const isAnyOtherVideoPlaying = Array.from(videoRefs.current.entries()).some(
          ([id, v]) => id !== itemId && !v.paused
        )
        setIsAnyVideoPlaying(isAnyOtherVideoPlaying)
        setVideoStates(prev => {
          const newStates = new Map(prev)
          const currentState = newStates.get(itemId) || { isPlaying: false, isMuted: true }
          newStates.set(itemId, { ...currentState, isPlaying: false })
          return newStates
        })
      }
      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)
      video.addEventListener('ended', handlePause)
      cleanupFunctions.push(() => {
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('ended', handlePause)
      })
    })
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [items, selectedIndex])

  React.useEffect(() => {
    if (!emblaApi) {
      return
    }
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  // Auto-play functionality - pauses when any video is playing
  React.useEffect(() => {
    if (!emblaApi) {
      return
    }

    const autoplayInterval = setInterval(() => {
      if (!isAnyVideoPlaying) {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext()
        } else {
          emblaApi.scrollTo(0)
        }
      }
    }, 5000) 

    return () => {
      clearInterval(autoplayInterval)
    }
  }, [emblaApi, isAnyVideoPlaying])

  const togglePlay = React.useCallback((itemId: string) => {
    const video = videoRefs.current.get(itemId)
    if (!video) {
      return
    }
    setVideoStates(prev => {
      const newStates = new Map(prev)
      const currentState = newStates.get(itemId) || { isPlaying: false, isMuted: true }
      const newIsPlaying = !currentState.isPlaying
      newStates.set(itemId, { ...currentState, isPlaying: newIsPlaying })
      if (newIsPlaying) {
        video.play()
        setIsAnyVideoPlaying(true)
      } else {
        video.pause()
        setIsAnyVideoPlaying(false)
      }
      return newStates
    })
  }, [])

  const toggleMute = React.useCallback((itemId: string) => {
    const video = videoRefs.current.get(itemId)
    if (!video) {
      return
    }
    setVideoStates(prev => {
      const newStates = new Map(prev)
      const currentState = newStates.get(itemId) || { isPlaying: false, isMuted: true }
      const newIsMuted = !currentState.isMuted
      newStates.set(itemId, { ...currentState, isMuted: newIsMuted })
      video.muted = newIsMuted
      return newStates
    })
  }, [])

  
  return (
    <div className={cn('w-full mx-auto px-4 md:px-6 lg:px-0', className)}>
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className={cn('flex', isRtl ? '-mr-4' : '-ml-4')}>
            {items.map((item, index) => (
              <div
                key={item.id}
                className={cn('min-w-0 shrink-0 grow-0 basis-full md:basis-[70%]', isRtl ? 'pr-4' : 'pl-4')}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{
                    scale: selectedIndex === index ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-[16px] md:rounded-[32px] overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 z-20 bg-gray-900/40 pointer-events-none"></div>
                  <div className="relative flex flex-col md:flex-row h-[400px] sm:h-[450px] md:h-[470px] lg:h-[500px]">



                    <div className={cn('absolute top-4 sm:top-6 md:top-8 z-50 flex-1 flex flex-col', isRtl ? 'right-4 sm:right-6 md:right-14' : 'left-4 sm:left-6 md:left-14')}>
                      <motion.div
                        initial={{ x: isRtl ? 20 : -20 }}
                        animate={{
                          x: selectedIndex === index ? 0 : (isRtl ? 20 : -20),
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <h2 className={cn('text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6', isRtl && 'text-right')}>
                          {item.title}
                        </h2>
                        <p className={cn('text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-sm md:max-w-md', isRtl && 'text-right')}>
                          {item.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          {item.primaryButton && (
                            <Button
                              variant="outline"
                              className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40 w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5"
                              onClick={item.primaryButton.onClick}
                              asChild={!!item.primaryButton.href}
                            >
                              {item.primaryButton.href ? (
                                <a href={item.primaryButton.href}>
                                  {item.primaryButton.text}
                                </a>
                              ) : (
                                item.primaryButton.text
                              )}
                            </Button>
                          )}
                          {item.secondaryButton && (
                            <Button
                              variant="ghost"
                              className="text-white hover:bg-white/10 w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5"
                              onClick={item.secondaryButton.onClick}
                              asChild={!!item.secondaryButton.href}
                            >
                              {item.secondaryButton.href ? (
                                <a href={item.secondaryButton.href} className="flex items-center gap-2">
                                  {item.secondaryButton.text}
                                  {isRtl ? (
                                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                                  ) : (
                                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                  )}
                                </a>
                              ) : (
                                <span className="flex items-center gap-2">
                                  {item.secondaryButton.text}
                                  {isRtl ? (
                                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                                  ) : (
                                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                  )}
                                </span>
                              )}
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    </div>
                    <div className=" absolute w-full h-full z-10 flex-1 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {item.media.type === 'video' ? (
                          <>
                            <video
                              ref={(el) => {
                                if (el) {
                                  videoRefs.current.set(item.id, el)
                                  const state = videoStates.get(item.id) || { isPlaying: false, isMuted: true }
                                  el.muted = state.isMuted
                                  if (!state.isPlaying) {
                                    el.pause()
                                  }
                                }
                              }}
                              src={item.media.src}
                              poster={item.media.poster}
                              loop
                              playsInline
                              className="w-full h-full object-cover rounded-xl"
                            />
                            <div className={cn('absolute bottom-3 sm:bottom-4 md:bottom-6 z-[60] flex gap-2 pointer-events-auto', isRtl ? 'left-3 sm:left-4 md:left-6' : 'right-3 sm:right-4 md:right-6')}>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleMute(item.id)
                                }}
                                className="rounded-full bg-gray-900/80 hover:bg-gray-800/90 text-white border border-white/20 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 pointer-events-auto"
                                aria-label={videoStates.get(item.id)?.isMuted ? 'Unmute video' : 'Mute video'}
                              >
                                {videoStates.get(item.id)?.isMuted ? (
                                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                                ) : (
                                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  togglePlay(item.id)
                                }}
                                className="rounded-full bg-gray-900/80 hover:bg-gray-800/90 text-white border border-white/20 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 pointer-events-auto"
                                aria-label={videoStates.get(item.id)?.isPlaying ? 'Pause video' : 'Play video'}
                              >
                                {videoStates.get(item.id)?.isPlaying ? (
                                  <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                                ) : (
                                  <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                                )}
                              </Button>

                            </div>
                          </>
                        ) : (
                          <img
                            src={item.media.src}
                            alt={item.media.alt || item.title}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <div className={cn('flex mt-4 sm:mt-6', isRtl ? 'justify-start mr-4 sm:mr-8 md:mr-12 lg:mr-[75px]' : 'justify-end mr-4 sm:mr-8 md:mr-12 lg:mr-[75px]')}>
          <div className="flex items-center gap-2 sm:gap-4 bg-blue-600 p-1.5 sm:p-2 rounded-full w-fit">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="rounded-full disabled:opacity-30 hover:bg-white group h-8 w-8 sm:h-10 sm:w-10"
            >
              {isRtl ? (
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white group-hover:text-blue-600" />
              ) : (
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white group-hover:text-blue-600" />
              )}
              <span className="sr-only">Previous slide</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="rounded-full disabled:opacity-30 hover:bg-white group h-8 w-8 sm:h-10 sm:w-10"
            >
              {isRtl ? (
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white group-hover:text-blue-600" />
              ) : (
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white group-hover:text-blue-600" />
              )}
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
