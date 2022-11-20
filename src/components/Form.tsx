import React, { FC } from 'react'
import { IInputData } from '../utils/types'

interface IProps {
  text: string
  inputData: IInputData
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => Promise<void>
  onFile?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Form: FC<IProps> = ({ text, inputData, onInput, onSubmit, onFile }) => {
  return (
    <div className="input__container">
      <h2>{text} запись.</h2>
      <input
        type="text"
        className="input"
        name="title"
        value={inputData.title}
        onChange={onInput}
        placeholder="Заголовок"
      />
      <input
        type="text"
        className="input"
        name="description"
        value={inputData.description}
        onChange={onInput}
        placeholder="Описание"
      />
      <input type="date" name="completion" onChange={onInput} />
      <input type="file" onChange={onFile} multiple />
      <button className="btn" onClick={onSubmit}>
        {text}
      </button>
    </div>
  )
}

export default Form
