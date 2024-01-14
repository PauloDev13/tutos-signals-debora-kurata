import {Component, computed, inject} from '@angular/core';
import {NgClass, AsyncPipe} from '@angular/common';
import {VehicleService} from '../vehicle.service';
import {Vehicle} from "../vehicle";

@Component({
  selector: 'sw-vehicle-list',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent {
  pageTitle = 'Vehicles';
  errorMessage = '';
  vehicleService = inject(VehicleService);

  // protected vehicles = this.vehicleService.vehicles;
  protected vehicles = computed((): Vehicle[] => {
    try {
      return this.vehicleService.vehicles();
    } catch (e) {
      this.errorMessage = typeof e === 'string' ? e : 'Error find vehicle';
      return [];
    }
  });

  protected selectedVehicle = this.vehicleService.selectedVehicle;

  // When a vehicle is selected, emit the selected vehicle name
  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }

}
