import * as React from "react"

import { cn } from "@/lib/utils"

function Table({
  className,
  children,
  ...props
}: React.ComponentProps<"table"> & { children: React.ReactNode }) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative flex flex-col rounded-lg border border-muted-foreground/50 bg-background shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table
          data-slot="table"
          className={cn(
            "w-full text-sm text-foreground font-medium",
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  )
}

function TableHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"thead"> & { children: React.ReactNode }) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "bg-muted-foreground/50 border-b border-muted-foreground/50",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  )
}

function TableBody({
  className,
  children,
  ...props
}: React.ComponentProps<"tbody"> & { children: React.ReactNode }) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-b-0", className)}
      {...props}
    >
      {children}
    </tbody>
  )
}

function TableFooter({
  className,
  children,
  ...props
}: React.ComponentProps<"tfoot"> & { children: React.ReactNode }) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted-foreground/50 border-t border-muted-foreground/50",
        className
      )}
      {...props}
    >
      {children}
    </tfoot>
  )
}

function TableRow({
  className,
  children,
  ...props
}: React.ComponentProps<"tr"> & { children: React.ReactNode }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

function TableHead({
  className,
  children,
  ...props
}: React.ComponentProps<"th"> & { children: React.ReactNode }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "font-medium px-4 py-2 text-left align-middle whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

function TableCell({
  className,
  children,
  ...props
}: React.ComponentProps<"td"> & { children: React.ReactNode }) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 py-2 align-middle whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

function TableCaption({
  className,
  children,
  ...props
}: React.ComponentProps<"caption"> & { children: React.ReactNode }) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    >
      {children}
    </caption>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
