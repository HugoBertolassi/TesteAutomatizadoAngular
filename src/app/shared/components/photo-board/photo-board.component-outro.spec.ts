import { PhotoBoardModule } from './photo-board.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoBoardComponent } from './photo-board.component';
import { Photo } from './interfaces/photo';
import { Component, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';

function buildPhotoList():Photo[]{
  const photos:Photo[]=[];
  for (let i=0;i<8;i++){
    photos.push({
      id:i+1,
      url:"",
      description:""
    })
  }
  return photos;
}

describe(PhotoBoardComponent.name,()=>{
  let fixture:ComponentFixture<PhotoBoardTestComponent>=null;
  let component:PhotoBoardTestComponent

  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      declarations:[PhotoBoardTestComponent],
      imports:[PhotoBoardModule],
    }).compileComponents()

  // fixture=TestBed.createComponent(PhotoBoardComponent)
  fixture=TestBed.createComponent(PhotoBoardTestComponent)
  component=fixture.componentInstance //armazena instancia que esta rodando
  });

  it('Should display rows and columns when (@Input photos) has value',()=>{
    component.photos=buildPhotoList()
    fixture.detectChanges();
    //por padrao o metodo ngonchange n'ao [e chamado] por isso vai ser chamado abaixo
    //forma 1 ngonchange no arquivophotoboard spec
    // const change:SimpleChanges={
    //   //changes sempre tem nome da input property que mudou
    //   photos: new SimpleChange([],component.photos,true)
    // }
    // component.ngOnChanges(change);
    //forma 2 esta no arquivo outro

    expect(component.board.rows.length)//adicona o board que [e o child do tete real]
      .withContext('Number of rows')
      .toBe(2)
    expect(component.board.rows[0].length)
      .withContext('Number of photos from the first row')
      .toBe(4);
      expect(component.board.rows[1].length)
      .withContext('Number of photos from the second row')
      .toBe(4)
  })
})

@Component({
  template:`
    <app-photo-board
    [photos]="photos">
    </app-photo-board>
  `
})
class PhotoBoardTestComponent{
  //pelo photoboard fazer parte de um template, toda vez que ele [e chamado ele vai rodar o ngOnchange
  @ViewChild(PhotoBoardComponent) public board:PhotoBoardComponent
  public photos:Photo[]=[];
}


