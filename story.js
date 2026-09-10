/* ==================== HISTÓRIA E CAPÍTULOS EXPANDIDOS ==================== */

function iniciarCapitulo1() {
  atualizarListaGeral();

  pushMsg('tomas', 'received', 'Aí ' + playerName + ', viste as notícias de hoje? Está um temporal horrível lá fora.', null, () => {
    pushMsg('tomas', 'received', 'Fica em casa descansado. Amanhã combinamos aquele café.', null, () => {
      
      pushMsg('ines', 'received', 'Ei!! ' + playerName + '! Estás a ver o grupo da faculdade? Dizem que a Marta não aparece há 24 horas!', null, () => {

        pushMsg('carolina', 'received', 'Desculpa incomodar... Por favor responde. Encontrei este número num bilhete escondido no casaco da minha irmã Marta.', null, () => {
          pushMsg('carolina', 'received', 'A minha irmã desapareceu ontem. No bilhete dizia: "Se algo correr mal, contacta o(a) ' + playerName + '".', null, () => {
            
            abrirChat('carolina');
            mostrarOpcoes('carolina', [
              {
                texto: "Espera lá... O que dizes? Eu não conheço nenhuma Marta! Deves ter o número errado.",
                proximo: () => car_resposta_desconfiada()
              },
              {
                texto: "A Marta?! Como assim? A minha amiga Inês acabou de me dizer que ela estava desaparecida...",
                proximo: () => car_resposta_preocupada()
              }
            ]);

          });
        });

      });

    });
  });
}

function car_resposta_desconfiada() {
  pushMsg('carolina', 'received', 'Não é número errado! O teu nome ' + playerName + ' está escrito à mão no bilhete com este número de telemóvel exato!', null, () => {
    pushMsg('carolina', 'received', null, 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80', () => {
      pushMsg('carolina', 'received', 'Olha para isto! Tirei foto. Por favor, diz-me que sabes de alguma coisa...', () => {
        
        mostrarOpcoes('carolina', [
          {
            texto: "Vou falar com os meus amigos Tomás e Inês para perceber se eles sabem de algo e já te digo.",
            proximo: () => consultar_amigos()
          }
        ]);

      });
    });
  });
}

function car_resposta_preocupada() {
  pushMsg('carolina', 'received', 'A tua amiga Inês sabe?! Então é verdade, ela desapareceu mesmo...', null, () => {
    pushMsg('carolina', 'received', null, 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80', () => {
      pushMsg('carolina', 'received', 'Encontrei este bilhete com o teu nome no casaco dela. O que é que ela estava a fazer contigo?!', () => {
        
        mostrarOpcoes('carolina', [
          {
            texto: "Eu juro que não fazia ideia! Dá-me 5 minutos, vou perguntar no meu grupo de amigos.",
            proximo: () => consultar_amigos()
          }
        ]);

      });
    });
  });
}

function consultar_amigos() {
  pushMsg('carolina', 'received', 'Por favor, sê rápido(a). Estou sozinha no quarto dela...', null, () => {
    voltarParaLista();
    pushMsg('tomas', 'received', 'O que se passa? Pareces inquieto(a).');
    pushMsg('ines', 'received', playerName + '! A irmã da Marta ligou-te?! O que é que ela disse?!');
  });
}

function conversaInes() {
  mostrarOpcoes('ines', [
    {
      texto: "Inês, a Carolina diz que a Marta tinha o meu número num bilhete secreto de emergência!",
      proximo: () => {
        pushMsg('ines', 'received', 'O QUÊ?! Meu Deus, isto é assustador e brutal ao mesmo tempo!', null, () => {
          pushMsg('ines', 'received', 'Tu tens de ir ter com a Carolina ou ajudá-la a procurar! Não podes ignorar isto!', null, () => {
            mostrarOpcoes('ines', [
              {
                texto: "Calma Inês, não vou meter-me numa coisa perigosa sem saber factos.",
                proximo: () => ines_chateada()
              },
              {
                texto: "Tens razão, vou ajudá-la a descobrir o que aconteceu.",
                proximo: () => ines_apoia()
              }
            ]);
          });
        });
      }
    }
  ]);
}

function ines_chateada() {
  pushMsg('ines', 'received', 'Sério ' + playerName + '? A rapariga está desaparecida e tu estás com medo?! Que desilusão...', null, () => {
    chatData.ines.status = "visto por último há 1 min (Chateada)";
    guardarEstado();
    verificarProgressoCap1();
  });
}

function ines_apoia() {
  pushMsg('ines', 'received', 'Isso mesmo! Sabia que podia contar contigo! Mantém-me a par de TUDO!', null, () => {
    chatData.ines.status = "online (Amizade +1)";
    guardarEstado();
    verificarProgressoCap1();
  });
}

function conversaTomas() {
  mostrarOpcoes('tomas', [
    {
      texto: "Tomás, uma tal de Carolina acabou de me mandar mensagem a dizer que a irmã desapareceu e tem o meu número...",
      proximo: () => {
        pushMsg('tomas', 'received', 'Espera lá. Tu conheces essa Carolina? Conheces a irmã?', null, () => {
          pushMsg('tomas', 'received', 'Isto cheira-me a burla ou a problemas sérios com a polícia. Bloqueia esse número agora mesmo!', null, () => {
            mostrarOpcoes('tomas', [
              {
                texto: "Não posso simplesmente bloquear, Tomás! Se a rapariga estiver mesmo em perigo?",
                proximo: () => tomas_chateado()
              },
              {
                texto: "Achas mesmo? Talvez tenhas razão... É melhor ter cuidado.",
                proximo: () => tomas_concorda()
              }
            ]);
          });
        });
      }
    }
  ]);
}

function tomas_chateado() {
  pushMsg('tomas', 'received', 'Depois não digas que não te avisei. Se te meteres em sarilhos, não me venhas pedir ajuda.', null, () => {
    chatData.tomas.status = "visto por último há instantes (Irritado)";
    guardarEstado();
    verificarProgressoCap1();
  });
}

function tomas_concorda() {
  pushMsg('tomas', 'received', 'Ainda bem que usas a cabeça. Ganha juízo e deixa a polícia tratar disso.', null, () => {
    chatData.tomas.status = "online (Amizade +1)";
    guardarEstado();
    verificarProgressoCap1();
  });
}

function verificarProgressoCap1() {
  setTimeout(() => {
    pushMsg('carolina', 'received', playerName + '... Encontrei um diário antigo e um mapa dobrado na secretária da Marta!', null, () => {
      pushMsg('carolina', 'received', 'Tem uma zona assinalada com uma cruz vermelha perto da antiga linha de comboio abandonada.', null, () => {
        
        // A Carolina envia a foto do mapa
        pushMsg('carolina', 'received', null, 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&auto=format&fit=crop&q=80', () => {
          pushMsg('carolina', 'received', 'Achas que ela foi para este local? O que é que eu faço com isto?', () => {
            
            // Desbloquear o chat do Número Desconhecido e preparar nova reviravolta
            chatData.estranho.unlocked = true;
            chatData.estranho.status = "online";
            guardarEstado();

            abrirChat('carolina');
            mostrarOpcoes('carolina', [
              {
                texto: "Não sigas esse mapa sozinha! Pode ser uma armadilha.",
                proximo: () => {
                  pushMsg('carolina', 'received', 'Mas é a única pista que temos da Marta...', null, () => {
                    dispararAvisoEstranho();
                  });
                }
              },
              {
                texto: "Guarda bem essa foto do mapa e tenta perceber o ponto exato.",
                proximo: () => {
                  pushMsg('carolina', 'received', 'Já tirei print. Estou a tremer, mas vou tentar investigar.', null, () => {
                    dispararAvisoEstranho();
                  });
                }
              }
            ]);

          });
        });

      });
    });
  }, 2000);
}

function dispararAvisoEstranho() {
  setTimeout(() => {
    pushMsg('estranho', 'received', 'Deixa o mapa em paz, ' + playerName + '. Tu não sabes onde te estás a meter.', null, () => {
      pushMsg('estranho', 'received', 'Quem procura o que não deve, encontra o que não quer esta noite.');
    });
  }, 3000);
}

// Hook chamado pelo se.js quando o jogador abre um chat específico
function aoAbrirChatHook(id) {
  if (id === 'ines' && chatData.ines.msgs.length <= 2) {
    conversaInes();
  } else if (id === 'tomas' && chatData.tomas.msgs.length <= 2) {
    conversaTomas();
  } else if (id === 'estranho' && chatData.estranho.msgs.length === 2) {
    // Interação inicial com o Número Desconhecido
    mostrarOpcoes('estranho', [
      {
        texto: "Quem és tu? Como sabes o meu nome e o que se está a passar?",
        proximo: () => {
          pushMsg('estranho', 'received', 'Eu sei mais do que imaginas sobre a Marta. E sobre ti também.');
        }
      },
      {
        texto: "Se voltas a ameaçar-me, vou direto à polícia.",
        proximo: () => {
          pushMsg('estranho', 'received', 'A polícia não vai chegar a tempo de salvar a Carolina. Tenta a tua sorte.');
        }
      }
    ]);
  }
}
