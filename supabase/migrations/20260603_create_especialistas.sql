-- Diretório Nacional de Especialistas em Ludopatia
-- Rodar no Supabase SQL Editor: https://supabase.com/dashboard/project/gybzuhopxhlbewhjihnd/sql/new

CREATE TABLE IF NOT EXISTS especialistas (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome              text NOT NULL,
  registro          text NOT NULL,           -- CRP / CRM
  tipo              text NOT NULL CHECK (tipo IN ('psicologo','psiquiatra','outro')),
  especialidades    text[] DEFAULT '{}',     -- tags de especialidade
  cidade            text NOT NULL,
  estado            char(2) NOT NULL,        -- UF
  telefone          text,
  email             text NOT NULL,
  whatsapp          text,
  site              text,
  foto_url          text,
  bio               text,
  atende_online     boolean NOT NULL DEFAULT false,
  atende_presencial boolean NOT NULL DEFAULT true,
  verificado        boolean NOT NULL DEFAULT false,
  ativo             boolean NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now()
);

-- Índices para busca rápida
CREATE INDEX IF NOT EXISTS especialistas_estado_idx ON especialistas (estado);
CREATE INDEX IF NOT EXISTS especialistas_cidade_idx ON especialistas (cidade);
CREATE INDEX IF NOT EXISTS especialistas_ativo_idx  ON especialistas (ativo, verificado);

-- Row Level Security
ALTER TABLE especialistas ENABLE ROW LEVEL SECURITY;

-- Leitura pública: apenas ativos aparecem na busca
CREATE POLICY "especialistas_leitura_publica" ON especialistas
  FOR SELECT USING (ativo = true);

-- Inserção pública: qualquer profissional pode cadastrar (passa por verificação manual)
CREATE POLICY "especialistas_insercao_publica" ON especialistas
  FOR INSERT WITH CHECK (true);

-- Admins podem fazer tudo (service_role ignora RLS automaticamente)
