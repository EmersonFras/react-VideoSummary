import { useState, useEffect } from "react"
import { useUpdateVideoMutation, useDeleteVideoMutation } from "./videosApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"



const TITLE_REGEX = /^[A-z0-9]{3,20}$/
const DESCRIPTION_REGEX = /^[A-z0-9!@#$%]{0,100}$/

const EditVideoForm = ({ video }) => { 
  
  const [updateVideo, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateVideoMutation()

  const [deleteVideo, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delError
  }] = useDeleteVideoMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(video.title)
  const [validTitle, setValidTitle] = useState(false)
  const [description, setDescription] = useState(video.description)
  const [validDescription, setValidDescription] = useState(false)

  useEffect(() => {
    setValidTitle(TITLE_REGEX.test(title))
  }, [title])

  useEffect(() => {
    setValidDescription(DESCRIPTION_REGEX.test(description))
  }, [description])

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('')
      setDescription('')
      navigate(`/dash/videos?userId=${video.user}`)
    }
  }, [isSuccess, isDelSuccess, navigate, video])

  const onTitleChanged = e => setTitle(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)

  const onSaveVideoClicked = async (e) => {
    await updateVideo({ id: video.id, title, description })
  }

  const onDeleteVideoClicked = async (e) => {
    await deleteVideo({ id: video.id })
  }

  let canSave = [validTitle, validDescription].every(Boolean) && !isLoading

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const validTitleClass = !validTitle ? "form__input--incomplete" : ""
  const validDescriptionClass = !validDescription ? "form__input--incomplete" : ""

  const errContent = (error?.data?.message || delError?.data?.message) ?? ''

  const content = (
    <>
        <p className={errClass}>{errContent}</p>

        <form className="form" onSubmit={e => e.preventDefault()}>
            <div className="form__title-row">
                <h2>Edit Video</h2>
                <div className="form__action-buttons">
                    <button className="icon-button" title="Save" onClick={onSaveVideoClicked} disabled={!canSave}>
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button className="icon-button" title="Delete" onClick={onDeleteVideoClicked}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </div>
            <label className="form__label" htmlFor="title">
                Title: <span className="nowrap"></span></label>
            <input 
                className={`form__input ${validTitleClass}`} 
                id="title" 
                name="title" 
                type="text" 
                autoComplete="off" 
                value={title} 
                onChange={onTitleChanged} 
            />
            <label className="form__label" htmlFor="description">
                Description: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
            <input 
                className={`form__input ${validDescriptionClass}`} 
                id="description" 
                name="description" 
                type="description" 
                value={description} 
                onChange={onDescriptionChanged} 
            />
        </form>
    </>
)

  return content
}

export default EditVideoForm