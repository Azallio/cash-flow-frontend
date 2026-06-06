import { useRef, useCallback } from 'react'

const useInfinityScroll = (callback: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback()
        }
      })	

      if (node) observer.current.observe(node)
    },
    [callback],
  )

  return lastElementRef
}

export default useInfinityScroll
