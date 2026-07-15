import { useCallback, useRef } from 'react'

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

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (node) observer.current.observe(node)
    },
    [callback],
  )

  return lastElementRef
}

export default useInfinityScroll
