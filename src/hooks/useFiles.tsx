import {
  deleteObject,
  getDownloadURL,
  list,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { useEffect, useState } from 'react'
import { projectStorage } from '../firebase'
import { IFile } from '../utils/types'

export const useFiles = (id: string) => {
  const storageRef = ref(projectStorage, `${id}`)
  const [files, setFiles] = useState<IFile[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const f = async () => {
      const data = await getFile()

      setFiles(data)
    }

    f()
  }, [id, setFiles, setLoading])

  const uploadFile = (id: string, filesData: any) => {
    try {
      for (let i in filesData) {
        const file = filesData[i]

        if (file?.name) {
          const storageRef = ref(projectStorage, `${id}/${filesData[i]?.name}`)
          uploadBytesResumable(storageRef, filesData[i])
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getFile = async () => {
    try {
      const urlsList = await list(storageRef, { maxResults: 100 })

      return Promise.all(
        urlsList.items.map(async (item) => {
          const url = await getDownloadURL(item)
          return {
            name: item.name,
            url,
          }
        })
      )
    } catch (error) {
      console.log(error)

      return []
    }

    // return Promise.all(urlsList.items.map((item) => getDownloadURL(item)))
  }

  const deleteFile = (url: string) => {
    try {
      const fileRef = ref(storageRef, url)
      const res = files.filter((file) => file.url !== url)
      setFiles(res)
      deleteObject(fileRef)
    } catch (error) {
      console.log(error)
    }
  }

  return { files, loading, getFile, uploadFile, deleteFile }
}
