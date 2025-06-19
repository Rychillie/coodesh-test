# API com Integração de IA

API que analisa textos, fornece estatísticas básicas e utiliza inteligência artificial para detectar o sentimento do conteúdo.

## Tecnologias Utilizadas

- **Linguagem**: TypeScript/Node.js
- **Framework**: Express
- **Processamento de Linguagem Natural**: Natural.js
- **Integração de IA**: OpenAI API (GPT-3.5 Turbo)
- **Armazenamento**: Cache em memória
- **Documentação**: Swagger/OpenAPI

## Instalação

### Pré-requisitos

- Node.js (v14 ou superior)
- NPM ou Yarn
- Chave de API da OpenAI

### Passos para instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Rychillie/coodesh-test.git
   cd api-com-integracao-ia
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o arquivo `.env` com as seguintes variáveis:

   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

## Uso

Para utilizar a API, siga os passos abaixo:

1. **Iniciar o servidor**: Certifique-se de que o servidor está rodando.

   ```bash
   npm start
   ```

2. **Fazer uma requisição**: Utilize ferramentas como Postman ou cURL para enviar requisições para o endpoint.
   - **Endpoint**: `POST /analyze-text`
   - **Corpo da Requisição**:
     ```json
     {
       "text": "Seu texto aqui"
     }
     ```
   - **Resposta Esperada**:
     ```json
     {
       "wordCount": 100,
       "mostFrequentWords": ["exemplo", "texto"],
       "sentiment": "positivo"
     }
     ```

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

Certifique-se de substituir `your_openai_api_key` pela sua chave real da API OpenAI. Com essas adições, o `README.md` fornecerá uma visão completa do projeto e suas necessidades de configuração.
