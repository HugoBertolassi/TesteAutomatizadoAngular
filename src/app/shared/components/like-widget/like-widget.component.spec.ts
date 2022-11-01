import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  it(`#${LikeWidgetComponent.prototype.like.name}
    should trigger (@Output liked) when called`, () => {
      spyOn(component.liked, 'emit');
      fixture.detectChanges();
      component.like();
      expect(component.liked.emit).toHaveBeenCalled();
  });

  //Teste do click, controlando o click no like,
  //pelo teste estar dentro de umsubscribe é importante fazer o controle com done, visto que o teste esta assincrono
  it(`(D) Should display number of likes when clicked`,done=>{
    fixture.detectChanges()
    component.liked.subscribe(()=>{
      component.likes++;
      fixture.detectChanges();//atualiza os dados do dom conforme clicado
      const countEl:HTMLElement=fixture.nativeElement.querySelector('.like-counter');
      expect(countEl.textContent.trim()).toBe('1');
      done();//informa que o teste realmente foi executado
    })
    const likeWidgetContainerEl:HTMLElement=fixture.nativeElement.querySelector('.like-widget-container');
    likeWidgetContainerEl.click();

  });
   //Teste do enter, controlando o click no like,
  //pelo teste estar dentro de umsubscribe é importante fazer o controle com done, visto que o teste esta assincrono
  it(`(D) Should display number of likes when Enter was pressed`,done=>{
    fixture.detectChanges()
    component.liked.subscribe(()=>{
      component.likes++;
      fixture.detectChanges();//atualiza os dados do dom conforme clicado
      const countEl:HTMLElement=fixture.nativeElement.querySelector('.like-counter');
      expect(countEl.textContent.trim()).toBe('1');
      done();//informa que o teste realmente foi executado
    })
    const likeWidgetContainerEl:HTMLElement=fixture.nativeElement.querySelector('.like-widget-container');
    const event =new KeyboardEvent('keyup',{key:'Enter'})
    likeWidgetContainerEl.dispatchEvent(event)

  });
});
