Olá segue algumas instruções para poder visualizar o projeto:

Utilizei o pré-processador SASS para compilar o CSS, para isso instalei uma extensão em meu VScode chamada "Live Sass Compiler", Talves seja necessário baixá-la.

Fiz uso do json server para simular uma ApiRest, será necessário baixar o json server e executar o comando "json-server --watch db.json" (no cmd) no diretório que contém o arquivo db.json. Após executar esse comando vc estará iniciando a api do sistema.

Vale ressaltar que utilizei no projeto:
- jquery
- plugin jquery mask (para colocar máscara nos campos solicitados)
- plugin highly customizable jquery Toast (para gerar um pop-up com feedback da requisição)

O projeto não está completo pois tive algumas dificuldades, segue alguns requisitos obrigatórios que faltaram: 

- infelismente eu não consegui listar os documentos na lateral direita. A requisição e feita com sucesso e eu tenho acesso aos dados porém não consegui achar uma maneira de preencher o card(modelo) com os dados. 

- No momento que clicamos no botão criar documento estou tendo como retorno o status code 304, mas quando executo o debug a requisição funciona normalmente e o documento e salvo no banco.

As demais coisas que faltaram são decorrentes dos problemas citados acima;  

