import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

interface IProp{
    onFileChange: (file: any) => void;
}
const dzStyles ={
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    textAlign: "center" as "center",
    height: 200,
    width: "100%",
    cursor: "pointer"
}
const dzActive = {
    borderColor: "#12CC1B",
}
export function PhotoWidgetDropzone({
    onFileChange
} : IProp) {

  const onDrop = useCallback((acceptedFiles: object[]) => {
    onFileChange(acceptedFiles.map((file: any) => Object.assign(file, {
        preview: URL.createObjectURL(file)
    })))
  }, [onFileChange]);
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}