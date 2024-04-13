import {
    Component,
    Input,
    OnChanges,
    SimpleChange,
    SimpleChanges
  } from "@angular/core";
  import { FormControl } from "@angular/forms";
  
  @Component({
    selector: "app-generic-select",
    template: `
      <ng-select
        
        class="select-control"
        id="item-select"
        [items]="adjustedAvailableItems"
        [multiple]="true"
        [closeOnSelect]="false"
        [clearSearchOnAdd]="true"
        [hideSelected]="true"
        bindLabel="searchField"
      >
        <ng-template ng-multi-label-tmp let-items="items" let-clear="clear">
          <div class="ng-value" *ngFor="let item of items">
            <span
              class="ng-value-icon left"
              (click)="clear(item)"
              aria-hidden="true"
              >×</span
            >
            <span class="ng-value-label">{{ getText(item) }}</span>
          </div>
        </ng-template>
  
        <ng-template ng-option-tmp let-item="item">
          {{ getText(item) }}
        </ng-template>
      </ng-select>
    `
  })
  export class GenericSelectComponent implements OnChanges {
    @Input() control: FormControl | undefined;
    @Input() availableItems: any =[];
    @Input() printContent: ((item: string) => string) | undefined;
    @Input() itemSearchFields: any = [];
  
    adjustedAvailableItems: any = [] ;
  
    constructor() {}
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes["itemSearchFields"] || changes["availableItems"]) {
        this.adjustedAvailableItems = this.adjustAvailableItems(
          this.availableItems
        );
      }
    }
  
    private adjustAvailableItems(items: any[]): any[] {
      if (!this.itemSearchFields || !this.itemSearchFields.length) {
        return items;
      }
      return items.map(item => {
        item.searchField = this.itemSearchFields
          .map((searchField:any) => item[searchField])
          .reduce((curr: string, next: string) => curr + " " + next);
        return item;
      });
    }
  
    getText(item: any): string {
      if (!item) {
        return "";
      }
      if (!this.printContent) {
        return item.toString();
      }
      return this.printContent(item);
    }
  }
  