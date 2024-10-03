import { Button, Col, Row } from "antd";
import {  StyledButtonGroup, StyledCheckedIcon, StyledCloseIcon, StyledModal, StyledPhotoStepLabel } from "../StyledComponents"
import { PhotoWidgetDropzone } from "./PhotoWidgetDropzone"
import { useCallback, useEffect, useState } from "react"
import PhotoWidgetCropper from "./PhotoWidgetCropper"
import { useCreateService } from "_hooks";
import { DomianEnum } from "_constants";
import { PhotoService } from "utils";

interface IProps{
    visible: boolean,
    onCancel: () => void,
    width?: number | string
}
export const PhotoComponent:React.FC<IProps> = ({ visible, onCancel, width}) => {
    const [files, setFiles] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [cropper, setCropper] = useState<Cropper>();
    const uploadImage = useCreateService(PhotoService.uploadPhoto, DomianEnum.PROFILE);

    const onCrop = () => {
        if(cropper){
            cropper.getCroppedCanvas().toBlob(blob => uploadProfile(blob!))
        }
    }

    const closeModal = () => {
        onCancel()
    }

    const uploadProfile = async (file: Blob) => {
 
        try {
            setUploading(true)
           const formData = new FormData();
           formData.append("File", file)
           await uploadImage.mutateAsync(formData);
           setUploading(false);
           setFiles([]);
           closeModal()
        } catch (error) {
           console.log(error);
           setUploading(false) 
        }
    }

    const onSetCropper = useCallback((cropper: Cropper) => {
        setCropper(cropper)
    }, [])

    useEffect(() => {
        return () => {
            files.forEach(( file: object & { preview: string }) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    const onFileChange = useCallback((file: any) => {
        setFiles(file)
      },[]);

  return (
    <StyledModal
        destroyOnClose={true}
        title={""}
        open={visible}
        onCancel={closeModal}
        footer={null}
        width={width ? width : 1000}
    >
        <Row gutter={6}>
            <Col span={8}>
                <StyledPhotoStepLabel>Step 1 - Add Photo</StyledPhotoStepLabel>
                <PhotoWidgetDropzone 
                     onFileChange={onFileChange}
                 />
            </Col>
            <Col span={1} />
            <Col span={8}>
               <StyledPhotoStepLabel>Step 2 - Resize image</StyledPhotoStepLabel>
               { files && files.length > 0 &&
                 <PhotoWidgetCropper imagePreview={files[0].preview} onSetCopper={onSetCropper} />
               }
            </Col>
            <Col span={1} />
            <Col span={6}>
               <StyledPhotoStepLabel>Step 3 - Resize image</StyledPhotoStepLabel>
               {files && files.length > 0 &&
               <>
               <div className="img-preview" style={{ minHeight: 200, overflow: "hidden"}}></div>
               <StyledButtonGroup>
                <Button style={{width: "100%"}} loading={uploading} onClick={onCrop} type="primary"> <StyledCheckedIcon /></Button>
                <Button style={{width: "100%"}} disabled={uploading} onClick={() => setFiles([])}><StyledCloseIcon /></Button>
               </StyledButtonGroup>
               </>
                }
            </Col>
        </Row>
    </StyledModal>
  )
}
