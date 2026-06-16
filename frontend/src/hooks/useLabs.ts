import { useEffect, useState, useCallback } from 'react'
import { api, resolveImageUrl } from '../lib/api'
import { IMAGE_FALLBACK, PLACEHOLDER_IMAGE } from '../data/labsData'

export interface Lab {
  id: number
  name: string
  slug: string
  category: string
  description: string
  image: string | null
  resources: string[]
  available: boolean
  featured: boolean
  is_permanent: boolean
}

export function getLabImage(lab: Lab) {
  return resolveImageUrl(lab.image) || IMAGE_FALLBACK[lab.slug] || PLACEHOLDER_IMAGE
}

export function useLabs(params?: { search?: string; category?: string; featured?: boolean }) {
  const [labs, setLabs] = useState<Lab[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(() => {
    setLoading(true)
    api.getLabs(params)
      .then(setLabs)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load labs'))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)])

  useEffect(() => { reload() }, [reload])

  return { labs, loading, error, reload }
}
