const initState={
    status:'',
    fileName: ''
}
const fileReducer = (state = initState, action) =>{
    switch (action.type){
        case'UPLOAD_FILE':
            return{...state,
                status:'enviando',
                fileName: action.file 
            }
            case'CONVERT_FILE':
            return{...state,
                status:'convertendo',
                fileName: action.file   
            }
            case'FINALIZADO':
            return{...state,
                status:'finalizado',
                fileName: ''  
            }
            case'ERRO':
            return{...state,
                status:'error',
                fileName: '' 
            }
            case'LIMPAR':
            return{...state,
                status:'',
                fileName: ''
            }
        default:
            return state;
    }
}

export default fileReducer
