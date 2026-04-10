import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getLevel, getResultMessage } from '../quiz/resultLevels'
import '../quiz/quiz.css'

export default function QuizResultPage() {
  const location = useLocation()
  const { user } = useAuth()
  const state = location.state
  const score = state && typeof state.score === 'number' ? state.score : null
  const quizType = state?.quizType === 'family' ? 'family' : 'personal'

  const [fillPct, setFillPct] = useState(0)

  useEffect(() => {
    if (score == null) return
    const t = setTimeout(() => {
      setFillPct(Math.min(100, Math.max(0, (score / 48) * 100)))
    }, 80)
    return () => clearTimeout(t)
  }, [score])

  if (score == null) {
    return <Navigate to="/quiz" replace />
  }

  const level = getLevel(score)
  const message = getResultMessage(level.key, quizType)

  const textoWhats = encodeURIComponent(
    quizType === 'family'
      ? 'Encontrei isso e lembrei de você.\n\nÉ um teste rápido sobre apostas — confidencial, sem pressão, sem julgamento.\n\nSe fizer sentido, dá uma olhada quando puder 👉 paredejogar.com'
      : 'Fiz um teste sobre apostas e achei importante compartilhar.\n\nÉ rápido, confidencial e sem pressão.\n\nSe fizer sentido pra você também, dá uma olhada 👉 paredejogar.com'
  )
  const whatsUrl = `https://wa.me/?text=${textoWhats}`

  return (
    <div className="result-shell">
      <div className="result-inner">
        <h1 className="result-title">Seu resultado</h1>
        <p className="result-score-line">
          Pontuação: <strong>{score}</strong> de 48
          {quizType === 'family' ? ' · visão familiar' : ' · autoavaliação'}
        </p>

        <div className="result-thermo-wrap">
          <div className="result-thermometer" aria-hidden>
            <div
              className="result-thermometer-fill"
              style={{
                height: `${fillPct}%`,
                background: `linear-gradient(180deg, ${level.color} 0%, ${level.color}cc 100%)`,
                transition: 'height 1.15s cubic-bezier(0.33, 1, 0.68, 1)',
              }}
            />
          </div>
        </div>

        <div className="result-level-badge" style={{ background: level.color }}>
          {level.label}
        </div>

        <p className="result-text">{message}</p>

        <div className="result-cta">
          <a
            href={whatsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: '#25D366',
              textDecoration: 'none',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.533 5.862L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.371l-.361-.214-3.733.978.997-3.645-.236-.374A9.862 9.862 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z" />
            </svg>
            Enviar resultado pelo WhatsApp
          </a>

          {user && (
            <Link
              to="/painel"
              className="btn-primary"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 12,
                display: 'block',
                textAlign: 'center',
                background: '#3B6D11',
                textDecoration: 'none',
              }}
            >
              Ir para o painel →
            </Link>
          )}
        </div>

        {quizType === 'family' && (
          <div style={{
            marginTop: 48,
            maxWidth: 640,
            textAlign: 'left',
            fontFamily: "'DM Sans', sans-serif",
            color: '#5F5E5A',
            lineHeight: 1.75,
          }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: '#2C2C2A', marginBottom: 24 }}>
              Guia para familiares de pessoas com problemas com jogos online
            </h2>

            {[
              {
                titulo: '1. Entendendo o problema',
                texto: 'O jogo pode começar como entretenimento, mas em algumas pessoas passa a ocupar um espaço cada vez maior na vida. A medicina reconhece que o jogo compulsivo pode se tornar um transtorno — o transtorno do jogo. Nesse processo ocorre ativação intensa do sistema de recompensa do cérebro. A expectativa de ganho, mesmo diante da perda, pode gerar repetição do comportamento. Por isso muitas pessoas dizem que vão parar e acabam voltando a jogar. Não se trata apenas de falta de caráter ou força de vontade — existe um processo psicológico e comportamental envolvido. Compreender isso ajuda a família a lidar com a situação de forma mais consciente.',
              },
              {
                titulo: '2. Como o jogo costuma afetar a família',
                texto: 'Quando o jogo se torna um problema, raramente apenas a pessoa que joga é afetada. Muitos familiares relatam preocupação constante com dinheiro, perda de confiança dentro de casa, discussões frequentes, tensão emocional e sensação de estar sempre tentando controlar a situação. Esse desgaste pode gerar ansiedade, tristeza e impotência. Reconhecer esse impacto é importante para que a família também busque apoio.',
              },
              {
                titulo: '3. Algo importante de lembrar',
                texto: 'Muitos familiares se perguntam: "Será que eu causei isso?" O desenvolvimento de um comportamento compulsivo envolve vários fatores — características individuais, contexto emocional, facilidade de acesso e fatores sociais. A família não é responsável pelo problema. Mas pode ter um papel importante no processo de recuperação.',
              },
              {
                titulo: '4. Comportamentos que podem piorar a situação',
                texto: 'Muitas vezes, tentando ajudar, o familiar acaba reforçando o problema sem perceber. Pagar dívidas repetidamente, emprestar dinheiro esperando que seja a última vez, esconder o problema ou assumir responsabilidades financeiras que eram do jogador — esse processo é chamado de facilitação involuntária. A intenção é ajudar, mas o efeito pode ser o oposto.',
              },
              {
                titulo: '5. O que pode ajudar de forma mais saudável',
                texto: 'Algumas atitudes contribuem para enfrentar o problema de forma mais construtiva: estabelecer limites claros em relação ao dinheiro, evitar financiar o comportamento de jogo, incentivar a busca de ajuda profissional, manter diálogo respeitoso sem acusações constantes e reconhecer pequenas mudanças positivas. Mudanças duradouras acontecem de forma gradual, com reorganização de hábitos e rotinas.',
              },
              {
                titulo: '6. Cuidar de si também é importante',
                texto: 'Muitos familiares acabam vivendo apenas em função do problema do outro — e isso gera desgaste emocional intenso, ansiedade constante e sensação de perda da própria vida. Cuidar de si não significa abandonar o outro. Significa preservar sua própria saúde emocional: conversar com pessoas de confiança, buscar orientação profissional, participar de grupos de apoio e manter atividades pessoais.',
              },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 32 }}>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 18, color: '#2C2C2A',
                  marginBottom: 10,
                }}>
                  {s.titulo}
                </h3>
                <p style={{ fontSize: 15 }}>{s.texto}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
