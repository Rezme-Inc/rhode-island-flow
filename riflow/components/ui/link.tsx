import NextLink from "next/link"
import { cn } from "@/lib/utils"

interface LinkProps extends React.ComponentPropsWithoutRef<typeof NextLink> {
  className?: string
}

export function Link({ className, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        "text-primary hover:underline",
        className
      )}
      {...props}
    />
  )
} 