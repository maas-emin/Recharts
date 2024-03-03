import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataEnd, addDataStart } from '../redux/charactersReducer'
import s from './enteringStyles.module.css'
import { RootState } from '../redux/store/storePoter'

const EnteringDate: FC = () => {
  const { characters, sortCharacters } = useSelector(
    (state: RootState) => state.gariPoter
  )

  const dispatch = useDispatch()
  const [valueStart, setValueStart] = useState('1800-02-10')
  const [valueEnd, setValueEnd] = useState('2000-02-10')
  const [togle, setTogle] = useState(false)

  const heandleOnChandeStart: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setValueStart(e.target.value)
  }

  const heandleOnChandeEnd: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setValueEnd(e.target.value)
  }

  useEffect(() => {
    dispatch(addDataStart(valueStart))
    dispatch(addDataEnd(valueEnd))
  }, [])

  const clickButton = () => {
    if (valueStart && valueEnd) {
      dispatch(addDataStart(valueStart))
      dispatch(addDataEnd(valueEnd))
      setValueStart('')
      setValueEnd('')
      console.log('ok')
    }
    if (valueStart.length < 10 && valueEnd.length < 10) {
      setTogle(true)
    }
  }

  return (
    <div>
      <div className={s.div_info}>
        По вашему запросу надено:
        {` ${Object.keys(sortCharacters).length} факультета, ${
          characters.length
        } студентов`}
      </div>
      <div className={s.rod_block}>
        <p
          className={s.p}
          style={
            valueStart.length === 10
              ? { borderBottom: '1px solid green' }
              : { borderBottom: '1px solid red' }
          }
        >
          Введите дату "C"
        </p>
        <input
          className={s.input}
          type="date"
          value={valueStart}
          onChange={(e) => heandleOnChandeStart(e)}
        />
        <p
          className={s.p}
          style={
            valueEnd.length === 10
              ? { borderBottom: '1px solid green' }
              : { borderBottom: '1px solid red' }
          }
        >
          Введите дату "ДО"
        </p>
        <input
          className={s.input}
          type="date"
          value={valueEnd}
          onChange={(e) => heandleOnChandeEnd(e)}
        />
      </div>
      <button className={s.button} onClick={clickButton}>
        Введите дату и нажми на меня
      </button>
      {togle && <div className={s.div_error}>сначала введите дату</div>}
    </div>
  )
}

export default EnteringDate
