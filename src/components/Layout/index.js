import React, { Fragment } from 'react'
import Header from '../Header'
import styles from  "./index.module.css";
const Layout = ({children}) => {
  return (
    <div className={styles.layout}>
     <Header />
     {children}
    </div>
  )
}

export default Layout