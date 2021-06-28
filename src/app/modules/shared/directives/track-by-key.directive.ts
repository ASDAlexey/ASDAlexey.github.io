import { NgForOf } from '@angular/common';
import { Directive, Host, Input, OnChanges, Optional, SimpleChanges, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[ngForTrackByKey]' })
export class NgForTrackByKeyDirective implements OnChanges {
  @Input() ngForTrackByKey = '';

  constructor(@Host() @Optional() private ngFor: NgForOf<any[]>, private viewContainerRef: ViewContainerRef) {
    if (!ngFor) {
      throw new Error('trackByKey should use with *ngFor!');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('ngForTrackByKey' in changes) {
      const key = this.ngForTrackByKey;

      if (key) {
        this.ngFor.ngForTrackBy = (index: number, item: any): string | number => item[key];
      }

      this.ngFor['_differ'] = null;
      this.ngFor['_ngForOfDirty'] = true;
      this.viewContainerRef.clear();
      this.ngFor.ngDoCheck();
    }
  }
}
