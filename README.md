# 🎮 Mini Game

Uma aventura clássica de plataforma 2D construída com **React**, **TypeScript** e **Canvas API**. Inspirado no estilo icônico de Super Mario, este projeto demonstra uma arquitetura de jogo modular e performática em um ambiente web moderno.

---

## 🚀 Sobre o Projeto

O **Super Mario Mini** é um jogo de plataforma side-scrolling que foca em jogabilidade fluida, animações dinâmicas e uma estrutura de código limpa. O jogo foi desenvolvido para ser escalável, permitindo a fácil adição de novos níveis, inimigos e mecânicas.

### 🌟 Principais Características

- **Níveis Dinâmicos**: 5 níveis únicos com progressão de dificuldade.
- **Sistema de Física Customizado**: Gravidade, inércia, fricção e detecção de colisão precisa.
- **Inimigos Inteligentes**: Vilões que patrulham plataformas e reagem às bordas.
- **Animações de Personagem**: Movimentação detalhada das pernas ao andar e efeitos visuais ao pular.
- **Ambiente Vivo**: Céu dinâmico com nuvens em movimento e efeitos de partículas.
- **Sistema de Vidas e Pontuação**: Colete moedas para pontos e corações para recuperar vida.
- **Interface Moderna**: HUD elegante e telas de transição animadas com `framer-motion`.

---

## 🛠️ Arquitetura e Tecnologias

O projeto foi refatorado para seguir padrões profissionais de desenvolvimento de jogos:

- **React 18**: Gerenciamento de estado e interface do usuário.
- **Canvas API**: Renderização de alta performance para o mundo do jogo.
- **TypeScript**: Tipagem estrita para garantir robustez e evitar erros em tempo de execução.
- **Tailwind CSS**: Estilização moderna e responsiva da interface (HUD e Overlays).
- **Framer Motion**: Animações suaves para elementos de UI.
- **Lucide React**: Ícones consistentes e leves.

### 📂 Estrutura Modular

Para manter o código organizado e fácil de manter, a lógica foi separada em:

- `src/hooks/useGameEngine.ts`: Gerencia o loop principal (`requestAnimationFrame`) e o estado da câmera.
- `src/utils/physics.ts`: Lógica pura de física e regras de colisão.
- `src/utils/renderer.ts`: Responsável exclusivamente pelo desenho dos elementos no Canvas.
- `src/components/`: Componentes React isolados para HUD e Overlays de interface.
- `src/constants.ts`: Centralização de configurações (gravidade, velocidades, dados dos níveis).
- `src/types.ts`: Definições globais de interfaces e tipos.

---

## 🎮 Como Jogar

O objetivo é simples: chegue à bandeira no final de cada nível sem perder todas as suas vidas!

### Controles:
- **Setas / WASD**: Movimentar para esquerda e direita.
- **Espaço / Seta para Cima / W**: Pular.
- **Dica**: Pule em cima dos vilões para eliminá-los e ganhar pontos extras!

### Regras:
- Você começa com **3 vidas**.
- Cair em buracos ou ser tocado por um vilão custa **1 vida**.
- Se perder todas as vidas, é **Game Over** e você volta ao primeiro nível.
- Colete **Corações** (1 por nível) para recuperar vidas perdidas.
- Colete **Moedas** para aumentar sua pontuação.

---

## 🛠️ Desenvolvimento

Se você deseja explorar o código ou adicionar suas próprias funcionalidades:

1. **Instalação**: `npm install`
2. **Execução**: `npm run dev`
3. **Build**: `npm run build`

---

## 📝 Licença

Este projeto está sob a licença **Apache-2.0**. Sinta-se à vontade para explorar, modificar e aprender com o código!

---

