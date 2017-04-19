import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { SimpleChanges, DoCheck } from '@angular/core';
import { Angular2NvD3 } from './angular2-nvd3.core';
import * as _ from 'lodash';

@Component({ selector: 'app-nvd3', template: '' })
export class NvD3Component implements OnChanges, OnInit, DoCheck {
    @Input()
    public options: any;

    @Input()
    public data: any;
    private previousData: {key: string, values: any[]}[];

    private ngNvD3: any;

    constructor(private el: ElementRef) {
        this.ngNvD3 = new Angular2NvD3.NgNvD3(this.el);
    }

    ngDoCheck() {
        if (!_.isEqual(this.data, this.previousData)) {
            this.ngNvD3.updateWithOptions(this.options, this.data);
            this.previousData = _.cloneDeep(this.data);
        }
    }

    ngOnChanges(changes?: SimpleChanges) {
        if ('data' in changes && 'options' in changes) {
            const data = changes['data'].currentValue;
            const options = changes['options'].currentValue;
            if (data && options) {
                this.ngNvD3.updateWithOptions(this.options, this.data);
            }
            this.previousData = _.cloneDeep(this.data);
        }
    }

    ngOnInit() {
        this.ngNvD3.isViewInitialize(true);
        this.ngNvD3.updateWithOptions(this.options, this.data);
    }
}
