import { PhotoBoardService } from './../../shared/components/photo-board/services/photo-board.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PhotoListModule } from './photo-list.module';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoListComponent } from './photo-list.component';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { of } from 'rxjs';

describe(PhotoListComponent.name,()=>{
  let fixture:ComponentFixture<PhotoListComponent>
  let component:PhotoListComponent;
  let service:PhotoBoardService

  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      imports:[
        PhotoListModule,
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;

    service=TestBed.inject(PhotoBoardService);
  });

  //validacao se o componente foi criado
  it('Should create component',()=>{
    expect(component).toBeTruthy();
  });

  //teste para ver se as fotos foram carregadas no Dom. Tem que ativar o spy, visto que n'ao devemos testar o servi;o nesse teste

  it(`(D) Should display board when data arrives`,()=>{


    const photos =buildPhotoList();
    //escuta o metodo
    spyOn(service,'getPhotos')
      .and.returnValue(of(photos));//coloca o of pq o metodo [e um obsevable]

    fixture.detectChanges();
    const board =fixture.nativeElement.querySelector('app-photo-board')
    const loader=fixture.nativeElement.querySelector('.loader')

    expect(board).not.toBeNull()
    expect(loader).toBeNull()
  });

  it(`(D) Should display loader while waiting for data`,()=>{


    const photos =buildPhotoList();
    //escuta o metodo
    spyOn(service,'getPhotos')
      .and.returnValue(of(null));//coloca o of pq o metodo [e um obsevable]

    fixture.detectChanges();
    const board =fixture.nativeElement.querySelector('app-photo-board')
    const loader=fixture.nativeElement.querySelector('.loader')

    expect(board).withContext(`Should not display board`).toBeNull()
    expect(loader).withContext(`Should display loader`).not.toBeNull()
  });



});
