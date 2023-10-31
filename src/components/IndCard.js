import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import './styles/indcard.css'

function IndCard({card}) {
  const {theme} = useContext(ThemeContext)
  return (
    <div className={`ind-subject-container`}>
      <div className={`ind-subject-wrapper-${theme}`}>
        <div className={`ind-subject-header`}>
          <div>{card.subjectName}</div>
          <div>{card.subjectID}</div>
          <div>{card.percentage} ({card.letterGrade.slice(2) && card.letterGrade.slice(2) === 'minus' ? card.letterGrade[0]+"-" : card.letterGrade.slice(2) && card.letterGrade.slice(2) === 'plus'? card.letterGrade[0]+'+' : card.letterGrade[0]})</div>
        </div>
        <div className={`ind-subject-details`}>
          {card.semester}
        </div>
      </div>
    </div>
  )
}

export default IndCard