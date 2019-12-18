const styles: any = (theme: any) => ({
  root: {
    padding: '20px',
    '& .head': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      '& h3': {
        marginRight: '16px',
        fontSize: '0.15rem',
        fontWeight: 500,
        color: '#fff',
      },
      '& img': {
        width: '74px',
        height: '11px',
      }
    },
    '& .item': {
      border: '1px solid #3E74FF',
      borderRadius: '5px',
      padding: '14px 18px',
      background: 'linear-gradient(223deg,rgba(4,10,255,0) 0%,rgba(4,10,255,.5) 48%,rgba(4,10,255,0) 100%)',
      marginBottom: '16px',
      color: '#fff',
      position: 'relative',
      '& .click': {
        color: '#32F0FF',
        fontSize: '0.09rem',
        paddingLeft: '0.0625rem',
        display: 'inline-block',
        marginBottom: '0.0625rem',
        textDecoration: 'underline',
        cursor: 'pointer'
      },
      "& .click:hover + .model": {
        display: 'block'
      },
      '& span': {
        fontSize: '0.09rem',
        paddingLeft: '0.15rem',
        display: 'inline-block',
        marginBottom: '0.09rem',
        color: '#8D8FBB'
      },
      '& .modelLeft': {
        left: '15%'
      },
      '& .modelRight': {
        right: '24%'
      },
      '& .model': {
        display: 'none',
        top: '40%',
        width: '500px',
        border: '1px solid #000921',
        maxHeight: '260px',
        zIndex: '999',
        position: 'fixed',
        backgroundColor: '#11183D',
        borderRadius: '2px',
        '& div': {
          display: 'flex',
          padding: '10px 20px',
          lineHeight: '0.1rem',
          '& p': {
            color: '#CDCDDD',
            height: '0.2rem',
            lineHeight: '0.22rem',
            fontSize: '0.1rem',
            marginBottom: '0'
          },
        },
      },
      '& .textList': {
        height: '160px',
        overflowY: 'auto',
        fontSize: '12px',
        "&::-webkit-scrollbar": {
          display: "none",
          "-ms-overflow-style": "none"
        },
        '& p': {
          display: 'inline-block',
          margin: '.1rem .1rem .1rem 0'
        }
      }
    },
    '& .main': {
      display: 'flex',
      height: '100%',
      '&>div:nth-child(odd)': {
        flex: 2.7,
        position: 'relative',
        overflow: 'scroll',
        maxHeight: '3000px',
        "&::-webkit-scrollbar": {
          display: "none",
          "-ms-overflow-style": "none"
        },
      },
      '& .middleArea': {
        margin: 'auto 20px',
        flex: 6.6,
        overflow: 'hidden'
      },
    },
  }
});
export default styles;