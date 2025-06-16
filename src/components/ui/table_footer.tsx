import * as React from "react"

import { cn } from "@/lib/utils"

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t border-muted-foreground/50 font-medium flex items-center justify-center w-full",
        className
      )}
      style={{ textAlign: "center", position: "sticky", bottom: 0 }}
      {...props}
    />
  )
}

export {
  TableFooter,
}
