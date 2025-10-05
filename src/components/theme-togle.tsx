import { useEffect, useState } from "react"
import { Button } from "@/components//ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useTheme } from "@/providers/theme-provider"
import { Icon } from "@/components/icons"

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { userTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton className="w-9 h-9 rounded-md" />
  }

  const cycleTheme = () => {
    if (userTheme === 'light') {
      setTheme('dark')
    } else if (userTheme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    switch (userTheme) {
      case 'light':
        return <Icon name="lu:sun" className="h-4 w-4" />
      case 'dark':
        return <Icon name="lu:moon" className="h-4 w-4" />
      case 'system':
        return <Icon name="lu:monitor" className="h-4 w-4" />
      default:
        return <Icon name="lu:sun" className="h-4 w-4" />
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label={`Switch to ${userTheme === 'light' ? 'dark' : userTheme === 'dark' ? 'system' : 'light'} theme`}
    >
      {getIcon()}
    </Button>
  )
}
