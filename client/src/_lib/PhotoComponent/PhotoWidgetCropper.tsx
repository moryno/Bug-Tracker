import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css"

interface IProps{
    imagePreview: string,
    onSetCopper: (cropper: Cropper) => void;
}
const PhotoWidgetCropper:React.FC<IProps> = ({ imagePreview, onSetCopper}) => {
  return (
    <Cropper 
        src={imagePreview}
        style={{ height: 200, width: "100%"}}
        initialAspectRatio={1}
        aspectRatio={1}
        preview={".img-preview"}
        guides={false}
        viewMode={1}
        autoCropArea={1}
        background={false}
        onInitialized={cropper => onSetCopper(cropper)}
    />
  )
}

export default PhotoWidgetCropper