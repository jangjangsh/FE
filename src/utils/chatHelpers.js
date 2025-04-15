export function createChatBlocksFrom(sessionMessages) {
  const EXAMPLE_MESSAGES = [
    {
      id: 1,
      sender: 'USER',
      skinTypes: ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'],
      message: '이 제품 어떤 피부에 좋아요?',
    },
    {
      id: 2,
      sender: 'BOT',
      skinType: 'DRY',
      message: '건성에게 괜찮습니다.',
    },
    {
      id: 3,
      sender: 'BOT',
      skinType: 'OILY',
      message: '지성 피부엔 피지 조절이 필요합니다.',
    },
    {
      id: 4,
      sender: 'BOT',
      skinType: 'SENSITIVE',
      message: '민감성에게는 자극이 될 수 있어요.',
    },
    {
      id: 5,
      sender: 'BOT',
      skinType: 'COMBINATION',
      message: '복합성은 부위별로 달라요.',
    },
    {
      id: 6,
      sender: 'USER',
      skinTypes: ['SENSITIVE', 'OILY'],
      message: '그럼 지성 피부엔 어때요?',
    },
    {
      id: 7,
      sender: 'BOT',
      skinType: 'SENSITIVE',
      message: '민감성은 주의가 필요합니다.',
    },
    {
      id: 8,
      sender: 'BOT',
      skinType: 'OILY',
      message: '지성에겐 피지 조절이 포인트예요.',
    },
  ];

  const hasUserAndBot =
    sessionMessages?.some((m) => m.sender === 'USER') &&
    sessionMessages?.some((m) => m.sender === 'BOT');
  const validatedMessages = hasUserAndBot ? sessionMessages : EXAMPLE_MESSAGES;
  console.log('validatedMessages:', validatedMessages);

  const chatBlocks = [];
  let currentUserMessage = null;
  let currentBotGroup = [];

  for (let i = 0; i < validatedMessages.length; i++) {
    const msg = validatedMessages[i];

    if (msg.sender === 'USER') {
      if (currentUserMessage && currentBotGroup.length > 0) {
        chatBlocks.push({
          userMessage: currentUserMessage,
          botMessages: currentBotGroup,
        });
      }
      currentUserMessage = msg;
      currentBotGroup = [];
    } else if (msg.sender === 'BOT') {
      if (currentUserMessage) {
        currentBotGroup.push(msg);
      }
    }
  }

  // 마지막 user + bot 묶음 처리
  if (currentUserMessage && currentBotGroup.length > 0) {
    chatBlocks.push({
      userMessage: currentUserMessage,
      botMessages: currentBotGroup,
    });
  }

  return chatBlocks;
}
