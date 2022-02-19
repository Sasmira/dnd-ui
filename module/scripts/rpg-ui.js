Hooks.on('init', () => {
	// Register module settings.
	game.settings.register('dnd-ui', 'disableAllStyles', {
		name: game.i18n.localize('RPGUI.SETTINGS.DISABLE_STYLES'),
		hint: game.i18n.localize('RPGUI.SETTINGS.DISABLE_STYLES_HINT'),
		scope: "client",
		type: Boolean,
		default: false,
		config: true,
		onChange: () => {
			location.reload();
		}
	});

game.settings.register('dnd-ui', 'minimalUICompatibility', {
	name: game.i18n.localize('RPGUI.SETTINGS.MINIMAL_UI'),
	hint: game.i18n.localize('RPGUI.SETTINGS.MINIMAL_UI_HINT'),
	scope: "world",
	type: Boolean,
	default: false,
	config: true,
	onChange: () => {
		location.reload();
	}
});
if (!game.settings.get('dnd-ui', 'disableAllStyles')) { rpgUIAddMainCss() }
if (game.settings.get('dnd-ui', 'minimalUICompatibility')) { addClassByQuerySelector('minimal-ui-mode', 'body.vtt') }
});

Hooks.on('renderCombatCarousel', () => {
let carouselSize = game.settings.get('combat-carousel', 'carouselSize')
if (carouselSize !== "") {
	addClassByQuerySelector(carouselSize, "#combat-carousel")
}
});

function addClassByQuerySelector(className, selector) {
	let navigation = document.querySelector(selector);
	navigation.classList.add(className)
}

function rpgUIAddMainCss() {
	const head = document.getElementsByTagName("head")[0];
	const mainCss = document.createElement("link");
	mainCss.setAttribute("rel", "stylesheet")
	mainCss.setAttribute("type", "text/css")
	mainCss.setAttribute("href", "modules/dnd-ui/css/pathfinderui.css")
	mainCss.setAttribute("media", "all")
	head.insertBefore(mainCss, head.lastChild);
}

Hooks.on('renderSidebarTab', async (object, html) => {
	if (object instanceof Settings) {
	  const details = html.find('#game-details')
	  const list = document.createElement('ul')
	  list.innerHTML = await renderTemplate('modules/dnd-ui/templates/settings-info.hbs')
	  details.append(list.firstChild)
	}
})