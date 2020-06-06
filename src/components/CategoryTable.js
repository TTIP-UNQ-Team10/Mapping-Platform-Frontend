import React from 'react'
import config from '../config.js'

const { colors } = config

const categoryList = ({ data }) => {

  const styles = {
    table__head: {
      backgroundColor: colors.navBarOptions.backgroundColor,
      color: colors.buttonColor.textColor,
      opacity: 0.9,
    }
  }

  return (
    <table className="table table-striped table-md" >
      <thead className="thead" style={styles.table__head}>
        <th style={{width: '90%'}}>Categorías</th>
        <th style={{width: '10%'}}></th>
      </thead>
      <tbody>
        {
          data.map(category => {
            return (
              <tr id={`category:${category.id}`}>
                <th>{category.name}</th>
                <th className="row">
                  <i className="fa fa-edit edit__icon" title="Editar"/>
                  <i className="fa fa-times times__icon" title="Eliminar"/>
                </th>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}


const CategoryTable = (categories) => {
  return (
    <div>
      {
        categories.length === 0 ? <bold>No hay categorías</bold> :
        <div className="container">
          {categoryList(categories)}
        </div>
      }
    </div>
  )
}

export default CategoryTable
