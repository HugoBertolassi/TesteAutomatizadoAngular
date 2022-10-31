Projeto do curso Angular: testes automatizados com Jasmine e Karma
Com foco em testes automatizados

////////////
Comandos e dicas 
1-Rodar npm i--
2-Angular usa como padrao jasmine como testador
  nome do teste deve ser blabla should blablabla when blablabla 
3-describe(UniqueIdService.name,()=>{
  it('#generateUniqueIdWithPrefix should generate id when called with prefix',()=>{
    const service=new UniqueIdService();
    const id=service.generateUniqueIdWithPrefix('app');
    expect(id).toContain('app-')
  });

})
  A função expect recebe como primeiro parâmetro o valor que desejamos comparar com o valor esperado.

3-Karma é um framework de teste  criado pela equipe do angular
  para rodar rodar comadno npm run test

4-tipo de validacao de true
expect(true).toBeTrue();//soa aceira valor literal true 
expect(true).toBe(true);//compara os valores dentro da funcao, e a referencia de memoria tambem deve ser a mesma
expect(true).toBeTruthy();//valida se eh true ou sem tem informa;ao sendo validado pela regra de validacao do javascript
5-testbed
  função do angular que cria um modulo e sintancias necessarias para realizar o teste gratidondo o fluxo de vida do objeto de teste, resolvendo as dependencias
6-Test  first ou test legacy


7-Intalação de teste do firefox
nstalar ambiente de desenvovimento
npm install -D
adicionar no karma.config> 
  em plugin : require('karma-firefox-launcher'), embaixo do crhom
  em browswer: adicionar Firefox dentro do array ao lado do crhome

8-teste assicrono
pode usar um boservable coma função done reservada do jasmine e dependedo do cado pode-se usar o metodo
spyOn que encapsulara o evento


