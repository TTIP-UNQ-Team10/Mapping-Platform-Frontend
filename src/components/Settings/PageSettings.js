import React, { useState } from 'react'
import { ChromePicker } from 'react-color'

const PageSettings = ({ pickerButtonClass, onColorValuePicked }) => {

  const [pickedColor1, setPickedColor1] = useState(pickerButtonClass.backgroundColor)
  const [pickedColor2, setPickedColor2] = useState(pickerButtonClass.backgroundColor)
  const [pickedColor3, setPickedColor3] = useState('')
  const [pickedColor4, setPickedColor4] = useState(pickerButtonClass.backgroundColor)

  const [showPicker1, setShowPicker1] = useState(false)
  const [showPicker2, setShowPicker2] = useState(false)
  const [showPicker4, setShowPicker4] = useState(false)


  let objectData = {
    appBackgroundColor: {
      backgroundColor: null
    },
    primaryText: {
      color: null
    },
    secondaryText: {
      color: null
    },
    appLogo: null,
    favicon: null,
    name: null
  }

  const onPickedChange = (value, setColorFunction, input) => {

    if (input) {
      const inputKeys = input.split('.')
      setColorFunction(value.target.value)
      onPickedChangeComplete(value.target.value, inputKeys[1])
    } else {
      setColorFunction(value.hex)
    }
  }

  const onPickedChangeComplete = (value, element, option) => {
    option ? objectData[element][option] = value.hex : objectData[element] = value.hex
    if (option) {
      onColorValuePicked(value.hex, `colors.${element}.${option}`)
    } else {
      onColorValuePicked(value, `${element}`)
    }
  }


  return (
    <div>
      <h5>Página</h5>
      <div className="row">
        <div className="input-group mb-3">
          <label className="input-group-text" style={pickerButtonClass}>Page Background</label>
          <input type="text" className="form-control" value={pickedColor1} disabled/>
          <div className="input-group-append">
            <button className="btn btn-small"
              style={pickerButtonClass}
              onClick={() => setShowPicker1(!showPicker1)}>
              {showPicker1 ?
                  <i class="fa fa-times" aria-hidden="true"></i> :
                  <i class="fa fa-paint-brush" aria-hidden="true"></i>
              }
            </button>
          </div>
        </div>
        {
          showPicker1 ?
          <ChromePicker
            color={pickedColor1}
            onChangeComplete={(color) => onPickedChangeComplete(color, 'appBackgroundColor', 'backgroundColor')}
            onChange={(color) => onPickedChange(color, setPickedColor1)}
          /> : null
        }
        <div className="input-group mb-3">
          <label className="input-group-text" style={pickerButtonClass}>Texto Principal</label>
          <input type="text" className="form-control" value={pickedColor2} disabled/>
          <div className="input-group-append">
            <button className="btn btn-small"
              style={pickerButtonClass}
              onClick={() => setShowPicker2(!showPicker2)}>
              {showPicker2 ?
                  <i class="fa fa-times" aria-hidden="true"></i> :
                  <i class="fa fa-paint-brush" aria-hidden="true"></i>
              }
            </button>
          </div>
        </div>
        {
          showPicker2 ?
          <ChromePicker
            color={pickedColor3}
            onChangeComplete={(color) => onPickedChangeComplete(color, 'primaryText', 'color')}
            onChange={(color) => onPickedChange(color, setPickedColor2)}
          /> : null
        }
        <div className="input-group mb-3">
          <label className="input-group-text" style={pickerButtonClass}>Nombre</label>
          <input type="text" className="form-control" value={pickedColor3}
            onChange={(e) => onPickedChange(e, setPickedColor3, 'input.name')}
          />
        </div>
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text" style={pickerButtonClass}>Texto Secundario</label>
        <input type="text" className="form-control" value={pickedColor4} disabled/>
        <div className="input-group-append">
          <button className="btn btn-small"
            style={pickerButtonClass}
            onClick={() => setShowPicker4(!showPicker4)}>
            {showPicker4 ?
                <i class="fa fa-times" aria-hidden="true"></i> :
                <i class="fa fa-paint-brush" aria-hidden="true"></i>
            }
          </button>
        </div>
      </div>
      {
        showPicker4 ?
        <ChromePicker
          color={pickedColor4}
          onChangeComplete={(color) => onPickedChangeComplete(color, 'secondaryText', 'color')}
          onChange={(color) => onPickedChange(color, setPickedColor4)}
        /> : null
      }
    </div>
  )
}

export default PageSettings
