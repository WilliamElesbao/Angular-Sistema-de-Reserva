import { Injectable } from '@angular/core'; // Importa o decorador Injectable de @angular/core, que é usado para fornecer a injeção de dependência ao serviço.
import { HttpClient } from '@angular/common/http'; //Importa o módulo HttpClient, que é usado para fazer requisições HTTP.
import { Observable } from 'rxjs'; //Importa a classe Observable do pacote rxjs, que é usada para trabalhar com fluxos de dados assíncronos.
import { DataIsland } from '../models/dataIsland'// Importa o modelo DataIsland que pode representar a estrutura dos dados da ilha.
import { environment } from 'src/environments/environment'

// Decorator que marca a classe do serviço como injetável em todo o aplicativo (root), permitindo que seja injetado em outros componentes e serviços sem a necessidade de definição explícita em um módulo.
@Injectable({
  providedIn: 'root'
})
export class GetDataIslandService {
  private dataUrl: string = environment.dataIsland

  constructor(private http: HttpClient) {}

  getIslandData(): Observable<any>{
    return this.http.get<DataIsland>(this.dataUrl)

  }
}

