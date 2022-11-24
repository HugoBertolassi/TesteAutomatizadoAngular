import { PhotoBoardModule } from './photo-board.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoBoardComponent } from './photo-board.component';
import { Photo } from './interfaces/photo';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { buildPhotoList } from './test/build-photo-list';



describe(PhotoBoardComponent.name,()=>{
  let fixture:ComponentFixture<PhotoBoardComponent>=null;
  let component:PhotoBoardComponent

  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      imports:[PhotoBoardModule],
    }).compileComponents()

  fixture=TestBed.createComponent(PhotoBoardComponent)
  component=fixture.componentInstance //armazena instancia que esta rodando
  });

  it('Should display rows and columns when (@Input photos) has value',()=>{
    component.photos=buildPhotoList()
    fixture.detectChanges();
    //por padrao o metodo ngonchange n'ao [e chamado] por isso vai ser chamado abaixo
    //forma 1 ngonchange
    const change:SimpleChanges={
      //changes sempre tem nome da input property que mudou
      photos: new SimpleChange([],component.photos,true)
    }
    component.ngOnChanges(change);
    //forma 2 esta no arquivo outro

    expect(component.rows.length)
      .withContext('Number of rows')
      .toBe(2)
    expect(component.rows[0].length)
      .withContext('Number of photos from the first row')
      .toBe(4);
      expect(component.rows[1].length)
      .withContext('Number of photos from the second row')
      .toBe(4)
  })
})
