import type React from "react"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    icon?: boolean
}

export default function DarkButton({ children, onClick, className, icon = true }: ButtonProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative px-4 py-2 rounded-md bg-[#6D28D9] text-white font-medium",
                "transition-all duration-200 ease-in-out",
                "hover:bg-[#6838c2fd] hover:shadow-[0_0_10px_rgba(109,40,217,0.5)]",
                "focus:outline-none focus:ring-2 focus:ring-[#6838c2fd] focus:ring-opacity-50",
                "active:translate-y-0.5",
                className,
            )}
        >
            <div className="flex items-center justify-center gap-2">
                {children}
                {icon && (
                    <ArrowRight className={cn("w-4 h-4 transition-transform duration-200", isHovered ? "translate-x-0.5" : "")} />
                )}
            </div>
        </button>
    )
}

