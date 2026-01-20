'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '×':
        return prev * current
      case '÷':
        return prev / current
      default:
        return current
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const handlePercentage = () => {
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }

  const handleSign = () => {
    const value = parseFloat(display)
    setDisplay(String(value * -1))
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>{display}</div>
      <div className={styles.buttons}>
        <button className={styles.function} onClick={handleClear}>AC</button>
        <button className={styles.function} onClick={handleSign}>+/-</button>
        <button className={styles.function} onClick={handlePercentage}>%</button>
        <button className={styles.operator} onClick={() => handleOperation('÷')}>÷</button>

        <button className={styles.number} onClick={() => handleNumber('7')}>7</button>
        <button className={styles.number} onClick={() => handleNumber('8')}>8</button>
        <button className={styles.number} onClick={() => handleNumber('9')}>9</button>
        <button className={styles.operator} onClick={() => handleOperation('×')}>×</button>

        <button className={styles.number} onClick={() => handleNumber('4')}>4</button>
        <button className={styles.number} onClick={() => handleNumber('5')}>5</button>
        <button className={styles.number} onClick={() => handleNumber('6')}>6</button>
        <button className={styles.operator} onClick={() => handleOperation('-')}>-</button>

        <button className={styles.number} onClick={() => handleNumber('1')}>1</button>
        <button className={styles.number} onClick={() => handleNumber('2')}>2</button>
        <button className={styles.number} onClick={() => handleNumber('3')}>3</button>
        <button className={styles.operator} onClick={() => handleOperation('+')}>+</button>

        <button className={`${styles.number} ${styles.zero}`} onClick={() => handleNumber('0')}>0</button>
        <button className={styles.number} onClick={handleDecimal}>.</button>
        <button className={styles.operator} onClick={handleEquals}>=</button>
      </div>
    </div>
  )
}
