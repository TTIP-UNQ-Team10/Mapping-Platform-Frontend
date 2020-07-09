import React, { useState } from 'react'
import { ChromePicker } from 'react-color'

const NavbarSettings = ({ pickerButtonClass, onColorValuePicked }) => {

  const [pickedColor1, setPickedColor1] = useState(pickerButtonClass.backgroundColor)
  const [pickedColor2, setPickedColor2] = useState(pickerButtonClass.backgroundColor)
  const [pickedColor3, setPickedColor3] = useState(pickerButtonClass.backgroundColor)
  const [showPicker1, setShowPicker1] = useState(false)
  const [showPicker2, setShowPicker2] = useState(false)
  const [showPicker3, setShowPicker3] = useState(false)
  let objectData = {
    navBarOptions: {
      activeColor: null,
      backgroundColor: null,
      inactiveColor: null
    }
  }

  const onPickedChange = (color, setColorFunction) => {
    const { hex } = color
    setColorFunction(hex)
  }

  const onPickedChangeComplete = (color, element, option) => {
    objectData[element][option] = color.hex
    onColorValuePicked(color.hex, `colors.${element}.${option}`)
  }


  return (
    <div>
      <h5>Navbar</h5>
      <div className="row">
        <div className="input-group mb-3">
          <label className="input-group-text" style={pickerButtonClass}>Background</label>
          <input type="text" className="form-control" value={pickedColor1} disabled/>
          <div className="input-group-append">
            <button className="btn btn-small"
              style={pickerButtonClass}
              onClick={() => setShowPicker1(!showPicker1)}>
              { showPicker1 ?
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
            onChangeComplete={(color) => onPickedChangeComplete(color, 'navBarOptions', 'backgroundColor')}
            onChange={(color) => onPickedChange(color, setPickedColor1)}
          /> : null
        }
      </div>

      <div className="row">
        <div className="input-group mb-3">
          <label className="input-group-text" style={pickerButtonClass}>Elemento Activo</label>
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
            color={pickedColor2}
            onChangeComplete={(color) => onPickedChangeComplete(color, 'navBarOptions', 'activeColor')}
            onChange={(color) => onPickedChange(color, setPickedColor2)}
          /> : null
        }
      </div>

      <div className="row">
        <div className="input-group mb-3">
          <label className="input-group-text" style={pickerButtonClass}>Elemento Inactivo</label>
          <input type="text" className="form-control" value={pickedColor3} disabled/>
          <div className="input-group-append">
            <button className="btn btn-small"
              style={pickerButtonClass}
              onClick={() => setShowPicker3(!showPicker3)}>
              {showPicker3 ?
                  <i class="fa fa-times" aria-hidden="true"></i> :
                  <i class="fa fa-paint-brush" aria-hidden="true"></i>
              }
            </button>
          </div>
        </div>
        {
          showPicker3 ?
          <ChromePicker
            color={pickedColor3}
            onChangeComplete={(color) => onPickedChangeComplete(color, 'navBarOptions', 'inactiveColor')}
            onChange={(color) => onPickedChange(color, setPickedColor3)}
          /> : null
        }
      </div>
    </div>
  )
}

export default NavbarSettings
