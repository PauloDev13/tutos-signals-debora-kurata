import {Component, computed, inject} from '@angular/core';

import { CartService } from './cart/cart.service';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  protected pageTitle = 'Star Wars Vehicle Sales';
  private cartService = inject(CartService);

  cartCount = computed(() =>
    this.cartService.cartItems().reduce((acc, item) =>
      acc + item.quantity, 0)
  );
}
