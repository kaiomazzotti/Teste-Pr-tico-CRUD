# Teste-Pr-tico-CRUD

Executando Via Docker

1 -  Instalar o Docker Desktop (Windows/Mac) *Linux não precisa.
2 -  Abrir o Docker Desktop.
3 -  Rodar o arquivo ‘script DOCKER.bat’ que está na raiz do projeto.
4 -  Acessar http://localhost:8080/.


Executando Via Visual Studio

1 -  Abrir “appsettings.json” e trocar a DefaultConnection (que está configurado para o docker) para :  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=EstabelecimentosDB;Trusted_Connection=True;MultipleActiveResultSets=true"

2 -  Executar no terminal da raiz do projeto o comando : RUN dotnet ef database update

3 -  Buildar e Startar a aplicação.
