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

Hooks.on('getSceneNavigationContext', () => {
if (!game.settings.get('dnd-ui', 'navigationVerticalToggle')) {
	navigation = document.querySelector("nav.app > ol#scene-list");
	if (navigation) {
		navigation.classList.add("vertical")
	}
}
if (game.settings.get('dnd-ui', 'compactModeToggle')) {
	addClassByQuerySelector("compact-mode", "body")
}
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

  /* -------------------------------------------- */
// Register world usage statistics
function registerUsageCount( registerKey ) {
	if ( game.user.isGM ) {
	  game.settings.register(registerKey, "world-key", {
		name: "Unique world key",
		scope: "world",
		config: false,
		type: String
	  });
  
	  let worldKey = game.settings.get(registerKey, "world-key")
	  if ( worldKey == undefined || worldKey == "" ) {
		worldKey = randomID(32)
		game.settings.set(registerKey, "world-key", worldKey )
	  }
	  // Simple API counter
	  $.ajax(`https://jdr.lahiette.com/fvtt_appcount/count.php?name="${registerKey}"&worldKey="${worldKey}"&version="${game.release.generation}.${game.release.build}"&system="${game.system.id}"&systemversion="${game.system.data.version}"`)
	  /* -------------------------------------------- */
	}
  }