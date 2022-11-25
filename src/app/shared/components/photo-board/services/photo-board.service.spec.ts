import { TestBed } from '@angular/core/testing';
import { PhotoBoardService } from './photo-board.service';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
//HttpClientTestingModule sobreescreve as requisi;oes http

const mockData = {
  api:'http://localhost:3000/photos',
  data:[
    {
      id:1,
      description:'example 1',
      src:''
    },
    {
      id:2,
      description:'example 2',
      src:''
    }
  ]
}

describe(PhotoBoardService.name,()=>{
  let service:PhotoBoardService
  let httpController:HttpTestingController;

  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PhotoBoardService]
    }).compileComponents();

    service =TestBed.inject(PhotoBoardService)
    httpController=TestBed.inject(HttpTestingController)
  })

  //verifica apos cada execucao, verifica se tem alguma solicitacao aberta. Valida se alguma requisicao https nao foi feita
  afterEach(()=>httpController.verify())


  //teste com done informa que [e assincrono]
  it(`#${PhotoBoardService.prototype.getPhotos.name} should return photos with description in uppercase`,done=>{
    service.getPhotos().subscribe(photos=>{
      expect(photos[0].description).toBe('EXAMPLE 1');
      expect(photos[1].description).toBe('EXAMPLE 2');
      done();
    });
    //pegando o dado mockado
    //http controller eh colocado porque o valor acima eh assincrono e espera o resultado da parte de baixo
    //controller dispara
    httpController.expectOne(mockData.api).flush(mockData.data)//flushtroca o valor recebido pelo outro

  })
})
