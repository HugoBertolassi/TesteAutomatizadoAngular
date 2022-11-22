import { ActionDirectiveModule } from './action.module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActionDirective } from './action.directive';
import { Component } from '@angular/core';
import { compileComponentFromMetadata } from '@angular/compiler';
import { By } from '@angular/platform-browser';


//por ser diretiva não precisa deixar assincrono ou colocar compileComponents, ms funciona e pode ser utilizado como regra geral de uso
describe(ActionDirective.name,()=>{

  let fixture:ComponentFixture<ActionDirectiveTestComponent>;
  let component:ActionDirectiveTestComponent
  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      declarations:[ActionDirectiveTestComponent],//todo componente tem que fazer pate de um modulo
      imports:[ActionDirectiveModule]
    }).compileComponents();//nao precisa porque não tem template
    fixture=TestBed.createComponent(ActionDirectiveTestComponent);
    component=fixture.componentInstance;
  });

  it(`(D) (@Output appAction) should emit event with payload when ENTER key is pressed`,()=>{
    const divEl:HTMLElement=fixture.nativeElement.querySelector('.dummy-component');
    const event =new KeyboardEvent('keyup',{key:'Enter'})
    divEl.dispatchEvent(event);
    expect(component.hasEvent()).toBe(true)

  });

  it(`(D) (@Output appAction) should emit event with payload when CLICKED`,()=>{
    //fixture.debugElement.nativeElement = fixture.nativeElement  //os dois apontam para o mesmo endereço da memoria, debug fornece outros atributos
    //const divEl:HTMLElement=fixture.nativeElement.querySelector('.dummy-component');
    const divEl =fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;//pega o elemtno do html que em a diretiva adicionada
    const event =new Event('click')
    divEl.dispatchEvent(event);
    expect(component.hasEvent()).toBe(true)

  });


  it(`(D) (@Output appAction) should emit event with payload when CLICKED or ENTER key pressed`,()=>{
    const divEl:HTMLElement=fixture.nativeElement.querySelector('.dummy-component');
    const clickEvent =new Event('click');
    const keyboardEvent =new KeyboardEvent('keyup',{key:'Enter'})
    divEl.dispatchEvent(clickEvent);
    expect(component.hasEvent()).withContext('ClickEvent').toBe(true);
    component.clearEvent();
    divEl.dispatchEvent(keyboardEvent);
    expect(component.hasEvent()).withContext('Keybord event "keyup"').toBeTrue();

  });

})


//Criação de componente dentro do teste para a realizaçao deteste
@Component({
  template:`<div class="dummy-component" (appAction)="actionHandler($event)"></div>`,//criou o template in line para não precisar criar o arquivo html
})
class ActionDirectiveTestComponent{
  private event:Event=null;
  public actionHandler(event:Event):void{
    this.event=event
  }

  public hasEvent():boolean{
    return !!this.event;//retorna o boolean do status do evento
  }

  public clearEvent(){
    this.event=null;
  }
}
