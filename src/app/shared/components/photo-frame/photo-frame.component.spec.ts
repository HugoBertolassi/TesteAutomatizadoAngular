import { PhotoFrameModule } from './photo-frame.module';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PhotoFrameComponent } from './photo-frame.component';

describe(PhotoFrameComponent.name,()=>{
  let fixture:ComponentFixture<PhotoFrameComponent>=null;
  let component:PhotoFrameComponent

  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      imports:[PhotoFrameModule],
    }).compileComponents()

    fixture=TestBed.createComponent(PhotoFrameComponent)
    component=fixture.componentInstance //armazena instancia que esta rodando
  });

  //teste para verificar se o componente fo criado
  it('Should Create component',()=>{
    expect( component).toBeTruthy()
  });

  //teste do debounce, por ter tempo de esper e assincrono usar fakeAsync que permite controlar o tempo
  it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@Output like) once when called multiple times within debounce time`,
  fakeAsync(()=>{
    fixture.detectChanges()//para iniciar a variavel e fucnional  on init
    let times = 0 ;
    component.liked.subscribe(()=>times++)
    component.like();
    component.like();//chama duas vezes, mas por ter um debounce a 2 vez não deve funcionar
    tick(500)//aguarda 500ms para testar
    expect(times).toBe(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@Output liked) two times when called outside debounce time)`,
  fakeAsync(()=>{
    fixture.detectChanges();
    let times=0;
    component.liked.subscribe(()=>times++)

    component.like();
    tick(500) //aguarda o processamento do debounce
    component.like();
    tick(500)//aguarda o processamento do debounce
    expect(times).toBe(2)
  }));

  //testando elemento do dom
  it(` (D)Should display number of liken whes (@Input likes) is incremented`,
  ()=>{
    fixture.detectChanges();//disparou ciclo de vida
    component.likes++;//incrementou  a variavel likes de forma direta
    //expect(component.likes).toBe(1)
    fixture.detectChanges();//para receber a a tualização da mudança do dom
    const element:HTMLElement= fixture.nativeElement.querySelector('.like-counter') //nativeElement é o acesso aos elementos do DOM
    expect(element.textContent.trim()).toBe('1')
  });

  //teste do aria-label
  it(`(D) Should update aria-label when (@Input likes) is incremented`,
  ()=>{
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element:HTMLElement=fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked')

  })

  //valor incicial do aria-labl
  it(`(D) Should have aria-label with 0 (@Input likes)`,
  ()=>{
    fixture.detectChanges();
    const element:HTMLElement=fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked')
  });

  it(`(D) Should display image with src and description when bond to properties`,()=>{
    const description ="some description"
    const src ="http://somesite.com.br"

    component.src=src;
    component.description=description;
    fixture.detectChanges();
    const img:HTMLElement=fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description);
  })
})
