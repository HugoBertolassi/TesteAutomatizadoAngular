import { PhotoBoardMockService } from './../../shared/components/photo-board/services/photo-board-mock.service';
import { PhotoBoardService } from './../../shared/components/photo-board/services/photo-board.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PhotoListModule } from './photo-list.module';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoListComponent } from './photo-list.component';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { of, Observable } from 'rxjs';
import { Photo } from 'src/app/shared/components/photo-board/interfaces/photo';

describe(PhotoListComponent.name + 'Mock Provider',()=>{
  let fixture:ComponentFixture<PhotoListComponent>
  let component:PhotoListComponent;


  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      imports:[
        PhotoListModule,
        HttpClientModule
      ],
      providers:[{
        provide:PhotoBoardService,
        //use value [e para consumir diretamente a propriedeade]
        // useValue:{
        //   getPhotos():Observable<Photo[]>{
        //     return of(buildPhotoList())
        //   }
        // }

        //useclass [e usado para consumir somente uma funcao do servico mock criado para substituir o consumo do que tem muitos metodos
        useClass:PhotoBoardMockService
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;

  });

  //validacao se o componente foi criado
  it('Should create component',()=>{
    expect(component).toBeTruthy();
  });

  //teste para ver se as fotos foram carregadas no Dom. Tem que ativar o spy, visto que n'ao devemos testar o servi;o nesse teste

  it(`(D) Should display board when data arrives`,()=>{
    const photos =buildPhotoList();
    //escuta o metodo
    fixture.detectChanges();
    const board =fixture.nativeElement.querySelector('app-photo-board')
    const loader=fixture.nativeElement.querySelector('.loader')

    expect(board).not.toBeNull()
    expect(loader).toBeNull()
  });


});
