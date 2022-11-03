import { UniqueIdService } from './unique-id.service';
//describe('Oatefato que vamos testar',função de teste){
//   it('condição de teste',(funcao de teste)=>)
// }
//nome do teste indicado
//#nomeMetodo should blabla when  blalbla

let service:UniqueIdService =null;
  beforeEach(()=>{//essa fun;acoa roda antes de cada chamada do it e tem como funcao garantiri que cada teste tenha seu proprio banco de dados
    service=new UniqueIdService();
  })

describe(UniqueIdService.name,()=>{
  it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should generate id when called with prefix`,()=>{
  //it('#generateUniqueIdWithPrefix should generate id when called with prefix',()=>{modou o nome para que cadso mude o nme já consiga mudar aqui

    const id=service.generateUniqueIdWithPrefix('app');
    //expect(id).toContain('app-')//teste muito generico
    expect(id.startsWith('app-')).toBeTrue();//teste muito generico
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should not generate duplicate IDs when called multiple times`,()=>{

    const ids=new Set();//função que não aceita valores repetidos
    for(let i=0;i<50;i++){
      ids.add(service.generateUniqueIdWithPrefix('app'))
    }
    expect(ids.size).toBe(50)



    // const firstId= service.generateUniqueIdWithPrefix('app');
    // const secondId= service.generateUniqueIdWithPrefix('app');
    // expect(firstId).not.toBe(secondId);//espero que os dois sejam diferentes
  })
  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name} should return the number of generateIds when Called`,()=>{

    service.generateUniqueIdWithPrefix('app')
    service.generateUniqueIdWithPrefix('app')
    expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
  })

  it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
  should throw when called with empty`,()=>{
    const emptyValues=[null,undefined,'','0','1'];
    emptyValues.forEach(emptyValue=>{
      expect(()=>service.generateUniqueIdWithPrefix(emptyValue))
        .withContext(`Empty value: ${emptyValue}`)//adiciona o texto da onde foi o erro dentro do for, nao precisando fazer um loop
        .toThrow();//O teste se recebeu erro Trow precisa ser rodado dentro de uma fun;ao
    });
    // expect(()=>service.generateUniqueIdWithPrefix('')).toThrow();//O teste se recebeu erro Trow precisa ser rodado dentro de uma fun;ao
    // expect(()=>service.generateUniqueIdWithPrefix(undefined)).toThrow();
    // expect(()=>service.generateUniqueIdWithPrefix(null)).toThrow();
  });

})
