"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "./cartStore"

export const Navigation = () => {
    const pathname = usePathname();
    const cartItems = useCartStore((state) => state.items);
    const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="flex items-center space-x-8">
            <Link href="/" className={pathname === "/" 
                ? "font-bold text-white" 
                : "text-gray-300 hover:text-white transition-colors duration-200"}>
                Home 
            </Link>
            <Link href="/products" className={pathname.startsWith("/products") 
                ? "font-bold text-white" 
                : "text-gray-300 hover:text-white transition-colors duration-200"}>
                Products
            </Link>
            <Link href="/cart" className="relative text-gray-300 hover:text-white transition-colors duration-200">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                    </span>
                )}
            </Link>
        </nav>
    )
}