import {
  deleteObject,
  getDownloadURL,
  list,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { useEffect, useState } from 'react'
import { projectStorage } from '../firebase'

export const useFiles = (id: string) => {
  const storageRef = ref(projectStorage, `${id}`)
  const [files, setFiles] = useState<{ name: string; url: string }[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const f = async () => {
      const data = await getFile()

      setFiles(data)
    }

    f()
  }, [id, setFiles, setLoading])

  const uploadFile = (id: string, files: any) => {
    for (let i in files) {
      if (files[i]?.name) {
        const storageRef = ref(projectStorage, `${id}/${files[i]?.name}`)
        uploadBytesResumable(storageRef, files[i])
      }
    }
  }

  const getFile = async () => {
    setLoading(true)
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

    // return Promise.all(urlsList.items.map((item) => getDownloadURL(item)))
  }

  const deleteFile = (url: string) => {
    const fileRef = ref(storageRef, url)
    deleteObject(fileRef)
  }

  return { files, loading, getFile, uploadFile, deleteFile }
}
