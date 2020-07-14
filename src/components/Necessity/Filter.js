import React, { useState } from 'react'

const storage = window.localStorage

const Filter = ({data, onSelectFilter, type, enable}) => {
  const settings = storage.getItem('styles')
  const config = JSON.parse(settings)
  const { colors } = config

  const styles = {
    filter__button: {
      backgroundColor: colors.backgroundColor,
      color: colors.primaryText.color,
      boderColor: `${colors.buttonColor.backgroundColor}`,
      transition: '0.2s',
      width: '100%'
    },
    dropdown_item: {
      backgroundColor: colors.appBackgroundColor.backgroundColor,
      color: colors.primaryText.color
    }
  }

  const [dataSelected, setDataSelected] = useState(null)

  const onCategorySelected = dataObject => {
    setDataSelected(dataObject)
    onSelectFilter(dataObject)
  }

  const getFilterButtonStyleClass = (enable) => {
    return enable ? 'filter_button btn btn-lg dropdown-toggle' : 'btn btn-lg dropdown-toggle'
  }

  return (
      <div className="dropdown btn-group dropright">
        <button className={getFilterButtonStyleClass(enable)}
          type="button" id="dropdownFilterButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={styles.filter__button}
          disabled={!enable}
        >
          {
            dataSelected ?
              <span>{dataSelected}</span> :
              <span>{type}</span>
          }
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownFilterButton" style={styles.dropdown_item}>
          <button className="dropdown-item" style={styles.dropdown_item} onClick={() => onCategorySelected(null)}>Todas</button>
          {
            data ?
              data.map( dataObject =>
                <button className="dropdown-item" style={styles.dropdown_item} onClick={() => onCategorySelected(dataObject.name)}>{dataObject.name}</button>
              ) : null
          }
        </div>
      </div>
  )
}

export default Filter
