import React from "react";
import { axiosInstance } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { cartStore } from "@/store/cartStore";

class Cart {
  async fetchCartItems() {
    try {
      const response = await axiosInstance.get("/customer/cart");
      console.log(response)
        if(response.status === 200) {
            const items = response.data;

            // Update Zustand store with fetched items
            cartStore.setState({
              items: items.map((item: any) => ({
                product: item.product,
                name: item.name,
                unit_price: item.unit_price,
                quantity: item.quantity,
                total_price: item.unit_price * item.quantity,
                picture: item.picture,
              })),
              totalPrice: items.reduce((sum: number, item: any) => sum + item.unit_price * item.quantity, 0),
            });
        }else{
            // load cart from local storage
            cartStore.getState().loadCart()
        }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }

  async addItemToCart(item: { product: string; name: string; unit_price: number; quantity: number; picture: string }) {
    try {
      const response = await axiosInstance.post("/cart/add", item);
      if (response.status === 201) {
        cartStore.getState().addItem(item);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  }

  async removeItemFromCart(product: string) {
    try {
      const response = await axiosInstance.delete(`/cart/remove/${product}`);
      if (response.status === 200) {
        cartStore.getState().removeItem(product);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }

  async updateCartItemQuantity(product: string, newQuantity: number) {
    try {
      const response = await axiosInstance.put(`/cart/update/${product}`, { quantity: newQuantity });
      if (response.status === 200) {
        cartStore.getState().updateQuantity(product, newQuantity);
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  }

  clearCart() {
    cartStore.getState().clearCart();
  }
}

export const cartService = new Cart();
