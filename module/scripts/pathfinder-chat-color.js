Hooks.on('init', () => {
    // Register module settings.
	game.settings.register('dnd-ui', 'icBgColor', {
		name: game.i18n.localize('IC.BG.COLOR'),
		hint: game.i18n.localize('HEXA.COLOR'),
		default: "#D3E5F5",
		type: String,
		scope: 'client',
		config: true
	});
	game.settings.register('dnd-ui', 'icTextColor', {
		name: game.i18n.localize('IC.TEXT.COLOR'),
		hint: game.i18n.localize('HEXA.COLOR'),
		default: "#000000",
		type: String,
		scope: 'client',
		config: true
	});
	game.settings.register('dnd-ui', 'emoteBgColor', {
		name: game.i18n.localize('EMOTE.BG.COLOR'),
		hint: game.i18n.localize('HEXA.COLOR'),
		default: "#D1F5D1",
		type: String,
		scope: 'client',
		config: true
	});
	game.settings.register('dnd-ui', 'emoteTextColor', {
		name: game.i18n.localize('EMOTE.TEXT.COLOR'),
		hint: game.i18n.localize('HEXA.COLOR'),
		default: "#000000",
		type: String,
		scope: 'client',
		config: true
	});
	game.settings.register('dnd-ui', 'rollBgColor', {
		name: game.i18n.localize('ROLL.BG.COLOR'),
		hint: game.i18n.localize('HEXA.COLOR'),
		default: "#E6BB81",
		type: String,
		scope: 'client',
		config: true
	});
	game.settings.register('dnd-ui', 'rollTextColor', {
		name: game.i18n.localize('ROLL.TEXT.COLOR'),
		hint: game.i18n.localize('HEXA.COLOR'),
		default: "#000000",
		type: String,
		scope: 'client',
		config: true
	});
	game.settings.register('dnd-ui', 'otherBgColor', {
		name: game.i18n.localize('OTHER.BG.COLOR'),
		hint: game.i18n.localize('HEXA.COLOR'),
		default: "#DBD9CD",
		type: String,
		scope: 'client',
		config: true
	});
	game.settings.register('dnd-ui', 'otherTextColor', {
		name: game.i18n.localize('OTHER.TEXT.COLOR'),
		hint: game.i18n.localize('HEXA.COLOR'),
		default: "#000000",
		type: String,
		scope: 'client',
		config: true
	});
	game.settings.register('dnd-ui', 'defaultChatPrefix', {
		name: game.i18n.localize('DEF.CHAT.PREF'),
		hint: game.i18n.localize('SPE.CHAT.PREF'),
		default: "",
		type: String,
		scope: 'client',
		config: true
	});
});

Hooks.on("renderChatLog", (log, html) => {
    // Prepend inline CSS to the chatlog to style the chat messages.
    icBgColor = game.settings.get('dnd-ui', 'icBgColor');
    icTextColor = game.settings.get('dnd-ui', 'icTextColor');
    emoteBgColor = game.settings.get('dnd-ui', 'emoteBgColor');
    emoteTextColor = game.settings.get('dnd-ui', 'emoteTextColor');
    rollBgColor = game.settings.get('dnd-ui', 'rollBgColor');
    rollTextColor = game.settings.get('dnd-ui', 'rollTextColor');
    otherBgColor = game.settings.get('dnd-ui', 'otherBgColor');
    otherTextColor = game.settings.get('dnd-ui', 'otherTextColor');
    $("<style type='text/css'> #chat-log .message.ic { background: " + icBgColor+ "; color: " + icTextColor + 
    " }\n #chat-log .message.ic .message-header { color: " + icTextColor + 
    " }\n #chat-log .message.emote { background: " + emoteBgColor +
    "; color: " + emoteTextColor + 
    " }\n #chat-log .message.emote .message-header { color: " + emoteTextColor + 
    " }\n #chat-log .message.chatColorsRoll { background: " + rollBgColor + 
    "; color: " + rollTextColor + 
    " }\n #chat-log .message.chatColorsRoll .message-header { color: " + rollTextColor + 
    " }\n #chat-log .message { background: " + otherBgColor +
    "; color: " + otherTextColor + 
    " }\n #chat-log .message .message-header { color: " + otherTextColor + 
    "; } </style>").prependTo(html);
});

Hooks.on("chatMessage", (chatLog, message, chatData) => {
    if (game.settings.get('dnd-ui', 'defaultChatPrefix')) {
        prefix = game.settings.get('dnd-ui', 'defaultChatPrefix');
        
        // Check if the message begins with any command.
        let [command, match] = chatLog.constructor.parse(message);
        
        if ( command === "none" ) {
            // If there is no command, insert the prefix and reprocess.
            chatLog.processMessage(prefix + " " + message);
            return false;
        }
        
        // Otherwise do nothing.
        return true;
    }
});

Hooks.on("renderChatMessage", (message, html, data) => {
    // Add extra CSS classes to rolls so we can style them.
    if (message.isRoll) {
        html.addClass("chatColorsRoll");
    }
});
