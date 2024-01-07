import { Injectable } from '@angular/core'; // Importa o decorador Injectable de @angular/core, usado para fornecer injeção de dependência ao serviço.
import { HttpClient } from '@angular/common/http'; // Importa o módulo HttpClient para fazer requisições HTTP.
import { Observable } from 'rxjs'; // Importa a classe Observable do pacote rxjs para trabalhar com fluxos de dados assíncronos.
import { DataIsland } from '../models/dataIsland'; // Importa o modelo DataIsland que representa a estrutura dos dados da ilha.
import { environment } from 'src/environments/environment'; // Importa o environment para acessarmos as variaveis de ambiente

@Injectable({
  providedIn: 'root' // Marca a classe do serviço como injetável em todo o aplicativo (root), permitindo injeção em outros componentes e serviços sem definição explícita em um módulo.
})
export class GetDataIslandService {
  private dataUrl: string = environment.dataIsland; // URL para obter os dados da ilha a partir do arquivo de ambiente.

  constructor(private http: HttpClient) {} // Inicializa o serviço com o HttpClient para realizar requisições HTTP.

  // Método para obter dados da ilha como um Observable do tipo Any.
  getIslandData(): Observable<any> {
    return this.http.get<DataIsland>(this.dataUrl); // Faz uma requisição GET para a URL especificada, esperando dados do tipo DataIsland.
  }
}
