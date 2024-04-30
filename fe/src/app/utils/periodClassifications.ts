interface PeriodClassification {
  id: string;
  classification: string;
}

interface RepairClassification {
  id: string;
  classification: string;
  repairClassification: {value: string; label: string}[];
}

interface PeriodClassifications {
  WORKING: PeriodClassification[];
  REPAIR: RepairClassification[];
  INTERVAL: PeriodClassification[];
  DTM: PeriodClassification[];
  GLOSS: PeriodClassification[];
  SCHEDULED_STOP: PeriodClassification[];
}

const WORKING = [{id: "WORKING", classification: "Operando"}];

const REPAIR = [
  {
    id: "RIG_CAR",
    classification: "Carro Sonda",
    repairClassification: [
      {value: "MAST", label: "Mastro"},
      {value: "TELESCOPE", label: "Telescópio"},
      {value: "CROWNING_BLOCK", label: "Bloco do Coroamento"},
      {value: "CATARINA", label: "Catarina"},
      {value: "CARRIER", label: "Carrier"},
      {value: "ENGINE", label: "Motor"},
      {value: "GEARBOX", label: "Caixa de Transmissão"},
      {value: "MAIN_WINCH", label: "Guincho Principal"},
      {value: "SIDE_WINCH", label: "Guincho Auxiliar"},
      {value: "HYDRAULIC_SYSTEM", label: "Sistema Hidráulico"},
      {value: "PNEUMATIC_SYSTEM", label: "Sistema Pneumático"},
      {value: "ELETRIC_SYSTEM", label: "Sistema Elétrico"},
      {value: "CAT_LINE", label: "Cat Line"},
      {value: "CAT_HEAD", label: "Car Head"},
      {value: "INSTRUMENTATION", label: "Instrumenção"},
      {value: "STEEL_CABLE", label: "Cabo de Aço"},
      {value: "WORK_PLATFORM", label: "Plataforma de trabalho"},
      {value: "TORRISTS_DESK", label: "Mesa do Torrista"},
      {value: "SPDA", label: "SPDA"},
      {value: "OTHERS", label: "Outros"},
    ],
  },

  {
    id: "MUD_BOMB",
    classification: "Bomba de Lama",
    repairClassification: [
      {value: "POWER_END", label: "Power End"},
      {value: "FLUID_END", label: "Fluid End"},
      {value: "HIGH_LINES", label: "Linhas de Alta"},
      {value: "HIGH_VALVES", label: "Válvulas de Alta"},
      {value: "PULSATION_SHOCK_ABSORBER", label: "Amortecedor de Pulsação"},
      {value: "CENTRIFUGAL_PUMP", label: "Bomba Centrifuga"},
      {value: "ENGINE_BOX", label: "Motor Caixa"},
      {value: "INSTRUMENTATION", label: "Instrumenção"},
      {value: "PNEUMATIC_SYSTEM", label: "Sistema Pneumático"},
      {value: "HYDRAULIC_SYSTEM", label: "Sistema Hidráulico"},
      {value: "ELETRIC_SYSTEM", label: "Sistema Elétrico"},
      {value: "CARRIER", label: "Carrier"},
      {value: "SPDA", label: "SPDA"},
      {value: "OTHERS", label: "Outros"},
    ],
  },
  {
    id: "OPERATION_EQUIPMENT",
    classification: "Equipamentos de Operação",
    repairClassification: [
      {value: "HYDRAULIC_PIPE_WRENCH", label: "Chave Hidráulica de Tubos"},
      {value: "HYDRAULIC_ROD_WRENCH", label: "Chave Hidráulica de Haste"},
      {value: "FLOAT_KEY", label: "Chave Flutuante"},
      {value: "MANUAL_WRENCHES", label: "Chaves Manuais"},
      {value: "PNEUMATIC_WEDGE", label: "Cunha Pneumética"},
      {value: "PIPE_LIFT", label: "Elevador de Tubos"},
      {value: "ROD_LIFT", label: "Elevador de Hastes"},
      {value: "ROD_CATARINA", label: "Catarina de Haste"},
      {value: "CRAPER", label: "Raspador"},
      {value: "COMMAND", label: "Comando"},
      {value: "MANEUVERING_CHEST", label: "Baú de Manobra"},
      {value: "REVERSAL_BLOWER", label: "Bloqueador de Reversão"},
      {value: "OTHERS", label: "Outros"},
    ],
  },
  {
    id: "ESCP",
    classification: "ESCP",
    repairClassification: [
      {value: "PIPE_BOP", label: "BOP de Tubos"},
      {value: "ROD_BOP", label: "BOP de Hastes"},
      {value: "BOP_ARRANGEMENT", label: "Arranjo do BOP"},
      {value: "D16_HOSES", label: "Mangueiras 16D"},
      {value: "C16_HOSES", label: "Mangueiras 16C"},
      {
        value: "COLUMN_SAFETY_VALVES",
        label: "Válvula de Segurança de Coluna",
      },
      {value: "INSEDE_BOP", label: "Insede BOP"},
      {value: "SEPARATOR", label: "Separador"},
      {value: "BURNER", label: "Queimador"},
      {value: "BURNER_LINES", label: "Linhas do Queimador"},
      {value: "PISTONING_SYSTEM", label: "Sistema de Pistoneio"},
      {value: "TEST_PUMP", label: "Bomba de Teste"},
      {value: "OTHERS", label: "Outros"},
    ],
  },

  {
    id: "BOP_DRIVE_UNIT",
    classification: "Und. de Acionamento do BOP",
    repairClassification: [
      {value: "PRESSURE_VESSEL", label: "Vasos de Pressão"},
      {value: "HYPROPNEUMATIC_PUMP", label: "Bomba Hipropneumática"},
      {value: "TRIPLEX_PUMP", label: "Bomba Triplex"},
      {value: "ALARM_SYSTEM", label: "Sistema de Alarme"},
      {value: "HYDRAULIC_SYSTEM", label: "Sistema Hidráulico"},
      {value: "ELETRIC_SYSTEM", label: "Sistema Elétrico"},
      {value: "INTERLOCKING_SYSTEM", label: "Sistema de Intertravamento"},
      {value: "COMPRESSOR", label: "Compressor"},
      {value: "REGULATOR_VALVE", label: "Válvula Reguladora"},
      {value: "DIRECTION_VALVE", label: "Válvula de Direcionamento"},
      {value: "OTHERS", label: "Outros"},
    ],
  },

  {
    id: "UCI",
    classification: "UCI",
    repairClassification: [
      {value: "FIRE_FIGHTING_PUMP", label: "Bomba de Combate à Incêndio"},
      {value: "PUMP_ENGINE", label: "Motor da Bomba"},
      {value: "LINES_AND_CONNECTIONS", label: "Linhas e Conexões"},
      {
        value: "FIRE_FIGHTING_HOSES",
        label: "Mangueiras de Combate à Incêndio",
      },
      {value: "STORAGE_TANKS", label: "Tanques de Armazenamento"},
      {value: "ELETRIC_SYSTEM", label: "Sistema Elétrico"},
      {value: "INSTRUMENTATION", label: "Instrumenção"},
      {value: "CARRIER", label: "Carrier"},
      {value: "OTHERS", label: "Outros"},
    ],
  },
  {
    id: "MUD_TANK",
    classification: "Tanque de Lama",
    repairClassification: [
      {value: "SUCTION_LINES", label: "Linhas de Sucção"},
      {value: "LIFT_SYSTEM", label: "Sistema de Elevação"},
      {value: "ATTACK_LINES", label: "Linhas de Ataque"},
      {value: "FOAM_GENERATOR", label: "Gerador de Espuma"},
      {value: "VALVES", label: "Válvulas"},
      {value: "GAS_DETECTOR", label: "Detector de Gás"},
      {
        value: "LEVEL_MEASUREMENT_SYSTEM",
        label: "Sistema de Medição de Nível",
      },
      {value: "CARRIER", label: "Carrier"},
      {value: "OTHERS", label: "Outros"},
    ],
  },
  {
    id: "POWER_SWIVEL",
    classification: "Power Swivel",
    repairClassification: [
      {value: "ENGINE", label: "Motor"},
      {value: "HYDRAULIC_PUMP", label: "Bomba Hidráulica"},
      {value: "HYDRAULIC_ENGINES", label: "Motores Hidráulicos"},
      {value: "KING_SWIVEL", label: "King/Swivel"},
      {value: "KING_HOSES", label: "Mangueiras do King"},
      {value: "STUFFING_BOX", label: "Stuffing Box"},
      {value: "PNEUMATIC_SYSTEM", label: "Sistema Pneumático"},
      {value: "HYDRAULIC_SYSTEM", label: "Sistema Hidráulico"},
      {value: "CARRIER", label: "Carrier"},
      {value: "OTHERS", label: "Outros"},
    ],
  },

  {
    id: "GEOLOGRAPH",
    classification: "Geolograph",
    repairClassification: [
      {value: "ENGINE", label: "Motor"},
      {value: "HYDRAULIC_PUMP", label: "Bomba Hidráulica"},
      {value: "SENSORS", label: "Sensores"},
      {value: "RADIOS", label: "Rádios"},
      {value: "SQUARE", label: "Quadro"},
      {value: "CABLES", label: "Cabeamento"},
      {value: "SYSTEM", label: "Sistema"},
      {value: "OTHERS", label: "Outros"},
    ],
  },

  {
    id: "PIPE_RACK",
    classification: "Pipe Rack",
    repairClassification: [
      {value: "RAMP", label: "Rampa"},
      {value: "SHIPTIME_ARMS", label: "Braços de Estaleiramento"},
      {value: "CARRIER", label: "Carrier"},

      {value: "OTHERS", label: "Outros"},
    ],
  },

  {
    id: "TOOL_BOX",
    classification: "Caixa de Ferramenta",
    repairClassification: [
      {value: "CARRIER", label: "Carrier"},

      {value: "OTHERS", label: "Outros"},
    ],
  },
  {
    id: "GENERATOR",
    classification: "Gerador",
    repairClassification: [
      {value: "ENGINE", label: "Motor"},
      {value: "Generator", label: "Gerador"},

      {value: "OTHERS", label: "Outros"},
    ],
  },
  {
    id: "SMS",
    classification: "SMS",
    repairClassification: [
      {
        value: "FIRE_FIGHTING_HOSES",
        label: "Mangueiras de Combate à Incêndio",
      },
      {value: "EXTINGUISHERS", label: "Extintores"},
      {value: "MOBILE_GAS_DETECTORS", label: "Detectores de Gás (Móvel)"},
      {value: "AUTONOMOUS_SYSTEM", label: "Sistema Autônomo"},
      {value: "RESCUE_CAR", label: "Carro Resgate"},
      {value: "RESCUE_STICK", label: "Bastão de Resgate"},
      {value: "OTHERS", label: "Outros"},
    ],
  },

  {
    id: "TRAILER",
    classification: "Trailer",
    repairClassification: [
      {
        value: "AIR_CONDITIONING",
        label: "Ar Condicionado",
      },
      {value: "LIFT_SYSTEM", label: "Sistema de Elevação"},
      {value: "ELETRIC_SYSTEM", label: "Sistema Elétrico"},
      {
        value: "WATER_SUPPLY_SYSTEM",
        label: "Sistema de Abastecimento de Água",
      },
      {value: "SEPTIC_TANK", label: "Fossa Séptica"},
      {value: "MONITORING_SYSTEM", label: "Sistema de Monitoramento"},
      {value: "CARRIER", label: "Carrier"},
      {value: "OTHERS", label: "Outros"},
    ],
  },
  {
    id: "CYLINDRICAL_TANK",
    classification: "Tanque Cilíndrico",
    repairClassification: [
      {
        value: "TANK",
        label: "Tanque",
      },

      {value: "VALVE", label: "Válvula"},

      {value: "CARRIER", label: "Carrier"},
      {value: "OTHERS", label: "Outros"},
    ],
  },

  {
    id: "SUPPORT_PLATE",
    classification: "Prancha de Apoio",
    repairClassification: [
      {value: "STRUCTURE", label: "Estrutura"},

      {value: "CARRIER", label: "Carrier"},
      {value: "OTHERS", label: "Outros"},
    ],
  },

  {
    id: "SUPPORT_VEHICLES",
    classification: "Veículos de Apoio",
    repairClassification: [
      {value: "CARRIER", label: "Carrier"},
      {value: "OTHERS", label: "Outros"},
    ],
  },
  {
    id: "SCHEDULED_STOP",
    classification: "Parada de Manutenção",
    repairClassification: [
      {value: "SCHEDULED_STOP", label: "Parada de Manutenção"},
    ],
  },
  {
    id: "OTHERS",
    classification: "Outros",
    repairClassification: [{value: "OTHERS", label: "Outros"}],
  },
];

const GLOSS = [
  {id: "PROCESS", classification: "Processo"},
  {id: "LOGISTICS", classification: "Logística"},
  {id: "SECURITY", classification: "Segurança"},
  {id: "LABOR", classification: "Mão de Obra"},
];

const INTERVAL = [
  {id: "LT20", classification: "0 > 20"},
  {id: "BT20AND50", classification: "20 > 50"},
  {id: "GT50", classification: "50 >"},
];

const SCHEDULED_STOP = [
  {id: "SCHEDULED_STOP", classification: "Parada de Manutenção"},
];

export const periodClassifications: PeriodClassifications = {
  WORKING: WORKING,
  REPAIR: REPAIR,
  INTERVAL: INTERVAL,
  GLOSS: GLOSS,
  SCHEDULED_STOP: SCHEDULED_STOP,
  DTM: INTERVAL,
};

export const allClassifications = WORKING.concat(
  REPAIR,
  GLOSS,
  INTERVAL,
  SCHEDULED_STOP
);

/* WORKING
  LABOR
  PROCESS
  LOGISTICS
  SECURITY


  RIG_CAR
  MAST
  RIG_WINCH
  RIG_TRANSMISSION
  UCI
  MUD_TANK
  TRAILER
  MUD_BOMB
  PIPE_RACK
  BOP
  CHOKE_MANIFOLD
  HOSES
  HYDRAULIC_WRENCH
  HANDLING_TOOLS
  LT20
  BT20AND50
  GT50
  OTHERS */

export const getRepairClassification = (parameter: string) => {
  const result = periodClassifications.REPAIR.find(({id}) => {
    return parameter === id;
  });

  if (!result) {
    return [
      {
        value: "asda",
        label: "dadad",
      },
    ];
  }

  return result.repairClassification;
};

export const getPeriodClassification = (parameter: string) => {
  if (parameter === "WORKING") {
    return periodClassifications.WORKING.map(({id, classification}) => {
      return {
        value: id,
        label: classification,
      };
    });
  }

  if (parameter === "DTM") {
    return periodClassifications.INTERVAL.map(({id, classification}) => {
      return {
        value: id,
        label: classification,
      };
    });
  }

  if (parameter === "REPAIR") {
    return periodClassifications.REPAIR.map(({id, classification}) => {
      return {
        value: id,
        label: classification,
      };
    });
  }

  if (parameter === "GLOSS") {
    return periodClassifications.GLOSS.map(({id, classification}) => {
      return {
        value: id,
        label: classification,
      };
    });
  }

  if (parameter === "SCHEDULED_STOP") {
    return [
      {
        value: "SCHEDULED_STOP",
        label: "Parada de Manutenção",
      },
    ];
  }

  return [
    {
      value: "",
      label: " ",
    },
  ];
};
