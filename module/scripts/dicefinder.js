Hooks.on('diceSoNiceReady', (dice3d) => {
    dice3d.addSystem({id: "PF", name: "Dicefinder"}, "default");
  
    dice3d.addDicePreset({
      type: "d20",
      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "modules/dnd-ui/ui/dice/nat20.webp"
      ],
      system: "PF"
    });

    dice3d.addTexture("PFred", {
      name: "Dicefinder",
      composite: "source-over",
      source: "modules/dnd-ui/ui/dice/texture.webp"
    })
    .then(() => {
        dice3d.addColorset({
          name: 'pf',
          description: "Dicefinder",
          category: "DnD5e",
          texture: 'PFred',
          material: "chrome",
          foreground: "#c98e45",
          outline: 'none',
          edge: "#c98e45",
          default: true
        },"default");
    });
  });
  