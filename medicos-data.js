/* =========================================================
   Corpo Clínico dados dos profissionais (compartilhado)
   Usado por medicos.js (index) e por medico.html (Saiba mais).
   ESQUELETO DE CONTATO: preencha instagram / email de cada um
   (deixe "" para não exibir o botão). O WhatsApp usa o da unidade.
   ========================================================= */
(function () {
  var IMG = "assets/medicos/";
  window.MEDICOS_WA = {
    "Rio de Janeiro": "https://wa.me/5521987561627",
    "Curitiba": "https://api.whatsapp.com/send?phone=5541996182974&text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta."
  };
  window.MEDICOS = [
    // ---------- Principais (ordem fixa via "featured") ----------
    { slug: "viviane-zetola", name: "Dra. Viviane de Hiroki Flumignan Zétola", spec: "Neurologia · Doppler Transcraniano", img: IMG + "viviane.jpg", initials: "VZ", unit: "Curitiba", featured: 1,
      instagram: "", email: "",
      bio: "Graduada em Medicina pela UFPR; mestrado em Medicina Interna e doutorado em Neurologia pela USP; ex-fellow na Universidade Sackler de Tel-Aviv. Neurossonologista e Membro Titular da Academia Brasileira de Neurologia; professora associada de Neurologia na UFPR e atual coordenadora do Programa de Pós-Graduação em Medicina Interna e Ciências da Saúde." },
    { slug: "sergio-bucharles", name: "Dr. Sérgio Bucharles", spec: "Nefrologia", img: IMG + "sergio-bucharles.jpg", initials: "SB", unit: "Curitiba", featured: 2,
      instagram: "", email: "",
      bio: "Médico nefrologista, com atuação e produção científica em doença renal crônica, diálise e nas complicações cardiovasculares da doença renal." },
    { slug: "paulo-zetola", name: "Dr. Paulo Roberto Zétola", spec: "Medicina Ocupacional e Esportiva", img: IMG + "paulo-zetola.jpg", initials: "PZ", unit: "Curitiba", featured: 3,
      instagram: "", email: "",
      bio: "Graduado em Medicina pela UFPR; pós-graduado em Medicina Ocupacional pela UFPR e em Medicina do Esporte pela USP; mestre em Ergonomia pela UFSC." },
    { slug: "izidoro-flumignan", name: "Dr. Izidoro de Hiroki Flumignan", spec: "Endocrinologia · Cardiologia · Medicina Preventiva", img: IMG + "izidoro.jpg", initials: "IF", unit: "Rio de Janeiro", featured: 4,
      instagram: "", email: "",
      bio: "Graduado em Medicina pela Universidade de Vassouras; residência em Clínica Médica pelo Hospital Clementino Fraga Filho (UFRJ); pós-graduado em Endocrinologia, Cardiologia, Medicina Preventiva e Administração Hospitalar; titulado pela Associação Médica Brasileira. Professor na PUC-Rio, Diretor do IFM-Rio e fundador da SoBraTA Sociedade Brasileira de Transtornos Alimentares. Coordenador do Núcleo de Pesquisas Médicas do IFM-Rio." },

    // ---------- Demais (ordem alfabética automática) ----------
    { slug: "aline-tezotto", name: "Dra. Aline da Silva Tezotto", spec: "Geriatria · Cuidados Paliativos", img: IMG + "aline.jpeg", initials: "AT", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduada em Medicina pela Universidade Positivo; residência em Clínica Médica pelo Hospital São José de Joinville; pós-graduação em Cuidados Paliativos; titulada pela Sociedade Brasileira de Geriatria e Gerontologia e pela AMB." },
    { slug: "caroline-fernandes", name: "Caroline de Araújo Fernandes", spec: "Psicologia · Terapia Cognitivo-Comportamental", img: "", initials: "CF", unit: "Rio de Janeiro",
      instagram: "", email: "",
      bio: "Psicóloga, especialista em terapia cognitivo-comportamental." },
    { slug: "decio-souza", name: "Décio Alves de Souza Júnior", spec: "Fisioterapia", img: "", initials: "DS", unit: "Rio de Janeiro",
      instagram: "", email: "",
      bio: "Fisioterapeuta, dedicado à reabilitação e à recuperação funcional do movimento." },
    { slug: "elisete-souza", name: "Elisete Luiz de Souza", spec: "Nutrição", img: IMG + "elisete.jpg", initials: "ES", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduada em Nutrição pela Uniandrade; experiência hospitalar e em pré e pós-operatório de gastroplastia redutora (cirurgia bariátrica)." },
    { slug: "juliana-januario", name: "Juliana Huebl Januário", spec: "Nutrição Funcional e Clínica", img: IMG + "juliana-januario.jpeg", initials: "JJ", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduada em Nutrição pela UFPR; especialista em Qualidade de Alimentos, em Nutrição Funcional e em Nutrição Clínica." },
    { slug: "juliano-muzzio", name: "Dr. Juliano Muzzio", spec: "Neurologia · Doppler Transcraniano", img: IMG + "juliano-muzzio.jpg", initials: "JM", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduado em Medicina pela UFPR; residência em Neurologia pelo Hospital de Clínicas da Universidade Federal do Paraná." },
    { slug: "karina-araujo", name: "Karina S. M. L. P. de Araújo", spec: "Neuropsicologia · Terapia Cognitivo-Comportamental", img: IMG + "karina-santa-marinha.jpg", initials: "KA", unit: "Rio de Janeiro",
      instagram: "", email: "",
      bio: "Neuropsicóloga, especialista em terapia cognitivo-comportamental e membro fundadora da Sociedade Brasileira de Transtornos Alimentares." },
    { slug: "maialu-ambrosio", name: "Dra. Maialu Rodrigues Ambrosio", spec: "Angiologia e Cirurgia Vascular", img: IMG + "maialu-rodrigues.jpg", initials: "MA", unit: "Rio de Janeiro",
      instagram: "", email: "",
      bio: "Médica angiologista e cirurgiã vascular, dedicada ao diagnóstico e tratamento das doenças dos vasos e da circulação." },
    { slug: "maria-leticia-fagundes", name: "Dra. Maria Letícia Fagundes", spec: "Ginecologia · Reprodução Humana", img: IMG + "maria-leticia.jpg", initials: "MF", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduada pela Faculdade Evangélica de Medicina do Paraná; especialização em Ginecologia e Obstetrícia; mestrado em Reprodução Humana e Planejamento Familiar pela USP; primeira ginecologista do Paraná titulada em Videolaparoscopia pela Sociedade Brasileira de Cirurgia Geral." },
    { slug: "olimpio-franca", name: "Dr. Olímpio R. França Neto", spec: "Cardiologia", img: IMG + "olimpio.jpeg", initials: "OF", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduado em Medicina pela UFPR; residência em Cardiologia pela UFPR; mestre em Medicina pela PUC-PR; fellow da European Society of Cardiology; presidente da Sociedade Paranaense de Cardiologia (22/23) e coautor da diretriz brasileira de síndromes coronarianas crônicas." },
    { slug: "palloma-zetola", name: "Palloma Zetola", spec: "Psicologia · Psicanálise", img: IMG + "palloma.jpeg", initials: "PZ", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduada em Psicologia pela PUCPR; pós-graduanda em Psicanálise pelo Instituto ESPE." },
    { slug: "patricia-coral", name: "Dra. Patrícia Coral", spec: "Neurologia · Neurofisiologia · Medicina do Sono", img: IMG + "patricia-coral.png", initials: "PC", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduada em Medicina pela UFSC; residência em Clínica Médica e Neurologia pela UFPR; residência em Eletroencefalografia e Epilepsia (R3) pela UFPR." },
    { slug: "paula-barros", name: "Paula de Sousa Santos Andrade Barros", spec: "Nutrição · Reeducação Alimentar", img: IMG + "paula-barros.jpeg", initials: "PB", unit: "Rio de Janeiro",
      instagram: "", email: "",
      bio: "Nutricionista com foco em reeducação alimentar, alimentação vegana e vegetariana e cuidado nutricional do diabetes." },
    { slug: "paulo-marquetti", name: "Dr. Paulo Roberto Cruz Marquetti", spec: "Cardiologia", img: IMG + "marquetti.jpg", initials: "PM", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduado em Medicina pela UFPR; titulado pela Sociedade Brasileira de Cardiologia e pela AMB; especialista em terapia intensiva pela AMIB; professor adjunto de Cardiologia da UFPR e médico intensivista do Hospital de Clínicas da UFPR." },
    { slug: "rodrigo-hasegawa", name: "Dr. Rodrigo Katsutoshi Hasegawa", spec: "Endocrinologia e Metabologia", img: IMG + "rodrigo.jpg", initials: "RH", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduado pela Faculdade Evangélica Mackenzie do Paraná; residência em Clínica Médica (HC-UFPR) e em Endocrinologia e Metabologia (SEMPR HC-UFPR); titulado pela Sociedade Brasileira de Endocrinologia e Metabologia (SBEM)." },
    { slug: "rumiko-uno", name: "Dra. Rumiko Uno", spec: "Ginecologia e Obstetrícia", img: IMG + "rumiko.jpg", initials: "RU", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduada em Medicina pela UFPR, com atuação em Ginecologia e Obstetrícia." },
    { slug: "sara-destro", name: "Dra. Sara Ferreira Destro", spec: "Cirurgia Plástica", img: IMG + "sara-ferreira.jpg", initials: "SD", unit: "Rio de Janeiro",
      instagram: "", email: "",
      bio: "Médica com atuação em Cirurgia Plástica, dedicada a procedimentos reparadores e estéticos." },
    { slug: "valter-abelardino", name: "Dr. Valter Abelardino", spec: "Psiquiatria", img: IMG + "valter.png", initials: "VA", unit: "Curitiba",
      instagram: "", email: "",
      bio: "Graduado em Medicina pela UFPR; especialista em Psiquiatria pela ABP e em Dependências Químicas pela UNIAD/EPM/UNIFESP." },
    { slug: "vitoria-flumignan", name: "Dra. Vitória Santa Marinha Flumignan", spec: "Clínica Médica · Coordenadora de Pesquisa", img: IMG + "vitoria.jpeg", initials: "VF", unit: "Rio de Janeiro",
      instagram: "", email: "",
      bio: "Graduada em Medicina pela Universidade Estácio de Sá (Rio de Janeiro); experiência clínica em Clínica Médica, Pediatria, Ginecologia, Obstetrícia e CTI em hospitais do Rio de Janeiro. Coordenadora do Centro de Pesquisas Médicas e organizadora da Biblioteca Virtual do Instituto Flumignano de Medicina (IFM-Rio)." }
  ];
})();
