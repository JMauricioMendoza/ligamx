let equipos = {};
let posicionesAnt;

export const administrarEquipos = data => {
  data.forEach(jornada => {
    posicionesAnt = ordenarEquipos();

    jornada.forEach(partido => {
      if (!equipos[partido.equipoLocal]) crearEquipo(partido.equipoLocal, partido.golLocal, partido.golVisita);
      else actualizarEquipo(equipos[partido.equipoLocal], partido.golLocal, partido.golVisita);

      if (!equipos[partido.equipoVisita]) crearEquipo(partido.equipoVisita, partido.golVisita, partido.golLocal);
      else actualizarEquipo(equipos[partido.equipoVisita], partido.golVisita, partido.golLocal);
    });
  });

  return ordenarEquipos();
};

const crearEquipo = (equipo, gf, gc) => {
  equipos[equipo] = {
    GF: gf,
    GC: gc,
    puntos: calcularPts(gf, gc),
    G: calcularPts(gf, gc) === 3 ? 1 : 0,
    P: calcularPts(gf, gc) === 0 ? 1 : 0,
    E: calcularPts(gf, gc) === 1 ? 1 : 0,
    PJ: 1
  };
};

const actualizarEquipo = (equipo, nuevosGF, nuevosGC) => {
  equipo['GF'] += nuevosGF;
  equipo['GC'] += nuevosGC;
  equipo['puntos'] += calcularPts(nuevosGF, nuevosGC);
  equipo['G'] += calcularPts(nuevosGF, nuevosGC) === 3 ? 1 : 0;
  equipo['P'] += calcularPts(nuevosGF, nuevosGC) === 0 ? 1 : 0;
  equipo['E'] += calcularPts(nuevosGF, nuevosGC) === 1 ? 1 : 0;
  equipo['PJ']++;
};

const calcularPts = (gf, gc) => {
  if (gf > gc) return 3;
  if (gc > gf) return 0;
  if (gc === gf) return 1;
};

const ordenarEquipos = () => {
  const equiposOrdenados = Object.entries(equipos).sort(([, a], [, b]) => {
    if (a.puntos !== b.puntos) {
      return b.puntos - a.puntos;
    } else {
      const difA = a.GF - a.GC;
      const difB = b.GF - b.GC;

      if (difA === difB) return b.GF - a.GC;

      return difB - difA;
    }
  });

  for (let i = 0; i < equiposOrdenados.length; i++) {
    const equipo = equiposOrdenados[i][0];
    const posicion = posicionesAnt.findIndex(subArray => subArray[0] === equipo);

    equiposOrdenados[i][1].puestoAnt = posicion;
  }

  return equiposOrdenados;
};
