import { useCartStore } from "@/store/cartStore"

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function useCart() {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const total = useCartStore((state) => state.total)
  const count = useCartStore((state) => state.count)

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    resetCart: clearCart,
    total,
    count,
  }
}