import React from 'react';
import { withStyles } from "@material-ui/styles";
interface IColumnItem {
  name: string,
  value: string | React.ReactNode,
  colSpan?: number|string
}
interface IColumn {
  [index:number]: IColumnItem
}
interface Iprops {
  column: Array<IColumn>,
  classes: any
}

const styles: any = (theme: any) => {
  const color = (color: string) => {
    return {
      color: color,
      '& span': {
        background: color
      }
    }
  }
  return ({
    root: {
      width: '100%',
      border:'1px solid rgba(221,221,221,1)',
      '& td, & tr': {
        height: '54px',
        border:'1px solid rgba(221,221,221,1)',
        textAlign: 'left'
      },
      '& td': {
        minWidth: '60px'
      }
    },
    name: {
      background: 'rgba(242,243,247,1)',
      'padding-left': '20px',
    },
    value: {
      'padding-left': '20px',
      '& .origin': color('#F88B08'),
      '& .green' : color('#02B583'),
      '& .circle' : {
        display: 'flex',
        'align-items': 'center',
        '& span': {
          'margin-right': '5px',
          display: 'inline-block',
          width: '8px',
          height: '8px',
          'border-radius': '50%'
        }
      }
    }
  
  })
};
export default withStyles(styles)((props: Iprops) => {
  const { column, classes } = props;
  return(
    <table className={classes.root}>
      <tbody>
        {
          column.map((row: any, index: number) => {
            return <tr key={index} >
              {
                (row).map((item: any, index: number) => {
                  const { name, value, colSpan } = item;
                  return <React.Fragment key={index}>
                    <td 
                      key={`${index}-name`} 
                      className={classes.name}
                    >{name}</td>
                    <td 
                      key={`${index}-value`} 
                      colSpan={colSpan}
                      className={classes.value}
                    >{value}</td>
                  </React.Fragment>
                })
              }
            </tr> 
          })
        }
      </tbody>
    </table>
  )
});