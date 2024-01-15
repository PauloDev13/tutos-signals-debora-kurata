import {computed, Injectable, signal} from "@angular/core";
import { Vehicle } from "../vehicles/vehicle";
import { Action, CartItem } from "./cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Manage start with signals
  cartItems = signal<CartItem[]>([]);

  subTotal = computed(() =>
    this.cartItems().reduce((a, b) =>
    a + (b.quantity * Number(b.vehicle.cost_in_credits)), 0)
  );


  deliveryFree = computed(() => this.subTotal() < 100000 ? 999 : 0);

  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  totalPrice = computed(() => this.subTotal() + this.deliveryFree() + this.tax());

  // Add the vehicle to the cart as an Action<CartItem>
  addToCart(vehicle: Vehicle): void {
    this.cartItems.update(items => [...items, { vehicle, quantity: 1 }]);
  }
  // Remove the item from the cart
  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update(items =>
      items.filter(item =>
        item.vehicle.name !== cartItem.vehicle.name));
  }

  updateInCart(cartItem: CartItem, quantity: number) {
    this.cartItems.update(items =>
      items.map(item =>
        item.vehicle.name === cartItem.vehicle.name
          ? { vehicle: cartItem.vehicle, quantity }
          : item
      ));
  }

  // Return the updated array of cart items
  private modifyCart(items: CartItem[], operation: Action<CartItem>): CartItem[] {
    if (operation.action === 'add') {
      // Determine if the item is already in the cart
      const itemInCart = items.find(item => item.vehicle.name === operation.item.vehicle.name);
      if (itemInCart) {
        // If so, update the quantity
        itemInCart.quantity += 1;
        return items.map(item => item.vehicle.name === itemInCart.vehicle.name ? itemInCart : item)
      } else {
        return [...items, operation.item];
      }
    } else if (operation.action === 'update') {
      return items.map(item => item.vehicle.name === operation.item.vehicle.name ? operation.item : item)
    } else if (operation.action === 'delete') {
      return items.filter(item => item.vehicle.name !== operation.item.vehicle.name);
    }
    return [...items];
  }

}
