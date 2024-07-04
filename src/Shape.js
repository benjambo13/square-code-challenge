import { useState, useMemo } from 'react'
import './Shape.css'

export const Shape = ({ data }) => {
  const [activeSquares, setActiveSquares] = useState([])

  const flatData = useMemo(() => data.flat(), [data])
  const visibleSquareCount = useMemo(() => flatData.reduce((acc, nextItem) => acc + nextItem, 0), [flatData])

  const isSquareVisible = item => item === 1

  const isSquareActive = index => activeSquares.includes(index)

  const onSquareClick = (item, index) => {
    if (!isSquareVisible(item) || isSquareActive(index)) return

    setActiveSquares(prevActiveSquares => [...prevActiveSquares, index])

    if (activeSquares.length + 1 === visibleSquareCount) {
      unloadActiveSquares(visibleSquareCount)
    }
  }

  const unloadActiveSquares = numToDelete => {
    if (numToDelete > 0) {
      setActiveSquares(prevActiveSquares => prevActiveSquares.slice(1))

      setTimeout(() => unloadActiveSquares(numToDelete - 1), 750)
    }
  }

  return (
    <div className='shape'>
      {flatData.map((item, index) => (
        <div
          key={index}
          className={`square ${isSquareVisible(item) && 'square-visible'} ${isSquareActive(index) && 'square-active'}`}
          onClick={() => onSquareClick(item, index)}
        />
      ))}
    </div>
  )
}