/* ==================== HISTÓRIA EXPANDIDA - CAPÍTULO 1 & 2 ==================== */

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
    pushMsg('carolina', 'received', 'Olha para isto, tirei foto ao bilhete. Juro que não estou a inventar.', 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80', () => {
      pushMsg('carolina', 'received', 'Por favor, diz-me que sabes de alguma coisa... Ela andava estranha esta semana.', () => {
        
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
    pushMsg('carolina', 'received', 'Encontrei este bilhete com o teu nome no casaco dela. O que é que ela estava a fazer contigo?!', 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=80', () => {
      
      mostrarOpcoes('carolina', [
        {
          texto: "Eu juro que não fazia ideia! Dá-me 5 minutos, vou perguntar no meu grupo de amigos.",
          proximo: () => consultar_amigos()
        }
      ]);

    });
  });
}

function consultar_amigos() {
  pushMsg('carolina', 'received', 'Por favor, sê rápido(a). Estou sozinha no quarto dela e oiço barulhos estranhos no corredor...', null, () => {
    voltarParaLista();
    pushMsg('tomas', 'received', 'O que se passa? Pareces inquieto(a). Apanhei-te a olhar para o telemóvel com uma cara... O que é que essa miúda queria?');
    pushMsg('ines', 'received', playerName + '! A irmã da Marta ligou-te?! O que é que ela disse?! Explica-me isso tudo agora mesmo!');
  });
}

function conversaInes() {
  mostrarOpcoes('ines', [
    {
      texto: "Inês, a Carolina diz que a Marta tinha o meu número num bilhete secreto de emergência! Como é que ela sabia de mim?",
      proximo: () => {
        pushMsg('ines', 'received', 'Espeta... Sinceramente? A Marta andava muito esquisita nas aulas nas últimas semanas.', null, () => {
          pushMsg('ines', 'received', 'Ela falava imenso num tal de laboratório abandonado perto da linha de comboio, mas achávamos que eram pancadas dela.', null, () => {
            pushMsg('ines', 'received', 'Tu tens de a ajudar a procurar! Se ela confiou em ti ao ponto de deixar o teu nome num bilhete, tens essa responsabilidade moral!', null, () => {
              mostrarOpcoes('ines', [
                {
                  texto: "Calma Inês, isto cheira a confusão. Não me vou meter em perigo por uma rapariga que mal conheço.",
                  proximo: () => ines_chateada()
                },
                {
                  texto: "Tens razão. Se ela pôs o meu nome ali, há uma razão forte. Vou investigar.",
                  proximo: () => ines_apoia()
                }
              ]);
            });
          });
        });
      }
    }
  ]);
}

function ines_chateada() {
  pushMsg('ines', 'received', 'Sério ' + playerName + '? A rapariga está desaparecida e tu estás com medo do teu próprioh rasto?! Que enorme desilusão...', null, () => {
    chatData.ines.status = "visto por último há 1 min (Chateada)";
    guardarEstado();
    verificarProgressoCap1();
  });
}

function ines_apoia() {
  pushMsg('ines', 'received', 'Isso mesmo! Sabia que podia contar contigo! Mantém-me a par de TUDO o que descobrires.', null, () => {
    chatData.ines.status = "online (Amizade +1)";
    guardarEstado();
    verificarProgressoCap1();
  });
}

function conversaTomas() {
  mostrarOpcoes('tomas', [
    {
      texto: "Tomás, a irmã da Marta diz que encontrou o meu nome num bilhete de emergência. Sabes de alguma coisa?",
      proximo: () => {
        pushMsg('tomas', 'received', 'Espera lá um segundo... Tu tinhas contacto com a Marta?', null, () => {
          pushMsg('tomas', 'received', 'Olha lá para mim, ' + playerName + '. Isto cheira a burla grossa ou a uma armadilha da polícia. Bloqueia esse número agora mesmo antes que te culpem de alguma coisa!', null, () => {
            mostrarOpcoes('tomas', [
              {
                texto: "Não posso simplesmente ignorar, Tomás! E se ela estiver a precisar de ajuda a sério?",
                proximo: () => tomas_chateado()
              },
              {
                texto: "Achas mesmo? Talvez tenhas razão... É melhor ter cuidado com o que digo à Carolina.",
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
  pushMsg('tomas', 'received', 'Depois não digas que não te avisei. Se te meteres em sarilhos com a justiça ou com malta perigosa, não me venhas pedir ajuda.', null, () => {
    chatData.tomas.status = "visto por último há instantes (Irritado)";
    guardarEstado();
    verificarProgressoCap1();
  });
}

function tomas_concorda() {
  pushMsg('tomas', 'received', 'Ainda bem que usas a cabeça. Ganha juízo, apaga essa conversa e deixa a polícia tratar disso.', null, () => {
    chatData.tomas.status = "online (Amizade +1)";
    guardarEstado();
    verificarProgressoCap1();
  });
}

function verificarProgressoCap1() {
  setTimeout(() => {
    pushMsg('carolina', 'received', playerName + '... Encontrei mais coisas! Estava a mexer no portátil dela e achei um diário e um mapa dobrado.', null, () => {
      pushMsg('carolina', 'received', 'Tem uma zona assinalada com uma cruz vermelha perto da antiga linha de comboio abandonada da cidade.', null, () => {
        
        pushMsg('carolina', 'received', 'Achas que ela foi para este local? O que é que eu faço com isto?', 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&auto=format&fit=crop&q=80', () => {
          
          chatData.estranho.unlocked = true;
          chatData.estranho.status = "online";
          guardarEstado();

          mostrarOpcoes('carolina', [
            {
              texto: "Não sigas esse mapa sozinha! Isso cheira a armadilha a léguas.",
              proximo: () => {
                pushMsg('carolina', 'received', 'Mas é a única pista que temos da Marta... Eu tenho de ir lá ver.', null, () => {
                  dispararAvisoEstranho();
                });
              }
            },
            {
              texto: "Guarda bem essa foto do mapa e tenta perceber se há algum nome escrito nas margens.",
              proximo: () => {
                pushMsg('carolina', 'received', 'Já tirei print. Estou a tremer por dentro, mas vou olhar melhor para os apontamentos dela.', null, () => {
                  dispararAvisoEstranho();
                });
              }
            }
          ]);

        });

      });
    });
  }, 2500);
}

function dispararAvisoEstranho() {
  setTimeout(() => {
    pushMsg('estranho', 'received', 'Deixa o mapa em paz, ' + playerName + '. Tu não sabes onde te estás a meter.', null, () => {
      pushMsg('estranho', 'received', 'Quem procura o que não deve esta noite, acaba como a Marta. Calado(a) estás tu melhor.', null, () => {
        
        mostrarOpcoes('estranho', [
          {
            texto: "Quem és tu? Como sabes o meu nome e o que se está a passar com a Marta?",
            proximo: () => {
              pushMsg('estranho', 'received', 'Eu sei exatamente o que a Marta descobriu no laboratório. E sei que o teu nome estava na caderneta dela por uma razão perigosa.');
            }
          },
          {
            texto: "Se voltas a ameaçar-me ou à Carolina, vou diretamente à polícia dar este número.",
            proximo: () => {
              pushMsg('estranho', 'received', 'A polícia não vai chegar a tempo de salvar a tua amiguinha do temporal lá fora. Tenta a tua sorte se tiveres coragem.');
            }
          }
        ]);

      });
    });
  }, 3000);
}

// Hook chamado pelo se.js quando o jogador abre um chat específico
function aoAbrirChatHook(id) {
  if (id === 'ines' && chatData.ines.msgs.length <= 2) {
    conversaInes();
  } else if (id === 'tomas' && chatData.tomas.msgs.length <= 2) {
    conversaTomas();
  }
}
