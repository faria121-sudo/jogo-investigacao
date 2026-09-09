let playerName = localStorage.getItem('player_name_v22') || "";
let activeChat = null;
let opcoesAtivas = null;

const chatData = {
  carolina: {
    name: "Carolina (Desconhecida)", 
    avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    status: "online", unlocked: true, unread: 0, msgs: []
  },
  tomas: {
    name: "Tomás", 
    avatarImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: "online", unlocked: true, unread: 0, msgs: []
  },
  ines: {
    name: "Inês", 
    avatarImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    status: "online", unlocked: true, unread: 0, msgs: []
  },
  estranho: {
    name: "Número Desconhecido", 
    avatarImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    status: "offline", unlocked: false, unread: 0, msgs: []
  }
};

function obterHora() {
  const d = new Date();
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
}

function reiniciarJogo() {
  if (confirm("Reiniciar a história do início?")) {
    localStorage.clear();
    location.reload();
  }
}

window.onload = function() {
  if (playerName) {
    document.getElementById('name-modal').style.display = 'none';
    carregarEstado();
  }
};

function iniciarJogoApp() {
  const input = document.getElementById('player-name-input');
  if (!input.value.trim()) return;
  playerName = input.value.trim();
  localStorage.setItem('player_name_v22', playerName);
  document.getElementById('name-modal').style.display = 'none';
  if (typeof iniciarCapitulo1 === 'function') {
    iniciarCapitulo1();
  }
}

function carregarEstado() {
  const savedData = localStorage.getItem('chat_data_v22');
  if (savedData) {
    Object.assign(chatData, JSON.parse(savedData));
    atualizarListaGeral();
  } else {
    if (typeof iniciarCapitulo1 === 'function') {
      iniciarCapitulo1();
    }
  }
}

function guardarEstado() {
  localStorage.setItem('chat_data_v22', JSON.stringify(chatData));
  atualizarListaGeral();
}

function atualizarListaGeral() {
  const listView = document.getElementById('chat-list-view');
  listView.innerHTML = '';

  Object.keys(chatData).forEach(id => {
    const chat = chatData[id];
    if (chat.unlocked) {
      const msgs = chat.msgs;
      let ultTexto = "Nenhuma mensagem...";
      let ultHora = "--:--";

      if (msgs.length > 0) {
        const ult = msgs[msgs.length - 1];
        ultTexto = ult.text ? ult.text.replace(/<[^>]*>?/gm, '') : "[Fotografia]";
        ultHora = ult.time || obterHora();
      }

      const item = document.createElement('div');
      item.className = 'chat-item';
      item.onclick = () => abrirChat(id);
      item.innerHTML = `
        <img src="${chat.avatarImg}" class="avatar-img">
        <div class="chat-item-details">
          <div class="chat-item-header">
            <span class="chat-item-name">${chat.name}</span>
            <span class="chat-item-time">${ultHora}</span>
          </div>
          <div class="chat-item-body">
            <div class="chat-item-lastmsg">${ultTexto}</div>
            ${chat.unread > 0 ? `<div class="unread-badge">${chat.unread}</div>` : ''}
          </div>
        </div>
      `;
      listView.appendChild(item);
    }
  });
}

function abrirChat(id) {
  activeChat = id;
  const info = chatData[id];
  info.unread = 0;
  guardarEstado();

  document.getElementById('main-header').style.display = 'none';
  document.getElementById('chat-list-view').style.display = 'none';
  document.getElementById('chat-header').style.display = 'flex';
  document.getElementById('chat-room-view').style.display = 'flex';

  document.getElementById('active-name').innerText = info.name;
  document.getElementById('active-status').innerText = info.status;
  document.getElementById('active-avatar-img').src = info.avatarImg;

  renderizarMensagens();
  renderizarOpcoes();

  // Hook opcional na história quando se abre um chat
  if (typeof aoAbrirChatHook === 'function') {
    aoAbrirChatHook(id);
  }
}

function voltarParaLista() {
  activeChat = null;
  document.getElementById('chat-header').style.display = 'none';
  document.getElementById('chat-room-view').style.display = 'none';
  document.getElementById('main-header').style.display = 'flex';
  document.getElementById('chat-list-view').style.display = 'flex';
  atualizarListaGeral();
}

function renderizarMensagens() {
  const container = document.getElementById('messages-container');
  container.innerHTML = '';
  
  if (!activeChat) return;
  const msgs = chatData[activeChat].msgs;
  msgs.forEach(m => {
    const div = document.createElement('div');
    div.className = 'msg ' + m.type;
    let htmlContent = "";
    if (m.img) htmlContent += `<img src="${m.img}" class="msg-img" onclick="window.open('${m.img}')">`;
    if (m.text) htmlContent += m.text;
    htmlContent += `<span class="msg-time">${m.time}</span>`;
    div.innerHTML = htmlContent;
    container.appendChild(div);
  });

  const typ = document.createElement('div');
  typ.className = 'typing';
  typ.id = 'typing-indicator';
  typ.innerHTML = '<span style="font-size: 11px; color:#8696a0; margin-right: 4px;">a escrever</span><div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
  container.appendChild(typ);

  container.scrollTop = container.scrollHeight;
}

function renderizarOpcoes() {
  const container = document.getElementById('options-container');
  container.innerHTML = '';

  if (opcoesAtivas && opcoesAtivas.chatId === activeChat) {
    opcoesAtivas.lista.forEach(o => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.innerText = o.texto;
      btn.onclick = () => {
        container.innerHTML = '';
        const acao = o.proximo;
        opcoesAtivas = null;
        pushMsg(activeChat, 'sent', o.texto, null, () => setTimeout(acao, 500));
      };
      container.appendChild(btn);
    });
    container.scrollTop = 0;
  }
}

function pushMsg(chatId, type, text, img = null, callback = null) {
  if (type === 'sent') {
    chatData[chatId].msgs.push({ type, text, img, time: obterHora() });
    guardarEstado();
    if (activeChat === chatId) renderizarMensagens();
    if (callback) callback();
    return;
  }

  if (activeChat === chatId) {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.style.display = 'flex';

    setTimeout(() => {
      if (typingIndicator) typingIndicator.style.display = 'none';
      chatData[chatId].msgs.push({ type, text, img, time: obterHora() });
      guardarEstado();
      renderizarMensagens();
      if (callback) callback();
    }, 1200);
  } else {
    setTimeout(() => {
      chatData[chatId].msgs.push({ type, text, img, time: obterHora() });
      chatData[chatId].unread += 1;
      guardarEstado();
      if (callback) callback();
    }, 1000);
  }
}

function mostrarOpcoes(chatTarget, opcoes) {
  opcoesAtivas = { chatId: chatTarget, lista: opcoes };
  if (activeChat === chatTarget) renderizarOpcoes();
}
