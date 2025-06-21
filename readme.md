# Guia de Uso do Thunder

<div align="center">

![Thunder Logo](public/icons/png/512x512.png)

**Uma ferramenta de apoio para designers aplicarem o processo Thunder**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue.svg)](https://github.com/caionunespn/thunder-user-guide/releases/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Electron](https://img.shields.io/badge/Electron-191970?style=flat&logo=electron&logoColor=white)](https://www.electronjs.org/)

</div>

## 📖 Sobre o Projeto

O **Guia de Uso do Thunder** é uma ferramenta de apoio desenvolvida para facilitar a aplicação prática do processo Thunder, que visa a criação de visualizações musicais focadas na comunicação emocional da música.

Esta ferramenta foi estruturada como um ambiente interativo que reúne:
- 📝 Funcionalidades de documentação e acompanhamento
- 📚 Artigos e materiais didáticos

Mais do que um repositório, o guia oferece suporte operacional e conceitual em todas as fases do processo — da **Conceitualização** à **Avaliação** — permitindo que os usuários documentem decisões, acessem materiais complementares e mantenham um histórico estruturado de seu projeto.

## ✨ Funcionalidades Principais

### 📋 Gestão de Projetos
- **Registro de decisões musicais e emocionais** - Documentação de associações musicais, mapas de Cowen e segmentação temporal
- **Registro de decisões estéticas** - Escolhas de cor e estilo visual
- **Acompanhamento de feedback** - Registro de sessões de feedback com critérios de conclusão
- **Documentação de testes** - Registro de testes de laboratório e campo seguindo o framework DECIDE

### 🎨 Gestão de Mídia
- **Upload de arquivos** - Suporte a imagens, vídeos e áudios
- **Painéis temáticos** - Organização em moodboards, esboços e protótipos
- **Visualização integrada** - Acesso rápido a todas as referências do projeto

### 📊 Acompanhamento e Relatórios
- **Feedback de progresso** - Indicadores visuais de conclusão de cada fase
- **Exportação em PDF** - Geração de relatórios consolidados

### 🌐 Acessibilidade
- **Múltiplos idiomas** - Interface em português e inglês
- **Ajuste de fonte** - Controle do tamanho da tipografia
- **Design responsivo** - Interface clara e navegação consistente

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Framework principal para a interface
- **TypeScript** - Tipagem estática para maior robustez
- **Tailwind CSS** - Estilização utilitária
- **React Router** - Navegação entre páginas

### Desktop
- **Electron** - Framework para aplicação desktop multiplataforma
- **Electron Store** - Armazenamento local persistente

## 🚀 Instalação e Uso

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **Yarn** ou **npm**

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/caionunespn/thunder-user-guide.git
   cd thunder-user-guide
   ```

2. **Instale as dependências**
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Execute em modo de desenvolvimento**
   ```bash
   yarn dev
   # ou
   npm run dev
   ```

   > **⚠️ Nota:** No modo de desenvolvimento, imagens e vídeos podem não carregar corretamente. Para visualizar mídia completa, utilize a versão de produção.

### Build para Produção

```bash
# Build para todas as plataformas
yarn build:all

# Build específico
yarn build
```

## 📱 Plataformas Suportadas

- **Windows** - Instalador NSIS e versão portable
- **macOS** - DMG e ZIP
- **Linux** - AppImage e DEB

## 🎯 Processo Thunder

O Thunder é um processo de Design para criação da visualizações musicais estruturado em 3 fases:

1. **Conceitualização** - Definição de conceitos musicais e emocionais
2. **Prototipação** - Desenvolvimento de esboços e protótipos 
3. **Avaliação** - Testes e refinamento baseado em feedback de designers e público

Cada fase é documentada e acompanhada pela ferramenta, garantindo que nenhuma etapa seja negligenciada.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NewFeature`)
3. Commit suas mudanças (`git commit -m 'Add some NewFeature'`)
4. Push para a branch (`git push origin feature/NewFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores

- **Caio Nunes** - [caionunespn@gmail.com](mailto:caionunespn@gmail.com)
- **Ticianne Darin** - Orientadora

## 🙏 Agradecimentos

- Isabelle Reinbold e Mariana Rangel pela parceria na primeira fase do Thunder e aplicação preliminar dele
- Usuários que participaram das diversas fases de avaliação do processo
- Especialistas que participaram da avaliação do processo
- Contribuidores do projeto

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- Abra uma [issue](https://github.com/caionunespn/thunder-user-guide/issues)
- Entre em contato: [caionunespn@gmail.com](mailto:caionunespn@gmail.com)