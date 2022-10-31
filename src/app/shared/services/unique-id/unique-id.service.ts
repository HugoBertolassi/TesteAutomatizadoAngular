import { Injectable } from "@angular/core";
import {v4 as uuidv4} from 'uuid'//bibliteca de geração de id na versao 4

@Injectable()
export class UniqueIdService{
  private numberOFGenerateIds=0;
  private validId = /^[A-Za-z]+[\w\-\:\.]*$/;//expressao regular que testa se inicai letra maisucula, e tem hifen

  public generateUniqueIdWithPrefix(prefix:string):string{

    if(!prefix || !this.validId.test(prefix)){
    //if(!prefix){ teste sem validar os numero
      throw Error('Prefix can not be empty')
    }

    const uniqueId=this.generateUniqueId();
    this.numberOFGenerateIds++;

    return `${prefix}-${uniqueId}`
  }

  public getNumberOfGeneratedUniqueIds():number{
    return this.numberOFGenerateIds;
  }

  private generateUniqueId():string{
    const id=uuidv4();
    //console.log(id)
    return id;//gera um uuuida unico no projeto
  }
}
