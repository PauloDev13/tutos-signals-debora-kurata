import {Component, computed, inject} from '@angular/core';
import {AsyncPipe, DecimalPipe} from '@angular/common';
import {CartService} from 'src/app/cart/cart.service';
import {Vehicle} from '../vehicle';
import {VehicleService} from '../vehicle.service';

@Component({
  selector: 'sw-vehicle-detail',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe],
  templateUrl: './vehicle-detail.component.html'
})
export class VehicleDetailComponent {
  errorMessage = '';
  cartService = inject(CartService);
  vehicleService = inject(VehicleService);

  protected vehicle = this.vehicleService.selectedVehicle;
  protected pageTitle = computed(() => this.vehicle()
    ? `Detail for: ${this.vehicle()?.name}`
    : ''
  )

  protected vehicleFilms = this.vehicleService.vehicleFilms;

  addToCart(vehicle: Vehicle | undefined) {
    if (vehicle) {
      this.cartService.addToCart(vehicle);
    }
  }
}
