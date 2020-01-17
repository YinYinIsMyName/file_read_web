import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { submit } from '../components/redux/actions'
import { FetchAddText } from '../network/api.doneFetched'
const SubmitFile = () => {
    const [file, setFile] = useState(null)
    const [textNumber, setTextNumber] = useState(0)
    const [textFile, setTextFile] = useState(null)
    const allofstate = useSelector(state => state.text)
    const dispatch = useDispatch()
    let timeoutId = null
    useEffect(()=>{
        clearTimeout(timeoutId)
    })
    //you cannot write hooks in the form of calling redux
    //it can only be called in the body of its function
    //redux can not be called in callback function like onChange={(e)=useDispatch(inputFilie(e))}
      
    const InputFile = (file, e) => {
        //for filename ==>we have to set the state like this
        //file===undefined?setFile(null):setFile(e.target.files[0].name)
        var reader = new FileReader()
        var textFile = /text.*/;
        //when you want to use function outside,u cannot declare function under of conditional operator
        //you have to declare above of conditional operator
        const ReadFile = file => {
            reader.readAsText(file)
            setFile(file.name)
            setTextNumber(1)
            reader.onload = event => {
                setTextFile(event.target.result)
            }

        }
        const setDefine = noValue => {
            setFile(noValue)
            setTextNumber(2)
        }
        window.File && window.FileReader && window.FileList && window.Blob ?
            file === undefined ? setDefine(null) : file.type.match(textFile) ?
                ReadFile(file)
                :
                setTextNumber(3)
            :
            setTextNumber(4)
        //     if (window.File && window.FileReader && window.FileList && window.Blob) {
        //         var reader = new FileReader()
        //         var textFile = /text.*/;

        //          if(file===undefined){
        //             setFile(null)
        //             setText("no file to be read")
        //          }
        //          else if (file.type.match(textFile)) {

        //             reader.readAsText(file);
        //            reader.onload = function (event) {
        //              setTextFile(event.target.result)
        //            }
        //         } else {
        //           console.log("no match")
        //         }



        //   } else {
        //      alert("Your browser is too old to support HTML5 File API");
        //  }
    }
    const ChangeText = changeValue => {
        setTextFile(changeValue)
    }

    const Button_Sumit = e => {
        e.preventDefault()

        FetchAddText({ textFile: textFile }, (netWrokErr, userErr, data) => {
            if (netWrokErr !== null) {
                console.log(netWrokErr)
            }
            else if (userErr !== null) {
                console.log(userErr.messge)
            }
            else {
                dispatch(submit(data.messge))
                setFile(null)
                setTextNumber(5)
            }
            timeoutId =setTimeout(() => {
                   window.location.reload()
            },2000);

        })

    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 my-3">
                    <div className="row">
                        <div className="col-md-10">
                            <label htmlFor="file-upload" className="custom-file-upload" style={{ backgroundColor: '#007bff', color: 'white' }}>
                                Upload File</label>
                            <input id="file-upload" type="file" onChange={(e) => InputFile(e.target.files[0], e)} accept="text/plain" />
                        </div>
                        <div className="col-md-2">
                            <span><strong>{file === null ? '' : file}</strong></span>
                        </div>
                    </div>
                    <form onSubmit={(e) => Button_Sumit(e)}>

                        <div className="form-group">
                            <textarea className="form-control" onChange={(e) => { ChangeText(e.target.value) }} value={textFile == null || file == null ? '' : textFile} style={{ width: '83%' }} id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mb-2" style={{ width: '83%' }}>Submit</button>
                    </form>
                    {textNumber == 0 ? null : textNumber == 1 ? <strong><div className="alert alert-success" role="alert" style={{ width: '83%' }}>{"succed"}
                    </div></strong> : textNumber == 2 ? <strong><div className="alert alert-warning" role="alert" style={{ width: '83%' }}>{"no file to be read"}
                    </div></strong> : textNumber == 3 ? <strong><div className="alert alert-danger" role="alert" style={{ width: '83%' }}>{"file doesn't match"}
                    </div></strong> : textNumber == 4 ? <strong><div className="alert alert-warning" role="alert" style={{ width: '83%' }}>{"file is not supported"}
                    </div></strong> : textNumber == 5 ? <strong><div className="alert alert-success" role="alert" style={{ width: '83%' }}>{allofstate}
                    </div></strong> : null

                    }

                </div>
            </div>
        </div>
    )
}
export default SubmitFile