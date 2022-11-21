import React, { FC } from 'react'
import { IFile } from '../utils/types'

interface IProps {
  files: IFile[]
  deleteFile?: (url: string) => void
}

const FilesItem: FC<IProps> = ({ files, deleteFile = () => {} }) => {
  return (
    <div className="">
      {files
        .filter((i) => !i.name.includes('item'))
        .map((file) => (
          <img
            className="img"
            key={file.name + Math.random() * 1000}
            src={file.url}
            alt=""
            onClick={(e) => {
              e.currentTarget.style.borderBlockColor = 'red'
              deleteFile(file.name)
            }}
          />
        ))}
    </div>
  )
}

export default FilesItem
