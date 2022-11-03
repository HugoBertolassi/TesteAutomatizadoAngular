import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import{debounceTime, takeUntil} from 'rxjs/operators'

@Component({
  selector:'app-photo-frame',
  templateUrl:'./photo-frame.component.html',
  styleUrls:['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit,OnDestroy{
  @Input() description:string ='';
  @Input() src:string='';
  @Input() likes=0;
  @Output() public liked:EventEmitter<void>=new EventEmitter()

  private debounceSubject:Subject<void>=new Subject();
  private unsubscribe:Subject<void>=new Subject();

  ngOnInit(): void {
    this.debounceSubject
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(takeUntil(this.unsubscribe))//espera e encerra todos os subscribes caso exista junto com ondestroy
      .subscribe(()=>this.liked.emit())
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  public like():void{
   this.debounceSubject.next();
  }

}
