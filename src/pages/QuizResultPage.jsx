import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { getLevel, getResultMessage } from '../quiz/resultLevels'
import '../quiz/quiz.css'

export default function QuizResultPage() {
  const location = useLocation()
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
          <Link to="/cadastrar" className="btn-primary" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Cadastre-se gratuitamente para salvar seu resultado
          </Link>
        </div>
      </div>
    </div>
  )
}
