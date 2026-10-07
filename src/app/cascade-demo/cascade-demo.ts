import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from '@openng/optimus-ui/cascadeselect';

interface City {
  cname: string;
  code: string;
}

@Component({
  selector: 'app-cascade-demo',
  imports: [FormsModule, CascadeSelectModule],
  template: `
    <p-cascadeselect
      [(ngModel)]="selectedCity"
      [options]="$any(countries)"
      optionLabel="cname"
      optionGroupLabel="name"
      [optionGroupChildren]="['states', 'cities']"
      placeholder="Select a City"
    />
    <p class="selected">{{ selectedCity()?.cname ?? 'none' }}</p>
  `,
})
export class CascadeDemo {
  selectedCity = signal<City | null>(null);

  countries = [
    {
      name: 'Australia',
      code: 'AU',
      states: [
        {
          name: 'New South Wales',
          cities: [
            { cname: 'Sydney', code: 'A-SY' },
            { cname: 'Newcastle', code: 'A-NE' },
          ],
        },
        {
          name: 'Queensland',
          cities: [{ cname: 'Brisbane', code: 'A-BR' }],
        },
      ],
    },
    {
      name: 'Canada',
      code: 'CA',
      states: [
        {
          name: 'Ontario',
          cities: [
            { cname: 'Toronto', code: 'C-TO' },
            { cname: 'Ottawa', code: 'C-OT' },
          ],
        },
      ],
    },
  ];
}
