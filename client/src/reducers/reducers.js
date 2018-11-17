const initState={
    status:''
}
const fileReducer = (state = initState, action) =>{
    switch (action.type){
        case'UPLOAD_FILE':
            return{...state,
                status:'enviando'
            }
            case'CONVERT_FILE':
            return{...state,
                status:'convertendo'
            }
            case'FINALIZADO':
            return{...state,
                status:'finalizado'
            }
            case'ERRO':
            return{...state,
                status:'ocorreu algum erro'
            }
            case'LIMPAR':
            return{...state,
                status:''
            }
        default:
            return state;
    }
}

export default fileReducer
