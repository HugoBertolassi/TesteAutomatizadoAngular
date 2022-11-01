import { ActionDirectiveModule } from './action.module';
import { TestBed } from '@angular/core/testing';
import { ActionDirective } from './action.directive';


//por ser diretiva não precisa deixar assincrono ou colocar compileComponents, ms funciona e pode ser utilizado como regra geral de uso
describe(ActionDirective.name,()=>{
  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      imports:[ActionDirectiveModule]
    }).compileComponents();
  })
})
