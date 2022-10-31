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
npm install karma-firefox-launcher --save-dev
verificar se o karma firefox esta no packge.json, se não estiver rodar o comando novamente acima
adicionar no karma.config> 
  em plugin : require('karma-firefox-launcher'), embaixo do crhom
  em browswer: adicionar Firefox dentro do array ao lado do crhome

8-teste assicrono
pode usar um boservable coma função done reservada do jasmine e dependedo do cado pode-se usar o metodo
spyOn que encapsulara o evento

9-Contrlar o navegador de teste
  em packe-json> script> 
    criar  "test-commom": "ng test  --watch=false --browsers Chrome,Firefox" abaixo de test

10-Criando custom launcher
  Serve para controlar o momento de inicialização do browser, podendo passar parametros u controlando variavel
  em karma config> customLaunchers:{
    FirefoxSemCabeca{
      base:'Firefox',
      flags:['-headless']
    }
  }

11-instalando report 
npm install -D karma-junit-reporter@2.0.1
adicionar no Karma.config em plugin
  require(’karma-junit-reporter’)
para adicionar no teste deve colocolar --reporters junit na chamada da execção dentro do teste

12-cobertura de teste do codigo
  criar dentro do ts config tipo de execução
    "test-coverage":"ng test --watch=false --sourceMap=true --codeCoverage=true --browsers ChromeHeadless",
  vai retornar 
    =============================== Coverage summary ===============================
    Statements   : 100% ( 27/27 )  
    Branches     : 100% ( 6/6 )   //mostra a quantidade e se passou por todos os ifs
    Functions    : 100% ( 6/6 )   //mostra a quantidade de funções e metodos que foram testados
    Lines        : 100% ( 24/24 ) //Quantidade de linhas que estão sendo testadas no código
  
  Por não ter muitos dados no relatorio acima, é criada uma pasta dentro da pasta do porjeto chamada coverage
  Nesta pasta tem um arquivo indexHtml que mostra os teste e mostra o html da onde não foi testado




