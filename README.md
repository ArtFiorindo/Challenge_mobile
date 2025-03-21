# OnData - Sistema de Cadastro de Pacientes

OnData é uma aplicação móvel para cadastro de pacientes, desenvolvida em React Native. O aplicativo permite cadastrar, editar, excluir e visualizar os detalhes de pacientes de forma prática e eficiente. Este projeto faz uso de componentes customizados, validações de formulários, e navegação entre telas para criar uma experiência de usuário intuitiva.

---

## Sumário

- [Equipe](#equipe)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Backend](#configuração-do-backend)
- [Configuração do Frontend](#configuração-do-frontend)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Componentes](#componentes)
- [Validações de Formulário](#validações-de-formulário)
- [Tecnologias Usadas](#tecnologias-usadas)
- [Atualizações Recentes](#atualizações-recentes)

---


## Equipe
> Artur Lopes Fiorindo » 53481


> Eduardo Felipe Nunes Função » 553362 


> Jhoe Yoshio Kochi Hashimoto 553831



---

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [JSON Server](https://github.com/typicode/json-server) (para simular uma API REST)
- Editor de código, como o [VSCode](https://code.visualstudio.com/)

---

## Instalação

### 1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/OnData.git
cd OnData
```

### 2. Instale as dependências do projeto:

```bash
yarn add install
```

### 3. Instale o JSON Server globalmente (caso não tenha):

```bash
npm install -g json-server
```

---

## Configuração do Backend

Para simular o backend, utilizaremos o JSON Server.

1. Execute o JSON Server para iniciar a API de exemplo:

```bash
json-server --watch db.json --port 3000
```
 ou
```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

---

## Configuração do Frontend

### Configuração do Expo

Certifique-se de que o Expo está instalado e configurado corretamente.

### Executando o Projeto

1. Com o JSON Server rodando, inicie o aplicativo com o Expo:

```bash
yarn start
```

2 Aperte W dentro do terminal para rodar a aplicação no seu navegador WEB ou no seu emulador


---

## Uso

1. **Login**: Acesse o sistema utilizando seu email e senha.
2. **Cadastro de Pacientes**: Preencha o formulário com os dados do paciente e clique em "Adicionar Paciente".
3. **Editar Paciente**: Clique no botão "Editar" ao lado do nome do paciente, faça as alterações e salve.
4. **Excluir Paciente**: Clique no botão "Excluir" para remover o paciente da lista.
5. **Detalhes do Paciente**: Clique no nome do paciente para visualizar seus detalhes.

---

# Estrutura do Projeto 

```plaintext
OnData/
├── assets/                         # Imagens e ícones
├── src/                            # Código-fonte principal do aplicativo
│   ├── components/                 # Componentes reutilizáveis
│   │   ├── AdicionarPaciente.tsx   # Formulário de cadastro e edição de pacientes
│   │   ├── ListaPacientes.tsx      # Lista de pacientes cadastrados
│   │   ├── Footer.tsx              # Componente de rodapé
│   │   ├── Header.tsx              # Componente de cabeçalho
│   │   ├── Layout.tsx              # Layout base para a aplicação, estrutura geral da tela
│   │   └── PacienteItem.tsx        # Item de paciente individual na lista
│   ├── hooks/                      # Hooks customizados
│   │   └── EstadoGlobal.tsx        # Hook de estado global para gerenciar dados entre componentes
│   ├── navigation/                 # Configurações de navegação
│   │   ├── AppNavigator.tsx        # Configuração de navegação do aplicativo
│   │   └── types.ts                # Tipos utilizados na navegação
│   ├── screens/                    # Telas principais da aplicação
│   │   ├── CadastroPacienteScreen.tsx   # Tela de cadastro de pacientes
│   │   ├── ConfiguracaoScreen.tsx       # Tela de configurações do aplicativo
│   │   ├── DetalhesPacienteScreen.tsx   # Tela de detalhes do paciente
│   │   ├── LoginScreen.tsx              # Tela de login do usuário
│   │   ├── HomeScreen.tsx               # Tela inicial do aplicativo
│   │   ├── RegisterScreen.tsx           # Tela de registro de novos usuários
│   │   ├── PerfilUsuarioScreen.tsx      # Tela para editar e configura informacões como email e senha
│   │   └── ResetPasswordScreen.tsx      # Tela de redefinição de senha
├── .gitignore                      # Arquivo para ignorar arquivos/pastas no Git
├── App.tsx                         # Arquivo principal do aplicativo, ponto de entrada
└── README.md                       # Documentação do projeto
```



---

## Funcionalidades

- **Autenticação de Usuários**: Sistema de login e cadastro usando email e senha.
- **Redefinição de Senha**: Possibilidade de redefinir a senha através do email cadastrado.
- **Cadastrar Pacientes**: Adicione novos pacientes preenchendo os campos obrigatórios do formulário.
- **Editar Pacientes**: Edite os dados dos pacientes previamente cadastrados.
- **Excluir Pacientes**: Remova pacientes da lista.
- **Visualizar Detalhes**: Visualize informações detalhadas sobre o paciente.
- **Validação de Formulário**: O formulário impede o envio se todos os campos obrigatórios não estiverem preenchidos.
- **Formatação Automática**: O CPF e a Data de Nascimento são formatados automaticamente durante a digitação.
- **Navegação via Footer**: Acesso rápido às principais telas através do rodapé navegável.

---

## Componentes

- **LoginScreen**: Tela de autenticação de usuários usando email e senha.
- **RegisterScreen**: Cadastro de novos usuários no sistema.
- **ResetPasswordScreen**: Redefinição de senha através do email cadastrado.
- **AdicionarPaciente**: Componente responsável pelo formulário de cadastro e edição.
- **ListaPacientes**: Lista de todos os pacientes cadastrados.
- **PacienteItem**: Exibe informações resumidas do paciente e permite editar ou excluir.
- **DetalhesPacienteScreen**: Tela para visualização detalhada dos dados de um paciente.
- **Footer**: Componente de navegação inferior presente em todas as telas.

---

## Validações de Formulário

- **Validação de Email**: O sistema verifica se o formato do email é válido ao fazer login ou cadastro.
- **Validação de Senha**: Verifica se as senhas coincidem durante o cadastro ou redefinição.
- **Campos obrigatórios**: O modal exibe uma mensagem de erro se algum campo obrigatório estiver vazio.
- **Formatação de CPF**: A formatação do CPF adiciona automaticamente pontos e traço, permitindo apenas 11 dígitos.
- **Formatação de Data de Nascimento**: A formatação da data de nascimento adiciona automaticamente as barras (`/`), permitindo apenas 8 dígitos.

---


## Tecnologias Usadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [JSON Server](https://github.com/typicode/json-server)
- [NativeBase](https://nativebase.io/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [JWT](https://github.com/auth0/node-jsonwebtoken)

---

## Atualizações Recentes

### Sistema de Autenticação (Março 2025)

- **Login baseado em Email**: Implementação de autenticação usando email e senha em vez de nome de usuário.
- **Redefinição de Senha**: Adição de funcionalidade para redefinir senha quando esquecida.
- **Token JWT**: Implementação de autenticação via tokens JWT para maior segurança.
- **AsyncStorage**: Utilização de AsyncStorage para persistir a sessão do usuário.
- **Criptografia de Senha**: Uso de bcrypt para armazenar senhas de forma segura no banco de dados.
- **Login Social**: Adição de opções para login via Google e Apple (implementação pendente).

### Modernização da Interface (Março 2025)

- **Design com Cards**: Implementação de cards mais definidos e arredondados para melhor visualização dos conteúdos.
- **Footer Navegável**: Adição de um rodapé de navegação consistente em todas as telas para facilitar o acesso às principais funcionalidades.
- **Elementos Visuais**: Inclusão de elementos decorativos como círculos de fundo para criar uma experiência visual mais agradável.
- **Ícones**: Incorporação de ícones intuitivos usando a biblioteca React Native Vector Icons para melhorar a usabilidade.
- **Paleta de Cores**: Manutenção da identidade visual baseada nas cores originais (#8C82FC, #E2E0FF) com ajustes de contraste para melhor legibilidade.
- **Cards Interativos**: Melhoria na interatividade dos cards com efeitos visuais de feedback ao toque.
- **Formulários Modernizados**: Reformulação dos formulários para uma experiência mais intuitiva e agradável.
