Hooks.on('diceSoNiceReady', (dice3d) => {
    dice3d.addSystem({id: "PF", name: "DnD5e"}, true);
  
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
        "modules/dnd-ui/ui/dice/nat20.png"
      ],
      system: "PF"
    });
  
    dice3d.addTexture("PFred", {
      name: "DnD5e Red",
      composite: "source-over",
      source: "modules/dnd-ui/ui/dice/redTexture.png"
    })
    .then(() => {
        dice3d.addColorset({
          name: 'pf',
          description: "DnD5e Red/Gold",
          category: "DnD5e",
          texture: 'PFred',
          edge: '#d9a463',
          foreground: '#d9a463',
          default: true
        },"default");
    });
  });
  