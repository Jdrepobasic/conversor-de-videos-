export const UploadFileAction = (file) =>{
    return({
        type: 'UPLOAD_FILE',
        file
    })
}
export const ConvertingFile = (file) =>{
    return({
        type: 'CONVERT_FILE',
        file
    })
}
export const Finalized = () =>{
    return({
        type: 'FINALIZADO',
        
    })
}
export const ErrorUpload = () =>{
    return({
        type: 'ERROR',
        
    })
}
export const Clean = (file) =>{
    return({
        type: 'LIMPAR',
    })
}