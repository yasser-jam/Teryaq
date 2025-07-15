import { cn } from '@/lib/utils'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

export default function BasePageDialog({
  open = true,
  onOpenChange,
  loading,
  className,
  title,
  footer,
  children,
  classTitle
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  loading?: boolean
  className?: string
  title?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  classTitle?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          (classTitle && cn('min-w-200')) || cn('p-0 bg-surface ', className)
        }
      >
        <div className="relative w-full flex flex-col">
          {loading && (
            <div className="animate-pulse absolute z-20 w-full h-full inset-0 bg-black/25 rounded-lg" />
          )}

          {title && (
            <DialogHeader
              className={cn(classTitle) || `px-8 py-5 bg-background rounded-t-lg`}
            >
              <DialogTitle
                className={
                  classTitle && 'text-[#1A1A1A] text-[26px] text-bold '
                }
              >
                {title}
              </DialogTitle>
            </DialogHeader>
          )}

          <div className="">{children}</div>

          {footer && (
            <DialogFooter className="px-8 py-6">{footer}</DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
