import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

/*O objetivo desta diretiva é poder ser chamada diretamenta no html como se fosse um atributo da div
<div appAction>
*/

@Directive({
  selector:'[appAction]'
})
export class ActionDirective{
  @Output() public appAction:EventEmitter<Event> = new EventEmitter();//evento normal do DOM

  @HostListener('click',['$event'])
  public handleClick(event:Event):void{
    this.appAction.emit(event);
  }

  @HostListener('keyup',['$event'])
  public handleKeyUp(event:KeyboardEvent):void{
    this.appAction.emit(event);
  }
}


