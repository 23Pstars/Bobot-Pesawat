module.exports = {
    port: 3001,
    bootstrap_data: {
        criteria: {
            labels: ['Radar', 'Weapon', 'Operational Radius of Action', 'Manuvering Capability', 'Elect Warfare System', 'Operating Performance'],
            aliases: ['Radar', 'Weapon', 'MC', 'ROA', 'EWS', 'OP'],
            values: [
                [1, 1, 3, 3, 5, 5],
                [1, 1, 3, 5, 5, 5],
                [0.33333, 0.33333, 1, 3, 3, 5],
                [0.33333, 0.2, 0.33333, 1, 3, 3],
                [0.2, 0.2, 0.33333, 0.33333, 1, 2],
                [0.2, 0.2, 0.2, 0.33333, 0.5, 1]
            ]
        },
        aircraft: {
            names: ['Mig 21M', 'Mig-29', 'Mig-31', 'F-14A', 'F-15E', 'F-16C'],
            labels: ['Max Over Load', 'Bomb Load', 'Flying Dist', 'B. Height', 'Weapon Var', 'Velocity'],
            values: [
                [6, 3.5, 1500, 200, 3, 650],
                [8, 4.5, 2000, 300, 4, 900],
                [9, 5.2, 3300, 300, 4, 850],
                [9, 6.6, 2570, 300, 5, 800],
                [9, 10.5, 4550, 300, 5, 900],
                [9, 5.3, 2400, 200, 5, 900]
            ]
        }
    }
};