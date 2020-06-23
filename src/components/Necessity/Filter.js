import React, { useState } from 'react'
import config from '../../config.js'

const { colors } = config

const Filter = ({data, onSelectFilter, type}) => {
  const styles = {
    filter__button: {
      backgroundColor: 'transparent',
      color: colors.buttonColor.backgroundColor,
      border: `1px dashed ${colors.buttonColor.backgroundColor}`
    }
  }

  const [dataSelected, setDataSelected] = useState(null)

  const onCategorySelected = dataObject => {
    setDataSelected(dataObject)
    onSelectFilter(dataObject)
  }

  return (
      <div className="dropdown btn-group dropright ml-3">
        <button className="btn btn-lg dropdown-toggle filter_button"
          type="button" id="dropdownFilterButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={styles.filter__button}
        >
          {
            dataSelected ?
              dataSelected :
              type
          }
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownFilterButton">
          <a className="dropdown-item" onClick={() => onCategorySelected(null)}>Todas</a>
          {
            data ?
              data.map( dataObject =>
                <a className="dropdown-item" onClick={() => onCategorySelected(dataObject.name)}>{dataObject.name}</a>
              ) : null
          }
        </div>
      </div>
  )
}

export default Filter
