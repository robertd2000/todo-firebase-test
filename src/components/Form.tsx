import React, { FC } from 'react'
import { checkDate } from '../utils/date'
import { IInputData } from '../utils/types'

interface IProps {
  text: string
  inputData: IInputData
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => Promise<void>
  onFile?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Form: FC<IProps> = ({ text, inputData, onInput, onSubmit, onFile }) => {
  const isValid =
    inputData.title &&
    inputData.description &&
    inputData.completion &&
    checkDate(inputData.completion)

  return (
    <div className="input__container">
      <h2>{text} запись.</h2>
      <input
        type="text"
        className={`input ${inputData.title ? '' : 'invalid'}`}
        name="title"
        value={inputData.title}
        onChange={onInput}
        placeholder="Заголовок"
      />
      <input
        type="text"
        className={`input ${inputData.description ? '' : 'invalid'}`}
        name="description"
        value={inputData.description}
        onChange={onInput}
        placeholder="Описание"
      />
      <input
        type="date"
        className={`datepicker ${inputData.completion ? '' : 'invalid'}`}
        name="completion"
        onChange={onInput}
      />
      <input
        type="file"
        onChange={onFile}
        multiple
        accept="image/png, image/jpeg"
      />
      <button className="btn" onClick={onSubmit} disabled={!isValid}>
        {text}
      </button>
    </div>
  )
}

export default Form
