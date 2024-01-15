import {Component, inject} from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';

import { CartService } from '../cart.service';
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  selector: 'sw-cart-list',
  standalone: true,
  template: `
    @for (item of cartItems(); track $index) {
      <div>
        <sw-cart-item [item]='item'></sw-cart-item>
      </div>
    }
  `,
  imports: [AsyncPipe, NgFor, CartItemComponent]
})
export class CartListComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
}
