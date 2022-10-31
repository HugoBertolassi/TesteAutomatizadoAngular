import { LikeWidgetModule } from './like-widget.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { UniqueIdService } from './../../services/unique-id/unique-id.service';
import { LikeWidgetComponent } from './like-widget.component';


describe(LikeWidgetComponent.name,()=>{
  let fixture: ComponentFixture<LikeWidgetComponent> =null;//cria um wrapper do componente que traz os metodos do componente e outras funções
  let component:LikeWidgetComponent=null;
  //função de carregamento dos teste
  beforeEach(async ()=>{
    //component= new LikeWidgetComponent(new UniqueIdService)//se nao colocar o servico da erro, porque o componente depende dele para rodar
    await TestBed.configureTestingModule({//para não depender do servico e o angular resolver sozinho é ccriado esse m´tdo
      //declarations:[LikeWidgetComponent],
      //providers:[UniqueIdService],//por termos craido esse provider no modle, ele exige quando criuar o modulo de teste
      //imports:[FontAwesomeModule]

      imports:[LikeWidgetModule],//é possivelsubstituir as linhas acima pela imortação do modulo, porem ele tem que ser criado e configurado
      //providers:[{provide:ComponentFixtureAutoDetect, useValue:true}]//NAO RECOMENDADO, porém ativa a auto detectão do ChangeDetection(ng oninit) e forma auomatica
    }).compileComponents();

    fixture=TestBed.createComponent(LikeWidgetComponent);
    component =fixture.componentInstance;
  })

  it("Should Create Component",()=>{
    //const component =fixture.componentInstance;
    expect(component).toBeTruthy()
  });

  it(`Should auto generate ID when id input property is missing`,()=>{
    //const component =fixture.componentInstance;
    fixture.detectChanges();//sem esse comando não roda o ng on init do componente
    expect(component.id).toBeTruthy()
  });

  it(`should NOT generate ID when id input property is present`,()=>{
   // const component =fixture.componentInstance;
    const someId='someId';
    component.id=someId;
    fixture.detectChanges();//sem esse comando não roda o ng on init do componente, mecanismo de changeDetection

    expect(component.id).toBe(someId)
  });

  //teste de output property, este output depende de uma ação do usuario
  // it(`#${LikeWidgetComponent.prototype.like.name} should trigger emission when called`,done=>{ //quando for realizar teste assincrono colocar uma função para receber o observable
  //   fixture.detectChanges();
  //   //teste 1 de aguardadr e receber o subscribe
  //   component.liked.subscribe(()=>{
  //     expect(true).toBeTrue()
  //     done()
  //   });
  //   component.like();

  // });
    //teste de output property, este output depende de uma ação do usuario
    it(`#${LikeWidgetComponent.prototype.like.name} should trigger emission when called`,()=>{ //quando for realizar teste assincrono colocar uma função para receber o observable
      spyOn(component.liked,'emit')//recebe o objeto e valida o teste e passa seu resultad para o jasmine
      fixture.detectChanges();
      //teste 2: componente testadoser um emmiter
      component.like()
      expect(component.liked.emit).toHaveBeenCalled()//

    });
})
