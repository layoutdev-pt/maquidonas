// ──────────────────────────────────────────────
// FROTA
// ──────────────────────────────────────────────
export const frota = [
  {
    id: 'MAQ-001', nome: 'Giratória Bobcat E85', tipo: 'Giratória', marca: 'Bobcat',
    ano: 2019, matricula: 'BK-8500-PT', estado: 'Alugada', precoDia: 280,
    imagem: 'https://maquidonas.pt/wp-content/uploads/2025/05/giratoria_4.3_clean.png',
    localizacao: 'Construtora Beirã — Fundão',
    seguro: { validade: '2025-05-23', estado: 'a-expirar' },
    inspecao: { validade: '2025-09-15', estado: 'valido' },
    custoManutencao: 3200, receitaAlugueres: 18400,
    documentos: [
      { nome: 'Certificado_CE_E85.pdf', data: '2023-03-10' },
      { nome: 'Manual_Operacao.pdf', data: '2022-01-15' },
    ],
    ocorrencias: [
      { data: '2025-02-10', descricao: 'Substituição de lâmina de balde', custo: 850, resolvida: true },
      { data: '2024-11-05', descricao: 'Revisão geral 1000h', custo: 1200, resolvida: true },
      { data: '2024-07-20', descricao: 'Falha no sistema hidráulico', custo: 1150, resolvida: true },
    ],
  },
  {
    id: 'MAQ-002', nome: 'Telescópica Manitou MT625', tipo: 'Telescópica', marca: 'Manitou',
    ano: 2020, matricula: 'MT-6250-PT', estado: 'Disponível', precoDia: 320,
    imagem: 'https://maquidonas.pt/wp-content/uploads/2025/05/manitou_150_aetj_c_4.3_clean.png',
    localizacao: 'Parque Maquidonas — Donas',
    seguro: { validade: '2025-11-30', estado: 'valido' },
    inspecao: { validade: '2025-08-20', estado: 'valido' },
    custoManutencao: 1800, receitaAlugueres: 22400,
    documentos: [
      { nome: 'Seguro_Manitou_2025.pdf', data: '2024-11-30' },
      { nome: 'Certificado_CE_MT625.pdf', data: '2023-06-12' },
    ],
    ocorrencias: [
      { data: '2025-01-15', descricao: 'Revisão geral 500h', custo: 900, resolvida: true },
      { data: '2024-09-08', descricao: 'Troca de pneus dianteiros', custo: 900, resolvida: true },
    ],
  },
  {
    id: 'MAQ-003', nome: 'Plataforma JLG 450AJ', tipo: 'Plataforma Articulada', marca: 'JLG',
    ano: 2021, matricula: 'JL-4500-PT', estado: 'Disponível', precoDia: 190,
    imagem: 'https://maquidonas.pt/wp-content/uploads/2025/05/jlg_450_aj_4.3_clean.png',
    localizacao: 'Parque Maquidonas — Donas',
    seguro: { validade: '2026-02-14', estado: 'valido' },
    inspecao: { validade: '2025-12-01', estado: 'valido' },
    custoManutencao: 950, receitaAlugueres: 12350,
    documentos: [
      { nome: 'Certificado_JLG_450AJ.pdf', data: '2023-09-20' },
    ],
    ocorrencias: [
      { data: '2024-12-01', descricao: 'Revisão anual e teste de segurança', custo: 650, resolvida: true },
    ],
  },
  {
    id: 'MAQ-004', nome: 'Empilhador Doosan G25E', tipo: 'Empilhador', marca: 'Doosan',
    ano: 2018, matricula: 'DS-2500-PT', estado: 'Manutenção', precoDia: 150,
    imagem: 'https://maquidonas.pt/wp-content/uploads/2025/05/emp_conv_4.3_clean.png',
    localizacao: 'Oficina Maquidonas — Donas',
    seguro: { validade: '2025-07-10', estado: 'valido' },
    inspecao: { validade: '2025-06-05', estado: 'a-expirar' },
    custoManutencao: 4100, receitaAlugueres: 9800,
    documentos: [
      { nome: 'Ficha_Tecnica_G25E.pdf', data: '2022-04-01' },
    ],
    ocorrencias: [
      { data: '2025-05-10', descricao: 'Falha no motor — substituição de turbo', custo: 2200, resolvida: false },
      { data: '2024-10-20', descricao: 'Revisão de travões e direção', custo: 780, resolvida: true },
      { data: '2024-06-15', descricao: 'Troca de bateria', custo: 1120, resolvida: true },
    ],
  },
  {
    id: 'MAQ-005', nome: 'Camião Grua Volvo FH 500', tipo: 'Camião Grua', marca: 'Volvo',
    ano: 2017, matricula: '00-AB-12', estado: 'Disponível', precoDia: 450,
    imagem: 'https://maquidonas.pt/wp-content/uploads/2025/05/servico_camiao_grua_4.3_clean.png',
    localizacao: 'Parque Maquidonas — Donas',
    seguro: { validade: '2025-06-07', estado: 'a-expirar' },
    inspecao: { validade: '2025-10-30', estado: 'valido' },
    custoManutencao: 6200, receitaAlugueres: 31500,
    documentos: [
      { nome: 'Inspecao_Periodica_2024.pdf', data: '2024-10-30' },
      { nome: 'Carta_Porte_Grua.pdf', data: '2023-01-05' },
    ],
    ocorrencias: [
      { data: '2025-04-12', descricao: 'Serviço de óleo e filtros — 150.000km', custo: 1850, resolvida: true },
      { data: '2024-08-22', descricao: 'Manutenção da grua — calibração carga máxima', custo: 2400, resolvida: true },
    ],
  },
  {
    id: 'MAQ-006', nome: 'Cilindro Hamm HD12', tipo: 'Cilindro Compactador', marca: 'Hamm',
    ano: 2020, matricula: 'HD-1200-PT', estado: 'Alugada', precoDia: 120,
    imagem: 'https://maquidonas.pt/wp-content/uploads/2025/05/cilindro_4.3_clean.png',
    localizacao: 'Município do Fundão — Obra Rua da Liberdade',
    seguro: { validade: '2026-01-20', estado: 'valido' },
    inspecao: { validade: '2025-11-15', estado: 'valido' },
    custoManutencao: 680, receitaAlugueres: 6840,
    documentos: [
      { nome: 'Certificado_Hamm_HD12.pdf', data: '2023-07-10' },
    ],
    ocorrencias: [
      { data: '2024-11-10', descricao: 'Revisão semestral e lubrificação', custo: 380, resolvida: true },
    ],
  },
  {
    id: 'MAQ-007', nome: 'Gerador Yanmar YEG150', tipo: 'Gerador', marca: 'Yanmar',
    ano: 2022, matricula: 'YM-1500-PT', estado: 'Disponível', precoDia: 85,
    imagem: 'https://maquidonas.pt/wp-content/uploads/2025/05/gerador_4.3_clean.png',
    localizacao: 'Parque Maquidonas — Donas',
    seguro: { validade: '2026-03-10', estado: 'valido' },
    inspecao: { validade: '2026-03-10', estado: 'valido' },
    custoManutencao: 320, receitaAlugueres: 3570,
    documentos: [
      { nome: 'Manual_YEG150.pdf', data: '2022-05-01' },
    ],
    ocorrencias: [],
  },
  {
    id: 'MAQ-008', nome: 'Pá Carregadora IHI 50Z', tipo: 'Pá Carregadora', marca: 'IHI',
    ano: 2019, matricula: 'IH-500Z-PT', estado: 'Disponível', precoDia: 260,
    imagem: 'https://maquidonas.pt/wp-content/uploads/2025/05/Genie_50390RT_4.3_clean.png',
    localizacao: 'Parque Maquidonas — Donas',
    seguro: { validade: '2025-12-20', estado: 'valido' },
    inspecao: { validade: '2025-09-01', estado: 'valido' },
    custoManutencao: 2100, receitaAlugueres: 14300,
    documentos: [
      { nome: 'Certificado_CE_IHI50Z.pdf', data: '2023-02-14' },
      { nome: 'Ficha_Tecnica_IHI50Z.pdf', data: '2022-08-30' },
    ],
    ocorrencias: [
      { data: '2025-03-20', descricao: 'Revisão geral 800h', custo: 1100, resolvida: true },
      { data: '2024-09-10', descricao: 'Troca de correntes de rodado', custo: 1000, resolvida: true },
    ],
  },
  {
    id: 'MAQ-009', nome: 'Retroescavadora Terex TLB840', tipo: 'Retroescavadora', marca: 'Terex',
    ano: 2018, matricula: 'TX-8400-PT', estado: 'Disponível', precoDia: 200,
    imagem: 'https://maquidonas.pt/wp-content/uploads/2025/05/emp_telesc_4.3_clean.png',
    localizacao: 'Parque Maquidonas — Donas',
    seguro: { validade: '2025-10-05', estado: 'valido' },
    inspecao: { validade: '2025-08-15', estado: 'valido' },
    custoManutencao: 2850, receitaAlugueres: 11600,
    documentos: [
      { nome: 'Certificado_Terex_TLB840.pdf', data: '2023-04-20' },
    ],
    ocorrencias: [
      { data: '2025-01-08', descricao: 'Substituição de filtro de ar e combustível', custo: 450, resolvida: true },
    ],
  },
  {
    id: 'MAQ-010', nome: 'Dumper Articulado Volvo A25G', tipo: 'Dumper', marca: 'Volvo',
    ano: 2016, matricula: 'VL-A25G-PT', estado: 'Inactiva', precoDia: 380,
    imagem: 'https://maquidonas.pt/wp-content/uploads/2025/05/dumper_terex_4.3_clean.png',
    localizacao: 'Parque Maquidonas — Donas',
    seguro: { validade: '2025-04-01', estado: 'expirado' },
    inspecao: { validade: '2025-03-15', estado: 'expirado' },
    custoManutencao: 8900, receitaAlugueres: 28000,
    documentos: [],
    ocorrencias: [
      { data: '2025-04-01', descricao: 'Aguarda reparação de caixa de velocidades — orçamento aprovado', custo: 4500, resolvida: false },
    ],
  },
]

// ──────────────────────────────────────────────
// CLIENTES
// ──────────────────────────────────────────────
export const clientes = [
  {
    id: 'CLI-001', nome: 'Construtora Beirã Lda', nif: '512345678',
    telefone: '+351 275 123 456', email: 'geral@cbeira.pt',
    morada: 'Rua da Sé, 45 — 6230-123 Fundão',
    alugueresActivos: 1, totalHistorico: 14, totalGasto: 18640,
    notas: 'Cliente de longa data. Preferência por máquinas de grande porte. Pagamento sempre pontual.',
  },
  {
    id: 'CLI-002', nome: 'João Rodrigues Construções', nif: '198765432',
    telefone: '+351 962 111 222', email: 'joao@jrconstrucoes.pt',
    morada: 'Rua das Amendoeiras, 12 — 6230-456 Fundão',
    alugueresActivos: 1, totalHistorico: 8, totalGasto: 9200,
    notas: 'Pequena empresa de construção civil. Solicita principalmente plataformas e giratórias leves.',
  },
  {
    id: 'CLI-003', nome: 'Município do Fundão', nif: '500754789',
    telefone: '+351 275 770 000', email: 'obras@cm-fundao.pt',
    morada: 'Praça do Município — 6230-419 Fundão',
    alugueresActivos: 1, totalHistorico: 22, totalGasto: 31500,
    notas: 'Câmara Municipal. Adjudicações por concurso público. Processos administrativos mais demorados.',
  },
  {
    id: 'CLI-004', nome: 'Serra Verde Agricultura Lda', nif: '509876543',
    telefone: '+351 275 987 654', email: 'info@serraverde.pt',
    morada: 'Quinta da Serra — 6230-789 Donas, Fundão',
    alugueresActivos: 1, totalHistorico: 5, totalGasto: 4300,
    notas: 'Empresa agrícola. Necessidade sazonal (Março-Outubro). Interessados em aluguer de longa duração.',
  },
  {
    id: 'CLI-005', nome: 'Estradas de Portugal SA', nif: '503480096',
    telefone: '+351 275 550 000', email: 'contratos@ep.pt',
    morada: 'Av. das Forças Armadas — 1600-082 Lisboa',
    alugueresActivos: 0, totalHistorico: 6, totalGasto: 8900,
    notas: 'Contratos de grande dimensão. Exige seguro adicional e certificações específicas.',
  },
  {
    id: 'CLI-006', nome: 'Paulo Simões Engenharia', nif: '210456789',
    telefone: '+351 917 234 567', email: 'paulo@psengenharia.pt',
    morada: 'Rua do Comércio, 8 — 6230-200 Fundão',
    alugueresActivos: 0, totalHistorico: 3, totalGasto: 2100,
    notas: '',
  },
]

// ──────────────────────────────────────────────
// MOTORISTAS
// ──────────────────────────────────────────────
export const motoristas = [
  {
    id: 'MOT-001', nome: 'Carlos Ferreira', telefone: '+351 965 111 222',
    carta: 'C + CE + CQM', estado: 'Em serviço', entregasMes: 5,
    email: 'carlos.ferreira@maquidonas.pt',
    atribuicoes: [
      { maquina: 'MAQ-001', acao: 'Entregue', cliente: 'Construtora Beirã', data: '2025-05-12' },
      { maquina: 'MAQ-003', acao: 'Recolha programada', cliente: 'João Rodrigues Construções', data: '2025-05-22' },
    ],
  },
  {
    id: 'MOT-002', nome: 'Rui Santos', telefone: '+351 912 333 444',
    carta: 'C + CE', estado: 'Em serviço', entregasMes: 3,
    email: 'rui.santos@maquidonas.pt',
    atribuicoes: [
      { maquina: 'MAQ-006', acao: 'Entregue', cliente: 'Município do Fundão', data: '2025-05-14' },
    ],
  },
  {
    id: 'MOT-003', nome: 'António Pinto', telefone: '+351 934 555 666',
    carta: 'B + C + Empilhador', estado: 'Disponível', entregasMes: 2,
    email: 'antonio.pinto@maquidonas.pt',
    atribuicoes: [],
  },
  {
    id: 'MOT-004', nome: 'Filipe Costa', telefone: '+351 926 777 888',
    carta: 'C + CE + Grua', estado: 'Disponível', entregasMes: 4,
    email: 'filipe.costa@maquidonas.pt',
    atribuicoes: [],
  },
]

// ──────────────────────────────────────────────
// ALUGUERES
// ──────────────────────────────────────────────
export const alugueresIniciais = [
  {
    id: 'ALU-001', clienteId: 'CLI-001', maquinaId: 'MAQ-001',
    inicio: '2025-05-12', fim: '2025-05-20', valor: 2240, estado: 'Activo',
    motorista: 'Carlos Ferreira', motoristaId: 'MOT-001',
    localizacao: 'Construtora Beirã — Av. da Sé, Fundão',
    notas: 'Entrega em obra. Solicitar confirmação de recepção.',
    fatura: 'FAT-008', faturaPaga: true,
  },
  {
    id: 'ALU-002', clienteId: 'CLI-003', maquinaId: 'MAQ-006',
    inicio: '2025-05-14', fim: '2025-05-18', valor: 480, estado: 'Activo',
    motorista: 'Rui Santos', motoristaId: 'MOT-002',
    localizacao: 'CM Fundão — Rua da Liberdade (obra municipal)',
    notas: '',
    fatura: 'FAT-009', faturaPaga: false,
  },
  {
    id: 'ALU-003', clienteId: 'CLI-002', maquinaId: 'MAQ-003',
    inicio: '2025-05-16', fim: '2025-05-22', valor: 1140, estado: 'Aprovado',
    motorista: 'Carlos Ferreira', motoristaId: 'MOT-001',
    localizacao: 'João Rodrigues — Urbanização Quinta da Serra',
    notas: 'Confirmar horário de entrega.',
    fatura: null, faturaPaga: false,
  },
  {
    id: 'ALU-004', clienteId: 'CLI-004', maquinaId: 'MAQ-005',
    inicio: '2025-05-18', fim: '2025-05-19', valor: 450, estado: 'Pedido',
    motorista: null, motoristaId: null,
    localizacao: 'Serra Verde — Quinta da Serra, Donas',
    notas: 'Pedido urgente. Verificar disponibilidade motorista.',
    fatura: null, faturaPaga: false,
  },
  {
    id: 'ALU-005', clienteId: 'CLI-001', maquinaId: 'MAQ-008',
    inicio: '2025-04-20', fim: '2025-05-05', valor: 3900, estado: 'Concluído',
    motorista: 'António Pinto', motoristaId: 'MOT-003',
    localizacao: 'Construtora Beirã — Obra Alpedrinha',
    notas: '',
    fatura: 'FAT-006', faturaPaga: true,
  },
  {
    id: 'ALU-006', clienteId: 'CLI-005', maquinaId: 'MAQ-009',
    inicio: '2025-04-10', fim: '2025-04-25', valor: 3000, estado: 'Concluído',
    motorista: 'Filipe Costa', motoristaId: 'MOT-004',
    localizacao: 'EN18 — km 45 (obra de requalificação)',
    notas: '',
    fatura: 'FAT-005', faturaPaga: true,
  },
  {
    id: 'ALU-007', clienteId: 'CLI-002', maquinaId: 'MAQ-002',
    inicio: '2025-05-08', fim: '2025-05-14', valor: 1920, estado: 'Concluído',
    motorista: 'Rui Santos', motoristaId: 'MOT-002',
    localizacao: 'João Rodrigues — Bairro Novo, Fundão',
    notas: '',
    fatura: 'FAT-007', faturaPaga: false,
  },
  {
    id: 'ALU-008', clienteId: 'CLI-006', maquinaId: 'MAQ-007',
    inicio: '2025-05-20', fim: '2025-05-25', valor: 425, estado: 'Aprovado',
    motorista: 'António Pinto', motoristaId: 'MOT-003',
    localizacao: 'Paulo Simões — Obra Donas',
    notas: '',
    fatura: null, faturaPaga: false,
  },
  {
    id: 'ALU-009', clienteId: 'CLI-003', maquinaId: 'MAQ-002',
    inicio: '2025-03-01', fim: '2025-03-15', valor: 4480, estado: 'Concluído',
    motorista: 'Carlos Ferreira', motoristaId: 'MOT-001',
    localizacao: 'CM Fundão — Parque Industrial',
    notas: '',
    fatura: 'FAT-003', faturaPaga: true,
  },
  {
    id: 'ALU-010', clienteId: 'CLI-001', maquinaId: 'MAQ-005',
    inicio: '2025-02-15', fim: '2025-02-20', valor: 2250, estado: 'Concluído',
    motorista: 'Filipe Costa', motoristaId: 'MOT-004',
    localizacao: 'Construtora Beirã — Covilhã',
    notas: '',
    fatura: 'FAT-002', faturaPaga: true,
  },
]

// ──────────────────────────────────────────────
// FATURAS
// ──────────────────────────────────────────────
export const faturas = [
  { id: 'FAT-001', clienteId: 'CLI-001', aluguerRef: 'ALU-010-prev', valor: 2100, data: '2025-01-20', estado: 'Paga', serie: '2025/001' },
  { id: 'FAT-002', clienteId: 'CLI-001', aluguerRef: 'ALU-010', valor: 2250, data: '2025-02-20', estado: 'Paga', serie: '2025/002' },
  { id: 'FAT-003', clienteId: 'CLI-003', aluguerRef: 'ALU-009', valor: 4480, data: '2025-03-15', estado: 'Paga', serie: '2025/003' },
  { id: 'FAT-004', clienteId: 'CLI-004', aluguerRef: 'ALU-prev', valor: 800, data: '2025-03-28', estado: 'Anulada', serie: '2025/004' },
  { id: 'FAT-005', clienteId: 'CLI-005', aluguerRef: 'ALU-006', valor: 3000, data: '2025-04-25', estado: 'Paga', serie: '2025/005' },
  { id: 'FAT-006', clienteId: 'CLI-001', aluguerRef: 'ALU-005', valor: 3900, data: '2025-05-05', estado: 'Paga', serie: '2025/006' },
  { id: 'FAT-007', clienteId: 'CLI-002', aluguerRef: 'ALU-007', valor: 1920, data: '2025-05-14', estado: 'Pendente', serie: '2025/007' },
  { id: 'FAT-008', clienteId: 'CLI-001', aluguerRef: 'ALU-001', valor: 2240, data: '2025-05-15', estado: 'Paga', serie: '2025/008' },
  { id: 'FAT-009', clienteId: 'CLI-003', aluguerRef: 'ALU-002', valor: 480, data: '2025-05-15', estado: 'Emitida', serie: '2025/009' },
  { id: 'FAT-010', clienteId: 'CLI-006', aluguerRef: 'ALU-prev2', valor: 680, data: '2025-04-10', estado: 'Paga', serie: '2025/010' },
]

// ──────────────────────────────────────────────
// ALERTAS
// ──────────────────────────────────────────────
export const alertasIniciais = [
  { id: 'A1', tipo: 'documento', urgencia: 'alta', mensagem: 'Seguro MAQ-001 expira em 8 dias', link: '/frota', maquinaId: 'MAQ-001' },
  { id: 'A2', tipo: 'documento', urgencia: 'alta', mensagem: 'Seguro MAQ-005 expira em 23 dias', link: '/frota', maquinaId: 'MAQ-005' },
  { id: 'A3', tipo: 'documento', urgencia: 'media', mensagem: 'Inspecção MAQ-004 expira em 21 dias', link: '/frota', maquinaId: 'MAQ-004' },
  { id: 'A4', tipo: 'devolucao', urgencia: 'alta', mensagem: 'ALU-001 — devolução amanhã (20/05)', link: '/alugueres', aluguerRef: 'ALU-001' },
  { id: 'A5', tipo: 'devolucao', urgencia: 'media', mensagem: 'ALU-002 — devolução hoje (18/05)', link: '/alugueres', aluguerRef: 'ALU-002' },
  { id: 'A6', tipo: 'aprovacao', urgencia: 'media', mensagem: 'ALU-004 aguarda aprovação — Serra Verde', link: '/alugueres', aluguerRef: 'ALU-004' },
]

// ──────────────────────────────────────────────
// DADOS PARA GRÁFICOS
// ──────────────────────────────────────────────
export const receitaMensal = [
  { mes: 'Dez', receita: 5200, custos: 1800 },
  { mes: 'Jan', receita: 6100, custos: 2100 },
  { mes: 'Fev', receita: 4800, custos: 1500 },
  { mes: 'Mar', receita: 9200, custos: 2900 },
  { mes: 'Abr', receita: 7400, custos: 2200 },
  { mes: 'Mai', receita: 8450, custos: 2600 },
]

export const utilizacaoFrota = [
  { maquina: 'MAQ-001 Bobcat E85', diasAlugada: 42, totalDias: 60, ocupacao: 70, receita: 11760 },
  { maquina: 'MAQ-002 Manitou MT625', diasAlugada: 35, totalDias: 60, ocupacao: 58, receita: 11200 },
  { maquina: 'MAQ-003 JLG 450AJ', diasAlugada: 28, totalDias: 60, ocupacao: 47, receita: 5320 },
  { maquina: 'MAQ-005 Volvo FH 500', diasAlugada: 15, totalDias: 60, ocupacao: 25, receita: 6750 },
  { maquina: 'MAQ-006 Hamm HD12', diasAlugada: 38, totalDias: 60, ocupacao: 63, receita: 4560 },
  { maquina: 'MAQ-007 Yanmar YEG150', diasAlugada: 22, totalDias: 60, ocupacao: 37, receita: 1870 },
  { maquina: 'MAQ-008 IHI 50Z', diasAlugada: 30, totalDias: 60, ocupacao: 50, receita: 7800 },
  { maquina: 'MAQ-009 Terex TLB840', diasAlugada: 25, totalDias: 60, ocupacao: 42, receita: 5000 },
]

// ──────────────────────────────────────────────
// UTILIZADORES
// ──────────────────────────────────────────────
export const utilizadores = [
  { id: 'U1', nome: 'Miguel Calvário', email: 'miguel@maquidonas.pt', perfil: 'Admin', estado: 'Activo', ultimaSessao: '2025-05-15 09:32' },
  { id: 'U2', nome: 'António Calvário', email: 'antonio@maquidonas.pt', perfil: 'Admin', estado: 'Activo', ultimaSessao: '2025-05-14 18:10' },
  { id: 'U3', nome: 'Sandra Oliveira', email: 'sandra@maquidonas.pt', perfil: 'Operacional', estado: 'Activo', ultimaSessao: '2025-05-15 08:50' },
  { id: 'U4', nome: 'Carlos Ferreira', email: 'carlos.ferreira@maquidonas.pt', perfil: 'Motorista', estado: 'Activo', ultimaSessao: '2025-05-15 07:15' },
  { id: 'U5', nome: 'Rui Santos', email: 'rui.santos@maquidonas.pt', perfil: 'Motorista', estado: 'Activo', ultimaSessao: '2025-05-14 16:45' },
]
