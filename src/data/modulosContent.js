export const modulos = {
  1: {
    nome: "Interrupção",
    etapa: "I",
    aulas: [
      {
        id: 1,
        titulo: "O ciclo do jogo",
        duracao: "8 min",
        conteudo: [
          {
            tipo: "intro",
            texto:
              "O jogo online não é aleatório na forma como nos afeta. Ele foi projetado — com precisão — para manter você jogando.",
          },
          {
            tipo: "titulo",
            texto: "Como o ciclo se instala",
          },
          {
            tipo: "paragrafo",
            texto:
              "Todo comportamento compulsivo segue uma lógica: gatilho → impulso → ação → alívio temporário → culpa → novo gatilho. No jogo, esse ciclo é acelerado e amplificado pela tecnologia. A cada rodada, seu cérebro recebe uma descarga de dopamina — independente do resultado.",
          },
          {
            tipo: "destaque",
            texto:
              "Você não é fraco. Você está respondendo a um sistema desenhado para criar dependência.",
          },
          {
            tipo: "titulo",
            texto: "A ilusão de controle",
          },
          {
            tipo: "paragrafo",
            texto:
              'Uma das armadilhas mais poderosas do jogo é a sensação de que "desta vez vai ser diferente". Essa crença — chamada de viés do jogador — é automática. Não é escolha. É como o cérebro tenta encontrar padrões onde não existem.',
          },
          {
            tipo: "paragrafo",
            texto:
              "Reconhecer esse mecanismo não elimina o impulso imediatamente, mas cria algo valioso: uma fresta de consciência entre o gatilho e a ação.",
          },
          {
            tipo: "reflexao",
            pergunta: "Para refletir",
            texto:
              "Pense na última vez que jogou. O que aconteceu antes? Que emoção ou situação precedeu o impulso?",
          },
        ],
      },
      {
        id: 2,
        titulo: "O que alimenta o impulso",
        duracao: "10 min",
        conteudo: [
          {
            tipo: "intro",
            texto:
              "O impulso de jogar raramente vem do nada. Ele tem raízes — emocionais, situacionais, relacionais.",
          },
          {
            tipo: "titulo",
            texto: "Os três tipos de gatilho",
          },
          {
            tipo: "lista",
            itens: [
              {
                titulo: "Emocionais",
                descricao:
                  "Ansiedade, tédio, solidão, frustração, euforia. Estados internos que pedem alívio rápido.",
              },
              {
                titulo: "Situacionais",
                descricao:
                  "Estar sozinho, ter dinheiro disponível, ver anúncios, receber notificações de bônus.",
              },
              {
                titulo: "Relacionais",
                descricao:
                  "Conflitos em casa, pressão financeira, isolamento social — contextos que amplificam a vulnerabilidade.",
              },
            ],
          },
          {
            tipo: "paragrafo",
            texto:
              "Nenhum desses gatilhos é culpa sua. Mas identificá-los é o primeiro passo para interromper o ciclo antes que ele se complete.",
          },
          {
            tipo: "titulo",
            texto: "O papel da dopamina",
          },
          {
            tipo: "paragrafo",
            texto:
              "Seu cérebro libera dopamina não apenas quando você ganha — mas quando você está prestes a jogar. A antecipação é o verdadeiro vício. É por isso que mesmo sessões sem ganho algum podem ser difíceis de abandonar.",
          },
          {
            tipo: "destaque",
            texto:
              "Interromper o ciclo não é sobre força de vontade. É sobre criar condições que tornam o impulso mais difícil de seguir.",
          },
          {
            tipo: "reflexao",
            pergunta: "Para refletir",
            texto:
              "Quais dos três tipos de gatilho são mais frequentes para você? Há algum padrão de horário, situação ou emoção que aparece antes do impulso?",
          },
        ],
      },
      {
        id: 3,
        titulo: "A decisão de interromper",
        duracao: "7 min",
        conteudo: [
          {
            tipo: "intro",
            texto:
              "Interromper não significa vencer de uma vez. Significa fazer uma escolha consciente — agora.",
          },
          {
            tipo: "titulo",
            texto: "A pausa como ferramenta",
          },
          {
            tipo: "paragrafo",
            texto:
              "O método ISTOP começa com uma técnica simples e comprovada: a pausa de 15 minutos. Quando o impulso surgir, você não precisa resistir para sempre — só por 15 minutos.",
          },
          {
            tipo: "paragrafo",
            texto:
              "Nesse intervalo, o córtex pré-frontal — responsável pelo raciocínio — tem chance de reequilibrar a resposta emocional. A maioria dos impulsos perde intensidade significativa em menos de 10 minutos.",
          },
          {
            tipo: "destaque",
            texto:
              "Você não precisa resolver o problema todo. Só precisa atravessar os próximos 15 minutos.",
          },
          {
            tipo: "titulo",
            texto: "O que fazer nos 15 minutos",
          },
          {
            tipo: "lista",
            itens: [
              {
                titulo: "Mude de ambiente",
                descricao: "Saia do lugar onde o impulso surgiu, se possível.",
              },
              {
                titulo: "Mova o corpo",
                descricao:
                  "Uma caminhada curta ou exercício leve reduz a intensidade do impulso.",
              },
              {
                titulo: "Chame alguém",
                descricao:
                  "Falar com qualquer pessoa — sobre qualquer assunto — interrompe o ciclo.",
              },
              {
                titulo: "Respire",
                descricao:
                  "4 tempos inspirando, 4 retendo, 6 soltando. Repita 3 vezes.",
              },
            ],
          },
          {
            tipo: "paragrafo",
            texto:
              "Ao final desta aula, você será convidado a assinar o Contrato de Interrupção — um compromisso formal consigo mesmo para aplicar essa pausa sempre que o impulso surgir.",
          },
          {
            tipo: "reflexao",
            pergunta: "Antes de continuar",
            texto:
              "Você está pronto para formalizar seu compromisso com a interrupção? O próximo passo é o Contrato — leia com atenção.",
          },
        ],
      },
    ],
    proximoPasso: {
      tipo: "contrato",
      label: "Assinar o Contrato de Interrupção",
      rota: "/contrato",
    },
  },
};
