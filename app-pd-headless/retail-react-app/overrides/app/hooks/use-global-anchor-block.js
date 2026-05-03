import {useEffect} from 'react'

export function useGlobalAnchorBlock(enabled = true) {
  useEffect(() => {
    if (typeof window === 'undefined' || !enabled) return

    function preventAnchorClicks(event) {
      const anchor = event.target.closest('a')
      // Allow links with data-pd-allow-link attribute
      if (anchor && !anchor.hasAttribute('data-pd-allow-link')) {
        event.preventDefault()
      }
    }

    document.addEventListener('click', preventAnchorClicks)
    return () => document.removeEventListener('click', preventAnchorClicks)
  }, [enabled])
}