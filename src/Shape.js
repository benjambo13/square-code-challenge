import { useState, useMemo } from 'react'
import './Shape.css'

export const Shape = ({ data }) => {
  const [activeSquares, setActiveSquares] = useState([])
  const [isUnloading, setIsUnloading] = useState(false)

  const flatData = useMemo(() => data.flat(), [data])
  const visibleSquareCount = useMemo(() => flatData.reduce((acc, nextItem) => acc + nextItem), [flatData])

  const isSquareVisible = item => item === 1

  const isSquareActive = index => activeSquares.includes(index)

  const onSquareClick = event => {
    const itemString = event.target.getAttribute('data-item')
    if (!itemString) return
  
    const item = parseInt(event.target.getAttribute('data-item'))
    const index = parseInt(event.target.getAttribute('data-index'))
    if (!isSquareVisible(item) || isSquareActive(index) || isUnloading) return

    setActiveSquares(prevActiveSquares => [...prevActiveSquares, index])

    if (activeSquares.length + 1 === visibleSquareCount) {
      setIsUnloading(true)
      unloadActiveSquares(visibleSquareCount)
    }
  }

  const unloadActiveSquares = numToDelete => {
    if (numToDelete > 0) {
      setActiveSquares(prevActiveSquares => prevActiveSquares.slice(1))

      setTimeout(() => unloadActiveSquares(numToDelete - 1), 750)
    } else {
      setIsUnloading(false)
    }
  }

  return (
    <div className='shape' onClick={onSquareClick}>
      {flatData.map((item, index) => (
        <div
          key={index}
          className={`
            square
            ${isSquareVisible(item) && 'square-visible'}
            ${isSquareActive(index) && 'square-active'}
            ${isUnloading && 'square-unloading'}
          `}
          data-item={item}
          data-index={index}
        />
      ))}
    </div>
  )
}
